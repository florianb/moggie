import test from 'ava'
import meow from 'meow'

import m from './'

test.cb('calling a right subcommand', t => {
	m({
		argv: ['1sc', '--test'],
		subcommands: {
			'1sc': {
				callback: () => t.end(false)
			}
		},
		callback: () => t.end(true)
	})
})

test.cb('calling a wrong subcommand', t => {
	m({
		argv: ['2sc', '--test'],
		subcommands: {
			'1sc': {
				callback: () => t.end(true)
			}
		},
		callback: () => t.end(false)
	})
})

test.cb('calling a right subsubcommand', t => {
	m({
		argv: ['1sc', '2sc', '--test'],
		subcommands: {
			'1sc': {
				subcommands: {
					'2sc': {
						callback: () => t.end(false)
					}
				},
				callback: () => t.end(true)
			}
		},
		callback: () => t.end(true)
	})
})

test.cb('adding minimistOptions should change minimist behavior', t => {
	m({
		argv: ['foo', '--foo-bar', '-u', 'cat', '--', 'unicorn', 'cake'],
		minimistOptions: {
			'--': true
		},
		subcommands: {
			foo: {
				callback: cli => {
					console.dir(cli)
					t.deepEqual(cli.flags['--'], ['unicorn', 'cake'])
					t.end(false)
				}
			}
		},
		callback: () => t.end(true)
	})
})

test('meows double dash behavior', t => {
	const cli = meow({
		argv: ['foo', '--foo-bar', '-u', 'cat', '--', 'unicorn', 'cake'],
		help: `
			Usage
			  foo <input>
		`
	}, {
		// alias: {u: 'unicorn'},
		// default: {meow: 'dog'},
		'--': true
	})

	t.is(cli.input[0], 'foo')
	t.true(cli.flags.fooBar)
	// t.is(cli.flags.meow, 'dog')
	// t.is(cli.flags.unicorn, 'cat')
	t.deepEqual(cli.flags['--'], ['unicorn', 'cake'])
	t.is(cli.pkg.name, 'meow')
	console.dir(cli)
})
