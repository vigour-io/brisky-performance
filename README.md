# performance
<!-- VDOC.badges travis; standard; npm -->
<!-- DON'T EDIT THIS SECTION (including comments), INSTEAD RE-RUN `vdoc` TO UPDATE -->
[![Build Status](https://travis-ci.org/vigour-io/performance.svg?branch=master)](https://travis-ci.org/vigour-io/performance)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://badge.fury.io/js/vigour-performance.svg)](https://badge.fury.io/js/vigour-performance)
<!-- VDOC END -->

Simple performance benchmarking tools (browser and node)

## Precise time measurement
<!--VDOC.jsdoc time -->
<!-- DON'T EDIT THIS SECTION (including comments), INSTEAD RE-RUN `vdoc` TO UPDATE -->
#### time(startTime)

When called without arguments, returns the current time as precisely as possible as a number of milliseconds or an array (`[milliseconds, microseconds]`)

When called with an argument, returns the difference between the current time and the time passed in as argument, in milliseconds
- **param** startTime {number|array} - start time for elapsed time calculation
- **returns** {number|array} time - Current time (in milliseconds) or elapsed time since `startTime`

<!-- VDOC END -->

```javascript
var time = require('vigour-performance').time
var startTime = time()
var elapsedTime = time(startTime)
```

## Measuring a function's performance
<!-- VDOC.jsdoc run -->
<!-- DON'T EDIT THIS SECTION (including comments), INSTEAD RE-RUN `vdoc` TO UPDATE -->
#### run(subject, callback, nbIterations)
- **param** {*function*} subject - the function to measure
- **param** {*function*} callback - called when the measurement is done : `callback(averageRunTime, nbIterations)`
- **param** {*number*} nbIterations - number of times to execute the subject function

<!-- VDOC END -->

```javascript
var run = require('vigour-performance').run
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

## Comparing functions
<!-- VDOC.jsdoc perf -->
<!-- DON'T EDIT THIS SECTION (including comments), INSTEAD RE-RUN `vdoc` TO UPDATE -->
#### perf(subject, reference, margin, loop, subjectLabel, referenceLabel)
- **param** {*function*} subject - function to measure
- **param** {*function*} reference - function to compare with `subject`
- **param** {*number*} margin - number of times faster `subject` must be compared to `reference` for the test to pass
- **param** {*number*} loop - Number of times to run the functions (default: `10`)
- **param** {*string*} subjectLabel - Label for the subject function (default: the name of the function (`subject.name`))
- **param** {*string*} referenceLabel - Label for the reference function (default: the name of the function (`reference.name`))

<!-- VDOC END -->
Uses [tape](https://www.npmjs.com/package/tape) internally, which produces [TAP](https://testanything.org/)(Test Anything Protocol) output.

```javascript
var perf = require('vigour-performance')
// The following test will pass if `subject` executes at least 2 times as fast as `reference`
perf(function subject () {}, function reference () {}, 2)
```
