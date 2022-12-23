<script>
import { gsap, Power0, Power2, Linear } from 'gsap'
import { find } from '~/scripts/elements.js'
import { mapState } from 'vuex'
import Logo from '@/components/Logo.vue'

export default {
  name: 'Loading',
  components: {
    Logo,
  },

  data: () => ({
    introAnimFinished: false,
    hidePlayed: false,
    interval: null,
  }),

  computed: {
    ...mapState(['isLoading']),
  },

  watch: {
    isLoading(newValue, oldValue) {
      if (newValue) {
        this.show().play()
      } else {
        this.show().progress(1)
        this.checkIfDoneRecursive()
      }
    },
  },

  methods: {
    checkIfDoneRecursive: function () {
      this.interval = setInterval(() => {
        if (this.introAnimFinished && !this.hidePlayed) {
          this.hide()
          this.hidePlayed = true
        }
      }, 50)
    },

    show: function () {
      const loading = find('.initloading-container')

      if (this.showTl) {
        this.showTl.kill(0)
      }

      this.showTl = gsap
        .timeline({ paused: true })
        .set(loading, { display: 'flex' }, 0)

      return this.showTl
    },

    toggleWords: function () {
      const word1 = find('.introloading-word')[0]
      const word2 = find('.introloading-word')[1]
      const word3 = find('.introloading-word')[2]
      // const sentence = find('.introloading-sentence')
      const subbox = find('.introloading-sub-box')

      if (this.toggleWordsTl) {
        this.toggleWordsTl.kill(0)
      }

      const switchTime = 0.3
      const ivTime = 0.05

      this.toggleWordsTl = gsap
        .timeline({
          paused: true,
          repeat: -1,
        })

        .set(word1, { opacity: 1 }, 0)
        .set(word1, { opacity: 0 }, '<' + switchTime)
        .set(word2, { opacity: 1 })
        .set(word2, { opacity: 0 }, '<' + switchTime)
        .set(word3, { opacity: 1 })
        .set(word3, { opacity: 0 }, '<' + switchTime)
        // .set(word4, { opacity: 1 })
        // .set(word4, { opacity: 0 }, '<' + switchTime)
        // .set(word5, { opacity: 1 })
        // .set(word5, { opacity: 0 }, '<' + switchTime)
        // .set(word6, { opacity: 1 })
        // .set(word6, { opacity: 0 }, '<' + switchTime)
        .set(subbox, { opacity: 1 })
      // .set(sentence, { opacity: 1 })

      return this.toggleWordsTl
    },

    hide: function () {
      const loading = find('.initloading-container')
      const line = find('.initloading-line')
      const bg = find('.initloading-bg')

      const stuff = find('.introloading-words-box')[0]

      const time = 1

      if (this.hideTl) {
        this.hideTl.kill(0)
      }

      this.hideTl = gsap
        .timeline({
          // paused: true,
          delay: 0.2,
          onComplete: () => {
            clearInterval(this.interval)
          },
        })

        .fromTo(
          stuff,
          { opacity: 1 },
          {
            duration: 0.3,
            opacity: 0,
            ease: Power0.easeNone,
          },
          1
        )
        .fromTo(
          bg,
          { scaleY: 1 },
          {
            scaleY: 0,
            duration: 0.6,
            ease: Power2.easeOut,
            transformOrigin: 'top',
          },
          1.3
        )
        .set(loading, { display: 'none' })
    },
  },
  mounted: function () {
    setTimeout(() => {
      this.toggleWords().play()
      setTimeout(() => {
        this.introAnimFinished = true
      }, 800)
    }, 500)
  },
}
</script>

<template>
  <div class="initloading-container">
    <div class="initloading-box">
      <div class="initloading-bg"></div>
      <div class="introloading-words-box">
        <span class="introloading-word">Marken entwickeln</span>
        <span class="introloading-word">Unternehmen bauen</span>
        <span class="introloading-word">Entscheide ermöglichen</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/styles/tools.scss';

.initloading-container {
  display: block;
  z-index: $z-galaxy;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;

  @include media('<tablet-l') {
    left: 0;
    width: 100%;
  }

  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }

  @include media('<tablet') {
  }

  @include media('<=phone') {
  }
}

.initloading-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  // opacity: 0;
}

.initloading-bg {
  position: relative;
  display: block;
  width: 100vw;
  height: 100%;
  background-color: var(--main-color);
}

.introloading-words-box {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100%;
}
.introloading-word {
  @include main-font;
  display: block;
  position: absolute;
  line-height: 1em;
  font-size: getVw(50px);
  text-transform: uppercase;
  opacity: 0;
  color: $sec-color;
}
</style>
