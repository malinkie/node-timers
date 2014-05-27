node-timers
=====

Quick and simple timer utilities that give you enough control.

## Getting started

js```
var node-timers = require('node-timers');
var simpleTimer = require('node-timers/simple'); //or
var timer = require('node-timers/timer'); //or
var countdown = require('node-timers/countdown');

var timer = node-timers.simple(); // timer or countdown can be created from here too...

// passing an options object with the pollInterval will generate a 'poll' event ever X milliseconds
// passing no such pollInterval value will create a timer that can be controlled (start, stop, reset) but will
// not ping you with updates.
var simple = simpleTimer({pollInterval: 100});
```

## Reasoning

I seemed to be rewriting this stuff on a regular occasion for different projects. Either misplacing the source or
using the modules in a slightly different way. This set gives me enough leway to do what I want without controlling the output
like other timer modules I have looked at. The output should be up to the app.

## API

### simple() ###

### timer() ###

### countdown() ###

