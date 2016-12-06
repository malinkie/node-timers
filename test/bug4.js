'use strict';

var test = require('tape');
var countdown = require('../countdown');
var countdownLength = 1000;
var timeoutLength = 500;

test('done triggering after reset on original start', function(t){
  t.plan(3);
  var timer = countdown({ startTime: countdownLength });
  var passedTime = new Date().getTime();
  timer.start();
  setTimeout(function(){timer.reset();}, timeoutLength);
  timer.on('reset', function() {
    t.equal(timer.time(), countdownLength, 'should be reset correctly');
    var now = new Date().getTime();
    t.ok((now - passedTime) >= timeoutLength, 'should have triggered around the timeout time');
    passedTime = now;
    timer.start();
  });
  timer.on('done', function(){
    var now = new Date().getTime();
    t.ok((now - passedTime) >= countdownLength, 'should have triggered after the countdown time');
  });
});

