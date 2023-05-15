<script>
import { gsap, Power3 } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'

import { find } from '~/scripts/elements.js'
import Sbimage from '@/components/Sbimage.vue'
import SbLink from '@/components/SbLink.vue'
import ObjectFitImage from '@/components/ObjectFitImage.vue'

// import SpatzekScroll from '~/scripts/SpatzekScroll'
import imagesLoaded from 'imagesloaded'

import SbTextArea from '@/components/SbTextArea.vue'
import SbRichText from '@/components/SbRichText.vue'
import Slider from '@/components/sb_components/Slider.vue'
import RunningText from '@/components/RunningText.vue'

export default {
  props: ['pagecontent'],
  components: {
    Sbimage,
    SbLink,
    ObjectFitImage,
    SbTextArea,
    SbRichText,
    Slider,
    RunningText,
  },

  data() {
    return {
      rdm: 0,
      hlLineAnimTl: null,
    }
  },
  methods: {
    teamPicAnim: function() {
      this.teamPicAnimTl = function(container) {
        const element = find('.js-about-team-pic', container)[0]
        const mask = find('.js-about-team-pic-mask', container)[0]
        // const rdm = Math.floor(Math.random() * (4 - 1 + 1) + 1) //Math.floor(Math.random() * (max - min + 1) + min);

        const time = 1
        const scale = 1.5

        return (
          gsap
            .timeline()
            // .set(mask, { visibility: 'visible' }, 0)
            .set(element, { opacity: 1 }, 0)
            .fromTo(
              mask,
              { x: '-100%' },
              { duration: time, x: '0%', ease: Power3.easeOut },
              0
            )
            .fromTo(
              element,
              { scale: scale, x: '100%' },
              { duration: time, scale: 1, x: '0%', ease: Power3.easeOut },
              0
            )
        )
      }

      let allContainers = find('.js-about-team-member', this.$el)
      allContainers.map(container => {
        if (this.rdm <= 3) {
          this.rdm++
        } else {
          this.rdm = 1
        }

        ScrollTrigger.create({
          animation: this.teamPicAnimTl(container),
          trigger: find('.js-about-team-pic-outermask', container)[0],
          toggleActions: 'restart pause restart reverse',
          // markers: 'true',
        })
      })
    },
    teamTextAnim: function() {
      this.teamTextAnimTl = function(container) {
        const names = find('.js-about-name-slideup', container)

        return gsap
          .timeline()
          .fromTo(
            names,
            { y: '100%' },
            { stagger: 0.1, duration: 0.4, y: '0%', ease: Power3.easeOut },
            0.2
          )
      }

      let allContainers = find('.js-about-team-info', this.$el)
      allContainers.map(container => {
        ScrollTrigger.create({
          animation: this.teamTextAnimTl(container),
          trigger: container,
          toggleActions: 'restart pause restart reverse', //onEnter, onLeave, onEnterBack, onLeaveBack
          start: 'top 95%',
          // markers: 'true',
        })
      })
    },
  },

  mounted: function() {
    const elements = find('img', this.$el)

    document.fonts.ready.then(() => {
      this.$nextTick(() => {
        imagesLoaded(elements, () => {
          setTimeout(() => {
            this.teamPicAnim()
            this.teamTextAnim()
          }, 100)
        })
      })
    })
  },
  // beforeDestroy: function() {
  //   // this.spatzekscroll.destroy()
  //   removeListener(window, 'resize', this.onResize)
  //   removeListener(window, 'orientationchange', this.onResize)
  // },
}
</script>

<template>
  <div class="about js-transition transition">
    <Sbimage
      class="about-top-pic"
      :imgParams="{
        src: pagecontent.image_top,
        width: 1307,
        fitIn: false,
        bp: {
          1920: { width: 980 },
          1600: { width: 900 },
          1024: { width: 704 },
          768: { width: 528 },
          460: { width: 388 },
        },
      }"
    />
    <RunningText
      :text="pagecontent.runningtext[0].runningtext"
      :amount="20"
      :speed="5"
      :onlyInVp="true"
      :stopped="false"
      :inverse="false"
    >
    </RunningText>

    <div class="about-top-hl-box">
      <SbRichText class="about-top-hl" :richTextParams="pagecontent.headline" />
    </div>

    <div class="about-midsection">
      <SbRichText
        class="text30 about-text"
        :richTextParams="pagecontent.text_left"
      />
    </div>
    <Slider :pagecontent="pagecontent"></Slider>
    <!-- <div class="about-team-section"> -->
    <div class="about-team-flexer">
      <div class="js-about-team-container about-team-container">
        <div
          :key="key"
          v-for="(teammember, key) in pagecontent.team"
          class="js-about-team-member about-team-member"
        >
          <div class="js-about-team-pic-outermask about-team-pic-outermask">
            <div class="js-about-team-pic-mask about-team-pic-mask">
              <Sbimage
                class="js-about-team-pic about-team-pic"
                :imgParams="{
                  src: teammember.image,
                  width: 404,
                  height: 404,
                  fitIn: false,
                }"
              />
            </div>
          </div>

          <div class="js-about-team-info about-team-info">
            <div class="about-team-names-mask">
              <span class="js-about-name-slideup about-team-prename">
                {{ teammember.text_prename }}
              </span>
            </div>
            <div class="about-team-names-mask">
              <span class="js-about-name-slideup about-team-surname">
                {{ teammember.text_surname }}
              </span>
            </div>
            <div class="about-team-names-mask">
              <span class="js-about-name-slideup about-team-position">{{
                teammember.text_position
              }}</span>
            </div>

            <div class="about-team-links">
              <SbLink
                :key="key"
                v-for="(sociallink, key) in teammember.sociallinks"
                :sbData="sociallink.link"
              >
                <div class="about-team-names-mask">
                  <span class="js-about-name-slideup about-team-link">{{
                    sociallink.text_name
                  }}</span>
                </div>
              </SbLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<style lang="scss">
