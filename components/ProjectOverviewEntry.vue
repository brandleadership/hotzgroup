<script>
import { gsap, Power2, Power3 } from 'gsap'
import {
  find,
  hasClass,
  isTouchDevice,
  onFontLoaded,
} from '~/scripts/elements.js'
import imagesLoaded from 'imagesloaded'
import SbTextArea from '@/components/SbTextArea.vue'
import SbRichText from '@/components/SbRichText.vue'
import Sbimage from '@/components/Sbimage.vue'
import SbLink from '@/components/SbLink.vue'

export default {
  name: 'Projectoverviewentry',
  components: {
    SbTextArea,
    SbRichText,
    Sbimage,
    SbLink,
  },
  props: ['project'],

  data() {
    //andere schreibweise für function() {
    return {
      bg: null,
      name: null,
      description: null,
      arrow: null,
      botline: null,
    }
  },
  methods: {
    hoverAnim: function() {
      this.bg = find('.js-projectoverviewentry-bg', this.$el)[0]
      this.name = find('.js-projectoverviewentry-name', this.$el)[0]
      this.description = find(
        '.js-projectoverviewentry-description',
        this.$el
      )[0]

      if (this.deHoverTl) {
        this.deHoverTl.kill()
      }
      this.hoverTl = gsap
        .timeline()
        // .set(this.$el, { zIndex: '100' }, 0)
        .set(this.bg, { opacity: 1 })
        .fromTo(
          this.bg,
          { scaleY: 0 },
          {
            duration: 0.4,
            scaleY: 1,
            ease: Power2.easeOut,
            force3D:false,
            transformOrigin: 'bottom',
          },
          0
        )
    },
    deHoverAnim: function() {
      if (this.hoverTl) {
        this.hoverTl.kill()
      }
      this.deHoverTl = gsap
        .timeline()
        .to(
          this.bg,
          {
            duration: 0.4,
            scaleY: 0,
            ease: Power2.easeOut,
          },
          0
        )
        // .set(this.$el, { zIndex: 'auto' })
        .set(this.bg, { opacity: 0 })
    },
  },

  mounted: function() {},
}
</script>

<template>
  <div
    class="projectoverviewentry"
    @mouseenter="hoverAnim"
    @mouseleave="deHoverAnim"
  >      
  

    <SbLink :sbData="project">
      <div class="js-projectoverviewentry-bg projectoverviewentry-bg"></div>
      <Sbimage
        :class="'projectoverviewentry-pic'"
        :imgParams="{
          src: project.content.pic_overview.filename,
          height: 300,
          fitIn: false,
        }"
      />
      
      <h2 class="js-projectoverviewentry-name projectoverviewentry-name">
        {{ project.content.text_name }}
      </h2>
      <SbRichText
        class="js-projectoverviewentry-description projectoverviewentry-description"
        :richTextParams="project.content.text_teaser_overview"
      />
    </SbLink>
  </div>
</template>

<style lang="scss" scoped="true">
@import '@/styles/tools.scss';

.projectoverviewentry {
  box-sizing: border-box;
  display: flex;
  position: relative;
  width: 33%;
  flex-grow: 1;
  margin-bottom: 3vw;

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
.projectoverviewentry-bg {
  position: absolute;
  display: flex;
  left: 0;
  top: -1px;
  width: 100%;
  height: 100%;
  background-color: var(--brand-color);
  opacity: 0;
}

.projectoverviewentry-pic {
  object-fit: cover;
  position: relative;
  display: block;
  max-height: 300px;
}

.projectoverviewentry-name {
  @include sec-font;
  color: var(--main-color);
  text-transform: uppercase;
  position: relative;
  font-size: getVw(80px);
  line-height: 0.85em;
  padding-top: 2vw;

  @include media('<=tablet-xxl') {
    width: grid(70);
    font-size: getVw(120px);
    padding-top: 4.3vw;
  }
  @include media('<=tablet-l') {
    font-size: getVw(140px);
    padding-top: 5vw;
  }
  @include media('<tablet-l') {
    font-size: getVw(180px);
    padding-top: 7vw;
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
    padding-top: 10vw;
    font-size: getVw(220px);
  }
  @include media('<phone') {
  }
}

.projectoverviewentry-description {
  color: var(--main-color);
  position: relative;
  display: block;
  margin-top: 0.95vw;
  padding-bottom: 20px;
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
  }
  @include media('<phone') {
  }
}

</style>
