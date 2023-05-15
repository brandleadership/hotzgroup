<script>
import { gsap } from 'gsap'
import {
  find,
  hasClass,
  isTouchDevice,
  onFontLoaded,
} from '~/scripts/elements.js'
import imagesLoaded from 'imagesloaded'
import AnsatzHaltungItem from '@/components/AnsatzHaltungItem.vue'

export default {
  name: 'Haltung',
  props: ['sectioncontent'],
  components: { AnsatzHaltungItem },

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
  <section class="haltung" id="haltung">
    <AnsatzHaltungItem
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
  @include sidepadding('padding');
}
</style>
