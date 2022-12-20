<script>
import { gsap, Power0, Power2 } from 'gsap'
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
    setColors: function () {
      if (!this.haltungitem.background_color) return

      this.bg = find('.haltung-bg-color', this.$el)[0]
      if (!this.bg) return
      this.bg.style.backgroundColor = this.haltungitem.background_color
    },

    scrollanim: function () {
      const bgColor = find('.haltung-bg-color', this.$el)[0]
      console.log(bgColor)
      this.headline1 = find('.haltung-headline1', this.$el)[0]
      this.headline2 = find('.haltung-headline2', this.$el)[0]
      const hlDuration = 0.7
      const stagger = 0.13
      // this.headline2 = find('.haltung-headline2', this.$el)[0]

      this.headlineInTl = gsap.timeline({ paused: true }).fromTo(
        this.headline1,
        {
          y: '120%',
        },
        {
          y: '0%',
          duration: hlDuration,
          ease: Power2.easeInOut,
        },
        0
      )
      if (this.headline2) {
        this.headlineInTl.fromTo(
          this.headline2,
          {
            y: '120%',
          },
          {
            y: '0%',
            duration: hlDuration,
            ease: Power2.easeInOut,
          },
          stagger
        )
      }
      if (bgColor) {
        this.headlineInTl.fromTo(
          bgColor,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: Power0.easeNone },
          0
        )
      }

      this.headlineOutTl = gsap.timeline({ paused: true }).to(
        this.headline1,
        {
          y: '-120%',
          duration: hlDuration,
          ease: Power2.easeInOut,
        },
        0
      )
      if (this.headline2) {
        this.headlineOutTl.to(
          this.headline2,
          {
            y: '-120%',
            duration: hlDuration,
            ease: Power2.easeInOut,
          },
          stagger
        )
      }
      if (bgColor) {
        this.headlineOutTl.to(
          bgColor,
          { opacity: 0, duration: 0.4, ease: Power0.easeNone },
          0
        )
      }

      this.headlineInRevTl = gsap.timeline({ paused: true }).fromTo(
        this.headline1,
        {
          y: '-120%',
        },
        {
          y: '0%',
          stagger: 0.03,
          duration: hlDuration,
          ease: Power2.easeInOut,
        },
        stagger
      )
      if (this.headline2) {
        this.headlineInRevTl.fromTo(
          this.headline2,
          {
            y: '-120%',
          },
          {
            y: '0%',
            stagger: 0.03,
            duration: hlDuration,
            ease: Power2.easeInOut,
          },
          0
        )
      }
      if (bgColor) {
        this.headlineInRevTl.fromTo(
          bgColor,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: Power0.easeNone },
          0
        )
      }
      this.headlineOutRevTl = gsap.timeline({ paused: true }).to(
        this.headline1,
        {
          y: '120%',
          duration: hlDuration,
          ease: Power2.easeInOut,
        },
        stagger
      )
      if (this.headline2) {
        this.headlineOutRevTl.to(
          this.headline2,
          {
            y: '120%',
            duration: hlDuration,
            ease: Power2.easeInOut,
          },
          0
        )
      }
      if (bgColor) {
        this.headlineOutRevTl.to(
          bgColor,
          { opacity: 0, duration: 0.4, ease: Power0.easeNone },
          0
        )
      }

      ScrollTrigger.create({
        animation: this.scrollanimTl,
        trigger: this.$el,
        start: 'top 80%', // when the top of the trigger hits the top of the viewport
        end: 'bottom 80%', // when the top of the trigger hits the top of the viewport
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
        // markers: 'true',
      })
    },

    lineHeightAnim: function () {
      const textbox = find('.haltung-textbox', this.$el)[0]
      const lines = find('.haltung-line', this.$el)
      const text = find('.haltung-text', this.$el)[0]
      // const text = find(this.lines)

      // console.log(text)

      this.lineHeightAnimTl = gsap.timeline({ paused: true }).fromTo(
        text,
        {
          lineHeight: '2em',
        },
        {
          lineHeight: '1.1em',
          duration: 1,
          ease: Power0.easeNone,
        },
        0
      )

      ScrollTrigger.create({
        animation: this.lineHeightAnimTl,
        trigger: textbox,
        start: 'top bottom', // when the top of the trigger hits the top of the viewport
        end: 'top 60%', // when the top of the trigger hits the top of the viewport
        scrub: 1,
        markers: 'true',
      })
    },

    // splitText: function () {
    //   const splitText = find('.haltung-text', this.$el)[0]

    //   // console.log(splitText)
    //   if (splitText.hasAttribute('data-originalContent')) {
    //     splitText.innerHTML = splitText.getAttribute('data-originalContent')
    //   }
    //   splitText.setAttribute('data-originalContent', splitText.innerHTML)

    //   const results = Splitting({
    //     target: splitText,
    //     by: 'lines',
    //     key: null,
    //   })

    //   this.lines = results[0].lines[0]
    //   // results[0].lines.forEach((line, index) => {
    //   //   line.forEach((word) => {
    //   //     word.classList.add('word-line' + index)
    //   //   })
    //   // })
    //   for (let index = 0; index < results[0].lines.length; index++) {
    //     let wrapper = document.createElement('div')
    //     let mask = document.createElement('div')
    //     wrapper.classList.add('haltung-line')

    //     for (
    //       let indexWords = 0;
    //       indexWords < results[0].lines[index].length;
    //       indexWords++
    //     ) {
    //       wrapper.appendChild(results[0].lines[index][indexWords])
    //       let whitespace = document.createElement('span')
    //       whitespace.innerHTML = '&nbsp;'
    //       whitespace.classList.add('whitespace')
    //       wrapper.appendChild(whitespace)
    //     }
    //     splitText.appendChild(wrapper)
    //   }
    //   // for (let index = 0; index < results[0].lines.length; index++) {
    //   //   for (
    //   //     let indexWords = 0;
    //   //     indexWords < results[0].lines[index].length;
    //   //     indexWords++
    //   //   ) {
    //   //     results[0].lines[index][indexWords].classList.add('splitTextMask')
    //   //     results[0].lines[index][indexWords].innerHTML =
    //   //       '<span class="splitTextElement line' +
    //   //       index +
    //   //       '">' +
    //   //       results[0].lines[index][indexWords].innerHTML +
    //   //       '</span>' //wrap div around element with class 'splitTextMask'
    //   //   }
    //   // }
    // },
  },

  mounted: function () {
    // this.splitText()
    this.setColors()
    this.scrollanim()
    this.lineHeightAnim()

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
          <h1 class="haltung-headline haltung-headline1">{{
            haltungitem.Headline_Line1
          }}</h1>
        </div>
        <div class="haltung-hl-mask haltung-hl-mask2">
          <h1
            v-if="haltungitem.Headline_Line2"
            class="haltung-headline haltung-headline2"
            >{{ haltungitem.Headline_Line2 }}</h1
          >
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
  color: var(--sec-color);

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
  background-color: var(--main-color);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
}

.haltung-hl-box {
  width: grid(84);
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
  // transform: translate(0, 120%);
}
.haltung-hl-mask2 {
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
  position: relative;
  margin-top: 100vh;
  margin-bottom: 100vh;
  width: grid(56);
  margin-left: grid(34);
}
.haltung-text {
  display: block;
  width: 100%;
  position: absolute;
  font-size: getVw(50px);
  line-height: 1.1em;
  @include sec-font;
  color: var(--sec-color);
}
.haltung-line {
  display: block;
  position: relative;
}

.haltung-link {
  display: block;
  position: relative;
  margin-top: 60px;
  @include italic-font;
}
</style>
