'use strict'

const meow = require('meow')

module.exports = function moggie(opts, cli) {
	opts = Object.assign({
		argv: process.argv.slice(2),
		help: false
	}, opts)

	if (cli === undefined) {
		cli = meow(opts)
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
