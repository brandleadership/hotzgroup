<script>
import { gsap, Power1, Power2, Power3, Linear } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'

import FooterSocialLink from '@/components/FooterSocialLink.vue'
import SbRichText from '@/components/SbRichText.vue'

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
  components: { FooterSocialLink, SbRichText },

  data() {
    //andere schreibweise für function() {
    return {}
  },
  methods: {
    scrollToAnim: function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
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
    <div class="js-footer-bar footer-bar">
      <div class="js-footer-line footer-line"></div>
      <div class="footer-inner-box">
        <div class="footer-left">
          <div
            class="js-footer-repeat-word-container footer-repeat-word-container"
          >
            <div class="footer-repeat-word-box home-to-about js-home-to-about">
            </div>
          </div>
          <div class="footer-links-box">
            <div class="footer-links-icons-box">
              <FooterSocialLink
                :key="key"
                v-for="(item, key) in globalSbSettings.social_links"
                :sbData="item"
              />
            </div>
            <div class="footer-links-imprint-box">
              <nuxt-link :to="'/imprint'" class="footer-imprint"
                >Imprint</nuxt-link
              >
              <br />
              <span class="footer-copy">{{
                globalSbSettings.copyright_text
              }}</span>
            </div>
          </div>
        </div>
        <div class="footer-contact">
          <div class="footer-contact-address">
            <SbRichText :richTextParams="globalSbSettings.footer_address" />
          </div>

          <div class="footer-contact-spatzek">
            Website&nbsp;by
            <a
              target="_blank"
              rel="noopener noreferrer"
              class="footer-spatzeklink"
              href="https://spatzek.studio/"
              name="Spatzek Studio"
            >
              <svg
                class="js-footer-spatzekstudio-logo footer-spatzekstudio-logo"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 148.95 61.31"
              >
                <path
                  d="M0,20H8.56c.28,2.28,2,3.36,4.8,3.36C15,23.36,17,22.72,17,21s-1.92-2.16-5.44-3C6.76,16.76,1,15.12,1,9c0-6.56,5.36-9,11.8-9,5.92,0,11.36,2.48,11.48,8.72H16c-.24-1.56-1.36-2.56-3.64-2.56-1.84,0-3.12.84-3.12,2,0,1.68,2.44,1.92,6.72,3,4.8,1.16,9.6,3,9.6,9.12,0,6.24-5.56,9.55-12.32,9.55C5.76,29.79.12,26.6,0,20Z"
                />
                <path
                  d="M26.64,8.72h7.2v2.4H34a7.62,7.62,0,0,1,6.36-3C45.8,8.08,49,13,49,18.88c0,6.68-3.52,10.91-9,10.91a6.94,6.94,0,0,1-5.68-2.59H34.2v8.67H26.64ZM41.28,19.2c0-3.12-1.28-5.08-3.52-5.08s-3.84,2.16-3.84,5.08,1.52,5,3.84,5S41.28,22.32,41.28,19.2Z"
                />
                <path
                  d="M62.16,26.88h-.08a7.19,7.19,0,0,1-6.16,2.76c-3.92,0-6.8-2.12-6.8-6.12,0-4.52,3.48-5.84,7.4-6.28,4.32-.48,5.48-1,5.48-2.28,0-1.12-.52-2-2.16-2a2.51,2.51,0,0,0-2.68,2.44H50c.16-4,3.28-7.36,9.68-7.36,3.12,0,5.12.4,6.68,1.36a6.73,6.73,0,0,1,3.16,6.12v10.2c0,1.72.12,2.64.76,3v.32H62.84A5.93,5.93,0,0,1,62.16,26.88Zm0-5.16v-1.8a12.41,12.41,0,0,1-2.92,1c-2.2.48-2.88,1.12-2.88,2.32,0,1.36,1.12,2,2.36,2A3.2,3.2,0,0,0,62.2,21.72Z"
                />
                <path
                  d="M70,8.72h2.64V2.12H80v6.6H83.9v4.56H80v8.28c0,2,1.44,2.08,3.8,1.92V29a15.5,15.5,0,0,1-3.72.48c-5,0-7.48-1.4-7.48-6.28v-10H70Z"
                />
                <path
                  d="M84.88,23.64,92,16.36c1-1,2-1.88,2-1.88v-.12s-1.6.08-2.88.08H85.6V8.76h17.92V14l-6.76,6.92c-1.24,1.24-2.6,2.48-2.6,2.48v.12s1.48-.08,3.32-.08h6.72v5.72H84.88Z"
                />
                <path
                  d="M115.16,29.68A11.51,11.51,0,0,1,108.64,28,8.59,8.59,0,0,1,104.76,23h7.32a3,3,0,0,0,2.84,1.52c2.28,0,3.56-1.44,4-3.8H104.36c-.08-4,1.08-7.68,3.56-10A10.69,10.69,0,0,1,115.44,8a10.5,10.5,0,0,1,10.88,10.84C126.32,25.12,121.84,29.68,115.16,29.68Zm-3.4-12.92h7c-.32-2.28-1.6-3.64-3.4-3.64C113.32,13.12,112.16,14.52,111.76,16.76Z"
                />
                <path
                  d="M136.32,21.8l-1.56,1.72v5.6h-7.44V.52h7.44V14.8l4.92-6.08h8.47l-6.8,7.52L149,29.12h-8.56Z"
                />
                <path
                  d="M0,51.51H8.56c.28,2.28,2,3.36,4.8,3.36,1.64,0,3.64-.64,3.64-2.36s-1.92-2.16-5.44-3C6.76,48.27,1,46.63,1,40.55c0-6.56,5.36-9,11.8-9,5.92,0,11.36,2.48,11.48,8.72H16c-.24-1.56-1.36-2.56-3.64-2.56-1.84,0-3.12.84-3.12,2,0,1.68,2.44,1.92,6.72,3,4.8,1.16,9.6,3,9.6,9.12,0,6.24-5.56,9.56-12.32,9.56C5.76,61.31.12,58.11,0,51.51Z"
                />
                <path
                  d="M24,40.23h2.61v-6.6h7.55v6.6H38v4.56H34.2v8.28c0,2,1.31,2.08,3.67,1.92v5.56a15.5,15.5,0,0,1-3.72.48c-5,0-7.51-1.4-7.51-6.28v-10H24Z"
                />
                <path
                  d="M52.71,60.63V58h-.12a7.42,7.42,0,0,1-6.36,3.28c-4.88,0-7.28-3.2-7.28-7.88V40.23h7.56V51.59c0,2.12.92,3.24,2.72,3.24,2,0,3.12-1.4,3.12-3.6v-11h7.56v20.4Z"
                />
                <path
                  d="M61,50.39c0-6.4,3.68-10.8,9.12-10.8a6.33,6.33,0,0,1,5.68,2.8h.12V32h7.56v28.6h-7.2V57.79h-.08a6.75,6.75,0,0,1-6,3.52C64.91,61.31,61,57.43,61,50.39Zm15.12-.12c0-2.92-1.52-5.24-3.76-5.24s-3.68,2.12-3.68,5.24,1.44,5.32,3.68,5.32S76.11,53.23,76.11,50.27Z"
                />
                <path d="M85.39,32H93v5.72H85.39Zm0,8.2H93v20.4H85.39Z" />
                <path
                  d="M94,50.47c0-6.2,4.4-10.84,11.2-10.84s11.12,4.64,11.12,10.84-4.32,10.8-11.12,10.8S94,56.67,94,50.47Zm14.64,0c0-3.44-1.2-5.76-3.52-5.76s-3.44,2.32-3.44,5.76,1.12,5.76,3.44,5.76S108.67,53.91,108.67,50.47Z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div class="js-footer-line2 footer-line2"></div>
    </div>

    <div
      class="js-footer-bot footer-bot"
      @click="scrollToAnim"
      @mouseenter="backToTopHoverAnim"
      @mouseleave="backToTopDeHoverAnim"
    >
      <div class="js-footer-bot-black-bg footer-bot-black-bg"></div>

      <svg
        class="js-footer-btt-arrow footer-btt-arrow"
        xmlns="http://www.w3.org/2000/svg"
        width="9"
        viewBox="0 0 9 60.5"
      >
        <g
          id="Gruppe_56"
          data-name="Gruppe 56"
          transform="translate(-955.75 -3543.25)"
        >
          <path
            class="arrowhead"
            id="Pfad_109"
            data-name="Pfad 109"
            d="M4.5-6,9,7H0Z"
            transform="translate(955.75 3549.25)"
            stroke-width="0"
          />
          <line
            class="arrowline"
            id="Linie_216"
            data-name="Linie 216"
            x2="48"
            transform="translate(960.25 3555.75) rotate(90)"
            fill="none"
            stroke="#000"
            stroke-width="1"
          />
        </g>
      </svg>
    </div>
  </section>
</template>

<style lang="scss">
@import '@/styles/tools.scss';

.footer {
  color: var(--main-color);
  width: 100%;
  padding: grid(2);
  position: relative;
  box-sizing: border-box;
  // background-color: var(--brand-color);
  // color: var(--bg-color);

  @include media('<=tablet-l') {
  }
  @include media('<tablet-l') {
    padding: grid(3);
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
    padding: grid(5);
  }
  @include media('<phone') {
  }
}

.footer-line {
  height: 2px;
  // position: absolute;
  top: 0;
  // margin-left: grid(2);
  width: 100%;
  background-color: var(--main-color);
  @include media('<=tablet-xxl') {
    height: 8px;
  }
  @include media('<tablet-l') {
    // height: 8px;
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
    height: 6px;
  }
  @include media('<phone') {
  }
}

.footer-inner-box {
  display: flex;
  @include media('<tablet-l') {
    flex-wrap: wrap;
  }
}

.footer-contact {
  padding: grid(1.5) 0 grid(1.5) 0;
  display: flex;
  flex: auto;
  align-items: flex-end;
  line-height: 1.2em;
  justify-content: space-between;
  @include media('<=tablet-l') {
    width: grid(62);
    padding: 1.5vw 0 1.5vw 0;
  }
  @include media('<tablet-l') {
    padding: 2vw 0 2vw 0;
    border-top: solid 4px var(--bg-color);
    width: 100%;
  }

  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
    padding: 3vw 0 3vw 0;
    // flex-direction: column;
    width: 100%;
    justify-content: space-between;
  }
  @include media('<phone') {
  }
}

