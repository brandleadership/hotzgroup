const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const env = require('../env.config.js')
const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'
config.build.devtools = config.dev

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const host = '0.0.0.0'
  const port = env.port || process.env.PORT || 3000

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  /**
   * do not allow search engines to index dev or staging sites
   * for production send the robots.txt found in  /static/robots.txt
   */
  app.get('/robots.txt', function(req, res) {
    console.log('robots', process.env.APP_ENV)

    if (process.env.APP_ENV === 'production') {
      res.sendFile(req, res, path.join(__dirname, '../static', 'robots.txt'))
    } else {
      res.type('text/plain')
      res.send('User-agent: *\nDisallow: /')
    }
  })

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `[${env.NAME}] Server listening on http://${host}:${port}`,
    badge: true,
  })
}
start()
