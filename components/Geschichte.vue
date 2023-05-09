<script>
import { gsap, Power0, Power2 } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import {
  find,
  hasClass,
  isTouchDevice,
  onFontLoaded,
} from '~/scripts/elements.js'
import imagesLoaded from 'imagesloaded'
import GeschichteSpuren from '@/components/GeschichteSpuren.vue'

export default {
  name: 'Geschichte',
  props: ['sectioncontent', 'spurencontent'],
  components: { GeschichteSpuren },

  data() {
    //andere schreibweise für function() {
    return {}
  },
  methods: {
    setColors: function() {
      this.bg = find('.geschichte-bg-color', this.$el)[0]
      this.bg.style.backgroundColor = this.sectioncontent.background_color
    },

    lineHeightAnim: function() {
      const textbox = find('.geschichte-textbox', this.$el)[0]
      const text = find('.geschichte-text', this.$el)[0]

      this.lineHeightAnimTl = gsap.timeline({ paused: true }).fromTo(
        text,
        {
          lineHeight: '2em',
        },
        {
          lineHeight: '1.2em',
          duration: 1,
          ease: Power0.easeNone,
        },
        0
      )

      ScrollTrigger.create({
        animation: this.lineHeightAnimTl,
        trigger: textbox,
        start: 'top bottom', // when the top of the trigger hits the top of the viewport
        end: 'top 40%', // when the top of the trigger hits the top of the viewport
        scrub: 1,
        // markers: 'true',
      })
    },

    scrollanim: function() {
      const bgColor = find('.geschichte-bg-color', this.$el)[0]
      const geschichtetxt = find('.geschichte-text', this.$el)[0]
      const menu = find('.header-menu-icon')[0]
      const sectionIndicator = find('.section-indicator')

      // const govBg = find('.gov-bg')[0]
      // IN
      this.bgColorInTl = gsap
        .timeline({ paused: true })
        .fromTo(
          bgColor,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: Power0.easeNone },
          0
        )

      this.makeitWhite = gsap
        .timeline({ paused: true })
        .fromTo(
          bgColor,
          { backgroundColor: this.sectioncontent.background_color },
          {
            backgroundColor: 'transparent',
            duration: 0.4,
            ease: Power0.easeNone,
          },
          0
        )
        .fromTo(
          menu,
          { color: 'white' },
          { color: 'black', duration: 0.4, ease: Power0.easeNone },
          0
        )
        .fromTo(
          sectionIndicator,
          { color: 'white' },
          { color: 'black', duration: 0.4, ease: Power0.easeNone },
          0
        )

      this.bgColorOutTl = gsap
        .timeline({ paused: true })
        .to(bgColor, { opacity: 0, duration: 0.4, ease: Power0.easeNone }, 0)

      ScrollTrigger.create({
        animation: this.bgColorTl,
        trigger: this.$el,
        start: 'top 80%', // when the top of the trigger hits the top of the viewport
        end: 'bottom 80%', // when the top of the trigger hits the top of the viewport
        onEnter: () => {
          this.bgColorInTl.play(0)
          // console.log('onEnter', 'PLAY')
        },
        // onLeave: () => {
        //   // this.makeitWhite.play(0)
        //   // this.bgColorOutTl.play(0)
        //   // console.log('onLeave', 'PAUSE')
        // },
        // onEnterBack: () => {
        //   // this.revertWhite.play(0)
        //   // console.log('onEnterBack', 'PLAY')
        // },
        onLeaveBack: () => {
          this.bgColorOutTl.play(0)
          // console.log('onLeaveBack', 'PAUSE')
        },
        // scrub: 0,
        // markers: 'true',
      })

      ScrollTrigger.create({
        animation: this.makeitWhite,
        trigger: geschichtetxt,
        start: 'top top', // when the top of the trigger hits the top of the viewport
        end: 'bottom bottom', // when the top of the trigger hits the top of the viewport
        toggleActions: 'play none none reverse', //onEnter, onLeave, onEnterBack, onLeaveBack
        // markers: 'true',
      })
    },
  },

  mounted: function() {
    this.setColors()
    this.lineHeightAnim()
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
  <section class="geschichte" id="geschichte-anker">
    <div class="geschichte-intro">
      <div class="geschichte-anker" id="geschichte"></div>
      <div class="geschichte-bg-color"></div>
      <div class="geschichte-textbox">
        <h2 class="geschichte-hl">{{ sectioncontent.headline }}</h2>
        <p class="geschichte-text">{{ sectioncontent.Text }}</p>
        <p class="geschichte-text text-spacer">{{ sectioncontent.Text }}</p>
      </div>
    </div>

    <GeschichteSpuren :spurencontent="spurencontent"></GeschichteSpuren>
  </section>
</template>

<style lang="scss" scoped="true">
@import '@/styles/tools.scss';

.geschichte {
  position: relative;
  color: var(--brand-color2);
  padding-top: 35vw;
  // padding-bottom: 35vw;
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
.geschichte-intro {
  z-index: 1;
  position: relative;
  width: 100%;
}
.geschichte-anker {
  position: absolute;
  height: 100vh;
  top: 50%;
  transform: translate(0, -50%);
}
.geschichte-bg-color {
  background-color: var(--brand-color);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  pointer-events: none;
}
.geschichte-textbox {
  position: relative;
  @include miniHl;
  width: grid(63);
  margin-left: grid(7);
  @include media('<tablet') {
    @media (orientation: portrait) {
      width: calc(100% - #{grid(14)});
    }
  }
}
.geschichte-hl {
  display: block;

  margin-bottom: 80px;
  text-transform: uppercase;
}
.geschichte-text {
  display: block;
  width: 100%;
  position: absolute;
  @include textBig;
  @include sec-font;
}
.text-spacer {
  position: relative;
  opacity: 0;
}
</style>
