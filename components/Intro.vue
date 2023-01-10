<script>
import { gsap, Power0, Power2 } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import {
  find,
  hasClass,
  isTouchDevice,
  onFontLoaded,
} from '~/scripts/elements.js'
// import imagesLoaded from 'imagesloaded'
import Logo from '@/components/Logo.vue'
import Sbimage from '@/components/Sbimage.vue'
export default {
  name: 'Intro',
  components: { Logo, Sbimage },
  props: ['sectioncontent'],

  data() {
    //andere schreibweise für function() {
    return {}
  },
  methods: {
    blackening: function () {
      const bg = find('.intro-blackbg', this.$el)[0]
      // const video = find('.intro-video-box', this.$el)[0]
      const haltung = find('.haltung')[0]
      const menu = find('.header-menu-icon')[0]

      this.blackeningTl = gsap
        .timeline({ paused: true })
        .fromTo(
          bg,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: Power0.easeNone },
          0
        )
        .fromTo(
          menu,
          { color: 'black' },
          { color: 'white', duration: 0.4, ease: Power0.easeNone },
          0
        )
      this.whiteningTl = gsap
        .timeline({ paused: true })
        .to(bg, { opacity: 0, duration: 0.4, ease: Power0.easeNone }, 0)
        .to(menu, { color: 'black', duration: 0.4, ease: Power0.easeNone }, 0)

      ScrollTrigger.create({
        animation: this.scrollanimTl,
        trigger: haltung,
        start: 'top 80%', // when the top of the trigger hits the top of the viewport
        // end: 'bottom 80%', // when the top of the trigger hits the top of the viewport
        onEnter: () => {
          this.blackeningTl.play(0)
          // console.log('onEnter', 'PLAY')
        },
        // onLeave: () => {
        //   this.whiteningTl.play(0)
        //   // console.log('onLeave', 'PAUSE')
        // },
        // onEnterBack: () => {
        //   this.blackeningTl.play(0)
        //   // console.log('onEnterBack', 'PLAY')
        // },
        onLeaveBack: () => {
          this.whiteningTl.play(0)
          // console.log('onLeaveBack', 'PAUSE')
        },
        // scrub: 0,
        // markers: 'true',
      })
    },
  },

  mounted: function () {
    this.blackening()
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
  <section class="intro" id="home">
    <div class="intro-blackbg"></div>
    <div class="intro-logo-box">
      <Logo></Logo>
    </div>
    <div class="intro-video-mask">
      <Sbimage
        :class="'intro-video-poster'"
        :imgParams="{
          src: sectioncontent.poster_pic,
          width: 1920,
          quality: 60,
          alt: 'HotzGroup',
          bp: {
            1920: { width: 1920 },
            1600: { width: 1600 },
            1366: { width: 1366 },
          },
        }"
      />

      <div class="intro-video-box">
        <iframe
          class="intro-video"
          :src="
            'https://player.vimeo.com/video/' +
            sectioncontent.video +
            '?background=1'
          "
          frameborder="0"
          width="100%"
          height="100%"
          allowfullscreen
          disablepictureinpicture
        ></iframe>
      </div>
    </div>
  </section>
</template>



<style lang="scss" scoped="true">
@import '@/styles/tools.scss';

.intro {
  position: relative;
  padding-bottom: 50vh;
  min-height: 110vh;
  @include sidepadding;
  display: flex;
  flex-direction: column;
  @include media('<=tablet') {
    @media (orientation: portrait) {
      height: 110vh;
    }
  }
}
.intro-blackbg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--main-color);
  opacity: 0;
}
.intro-logo-box {
  padding-top: 5.5vw;
  @include media('<=tablet-xxl') {
    padding-top: 6vw;
  }
  @include media('<=tablet-l') {
    padding-top: 7vw;
  }
  @include media('<=tablet') {
    @media (orientation: portrait) {
      padding-top: 60px;
      padding-bottom: 20px;
    }
  }
}

.intro-video-box {
  pointer-events: none;
  padding-top: 5vw;
  height: calc(#{grid(92)} * 9 / 16);
  // max-width: 100%;
  // height: 100vh;

  @include media('<=tablet-xxl') {
    @media (orientation: portrait) {
      height: calc(#{grid(92)} * 9 / 16);
    }
  }
  @include media('<=tablet') {
    @media (orientation: portrait) {
      padding-top: 0;
      height: 100%;
      width: 370vw;
      transform: translate(-50%);
      left: 50%;
      position: absolute;
    }
  }
}
.intro-video-poster {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  padding-top: 5vw;
  height: calc(#{grid(92)} * 9 / 16);
  width: 100%;

  @include media('<=tablet-xxl') {
    @media (orientation: portrait) {
      height: calc(#{grid(92)} * 9 / 16);
    }
  }
  @include media('<=tablet') {
    @media (orientation: portrait) {
      padding-top: 0;
      height: 100%;
      width: 370vw;
      transform: translate(-50%);
      left: 50%;
      position: absolute;
    }
  }
}
.intro-video-mask {
  position: relative;
  @include media('<=tablet') {
    @media (orientation: portrait) {
      height: 100%;
      overflow: hidden;
      position: relative;
      display: block;
    }
  }
}
.intro-video {
  position: relative;
  // height: 100%;
  width: 100%;
  height: 100%;
}
</style>
