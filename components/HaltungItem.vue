<script>
import { gsap, Power2 } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import { addListener, removeListener } from '~/scripts/events'
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
  methods: {
    scrollanim: function () {
      this.headlines = find('.haltung-headline', this.$el)

      this.headlineInTl = gsap.timeline({ paused: true }).fromTo(
        this.headlines,
        {
          y: '120%',
        },
        {
          y: '0%',
          stagger: 0.03,
          ease: Power2.easeOut,
        },
        0
      )
      this.headlineOutTl = gsap.timeline({ paused: true }).to(
        this.headlines,
        {
          y: '-120%',
          stagger: 0.03,
          ease: Power2.easeOut,
        },
        0
      )
      this.headlineInRevTl = gsap.timeline({ paused: true }).fromTo(
        this.headlines,
        {
          y: '-120%',
        },
        {
          y: '0%',
          stagger: 0.03,
          ease: Power2.easeOut,
        },
        0
      )
      this.headlineOutRevTl = gsap.timeline({ paused: true }).to(
        this.headlines,
        {
          y: '120%',
          stagger: 0.03,
          ease: Power2.easeOut,
        },
        0
      )

      ScrollTrigger.create({
        animation: this.scrollanimTl,
        trigger: this.$el,
        start: 'top bottom', // when the top of the trigger hits the top of the viewport
        end: 'bottom bottom', // when the top of the trigger hits the top of the viewport
        onEnter: () => {
          this.headlineInTl.play(0)
          // console.log('onEnter', 'PLAY')
        },
        onLeave: () => {
          this.headlineOutTl.play(0)
          // console.log('onLeave', 'PAUSE')
        },
        onEnterBack: () => {
          this.headlineInRevTl.play(0)
          // console.log('onEnterBack', 'PLAY')
        },
        onLeaveBack: () => {
          this.headlineOutRevTl.play(0)
          // console.log('onLeaveBack', 'PAUSE')
        },
        // scrub: 0,
        markers: 'true',
      })
    },
  },

  mounted: function () {
    this.scrollanim()
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
  <div class="haltung-item">
    <!-- <div v-if="haltungitem.enabled" class="haltung-item-enabler"> -->
    <div class="haltung-bg-color"></div>
    <div class="haltung-hl-container">
      <div class="haltung-hl-box">
        <div class="haltung-hl-mask">
          <h1 class="haltung-headline">{{ haltungitem.Headline_Line1 }}</h1>
        </div>
        <div class="haltung-hl-mask haltung-hl-mask2">
          <h1 v-if="haltungitem.Headline_Line2" class="haltung-headline">{{
            haltungitem.Headline_Line2
          }}</h1>
        </div>
      </div>
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
    <!-- </div> -->
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
.haltung-hl-container {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.haltung-bg-color {
  background-color: var(--brand-color);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
}

.haltung-hl-box {
  width: grid(88);
  z-index: 1;
}
.haltung-hl-mask {
  overflow: hidden;
  display: block;
}
.haltung-headline {
  position: relative;
  font-size: getVw(200px);
  line-height: 1em;
  margin-bottom: -0.15em;
  text-transform: uppercase;
  transform: translate(0, 120%);
}
.hhaltung-hl-mask2 {
  position: absolute;
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
  margin-top: 100vh;
  margin-bottom: 100vh;
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
