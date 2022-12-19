// if (
//   !('IntersectionObserver' in window) ||
//   !('IntersectionObserverEntry' in window) ||
//   !('intersectionRatio' in window.IntersectionObserverEntry.prototype)
// ) {
//   console.log('[polyfill] IntersectionObserver')
//   require('intersection-observer')
// }

if (!Array.prototype.find) {
  console.log('[polyfill] Array.find')
  Array.prototype.find =
    Array.prototype.find ||
    function(callback) {
      if (this === null) {
        throw new TypeError('Array.prototype.find called on null or undefined')
      } else if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function')
      }
      const list = Object(this)
      // Makes sures is always has an positive integer as length.
      const length = list.length >>> 0
      const thisArg = arguments[1]
      for (let i = 0; i < length; i++) {
        const element = list[i]
        if (callback.call(thisArg, element, i, list)) {
          return element
        }
      }
    }
}

if (typeof Object.assign !== 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, 'assign', {
    value: function assign(target, varArgs) {
      // .length of function is 2

      if (target == null) {
        // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object')
      }

      const to = Object(target)

      for (let index = 1; index < arguments.length; index++) {
        const nextSource = arguments[index]

        if (nextSource != null) {
          // Skip over if undefined or null
          for (const nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey]
            }
          }
        }
      }
      return to
    },
    writable: true,
    configurable: true,
  })
}
