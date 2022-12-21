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
import Intro from '@/components/Intro.vue'
import Ansatz from '@/components/Ansatz.vue'
import Haltung from '@/components/Haltung.vue'

gsap.registerPlugin(ScrollTrigger)

export default {
  props: ['pagecontent'],
  components: {
    Sbimage,
    ObjectFitImage,
    SbRichText,
    Intro,
    Ansatz,
    Haltung,
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

  mounted: function () {
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
    <Intro :sectioncontent="pagecontent.intro[0]"></Intro>
    <Haltung :sectioncontent="pagecontent.haltung"></Haltung>
    <Ansatz :sectioncontent="pagecontent.ansatz"></Ansatz>
  </div>
</template>

<style lang="scss">
@import '@/styles/tools.scss';

.home {
  // margin-bottom: 3vw;
  @include sidepadding('padding');

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
</style>
