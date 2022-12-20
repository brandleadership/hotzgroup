<script>
import { gsap } from 'gsap'
import {
  find,
  hasClass,
  isTouchDevice,
  onFontLoaded,
} from '~/scripts/elements.js'
import imagesLoaded from 'imagesloaded'
import HaltungItem from '@/components/HaltungItem.vue'

export default {
  name: 'Haltung',
  props: ['sectioncontent'],
  components: { HaltungItem },

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
  <section class="haltung">
    <HaltungItem
      v-for="(haltungitem, key) in sectioncontent"
      :key="key"
      :number="key"
      :amount="sectioncontent.length"
      :haltungitem="haltungitem"
    />
  </section>
</template>



<style lang="scss" scoped="true">
@import '@/styles/tools.scss';

.haltung {
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