.footer-contact-address {
  @include media('<tablet') {
    width: 100%;
    margin-top: 3vw;
  }
}
.footer-address-bold {
  @include sec-font;
  font-size: getVw(20px);
  text-transform: uppercase;

  // @include media('<desktop-l') {
  //   font-size: 18px;
  // }
}
.footer-address-link {
  text-decoration: underline;
}

.footer-left {
  display: flex;
  align-items: stretch;
  padding: grid(1.5) 0 grid(1.5) 0;
  width: grid(17);

  @include media('<=tablet-l') {
    padding: 1.5vw 0 1.5vw 0;
    width: grid(34);
  }
  @include media('<tablet-l') {
    padding: 2vw 0 2vw 0;
    width: 100%;
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
    padding: 3vw 0 3vw 0;
  }
  @include media('<phone') {
  }
}

.footer-links-box {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
  line-height: 1em;

  @include media('<=tablet-xxl') {
    margin-bottom: 0.2vw;
  }
  @include media('<=tablet-l') {
  }
  @include media('<tablet-l') {
    margin-bottom: 0.4vw;
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
    margin-bottom: 0.8vw;
  }
  @include media('<phone') {
  }
}

.footer-bar {
  display: block;
  // background-color: var(--brand-color);
  z-index: $z-roof;
  position: relative;
}

