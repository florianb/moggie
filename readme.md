# moggie

> Moggie wraps a lot [Meow][meow] to support subcommands.

## Features of [Meow][meow]

- Parses arguments using [minimist](https://github.com/substack/minimist)
- Converts flags to [camelCase](https://github.com/sindresorhus/camelcase)
- Outputs version when `--version`
- Outputs description and supplied help text when `--help`
- Makes unhandled rejected promises [fail loudly](https://github.com/sindresorhus/loud-rejection) instead of the default silent fail
- Sets the process title to the binary name defined in package.json

## Additional feature of Moggie

- Unshifts commands to allow the handling of subcommands

## Install

```
$ npm install --save moggie
```

## Usage

```
$ ./rufus.js leg raise and --rainbow
```

```js
#!/usr/bin/env node
'use strict';
const moggie = require('moggie');

moggie({
	// you might use meow-options here:
	version: "0.0.1-alpha",
	minimistOptions: {
		'--': true
	},
	// subcommands contain only moggie-options
	subcommands: {
		'leg': {
			subcommands: {
				'raise': {
					callback: cli => console.dir(cli)
					/*{
						input: ['and'],
						flags: {rainbow: true},
						...
					}*/
				},
				'lower': {}
			},
			callback: cli => console.dir(cli)
		}
	},
	callback: cli => console.dir(cli),
	helpCallback: cli => printRufusHelp(cli)
});
```



## API

### moggie(options)

The callback receives an `Object` with:

- `input` *(Array)* - Non-flag arguments
- `flags` *(Object)* - Flags converted to camelCase
- `pkg` *(Object)* - The `package.json` object
- `help` *(string)* - The help text used with `--help`
- `showHelp([code=2])` *(Function)* - Show the help text and exit with `code`

#### options

Type: `Object`

Must be an options-object where the base-level may contain meow-options and moggie-options. Meow is only once invoked, every subcommand may only contain moggie-options.

##### callback

Type: `function`
Parameters: `cli: object`

The callback-handle will be called if the further input-array is empty or the next input-element doesn't match any subcommand from the `subcommands`-property.

The callback is provided the cli-object containing the result of the basic meow-call, stripped by previously visited subcommands.

##### helpCallback

Type: `function`
Parameters: `cli: object`

This callback-handle will be called if neither a subcommand matched nor a callback is provided.

(More uses are to come)

##### subcommands

Type: `object`

This object contains moggie-objects each for every provided subcommand.

Example:

```js
subcommands:{
	'1st-subcommand': {
		callback: ...,
		helpCallback: ...
	},
	'2nd-subcommand': {
		callback: ...,
	}
}
```

#### Derived base-level options from Meow

##### description

Type: `string` `boolean`<br>
Default: The package.json `"description"` property

Description to show above the help text.

Set it to `false` to disable it altogether.

##### help

Type: `string` `boolean`

The help text you want shown.

The input is reindented and starting/ending newlines are trimmed which means you can use a [template literal](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/template_strings) without having to care about using the correct amount of indent.

The description will be shown above your help text automatically.

Set it to `false` to disable it altogether.

##### version

Type: `string` `boolean`<br>
Default: The package.json `"version"` property

Set a custom version output.

Set it to `false` to disable it altogether.

##### pkg

Type: `Object`<br>
Default: Closest package.json upwards

package.json as an `Object`.

*You most likely don't need this option.*

##### argv

Type: `Array`<br>
Default: `process.argv.slice(2)`

Custom arguments object.

##### inferType

Type: `boolean`<br>
Default: `false`

Infer the argument type.

By default, the argument `5` in `$ foo 5` becomes a string. Enabling this would infer it as a number.

#### minimistOptions

Type: `Object`<br>
Default: `{}`

Minimist [options](https://github.com/substack/minimist#var-argv--parseargsargs-opts).

Keys passed to the minimist `default` option are [decamelized](https://github.com/sindresorhus/decamelize), so you can for example pass in `fooBar: 'baz'` and have it be the default for the `--foo-bar` flag.


## Promises

Meow will make unhandled rejected promises [fail loudly](https://github.com/sindresorhus/loud-rejection) instead of the default silent fail. Meaning you don't have to manually `.catch()` promises used in your CLI.


## Tips

See [`meow`][meow] to learn more about the underlying cli-helper.

See [`chalk`](https://github.com/chalk/chalk) if you want to colorize the terminal output.

See [`get-stdin`](https://github.com/sindresorhus/get-stdin) if you want to accept input from stdin.

See [`conf`](https://github.com/sindresorhus/conf) if you need to persist some data.

See [`update-notifier`](https://github.com/yeoman/update-notifier) if you want update notifications.

[More useful CLI utilities.](https://github.com/sindresorhus/awesome-nodejs#command-line-utilities)


## License

MIT © [Florian Breisch](https://github.com/florianb)

[meow]: https://github.com/sindresorhus/meow
