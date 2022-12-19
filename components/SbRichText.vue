<script>
export default {
  name: 'SbRichText',
  components: {},
  props: ['richTextParams'],

  data() {
    //andere schreibweise für function() {
    return {}
  },
  computed: {
    richtext: function() {
      if (this.richTextParams) {
        return this.$storyapi.richTextResolver.render(this.richTextParams)
      } else {
        //console.error('SbRichText: richTextParams not set')
        return ''
      }
    },
  },
}
</script>


<template>
  <span v-html="richtext"></span>
</template>
