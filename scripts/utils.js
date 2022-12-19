export const shuffle = arr => {
  let a = arr.slice(0)
  var j, x, i
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}

export const isEmpty = obj => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false
  }
  return true
}

export const getScrollPosition = (element = document.documentElement) =>
  Math.max(
    element.scrollTop,
    document.body.scrollTop,
    window.pageYOffset,
    window.scrollY
  )

export const isTouchDevice = () => {
  return (
    !!(
      typeof window !== 'undefined' &&
      ('ontouchstart' in window ||
        (window.DocumentTouch &&
          typeof document !== 'undefined' &&
          document instanceof window.DocumentTouch))
    ) ||
    !!(
      typeof navigator !== 'undefined' &&
      (navigator.maxTouchPoints || navigator.msMaxTouchPoints)
    )
  )
}
export const getRandomNumber = (from, to) => {
  return Math.floor(Math.random() * to) + from
}

export const slugify = string => {
  string = string.replace(/[^\s|a-z|A-Z|0-9]/g, '')
  console.log('[slug first replace]', string)
  string = string.replace(/\s/g, '-')

  // if last char is - remove it
  if (string.slice(-1) === '-') {
    string = string.substring(0, string.length - 1)
  }
  return string
}

export const setCookie = (name, value, expires) => {
  expires = '; expires=' + expires
  /* var expires = ''
  if (days) {
    var date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = '; expires=' + date.toUTCString()
  } */
  document.cookie = name + '=' + (value || '') + expires + '; path=/'
}
export const getCookie = name => {
  var nameEQ = name + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) == ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}
export const eraseCookie = name => {
  document.cookie = name + '=; Max-Age=-99999999;'
}

export const createSbUrl = (imgParams, useWebp) => {
  if (useWebp == undefined) useWebp = testWebpSupport()

  let imageService = 'https://img2.storyblok.com/'
  let path = imgParams.src
    .replace('https://a.storyblok.com', '')
    .replace('//a.storyblok.com', '')
    .replace('https://img2.storyblok.com/', '')

  let fitIn = imgParams.fitIn ? 'fit-in/' : ''

  let filters = '/filters:quality(90)'

  if (imgParams.quality) {
    filters = '/filters:quality(' + imgParams.quality + ')'
  }

  if (useWebp) {
    filters += ':format(webp)'
  }

  let smartcrop = imgParams.smartcrop ? '/smart' : ''

  if (imgParams.width == undefined) imgParams.width = 0

  if (imgParams.height == undefined) imgParams.height = 0

  return (imgParams.src =
    imageService +
    fitIn +
    imgParams.width +
    'x' +
    imgParams.height +
    smartcrop +
    filters +
    path
  )
}

export const extractSizeFromSBImage = imageurl => {
  const arrUrlParts = imageurl.split('/')
  const size = arrUrlParts[5].split('x')

  return {
    w: size[0],
    h: size[1]
  }
}

export const testWebpSupport = () => {
  // CHROME
  if (navigator.userAgent.indexOf('Chrome') != -1) {
    return true
  }
  // FIREFOX
  else if (navigator.userAgent.indexOf('Firefox') != -1) {
    return true
  }
  // EDGE
  else if (navigator.userAgent.indexOf('Edge') != -1) {
    return true
  }
  // OPERA
  else if (navigator.userAgent.indexOf('Opera') != -1) {
    return true
  }
  return false
}
