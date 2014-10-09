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


var loggerPrototype = {
  puts: function () {
    var putsLogger = this({ template: '${message}' });

    [].forEach.call(arguments, function (message) {
      putsLogger('', message);
    });

    return this;
  }
};


Object.keys(symbols).forEach(function (key) {
  loggerPrototype[key] = function (message, options) {
    return this(symbols[key], message, options);
  };
});


var makeLogger = function (log) {
  return extend(log, loggerPrototype);
};


/**
 * @arg {Object} [defaults]
 * @property {WritableStream} [output=process.stderr]
 * @property {string} [template=" ${marker} ${message}"]
 */
var makeLoggerWithDefaults = function (defaults) {
  defaults = defaults || {};
  var logger;

  return logger = extend(makeLogger(function (marker, message, options) {
    if (typeof marker != 'string') {
      // Configure logger to use predefined options for subsequent calls.
      options = marker;
      return makeLoggerWithDefaults(extend({}, defaults, options));
    }

    options = extend({}, defaults, options);

    options.output.write(template(options.template, {
      marker: marker,
      message: message
    }) + '\n');

    return logger;
  }), {
    options: defaults
  });
};


module.exports = makeLoggerWithDefaults({
  output: process.stderr,
  template: ' ${marker} ${message}'
});
