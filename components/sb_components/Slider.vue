<script>
import { gsap, Power2, Linear } from 'gsap'
import { find, hasClass, isTouchDevice } from '~/scripts/elements.js'
import Sbimage from '@/components/Sbimage.vue'
import SbLink from '@/components/SbLink.vue'
import SbRichText from '@/components/SbRichText.vue'
import SbTextArea from '@/components/SbTextArea.vue'
import ObjectFitImage from '@/components/ObjectFitImage.vue'
import { Hooper, Slide, Pagination as HooperPagination } from 'hooper'
// import { ScrollTrigger } from 'gsap/ScrollTrigger.js'

import { addListener, removeListener } from '~/scripts/events'

export default {
  props: ['pagecontent'],
  components: {
    Sbimage,
    SbRichText,
    SbTextArea,
    ObjectFitImage,
    Hooper,
    Slide,
    HooperPagination,
    SbLink,
  },

  data() {
    //andere schreibweise für function() {
    return {
      pointerNone: false,
      lineCount: null,
      currentIndex: 0,

      hooperSettings: {
        itemsToShow: 1,
        infiniteScroll: true,
        transition: 500,
        wheelControl: false,
      },
      hooperSettings2: {
        itemsToShow: 1,
        centerMode: true,
        infiniteScroll: true,
        transition: 500,
        wheelControl: false,
        mouseDrag: false,
        touchDrag: false,
      },
    }
  },
  methods: {
    // onResize: function() {
    // },

    slideNext() {
      this.$refs.hooperduper.slideNext()
    },
    slidePrev() {
      this.$refs.hooperduper.slidePrev()
    },

    onSlideClick: function(slug) {
      if (!this.$refs.hooperduper.isSliding) {
        this.$router.push({
          path: '/' + slug,
        })
      }
    },

    modifyPagination: function() {
      const pagination = find('.slider-hooper-pagination', this.$refs.slider)[0]
      pagination.children[1].innerHTML = '&nbsp;' + '|' + '&nbsp;'
    },

    //ON DRAG EXTRA ANIMATION:
    // onDrag: function() {
    //   this.sliderItem = find(
    //     '.slider-hooper-item-container.is-prev, .slider-hooper-item-container.is-active, .slider-hooper-item-container.is-next',
    //     this.$refs.slider
    //   )

    //   this.pointerNone = true
    //   this.onDragTl = gsap
    //     .timeline()
    //     .fromTo(
    //       this.sliderItem,
    //       { scale: 1 },
    //       { duration: 0.5, scale: 0.9, ease: Power2.easeOut },
    //       0
    //     )
    // },

    // offDrag: function() {
    //   this.pointerNone = false
    //   this.offDragTl = gsap
    //     .timeline()
    //     .to(
    //       this.sliderItem,
    //       { duration: 0.5, scale: 1, ease: Power2.easeOut },
    //       0
    //     )
    // },

    beforeSlide: function(event) {
      // this.hooperText = find('.slider-hooper-mask-hooper2', this.$refs.slider)[0]
      // this.isnext = find('.is-next', this.hooperText)[0]
      // this.isprev = find('.is-prev', this.hooperText)[0]
      // this.subWords = find('.slider-hooper-teaser-text', this.$refs.slider)
      // this.info = find('.slider-hooper-item-subline', this.hooperText)

      const pagination = find('.slider-hooper-pagination', this.$refs.slider)[0]
      const currentPage = parseInt(pagination.children[0].innerHTML)
      const pageAmount = parseInt(pagination.children[2].innerHTML)

      this.conti = find('.hooper-slide', this.hooperText)[pageAmount]
      this.contiReverse = find('.hooper-slide', this.hooperText)[
        pageAmount + pageAmount - 1
      ]

      if (currentPage === pageAmount && event.currentSlide > event.slideFrom) {
        this.name = find('.char', this.conti)
        // this.subWords = find('.slider-hooper-teaser-text')
      } else if (currentPage === 1 && event.currentSlide < event.slideFrom) {
        this.name = find('.char', this.contiReverse)
      } else if (event.currentSlide > event.slideFrom) {
        this.name = find('.char', this.isnext)
        // this.subWords = find('.slider-hooper-teaser-text')
      } else if (event.currentSlide < event.slideFrom) {
        this.name = find('.char', this.isprev)
      }

      //CUSTOM ANIMATION ON SLIDE:
      // this.onSlideTl = gsap
      //   .timeline()
      //   .fromTo(
      //     this.name,
      //     { opacity: 0, x: 100 },
      //     { duration: 0.5, stagger: 0.05, opacity: 1, x: 0, ease: Power2.easeOut },
      //     0
      //   )
      //   .fromTo(this.info, { opacity: 0, y: 40 }, { duration: 0.5, opacity: 1, y: 0, ease: Power2.easeOut }, '>-0.3')
      //   .fromTo(this.subWords, { opacity: 0, x: 100 }, { duration: 0.5, x: 0, opacity: 1, ease: Power2.easeOut }, 0)

      this.currentIndex = currentPage
    },
    // hoverName: function(event) {
    //   this.hooper1 = find('.hooper1', this.$el)[0]
    //   this.itemHooper1 = find('.is-current', this.hooper1)[0]
    //   this.img = find('.slider-item-image', this.itemHooper1)[0]

    //   this.hoverIconTl = gsap
    //     .timeline()
    //     .to(this.img, { duration: 0.5, scale: 1.2, ease: Power2.easeOut }, 0)
    // },
    // deHoverName: function() {
    //   this.deHoverIconTl = gsap
    //     .timeline()
    //     .to(this.img, { duration: 0.5, scale: 1, ease: Power2.easeOut }, 0)
    // },
  },

  mounted: function() {
    this.modifyPagination()
    // this.splitTextHeadline()
    // this.hlLineAnimation()

    // this.hooper = find('.hooper1', this.$refs.slider)[0]

    if (isTouchDevice() == false) {
      // addListener(this.hooper, 'mousedown', this.onDrag)
      // addListener(this.hooper, 'mouseup', this.offDrag)
      // addListener(window, 'mouseup', this.offDrag)
    } else {
      // addListener(this.hooper, 'touchstart', this.onDrag)
      // addListener(this.hooper, 'touchend', this.offDrag)
      window.addEventListener('orientationchange', () => {
        var afterOrientationChange = () => {
          this.onResize()
          window.removeEventListener('resize', afterOrientationChange)
        }
        window.addEventListener('resize', afterOrientationChange)
      })
    }
  },

  beforeDestroy: function() {
    // removeListener(this.hooper, 'mousedown', this.onDrag)
    // removeListener(this.hooper, 'mouseup', this.offDrag)
    // removeListener(this.hooper, 'touchstart', this.onDrag)
    // removeListener(this.hooper, 'touchend', this.offDrag)
    // removeListener(window, 'mouseup', this.offDrag)
    removeListener(window, 'orientationchange', this.onResize)
  },
}
</script>