.footer-line2 {
  height: 2px;
  width: 100%;
  background-color: var(--main-color);

  @include media('<=tablet-l') {
    height: 4px;
  }
  @include media('<tablet-l') {
    height: 3px;
  }

  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
    height: 2px;
  }
  @include media('<phone') {
  }
}

.footer-bot {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 6vw;
  margin-bottom: grid(-2);
  position: relative;
  cursor: pointer;
  overflow: hidden;

  @include media('<=tablet-xxl') {
    height: 10vw;
  }
  @include media('<tablet-l') {
    height: 10vw;
  }

  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
    height: 16vw;
  }
  @include media('<phone') {
  }
}

.footer-bot-black-bg {
  background-color: var(--main-color);
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

.footer-btt-arrow {
  display: block;
  position: relative;
  height: 3vw;
  @include media('<=tablet-xxl') {
    height: 5vw;
  }
  @include media('<tablet-l') {
    height: 6vw;
  }

  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
    height: 9vw;
  }
  @include media('<phone') {
  }
}

.footer-l1-v {
  margin-left: -0.05vw;
  margin-right: -0.25vw;
}
.footer-links-imprint-box {
  line-height: 1.2em;
}

.footer-contact-spatzek {
  display: flex;
  justify-content: flex-end;
  width: calc((#{grid(2)} + #{gaps(1)}));
  align-items: baseline;

  @include media('<tablet') {
    width: 100%;
    justify-content: flex-start;
    flex-direction: column;
    padding-top: 3vw;
  }
  @include media('<tablet') {
    width: auto;
  }
}
.footer-spatzeklink {
  fill: var(--main-color);
  text-decoration: underline;
  width: 4vw;
  min-width: 60px;
  margin-left: 10px;

  @include media('<=tablet-l') {
    margin-left: 6px;
  }
  @include media('<tablet') {
    margin-left: 0;
  }

  // &:hover {
  //   .footer-spatzekstudio-logo {
  //     // fill: var(--brand-color);
  //     fill: #e2e2e2;
  //   }
  // }
}
</style>
