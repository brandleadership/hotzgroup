<script>
import { gsap, Power2, Power3, Power0 } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'

import {
  find,
  hasClass,
  isTouchDevice,
  onFontLoaded,
} from '~/scripts/elements.js'
import imagesLoaded from 'imagesloaded'
import { addListener, removeListener } from '~/scripts/events'

export default {
  name: 'RunningText',
  props: ['text', 'type', 'amount', 'speed', 'onlyInVp', 'inverse', 'stopped'],
  components: {},

  data() {
    //andere schreibweise für function() {
    return {
      stopIt: false,
    }
  },
  methods: {
    runningTextAnim: function (speed) {
      const line1 = find('.js-runningtext-l1', this.$el)[0]
      const line2 = find('.js-runningtext-l2', this.$el)[0]
      const word = find('.runningtext-word', this.$el)[0]
      const wordW = word.getBoundingClientRect().width
      const wordH = word.getBoundingClientRect().height
      const normalizerRatioH = wordH / wordW
      const normalizerRatioV = wordH / wordW
      const normalizerH = speed / normalizerRatioH
      const normalizerV = speed / normalizerRatioV
      let distance = '-100%'

      if (this.inverse) {
        distance = '100%'
      }

      if (this.hlLineAnimTl) {
        this.hlLineAnimTl.kill(0)
      }
      if (this.type === 'vertical') {
        this.hlLineAnimTl = gsap
          .timeline({ paused: true, repeat: -1 })
          .to(
            line1,
            { duration: normalizerV, y: distance, ease: Power0.easeNone },
            0
          )
          .to(
            line2,
            { duration: normalizerV, y: distance, ease: Power0.easeNone },
            0
          )
      } else {
        this.hlLineAnimTl = gsap
          .timeline({ paused: true, repeat: -1 })
          .to(
            line1,
            { duration: normalizerH, x: distance, ease: Power0.easeNone },
            0
          )
          .to(
            line2,
            { duration: normalizerH, x: distance, ease: Power0.easeNone },
            0
          )
      }
    },

    stopLoop: function () {
      const box = find('.runningtext', this.$el)[0]

      ScrollTrigger.create({
        onEnter: () => {
          if (!this.stopped) {
            this.hlLineAnimTl.play()
          }
        },
        onLeave: () => {
          this.hlLineAnimTl.pause()
        },
        onEnterBack: () => {
          if (!this.stopped) {
            this.hlLineAnimTl.play()
          }
        },
        onLeaveBack: () => {
          this.hlLineAnimTl.pause()
        },

        trigger: box,
        start: 'top bottom',
        end: 'bottom top',
        // markers: 'true',
      })
    },

    createWords: function (amount) {
      const linesContainer = find('.js-runningtext-l1', this.$el)[0]
      const linesContainer2 = find('.js-runningtext-l2', this.$el)[0]
      let count = 0
      const content = this.text

      while (count < amount) {
        count = count + 1
        var span = document.createElement('span')
        var span2 = document.createElement('span')
        span.className = 'runningtext-word'
        span2.className = 'runningtext-word'
        linesContainer.appendChild(span)
        span.textContent = content
        linesContainer2.appendChild(span2)
        span2.textContent = content
      }
    },
  },
  watch: {
    stopped: function () {
      // `this` points to the vm instance
      this.stopIt = this.stopped
      if (this.stopped) {
        this.hlLineAnimTl.pause()
      } else {
        this.hlLineAnimTl.play()
      }
    },
  },
  mounted: function () {
    this.createWords(this.amount)
    this.runningTextAnim(this.speed)

    const elements = find('img')

    imagesLoaded(elements, () => {
      if (!this.manualStart) {
        if (this.onlyInVp) {
          this.stopLoop()
        } else {
          this.hlLineAnimTl.play()
        }
        if (this.stopped) {
          this.hlLineAnimTl.pause()
        }
      }
    })

    // onFontLoaded(() => {
    //   this.$nextTick(() => {
    //     if (isTouchDevice() == false) {
    //       addListener(window, 'resize', this.onResize)
    //     } else {
    //       window.addEventListener('orientationchange', () => {
    //         var afterOrientationChange = () => {
    //           this.onResize()
    //           window.removeEventListener('resize', afterOrientationChange)
    //         }
    //         window.addEventListener('resize', afterOrientationChange)
    //       })
    //     }
    //   })
    // })
  },

  // beforeDestroy: function () {
  //   // this.spatzekscroll.destroy()
  //   removeListener(window, 'resize', this.onResize)
  //   removeListener(window, 'orientationchange', this.onResize)
  // },
}
</script>




<template>
  <div
    class="runningtext-bufferdiv"
    v-bind:class="{ vertical: type == 'vertical', inverse: inverse == true }"
  >
    <div class="js-runningtext runningtext">
      <div class="js-runningtext-l1 runningtext-l1"></div>
      <div class="js-runningtext-l2 runningtext-l2"></div>
    </div>
  </div>
</template>



<style lang="scss">
@import '@/styles/tools.scss';

.runningtext-bufferdiv {
  width: 100%;
  height: 100%;
}

//HORIZONTAL
.runningtext {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
}
.runningtext-l1,
.runningtext-l2 {
  display: inline-block;
  flex-wrap: nowrap;
  display: inline-flex;
  align-items: center;
  flex-direction: row;
  line-height: 1em;
}
.runningtext-word {
  text-transform: uppercase;
  margin-right: 1.5vw;
  display: inline-block;
  white-space: nowrap;
  position: relative;
  @include media('<tablet') {
    margin-right: 15px;
  }
}

//VERTICAL
.vertical {
  .runningtext {
    writing-mode: vertical-lr;
    height: 100%;
  }
  .runningtext-word {
    margin: 0;
    margin-bottom: 1.5vw;
    @include media('<tablet') {
      margin-bottom: 15px;
    }
  }
}

//INVERSE
.inverse {
  .runningtext {
    display: flex;
    justify-content: flex-end;
  }

  .runningtext-word {
    margin: 0;
    margin-right: 1.5vw;
    @include media('<tablet') {
      margin-right: 15px;
    }
  }
}

//VERTICAL+INVERSE
.vertical.inverse {
  .runningtext {
    display: flex;
    justify-content: flex-end;
  }
  .runningtext-word {
    margin: 0;
    margin-bottom: 1.5vw;
    @include media('<tablet') {
      margin-bottom: 15px;
    }
  }
}
</style>
