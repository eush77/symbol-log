'use strict';

var symbols = require('log-symbols');


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