<template>
  <div class="slider" ref="slider">
    <h2 class="slider-headline">{{ pagecontent.slider_headline }}</h2>

    <div class="slider-hooper">
      <div class="slider-hooper-mask-hooper">
        <hooper
          class="hooper1"
          :group="'group1'"
          ref="hooperduper"
          :settings="hooperSettings"
          @slide="beforeSlide"
        >
          <slide
            :key="key"
            v-for="(entry, key) in pagecontent.team"
            class="slider-hooper-item-container"
          >
            <div class="slider-hooper-item" :class="{ dragging: pointerNone }">
              <div
                class="slider-item-image-container"
                :class="{ dragging: pointerNone }"
              >
                <Sbimage
                  class="slider-item-image"
                  :class="{ dragging: pointerNone }"
                  :imgParams="{
                    src: entry.image,
                    width: 500,
                    height: 500,
                    bp: {
                      1920: { width: 500 },
                    },
                  }"
                />
              </div>
            </div>
          </slide>
        </hooper>
      </div>
      <div class="slider-hooper-mask-hooper2">
        <hooper
          class="hooper2"
          :group="'group1'"
          ref="hooperduper"
          :settings="hooperSettings2"
        >
          <slide :key="key" v-for="(entry, key) in pagecontent.team">
            <span class="slider-hooper-item-maintext">{{
              entry.text_prename
            }}</span>

            <span class="slider-hooper-item-subline">{{
              entry.text_surname
            }}</span>
          </slide>
        </hooper>
      </div>
    </div>

    <div class="slider-hooper-nav-box">
      <hooper
        :group="'group1'"
        ref="hooperduper"
        class="hooper3"
        :settings="hooperSettings2"
      >
        <slide :key="key" v-for="(entry, key) in pagecontent.team">
          <span class="slider-hooper-teaser-text">
            <span>{{ entry.text_prename }}</span>
          </span>
        </slide>

        <hooper-pagination
          class="slider-hooper-pagination"
          slot="hooper-addons"
          mode="fraction"
        ></hooper-pagination>
      </hooper>
      <svg
        @click.prevent="slidePrev"
        class="slider-prev"
        xmlns="http://www.w3.org/2000/svg"
        width="51.22"
        height="44.597"
        viewBox="0 0 51.22 44.597"
      >
        <g transform="translate(-1839.5 -1991.181)">
          <line
            x2="49"
            transform="translate(1839.5 2013.5)"
            fill="none"
            stroke="#000"
            stroke-width="2"
          />
          <path
            d="M8044,1988l21.591,21.591L8044,2031.183"
            transform="translate(-6176.286 3.889)"
            fill="none"
            stroke="#000"
            stroke-width="2"
          />
        </g>
      </svg>
      <svg
        @click.prevent="slideNext"
        class="slider-next"
        xmlns="http://www.w3.org/2000/svg"
        width="51.22"
        height="44.597"
        viewBox="0 0 51.22 44.597"
      >
        <g transform="translate(-1839.5 -1991.181)">
          <line
            x2="49"
            transform="translate(1839.5 2013.5)"
            fill="none"
            stroke="#000"
            stroke-width="2"
          />
          <path
            d="M8044,1988l21.591,21.591L8044,2031.183"
            transform="translate(-6176.286 3.889)"
            fill="none"
            stroke="#000"
            stroke-width="2"
          />
        </g>
      </svg>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/styles/tools.scss';

