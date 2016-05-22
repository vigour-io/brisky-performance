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

function something () {}
function somethingElse () {}
perf(something, somethingElse, 4)
perf(function () {}, somethingElse, 4)

test('type', function (t) {
  function someFunction (a, b) {
    perf.type.test(someFunction, a, b)
  }
  t.plan(2)
  someFunction('hello', 1)
  someFunction([ 1, 2 ], null)
  t.same(perf.type.someFunction, {
    a: { string: 1, array: 1 },
    b: { number: 1, null: 1 }
  }, 'correct measurement')
  perf.type.test('customkey', someFunction, 1, 2)
  t.same(perf.type.customkey, {
    a: { number: 1 },
    b: { number: 1 }
  }, 'works with a custom key')
  t.end()
})
