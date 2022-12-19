<script>
import { gsap, Power0, Power2 } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'

import {
  find,
  hasClass,
  isTouchDevice,
  onFontLoaded,
} from '~/scripts/elements.js'
import imagesLoaded from 'imagesloaded'
import SbLink from '@/components/SbLink.vue'
import NavItem from '@/components/NavItem.vue'

export default {
  name: 'Header',
  props: ['page', 'globalSbSettings'],
  components: { NavItem },

  data() {
    //andere schreibweise für function() {
    return {
      menuOpen: false,
    }
  },
  methods: {
    toggleMobileMenu: function () {
      if (!this.menuOpen) {
        this.showMenu()
      } else {
        this.hideMenu()
      }
    },

    showMenu: function () {
      this.menuOpen = true

      this.darkener = find('.js-header-menu-mobile-darkener', this.$el)[0]
      this.yellowbg = find('.js-header-menu-mobile-bg', this.$el)[0]
      this.mobile = find('.js-header-menu-mobile-box', this.$el)[0]
      this.navitem = find('.js-navitem-text', this.mobile)
      this.logo = find('.js-header-menu-mobile-overlay-logo', this.$el)[0]
      this.showMenuTl = gsap
        .timeline()
        .fromTo(
          this.darkener,
          { opacity: 0 },
          { duration: 0.3, opacity: 1, ease: Power0.easeNone },
          0
        )
        .fromTo(
          this.logo,
          { opacity: 0 },
          { duration: 0.5, opacity: 1, ease: Power0.easeNone },
          0
        )
        .fromTo(
          this.navitem,
          { y: '-100%' },
          { stagger: 0.06, duration: 0.3, y: 0, ease: Power2.easeOut },
          0.2
        )
        .fromTo(
          this.yellowbg,
          { scaleY: 0 },
          {
            duration: 0.5,
            scaleY: 1,
            ease: Power2.easeOut,
            transformOrigin: 'top',
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
        .to(
          this.darkener,
          { duration: 0.3, opacity: 0, ease: Power0.easeNone },
          0.2
        )
        .to(
          this.logo,
          { duration: 0.5, opacity: 0, ease: Power0.easeNone },
          0.2
        )
        .to(
          this.navitem,
          { stagger: 0.05, duration: 0.3, y: '-100%', ease: Power2.easeOut },
          0
        )
        .to(
          this.yellowbg,
          {
            duration: 0.5,
            scaleY: 0,
            ease: Power2.easeOut,
            transformOrigin: 'top',
          },
          0.2
        )
    },
  },

  mounted: function () {
    const elements = find('img', this.$el)
    onFontLoaded(() => {
      this.$nextTick(() => {
        imagesLoaded(elements, () => {
          setTimeout(() => {}, 1000)
        })
      })
    })
  },
}
</script>

<template>
  <header>
    <div class="js-header-menu header-menu">
      <NavItem
        :page="page"
        :key="key"
        v-for="(item, key) in globalSbSettings.nav_main"
        :class="'header-topbar-quicknav-item'"
        :sbData="item"
      />
    </div>
    <div class="js-header-menu-mobile header-menu-mobile">
      <!-- <div class="header-menu-mobile-bg"></div> -->
      <div
        class="js-header-menu-hamburger header-menu-hamburger"
        @click="toggleMobileMenu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 24"
          class="js-smv-hamburger-icon smv-hamburger-icon"
        >
          <g
            id="Gruppe_46"
            data-name="Gruppe 46"
            transform="translate(-969 -749.25)"
          >
            <line
              id="Linie_44"
              data-name="Linie 44"
              y2="23.5"
              transform="translate(1000 749.25)"
              stroke-width="2"
            />
            <g
              id="Gruppe_45"
              data-name="Gruppe 45"
              transform="translate(949 1)"
            >
              <path
                id="Pfad_17"
                data-name="Pfad 17"
                d="M0-.5v24"
                transform="translate(23 748.75)"
                stroke-width="2"
              />
              <line
                id="Linie_41"
                data-name="Linie 41"
                y2="23.5"
                transform="translate(29 748.25)"
                stroke-width="2"
              />
              <line
                id="Linie_42"
                data-name="Linie 42"
                y2="23.5"
                transform="translate(35 748.25)"
                stroke-width="2"
              />
              <line
                id="Linie_43"
                data-name="Linie 43"
                y2="23.5"
                transform="translate(41 748.25)"
                stroke-width="2"
              />
              <line
                id="Linie_45"
                data-name="Linie 45"
                x2="24"
                transform="translate(20 760)"
                stroke-width="2"
              />
            </g>
          </g>
        </svg>
      </div>

      <div
        class="js-header-menu-mobile header-menu-mobile-overlay"
        :class="{ 'mobile-nav-active': this.menuOpen }"
        @click="toggleMobileMenu"
      >
        <div
          class="js-header-menu-mobile-darkener header-menu-mobile-darkener"
        ></div>
        <div class="js-header-menu-mobile-bg header-menu-mobile-bg"></div>
        <div class="js-header-menu-mobile-box header-menu-mobile-box">
          <NavItem
            :page="page"
            :key="key"
            v-for="(item, key) in globalSbSettings.nav_main"
            :class="'header-topbar-quicknav-item'"
            :sbData="item"
          />
        </div>

        <svg
          version="1.1"
          id="Ebene_2_1_"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 93.3 89.3"
          style="enable-background: new 0 0 93.3 89.3"
          xml:space="preserve"
          class="
            js-header-menu-mobile-overlay-logo
            header-menu-mobile-overlay-logo
          "
        >
          <g id="Layer_1">
            <g id="Layer_2">
              <g id="Layer_1-2">
                <rect x="27.4" y="13.9" width="11.6" height="61.4" />
                <rect x="40.9" y="13.9" width="11.6" height="61.4" />
                <rect x="54.3" y="13.9" width="11.6" height="61.4" />
                <polygon
                  points="25.5,30.1 25.5,13.6 12.4,0.5 0.5,0.5 0.5,24.1 25.5,49.1 25.5,32.7 12.1,19.3 12.1,16.6"
                />
                <polygon
                  points="0.5,45.8 0.5,62.2 13.6,75.4 25.5,75.4 25.5,51.8 0.5,26.8 0.5,43.1 13.9,56.6 13.9,59.2"
                />
                <polygon points="67.8,14.6 67.8,56.6 79.3,68.1 79.3,26.2" />
                <polygon
                  points="81.2,14.6 81.2,72.6 67.8,59.3 67.8,75.7 80.9,88.8 92.8,88.8 92.8,26.2"
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
    <nuxt-link aria-label="home" :to="'/home'">
      <svg
        version="1.1"
        id="Ebene_2_1_"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 93.3 89.3"
        style="enable-background: new 0 0 93.3 89.3"
        xml:space="preserve"
        class="js-header-smv-logo header-smv-logo"
      >
        <g id="Layer_1">
          <g id="Layer_2">
            <g id="Layer_1-2">
              <rect x="27.4" y="13.9" width="11.6" height="61.4" />
              <rect x="40.9" y="13.9" width="11.6" height="61.4" />
              <rect x="54.3" y="13.9" width="11.6" height="61.4" />
              <polygon
                points="25.5,30.1 25.5,13.6 12.4,0.5 0.5,0.5 0.5,24.1 25.5,49.1 25.5,32.7 12.1,19.3 12.1,16.6"
              />
              <polygon
                points="0.5,45.8 0.5,62.2 13.6,75.4 25.5,75.4 25.5,51.8 0.5,26.8 0.5,43.1 13.9,56.6 13.9,59.2"
              />
              <polygon points="67.8,14.6 67.8,56.6 79.3,68.1 79.3,26.2" />
              <polygon
                points="81.2,14.6 81.2,72.6 67.8,59.3 67.8,75.7 80.9,88.8 92.8,88.8 92.8,26.2"
              />
            </g>
          </g>
        </g>
      </svg>
    </nuxt-link>
  </header>
</template>

<style lang="scss">
@import '@/styles/tools.scss';

header {
  // position: fixed;
  color: var(--main-color);
  display: flex !important;
  align-items: flex-start;
  justify-content: space-between;
  position: fixed;
  top: grid(2);
  right: grid(2);
  width: grid(14);
  z-index: $z-sun;

  @include media('<=tablet-l') {
    width: grid(19);
  }
  @include media('<tablet-l') {
    // width: grid(90);
    top: grid(3);
    right: grid(3);
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
    width: grid(86);
    top: grid(5);
    right: grid(5);
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
  margin-top: -0.3vw;
  line-height: 1.45em;
  @include media('<=tablet-l') {
    display: none;
  }
}
.header-menu-mobile {
  @include media('>tablet-l') {
    display: none;
  }
}

.header-smv-logo {
  width: 47px;
  fill: var(--main-color);
  margin-top: -0.2vw;
  transition: fill 0.1s;

  &:hover {
    fill: var(--brand-color) !important;
  }

  @include media('<=tablet-l') {
  }
  @include media('<tablet-l') {
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
    width: 34px;
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

.header-menu-mobile-overlay {
  position: fixed;
  @include vh(100, height);
  width: 100%;
  // background-color: var(--brand-color);
  // border: grid(0.4) solid var(--bg-color);
  box-sizing: border-box;
  padding: grid(2);

  left: 0;
  top: 0;
  display: none;
  @include media('<=tablet-l') {
    padding: grid(4);
    // border: grid(0.7) solid var(--bg-color);
  }
  @include media('<tablet-l') {
    padding: grid(5);
    // border: grid(1) solid var(--bg-color);
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
    padding: grid(7.5);
    // border: grid(1.5) solid var(--bg-color);
    @media (orientation: landscape) {
      padding: grid(5);
    }
  }
}

.header-menu-mobile-darkener {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  // opacity: 0.5;
  box-sizing: border-box;
  border: grid(0.4) solid var(--brand-color);

  @include media('<=tablet-l') {
    border: grid(0.7) solid var(--brand-color);
  }
  @include media('<tablet-l') {
    border: grid(1) solid var(--brand-color);
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
    border: grid(1.5) solid var(--brand-color);
  }
}
.header-menu-mobile-bg {
  width: calc(100% - #{grid(10)});
  height: calc(100% - #{grid(10)});
  background-color: var(--brand-color);
  box-sizing: border-box;
  position: absolute;

  @include media('<=tablet-l') {
    width: calc(100% - #{grid(8)});
    height: calc(100% - #{grid(8)});
  }
  @include media('<tablet-l') {
    width: calc(100% - #{grid(10)});
    height: calc(100% - #{grid(10)});
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
    width: calc(100% - #{grid(15)});
    height: calc(100% - #{grid(15)});
    @media (orientation: landscape) {
      width: calc(100% - #{grid(10)});
      height: calc(100% - #{grid(10)});
      padding: grid(5);
    }
  }
  @include media('<phone') {
  }
}

.header-menu-mobile-box {
  margin-left: -1vw;
  margin-top: -1vw;
  position: relative;

  @include media('<=tablet-l') {
    padding: grid(5);
  }
  @include media('<tablet-l') {
    padding: grid(6);
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
    margin-left: 0;
    margin-top: 0;
    padding: grid(5);
    @media (orientation: landscape) {
      padding: grid(3);
    }
  }
  @include media('<phone') {
  }
}

.header-menu-mobile-overlay-logo {
  position: fixed;
  width: 44px;
  fill: var(--bg-color);
  margin-top: -0.2vw;
  transition: fill 0.1s;
  top: grid(2);
  right: grid(2);

  @include media('<=tablet-l') {
    top: grid(8);
    right: grid(8);
    margin-top: -0.2vw;
  }
  @include media('<tablet-l') {
    top: grid(10);
    right: grid(10);
    margin-top: -0.2vw;
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
      top: grid(10);
      right: grid(10);
      margin-top: -0.2vw;
      margin-right: -0.2vw;
    }
  }
  @include media('<tablet') {
    width: 40px;
    top: grid(12);
    right: grid(12);
    margin-top: 0;
    margin-right: 0;
    @media (orientation: landscape) {
      margin-top: 0;
      margin-right: 0;
      top: grid(8);
      right: grid(8);
      margin-top: 0;
      margin-right: 0;
    }
  }
}

.mobile-nav-active {
  display: block;
}

.smv-hamburger-icon {
  position: relative;
  left: 0;
  top: 0;
  width: 27px;
  stroke: var(--main-color);
}
</style>
