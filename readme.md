node-timers
=====

Quick and simple timer utilities that give you enough control.

## Getting started

Get it:
`npm install node-timers`

Use it:
```
var node-timers = require('node-timers'); //or
var simpleTimer = require('node-timers/simple'); //or
var timer = require('node-timers/timer'); //or
var countdown = require('node-timers/countdown');

var myTimer = node-timers.simple(); // timer or countdown can be created from here too...

// passing an options object with the pollInterval will generate a 'poll' event ever X milliseconds
// passing no such pollInterval value will create a timer that can be controlled (start, stop, reset)
// but will not ping you with updates.
var simple = simpleTimer({pollInterval: 100});

//Starts keeping track of passed time...
simple.start();

//returns the time that has passed in milliseconds
simple.time();
```

## Reasoning

I seemed to be rewriting this stuff on a regular occasion for different projects. Either misplacing the source or
using the modules in a slightly different way. This set gives me enough leway to do what I want without controlling the output
like other timer modules I have looked at. The output should be up to the app.

## API

### simple(options)

Creates a new simple timer. Keeps track of time passed. Options are optional. 
Options can include `pollInterval` which, while the timer is on an `on` state, 
will emit a `poll` event with the current passed time in milliseconds.

### start()

Starts the timer you have created. Emits a `start` event

### stop()

Stops the timer. Emits a `stop` event

### time(newTime)

Getter and setter for the passed time of your timer. If you specifiy a `newTime` value, 
then the timer will attempt to set itself to that new value before returning the passed time in milliseconds.

### reset()

Resets your timer back to it's initial state. Emits a `reset` event

### state()

Returns the current state of the timer. Either `on`, `stopped`, or `clean`

### timer(options)

A limited timer based on `simple`. Additional options to `pollInterval` include `finishTime`. 
When the timer has reached the finish time stated, it will emit a `done` event. 
`pollInterval` defaults to 250 and finishTime defaults to 0.

### countdown(options)

A timer that counts down from a `startTime` passed though the options object. In this case, `time()` returns
the time remaining instead of the time passed. Once the timer reaches 0, it will emit a `done` event.

## Events

|| Event || Description ||
| `start` | Event triggered when timer starts. |
| `stop` | Triggered when the timer stops. |
| `reset` | Timer has been reset. |
| `poll` | Update the user with the currently passed time or time that is left. `time` is passed as argument to the listener |
| `done` | Only `timer` and `countdown` emit this. When we have reached the given endtime or 0 |
