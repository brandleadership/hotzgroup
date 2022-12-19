<script>
// import { gsap } from 'gsap'
// import {
//   find,
//   hasClass,
//   isTouchDevice,
//   onFontLoaded,
// } from '~/scripts/elements.js'
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
  methods: {},

  mounted: function () {
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
  <section class="intro">
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

.intro-logo-box {
  padding-top: calc(5.4vw - #{grid(2)});
}

.intro-video-box {
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
