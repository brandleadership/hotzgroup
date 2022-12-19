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
    <div class="error404-pic-box">
      <ObjectFitImage
        :class="'error404-image'"
        :imageSource="pagecontent.image_detail_header"
        :imageSourcePortrait="pagecontent.image_portrait_detail_header"
        :SbimageParams="{ fullscreen:true, fullscreenUseVh: 100 }"
      />
      <div class="error404-darkener"></div>
    </div>
    <div class="error404-name-box">
      <SbTextArea class="error404-text">{{pagecontent.text_headline}}</SbTextArea>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/styles/tools.scss';

.error404 {
  position: relative;
  box-sizing: border-box;
  // padding-top: $sidebar-width;
  // width: 100vw;
  // @include vh(100, min-height);
  height: 100vh;

  @include media('<tablet-l') {
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
  }
}

.error404-pic-box {
  position: absolute;
  width: 100vw;
  // height: 100vh;
  // min-height: 100vh;
  // @include vh(100, height);
  height: 100vh;
  overflow: hidden;

  @include media('<tablet-l') {
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
  }
}
.error404-darkener {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  // @include vh(100, height);
  // height: 100%;
  // @include vh(100, height);
  height: 100vh;
  background-color: black;
  opacity: 0.3;
}
.error404-name-box {
  position: absolute;
  bottom: grid(2);
  margin-left: grid(2);

  width: calc(100% - #{grid(2)});
  // left: $sidebar-width + $side-offset;
  @include media('<tablet-l') {
    bottom: grid(18);
    margin-left: grid(3);
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
    bottom: grid(20);
    margin-left: grid(5);
  }
}
.error404-name {
  position: absolute;
}
.error404-text {
  font-size: getVw(300px);
  line-height: 0.8em;
  @include sec-font;
  text-transform: uppercase;
}
</style>
