<script>
import { gsap } from 'gsap'
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
  methods: {},

  mounted: function () {
    const elements = find('img', this.$el)
    onFontLoaded(() => {
      this.$nextTick(() => {
        imagesLoaded(elements, () => {
          setTimeout(() => {
            //do something
          }, 100)
        })
      })
    })
  },
}
</script>




<template>
  <section class="governance">
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
            <div class="gov-brand"
              >BRAND
              <div class="gov-line-vert-right"></div>
            </div>
            <div class="gov-brand"
              >BRAND
              <div class="gov-line-vert-right"></div>
            </div>
            <div class="gov-brand"
              >BRAND
              <div class="gov-line-vert-right"></div>
            </div>
            <div class="gov-brand"
              >BRAND
              <div class="gov-line-vert-right"></div>
            </div>
            <div class="gov-brand">BRAND </div>
          </div>
        </div>
        <div class="gov-centerbox">
          <div class="gov-line-vert-right"></div>
          <div class="gov-categories-box">
            <span class="gov-categories">Do Tank</span>
            <div class="gov-line-hor-bot"></div>
          </div>
          <div class="gov-brands-box">
            <div class="gov-brand">BRAND </div>
          </div>
        </div>
        <div class="gov-rightbox">
          <div class="gov-categories-box">
            <span class="gov-categories">Luxusmarken</span>
            <div class="gov-line-hor-bot"></div>
          </div>
          <div class="gov-brands-box">
            <div class="gov-brand"
              >BRAND
              <div class="gov-line-vert-right"></div>
            </div>
            <div class="gov-brand">BRAND </div>
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
  padding: grid(3) grid(26);
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
  padding: grid(1) grid(1) grid(2);
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
  padding: grid(1) 0;
  box-sizing: border-box;
}
.gov-firstline-box {
  width: calc(100% - #{grid(2)});
  position: absolute;
  bottom: 0;
  left: grid(1);
}
</style>
