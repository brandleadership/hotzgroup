<script>
import { gsap, Power0, Power2, Power3, Linear } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import {
  find,
  hasClass,
  isTouchDevice,
  onFontLoaded,
} from '~/scripts/elements.js'
import imagesLoaded from 'imagesloaded'
import Sbimage from '@/components/Sbimage.vue'

export default {
  name: 'GeschichteSpuren',
  props: ['spur'],
  components: { Sbimage },

  data() {
    //andere schreibweise für function() {
    return {}
  },
  methods: {
    // getVpSizes: function() {
    //   this.vpW = Math.max(
    //     document.documentElement.clientWidth,
    //     window.innerWidth || 0
    //   )
    //   this.vpH = Math.max(
    //     document.documentElement.clientHeight,
    //     window.innerHeight || 0
    //   )
    // },

    // headlineAnim: function() {
    //   this.headline = find('.geschichte-spur-headline', this.$el)[0]
    //   const hlDuration = 0.7
    //   const stagger = 0.13
    //   // this.headline2 = find('.spuren-headline2', this.$el)[0]

    //   // IN
    //   this.headlineInTl = gsap.timeline({ paused: true }).fromTo(
    //     this.headline,
    //     {
    //       y: '120%',
    //     },
    //     {
    //       y: '0%',
    //       duration: hlDuration,
    //       ease: Power2.easeInOut,
    //     },
    //     0
    //   )

    //   // OUT
    //   this.headlineOutTl = gsap.timeline({ paused: true }).fromTo(
    //     this.headline,
    //     {
    //       y: '0%',
    //     },
    //     {
    //       y: '-120%',
    //       duration: hlDuration,
    //       ease: Power2.easeInOut,
    //     },
    //     0
    //   )

    //   //REV IN
    //   this.headlineInRevTl = gsap.timeline({ paused: true }).fromTo(
    //     this.headline,
    //     {
    //       y: '-120%',
    //     },
    //     {
    //       y: '0%',
    //       stagger: 0.03,
    //       duration: hlDuration,
    //       ease: Power2.easeInOut,
    //     },
    //     stagger
    //   )

    //   //REV OUT
    //   this.headlineOutRevTl = gsap.timeline({ paused: true }).to(
    //     this.headline,
    //     {
    //       y: '120%',
    //       duration: hlDuration,
    //       ease: Power2.easeInOut,
    //     },
    //     stagger
    //   )

    //   ScrollTrigger.create({
    //     animation: this.scrollanimTl,
    //     trigger: this.$el,
    //     start: 'top -150%', // when the top of the trigger hits the top of the viewport
    //     end: 'top -250%', // when the top of the trigger hits the top of the viewport
    //     onEnter: () => {
    //       this.headlineInTl.play(0)
    //       // console.log('onEnter', 'PLAY')
    //     },
    //     onLeave: () => {
    //       this.headlineOutTl.play(0)
    //       // console.log('onLeave', 'PAUSE')
    //     },
    //     onEnterBack: () => {
    //       this.headlineInRevTl.play(0)
    //       // console.log('onEnterBack', 'PLAY')
    //     },
    //     onLeaveBack: () => {
    //       this.headlineOutRevTl.play(0)
    //       // console.log('onLeaveBack', 'PAUSE')
    //     },
    //     // scrub: 0,
    //     markers: 'true',
    //   })
    // },

    headlineSlide: function() {
      this.headline = find('.geschichte-spur-headline', this.$el)[0]

      this.headlineSlideTl = gsap.timeline({ paused: true }).fromTo(
        this.headline,
        {
          x: '0%',
        },
        {
          x: '-100%',
          duration: 1,
          ease: Power0.easeNone,
        },
        0
      )

      ScrollTrigger.create({
        animation: this.headlineSlideTl,
        trigger: this.$el,
        start: 'top -80%', // when the top of the trigger hits the top of the viewport
        end: 'top -280%', // when the top of the trigger hits the top of the viewport
        scrub: 0.5,
        // markers: 'true',
      })
    },
    lineHeightAnim: function() {
      const textbox = find('.geschichte-spur-textbox', this.$el)[0]
      const text = find('.geschichte-spur-text', this.$el)[0]
      // const text = find(this.lines)
      // console.log(text)

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

    showRemoveAnim: function() {
      const textbox = find('.geschichte-spur-textbox', this.$el)[0]
      const pic = find('.geschichte-spur-bg', this.$el)[0]
      const picNrTop = find('.geschichte-spur-nr-top', this.$el)[0]
      const picNrMiddle = find('.geschichte-spur-nr-center', this.$el)[0]
      const picNrBottom = find('.geschichte-spur-nr-bottom', this.$el)[0]
      const picbox = find('.geschichte-spur-sticker', this.$el)[0]
      const menu = find('.header-menu-icon')[0]
      const sectionIndicator = find('.section-indicator')
      const allNrPics = find('.geschichte-spur-nr-box', this.$el)[0]
      const stickerooo = find('.geschichte-spur-nr-sticker', this.$el)[0]
      const stickeroooBg = find('.geschichte-spur-sticker', this.$el)[0]

      this.showTl = gsap
        .timeline({ paused: true })
        .set(picNrMiddle, { visibility: 'visible' }, 0)
        .set(picNrBottom, { visibility: 'visible' }, 0)
        .fromTo(
          picNrMiddle,
          {
            y: '100vh',
          },
          {
            y: '0vh',
            duration: 0.4,
            ease: Power3.easeOut,
          },
          0.2
        )
        .fromTo(
          picNrBottom,
          {
            y: '10vh',
            opacity: 0,
          },
          {
            opacity: 1,
            y: '0vh',
            duration: 0.4,
            ease: Power2.easeOut,
          },
          0.5
        )
        .to(
          picNrMiddle,
          {
            y: '-100vh',
            opacity: 0,
            duration: 0.5,
            ease: Power2.easeIn,
          },
          1
        )
        .to(
          picNrBottom,

          {
            opacity: 0,
            y: '-10vh',
            duration: 0.4,
            ease: Power2.easeIn,
          },
          1
        )
        .fromTo(
          pic,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.3,
            ease: Power0.easeNone,
          },
          1
        )
        .fromTo(
          menu,
          { color: 'black' },
          { color: 'white', duration: 0.4, ease: Power0.easeNone },
          1
        )
        .fromTo(
          sectionIndicator,
          { color: 'black' },
          { color: 'white', duration: 0.4, ease: Power0.easeNone },
          1
        )

      if (picNrTop) {
        this.showTl
          .set(picNrTop, { visibility: 'visible' }, 0)
          .fromTo(
            picNrTop,
            {
              opacity: 0,
              y: '10vh',
            },
            {
              opacity: 1,
              y: '0vh',
              duration: 0.4,
              ease: Power2.easeOut,
            },
            0.5
          )
          .to(picNrTop, { y: '-10vh', duration: 0.4, ease: Power2.easeIn }, 1)
          .to(picNrTop, { opacity: 0, duration: 0.2, ease: Linear.easeNone }, 1)
      }

      this.removeTl = gsap
        .timeline({ paused: true })
        .fromTo(
          picbox,
          {
            opacity: 1,
          },
          {
            opacity: 0,
            duration: 0.5,
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
        .set(picNrBottom, { visibility: 'hidden' }, '>')
        .set(picNrMiddle, { visibility: 'hidden' }, '>')

      if (picNrTop) {
        this.removeTl.set(picNrTop, { visibility: 'hidden' }, '>')
      }

      // this.nrSmootherTl = gsap.timeline({ paused: true }).fromTo(
      //   allNrPics,
      //   {
      //     y: '-50vh',
      //   },
      //   {
      //     y: '50vh',
      //     duration: 1,
      //     ease: Linear.easeNone,
      //   },
      //   0
      // )
      // ScrollTrigger.create({
      //   animation: this.nrSmootherTl,
      //   trigger: this.$el,
      //   start: 'top center', // when the top of the trigger hits the top of the viewport
      //   end: 'top -50%', // when the top of the trigger hits the top of the viewport
      //   toggleActions: 'play none none reverse', //onEnter, onLeave, onEnterBack, onLeaveBack
      //   scrub: 0,
      //   markers: 'true',
      // })
      ScrollTrigger.create({
        trigger: this.$el,
        start: 'top bottom', // when the top of the trigger hits the top of the viewport
        end: 'bottom top', // when the top of the trigger hits the top of the viewport
        onEnter: () => {
          gsap.set(this.$el, { visibility: 'visible' }, '>')
          stickerooo.style.position = 'fixed'
          stickeroooBg.style.position = 'fixed'
          // console.log('onEnter', 'PLAY')
        },
        onLeave: () => {
          gsap.set(this.$el, { visibility: 'hidden' }, '>')
          stickerooo.style.position = 'absolute'
          stickeroooBg.style.position = 'absolute'
          // console.log('onLeave', 'PAUSE')
        },
        onEnterBack: () => {
          gsap.set(this.$el, { visibility: 'visible' }, '>')
          stickerooo.style.position = 'fixed'
          stickeroooBg.style.position = 'fixed'
          // console.log('onEnterBack', 'PLAY')
        },
        onLeaveBack: () => {
          gsap.set(this.$el, { visibility: 'hidden' }, '>')
          stickerooo.style.position = 'absolute'
          stickeroooBg.style.position = 'absolute'
          // console.log('onLeaveBack', 'PAUSE')
        },
      })

      ScrollTrigger.create({
        animation: this.showTl,
        trigger: this.$el,
        start: 'top bottom', // when the top of the trigger hits the top of the viewport
        end: 'top -100%', // when the top of the trigger hits the top of the viewport
        // toggleActions: 'play none none reverse', //onEnter, onLeave, onEnterBack, onLeaveBack
        scrub: 0,
        // markers: 'true',
      })
      ScrollTrigger.create({
        animation: this.removeTl,
        trigger: this.$el,
        start: 'bottom 120%', // when the top of the trigger hits the top of the viewport
        end: 'bottom 70%', // when the top of the trigger hits the top of the viewport
        // toggleActions: 'play none none reverse', //onEnter, onLeave, onEnterBack, onLeaveBack
        scrub: 0,
        // markers: 'true',
      })
    },

    menucolorAnim: function() {
      const menu = find('.header-menu-icon')[0]
      const sectionIndicator = find('.section-indicator')

      // const text = find(this.lines)
      // console.log(text)

      this.menuWhiteningTl = gsap
        .timeline({ paused: true })
        .fromTo(
          menu,
          { color: 'black' },
          { color: 'white', duration: 0.4, ease: Power0.easeNone },
          0
        )
        .fromTo(
          sectionIndicator,
          { color: 'black' },
          { color: 'white', duration: 0.4, ease: Power0.easeNone },
          0
        )

      ScrollTrigger.create({
        animation: this.menuWhiteningTl,
        trigger: this.$el,
        start: 'top -150%', // when the top of the trigger hits the top of the viewport
        end: 'top -200%', // when the top of the trigger hits the top of the viewport
        // toggleActions: 'play none none reverse', //onEnter, onLeave, onEnterBack, onLeaveBack
        scrub: 0,
      })

      // const textbox = find('.spuren-textbox', this.$el)[0]

      // this.menuBlackeningTl = gsap
      //   .timeline({ paused: true })
      //   .fromTo(
      //     menu,
      //     { color: 'white' },
      //     { color: 'black', duration: 0.4, ease: Power0.easeNone },
      //     0
      //   )
      //   .fromTo(
      //     sectionIndicator,
      //     { color: 'white' },
      //     { color: 'black', duration: 0.4, ease: Power0.easeNone },
      //     0
      //   )

      // ScrollTrigger.create({
      //   animation: this.menuBlackeningTl,
      //   trigger: textbox,
      //   start: 'bottom 120%', // when the top of the trigger hits the top of the viewport
      //   end: 'bottom 70%', // when the top of the trigger hits the top of the viewport
      //   // toggleActions: 'play none none reverse', //onEnter, onLeave, onEnterBack, onLeaveBack
      //   scrub: 0,
      // })
    },
  },

  mounted: function() {
    this.headlineSlide()
    this.lineHeightAnim()
    this.showRemoveAnim()
  },
}
</script>

<template>
  <div class="geschichte-spur-item">
    <!-- <div class="geschichte-spur-bg"></div> -->

    <!-- <div class="geschichte-spur"> -->
    <div class="geschichte-spur-sticker">
      <!-- <div class="geschichte-spur-bg-mask"> -->
      <Sbimage
        :class="'geschichte-spur-bg'"
        :imgParams="{
          src: spur.background_image,
          width: 2560,
          quality: 99,
          alt: 'gradient',
          bp: {
            1920: { width: 1920 },
            1600: { width: 1600 },
            1366: { width: 1366 },
          },
        }"
      />

      <!-- </div> -->
    </div>
    <div class="geschichte-spur-nr-sticker">
      <div class="geschichte-spur-nr-box">
        <Sbimage
          v-if="spur.image_middle"
          :class="'geschichte-spur-nr-center'"
          :imgParams="{
            src: spur.image_middle,
            width: 1075,
            quality: 99,
            alt: 'number-center',
            bp: {
              1920: { width: 814 },
              // 1600: { width: 1600 },
              // 1366: { width: 1366 },
            },
          }"
        />
        <Sbimage
          v-if="spur.image_bottom"
          :class="'geschichte-spur-nr-bottom'"
          :imgParams="{
            src: spur.image_bottom,
            width: 1075,
            quality: 60,
            alt: 'number-bottom',
            bp: {
              1920: { width: 814 },
              // 1600: { width: 1600 },
              // 1366: { width: 1366 },
            },
          }"
        />
        <Sbimage
          v-if="spur.image_top"
          :class="'geschichte-spur-nr-top'"
          :imgParams="{
            src: spur.image_top,
            width: 1075,
            quality: 60,
            alt: 'number-top',
            bp: {
              1920: { width: 814 },
              // 1600: { width: 1600 },
              // 1366: { width: 1366 },
            },
          }"
        />
      </div>
    </div>
    <!-- <div class="geschichte-spur-content"> -->
    <div class="geschichte-spur-spacer"></div>

    <div class="geschichte-spur-hl-container">
      <div class="geschichte-spur-hl-box">
        <div class="geschichte-spur-hl-mask">
          <h1 class="geschichte-spur-headline">{{ spur.Headline_Line1 }}</h1>
        </div>
      </div>
    </div>
    <div class="geschichte-spur-textbox">
      <div class="geschichte-spur-text">{{ spur.Text }}</div>
    </div>
    <!-- </div> -->

    <!-- </div> -->
  </div>
