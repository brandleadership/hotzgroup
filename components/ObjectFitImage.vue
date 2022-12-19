<script>
import { gsap } from 'gsap'
import {
  find,
  hasClass,
  isTouchDevice,
  onFontLoaded,
} from '~/scripts/elements.js'
import imagesLoaded from 'imagesloaded'
import { addListener, removeListener } from '~/scripts/events'
import Sbimage from '@/components/Sbimage.vue'

export default {
  name: 'ObjectFitImage',
  components: {
    Sbimage,
  },
  props: [
    'imageSource',
    'imageSourcePortrait',
    'SbimageParams',
    'bp',
    'isVideo',
    'videoSource',
  ],

  data() {
    //andere schreibweise für function() {
    return {
      orientation: 'landscape',
    }
  },

  computed: {
    computedSbimageParams: function () {
      return { ...{ src: this.imageSource }, ...this.SbimageParams }
    },
    computedPortraitSbimageParams: function () {
      return { ...{ src: this.imageSourcePortrait }, ...this.SbimageParams }
    },
  },

  methods: {
    onResize: function () {
      this.updateOrientation()
      this.objectfitPositions()
      this.objectFit()
    },

    updateOrientation: function () {
      if (screen.width >= screen.height) {
        this.orientation = 'landscape'
      } else {
        this.orientation = 'portrait'
      }
    },

    objectfitPositions() {
      const img = find('.object-fit-image', this.$el)[0]

      img.parentNode.setAttribute('data-width', img.parentNode.offsetWidth)
      img.parentNode.setAttribute('data-height', img.parentNode.offsetHeight)
      img.onload = () => {
        img.parentNode.setAttribute('data-width', img.parentNode.offsetWidth)
        img.parentNode.setAttribute('data-height', img.parentNode.offsetHeight)

        this.image_width_orig = img.naturalWidth
        this.image_height_orig = img.naturalHeight

        // this.objectFit()
      }
    },

    objectFit() {
      const img = find('.object-fit-image', this.$el)[0]

      const isImg = img.nodeName.toLowerCase() === 'img'
      const parent = img.parentNode

      const parent_boundings = parent.getBoundingClientRect()

      // let parent_w = parent_boundings.width
      // let parent_h = parent_boundings.height

      let parent_w = img.parentNode.getAttribute('data-width')
      let parent_h = img.parentNode.getAttribute('data-height')

      if (parent_w == null) {
        parent_w = parent_boundings.width
      }
      if (parent_h == null) {
        parent_h = parent_boundings.height
      }

      const parentRatio = parent_w / parent_h

      const img_boundings = img.getBoundingClientRect()
      const img_w = img_boundings.width
      const img_h = img_boundings.height
      let ratio = null
      if (isImg) {
        ratio = img.naturalWidth / img.naturalHeight
      } else {
        ratio = img.videoWidth / img.videoHeight
      }

      if (parentRatio >= ratio) {
        img.style.width = Math.ceil(parent_w) + 1 + 'px'
        img.style.height = Math.ceil(parent_w / ratio) + 1 + 'px'
        img.style.position = 'relative'
        img.style.top = '50%'
        img.style.left = '50%'
        img.style.WebkitTransform = 'translate(-50%,-50%)'
        img.style.msTransform = 'translate(-50%,-50%)'
        img.style.transform = 'translate(-50%,-50%)'
        img.style.maxWidth = 'none'
      } else {
        img.style.width = Math.ceil(parent_h * ratio) + 1 + 'px'
        img.style.height = Math.ceil(parent_h) + 1 + 'px'
        img.style.position = 'relative'
        img.style.top = '50%'
        img.style.left = '50%'
        img.style.WebkitTransform = 'translate(-50%,-50%)'
        img.style.msTransform = 'translate(-50%,-50%)'
        img.style.transform = 'translate(-50%,-50%)'
        img.style.maxWidth = 'none'
      }
    },
  },

  mounted: function () {
    const elements = find('.object-fit-image', this.$el)

    this.$nextTick(() => {
      imagesLoaded(elements, () => {
        this.updateOrientation()
        this.objectfitPositions()
        this.objectFit()
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
  },

  beforeDestroy: function () {
    removeListener(window, 'resize', this.onResize)
    removeListener(window, 'orientationchange', this.onResize)
  },
}
</script>

<template>
  <div class="object-fit-image-scaler" :bla="orientation">
    <video
      v-if="isVideo"
      preload="preload"
      :poster="imageSource"
      muted
      playsinline
      loop
      autoplay
      :class="'js-home-intro-video home-intro-video object-fit-image'"
    >
      <source :src="videoSource.filename" type="video/mp4" />
      <source :src="videoSource.filename" type="video/ogg" />
    </video>

    <Sbimage
      v-if="!isVideo && (!imageSourcePortrait || orientation == 'landscape')"
      :class="'object-fit-image'"
      :imgParams="computedSbimageParams"
      :bp="bp"
    />
    <Sbimage
      v-if="!isVideo && imageSourcePortrait && orientation == 'portrait'"
      :class="'object-fit-image object-fit-image-portrait'"
      :imgParams="computedPortraitSbimageParams"
      :bp="bp"
    />
  </div>
</template>

<style lang="scss">
@import '@/styles/tools.scss';

.object-fit-image-scaler {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
