<script>
import { gsap } from 'gsap'
import {
  find,
  hasClass,
  isTouchDevice,
  onFontLoaded,
} from '~/scripts/elements.js'
import imagesLoaded from 'imagesloaded'

export default {
  name: 'Vorlage',
  components: {},

  data() {
    //andere schreibweise für function() {
    return {}
  },
  methods: {},

  mounted: function() {
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
  <section class="vorlage"></section>
</template>



<style lang="scss" scoped="true">
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
}
</style>