</template>

<style lang="scss" scoped="true">
@import '@/styles/tools.scss';

.geschichte-spur-item {
  visibility: hidden;
  position: relative;
  margin-top: -10vh;
  // opacity: 0;
  // z-index: 1;
  // margin-top: 60vh;
  @include media('<tablet-l') {
    @media (orientation: portrait) {
      margin-top: -70vh;
      // margin-bottom: 50vh;
    }
  }
  @include media('<tablet') {
    @media (orientation: portrait) {
      margin-top: -80vh;
      // margin-bottom: 50vh;
    }
  }
}
.geschichte-spur {
  height: 300vh;
  display: flex;
  justify-content: center;
  width: 100vw;
  // background-color: green;
}

.geschichte-spur-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0;
  object-fit: cover;
}
.geschichte-spur-spacer {
  // height: 190vh;
  height: 280vh;
  width: 100%;
  // margin-bottom: 10vh;
  // background-color: blue;
  @include media('<tablet-l') {
    @media (orientation: portrait) {
      height: 220vh;
      // margin-bottom: 50vh;
    }
  }
  @include media('<tablet') {
    @media (orientation: portrait) {
      // height: 190vh;
      // margin-bottom: 50vh;
    }
  }
}
.geschichte-spur-sticker {
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1;
  // display: none;

  // background-color: red;
}

