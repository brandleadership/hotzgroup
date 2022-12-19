<script>
import { gsap, Power2, Power3, Linear } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import {
  find,
  hasClass,
  isTouchDevice,
  onFontLoaded,
} from '~/scripts/elements.js'
import imagesLoaded from 'imagesloaded'

import Sbimage from '@/components/Sbimage.vue'
import ObjectFitImage from '@/components/ObjectFitImage.vue'
import SbRichText from '@/components/SbRichText.vue'

gsap.registerPlugin(ScrollTrigger)

export default {
  props: ['pagecontent'],
  components: {
    Sbimage,
    ObjectFitImage,
    SbRichText,
  },

  data() {
    return {
      underlines: null,
      words: null,
      underlinesWork: null,
      wordsWork: null,
    }
  },
  methods: {},

  mounted: function() {
    // const elements = find('img', this.$el)
    // onFontLoaded(() => {
    //   this.$nextTick(() => {
    //     imagesLoaded(elements, () => {
    //       setTimeout(() => {
    //       }, 100)
    //     })
    //   })
    // })
  },
}
</script>

<template>
  <div class="home js-transition transition">
    <SbRichText class="home-text" :richTextParams="pagecontent.text_home" />

    <div class="js-home-image-box home-image-box">
      <ObjectFitImage
        :class="'js-home-pic home-image'"
        :imageSource="pagecontent.image_home.filename"
        :SbimageParams="{
          width: 2227,
          height: 1128,
          bp: {
            1920: { width: 1670 },
            1600: { width: 1395 },
            1024: { width: 893 },
          },
        }"
      />
    </div>
  </div>
</template>

<style lang="scss">
@import '@/styles/tools.scss';

.home {
  // margin-bottom: 3vw;
  padding: grid(2);
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

.home-row3-picbox {
  display: flex;
  align-items: flex-end;
  flex-wrap: nowrap;
}

.home-image-box {
  width: grid(60);
  height: 40vw;
  position: relative;
  overflow: hidden;
}

.home-text {
  color: var(--main-color);
  text-transform: uppercase;
  font-size: getVw(60px);
  line-height: 1em;
  margin-left: -0.15vw;
  width: grid(55);
  display: block;
  text-indent: grid(2);

  p {
    margin-bottom: 1.4vw;
    text-indent: grid(2);
  }
  p:first-of-type {
    text-indent: 0;
  }
}
</style>
