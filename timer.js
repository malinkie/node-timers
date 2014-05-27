'use strict';

var simple = require('./simple');

module.exports = function (options) {

  options = options || {};
  options.pollInterval = options.pollInterval || 250;
  options.finishTime = options.finishTime || 0;

  var timer = simple(options),
      originalTimeFunc = timer.time;
  
  timer.time = function(newTime){
    var elapsedTime = originalTimeFunc.call(timer, newTime);
    if (elapsedTime >= options.finishTime) elapsedTime = options.finishTime;
    return elapsedTime;
  };

  timer.on('poll', function(timePassed){
    if (timePassed === options.finishTime) {
      timer
        .stop()
        .emit('done', timePassed);
    }
  });

  return timer;
};