// .geschichte-spur-bg-mask {
//   overflow: hidden;
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
// }
.geschichte-spur-nr-sticker {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  // justify-content: center;
  align-items: center;
  flex-direction: column;

  // display: none;
}
.geschichte-spur-nr-box {
  // position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  // display: none;
  // @include media('<tablet') {
  //   @media (orientation: portrait) {
  //     margin-bottom: -50vh;
  //   }
  // }
}
.geschichte-spur-nr-top,
.geschichte-spur-nr-center {
  position: absolute;
}
.geschichte-spur-nr-bottom {
  display: block;
  position: relative;
  mix-blend-mode: multiply;
}
.geschichte-spur-nr-top,
.geschichte-spur-nr-center,
.geschichte-spur-nr-bottom {
  width: 42vw;
  // max-width: 814px;
  height: auto;
  will-change: transform;

  @media (orientation: portrait) {
    width: 100vw;
  }
}

.geschichte-spur-hl-container {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  // z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}
.geschichte-spur-hl-box {
  // width: grid(82);
  width: 100%;
  z-index: 1;
  // @include media('<=tablet-l') {
  //   width: grid(78);
  // }
  // @include media('<tablet') {
  //   @media (orientation: portrait) {
  //     width: grid(88);
  //   }
  // }
}
.geschichte-spur-hl-mask {
  overflow: hidden;
  display: flex;
  margin-left: -0.7vw;
  margin-bottom: 0.5vw;
  flex-shrink: 0;
}

.geschichte-spur-headline {
  position: relative;
  display: block;
  font-size: getVw(300px);
  line-height: 0.8em;
  padding-left: 103vw;
  padding-right: 103vw;
  flex-shrink: 0;
  // margin-bottom: -1.59vw;
  text-transform: uppercase;
  // transform: translate(0, 120%);
  // transform: translate(100%, 120%);
  color: white;
  will-change: transform;

  // @include media('<=tablet-l') {
  //   font-size: getVw(200px);
  // }
  @include media('<tablet') {
    @media (orientation: portrait) {
      font-size: getVw(400px);
    }
  }
}

.geschichte-spur-textbox {
  position: relative;
  // padding-top: 75vh;
  padding-bottom: 150vh;
  width: grid(56);
  margin-left: grid(7);
  z-index: 1;

  @include media('<tablet-xxl') {
    @media (orientation: portrait) {
      margin-top: 50vh;
      margin-bottom: 50vh;
    }
  }
  @include media('<tablet-l') {
    @media (orientation: portrait) {
      width: grid(60);
      margin-left: grid(28);
    }
  }
  @include media('<tablet') {
    @media (orientation: portrait) {
      width: grid(76);
      margin-left: grid(12);
      margin-bottom: 0vh;
    }
  }
}
.geschichte-spur-text {
  display: block;
  width: 100%;
  position: absolute;
  @include sec-font;
  @include textBig;
  color: var(--sec-color);
}
</style>
