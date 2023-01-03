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

export default {
  name: 'Intro',
  components: { Logo },
  props: ['sectioncontent'],

  data() {
    //andere schreibweise für function() {
    return {}
  },
  methods: {
    blackening: function () {
      const bg = find('.intro-blackbg', this.$el)[0]
      const video = find('.intro-video-box', this.$el)[0]
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
        start: 'bottom 90%', // when the top of the trigger hits the top of the viewport
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
        markers: 'true',
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
  </section>
</template>



<style lang="scss" scoped="true">
@import '@/styles/tools.scss';

.intro {
  position: relative;
  padding-bottom: 50vh;
  min-height: 110vh;
  @include sidepadding;
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
  padding-top: 5.4vw;
}

.intro-video-box {
  pointer-events: none;
  padding-top: 5vw;
  height: calc(#{grid(92)} * 9 / 16);
  max-width: 100%;
  // height: 100vh;
}
.intro-video {
  position: relative;
  // height: 100%;
  width: 100%;
  height: 100%;
}
</style>
