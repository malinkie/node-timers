'use strict';

var simple = require('./simple');

module.exports = function(options) {
  options = options || {};
  options.pollInterval = options.pollInterval || 250;
  options.startTime = options.startTime || 0;

  var timer = simple(options),
      originalTimeFunc = timer.time;

  timer.time = function(newTime){
    var timeLeft = options.startTime - originalTimeFunc.call(timer, newTime);
    if (timeLeft <= 0) timeLeft = 0;
    return timeLeft;
  };

  timer.on('poll', function(timeLeft){
    if (! timeLeft){
      timer
        .stop()
        .emit('done', timeLeft);
    }
  });
  
  return timer;
};
