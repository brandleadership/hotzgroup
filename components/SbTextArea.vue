<script>
export default {
  name: 'SbTextArea',
  components: {},
  props: ['value'],

  data() {
    //andere schreibweise für function() {
    return {}
  },
  computed: {
    textHtml: function() {
      if (this.value) {
        return this.nl2br(this.value)
      } else if (this.$slots.default && this.$slots.default[0].text) {
        return this.nl2br(this.$slots.default[0].text)
      } else {
        return ''
        //this.textHtml = ''
      }
    },
  },
  watch: {
    value: function(val) {
      if (this.$parent.onUpdateChild !== undefined) this.$parent.onUpdateChild()
      //this.updateText()
    },
  },

  methods: {
    /* updateHtml: function() {
      if (this.value) {
        this.textHtml = this.nl2br(this.$slots.default[0].text)
      } else {
        this.textHtml = ''
      }
    }, */
    nl2br: function(str, is_xhtml) {
      return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br />' + '$2')
    },
  },
  mounted: function() {
    //this.updateHtml()
  },
}
</script>


<template>
  <span v-html="textHtml"></span>
</template>
