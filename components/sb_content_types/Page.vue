<script>
import { gsap, Power2 } from 'gsap'
import {
  find,
  hasClass,
  isTouchDevice,
  onFontLoaded,
} from '~/scripts/elements.js'
import imagesLoaded from 'imagesloaded'

export default {
  props: ['pagecontent'],
  components: {},

  data() {
    return {}
  },
  methods: {},

  mounted: function() {
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
  <div class="page js-transition transition">
    <component
      v-for="(contentitem, key) in pagecontent.body"
      :key="key"
      :contentitem="contentitem"
      :is="contentitem.component"
    ></component>
  </div>
</template>

<style lang="scss">
@import '@/styles/tools.scss';

.page {
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
