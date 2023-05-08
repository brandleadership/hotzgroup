<script>
import { gsap, Power0, Power2 } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import {
  find,
  hasClass,
  isTouchDevice,
  onFontLoaded,
} from '~/scripts/elements.js'
import imagesLoaded from 'imagesloaded'
import Sbimage from '@/components/Sbimage.vue'

export default {
  name: 'GeschichteSpuren',
  props: ['spurencontent'],
  components: { Sbimage },

  data() {
    //andere schreibweise für function() {
    return {}
  },
  methods: {},

  mounted: function() {},
}
</script>

<template>
  <section class="geschichte-spuren">
    <div class="geschichte-spur1">
      <div class="geschichte-spur1-sticker">
        <Sbimage
          :class="'geschichte-spuren-pic'"
          :imgParams="{
            src: spurencontent[0].Spur1_Image,
            width: 2560,
            quality: 60,
            alt: 'gradient',
            bp: {
              1920: { width: 1920 },
              1600: { width: 1600 },
              1366: { width: 1366 },
            },
          }"
        />
        <div class="geschichte-spur1-blocker-top"></div>
        <div class="geschichte-spur1-blocker-center">
          <div class="geschichte-spur1-blocker-left"></div>
          <svg class="spur-1-number" viewBox="0 0 467 560">
            <path
              d="m0,0v560h467V0H0Zm377.661,552.38H89.761v-4.2h94.6V69.38l.1-10.2L41.561,126.58l-1.8-3.7L257.961,19.88c4.5-2.4,9.3-4.7,14.4-7.5h1.4l.4-.1.1.1h8.4l.1,535.8h94.9v4.2Z"
            />
          </svg>
          <div class="geschichte-spur1-blocker-right"></div>
        </div>
        <div class="geschichte-spur1-blocker-bottom"></div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped="true">
@import '@/styles/tools.scss';

.geschichte-spuren {
  position: relative;
  margin-top: 60vh;
}
.geschichte-spur1 {
  height: 300vh;
  display: flex;
  justify-content: center;
  width: 100vw;
  // background-color: green;
}
.geschichte-spur1-sticker {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // background-color: red;
}
.spur-1-number {
  height: 70vh;
  flex-shrink: 0;
  path {
    fill: var(--brand-color);
  }
}
.geschichte-spur1-blocker-top,
.geschichte-spur1-blocker-bottom {
  background-color: var(--brand-color);
  height: 100%;
  width: 100%;
  position: relative;
}
.geschichte-spur1-blocker-center {
  display: flex;
  width: 100%;
  position: relative;
}
.geschichte-spur1-blocker-left,
.geschichte-spur1-blocker-right {
  background-color: var(--brand-color);
  height: 100%;
  width: 100%;
}
.geschichte-spuren-pic {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>
