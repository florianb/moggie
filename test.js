import test from 'ava'

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
