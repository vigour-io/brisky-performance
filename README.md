#brisky-performance
Simple performance benchmarking tools (browser and node)

[![Build Status](https://travis-ci.org/vigour-io/performance.svg?branch=master)](https://travis-ci.org/vigour-io/performance)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://badge.fury.io/js/brisky-performance.svg)](https://badge.fury.io/js/brisky-performance)
[![Coverage Status](https://coveralls.io/repos/github/vigour-io/brisky-performance/badge.svg?branch=master)](https://coveralls.io/github/vigour-io/brisky-performance?branch=master)

-

### Precise time measurement
#### var t = time(startTime)

When called without arguments, returns the current time as precisely as possible as a number of milliseconds or an array (`[milliseconds, microseconds]`)

When called with an argument, returns the difference between the current time and the time passed in as argument, in milliseconds
- **startTime** (*number|array*) - start time for elapsed time calculation
- **returns** (*number|array*) t - Current time (in milliseconds) or elapsed time since `startTime`

```javascript
var time = require('brisky-performance').time
var startTime = time()
var elapsedTime = time(startTime)
```

### Measuring a function's performance
#### run(subject, callback, nbIterations)
- **subject** (*function*) - the function to measure
- **callback** (*function*) - called when the measurement is done : `callback(averageRunTime, nbIterations)`
- **nbIterations** (*number*) - number of times to execute the subject function

```javascript
var run = require('brisky-performance').run
run(
  () => {
    // function to measure (subject)
  },
  (average, iterations) => {
    // callback
    // average : subject function average run time in milliseconds,
    // iterations : number of times the subject function was executed
    // )
  },
  100 // number of times to execute the subject function
)
```

### Comparing functions
#### perf(subject, reference, margin, loop, subjectLabel, referenceLabel)
- **subject** (*function*) - function to measure
- **reference** (*function*) - function to compare with `subject`
- **margin** (*number*) - number of times faster `subject` must be compared to `reference` for the test to pass
- **loop** (*number*) - Number of times to run the functions (default: `10`)
- **subjectLabel** (*string*) - Label for the subject function (default: the name of the function (`subject.name`))
- **referenceLabel** (*string*) - Label for the reference function (default: the name of the function (`reference.name`))


Uses [tape](https://www.npmjs.com/package/tape) internally, which produces [TAP](https://testanything.org/)(Test Anything Protocol) output.

```javascript
var perf = require('brisky-performance')
// The following test will pass if `subject` executes at least 2 times as fast as `reference`
perf(function subject () {}, function reference () {}, 2)
```
