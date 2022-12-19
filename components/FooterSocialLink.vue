<script>
import { gsap } from 'gsap'
import {
  find,
  hasClass,
  isTouchDevice,
  onFontLoaded,
} from '~/scripts/elements.js'
import imagesLoaded from 'imagesloaded'
import Sbimage from '@/components/Sbimage.vue'

export default {
  name: 'FooterSocialLink',
  props: ['sbData'],

  components: { Sbimage },

  data() {
    //andere schreibweise für function() {
    return {}
  },
  methods: {},

  mounted: function() {
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
  <a
    :aria-label="sbData.text_name"
    :href="sbData.link.url"
    target="_blank"
    rel="noopener noreferrer"
    class="footer-sl"
  >
    <Sbimage
      :class="'footer-sl-icon'"
      :imgParams="{
        src: sbData.icon.filename,
        fitIn: false,
      }"
    />

    <!-- <svg
      class="footer-sl-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 14"
    >
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <g id="Group_130" data-name="Group 130">
            <path
              id="Path_101"
              data-name="Path 101"
              d="M7,0a7,7,0,1,0,7,7A7,7,0,0,0,7,0m3.52,5.67v.22a4.78,4.78,0,0,1-4.74,4.8H5.72a4.75,4.75,0,0,1-2.59-.76,2.69,2.69,0,0,0,.4,0,3.41,3.41,0,0,0,2.1-.73A1.68,1.68,0,0,1,4.05,8.06l.32,0A1.74,1.74,0,0,0,4.82,8,1.68,1.68,0,0,1,3.46,6.38v0a1.74,1.74,0,0,0,.77.21,1.68,1.68,0,0,1-.75-1.41,1.55,1.55,0,0,1,.22-.84A4.81,4.81,0,0,0,7.18,6.08a1.69,1.69,0,0,1,2.88-1.54,3.17,3.17,0,0,0,1.07-.41,1.77,1.77,0,0,1-.74.94,3.34,3.34,0,0,0,1-.27,3.31,3.31,0,0,1-.84.87"
            />
          </g>
        </g>
      </g>
    </svg> -->
  </a>
</template>



<style lang="scss" scoped="true">
@import '@/styles/tools.scss';

.footer-sl {
  // position: relative;

  @include media('<=tablet-l') {
  }
  @include media('<tablet-l') {
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
  }
  @include media('<phone') {
  }
}

.footer-sl-icon {
  height: grid(1);
  fill: var(--main-color);
  margin-right: grid(1);
  display: inline-block;

  @include media('<desktop-l') {
    height: 20px;
    margin-right: 20px;
  }
  @include media('<tablet-l') {
    margin-right: 16px;
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
    margin-right: 10px;
  }
  @include media('<phone') {
  }
}
</style>
