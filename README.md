[![npm](https://nodei.co/npm/symbol-log.png)](https://nodei.co/npm/symbol-log/)

# symbol-log

[![Build Status][travis-badge]][travis]
[![Dependency Status][david-badge]][david]

[travis-badge]: https://travis-ci.org/eush77/symbol-log.svg
[travis]: https://travis-ci.org/eush77/symbol-log
[david-badge]: https://david-dm.org/eush77/symbol-log.png
[david]: https://david-dm.org/eush77/symbol-log

Helper library for printing log messages in color with log markers. [chalk] meets [log-symbols].

[chalk]: https://npmjs.com/package/chalk
[log-symbols]: https://npmjs.com/package/log-symbols

## API

### logger = require('symbol-log')

Get default `logger`.

### logger.options

Options set for `logger`.

### newLogger = logger(options)

Make new `logger` with modified options.

### newLogger = logger.indent(level)

Make new `logger` with increased indentation level.

### newLogger = logger.unindent(level)

Make new `logger` with decreased indentation level. Same as `logger.indent(-level)`.

### logger(marker, message, [options])

Use `logger` to write the marked message.

Returns `logger`.

### logger.puts([message]...)

Write each unmarked message in turn. Equivalent to `logger('', message, { template: '${message}' })` (for a single argument).

Returns `logger`.

### logger.*&lt;marker-name&gt;*(message, [options])

Write message with one of built-in markers.

Returns `logger`.

## Options

Option | Type | Default | Description
:----: | ---- | :-----: | -----------
output | WritableStream | `process.stderr` | Output stream.
template | String | `" ${marker} ${message}"` | Output template.

## Markers

Four semantic markers are provided by [log-symbols](http://npmjs.org/package/log-symbols) package, which also defines some fallbacks for Windows.

| Name    | Marker            |
| :------ | :---------------: |
| info    | &#x2139; (blue)   |
| success | &#x2714; (green)  |
| warning | &#x26a0; (yellow) |
| error   | &#x2716; (red)    |
| black   | *                 |
| red     | *                 |
| green   | *                 |
| yellow  | *                 |
| blue    | *                 |
| magenta | *                 |
| cyan    | *                 |
| white   | *                 |
| gray    | *                 |

## Install

```
npm install symbol-log
```

## License

MIT
