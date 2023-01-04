<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'

import {
  find,
  hasClass,
  isTouchDevice,
  onFontLoaded,
} from '~/scripts/elements.js'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import imagesLoaded from 'imagesloaded'
import { addListener, removeListener } from '~/scripts/events'
// const https = process.server ? require('https') : null
// const request = process.server ? require('request') : null
// const crypto = process.server ? require('crypto') : null
// const fs = process.server ? require('fs') : null

export default {
  components: {
    Header,
    Footer,
  },

  data() {
    return {}
  },

  // middleware({ store, redirect, route, auth }) {
  //   switch (route.path) {
  //     case '/':
  //       return redirect('/home')
  //       break
  //   }
  // },

  head() {
    return {
      title: this.settings.page_name + ' - ' + this.page.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.settings.meta_description,
        },
        {
          hid: 'keyword',
          name: 'keyword',
          content: this.settings.meta_keywords,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.settings.og_title,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.settings.og_image,
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: this.settings.og_site_name,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.settings.og_description,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.settings.og_url,
        },
      ],
    }
  },
  async asyncData({ route, params, store, app }) {
    let no_cache = false
    let path = route.path
    if (route.path == '/') path = '/home'

    let page = await app.sbApi.getPage(path, no_cache)
    let settings = await app.sbApi.loadSettings()

    if (!page) {
      page = await app.sbApi.getPage('/error404')
      route.statusCode = 404
    }

    if (page && page.content.body) {
      for (let i = 0; i < page.content.body.length; i++) {
        var contentitem = page.content.body[i]
        switch (contentitem.component) {
        }
      }
    }
    switch (page.content.component) {
      case 'ProjectOverview':
        let projects = {}
        page.content.projects = {}
        let page_num_projects = 1

        do {
          projects = Object.values(
            await app.sbApi.getEntriesBy('Project', page_num_projects++)
          )

          projects.forEach((element) => {
            var index = Object.values(page.content.projects).length
            page.content.projects[index] = { ...element }
          })
        } while (Object.values(projects).length)
        break
      //REALLY?
      case 'Project':
        let project = {}
        page.content.projects = {}
        let page_num_project = 1

        do {
          project = Object.values(
            await app.sbApi.getEntriesBy('Project', page_num_project++)
          )

          project.forEach((element) => {
            var index = Object.values(page.content.projects).length
            page.content.projects[index] = { ...element }
          })
        } while (Object.values(project).length)
        break
    }

    //this.storeRandomLoaderImages(store)
    store.commit('setLoaderImages', settings.loader_images)
    return { page, settings }
  },

  // watch: {
  //   $route: {
  //     deep: true,
  //     handler: function() {
  //       console.log('route changed', this.$route)
  //     },
  //   },
  // },
  methods: {
    // onResize: function() {},

    loadImagesRecursive: function (components) {
      // dont do anything until the nuxt loader ist ready

      if (this.$nuxt.$loading.loading || this.$store.state.isLoading) return

      if (components == undefined) components = this.$children

      components.forEach((child) => {
        if (child.$options.name != 'Sbimage') {
          this.loadImagesRecursive(child.$children)
          return
        }

        if (!child.loadLazy && !child.loadedLazy && this.cntImagesLoading < 3) {
          this.cntImagesLoading++
          child.load(true)
        }
      })
    },
    pageNameToClassName: function (pagename) {
      return pagename.toLowerCase().split(' ').join('_')
    },

    //COLORS FROM CMS
    getColorsFromStoryblok: function () {
      document.documentElement.style.setProperty(
        '--main-color',
        this.settings.color_main
      )
      document.documentElement.style.setProperty(
        '--sec-color',
        this.settings.color_secondary
      )
      document.documentElement.style.setProperty(
        '--background-color',
        this.settings.color_background
      )
      document.documentElement.style.setProperty(
        '--brand-color',
        this.settings.color_brand
      )
      document.documentElement.style.setProperty(
        '--brand-color2',
        this.settings.color_brand_2
      )
    },
  },

  mounted: function () {
    //COLORS FROM CMS
    // this.getColorsFromStoryblok()

    const elements = find('img')
    imagesLoaded(elements, () => {
      this.$store.commit('isLoading', false)

      // if (isTouchDevice() == false) {
      //   addListener(window, 'resize', this.onResize)
      // } else {
      //   window.addEventListener('orientationchange', () => {
      //     var afterOrientationChange = () => {
      //       this.onResize()
      //       window.removeEventListener('resize', afterOrientationChange)
      //     }
      //     window.addEventListener('resize', afterOrientationChange)
      //   })
      // }
    })
    this.loadInterval = setInterval(() => {
      this.cntImagesLoading = 0
      this.loadImagesRecursive()
    }, 500)
  },

  beforeRouteUpdate: function (to, from, next) {
    ScrollTrigger.getAll().map((trigger) => {
      trigger.kill()
    })
    this.$store.commit('setLastRoute', from.fullPath)
    next()
  },

  beforeRouteLeave: function (to, from, next) {
    this.$store.commit('setLastRoute', from.fullPath)
    next()
  },

  transition: {
    name: 'transition',
    mode: 'out-in',
    css: false,
    enter(el, done) {
      done()
    },
    leave(el, done) {
      setTimeout(() => {
        done()
      }, 600)
    },
  },
}
</script>

<template>
  <div
    id="Page"
    :key="'p-' + page._uid"
    :class="'page-' + this.pageNameToClassName(page.name)"
  >
    <Header :page="page" :globalSbSettings="settings" />
    <component
      v-if="page.content.component"
      :key="page._uid"
      :pagecontent="page.content"
      :globalSbSettings="settings"
      :is="page.content.component"
      class="relative js-pagetransition"
    ></component>
    <Footer :globalSbSettings="settings" />
  </div>
</template>

<style lang="scss">
@import '@/styles/tools.scss';

#Page {
  background-color: var(--bg-color);
}
.relative {
  position: relative;
}
</style>
