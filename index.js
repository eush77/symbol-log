'use strict';

var logSymbols = require('log-symbols')
  , chalk = require('chalk')
  , extend = require('extend');


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
 * @arg {string} icon
 * @arg {string} message
 * @arg {Object} [options]
 * @property {WritableStream} [output=process.stdout]
 */
var log = function (icon, message, options) {
  options = options || {};
  options.output = options.output || process.stdout;

  options.output.write(' ' + icon + ' ' + message + '\n');
};


Object.keys(symbols).forEach(function (key) {
  exports[key] = function (message, options) {
    log(symbols[key], message, options);
  };
});
