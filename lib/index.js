'use strict'
const test = require('tape')
const perf = require('./').run
const hash = require('vigour-util/hash')
const memoized = {}
const methods = require('./methods')

module.exports = exports = function (a, b, margin, loop, params, aLabel, bLabel) {
  var label
  aLabel = aLabel || a.name || 'a'
  bLabel = bLabel || b.name || 'b'
  if (margin) {
    console.log(margin)
    label = `"${aLabel}" should not be slower then ${margin} x "${bLabel}"`
  } else {
    label = `"${aLabel}" should not be slower then "${bLabel}"`
  }
  if (!loop) {
    loop = 1000
  } else {
    label += ` over ${loop} iterations`
  }
  test(
    label,
    (t) => {
      exec(a, params, loop, (msA) => {
        exec(b, params, loop, (msB) => {
          var msRes = margin ? margin * msB : msB
          var round = (msRes - msA) + ''
          var roundIndex = 10
          for (var i in round) {
            if (round[i] !== '-' && round[i] !== '0' && round[i] !== '.') {
              roundIndex = Number('1e' + i)
              break
            }
          }
          var prettyA = Math.round(msA * roundIndex) / roundIndex
          var prettyB = Math.round(msRes * roundIndex) / roundIndex
          // do this really smooth show the first difference and use that
          t.equal(
            msA < msRes,
            true,
            `
             ${prettyA} ms
             is smaller then
             ${prettyB} ms
            `
          )
          t.end()
        })
      })
    }
  )
}

for (let key in methods) {
  exports[key] = methods[key]
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
        ms = cache[i].ms
        next(ms)
        return
      }
    }
  }
  methods.run(fn, (ms) => {
    if (!cache) { cache = memoized[fnHash] = [] }
    ms = ms / loop
    cache.push({ loop: loop, params: params, ms: ms })
    next(ms)
  })
}
