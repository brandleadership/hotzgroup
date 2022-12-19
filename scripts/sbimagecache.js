const https = require('https')
const request = require('request')
const crypto = require('crypto')
const fs = require('fs')

export default function(req, res, next) {
  // req is the Node.js http request object
  //console.log(req.url)
  //console.log(req)

  //let query = Object.keys(route.query)
  var uri = 'https://img2.storyblok.com' + req.url
  const file_extension = uri.split('.').pop()
  const hash = crypto
    .createHash('md5')
    .update(uri)
    .digest('hex')
    .replace('//', '_')
    .replace(/[^a-zA-Z0-9-. ]/g, '_')

  const filename = 'static/sbimagecache/' + hash + '.' + file_extension

  console.log(filename)

  if (!fs.existsSync(filename)) {
    request.head(uri, function(err, res, body) {
      request(uri)
        .pipe(fs.createWriteStream(filename))
        .on('close', () => {
          //redirect('/sbimagecache/'    + hash + '.' + file_extension)
        })
    })
  } else {
    //redirect('/sbimagecache/' + hash + '.' + file_extension)
    /* fs.readFile(filename, function(err, data) {
      if (err) throw err // Fail if the file can't be read.
      res.writeHead(200, { 'Content-Type': 'image/jpeg' })
      res.write(Buffer.from(data).toString('base64'))
    }) */
    next()
  }

  // res is the Node.js http response object

  // next is a function to call to invoke the next middleware
  // Don't forget to call next at the end if your middleware is not an endpoint!
  //next()
}
