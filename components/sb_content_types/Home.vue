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
import Wertschoepfung from '@/components/Wertschoepfung.vue'
import Geschichte from '@/components/Geschichte.vue'
// import Spuren from '@/components/Spuren.vue'
import Verwaltungsrat from '@/components/Verwaltungsrat.vue'
import Governance from '@/components/Governance.vue'

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
    Geschichte,
    Verwaltungsrat,
    Governance,
    Wertschoepfung,
    // Spuren
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
    <Intro :sectioncontent="pagecontent.intro[0]"></Intro>
    <Haltung :sectioncontent="pagecontent.haltung"></Haltung>
    <Ansatz :sectioncontent="pagecontent.ansatz"></Ansatz>
    <Wertschoepfung
      :sectioncontent="pagecontent.Wertschoepfung"
    ></Wertschoepfung>
    <Geschichte
      :sectioncontent="pagecontent.geschichte[0]"
      :spurencontent="pagecontent.Spuren"
    ></Geschichte>
    <!-- <Spuren :sectioncontent="pagecontent.spuren"></Spuren> -->
    <Governance :sectioncontent="pagecontent.governance"></Governance>
    <Verwaltungsrat
      :sectioncontent="pagecontent.verwaltungsrat[0]"
    ></Verwaltungsrat>
  </div>
</template>

<style lang="scss">
@import '@/styles/tools.scss';

.home {
  // margin-bottom: 3vw;

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