.slider {
  position: relative;
  display: block;
  margin-top: 100px;
  margin-bottom: 100px;

  .hooper-slide {
    position: relative !important;
  }
}

.slider-headline {
  font-size: getVw(80px);
  line-height: 1em;
  margin-bottom: 20px;
  text-transform: uppercase;
}

.slider-hooper {
  display: flex;
  position: relative;
  width: 500px;
  height: 500px;
  align-items: center;
}

.slider-hooper-item-container {
  position: relative;
  transition: opacity 0.5s;
  a {
    cursor: move; /* fallback if grab cursor is unsupported */
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
  }
}

.storydragging {
  cursor: grabbing !important;
  cursor: -moz-grabbing !important;
  cursor: -webkit-grabbing !important;
}

.slider-item-image {
  width: 100%;
  height: 100%;
  transition: opacity 0.5s;
  cursor: move; /* fallback if grab cursor is unsupported */
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
}
.is-next {
  .slider-item-image {
    // opacity: 0.25;
  }
  .slider-hooper-teaser-text {
    opacity: 0;
  }
}
.slider {
  .hooper-slide img,
  .hooper-slide .char {
    display: none;
  }
  .is-prev img,
  .is-next img,
  .is-current img {
    display: block !important;
  }

  .hooper-slide .char {
    display: inline-block !important;
  }

  .hooper-track {
    will-change: transform;
  }
}

.slider-hooper-item {
  display: flex;
  align-items: center;
}

.slider-item-image-container {
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.slider-hooper-mask-hooper {
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.slider-hooper-mask-hooper2 {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  left: 110%;
  pointer-events: none;
}

.slider-hooper-item-maintext {
  @include sec-font;
  font-size: getVw(30px);
  position: relative;
  flex-shrink: 0;
  display: inline-block;
  margin-left: calc(#{grid(0)} + #{gaps(2)});
  pointer-events: all;
  cursor: pointer;
  transition: 0.3s color;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover {
    color: var(--brand-color);
  }

  .char {
    display: inline-block;
  }
}

.slider-hooper-item-subline {
  font-size: getVw(20px);
  position: absolute;
  display: block;
  flex-shrink: 0;
  width: calc(100% - #{gaps(3)});
  margin-left: calc(#{grid(0)} + #{gaps(2)});
  margin-top: 18px;
}

.slider-hooper-nav-box-hooper {
  width: calc(#{grid(2)} + #{gaps(1)});
}
.slider-hooper-teaser-text {
  text-align: center;
  width: 100%;
  @include sec-font;
  color: var(--main-color);
  text-indent: 1.6em;
  @include abstand40('padding-top');
  // margin-top: -5px;
  position: relative;
  display: inline-block;
  width: calc(#{grid(2)} + #{gaps(1)});
  // transition: opacity 0.5s;
  p {
    text-indent: 1.6em;
    .red-text {
      text-indent: 0em;
    }
    .word {
      text-indent: 0em;
    }
  }
}

.slider-hooper-teaser-read-more-box p:last-of-type:after {
  content: '... read more';
  color: var(--brand-color);
  display: inline;
  margin-left: 5px;
  white-space: nowrap;
}

.hooper1 {
  margin-left: 1px;
  height: 100% !important;
  width: 100% !important;
}
.hooper2 {
  margin-left: 1px;
  height: auto !important;
  width: calc(#{grid(5)} + #{gaps(5)}) !important;
}
.hooper3 {
  overflow: hidden;
  height: auto !important;
}
.hooper-list {
  overflow: unset !important;
}
.slider-hooper-pagination {
  @include sec-font;
  color: var(--main-color);
  font-size: 30px;
  position: absolute;
  right: 0 !important;
  transform: translate(0, 0) !important;
  top: 0 !important;
  @include abstand40('margin-top');
  padding: 0 !important;

  // span:first-of-type {
  //   color: var(--brand-color);
  // }
}

.slider-prev {
  bottom: 0;
  left: 0;
  transform: rotate(180deg);
  position: absolute;
  align-self: center;
  fill: none;
  width: grid(2);
  height: auto;
  padding-top: 3px;
  transition: 0.2s stroke;
  cursor: pointer;
  pointer-events: all;
  line,
  path {
    transition: 0.2s stroke;
  }
  &:hover {
    line {
      stroke: var(--main-color);
    }
    path {
      stroke: var(--main-color);
    }
  }
}

.slider-next {
  bottom: 0;
  right: 150px;
  position: absolute;
  align-self: center;
  fill: none;
  width: grid(2);
  height: auto;
  padding-top: 3px;
  transition: 0.2s stroke;
  cursor: pointer;
  pointer-events: all;
  line,
  path {
    transition: 0.2s stroke;
  }
  &:hover {
    line {
      stroke: var(--main-color);
    }
    path {
      stroke: var(--main-color);
    }
  }
}

.dragging {
  cursor: grabbing !important;
  cursor: -moz-grabbing !important;
  cursor: -webkit-grabbing !important;
}
</style>
