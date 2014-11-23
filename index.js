'use strict';

var logSymbols = require('log-symbols')
  , chalk = require('chalk')
  , extend = require('extend')
  , template = require('lodash.template')
  , repeatString = require('repeat-string')
  , ansiStyles = require('ansi-styles')
  , zipmap = require('zipmap');


var symbols = extend({}, logSymbols, zipmap(Object.keys(ansiStyles.colors).map(function (color) {
  return {
    key: color,
    value: chalk[color]('*')
  };
})));


var loggerPrototype = {
  puts: function () {
    var putsLogger = this({ template: '${message}' });

    [].forEach.call(arguments, function (message) {
      putsLogger('', message);
    });

    return this;
  },

  indent: function (level) {
    if (level < 0) {
      return this.unindent(-level);
    }

    return this({
      indent: this.options.indent + repeatString(' ', level)
    });
  },

  unindent: function (level) {
    var indent = this.options.indent;
    return this({
      indent: (indent.length < level) ? '' : indent.slice(level)
    });
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
 * @property {string} [indent=""]
 */
var makeLoggerWithDefaults = function (defaults) {
  defaults = extend({
    output: process.stderr,
    template: ' ${marker} ${message}',
    indent: ''
  }, defaults);

  var logger;

  return logger = extend(makeLogger(function (marker, message, options) {
    if (typeof marker != 'string') {
      // Configure logger to use predefined options for subsequent calls.
      options = marker;
      return makeLoggerWithDefaults(extend({}, defaults, options));
    }

    options = extend({}, defaults, options);

    options.output.write(options.indent + template(options.template, {
      marker: marker,
      message: message
    }) + '\n');

    return logger;
  }), {
    options: defaults
  });
};


module.exports = makeLoggerWithDefaults();
