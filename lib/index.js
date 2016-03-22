'use strict'
exports.time = require('vigour-util/is/node')
  ? function (time) {
    if (time) {
      let end = process.hrtime(time)
      return end[0] * 1e6 + end[1] / 1e6
    } else {
      return process.hrtime()
    }
  }
  : function (time) {
    if (!time) {
      return global.performance.now()
    } else {
      return global.performance.now() - time
    }
  }

exports.perf = function (method, done, cnt) {
  if (!cnt) { cnt = 1 }
  perfExec(0, method, cnt, cnt, done)
}

function perfNext (ms, method, cnt, total, done) {
  cnt--
  if (!cnt) {
    done(ms, total)
  } else {
    perfExec(ms, method, cnt, total, done)
  }
}

function perfExec (ms, method, cnt, total, done) {
  var time = exports.time()
  method()
  ms += exports.time(time)
  process.nextTick(() => perfNext(ms, method, cnt, total, done))
}
