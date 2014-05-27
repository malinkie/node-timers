'use strict';

var test = require('tape'),
    timer = require('../simple');

test('Simple timer signature', function(t){
  var simpleTimer = timer();
  t.ok(simpleTimer, "should be a new timer object");
  t.ok(simpleTimer.start, "should have a start method");
  t.ok(simpleTimer.stop, "should have a stop method");
  t.ok(simpleTimer.reset, "should have a reset method");
  t.ok(simpleTimer.time, "should have a get time method");
  t.ok(simpleTimer.state, "should have a state method");
  t.end();
});

test('Simple timer time', function(t){
  var simpleTimer = timer();
  t.equal(simpleTimer.time(), 0, "unstarted timers time should be 0");
  simpleTimer.start();
  setTimeout(function(){
    t.ok(simpleTimer.time() > 0, "started timers time should be greater than 0");
    t.end();
  });
});

test('Simple timer stop and reset', function(t){
  var simpleTimer = timer({pollInterval: 100}).start(),
      step = 0;
 
  t.plan(3);
  simpleTimer.on('poll', function(){
    switch(++step){
      case 1:
      case 2:
        simpleTimer.stop();
        t.pass('timer stopped');
        setTimeout(function(){simpleTimer.start();}, 100);
        break;
      case 3:
        simpleTimer.reset();
        t.equal(simpleTimer.state(), 'clean', 'timer should be in a clean state');
        break;
    }
  });
});

test('Simple timer state', function(t){
  var simpleTimer = timer();
  t.equal(simpleTimer.state(), 'clean', 'state should be "clean"');
  simpleTimer.start();
  t.equal(simpleTimer.state(), 'on', 'state should be "on"');
  simpleTimer.stop();
  t.equal(simpleTimer.state(), 'stopped', 'state should be "stopped"');
  simpleTimer.reset();
  t.equal(simpleTimer.state(), 'clean', 'state should be "clean" again');
  t.end();
});
