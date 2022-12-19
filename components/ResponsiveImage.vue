<script>
export default {
  name: 'ResponsiveImage',
  components: {},
  props: {
    src: {
      type: Object,
      required: true,
    },
    lazy: {
      type: Boolean,
    },
  },

  computed: {
    srcset() {
      if (!this.src.sizes) return ''

      const srcset1 = `${this.src.sizes.posterDetail} ${
        this.src.sizes['posterDetail-width']
      }w`
      const srcset2 = `${this.src.sizes.posterOverview} ${
        this.src.sizes['posterOverview-width']
      }w`

      return srcset1 + ', ' + srcset2
    },
  },
}
</script>
<template>
  <img v-if="!lazy" :src="this.src.url" :alt="this.src.alt" :srcset="srcset" />
  <img
    v-else-if="lazy"
    :data-src="this.src.url"
    :alt="this.src.alt"
    :data-srcset="this.srcset"
    class="js-lazy-img"
  />
</template>
