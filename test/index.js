/**
 * Imports
 */

var flop = require('..')
var test = require('tape')
var flow = require('redux-flo').default
var bind = require('@f/bind-middleware')
var isGeneratorObj = require('@f/is-generator-object')

/**
 * Tests
 */

 var l = []
 function log (ctx) {
   return function (next) {
     return function (action) {
       l.push(action)
     }
   }
 }

test('wrap generators', function (t) {
  flop(Foo)

  var io = bind([flow(), log])

  var f = new Foo()

  var action = f.bar()
  t.equal(action.type, 'FLO')
  t.ok(isGeneratorObj(action.payload))

  io(f.bar())
  io(f.bar('world'))

  t.deepEqual(l[0], {type: 'FETCH', payload: '/hello/'})
  t.deepEqual(l[1], {type: 'FETCH', payload: '/hello/world'})
  t.end()
})

function Foo () {}

Foo.prototype.bar = function * (method) {
  yield {type: 'FETCH', payload: '/hello/' + (method || '')}
}
