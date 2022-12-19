<script>
import Header from '../components/Header.vue'

import SmoothScroll from '~/scripts/SmoothScroll'
import { addListener } from '../scripts/events'

import Grid from '../components/Grid.vue'
import InitialLoading from '../components/InitialLoading.vue'

import Device from '../scripts/device'

export default {
  components: {
    Header,
    Grid,
    InitialLoading,
  },
  data() {
    return {}
  },
  mounted: function () {
    this.setViewportCSSVar()
    addListener(window, 'resize', () => {
      this.setViewportCSSVar()
    })

    // this.smoothscroll = SmoothScroll()

    console.log(
      '%c Made by SPATZEK STUDIO - https://spatzek.studio',
      'background: #000; color: #fff; display: block; padding:5px; padding-right: 10px;'
    )
  },
  methods: {
    setViewportCSSVar() {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    },
  },
}
</script>
<template>
  <div class="site">
    <Grid />
    <InitialLoading />
    <nuxt />
  </div>
</template>

<style lang="scss">
@import '../styles/styles.scss';
</style>
