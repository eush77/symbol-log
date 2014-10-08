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


/**
 * @arg {string} marker
 * @arg {string} message
 * @arg {Object} [options]
 * @property {WritableStream} [output=process.stdout]
 * @property {string} [template=" ${marker} ${message}"]
 */
var log = function (marker, message, options) {
  options = options || {};
  options.output = options.output || process.stdout;
  options.template = options.template || ' ${marker} ${message}';

  options.output.write(template(options.template, {
    marker: marker,
    message: message
  }) + '\n');
};


Object.keys(symbols).forEach(function (key) {
  exports[key] = function (message, options) {
    log(symbols[key], message, options);
  };
});
