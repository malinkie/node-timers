'use strict';

var test = require('tape');
var countdown = require('../countdown');
var countdownLength = 1000;
var timeoutLength = 500;

test('done triggering after reset on original start', function(t){
  t.plan(2);
  var timer = countdown({ startTime: countdownLength });
  timer.start();
  setTimeout(function(){
    timer.reset();
  }, timeoutLength);
  timer.on('reset', function() {
    t.equal(timer.time(), countdownLength, 'countdown reset correctly');
    timer.start();
  });
  timer.on('done', function(){
    t.pass('reset timer completed');
  });
});

