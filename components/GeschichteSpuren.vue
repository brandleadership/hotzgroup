<script>
import { gsap, Power0, Power2, Power3 } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import {
  find,
  hasClass,
  isTouchDevice,
  onFontLoaded,
} from '~/scripts/elements.js'
import imagesLoaded from 'imagesloaded'
import Sbimage from '@/components/Sbimage.vue'
import GeschichteSpurItem from '@/components/GeschichteSpurItem.vue'

export default {
  name: 'GeschichteSpuren',
  props: ['spurencontent'],
  components: { Sbimage, GeschichteSpurItem },

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
    zoomAnim: function() {
      this.geschichteSection = find('.geschichte')[0]
      const scaler = find('.geschichte-spur1-scaler', this.$el)[0]
      // const mask = find('.geschichte-spur1-pic-mask', this.$el)[0]
      // const pic = find('.geschichte-spuren-pic', this.$el)[0]
      const spur1 = find('.geschichte-spur1-sticker', this.$el)[0]
      const number = find('.spur-1-number', this.$el)[0]
      const numberblocker = find(
        '.geschichte-spur1-number-blocker',
        this.$el
      )[0]
      // const trigger = find('.geschichte-spuren', this.$el)[0]

      this.showSpurenTl = gsap
        .timeline({ paused: true })
        .fromTo(this.$el, { opacity: 0 }, { opacity: 1, duration: 0.0001 }, 0)

      this.zoomAnimTl = gsap
        .timeline({ paused: true })
        .set(spur1, { visibility: 'visible' }, 0)
        .fromTo(
          number,
          {
            y: '100%',
          },
          {
            y: '0%',
            duration: 1,
            ease: Power3.easeOut,
          },
          0
        )
        .fromTo(
          numberblocker,
          {
            y: '0%',
          },
          {
            y: '-100%',
            duration: 1,
            ease: Power3.easeOut,
          },
          0
        )
        .fromTo(
          scaler,
          {
            scale: 1,
          },
          {
            scale: 18,
            duration: 1,
            ease: Power2.easeInOut,
          },
          '>'
        )

      ScrollTrigger.create({
        animation: this.zoomAnimTl,
        trigger: this.$el,
        start: 'top 10%', // when the top of the trigger hits the top of the viewport
        end: 'top -200%', // when the top of the trigger hits the top of the viewport
        scrub: 0.3,
        // markers: 'true',
      })
      ScrollTrigger.create({
        animation: this.showSpurenTl,
        trigger: this.geschichteSection,
        start: 'top top', // when the top of the trigger hits the top of the viewport
        end: 'top 10%', // when the top of the trigger hits the top of the viewport
        scrub: 0,
        // markers: 'true',
      })
    },

    // headlineAnim: function() {
    //   this.headline1 = find('.spuren-headline1', this.$el)[0]
    //   const hlDuration = 0.7
    //   const stagger = 0.13
    //   // this.headline2 = find('.spuren-headline2', this.$el)[0]

    //   // IN
    //   this.headlineInTl = gsap.timeline({ paused: true }).fromTo(
    //     this.headline1,
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
    //     this.headline1,
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
    //     this.headline1,
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
    //     this.headline1,
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
      this.headline1 = find('.spuren-headline1', this.$el)[0]

      this.headlineSlideTl = gsap.timeline({ paused: true }).fromTo(
        this.headline1,
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
        start: 'top -150%', // when the top of the trigger hits the top of the viewport
        end: 'top -350%', // when the top of the trigger hits the top of the viewport
        scrub: 0.5,
        // markers: 'true',
      })
    },
    lineHeightAnim: function() {
      const textbox = find('.spuren-textbox-spur1', this.$el)[0]
      const text = find('.spur1-text', this.$el)[0]
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

    removeAnim: function() {
      const textbox = find('.spuren-textbox-spur1', this.$el)[0]
      const pic = find('.geschichte-spuren-pic', this.$el)[0]
      const spur1 = find('.geschichte-spur1-sticker', this.$el)[0]

      this.lineHeightAnimTl = gsap
        .timeline({ paused: true })
        .fromTo(
          pic,
          {
            opacity: 1,
          },
          {
            opacity: 0,
            duration: 1,
            ease: Power0.easeNone,
          },
          0
        )
        .set(spur1, { visibility: 'hidden' }, '>')

      ScrollTrigger.create({
        animation: this.lineHeightAnimTl,
        trigger: textbox,
        start: 'bottom 150%', // when the top of the trigger hits the top of the viewport
        end: 'bottom bottom', // when the top of the trigger hits the top of the viewport
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
        toggleActions: 'play none none reverse', //onEnter, onLeave, onEnterBack, onLeaveBack
      })

      const textbox = find('.spuren-textbox-spur1', this.$el)[0]

      this.menuBlackeningTl = gsap
        .timeline({ paused: true })
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

      ScrollTrigger.create({
        animation: this.menuBlackeningTl,
        trigger: textbox,
        start: 'bottom 120%', // when the top of the trigger hits the top of the viewport
        toggleActions: 'play none none reverse', //onEnter, onLeave, onEnterBack, onLeaveBack
      })
    },
  },

  mounted: function() {
    this.zoomAnim()
    this.headlineSlide()
    this.lineHeightAnim()
    this.removeAnim()
    this.menucolorAnim()
  },
}
</script>

