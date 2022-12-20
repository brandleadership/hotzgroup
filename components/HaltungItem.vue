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

// import SbLink from '@/components/SbLink.vue'

export default {
  name: 'HaltungItem',
  props: ['haltungitem'],
  components: { Sbimage },

  data() {
    //andere schreibweise für function() {
    return {}
  },
  methods: {},

  mounted: function () {
    const elements = find('img', this.$el)
    onFontLoaded(() => {
      this.$nextTick(() => {
        imagesLoaded(elements, () => {
          setTimeout(() => {
            //do something
          }, 100)
        })
      })
    })
  },
}
</script>




<template>
  <div class="haltung-item">
    <div class="bg-color"></div>
    <div class="haltung-hl-box">
      <h1 class="haltung-headline-l1">{{ haltungitem.Headline_Line1 }}</h1>
      <h1 v-if="haltungitem.Headline_Line2" class="haltung-headline-l1">{{
        haltungitem.Headline_Line2
      }}</h1>
    </div>
    <div v-if="haltungitem.Image" class="haltung-picbox">
      <Sbimage
        :class="'haltung-pic'"
        :imgParams="{
          src: haltungitem.Image,
          width: 2560,
          quality: 60,
          alt: 'famous pic',
          bp: {
            1920: { width: 1920 },
            1600: { width: 1600 },
            1366: { width: 1366 },
          },
        }"
      />
    </div>
    <div class="haltung-textbox">
      <p class="haltung-text"> {{ haltungitem.Text }}</p>
      <a
        v-if="haltungitem.link"
        class="haltung-link"
        :href="haltungitem.link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="footer-link-txt">{{ haltungitem.Link_Text }}</span>
      </a>
    </div>
  </div>
</template>



<style lang="scss" scoped="true">
@import '@/styles/tools.scss';

.haltung-item {
  // position: relative;
  display: flex;
  // justify-content: center;
  flex-direction: column;
  align-items: center;

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

.haltung-picbox {
  position: relative;
  width: calc(100% - #{grid(4)});
  height: calc(100vh - #{grid(8)});
}
.haltung-pic {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.haltung-textbox {
  width: grid(56);
  margin-left: grid(34);
}
.haltung-text {
  font-size: getVw(50px);
  line-height: 1.1em;
  @include sec-font;
}

.haltung-link {
  display: block;
  position: relative;
  margin-top: 60px;
  @include italic-font;
}
</style>
