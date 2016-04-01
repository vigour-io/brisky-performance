# performance
[![Build Status](https://travis-ci.org/vigour-io/performance.svg?branch=master)](https://travis-ci.org/vigour-io/performance)
simple performance benchmarking tools (browser and node)

```javascript
var perf = require('vigour-performance')
var t = perf.time() //start time measure
var end = perf.time(t) //return result
perf.run(
  () => {
    // function to be tested
  },
  (time, total) => {
    // done function -- time in ms
  },
  100 // loops (more means better results)
)

// runs a tape test for you
// passes as long as function a performs within 2 times the result of option b
perf(function a () {}, function b (), 2)

// some args
perf(a, b, margin, loop (default is 10), labelA, labelB)
// by default the labels are the function names paased to perf
```