<template>
  <div class="geschichte-spuren">
    <div class="spuren-bg"></div>

    <!-- <div class="geschichte-spur1"> -->
    <div class="geschichte-spur1-sticker">
      <!-- <div class="geschichte-spur1-pic-mask"> -->
      <Sbimage
        :class="'geschichte-spuren-pic'"
        :imgParams="{
          src: spurencontent[0].Spur1_Image,
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

      <div class="geschichte-spur1-scaler">
        <div class="geschichte-spur1-blocker-top"></div>
        <div class="geschichte-spur1-blocker-center">
          <div class="geschichte-spur1-blocker-left"></div>
          <div class="geschichte-spur1-number-box">
            <div class="geschichte-spur1-number-blocker"></div>
            <svg class="spur-1-number" viewBox="0 0 467 560">
              <path
                d="m0,0v560h467V0H0Zm377.661,552.38H89.761v-4.2h94.6V69.38l.1-10.2L41.561,126.58l-1.8-3.7L257.961,19.88c4.5-2.4,9.3-4.7,14.4-7.5h1.4l.4-.1.1.1h8.4l.1,535.8h94.9v4.2Z"
              />
            </svg>
          </div>

          <div class="geschichte-spur1-blocker-right"></div>
        </div>
        <div class="geschichte-spur1-blocker-bottom"></div>
      </div>
    </div>

    <!-- <div class="geschichte-spur1-content"> -->
    <div class="geschichte-spur1-spacer"></div>

    <div class="spuren-hl-container">
      <div class="spuren-hl-box">
        <div class="spuren-hl-mask">
          <h1 class="spuren-headline spuren-headline1">{{
            spurencontent[0].Spur1_Headline
          }}</h1>
        </div>
      </div>
    </div>
    <div class="spuren-textbox spuren-textbox-spur1">
      <div class="spur1-text">{{ spurencontent[0].Spur1_Text }}</div>
    </div>

    <GeschichteSpurItem
      v-for="(spur, key) in spurencontent[0].Spuren"
      :key="key"
      :number="key"
      :amount="spurencontent[0].Spuren.length"
      :spur="spur"
    />
  </div>
</template>

<style lang="scss" scoped="true">
@import '@/styles/tools.scss';

.geschichte-spuren {
  position: relative;
  opacity: 0;
  // z-index: 1;
  // margin-bottom: -20vw;
}
// .geschichte-spur1 {
//   height: 300vh;
//   display: flex;
//   justify-content: center;
//   width: 100vw;
//   // background-color: green;
// }

.spuren-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--sec-color);
}
.geschichte-spur1-spacer {
  height: 300vh;
  margin-bottom: 75vh;
  // background-color: blue;
}

.geschichte-spur1-sticker {
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  visibility: hidden;
  // background-color: red;
}
.geschichte-spur1-scaler {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // will-change: transform;
  // background-color: red;
}
.spur-1-number {
  height: 65vh;
  flex-shrink: 0;
  margin: 0 -1px;
  // will-change: transform;

  path {
    fill: var(--sec-color);
  }

  @media (orientation: portrait) {
    height: 100vw;
  }
}
.geschichte-spur1-blocker-top,
.geschichte-spur1-blocker-bottom {
  background-color: var(--sec-color);
  height: 100%;
  width: 100%;
  position: relative;
}
.geschichte-spur1-blocker-top {
  margin-bottom: -1px;
  margin-top: -1px;
}
.geschichte-spur1-blocker-bottom {
  margin-top: -1px;
}
.geschichte-spur1-blocker-center {
  display: flex;
  width: 100%;
  justify-content: center;
  position: relative;
}
.geschichte-spur1-blocker-left,
.geschichte-spur1-blocker-right {
  background-color: var(--sec-color);
  height: 100%;
  width: 100%;
}
// .geschichte-spur1-pic-mask {
//   overflow: hidden;
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
// }
.geschichte-spuren-pic {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.geschichte-spur1-number-box {
  position: relative;
  display: flex;
}
.geschichte-spur1-number-blocker {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% + 2px);
  margin-top: 1px;
  background-color: white;
  // will-change: transform;
}

.spuren-hl-container {
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
.spuren-hl-box {
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
.spuren-hl-mask {
  overflow: hidden;
  display: flex;
  margin-left: -0.7vw;
  margin-bottom: 0.5vw;
  flex-shrink: 0;
}

.spuren-headline {
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

.spuren-textbox {
  position: relative;
  // padding-top: 75vh;
  padding-bottom: 120vh;
  width: grid(56);
  margin-left: grid(7);

  @include media('<tablet-xxl') {
    @media (orientation: portrait) {
      margin-top: 50vh;
      // margin-bottom: 50vh;
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
      // padding-bottom: 240vh;
      width: grid(76);
      margin-left: grid(12);
    }
  }
}
.spuren-textbox-spur1 {
  @include media('<tablet') {
    @media (orientation: portrait) {
      margin-bottom: 50vh;
    }
  }
}
.spur1-text {
  display: block;
  width: 100%;
  position: absolute;
  @include sec-font;
  @include textBig;
  color: var(--sec-color);
}
</style>
