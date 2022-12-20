<script>
import { gsap, Power0, Power2, Power3, Power4, Linear } from 'gsap'
import {
  find,
  hasClass,
  isTouchDevice,
  onFontLoaded,
} from '~/scripts/elements.js'
import imagesLoaded from 'imagesloaded'
import { addListener, removeListener } from '~/scripts/events'
import { mapState } from 'vuex'
import Sbimage from '@/components/Sbimage.vue'

export default {
  name: 'Loading',
  components: {
    Sbimage,
  },
  data: () => ({}),

  computed: {
    ...mapState(['isLoading']),
  },

  watch: {
    isLoading(newValue, oldValue) {
      if (newValue) {
        this.show().play()
      } else {
        this.show().progress(1)
        this.hide().play()
      }
    },
  },

  methods: {
    show: function () {
      const loading = find('.initloading-container')

      if (this.showTl) {
        this.showTl.kill(0)
      }

      this.showTl = gsap
        .timeline({ paused: true })
        .set(loading, { display: 'flex' }, 0)

      return this.showTl
    },

    hide: function () {
      const loading = find('.initloading-container')

      const bg = find('.initloading-blackbg')[0]

      const time = 1

      if (this.hideTl) {
        this.hideTl.kill(0)
      }

      this.hideTl = gsap
        .timeline({
          paused: true,
          delay: 0.2,
        })

        .fromTo(
          bg,
          { scaleY: 1 },
          {
            duration: time,
            scaleY: 0,
            ease: Power4.easeOut,
            transformOrigin: 'top',
          },
          0
        )
        .set(loading, { display: 'none' })
      // .set(canvasblocker, { opacity: 0 })

      return this.hideTl
    },
  },
  mounted: function () {},
}
</script>

<template>
  <div class="initloading-container">
    <div class="initloading-box">
      <div
        class="js-initloading-recolor js-initloading-topbox initloading-blackbg"
      >
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/styles/tools.scss';

.initloading-container {
  display: block;
  z-index: $z-galaxy;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;

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
}

.initloading-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  // opacity: 0;
}

.initloading-blackbg {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: var(--main-color);
}
</style>
