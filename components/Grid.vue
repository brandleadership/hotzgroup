<script>
import { gsap } from 'gsap'
import {
  find,
  hasClass,
  isTouchDevice,
  onFontLoaded,
} from '~/scripts/elements.js'
import imagesLoaded from 'imagesloaded'
import { addListener } from '~/scripts/events.js'

export default {
  name: 'Grid',
  components: {},

  data() {
    //andere schreibweise für function() {
    return {
      show: false,
    }
  },
  methods: {
    onKeyPress: function (evt) {
      if (evt.keyCode === 71 && evt.altKey) {
        this.show = !this.show
      }
    },

    onResize: function () {
      this.createLines()
    },

    createLines: function () {
      const linesContainer = find('.grid')[0]
      const vpWidth = window.innerWidth
      let count = 0

      // while (linesContainerH < vpHeight) {
      while (count < 97) {
        count = count + 1
        var div = document.createElement('div')
        div.className = 'grid-line'
        linesContainer.appendChild(div)
      }
    },
  },

  mounted: function () {
    //TEST
    this.createLines()
    addListener(window, 'keydown', this.onKeyPress)
  },
}
</script>

<template>
  <div class="grid" v-bind:class="{ invis: !show }"></div>
</template>

<style lang="scss">
@import '@/styles/tools.scss';

.grid {
  // display: none;
  position: fixed;
  display: flex;
  top: 0;
  left: -1px;
  pointer-events: none;
  position: fixed;
  justify-content: space-between;
  height: 100%;
  width: calc(100% + 2px);
  z-index: $z-sun;
}

.grid-line {
  // position: absolute;
  background-color: var(--main-color);
  height: 100%;
  width: 1px;
  opacity: 0.2;
}

.invis {
  opacity: 0;
}
</style>
