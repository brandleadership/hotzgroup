<script>
import { gsap, Power0, Power2 } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import {
  find,
  hasClass,
  isTouchDevice,
  onFontLoaded,
} from '~/scripts/elements.js'
import imagesLoaded from 'imagesloaded'
import Sbimage from '@/components/Sbimage.vue'
import SbRichText from '@/components/SbRichText.vue'

export default {
  name: 'Verwaltungsrat',
  props: ['sectioncontent'],
  components: { Sbimage, SbRichText },

  data() {
    //andere schreibweise für function() {
    return {}
  },
  methods: {
    picanim: function () {
      const trigger = find('.vr-picbox', this.$el)[0]
      const pic = find('.vr-pic', this.$el)[0]
      const headline = find('.vr-headline', this.$el)
      // const words = find('.char', this.$el)
      this.slideInTl = gsap
        .timeline({ paused: true })
        .fromTo(
          pic,
          { y: '100%' },
          { y: 0, duration: 1, ease: Power2.easeOut },
          0
        )
        .fromTo(
          headline,
          { y: '100%' },
          { y: 0, duration: 0.5, ease: Power2.easeOut },
          0
        )

      ScrollTrigger.create({
        animation: this.slideInTl,
        trigger: trigger,
        start: 'top 80%', // when the top of the trigger hits the top of the viewport
        toggleActions: 'play none none reverse', //onEnter, onLeave, onEnterBack, onLeaveBack

        // end: 'top 50%', // when the top of the trigger hits the top of the viewport
        // scrub: 0,
        // markers: 'true',
      })
    },
    wordanim: function () {
      // let letters = gsap.utils.toArray('.home-letter')

      this.animation = function (container) {
        const element = find('.vr-word', container)
        return gsap
          .timeline()
          .fromTo(
            element,
            { y: '110%' },
            { duration: 0.5, stagger: 0.07, y: '0%', ease: Power2.easeOut },
            0
          )
      }

      let allContainers = find('.vr-person', this.$el)
      allContainers.map((container) => {
        ScrollTrigger.create({
          animation: this.animation(container),
          trigger: container,
          start: 'top 95%',
          toggleActions: 'play none none reverse', //onEnter, onLeave, onEnterBack, onLeaveBack
          // markers: 'true',
        })
      })
    },
  },

  mounted: function () {
    this.picanim()
    this.wordanim()
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
  <section class="verwaltungsrat" id="vr-anker">
    <div class="vr-anker" id="vr"></div>

    <div class="vr-mask">
      <h1 class="vr-headline">{{ sectioncontent.Headline }}</h1>
    </div>
    <div class="vr-container">
      <div class="vr-picbox">
        <Sbimage
          :class="'vr-pic'"
          :imgParams="{
            src: sectioncontent.Image,
            width: 2560,
            quality: 60,
            alt: 'famous pic',
            bp: {
              1920: { width: 1920 },
              1600: { width: 1600 },
              1366: { width: 1366 },
            },
          }"
        />
      </div>
      <div class="vr-people-box">
        <div
          class="vr-person"
          v-for="(person, key) in sectioncontent.vr_person"
          :key="key"
          :number="key"
          :amount="sectioncontent.length"
          :person="person"
        >
          <h2 class="vr-names">
            <div class="vr-mask">
              <span class="vr-name vr-word">{{ person.name }}</span>
            </div>
            <div class="vr-mask">
              <span class="vr-surname vr-word">{{ person.nachname }}</span>
            </div>
          </h2>
          <div class="vr-roles">
            <div class="vr-mask">
              <span class="vr-role vr-word">{{ person.position1 }}</span>
            </div>
            <div class="vr-mask">
              <span class="vr-role vr-word">{{ person.position2 }}</span>
            </div>
            <div class="vr-mask">
              <span class="vr-role vr-word">{{ person.position3 }}</span>
            </div>
            <div class="vr-mask">
              <a class="vr-link vr-word" :href="person.link">{{
                person.link_text
              }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>



<style lang="scss">
@import '@/styles/tools.scss';

.verwaltungsrat {
  position: relative;
  background-color: var(--sec-color);
  color: var(--main-color);
  padding: grid(7);

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

  .char {
    position: relative;
    display: inline-block;
  }
}
.vr-anker {
  position: absolute;
  height: 100vh;
  top: 50%;
  transform: translate(0, -50%);
}
.vr-container {
  display: flex;
  @include media('<tablet') {
    flex-direction: column;
  }
}
.vr-headline {
  @include miniHl;
  text-transform: uppercase;
}
.vr-picbox {
  width: grid(32);
  height: 80vh;
  margin-right: grid(5);
  flex-shrink: 0;
  margin-top: 3vw;

  @include media('<=tablet-xxl') {
    width: grid(41);
  }
  @include media('<tablet-xxl') {
    @media (orientation: portrait) {
      width: grid(50);
    }
  }
  @include media('<=tablet-l') {
    width: grid(47);
  }
  @include media('<tablet') {
    @media (orientation: portrait) {
      width: 100%;
      height: 100vw;
      margin-top: 40px;
    }
    @media (orientation: landscape) {
      width: 100%;
      height: 100%;
    }
  }
}
.vr-pic {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.vr-people-box {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  @include media('<tablet') {
    margin-bottom: 50px;
  }
}
.vr-person {
  margin-top: 3vw;
  margin-bottom: -9px;

  @include media('<=tablet-l') {
    margin-bottom: -6px;
  }
  @include media('<=tablet-l') {
    margin-top: 50px;
  }
}
.vr-names {
  margin-bottom: 15px;
}
.vr-name,
.vr-surname {
  display: block;
  font-size: 35px;
  // margin-bottom: 15px;
  text-transform: uppercase;
  line-height: 1em;
  @include media('<=tablet-l') {
    // @media (orientation: landscape) {
    font-size: 30px;
    // }
  }
}
.vr-role {
  display: block;
  line-height: 1.2em;
}
.vr-mask {
  overflow: hidden;
}
.vr-word {
  display: block;
}
.vr-link {
  @include regular-font;
  margin-top: 5px;
  position: relative;
  display: block;
}
</style>
