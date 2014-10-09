# symbol-log [![Build Status][travis-badge]][travis] [![Dependency Status][david-badge]][david] [![DevDependency Status][david-dev-badge]][david-dev]

[![npm](https://nodei.co/npm/symbol-log.png)](https://nodei.co/npm/symbol-log/)

[travis-badge]: https://travis-ci.org/eush77/symbol-log.svg
[travis]: https://travis-ci.org/eush77/symbol-log
[david-badge]: https://david-dm.org/eush77/symbol-log.png
[david]: https://david-dm.org/eush77/symbol-log
[david-dev-badge]: https://david-dm.org/eush77/symbol-log/dev-status.png
[david-dev]: https://david-dm.org/eush77/symbol-log#info=devDependencies

Output messages with colored markers.

## API

### logger = require('symbol-log')

Returns new logger with default options.

### logger.options

Options set for logger.

### newLogger = logger(options)

Return new logger with modified options.

### logger(marker, message, [options])

Use logger to write the marked message.

### logger.puts([message]...)

Write each unmarked message in turn. Equivalent to `logger('', message, { template: '${message}' })` (for a single argument).

### logger.*&lt;marker-name&gt;*(message, [options])

Write message with one of built-in markers.

## Options

| Option   | Type           | Required? | Default                   |
| :------- | :------------- | :-------: | :------------------------ |
| output   | WritableStream | No        | `process.stderr`          |
| template | string         | No        | `" ${marker} ${message}"` |

Templating syntax is [LoDash's](https://lodash.com/docs#template).

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

```shell
npm install symbol-log
```

## License

MIT