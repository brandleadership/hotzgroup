<script>
import { gsap, Power2 } from 'gsap'
import {
  find,
  hasClass,
  isTouchDevice,
  onFontLoaded,
} from '~/scripts/elements.js'
import imagesLoaded from 'imagesloaded'
import SbRichText from '@/components/SbRichText.vue'

export default {
  props: ['pagecontent'],
  components: {
    SbRichText,
  },

  data() {
    return {}
  },
  methods: {},

  mounted: function () {},
}
</script>

<template>
  <div class="imprint js-transition transition">
    <span class="imprint-hl">{{ pagecontent.text_headline }}</span>

    <SbRichText
      class="imprint-text"
      :richTextParams="pagecontent.text_content"
    />
    <!-- <component
      v-for="(contentitem, key) in pagecontent.body"
      :key="key"
      :contentitem="contentitem"
      :is="contentitem.component"
    ></component>-->
  </div>
</template>

<style lang="scss">
@import '@/styles/tools.scss';

.imprint {
  padding: grid(2);
  background-color: var(--bg-color);
  min-height: 100vh;

  @include media('<tablet-l') {
    padding: grid(3);
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
    padding: grid(5);
  }
}

.imprint-hl {
  display: block;
  @include sec-font;
  text-transform: uppercase;
  position: relative;
  font-size: getVw(285px);
  line-height: 0.787em;
  // text-indent: grid(10);
  margin-top: -0.6vw;
  margin-left: -0.35vw;
  @include media('<desktop') {
    font-size: getVw(320px);
  }

  @include media('<=tablet-l') {
    font-size: getVw(320px);
  }
  @include media('<tablet-l') {
    font-size: getVw(360px);
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
    font-size: getVw(370px);
    margin-top: 12vw;
  }
  @media only screen and (max-width: 500px) {
    margin-top: 16vw;
  }
}

.imprint-text {
  position: relative;
  display: block;
  width: grid(36);
  margin-top: 0.95vw;
  padding-bottom: 3.3vw;
  @include media('<=tablet-xxl') {
    // margin-top: 2vw;
    padding-bottom: 4.3vw;
    line-height: 1.3em;
    width: grid(40);
  }
  @include media('<=tablet-l') {
    margin-top: 2vw;
    width: grid(50);
    padding-bottom: 5vw;
  }
  @include media('<tablet-l') {
    width: grid(60);
    padding-bottom: 7vw;
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
    margin-top: 3vw;
    padding-bottom: 10vw;
    width: grid(86);
  }
  @include media('<phone') {
  }
}

.imprint-headline {
  position: relative;
  display: block;
  width: grid(36);
  font-size: getVw(50px);
  line-height: 0.9em;
  margin-top: 3vw;
  margin-bottom: 0.5vw;
  @include sec-font;
  @include media('<=desktop') {
    font-size: getVw(70px);
  }
  @include media('<=tablet-xxl') {
    font-size: getVw(80px);
  }
  @include media('<=tablet-l') {
    font-size: getVw(90px);
    margin-top: 4vw;
    margin-bottom: 0.7vw;
    width: grid(60);
  }
  @include media('<tablet-l') {
    margin-top: 5vw;
    margin-bottom: 1vw;
    width: grid(60);
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
    margin-top: 8vw;
    margin-bottom: 2vw;
    font-size: 30px;
    width: grid(86);
  }
  @include media('<phone') {
  }
}
</style>
