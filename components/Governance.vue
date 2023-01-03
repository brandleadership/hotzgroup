<script>
import { gsap, Power2 } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import {
  find,
  hasClass,
  isTouchDevice,
  onFontLoaded,
} from '~/scripts/elements.js'
import imagesLoaded from 'imagesloaded'
import Logo from './Logo.vue'

export default {
  name: 'Governance',
  props: ['sectioncontent'],
  components: { Logo },

  data() {
    //andere schreibweise für function() {
    return {}
  },
  methods: {
    lineanim: function () {
      const linesht = find('.gov-line-hor-top', this.$el)
      const lineshb = find('.gov-line-hor-bot', this.$el)
      const linesvt = find('.gov-line-vert-right', this.$el)
      const linesvb = find('.gov-line-vert-left', this.$el)
      const trigger = find('.gov-box', this.$el)[0]
      const headline = find('.vr-headline', this.$el)
      // const words = find('.char', this.$el)
      this.lineanimTl = gsap
        .timeline({ paused: true })
        .fromTo(
          linesht,
          { scaleX: 0 },
          { scaleX: 1, stagger: 0.2, duration: 1, ease: Power2.easeOut },
          0
        )
        .fromTo(
          lineshb,
          { scaleX: 0 },
          { scaleX: 1, stagger: 0.2, duration: 1, ease: Power2.easeOut },
          0
        )
        .fromTo(
          linesvt,
          { scaleY: 0 },
          { scaleY: 1, stagger: 0.2, duration: 1, ease: Power2.easeOut },
          0
        )
        .fromTo(
          linesvb,
          { scaleY: 0 },
          { scaleY: 1, stagger: 0.2, duration: 1, ease: Power2.easeOut },
          0
        )

      ScrollTrigger.create({
        animation: this.lineanimTl,
        trigger: trigger,
        start: 'top 70%', // when the top of the trigger hits the top of the viewport
        toggleActions: 'play none none reverse', //onEnter, onLeave, onEnterBack, onLeaveBack

        // end: 'top 50%', // when the top of the trigger hits the top of the viewport
        // scrub: 0,
        // markers: 'true',
      })
    },
  },

  mounted: function () {
    this.lineanim()
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
  <section class="governance" id="governance">
    <div class="gov-bg"></div>

    <h1 class="gov-hl">{{ sectioncontent }}</h1>
    <div class="gov-box">
      <div class="gov-line-hor-top"></div>
      <div class="gov-line-hor-bot"></div>
      <div class="gov-line-vert-right"></div>
      <div class="gov-line-vert-left"></div>
      <div class="gov-logo-box">
        <Logo></Logo>
        <div class="gov-firstline-box"
          ><div class="gov-line-hor-bot"></div
        ></div>
      </div>
      <div class="gov-tier2">
        <div class="gov-leftbox">
          <div class="gov-line-vert-right"></div>
          <div class="gov-categories-box">
            <span class="gov-categories">Brand Leadership Circle</span>
            <div class="gov-line-hor-bot"></div>
          </div>
          <div class="gov-brands-box">
            <div class="gov-brand">
              <img
                class="gov-brand-logo"
                src="/images/calydo_logo.svg"
                alt="calydo"
              />
              <div class="gov-line-vert-right"></div>
            </div>
            <div class="gov-brand">
              <img
                class="gov-brand-logo"
                src="/images/hotz_logo.svg"
                alt="hotz"
              />
              <div class="gov-line-vert-right"></div>
            </div>
            <div class="gov-brand">
              <img
                class="gov-brand-logo"
                src="/images/gateb_logo.svg"
                alt="gateb"
              />
              <div class="gov-line-vert-right"></div>
            </div>
            <div class="gov-brand">
              <img
                class="gov-brand-logo"
                src="/images/hilda_logo.svg"
                alt="hilda"
              />
              <div class="gov-line-vert-right"></div>
            </div>
            <div class="gov-brand">
              <img
                class="gov-brand-logo"
                src="/images/focusnext_logo.svg"
                alt="focusnext"
              />
            </div>
          </div>
        </div>
        <div class="gov-centerbox">
          <div class="gov-line-vert-right"></div>
          <div class="gov-categories-box">
            <span class="gov-categories">Do Tank</span>
            <div class="gov-line-hor-bot"></div>
          </div>
          <div class="gov-brands-box">
            <div class="gov-brand">
              <img
                class="gov-brand-logo"
                src="/images/lab_logo.svg"
                alt="lab"
              />
            </div>
          </div>
        </div>
        <div class="gov-rightbox">
          <div class="gov-categories-box">
            <span class="gov-categories">Luxusmarken</span>
            <div class="gov-line-hor-bot"></div>
          </div>
          <div class="gov-brands-box">
            <div class="gov-brand">
              <img
                class="gov-brand-logo"
                src="/images/hieronymus_logo.svg"
                alt="hieronymus"
              />
              <div class="gov-line-vert-right"></div>
            </div>
            <div class="gov-brand">
              <img
                class="gov-brand-logo"
                src="/images/extrablack_logo.svg"
                alt="extrablack"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>



<style lang="scss" scoped="true">
@import '@/styles/tools.scss';

.governance {
  position: relative;
  color: var(--main-color);
  padding: 30vw grid(7);

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
.gov-line-hor-top {
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: var(--main-color);
  top: 0;
  left: 0;
}
.gov-line-hor-bot {
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: var(--main-color);
  bottom: 0;
  left: 0;
}
.gov-line-vert-right {
  position: absolute;
  width: 1px;
  height: 100%;
  background-color: var(--main-color);
  right: 0;
  top: 0;
}
.gov-line-vert-left {
  position: absolute;
  width: 1px;
  height: 100%;
  background-color: var(--main-color);
  left: 0;
  top: 0;
}
.gov-bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--sec-color);
}
.gov-hl {
  position: relative;
  font-size: 24px;
  text-transform: uppercase;
  margin-bottom: grid(8);
}
.gov-box {
  position: relative;
  display: flex;
  flex-direction: column;
  // border: 1px solid var(--main-color);
}
.gov-logo-box {
  display: flex;
  position: relative;
  width: 100%;
  padding: grid(4) grid(26);
  box-sizing: border-box;
}
.gov-tier2 {
  position: relative;
  display: flex;
  width: 100%;
  padding: grid(1);
  box-sizing: border-box;
}
.gov-categories-box {
  position: relative;
  display: flex;
  justify-content: center;
  font-size: getVw(35px);
  width: 100%;
  padding: grid(2) grid(1) grid(2.5);
  box-sizing: border-box;
}
.gov-leftbox {
  flex-direction: column;
  position: relative;
  display: flex;
  width: grid(40);
  padding: 0 grid(1) 0 0;
  box-sizing: border-box;
}
.gov-centerbox {
  flex-direction: column;
  position: relative;
  display: flex;
  width: grid(16);
  padding: 0 grid(1);
  box-sizing: border-box;
}
.gov-rightbox {
  flex-direction: column;
  position: relative;
  display: flex;
  width: grid(26);
  padding: 0 0 0 grid(1);
  box-sizing: border-box;
}
.gov-brands-box {
  position: relative;
  display: flex;
  box-sizing: border-box;
  padding: grid(1) 0 0 0;
}
.gov-brand {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: grid(1.2) 0;
  box-sizing: border-box;
}
.gov-brand-logo {
  position: relative;
  width: 100%;
  max-width: 65%;
  max-height: 0.9vw;
}
.gov-firstline-box {
  width: calc(100% - #{grid(2)});
  position: absolute;
  bottom: 0;
  left: grid(1);
}
</style>
