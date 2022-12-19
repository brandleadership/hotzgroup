export const prefetch = url => {
  return new Promise((resolve, reject) => {
    const link = document.createElement(`link`)
    link.rel = `prefetch`
    link.href = url

    link.onload = resolve
    link.onerror = reject

    document.head.appendChild(link)
  }).catch(err => {
    console.log(err)
  })
}
