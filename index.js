'use strict'
const path = require('path')

const meow = require('meow')
const readPkgUp = require('read-pkg-up')

// borrowed from meow, to prevent referencing moggies package.json
// prevent caching of this module so module.parent is always accurate
delete require.cache[__filename]
const parentDir = path.dirname(module.parent.filename)

module.exports = function moggie(opts, cli) {
	opts = Object.assign({
		help: false,
		minimistOptions: {},
		pkg: readPkgUp.sync({ // borrowed from meow, to prevent referencing moggies package.json
			cwd: parentDir,
			normalize: false
		}).pkg
	}, opts)

	if (cli === undefined) {
		const minimistOptions = opts.minimistOptions
		delete opts.minimistOptions
		cli = meow(opts, minimistOptions)
	}

	if (cli.input.length > 0 &&
		typeof opts.subcommands === 'object' &&
		cli.input[0] in opts.subcommands
	) {
		moggie(opts.subcommands[cli.input.shift()], cli)
	} else if (typeof opts.callback === 'function') {
		opts.callback(cli)
	} else if (typeof opts.helpCallback === 'function') {
		opts.helpCallback(cli)
	}
}
