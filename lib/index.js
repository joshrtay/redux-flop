/**
 * Modules
 */

var forEach = require('@f/foreach-obj')
var isGenerator = require('@f/is-generator')
var flo = require('redux-flo').flo
var compose = require('@f/compose')

/**
 * Expose reduxFlop
 */

module.exports = reduxFlop


/**
 * Wrap generators of a classes prototype with flo
 * @param  {Class} cls
 * @return {Class]}
 */

function reduxFlop (cls) {
  forEach(wrapGenerators, cls.prototype)
  return cls

  function wrapGenerators (method, key) {
    if (isGenerator(method)) {
      cls.prototype[key] = compose(flo, method)
    }
  }
}
