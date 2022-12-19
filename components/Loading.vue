<script>
import { gsap, Power0, Power2, Power3, Linear } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin.js'

import {
  find,
  hasClass,
  isTouchDevice,
  onFontLoaded,
} from '~/scripts/elements.js'
import { createSbUrl, shuffle } from '~/scripts/utils.js'
import imagesLoaded from 'imagesloaded'
import ObjectFitImage from '@/components/ObjectFitImage.vue'

import { addListener, removeListener } from '~/scripts/events'
import Vuex from 'vuex'
import { mapState } from 'vuex'
import Sbimage from '@/components/Sbimage.vue'
import { clearTimeout } from 'timers'
import { log } from 'util'

export default {
  name: 'Loading',
  components: {
    Sbimage,
    ObjectFitImage,
  },

  data: () => ({
    isLoading: false,
  }),

  methods: {
    start() {
      this.show().play(0)
      this.isLoading = true
      this.isPageTransition = true
    },

    finish() {
      if (this.isLoading) {
        setTimeout(() => {
          this.hide().play(0)
          this.isLoading = false
          this.isPageTransition = false
        }, 700)
      }
      this.isLoading = false
    },

    show: function () {
      const loading = find('.js-loading-container')[0]
      const yellowbox = find('.js-loading-yellowbox', this.$el)[0]
      // const pagetransition = find('.js-pagetransition')[0]

      if (this.showTl) {
        this.showTl.kill(0)
      }

      this.showTl = gsap
        .timeline({ paused: true })
        .set(loading, { visibility: 'visible' }, 0)
        .fromTo(
          yellowbox,
          { scaleY: 0 },
          {
            duration: 0.6,
            scaleY: 1,
            ease: Power3.easeInOut,
            transformOrigin: 'top',
          },
          0
        )
      // .fromTo(
      //   pagetransition,
      //   { y: 0 },
      //   {
      //     duration: 0.6,
      //     y: '30vh',
      //     ease: Power2.easeIn,
      //   },
      //   0
      // )
      return this.showTl
    },

    hide: function () {
      const loading = find('.js-loading-container')[0]
      const yellowbox = find('.js-loading-yellowbox', this.$el)[0]
      // const pagetransition = find('.js-pagetransition')[0]

      if (this.hideTl) {
        this.hideTl.kill(0)
      }

      this.hideTl = gsap
        .timeline()
        .fromTo(
          yellowbox,
          { scaleY: 1 },
          {
            duration: 0.6,
            scaleY: 0,
            ease: Power3.easeInOut,
            transformOrigin: 'bottom',
          },
          0
        )
        // .fromTo(
        //   pagetransition,
        //   { y: '-20vh' },
        //   {
        //     duration: 0.6,
        //     y: 0,
        //     ease: Power2.easeOut,
        //   },
        //   0
        // )
        .set(loading, { visibility: 'hidden' }, '>')

      return this.hideTl
    },
  },

  mounted: function () {
    // onFontLoaded(() => {
    //   this.$nextTick(() => {
    //     imagesLoaded(elements, () => {
    //       // this.spatzekscroll = SpatzekScroll()
    //       if (isTouchDevice() == false) {
    //         addListener(window, 'resize', this.onResize)
    //       } else {
    //         window.addEventListener('orientationchange', () => {
    //           var afterOrientationChange = () => {
    //             this.onResize()
    //             window.removeEventListener('resize', afterOrientationChange)
    //           }
    //           window.addEventListener('resize', afterOrientationChange)
    //         })
    //       }
    //     })
    //   })
    // })
  },
}
</script>

<template>
  <div
    class="js-loading-container loading-container"
    :class="{ 'loading-container-active': this.isLoading }"
  >
    <div class="js-loading-yellowbox loading-yellowbox"></div>
  </div>
</template>

<style lang="scss">
@import '@/styles/tools.scss';

.loading-container {
  display: flex;
  visibility: hidden;
  z-index: $z-galaxy;
  position: fixed;
  top: 0;
  width: 100%;
  height: vh(100);
  text-align: center;
  justify-content: center;
  align-items: center;
  color: var(--bg-color);

  @include media('<tablet-l') {
    left: 0;
    width: 100%;
  }

  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }

  @include media('<tablet') {
  }

  @include media('<=phone') {
  }

  .yellow-border {
    z-index: 3;
  }
}

.loading-container-active {
  pointer-events: all;
}

.loading-yellowbox {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: var(--brand-color);
  transform: scaleY(0);
  will-change: transform;
  z-index: 5;
}
</style>
