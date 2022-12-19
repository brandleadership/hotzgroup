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

export default {
  props: ['pagecontent'],
  components: {
    SbTextArea,
    SbRichText,
    Sbimage,
    SbLink,
  },

  data() {
    return {
      projects: this.pagecontent.projects,
      ready: true,
      nextId: null,
      prevId: null,
    }
  },

  methods: {
    pushNext: function() {
      this.getNextSlug()
      this.$router.push(this.projects[this.nextId].slug)
    },
    pushPrev: function() {
      this.getPrevSlug()
      this.$router.push(this.projects[this.prevId].slug)
    },

    getNextSlug: function() {
      let nextId = null
      const currentSlug = this.$route.path.substring(
        this.$route.path.lastIndexOf('/') + 1
      ) // get last part of slug after /
      const allProjects = Object.values(this.projects) // transform object into array for filter function

      const thisProject = allProjects.filter((p, i) => {
        if (p.slug == currentSlug) {
          nextId = i + 1
          return true
        }
        return false
      })

      if (nextId >= allProjects.length) {
        nextId = 0
      }
      this.nextId = nextId

      // return { thisProject: thisProject[0], nextId }
    },

    getPrevSlug: function() {
      let prevId = null
      const currentSlug = this.$route.path.substring(
        this.$route.path.lastIndexOf('/') + 1
      ) // get last part of slug after /
      const allProjects = Object.values(this.projects) // transform object into array for filter function

      const thisProject = allProjects.filter((p, i) => {
        if (p.slug == currentSlug) {
          prevId = i - 1
          return true
        }
        return false
      })

      if (prevId < 0) {
        prevId = allProjects.length - 1
      }
      this.prevId = prevId

      // return { thisProject: thisProject[0], prevId }
    },
  },

  mounted: function() {
    // const elements = find('img', this.$el)
    // onFontLoaded(() => {
    //   this.$nextTick(() => {
    //     imagesLoaded(elements, () => {
    //       setTimeout(() => {
    //       }, 100)
    //     })
    //   })
    // })
  },

  // beforeDestroy: function() {

  // },
}
</script>

<template>
  <div class="project js-transition transition">
    <nuxt-link class="project-back-to-overview-link" :to="'/projects'">
      <span class="project-back-to-overview-txt">BACK TO OVERVIEW</span>
    </nuxt-link>
    <h1 class="project-name">{{ pagecontent.text_name }}</h1>
    <SbRichText
      class="project-descr"
      :richTextParams="pagecontent.text_description"
    />

    <div
      :key="key"
      v-for="(contentblock, key) in pagecontent.contentblocks"
      class="project-content-container"
    >
      <Sbimage
        :class="'project-content-pic'"
        :imgParams="{
          src: contentblock.pic_or_vid.filename,
          height: 500,
          fitIn: false,
        }"
      />
      <div class="project-content-descr">
        <SbTextArea>{{ contentblock.description }}</SbTextArea>
      </div>
    </div>

    <div class="project-next-prev-box">
      <div class="project-prev-link" @click="pushPrev">
        <span class="project-prev-txt">PREV</span>
      </div>
      <div class="project-next-link" @click="pushNext">
        <span class="project-next-txt">NEXT</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/styles/tools.scss';

.project {
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

.project-name {
  @include sec-font;
  width: grid(76);
  text-transform: uppercase;
  position: relative;
  font-size: getVw(120px);
  line-height: 0.787em;
  margin-top: 3vw;
  @include media('<desktop') {
    // font-size: getVw(320px);
  }

  @include media('<=tablet-xxl') {
    // width: grid(74);
    text-indent: grid(4);
  }
  @include media('<=tablet-l') {
    width: grid(70);
    text-indent: grid(5);
  }
  @include media('<tablet-l') {
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
    font-size: getVw(370px);
    margin-top: 16vw;
    text-indent: 0;
  }
  @media only screen and (max-width: 500px) {
    margin-top: 20vw;
  }
}

.project-descr {
  text-transform: uppercase;
  font-size: getVw(30px);
  width: grid(36);
  line-height: 0.9em;
  position: relative;
  display: block;
  margin-top: 0.9vw;
  margin-left: -0.15vw;

  @include media('<desktop-l') {
    font-size: getVw(35px);
    width: grid(45);
  }
  @include media('<desktop') {
    font-size: getVw(40px);
    width: grid(58);
  }

  @include media('<=tablet-l') {
    font-size: getVw(50px);
    // width: grid(70);
  }
  @include media('<tablet-l') {
    font-size: getVw(60px);
    width: grid(70);
  }

  @include media('<tablet') {
    font-size: getVw(100px);
    width: grid(80);
  }
}

.project-back-to-overview-link {
  position: absolute;
  margin-top: -0.2vw;
  z-index: $z-sky;

  &:hover {
    .project-back-to-overview-txt {
      color: var(--brand-color);
    }
  }
  @include media('<tablet') {
    margin-left: grid(43);
    transform: translate(-50%);
    z-index: $z-sun;
  }
}

.project-back-to-overview-txt {
  @include sec-font;
  text-transform: uppercase;
  text-decoration: none;
  position: relative;
  font-size: getVw(20px);
  display: block;
  @include media('<=desktop') {
    font-size: 18px;
    margin-top: -2px;
  }
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

.project-next-prev-box {
  display: flex;
  width: grid(15);
  justify-content: space-between;
}

.project-prev-link {
  margin-top: 5vw;
  @include sec-font;
  text-transform: uppercase;
  text-decoration: none;
  position: relative;
  font-size: getVw(40px);
  display: block;
  cursor: pointer;
  &:hover {
    color: var(--brand-color);
  }
}
.project-next-link {
  margin-top: 5vw;
  @include sec-font;
  text-transform: uppercase;
  text-decoration: none;
  position: relative;
  font-size: getVw(40px);
  display: block;
  cursor: pointer;
  &:hover {
    color: var(--brand-color);
  }
}

.project-content-container {
  margin-top: 2vw;
}

.project-content-pic {
  position: relative;
  max-height: 400px;
}
.project-content-descr {
  text-transform: uppercase;
  position: relative;
  font-size: getVw(30px);
  line-height: 0.85em;
  margin-top: 20px;

  @include media('<=tablet-xxl') {
    width: grid(70);
    font-size: getVw(120px);
  }
  @include media('<=tablet-l') {
    font-size: getVw(140px);
  }
  @include media('<tablet-l') {
    font-size: getVw(180px);
    margin-top: 7vw;
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
    margin-top: 12vw;
    font-size: getVw(220px);
  }
  @include media('<phone') {
  }
}

.project {
  .nuxt-link-active {
    color: var(--main-color);
    text-decoration: none;
  }
}
</style>
