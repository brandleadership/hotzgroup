<script>
import { gsap, Power0, Power2 } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin.js'

gsap.registerPlugin(ScrollToPlugin)
import {
  find,
  hasClass,
  isTouchDevice,
  onFontLoaded,
} from '~/scripts/elements.js'
import imagesLoaded from 'imagesloaded'
import SbLink from '@/components/SbLink.vue'
// import NavItem from '@/components/NavItem.vue'
import Logo from '@/components/Logo.vue'

export default {
  name: 'Header',
  props: ['page', 'globalSbSettings'],
  components: { Logo },

  data() {
    //andere schreibweise für function() {
    return {
      menuOpen: false,
    }
  },
  methods: {
    toggleMenu: function () {
      if (!this.menuOpen) {
        this.showMenu()
      } else {
        this.hideMenu()
      }
    },
    scrollToAnim: function (sectionId) {
      this.scrollToTl = new gsap.to(window, {
        duration: 2,
        scrollTo: '#' + sectionId,
        ease: Power2.easeOut,
      })
    },
    activateSection: function () {
      const intro = find('.intro')[0]
      const haltung = find('.haltung')[0]
      const ansatz = find('.ansatz')[0]
      const geschichte = find('.geschichte')[0]
      const governance = find('.governance')[0]
      const vr = find('.verwaltungsrat')[0]
      const indicators = find('.section-indicator')

      this.allSections = [intro, haltung, ansatz, geschichte, governance, vr]

      this.allSections.map((section, index) => {
        // this.sectionInTl = gsap
        //   .timeline({ paused: true })
        //   .fromTo(
        //     indicators[index],
        //     { y: '120%' },
        //     { y: '0%', duration: 0.3, ease: Power2.easeInOut },
        //     0
        //   )
        // this.sectionOutTl = gsap
        //   .timeline({ paused: true })
        //   .fromTo(
        //     indicators[index],
        //     { y: '0%' },
        //     { y: '-120%', duration: 0.3, ease: Power2.easeInOut },
        //     0
        //   )
        // this.sectionRevInTl = gsap
        //   .timeline({ paused: true })
        //   .fromTo(
        //     indicators[index],
        //     { y: '-120%' },
        //     { y: '-0%', duration: 0.3, ease: Power2.easeInOut },
        //     0
        //   )
        // this.sectionRevOutTl = gsap
        //   .timeline({ paused: true })
        //   .to(
        //     indicators[index],
        //     { y: '120%', duration: 0.3, ease: Power2.easeInOut },
        //     0
        //   )

        ScrollTrigger.create({
          onEnter: () => {
            indicators[index].classList.add('section-active')
          },
          onLeave: () => {
            indicators[index].classList.remove('section-active')
          },
          onEnterBack: () => {
            indicators[index].classList.add('section-active')
          },
          onLeaveBack: () => {
            indicators[index].classList.remove('section-active')
          },
          trigger: section,
          start: '1px 80%',
          end: 'bottom 80%',
          // markers: true,
        })
      })
    },

    showMenu: function () {
      this.menuOpen = true

      this.darkener = find('.header-menu-darkener', this.$el)[0]
      this.navbox = find('.header-nav-box', this.$el)[0]
      this.navitem = find('.js-header-link-anim', this.navbox)

      this.logo = find('.header-logo', this.$el)[0]
      this.closeicon = find('.header-menu-closer', this.$el)[0]

      console.log(this.navitem, this.darkener, this.navbox, this.logo)

      this.showMenuTl = gsap
        .timeline()
        .fromTo(
          this.darkener,
          { scaleY: 0 },
          {
            duration: 0.5,
            scaleY: 1,
            ease: Power2.easeOut,
            transformOrigin: 'top',
          },
          0
        )
        .fromTo(
          this.logo,
          { y: '110%' },
          { duration: 0.4, y: '0%', ease: Power2.easeOut },
          0.3
        )
        .fromTo(
          this.navitem,
          { y: '-100%' },
          { stagger: 0.03, duration: 0.4, y: 0, ease: Power2.easeOut },
          0.5
        )
        .fromTo(
          this.closeicon,
          { opacity: 0, display: 'none' },
          {
            duration: 0.2,
            opacity: 1,
            display: 'block',
            ease: Power0.easeNone,
          },
          0
        )
    },
    hideMenu: function () {
      this.hideMenuTl = gsap
        .timeline({
          onComplete: () => {
            this.menuOpen = false
          },
        })
        .to(this.logo, { duration: 0.4, y: '110%', ease: Power2.easeOut }, 0.2)
        .to(
          this.navitem,
          { stagger: 0.03, duration: 0.4, y: '-100%', ease: Power2.easeOut },
          0
        )
        .to(
          this.darkener,
          {
            duration: 0.5,
            scaleY: 0,
            ease: Power2.easeOut,
            transformOrigin: 'top',
          },
          0.5
        )
        .to(
          this.closeicon,
          { duration: 0.2, opacity: 0, display: 'none', ease: Power0.easeNone },
          0.7
        )
    },
  },

  mounted: function () {
    this.activateSection()
    // const elements = find('img', this.$el)
    // onFontLoaded(() => {
    //   this.$nextTick(() => {
    //     imagesLoaded(elements, () => {
    //       setTimeout(() => {}, 1000)
    //     })
    //   })
    // })
  },
}
</script>

