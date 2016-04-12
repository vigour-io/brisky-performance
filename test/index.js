'use strict'
var test = require('tape')
var perf = require('../')
var isNumber = require('vigour-util/is/number')

test('time', function (t) {
  t.plan(1)
  var start = perf.time()
  var end = perf.time(start)
  t.equal(isNumber(end), true, 'time returns a number')
})

test('run', function (t) {
  t.plan(2)
  var cnt = 0
  perf.run(() => {
    cnt++
  }, (time, total) => {
    t.equal(cnt, total, 'loop 5 times')
    t.equal(isNumber(time), true, 'time is a number')
  }, 10)
})

// console.log(perf())

function something () {}
function somethingElse () {}
perf(something, somethingElse, 2)
perf(function () {}, somethingElse, 2)
