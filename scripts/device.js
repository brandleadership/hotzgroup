const Device = () => {
  const device = {}
  // const breakpoints = {
  //   phone: {
  //     name: 'phone',
  //     width: 375,
  //     mq: `(max-width: 375px)`,
  //   },
  //   tablet: {
  //     name: 'tablet',
  //     width: 768,
  //     mq: `(max-width: 768px)`,
  //   },
  //   'tablet-l': {
  //     name: 'tablet-l',
  //     width: 1024,
  //     mq: `(max-width: 1024px)`,
  //   },
  //   'tablet-xxl': {
  //     name: 'tablet-xxl',
  //     width: 1367,
  //     mq: `(max-width: 1367px)`,
  //   },
  //   desktop: {
  //     name: 'desktop',
  //     width: 1600,
  //     mq: `(max-width: 1600px)`,
  //   },
  //   'desktop-xxl': {
  //     name: 'desktop-xxl',
  //     width: 2260,
  //     mq: `(max-width: 2260px)`,
  //   },
  // }

  const isTouch = () => {
    return (
      'ontouchstart' in window ||
      navigator.MaxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    )
  }

  const init = () => {
    device.width = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    )
    device.height = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    )
    device.isTouch = isTouch()
  }

  // const findBreakpoint = width => {
  //   let bp = {}
  //   reverseForIn(breakpoints, breakpoint => {
  //     if (width <= breakpoints[breakpoint].width) {
  //       bp = breakpoints[breakpoint]
  //       return bp
  //     }
  //   })
  //   return bp
  // }
  //
  // const reverseForIn = (obj, f) => {
  //   var arr = []
  //   for (var key in obj) {
  //     if (obj.hasOwnProperty(key)) {
  //       arr.push(key)
  //     }
  //   }
  //   for (var i = arr.length - 1; i >= 0; i--) {
  //     f.call(obj, arr[i])
  //   }
  // }

  init()

  return {
    device,
  }
}

export default Device
