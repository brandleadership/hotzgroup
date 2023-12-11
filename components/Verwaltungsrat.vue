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
    picanim: function() {
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
    wordanim: function() {
      // let letters = gsap.utils.toArray('.home-letter')

      this.animation = function(container) {
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
      allContainers.map(container => {
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

  mounted: function() {
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
      <!-- <div class="vr-picbox">
        <Sbimage
          :class="'vr-pic'"
          :imgParams="{
            src: sectioncontent.Image,
            width: 853,
            quality: 60,
            alt: 'famous pic',
            bp: {
              1920: { width: 640 },
            },
          }"
        />
      </div> -->
      <div class="vr-people-box">
        <div
          class="vr-person"
          v-for="(person, key) in sectioncontent.vr_person"
          :key="key"
          :number="key"
          :amount="sectioncontent.length"
          :person="person"
        >
          <Sbimage
            :class="'vr-pic-l1'"
            :imgParams="{
              src: person.image,
              width: 500,
              quality: 60,
              alt: person.name,
              bp: {
                1920: { width: 500 },
              },
            }"
          />
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
              <a
                class="vr-link vr-word"
                aria-label="Verwaltungsrat"
                :href="person.link"
                >{{ person.link_text }}</a
              >
            </div>
          </div>
        </div>
      </div>

      <div class="team-box">
        <div
          class="team-person"
          v-for="(teammember, key) in sectioncontent.team"
          :key="key"
          :number="key"
          :amount="sectioncontent.length"
          :teammember="teammember"
        >
          <Sbimage
            :class="'team-pic-l1'"
            :imgParams="{
              src: teammember.image,
              width: 500,
              quality: 60,
              alt: teammember.name,
              bp: {
                1920: { width: 500 },
              },
            }"
          />
          <h2 class="vr-names">
            <div class="vr-mask">
              <span class="vr-name team-names vr-word">{{
                teammember.name
              }}</span>
            </div>
            <div class="vr-mask">
              <span class="vr-surname team-names vr-word">{{
                teammember.nachname
              }}</span>
            </div>
          </h2>
          <div class="vr-roles">
            <div class="vr-mask">
              <span class="vr-role team-roles vr-word">{{
                teammember.position1
              }}</span>
            </div>
            <div class="vr-mask">
              <span class="vr-role team-roles vr-word">{{
                teammember.position2
              }}</span>
            </div>
            <div class="vr-mask">
              <span class="vr-role team-roles vr-word">{{
                teammember.position3
              }}</span>
            </div>
            <div class="vr-mask">
              <a
                class="vr-link vr-word"
                aria-label="Verwaltungsrat"
                :href="teammember.link"
                >{{ teammember.link_text }}</a
              >
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
  flex-direction: column;
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
  overflow: hidden;

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
  width: calc(100% + grid(7));
  flex-wrap: wrap;
  // flex-direction: column;
  // justify-content: flex-end;
  @include media('<tablet') {
    margin-bottom: 50px;
  }
}

.vr-person {
  margin-top: 3vw;
  // margin-bottom: -9px;
  margin-right: grid(4);

  @include media('<=tablet-l') {
    margin-bottom: -6px;
  }
  @include media('<=tablet-l') {
    margin-top: 50px;
  }
  @include media('<=phone') {
    // @media (orientation: landscape) {
    margin-right: 0;
    // }
  }
}

.vr-pic-l1 {
  object-fit: cover;
  width: grid(15);
  height: grid(20);
  @include media('<=tablet-xxl') {
    // @media (orientation: landscape) {
    width: grid(20);
    height: grid(26);
    // }
  }
  // @include media('<tablet-l') {
  //   // @media (orientation: landscape) {
  //   width: grid(24);
  //   height: grid(30);
  //   // }
  // }
  @include media('<tablet-l') {
    // @media (orientation: landscape) {
    width: grid(38);
    height: grid(42);
    // }
  }
  @include media('<=phone') {
    // @media (orientation: landscape) {
    width: grid(82);
    height: grid(100);
    // }
  }
}
.vr-names {
  margin-top: 20px;
  margin-bottom: 10px;
}
.vr-name,
.vr-surname {
  display: block;
  // font-size: 35px;
  font-size: getVw(30px);
  // margin-bottom: 15px;
  text-transform: uppercase;
  line-height: 1em;
  @include media('<=tablet-xxl') {
    font-size: 25px;
    // }
  }
  @include media('<=tablet-l') {
    // @media (orientation: landscape) {
    font-size: 30px;
    // }
  }
  @include media('<=tablet-l') {
    // @media (orientation: landscape) {
    font-size: 25px;
    // }
  }
}

.vr-role {
  @include regular-font;
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

.team-box {
  display: flex;
  // flex-direction: column;
  flex-wrap: wrap;
  padding-top: grid(8);
  padding-bottom: grid(4);
  padding-left: grid(19);
  width: grid(48);
  // width: grid(50);
  // justify-content: flex-end;
  @include media('<=tablet-xxl') {
    // @media (orientation: landscape) {
    padding-left: grid(24);
    width: grid(57);
    // }
  }
  @include media('<=tablet-l') {
    // @media (orientation: landscape) {
    width: grid(58);
    // }
  }
  @include media('<tablet') {
    // @media (orientation: landscape) {
    padding-left: grid(0);
    width: calc(100% + grid(6));
    // }
  }
}
.team-person {
  margin-top: 3vw;
  // margin-bottom: -9px;
  margin-right: grid(3);

  @include media('<=tablet-l') {
    margin-bottom: -6px;
  }
  @include media('<=tablet-l') {
    margin-top: 50px;
  }
  @include media('<tablet-l') {
    margin-right: grid(4);
  }
  @include media('<tablet-l') {
    margin-right: grid(2);
  }
}
.team-names {
  @include media('<phone') {
    font-size: 20px;
  }
}
.team-roles {
  @include media('<phone') {
    font-size: 16px;
  }
}
.team-pic-l1 {
  object-fit: cover;
  width: grid(13);
  height: grid(17);
  // height: auto;
  @include media('<=tablet-xxl') {
    // @media (orientation: landscape) {
    width: grid(16);
    height: grid(22);
    // }
  }
  @include media('<tablet-l') {
    width: grid(24);
    height: grid(30);
  }
  @include media('<tablet') {
    // @media (orientation: landscape) {
    width: grid(38);
    height: grid(42);
    // }
  }
  @include media('<phone') {
    width: grid(40);
    height: grid(42);
  }
}
</style>
