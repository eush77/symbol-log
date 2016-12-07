'use strict';

const ansiStyles = require('ansi-styles'),
      chalk = require('chalk'),
      logSymbols = require('log-symbols'),
      pairs = require('object-pairs'),
      repeatString = require('repeat-string'),
      template = require('es6-template-strings');


const loggerPrototype = {
  puts: function (...args) {
    const putsLogger = this({ template: '${message}' });

    for (const message of args) {
      putsLogger('', message);
    }

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
    const indent = this.options.indent;
    return this({
      indent: (indent.length < level) ? '' : indent.slice(level)
    });
  }
};


// Define markers.
Object.keys(ansiStyles.colors)
  .map(key => [key, chalk[key]('*')])
  .concat(pairs(logSymbols))
  .map(([key, symbol]) => (
    loggerPrototype[key] = function (message, options) {
      return this(symbol, message, options);
    }
  ));


const makeLogger = log => Object.assign(log, loggerPrototype);


/**
 * @arg {Object} [defaults]
 * @property {WritableStream} [output=process.stderr]
 * @property {string} [template=" ${marker} ${message}"]
 * @property {string} [indent=""]
 */
function makeLoggerWithDefaults (defaults) {
  defaults = Object.assign({
    output: process.stderr,
    template: ' ${marker} ${message}',
    indent: ''
  }, defaults);

  const logger = Object.assign(makeLogger((marker, message, options) => {
    if (typeof marker != 'string') {
      // Configure logger to use predefined options for subsequent calls.
      options = marker;
      return makeLoggerWithDefaults(Object.assign({}, defaults, options));
    }

    options = Object.assign({}, defaults, options);

    options.output.write(options.indent + template(options.template, {
      marker: marker,
      message: message
    }) + '\n');

    return logger;
  }), {
    options: defaults
  });

  return logger;
}


module.exports = makeLoggerWithDefaults();
