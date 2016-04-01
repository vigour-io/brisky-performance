'use strict'
const test = require('tape')
const perf = require('./').run
const hash = require('vigour-util/hash')
const memoized = {}

module.exports = function (a, b, margin, loop, params, aLabel, bLabel) {
  aLabel = aLabel || a.name || 'a'
  bLabel = bLabel || b.name || 'b'
  if (!loop) { loop = 100 }
  var label
  if (margin) {
    console.log(margin)
    label = `"${aLabel}" should not be slower then ${margin} x "${bLabel}"`
  } else {
    label = `"${aLabel}" should not be slower then "${bLabel}"`
  }
  test(
    label,
    (t) => {
      exec(a, params, loop, (msA) => {
        exec(b, params, loop, (msB) => {
          var msRes = margin ? margin * msB : msB
          t.equal(
            msA < msRes,
            true,
            `
             ${Math.round(msA * 100) / 100} ms
             is smaller then
             ${Math.round(msRes * 100) / 100} ms
             over ${loop} iterations
            `
          )
          t.end()
        })
      })
    }
  )
}

function exec (fn, params, loop, next) {
  var fnHash = hash(fn.toString())
  var cache = memoized[fnHash]
  var ms
  if (cache) {
    for (var i in cache) {
      if (
        cache[i].params === params &&
        cache[i].loop === loop
      ) {
        ms = cache.ms
        next(ms)
        return
      }
    }
  }
  perf(fn, (ms, total) => {
    if (!cache) {
      cache = memoized[fnHash] = []
    }
    ms = ms / total
    cache.push({
      loop: loop,
      params: params,
      ms: ms
    })
    next(ms)
  })
}
