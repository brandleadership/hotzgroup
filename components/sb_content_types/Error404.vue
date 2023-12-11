<script>
import { gsap, Linear, Power2 } from 'gsap'
import { find, hasClass, isTouchDevice } from '~/scripts/elements.js'
import { addListener, removeListener } from '~/scripts/events'
import Sbimage from '@/components/Sbimage.vue'
import SbRichText from '@/components/SbRichText.vue'
import SbTextArea from '@/components/SbTextArea.vue'
import ObjectFitImage from '@/components/ObjectFitImage.vue'

export default {
  props: ['pagecontent'],
  components: {
    Sbimage,
    SbTextArea,
    SbRichText,
    ObjectFitImage,
  },

  data() {
    return {}
  },
  computed: {},
  methods: {},

  mounted: function() {},

  beforeDestroy: function() {},
}
</script>

<template>
  <div class="error404 transition">
    <div class="error404-name-box">
      <SbTextArea class="error404-text">{{
        pagecontent.text_headline
      }}</SbTextArea>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/styles/tools.scss';

.error404 {
  position: relative;
  box-sizing: border-box;
  background-color: var(--main-color);
  // padding-top: $sidebar-width;
  // width: 100vw;
  // @include vh(100, min-height);
  // height: 100vh;

  @include media('<tablet-l') {
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
  }
}

.error404-name-box {
  position: relative;
  // bottom: grid(4);
  padding-top: grid(2);
  margin-left: grid(7);
  width: calc(100% - #{grid(16)});
  // left: $sidebar-width + $side-offset;
  @include media('<tablet-l') {
    // bottom: grid(18);
    // margin-left: grid(3);
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
    // bottom: grid(20);
    // margin-left: grid(5);
  }
}
.error404-name {
  position: relative;
}
.error404-text {
  font-size: getVw(300px);
  line-height: 0.8em;
  @include main-font;
  text-transform: uppercase;
}
</style>