<template>
  <header>
    <div class="js-header-menu header-menu">
      <div class="section-indicator-box">
        <div class="section-indicator-mask">
          <span class="section-indicator">&nbsp;</span>
        </div>
        <div class="section-indicator-mask">
          <span class="section-indicator">Haltung</span>
        </div>
        <div class="section-indicator-mask">
          <span class="section-indicator">Ansatz</span>
        </div>
        <div class="section-indicator-mask">
          <span class="section-indicator">Geschichte</span>
        </div>
        <div class="section-indicator-mask">
          <span class="section-indicator">Governance</span>
        </div>
        <div class="section-indicator-mask">
          <span class="section-indicator">VR</span>
        </div>
      </div>
      <div class="header-menu-icon-box">
        <div class="header-menu-icon" @click="toggleMenu">
          <span>Menu</span>
        </div>
        <div class="header-menu-closer" @click="toggleMenu">
          <span>Close</span>
        </div>
      </div>

      <div
        class="js-header-menu header-menu-overlay"
        :class="{ 'menu-active': this.menuOpen }"
        @click="toggleMenu"
      >
        <div class="header-menu-darkener"></div>
        <div class="header-logo-pos">
          <div class="header-logo-mask">
            <Logo class="header-logo"></Logo>
          </div>
          <div class="header-nav-box">
            <div class="header-sectionlinks">
              <div class="header-link-mask">
                <span
                  class="js-header-link-anim header-sectionlink"
                  @click="scrollToAnim('home')"
                  >Home</span
                >
              </div>
              <div class="header-link-mask">
                <span
                  class="js-header-link-anim header-sectionlink"
                  @click="scrollToAnim('haltung')"
                  >Haltung</span
                >
              </div>
              <div class="header-link-mask">
                <span
                  class="js-header-link-anim header-sectionlink"
                  @click="scrollToAnim('ansatz')"
                  >Ansatz</span
                >
              </div>
              <div class="header-link-mask">
                <span
                  class="js-header-link-anim header-sectionlink"
                  @click="scrollToAnim('geschichte')"
                  >Geschichte</span
                >
              </div>
              <div class="header-link-mask">
                <span
                  class="js-header-link-anim header-sectionlink"
                  @click="scrollToAnim('governance')"
                  >Governance</span
                >
              </div>
              <div class="header-link-mask">
                <span
                  class="js-header-link-anim header-sectionlink"
                  @click="scrollToAnim('vr')"
                  >VR</span
                >
              </div>
            </div>

            <div class="header-pagelinks">
              <div class="header-link-mask">
                <nuxt-link
                  class="js-header-link-anim header-link"
                  :to="'/datenschutz'"
                  >Datenschutz
                </nuxt-link>
              </div>
              <div class="header-link-mask">
                <nuxt-link class="js-header-link-anim header-link" :to="'/agb'"
                  >AGB
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
@import '@/styles/tools.scss';

header {
  // position: fixed;
  color: var(--main-color);
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  top: 0;
  right: 0;
  @include fullpadding('padding');
  z-index: $z-sun;

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

  @media (hover: hover) and (pointer: fine) {
    //this is only desktop
  }
  @media (hover: none) and (pointer: coarse) {
    //this is only touch
  }
}

.header-menu {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: grid(-0.5);
}
.section-indicator-box {
  @include regular-font;
  text-transform: uppercase;
  font-size: 12px;
  position: relative;
  color: $sec-color;
  // left: 0;
}
.section-indicator-mask {
  position: absolute;
  top: 0;
  overflow: hidden;
}
.section-indicator {
  display: none;
  // position: relative;
  // transform: translate(0, 120%);
}
.header-menu-icon-box {
  position: relative;
  font-size: 20px;
  // z-index: 999999;
  cursor: pointer;
}
.header-menu-overlay {
  position: fixed;
  @include sidepadding('padding');
  box-sizing: border-box;
  @include vh(100, height);
  display: flex;
  align-items: center;
  width: 100%;
  left: 0;
  top: 0;
  display: none;
  @include media('<=tablet-l') {
  }
  @include media('<tablet-l') {
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
    @media (orientation: landscape) {
    }
  }
}

.header-menu-darkener {
  width: 100%;
  height: 100%;
  background-color: var(--main-color);
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;

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
}

.header-nav-box {
  position: absolute;
  display: flex;
  left: 50%;
  top: 100%;

  @include media('<=tablet-l') {
  }
  @include media('<tablet-l') {
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
    @media (orientation: landscape) {
    }
  }
  @include media('<phone') {
  }
}

.header-logo-pos {
  position: relative;
  width: 100%;
}
.header-logo-mask {
  position: relative;
  overflow: hidden;
}
.header-link-mask {
  position: relative;
  overflow: hidden;
}
.header-sectionlinks,
.header-pagelinks {
  display: flex;
  flex-direction: column;
  @include regular-font;
  color: var(--sec-color);
  width: grid(15);
}
.header-sectionlink,
.header-link {
  display: block;
  position: relative;
  cursor: pointer;
}
.menu-active {
  display: flex;
}
.section-active {
  display: block;
  // transform: translate(0, 0);
}
.header-menu-closer {
  display: none;
  position: absolute;
  top: 0;
  z-index: 9999;
  color: var(--sec-color);
  cursor: pointer;
}
</style>
