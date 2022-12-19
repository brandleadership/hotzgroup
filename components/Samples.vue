<script>
import { gsap, Power2, Linear } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'

import {
  find,
  hasClass,
  isTouchDevice,
  onFontLoaded,
} from '~/scripts/elements.js'
import { addListener, removeListener } from '~/scripts/events'
import { mapGetters } from 'vuex' // for device detection unten
import SpatzekScroll from '~/scripts/SpatzekScroll'

gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'Vorlage',
  components: {},

  data() {
    //andere schreibweise für function() {
    return {}
  },
  //need for device shit
  computed: {
    ...mapGetters({ device: 'getDevice' }),
  },

  methods: {
    //disable shit for mobile:
    // is_touch_device() {
    //   var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ')
    //   var mq = function(query) {
    //     return window.matchMedia(query).matches
    //   }
    //   if (
    //     'ontouchstart' in window ||
    //     (window.DocumentTouch && document instanceof DocumentTouch)
    //   ) {
    //     return true
    //   }
    //   var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join(
    //     ''
    //   )
    //   return mq(query)
    // },

    getVpSizes: function () {
      this.vpW = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      )
      this.vpH = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      )
    },

    isTouchDeviceAnimationCancel() {
      //check if mobile or touch to return before shit happens
      this.vpW = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      )
      if (isTouchDevice() == true || this.vpW <= 1024) {
        return
      }
      // ...whatever
    },

    // Beispiel für RESIZE OHNE BUBBLING:
    onResize: function () {
      //DESTROY:
      this.spatzekscroll.destroy()
      this.spatzekscroll = SpatzekScroll() //enable SC neu
      this.homeVidAnim() //call animation again
      this.spatzekscroll.initiate() //iniate again
    },
    //GSAP SCROLL GSAP SCROLL GSAP SCROLL GSAP SCROLL GSAP SCROLL GSAP SCROLL GSAP SCROLL GSAP SCROLL
    // NEVER USE MOVING OR STICKY ELEMENTS FOR SCROLTRIGGERS
    // ALWAYS EXECUTE AFTER PICS LOADED
    // DO NOT USE DYNAMIC (ausgerechnete) Werte sondern ERSTELLE HTML TRIGGER
    // FALLS DOCH AUSGERECHNETE WERTE: onRESIZE DESTROY (KILL) DIE TIMELINE und führe scrolltrigger function neu aus

    REPEATED: function () {
      // let letters = gsap.utils.toArray('.home-letter')

      this.animation = function (container) {
        const element = find('.home-letter', container)
        return gsap
          .timeline()
          .fromTo(
            element,
            { x: '100%' },
            { duration: 2, x: '0%', ease: Power2.easeOut },
            0
          )
      }

      let allContainers = find('.home-letter-mask', this.$el)
      allContainers.map((container) => {
        ScrollTrigger.create({
          animation: this.animation(container),
          trigger: container,
          toggleActions: 'restart none resume pause', //onEnter, onLeave, onEnterBack, onLeaveBack
          markers: 'true',
        })
      })
    },

    //SPATZEKSCROLL SPATZEKSCROLL SPATZEKSCROLL SPATZEKSCROLL SPATZEKSCROLL SPATZEKSCROLL SPATZEKSCROLL
    NOTREPEATED: function () {
      const element = find('.element')[0]
      this.Tl = gsap
        .timeline({ repeat: -1 })
        .to(
          icon,
          { duration: 1.6, rotationZ: '360deg', ease: Linear.easeNone },
          0
        )

      this.spatzekscroll.addScene({
        triggerElement: find('.mytrigger')[0],
        hook: 1,
        reTrigger: true,
        tween: this.Tl,
        duration: 1,
      })
    },

    // Beispiel für repeated animation auf gleiche Elemente
    REPEATED: function () {
      this.animation = function (mask) {
        const element = find('.element', mask)

        return gsap
          .timeline({ repeat: -1 })
          .to(
            icon,
            { duration: 1.6, rotationZ: '360deg', ease: Linear.easeNone },
            0
          )
      }

      const allMasks = find('.i-big-text-mask')
      allMasks.map((mask) => {
        this.spatzekscroll.addScene({
          triggerElement: mask,
          hook: 1,
          reTrigger: true,
          tween: this.animation(mask),
          // duration: 1
        })
      })
    },

    calcVidSizes: function () {
      this.screenW = window.innerWidth
      this.screenH = window.innerHeight
      this.boundings = this.vidMask.getBoundingClientRect()

      this.screenRatio = this.screenW / this.screenH
      this.vidRatio = this.boundings.width / this.boundings.height

      this.vidW = this.boundings.width
      this.vidH = this.boundings.height
      this.vidCenterH = this.boundings.top + this.boundings.height / 2
      this.vidDistanceH = this.screenH / 2 - this.vidCenterH

      this.vidCenterW = this.boundings.left + this.boundings.width / 2
      this.vidDistanceW = this.screenW / 2 - this.vidCenterW

      if (this.screenRatio >= this.vidRatio) {
        this.vidScaleAmount = this.screenW / this.boundings.width
        this.vidCounterAmount = this.vidW / this.screenW
      } else {
        this.vidScaleAmount = this.screenH / this.boundings.height
        this.vidCounterAmount = this.vidH / this.screenH
      }
    },

    objectFit: function (image) {
      const parentRatio = this.vpW / this.vpH
      const img_w = image.width
      const img_h = image.height
      const imgRatio = img_w / img_h

      if (parentRatio >= imgRatio) {
        // console.log('1')
        image.width = this.vpW + 1
        image.height = this.vpW / imgRatio + 1

        image._texture.baseTexture.width = this.vpW + 1
        image._texture.baseTexture.height = this.vpW / imgRatio + 1
        image.pivot.x = image.width / 2
        image.pivot.y = image.height / 2
        image.x = this.vpW / 2
        image.y = this.vpH / 2
        // console.log(image.width, this.vpW * imgRatio + 1)
      } else {
        // console.log('2')
        image.width = this.vpH * imgRatio + 1
        image.height = this.vpH + 1

        image._texture.baseTexture.width = this.vpH * imgRatio + 1
        image._texture.baseTexture.height = this.vpH + 1
        image.pivot.x = image.width / 2
        image.pivot.y = image.height / 2
        image.x = this.vpW / 2
        image.y = this.vpH / 2
        // console.log(image, image.width, this.vpH * imgRatio + 1)
      }

      return image
    },

    splitText: function () {
      const splitText = find('.story-name')[0]
      // console.log(splitText)
      if (splitText.hasAttribute('data-originalContent')) {
        splitText.innerHTML = splitText.getAttribute('data-originalContent')
      }
      splitText.setAttribute('data-originalContent', splitText.innerHTML)

      const results = Splitting({
        /* target: String selector, Element, Array of Elements, or NodeList */
        target: splitText,
        // force: true,
        /* by: String of the plugin name */
        by: 'lines',
        /* key: Optional String to prefix the CSS variables */
        key: null,
      })

      for (let index = 0; index < results[0].lines.length; index++) {
        for (
          let indexWords = 0;
          indexWords < results[0].lines[index].length;
          indexWords++
        ) {
          results[0].lines[index][indexWords].classList.add('splitTextMask')
          results[0].lines[index][indexWords].innerHTML =
            '<span class="splitTextElement">' +
            results[0].lines[index][indexWords].innerHTML +
            '</span>' //wrap div around element with class 'splitTextMask'
        }
      }
      // BASE FOR LINE SPLIT ATTEMPT:
      // for (let index = 0; index < results[0].lines.length; index++) {
      //   let wrapper = document.createElement('div')
      //   for (let indexWords = 0; indexWords < results[0].lines[index].length; indexWords++) {
      //     wrapper.appendChild(results[0].lines[index][indexWords])
      //     let whitespace = document.createElement('span')
      //     whitespace.innerHTML = '&nbsp;'
      //     whitespace.classList.add('whitespace')
      //     wrapper.appendChild(whitespace)
      //   }
      //   splitText.appendChild(wrapper)
      // }
    },

    // onFontLoaded(cb) {
    //   if (this.fontsLoaded) return

    //   if (hasClass(document.documentElement, 'wf-active')) {
    //     this.fontsLoaded = true
    //     cb()
    //     return
    //   }

    //   //try again in 100ms
    //   setTimeout(() => {
    //     this.onFontLoaded(cb)
    //   }, 100)
    // },
  },

  mounted: function () {
    //enable spatzekscroll:
    document.fonts.ready.then(() => {
      //NATIVE ALTERNATIVE TO FONTS LOADED
      // onFontLoaded(() => {
      this.$nextTick(() => {
        imagesLoaded(elements, () => {
          // this.spatzekscroll = SpatzekScroll()
          if (isTouchDevice() == false) {
            addListener(window, 'resize', this.onResize)
          } else {
            window.addEventListener('orientationchange', () => {
              var afterOrientationChange = () => {
                this.onResize()
                window.removeEventListener('resize', afterOrientationChange)
              }
              window.addEventListener('resize', afterOrientationChange)
            })
          }
        })
      })
    })
  },

  beforeDestroy: function () {
    // this.spatzekscroll.destroy()
    removeListener(window, 'resize', this.onResize)
    removeListener(window, 'orientationchange', this.onResize)
  },
}
</script>

<template>
  <section class="vorlage"></section>
</template>

<style lang="scss">
@import '@/styles/tools.scss';

.vorlage {
  // position: relative;

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

  @media (pointer: fine) {
    //this is only desktop
  }
  @media (pointer: coarse) {
    //this is only touch
  }
  @media (hover: none) and (pointer: coarse) {
    //this is only HANDY TOUCH
  }
  @media (max-aspect-ratio: 8/8) {
    // ab quadratisch und hochformatiger
    // 8/7 is mehr querformatig
    // 8/9 is mehr hochformatig
  }
}
</style>
