'use strict';

var logSymbols = require('log-symbols')
  , chalk = require('chalk')
  , extend = require('extend')
  , template = require('lodash.template');


var colors = ['black',
              'red',
              'green',
              'yellow',
              'blue',
              'magenta',
              'cyan',
              'white',
              'gray'];


var symbols = extend({}, logSymbols, colors.reduce(function (symbols, color) {
  symbols[color] = chalk[color]('*');
  return symbols;
}, {}));


var setSymbols = function (logger) {
  Object.keys(symbols).forEach(function (key) {
    logger[key] = function (message, options) {
      logger(symbols[key], message, options);
    };
  });

  logger.puts = function () {
    var putsLogger = logger({ template: '${message}' });

    [].forEach.call(arguments, function (message) {
      putsLogger('', message);
    });
  };

  return logger;
};


/**
 * @arg {Object} [defaults]
 * @property {WritableStream} [output=process.stderr]
 * @property {string} [template=" ${marker} ${message}"]
 */
var makeLoggerWithDefaults = function (defaults) {
  defaults = defaults || {};

  return extend(setSymbols(function (marker, message, options) {
    if (typeof marker != 'string') {
      // Configure logger to use predefined options for subsequent calls.
      options = marker;
      return makeLoggerWithDefaults(extend({}, defaults, options));
    }

    options = extend({}, defaults, options);

    return options.output.write(template(options.template, {
      marker: marker,
      message: message
    }) + '\n');
  }), {
    options: defaults
  });
};


module.exports = makeLoggerWithDefaults({
  output: process.stderr,
  template: ' ${marker} ${message}'
});