@import '@/styles/tools.scss';

.about {
  background-color: var(--bg-color);
  color: var(--main-color);
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
  @include media('<phone') {
  }
}

.about-top-pic {
  width: grid(49);
  height: auto;

  @include media('<=desktop') {
    width: grid(54);
  }
  @include media('<=tablet-xxl') {
    width: grid(66);
  }
  @include media('<=tablet-l') {
    width: grid(66);
  }
  @include media('<tablet-l') {
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
    width: grid(82);
  }

  @media only screen and (max-width: 500px) {
    width: grid(81);
  }
  @include media('<phone') {
    width: grid(80);
  }
}

.about-top-hl-box {
  display: block;
  position: relative;
  padding-top: grid(1);
  @include media('<tablet') {
    padding-top: grid(10);
  }
}
.about-top-hl {
  @include sec-font;
  text-transform: uppercase;
  position: relative;
  font-size: getVw(180px);
  line-height: 0.787em;

  @include media('<desktop') {
    text-indent: grid(12);
    font-size: getVw(320px);
  }

  @include media('<=tablet-l') {
    font-size: getVw(320px);
  }
  @include media('<tablet-l') {
    font-size: getVw(320px);
    margin-top: -0.4vw;
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
    font-size: getVw(370px);
    text-indent: 90px;
  }
  @media only screen and (max-width: 500px) {
    text-indent: 80px;
  }
}

.about-midsection {
  display: flex;
  margin-top: 3vw;
  @include media('<=tablet-l') {
    margin-top: 5vw;
  }
  @include media('<tablet') {
    display: block;
    margin-top: 10vw;
  }
}

.about-text {
  position: relative;
  margin-left: -0.15vw;
  width: grid(36);
  display: block;

  p {
    margin-bottom: 1.4vw;

    @include media('<=tablet-l') {
      margin-bottom: 1.6vw;
    }

    @include media('<tablet-l') {
      margin-bottom: 1.8vw;
    }
    @include media('<tablet') {
      margin-bottom: 3vw;
    }
  }

  @include media('<desktop-l') {
    font-size: getVw(35px);
    width: grid(45);
  }
  @include media('<desktop') {
    font-size: getVw(40px);
    width: grid(50);
  }

  @include media('<=tablet-l') {
    font-size: getVw(50px);
  }
  @include media('<tablet-l') {
    font-size: getVw(60px);
    width: grid(90);
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }

  @include media('<tablet') {
    font-size: getVw(100px);
    width: grid(86);
  }

  @include media('<=phone') {
  }
}

.about-team-section {
  margin-top: -2.8vw;
  display: flex;
  flex-direction: column;
  @include media('<tablet') {
    margin-top: -10vw;
  }
}

.about-team-flexer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.about-team-container {
  width: grid(64);
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.9vw;
  @include media('<=tablet-l') {
    width: grid(66);
  }
  @include media('<tablet-l') {
    margin-top: 3vw;
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }
  @include media('<tablet') {
    width: grid(96);
    margin-top: 8vw;
  }
  :nth-child(even) {
    @include media('<tablet') {
      margin-right: 0;
    }
  }
}

.about-team-member {
  width: grid(15);
  // height: grid(15);
  margin-top: 0.9vw;
  margin-right: grid(1);
  margin-bottom: 3.1vw;

  @include media('<=tablet-l') {
    width: grid(20);
    margin-bottom: 4vw;
  }
  @include media('<tablet-l') {
    margin-bottom: 6vw;
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
    }
  }

  @include media('<tablet') {
    width: grid(41);
    // height: grid(15);
    margin-top: 0.9vw;
    margin-right: grid(4);
  }
  @include media('<phone') {
  }
}

.about-team-pic-outermask {
  position: relative;
  display: block;
  overflow: hidden;
}
.about-team-pic-mask {
  overflow: hidden;
}

.about-team-pic {
  height: auto;
}

.about-team-names-mask {
  overflow: hidden;
}

.about-team-prename {
  display: block;
  @include sec-font;
  font-size: getVw(50px);
  text-transform: uppercase;
  line-height: 0.85em;
  margin-top: 0.88vw;
  text-indent: grid(1);
  @include media('<=tablet-l') {
    margin-top: 16px;
    font-size: getVw(66px);
    // text-indent: grid(4);
  }
  @include media('<tablet') {
    text-indent: grid(2);
    font-size: getVw(140px);
  }
}
.about-team-surname {
  display: block;
  @include sec-font;
  font-size: getVw(50px);
  text-transform: uppercase;
  line-height: 0.85em;
  @include media('<=tablet-l') {
    font-size: getVw(66px);
  }
  @include media('<tablet') {
    font-size: getVw(140px);
  }
}
.about-team-position {
  display: block;
  text-transform: uppercase;
  margin-top: 0.75vw;
  line-height: 1em;
  @include media('<=desktop-l') {
    // margin-top: 0.65vw;
  }
  @include media('<=tablet-l') {
    margin-top: 15px;
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

.about-team-links {
  margin-top: 0.55vw;
  line-height: 1.45em;
  text-decoration: underline;
  a {
    &:hover {
      color: var(--brand-color);
    }
  }
  @include media('<=tablet-l') {
    margin-top: 11px;
  }
}
</style>
