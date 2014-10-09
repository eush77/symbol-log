'use strict';

var log = require('..');

var concat = require('concat-stream');


it('should have the specified default options', function (done) {
  log.options.output.should.equal(process.stderr);
  log.options.template.should.equal(' ${marker} ${message}');
  done();
});


it('should extend loggers with extra options', function (done) {
  var logToStdout = log({ output: process.stdout });
  logToStdout.options.output.should.equal(process.stdout);
  logToStdout.options.template.should.equal(log.options.template);

  var markerOnly = logToStdout({ template: '${marker}' });
  markerOnly.options.output.should.equal(process.stdout);
  markerOnly.options.template.should.equal('${marker}');

  // New logger's settings should have no effect on other loggers'.
  logToStdout.options.template.should.not.equal('${marker}');
  log.options.template.should.not.equal('${marker}');

  done();
});


it('should format messages according to the format', function (done) {
  var output = concat(function (data) {
    data.should.equal('* - message\n');
    done();
  });

  log({ output: output })('*', 'message', { template: '${marker} - ${message}' });
  output.end();
});


it('should put unmarked messages in the order', function (done) {
  var messages = ['First',
                  '  Second',
                  ' ',
                  'Third'];

  var output = concat(function (data) {
    data.should.equal(messages.concat('').join('\n'));
    done();
  });

  var out = log({ output: output });
  out.puts.apply(out, messages);
  output.end();
});