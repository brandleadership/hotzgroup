const pkg = require('./package')
const accesstoken = '6X8Z9utBY23RYXdC3rLOmAtt'
require('isomorphic-fetch')

module.exports = {
  loading: 'components/Loading.vue',
  telemetry: false,
  target: 'static',
  dev: process.env.NODE_ENV !== 'production',
  build: {
    filenames: {
      chunk: ({
        isDev
      }) => (isDev ? '[name].js' : '[name].[chunkhash].js'),
    },
    transpile: ['gsap'],
  },
  head: {
    htmlAttrs: {
      lang: 'en-US',
    },
    title: pkg.name,
    meta: [{
        charset: 'utf-8',
      },
      {
        name: 'theme-color',
        content: '#000',
      },
      {
        name: 'viewport',
        // content: 'initial-scale=1.0, width=device-width',
        content: 'width=device-width, initial-scale=1, maximum-scale = 5.0',
        // content: 'width=device-width, initial-scale=1, maximum-scale = 1.0, user-scalable = 0',
      },
      // {
      //   hid: 'description',
      //   name: 'description',
      //   content: 'Blumenkopf is no studio. With everything you need',
      // },      
      // {
      //   name: 'keyword',
      //   content: 'keyword1, keyword2',
      // },
      {
        hid: 'msapplication-TileColor',
        name: 'msapplication-TileColor',
        content: '#ffffff',
      },
      {
        hid: 'msapplication-TileImage',
        name: 'msapplication-TileImage',
        content: 'mstile-144x144.png',
      },
      {
        hid: 'msapplication-square70x70logo',
        name: 'msapplication-square70x70logo',
        content: 'mstile-70x70.png',
      },
      {
        hid: 'msapplication-square150x150logo',
        name: 'msapplication-square150x150logo',
        content: 'mstile-150x150.png',
      },
      {
        hid: 'msapplication-wide310x150logo',
        name: 'msapplication-wide310x150logo',
        content: 'mstile-310x150.png',
      },
      {
        hid: 'msapplication-square310x310logo',
        name: 'msapplication-square310x310logo',
        content: 'mstile-310x310.png',
      },
      // {
      //   hid: 'og:title',
      //   property: 'og:title',
      //   content: 'Blumenkopf kein studio',
      // },
      // {
      //   hid: 'og:image',
      //   property: 'og:image',
      //   content: 'https://sixmorevodka.com/images/smv_og_image_1200x630.jpg',
      // },
      // {
      //   hid: 'og:site_name',
      //   property: 'og:site_name',
      //   content: 'Blumenkopf',
      // },
      // {
      //   hid: 'og:description',
      //   property: 'og:description',
      //   content: 'Blumenkopf is no studio. With everything you need',
      // },
      // {
      //   hid: 'og:url',
      //   property: 'og:url',
      //   content: 'https://spatzek.studio',
      // },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website',
      },
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'apple-touch-icon-precomposed',
        size: '57x57',
        href: '/fav/apple-touch-icon-57x57.png',
      },
      {
        rel: 'apple-touch-icon-precomposed',
        size: '114x114',
        href: '/fav/apple-touch-icon-114x114.png',
      },
      {
        rel: 'apple-touch-icon-precomposed',
        size: '72x72',
        href: '/fav/apple-touch-icon-72x72.png',
      },
      {
        rel: 'apple-touch-icon-precomposed',
        size: '144x144',
        href: '/fav/apple-touch-icon-144x144.png',
      },
      {
        rel: 'apple-touch-icon-precomposed',
        size: '60x60',
        href: '/fav/apple-touch-icon-60x60.png',
      },
      {
        rel: 'apple-touch-icon-precomposed',
        size: '120x120',
        href: '/fav/apple-touch-icon-120x120.png',
      },
      {
        rel: 'apple-touch-icon-precomposed',
        size: '76x76',
        href: '/fav/apple-touch-icon-76x76.png',
      },
      {
        rel: 'apple-touch-icon-precomposed',
        size: '152x152',
        href: '/fav/apple-touch-icon-152x152.png',
      },
      {
        rel: 'icon',
        type: 'image/image/png',
        href: '/fav/favicon-196x196.png',
        sizes: '196x196',
      },
      {
        rel: 'icon',
        type: 'image/image/png',
        href: '/fav/favicon-96x96.png',
        sizes: '96x96',
      },
      {
        rel: 'icon',
        type: 'image/image/png',
        href: '/fav/favicon-32x32.png',
        sizes: '32x32',
      },
      {
        rel: 'icon',
        type: 'image/image/png',
        href: '/fav/favicon-16x16.png',
        sizes: '16x16',
      },
      {
        rel: 'icon',
        type: 'image/image/png',
        href: '/fav/favicon-128.png',
        sizes: '128x128',
      },
      {
        rel: 'preconnect',
        href: 'https://use.typekit.net',
      },
      {
        rel: 'preload',
        as: 'style',
        href: '/fonts/fonts.css',
      },
      {
        rel: 'preload',
        as: 'font',
        href: '/fonts/avenir/avenir-next-lt-pro-bold.woff',
        crossorigin: true,
      },
      {
        rel: 'preload',
        as: 'font',
        href: '/fonts/avenir/avenir-next-lt-pro-it.woff2',
        crossorigin: true,
      },
      {
        rel: 'preload',
        as: 'font',
        href: '/fonts/iskry/iskry-bold.woff2',
        crossorigin: true,
      },
    ],
    script: [
      // {
      //   src: 'https://use.typekit.net/lbj3dec.js',
      // },
      // {
      //   src: '/vendor/scrollto.js',
      //   ssr: false,
      // },
      // {
      //   src: '/vendor/vendor.js',
      //   ssr: false,
      // },
    ],
  },
  generate: {
    routes: function (callback) {
      const version = 'published'
      let routes = ['/']
      let toIgnore = ['settings']

      // load space data
      fetch(`https://api.storyblok.com/v1/cdn/spaces/me?token=${accesstoken}`).then(res => res.json()).then((space_res) => {

        // last published
        cache_version = space_res.space.version

        fetch(`https://api.storyblok.com/v1/cdn/links?token=${accesstoken}&version=${version}&cv=${cache_version}&per_page=100`).then(res => res.json()).then((res) => {

          Object.keys(res.links).forEach((key) => {
            if (!toIgnore.includes(res.links[key].slug)) {
              routes.push('/' + res.links[key].slug)
            }
          })

          callback(null, routes)
        })
      })
    }
  },
  router: {
    extendRoutes: function (routes, resolve) {
      // await fetch("https://api.storyblok.com/v1/cdn/stories/?starts_with=work/&token=" + accesstoken ).then(res => res.json()).then(res => {
      //   	res.stories.map(story => {
      //       routes.push({
      //         name: story.slug,
      //         path: story.slug == 'work' ? '/work' : '/work/' + story.slug,
      //         component: resolve(__dirname, 'pages/_slug.vue'),
      //       })
      //     })
      // })
      routes.push({
        name: 'page',
        path: '*',
        component: resolve(__dirname, 'pages/_slug.vue'),
      })

      // routes.push({
      //   name: 'error',
      //   path: '/error404',
      //   component: resolve(__dirname, 'pages/_slug.vue'),
      // })

      // routes.push({
      //   name: 'sites',
      //   path: '/work',
      //   component: resolve(__dirname, 'pages/_slug.vue'),
      // })
    },
  },

  webfontloader: {
    custom: {
      families: [
        'SuisseIntl-Book',
        'SangBleuOGSerif'
      ],
      urls: ['/fonts/fonts.css'],
    },
    // typekit: {  // DONT USE USE SCRIPT ABOVE INSTEAD!!!!!
    //   id: 'xxxx',
    // },
  },

  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/vuex-router-sync.js',
    '~plugins/api.js',
    '~/plugins/components.js',

    // { src: '~/plugins/polyfill.js', ssr: false },
    // {
    //   src: '~/plugins/facebookpixel.js',
    //   ssr: false,
    // },
    // {
    //   src: '~/plugins/pixi',
    //   ssr: false,
    // },
    {
      src: '~/plugins/ga.js',
      ssr: false,
    },
    // {
    //   src: '~/plugins/typekit.js',
    //   ssr: false,
    // },
    // {
    //   src: '~/plugins/photoswipe.js',
    //   ssr: false,
    // },
    {
      src: '~/plugins/splitting.js',
      ssr: false,
    },
    {
      src: '~/plugins/hooper.js',
      ssr: false,
    },
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    'nuxt-webfontloader',
    'nuxt-svg-loader',
    [
      'storyblok-nuxt',
      {
        accessToken: accesstoken,
        cache: {
          clear: 'auto',
          type: 'memory'
        }
        // cacheProvider: 'memory',
      },
    ],
  ],

  http: {
    baseURL: 'http://localhost:3000',
  },

  serverMiddleware: [{
      path: '~/scripts/api',
      handler: '~/scripts/api/index.js',
    },

    //{ path: '/sbimagecache', handler: '~/scripts/sbimagecache.js' },
  ],
  /*
   ** Build configuration
   */
  // build: {
  //   devtools: true,
  //   // transpile: ['gsap'],
  //   extend(config, ctx) {
  //     // Run ESLint on save
  //       if (ctx.isDev && ctx.isClient) {
  //         config.module.rules.push({
  //           enforce: 'pre',
  //           test: /\.(js|vue)$/,
  //           loader: 'eslint-loader',
  //           exclude: /(node_modules)/,
  //         })
  //       }
  //   },
  // },
}
