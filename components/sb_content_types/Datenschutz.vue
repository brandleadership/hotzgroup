<script>
import SbRichText from '@/components/SbRichText.vue'
import Logo from '../Logo.vue'

export default {
  props: ['pagecontent'],
  components: {
    SbRichText,
    Logo,
  },

  data() {
    return {}
  },
  methods: {},

  mounted: function() {},
}
</script>

<template>
  <div class="datenschutz js-transition transition">
    <div class="datenschutz-logo-box">
      <Logo></Logo>
    </div>
    <div class="datenschutz-flexbox">
      <span class="datenschutz-hl">{{ pagecontent.text_headline }}</span>
      <SbRichText
        class="datenschutz-text"
        :richTextParams="pagecontent.text_content"
      />
    </div>
  </div>
</template>

<style lang="scss">
@import '@/styles/tools.scss';

.datenschutz {
  @include megapadding;
  background-color: var(--bg-color);
  min-height: 100vh;
  color: var(--main-color);
}
.datenschutz-logo-box {
  margin-bottom: 10vw;
  @include media('<tablet') {
    margin-top: 10vw;
  }
}
.datenschutz-flexbox {
  display: flex;
  align-items: flex-start;
  @include media('<tablet-l') {
    flex-direction: column;
  }
}
.datenschutz-hl {
  display: block;
  position: sticky;
  top: grid(7);
  @include main-font;
  font-size: getVw(60px);
  line-height: 1em;
  width: grid(32);
  padding-right: grid(10);
  box-sizing: border-box;
  flex-shrink: 0;
  // text-indent: grid(10);
  @include media('<=tablet-l') {
    font-size: 40px;
  }
  @include media('<tablet-l') {
    position: relative;
    top: 0;
    font-size: 50px;
    width: 70%;
    margin-bottom: 80px;
  }
  @include media('<tablet') {
    font-size: 40px;
    width: 100%;
    margin-top: 20px;
  }
}

.datenschutz-text {
  @include regular-font;
  line-height: 1.8em;
  position: relative;
  display: block;
  // padding-bottom: 3.3vw;
  margin-top: -155px;
  p {
    margin: 30px 0;
  }
  p:first-of-type {
    margin: 0;
  }
  p:last-of-type {
    margin-bottom: 0;
  }

  @include media('<tablet') {
    line-height: 1.6em;
    margin-top: -95px;
  }
}

.datenschutz-headline-xxl {
  @include main-font;
  position: relative;
  display: block;
  line-height: 1em;
  font-size: getVw(40px);
  margin-top: 160px;
  @include media('<=tablet-l') {
    font-size: 40px;
  }
  @include media('<tablet-l') {
    font-size: 30px;
  }

  @include media('<tablet') {
    margin-top: 100px;
  }
}

.datenschutz-headline {
  @include main-font;
  position: relative;
  display: block;
  // line-height: 0.9em;
  margin-top: 3vw;
  margin-bottom: 40px;
  letter-spacing: 0.05em;
  @include media('<=tablet-l') {
    margin-top: 60px;
  }
}
</style>
