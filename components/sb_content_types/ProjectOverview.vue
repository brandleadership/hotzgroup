<script>
import { gsap, Power2 } from 'gsap'
import {
  find,
  hasClass,
  isTouchDevice,
  onFontLoaded,
} from '~/scripts/elements.js'
import imagesLoaded from 'imagesloaded'
// import SpatzekScroll from '~/scripts/SpatzekScroll'
import SbTextArea from '@/components/SbTextArea.vue'
import SbRichText from '@/components/SbRichText.vue'
import Sbimage from '@/components/Sbimage.vue'
import SbLink from '@/components/SbLink.vue'
import ProjectOverviewEntry from '@/components/ProjectOverviewEntry.vue'

export default {
  props: ['pagecontent'],
  components: {
    SbTextArea,
    SbRichText,
    Sbimage,
    SbLink,
    ProjectOverviewEntry,
  },

  data() {
    return {}
  },
  methods: {},

  mounted: function () {
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
  <div class="projectoverview js-transition transition">
    <h1 class="projectoverview-hl">
      <SbRichText :richTextParams="pagecontent.text_headline" />
    </h1>
    <div class="projectoverview-projects-box">
      <ProjectOverviewEntry
        v-for="(project, key) in pagecontent.projects"
        :key="key"
        :project="project"
        class="projectoverview-job"
      />
    </div>
  </div>
</template>

<style lang="scss">
@import '@/styles/tools.scss';

.projectoverview {
  background-color: var(--bg-color);
  padding: grid(2);
  @include media('<tablet-l') {
    padding: grid(3);
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
    padding: grid(5);
  }
}
.projectoverview-projects-box {
  display: flex;
  flex-wrap: wrap;
}

.projectoverview-hl {
  @include sec-font;
  color: var(--main-color);
  text-transform: uppercase;
  position: relative;
  font-size: getVw(180px);
  line-height: 0.787em;
  margin-left: -0.35vw;
  margin-bottom: 5vw;

  @include media('<desktop') {
    font-size: getVw(320px);
  }

  @include media('<=tablet-l') {
    font-size: getVw(320px);
  }
  @include media('<tablet-l') {
    font-size: getVw(360px);
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
    font-size: getVw(370px);
    margin-top: 12vw;
  }
  @media only screen and (max-width: 500px) {
    margin-top: 16vw;
  }
}
</style>
