/**
 *
 * Transforms elements x-browser
 *
 **/
const Transform = () => {
  const transforms = [
    'transform',
    'msTransform',
    'webkitTransform',
    'mozTransform',
    'oTransform',
  ]
  let transformProperty

  const getSupportedPropertyName = properties => {
    for (let i = 0; i < properties.length; i += 1) {
      if (typeof document.body.style[properties[i]] !== 'undefined') {
        return properties[i]
      }
    }
    return null
  }

  const translate = (element, xPos = 0, yPos = 0) => {
    if (transformProperty === undefined) {
      transformProperty = getSupportedPropertyName(transforms)
    }
    element.style[transformProperty] = `translate(${xPos}, ${yPos})`
  }

  return {
    translate,
  }
}

export default Transform()
