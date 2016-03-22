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
```
