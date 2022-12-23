<script>
import { gsap, Power1, Power2, Power3, Linear } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import SbLink from '@/components/SbLink.vue'
import SbRichText from '@/components/SbRichText.vue'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin.js'
gsap.registerPlugin(ScrollToPlugin)

import {
  find,
  hasClass,
  isTouchDevice,
  onFontLoaded,
} from '~/scripts/elements.js'
import imagesLoaded from 'imagesloaded'

export default {
  name: 'Footer',
  props: ['globalSbSettings'],
  components: { SbLink, SbRichText },

  data() {
    //andere schreibweise für function() {
    return {}
  },
  methods: {
    scrollToAnim: function (sectionId) {
      this.scrollToTl = new gsap.to(window, {
        duration: 2,
        scrollTo: '#' + sectionId,
        ease: Power2.easeOut,
      })
    },
    backToTopHoverAnim: function () {
      if (isTouchDevice() == true) {
        return
      }
      const bg = find('.js-footer-bot-black-bg', this.$el)[0]
      const bttArrow = find('.js-footer-btt-arrow', this.$el)[0]
      const bttArrowHead = find('.arrowhead', this.$el)[0]
      const bttArrowLine = find('.arrowline', this.$el)[0]

      const backToTopHoverTl = gsap
        .timeline()
        .set(bg, { opacity: 1 })
        .fromTo(
          bg,
          { scaleY: 0 },
          {
            duration: 0.3,
            scaleY: 1,
            ease: Power3.easeOut,
            transformOrigin: 'bottom',
          },
          0
        )
        .to(bttArrow, { y: '-5vw', ease: Power3.easeOut, duration: 0.5 }, 0)
        .fromTo(
          bttArrow,
          { y: '5vw' },
          { y: '0vw', ease: Power3.easeOut, duration: 0.3 }
        )

      backToTopHoverTl
        .fromTo(
          bttArrowHead,
          { fill: '#000' },
          { duration: 0.3, fill: '#fff' },
          0
        )
        .fromTo(
          bttArrowLine,
          { stroke: '#000' },
          { duration: 0.3, stroke: '#fff' },
          0
        )

      return backToTopHoverTl
    },
    backToTopDeHoverAnim: function () {
      if (isTouchDevice() == true) {
        return
      }
      const bg = find('.js-footer-bot-black-bg', this.$el)[0]
      const bttArrow = find('.js-footer-btt-arrow', this.$el)[0]
      const bttArrowHead = find('.arrowhead', this.$el)[0]
      const bttArrowLine = find('.arrowline', this.$el)[0]

      const backToTopDeHoverTl = gsap.timeline().set(bg, { opacity: 1 }).to(
        bg,
        {
          duration: 0.3,
          scaleY: 0,
          ease: Power3.easeOut,
          transformOrigin: 'top',
        },
        0
      )

      backToTopDeHoverTl
        .to(bttArrowHead, { duration: 0.3, fill: '#000' }, 0)
        .to(bttArrowLine, { duration: 0.3, stroke: '#000' }, 0)

      return backToTopDeHoverTl
    },
  },

  mounted: function () {
    // const elements = find('img')
    // onFontLoaded(() => {
    //   this.$nextTick(() => {
    //     imagesLoaded(elements, () => {
    //       setTimeout(() => {
    //       }, 100)
    //     })
    //   })
    // })
  },
}
</script>

<template>
  <section class="js-footer footer">
    <div class="footer-line"></div>
    <div class="footer-inner">
      <div class="footer-col1">
        <span class="footer-links-hl">
          {{ globalSbSettings.headline_links_col1 }}
        </span>
        <a
          class="footer-link"
          href="https://brandleadership.ch/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="footer-link-txt">BLC</span>
        </a>
        <a
          class="footer-link"
          href="https://www.calydo.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="footer-link-txt">Calydo</span>
        </a>
        <a
          class="footer-link"
          href="https://gateb.ch/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="footer-link-txt">gateB</span>
        </a>
        <a
          class="footer-link"
          href="https://focusnext.ch/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="footer-link-txt">Focus Next</span>
        </a>
        <a
          class="footer-link"
          href="https://www.hieronymus-cp.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="footer-link-txt">Hieronymus</span>
        </a>
      </div>
      <div class="footer-col2 footer-r-col">
        <span class="footer-col2-item" @click="scrollToAnim('home')">Home</span>
        <span class="footer-col2-item" @click="scrollToAnim('haltung')"
          >Haltung</span
        >
        <span class="footer-col2-item" @click="scrollToAnim('ansatz')"
          >Ansatz</span
        >
        <span class="footer-col2-item">Geschichte</span>
        <span class="footer-col2-item">Governance</span>
        <span class="footer-col2-item">VR</span>
      </div>
      <div class="footer-col3 footer-r-col">
        <nuxt-link class="footer-link" :to="'/datenschutz'"
          >Datenschutz
        </nuxt-link>
        <nuxt-link class="footer-link" :to="'/agb'">AGB </nuxt-link>
      </div>
      <div class="footer-col4 footer-r-col">
        <SbRichText
          class="footer-contact"
          :richTextParams="globalSbSettings.footer_contact"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@import '@/styles/tools.scss';

.footer {
  @include regular-font;
  @include fullpadding('padding');
  padding: grid(2) grid(7);
  color: var(--main-color);
  width: 100%;

  position: relative;
  box-sizing: border-box;
  background-color: var(--main-color);
  color: var(--sec-color);
  // background-color: var(--brand-color);
  // color: var(--bg-color);

  // @include media('<=tablet-l') {
  // }
  // @include media('<tablet-l') {
  //   padding: grid(3);
  // }
  // @include media('<tablet-l') {
  //   @media (orientation: landscape) {
  //   }
  // }
  // @include media('<tablet') {
  //   padding: grid(5);
  // }
  // @include media('<phone') {
  // }

  // a {
  //   text-decoration: underline;
  // }
}

.footer-line {
  height: 2px;
  // position: absolute;
  margin-top: grid(2);
  margin-bottom: grid(2);
  // margin-left: grid(2);
  width: 100%;
  background-color: var(--sec-color);
}

.footer-inner {
  display: flex;
}
.footer-col1 {
  display: flex;
  flex-direction: column;
  width: grid(37);
}
.footer-r-col {
  display: flex;
  flex-direction: column;
  width: grid(15);
}

.footer-col2-item {
  cursor: pointer;
}
</style>
