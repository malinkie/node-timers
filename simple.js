'use strict';

var EventEmitter = require('events').EventEmitter;

module.exports = function(options){

  options = options || {};

  var time,
      cumulative = 0,
      interval,
      startPolling = function(){
        if (options.pollInterval){
          interval = setInterval(
            function(){
              timer.emit('poll', timer.time());
            }, 
            options.pollInterval
          );
        }
      },
      stopPolling = function(){
        clearInterval(interval);
      },
      timer = new EventEmitter();

  timer.start = function(){
    time = new Date();
    startPolling();
    this.emit('start');
    return this;
  };

  timer.stop = function(){
    cumulative = this.time();
    time = undefined;
    stopPolling();
    this.emit('stop');
    return this;
  };

  timer.reset = function(){
    time = undefined;
    cumulative = 0;
    stopPolling();
    this.emit('reset');
    return this;
  };

  timer.time = function(newTime){

    if(typeof newTime === 'Number'){
      cumulative = newTime;
    }

    var total = cumulative;
    if (this.state() === 'on'){
      total += new Date().getTime() - time.getTime();
    }
    return total;
  };

  timer.state = function(){
    if (!time) {
      return cumulative ? 'stopped' : 'clean';
    }
    return 'on';
  };

  return timer;
};
