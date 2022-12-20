<script>
import { gsap, Power2 } from 'gsap'
import {
  find,
  hasClass,
  isTouchDevice,
  onFontLoaded,
} from '~/scripts/elements.js'
import imagesLoaded from 'imagesloaded'

export default {
  props: ['sbData', 'page'],
  data() {
    //andere schreibweise für function() {
    return {}
  },
  computed: {
    storeLevels: function () {
      return this.$store.state.menuLevels
    },
    link: function () {
      if (this.isExternal) {
        // external links
        return this.sbData.link.cached_url
      } else {
        if (this.sbData.link.cached_url == '/')
          return this.sbData.link.cached_url
        else return '/' + this.sbData.link.cached_url
      }
    },

    isExternal: function () {
      const url = this.sbData.link.cached_url
      if (url === undefined) return false
      const match = url.match(
        /^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/
      )

      if (typeof match[1] === 'string' && match[1].length > 0) return true
      if (typeof match[2] === 'string' && match[2].length > 0) {
        return true
      }

      return false
    },

    isActive: function () {
      if (this.storeLevels !== undefined) {
        for (var i = 0; i < this.storeLevels.length; i++) {
          if (
            this.link == '/' + this.storeLevels[i].full_slug ||
            this.link + '/' == '/' + this.storeLevels[i].full_slug ||
            this.link == '/' + this.storeLevels[i].full_slug + '/'
          ) {
            return true
          }
        }
      }

      return false
    },
    isHomeLink: function () {
      // return this.$route.path == '/'
      return this.link == '/' || this.link == '/home'
    },
  },

  methods: {
    checkIsExternal: function () {
      const url = this.sbData.link.cached_url
      if (url === undefined) return false
      const match = url.match(
        /^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/
      )

      if (typeof match[1] === 'string' && match[1].length > 0) return true
      if (typeof match[2] === 'string' && match[2].length > 0) {
        return true
      }

      return false
    },
    onclick: function () {
      this.$store.commit('setShowCounter', false)
    },

    // showBall: function() {
    //   const thisLink = this.$refs.thisLink
    //   console.log(thisLink.$el.classList.contains('nuxt-link-active'))
    //   return thisLink.$el.classList.contains('nuxt-link-active')
    // },
  },
  mounted: function () {
    // const elements = find('img', this.$el)
    // onFontLoaded(() => {
    //   this.$nextTick(() => {
    //     imagesLoaded(elements, () => {
    //       setTimeout(() => {
    //         //do something
    //       }, 100)
    //     })
    //   })
    // })
  },
}
</script>

<template>
  <div v-editable="sbData" class="js-navitem navitem" @click="onclick">
    <div class="navitem-container">
      <!-- <div class="navitem-ball"></div> -->

      <nuxt-link
        :class="{
          'js-navitem-text': true,
          'navitem-text': true,
          'navitem-item-home': isHomeLink,
          'nav-item-active': isActive,
        }"
        v-if="!isExternal"
        :to="link"
        ref="thisLink"
        >{{ sbData.content }}</nuxt-link
      >

      <a
        v-if="isExternal"
        :class="{
          'js-navitem-text': true,
          'external-link': true,
          'navitem-text': true,
        }"
        :href="link"
        target="_blank"
        rel="noopener noreferrer"
        >{{ sbData.content }}</a
      >
    </div>
  </div>
</template>

<style lang="scss">
@import '@/styles/tools.scss';

.navitem {
  display: flex;
  &:hover {
    color: var(--brand-color);
    // text-decoration: line-through;
  }
  @include media('<tablet') {
  }
}
.nuxt-link-active {
  color: var(--brand-color);
  // text-decoration: line-through;

  // @include media('<=tablet-l') {
  //   text-decoration: none;
  // }
}

.navitem-container {
  display: flex;
  overflow: hidden;
}
.navitem-text {
  margin-left: grid(1);
}

.header-menu {
  .navitem {
    @include regular-font;
    display: flex;
    color: var(--sec-color);
    // &:hover {
    //   color: var(--bg-color) !important;
    //   text-decoration: none !important;
    // }
    .nuxt-link-active {
      color: var(--sec-color) !important;
      text-decoration: underlined !important;
    }
    @include media('<=tablet-l') {
      // font-size: 10vw;
    }
    @include media('<=tablet-l') {
      @media (orientation: landscape) {
        font-size: 10vw;
      }
    }
    @include media('<tablet-l') {
    }
    @include media('<tablet-l') {
      @media (orientation: landscape) {
        font-size: 7.5vw;
      }
    }
    @include media('<tablet') {
    }
  }
  .navitem-container {
    display: flex;
  }
  .navitem-text {
    margin-left: 0;
  }
}
</style>
