<script>
import { gsap, Power2 } from 'gsap'
import { find, hasClass, isTouchDevice } from '~/scripts/elements.js'
import SbLink from '@/components/SbLink.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'

export default {
  name: 'ButtonLink',
  props: ['sbData', 'type', 'active', 'trackGa', 'showLoadingState'],
  components: {
    SbLink,
    LoadingIndicator,
  },
  computed: {
    buttonClasses: function () {
      //let classStr = 'button-link-container ' + this.typeClass
      let classes = [
        'button-link-container',
        'button-link-container-' + this.myType,
      ]

      if (this.showLoadingState) {
        classes.push('button-link-container-loading')
      }

      return classes
    },
    typeClass: function () {
      return 'button-link-container-' + this.myType
    },
  },

  data() {
    //andere schreibweise für function() {
    return {
      myType: null,
    }
  },
  methods: {
    hoverAnimation: function () {
      this.vpW = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      )
      if (isTouchDevice() == true || this.vpW <= 1024) {
        return
      }
      this.button = find('.button-link-box', this.$refs.thisButton)[0]
      // this.buttonName = find('.button-link-name', this.$refs.thisButton)[0]
      // this.buttonIcon = find('.button-link-icon', this.$refs.thisButton)[0]
      this.buttonHoverPart = find(
        '.button-link-box-hover',
        this.$refs.thisButton
      )[0]
      if (this.hoverAnimationTl) {
        this.hoverAnimationTl.kill()
      }
      this.hoverAnimationTl = gsap
        .timeline({})
        .fromTo(
          this.button,
          { y: 0 },
          { duration: 0.3, y: '-100%', ease: Power2.easeOut },
          0
        )
        .fromTo(
          this.buttonHoverPart,
          { y: 0 },
          { duration: 0.3, y: '-100%', ease: Power2.easeOut },
          0
        )
      // .fromTo(this.buttonName, { x: 0 }, { duration: 0.3, x: 20, ease: Power2.easeOut }, 0)
      // .fromTo(this.buttonIcon, { x: 0 }, { duration: 0.3, x: -20, ease: Power2.easeOut }, 0)
    },

    deHoverAnimation: function () {
      if (this.active) return
      this.vpW = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      )
      if (isTouchDevice() == true || this.vpW <= 1024) {
        return
      }
      if (this.deHoverAnimationTl) {
        this.deHoverAnimationTl.kill()
      }
      this.deHoverAnimationTl = gsap
        .timeline({})
        .to(this.button, { duration: 0.3, y: '0%', ease: Power2.easeOut }, 0)
        .to(
          this.buttonHoverPart,
          { duration: 0.3, y: '0%', ease: Power2.easeOut },
          0
        )
      // .to(this.buttonName, { duration: 0.3, x: 0, ease: Power2.easeOut }, 0)
      // .to(this.buttonIcon, { duration: 0.3, x: 0, ease: Power2.easeOut }, 0)
    },

    onMouseEnter: function () {
      if (!this.active) this.hoverAnimation()
    },

    onMouseLeave: function () {
      if (!this.active) this.deHoverAnimation()
    },

    onSbLinkClicked: function () {
      var trackGa = this.$attrs['trackGa']

      if (this.trackGa) {
        //alert('Track Ga Event')
        //alert('Track Ga Event')
        // console.log(this.trackGa)

        /* gtag('event', this.trackGa.event_name, {
          event_label: this.trackGa.event_label,
          event_category: this.trackGa.event_category,
        })*/

        var eventparams = {
          event_label: this.trackGa.event_label,
          event_category: this.trackGa.event_category,
        }

        this.$gtm.push({ event: this.trackGa.event_name, eventparams })
      }
      this.$emit('click')
    },
  },

  mounted: function () {
    this.hoverAnimation()
    this.deHoverAnimation()

    if (this.type) {
      this.myType = this.type
      this.$emit('update:myType', this.type)
    }
  },

  watch: {
    active: function (val) {
      if (val == false) {
        this.deHoverAnimation()
      }
    },
  },
}
</script>


<template>
  <div
    ref="thisButton"
    :class="buttonClasses"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div class="button-link-box">
      <SbLink
        :sbData="sbData"
        @click="onSbLinkClicked()"
        :type.sync="myType"
        class="button-link"
      >
        <div class="button-link-seperator button-link-seperator-top"></div>
        <div class="button-link-seperator button-link-seperator-right"></div>
        <div class="button-link-seperator button-link-seperator-left"></div>
        <div class="button-link-core">
          <div
            class="button-link-name"
            :class="{ spaced: myType == 'bigArrowRight' }"
          >
            <slot></slot>
          </div>

          <svg
            v-if="myType == 'download'"
            class="button-link-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="13.513"
            height="15.477"
            viewBox="0 0 13.513 15.477"
          >
            <g
              id="download_arrow"
              data-name="download arrow"
              transform="translate(13.159) rotate(90)"
            >
              <line
                id="Linie_15"
                data-name="Linie 15"
                x2="14.531"
                transform="translate(0 6.409)"
                fill="none"
                stroke="#fff"
                stroke-width="1"
              />
              <path
                id="Pfad_15"
                data-name="Pfad 15"
                d="M0,0,6.4,6.4,0,12.806"
                transform="translate(8.367 0)"
                fill="none"
                stroke="#fff"
                stroke-width="1"
              />
            </g>
          </svg>

          <svg
            v-if="myType == 'external'"
            class="button-link-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 11.29 11.3"
            width="11.29"
            height="11.3"
          >
            <line
              id="Linie_15"
              data-name="Linie 15"
              class="cls-1"
              x1="0.35"
              y1="10.95"
              x2="10.63"
              y2="0.67"
            />
            <path id="Pfad_15" data-name="Pfad 15" d="M1.74.5h9V9.56" />
          </svg>

          <svg
            v-if="myType == 'default'"
            class="button-link-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="15.477"
            height="13.513"
            viewBox="0 0 15.477 13.513"
          >
            <line
              id="Linie_15"
              data-name="Linie 15"
              x2="14.531"
              transform="translate(0 6.409)"
              fill="none"
              stroke="#fff"
              stroke-width="1"
            />
            <path
              id="Pfad_15"
              data-name="Pfad 15"
              d="M0,0,6.4,6.4,0,12.806"
              transform="translate(8.367 0)"
              fill="none"
              stroke="#fff"
              stroke-width="1"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            v-if="myType == 'map'"
            class="button-link-icon button-link-icon-map"
            viewBox="0 0 21 29.87"
            width="21"
            height="29.87"
          >
            <path
              d="M11,1.5a9.5,9.5,0,0,1,8.16,14.37l-8,13.38L2.92,16A9.5,9.5,0,0,1,11,1.5m0-1a10.5,10.5,0,0,0-8.93,16L10.4,30a.88.88,0,0,0,.75.42h0a.91.91,0,0,0,.75-.43L20,16.38A10.5,10.5,0,0,0,11,.5Z"
              transform="translate(-0.5 -0.5)"
              fill="none"
              stroke="#fff"
            />
            <path
              d="M11,6.75A4.25,4.25,0,1,1,6.75,11,4.26,4.26,0,0,1,11,6.75m0-1A5.25,5.25,0,1,0,16.25,11,5.25,5.25,0,0,0,11,5.75Z"
              transform="translate(-0.5 -0.5)"
              fill="none"
              stroke="#fff"
            />
          </svg>

          <svg
            v-if="myType == 'bigArrowRight'"
            class="button-link-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="51.22"
            height="44.597"
            viewBox="0 0 51.22 44.597"
          >
            <g transform="translate(-1839.5 -1991.181)">
              <line
                x2="49"
                transform="translate(1839.5 2013.5)"
                fill="none"
                stroke="#fff"
                stroke-width="2"
              />
              <path
                d="M8044,1988l21.591,21.591L8044,2031.183"
                transform="translate(-6176.286 3.889)"
                fill="none"
                stroke="#fff"
                stroke-width="2"
              />
            </g>
          </svg>

          <svg
            id="Gruppe_281"
            class="button-link-icon"
            v-if="myType == 'add'"
            data-name="Gruppe 281"
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
          >
            <rect
              id="Rechteck_287"
              data-name="Rechteck 287"
              width="4"
              height="40"
              transform="translate(18)"
              fill="#fff"
            />
            <rect
              id="Rechteck_288"
              data-name="Rechteck 288"
              width="4"
              height="40"
              transform="translate(40 18) rotate(90)"
              fill="#fff"
            />
          </svg>
          <LoadingIndicator :visible="showLoadingState" />
        </div>
        <div class="button-link-seperator button-link-seperator-bottom"></div>
      </SbLink>
    </div>

    <div class="button-link-box-hover">
      <SbLink
        :sbData="sbData"
        @click="onSbLinkClicked()"
        :type.sync="myType"
        class="button-link-hover"
      >
        <div class="button-link-core">
          <div
            class="button-link-name-hover"
            :class="{ spaced: myType == 'bigArrowRight' }"
          >
            <slot></slot>
          </div>

          <svg
            v-if="myType == 'download'"
            class="button-link-icon-hover"
            xmlns="http://www.w3.org/2000/svg"
            width="13.513"
            height="15.477"
            viewBox="0 0 13.513 15.477"
          >
            <g
              id="download_arrow"
              data-name="download arrow"
              transform="translate(13.159) rotate(90)"
            >
              <line
                id="Linie_15"
                data-name="Linie 15"
                x2="14.531"
                transform="translate(0 6.409)"
                fill="none"
                stroke="#fff"
                stroke-width="1"
              />
              <path
                id="Pfad_15"
                data-name="Pfad 15"
                d="M0,0,6.4,6.4,0,12.806"
                transform="translate(8.367 0)"
                fill="none"
                stroke="#fff"
                stroke-width="1"
              />
            </g>
          </svg>

          <svg
            v-if="myType == 'external'"
            class="button-link-icon-hover"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 11.29 11.3"
            width="11.29"
            height="11.3"
          >
            <line
              id="Linie_15"
              data-name="Linie 15"
              class="cls-1"
              x1="0.35"
              y1="10.95"
              x2="10.63"
              y2="0.67"
            />
            <path id="Pfad_15" data-name="Pfad 15" d="M1.74.5h9V9.56" />
          </svg>

          <svg
            v-if="myType == 'default'"
            class="button-link-icon-hover"
            xmlns="http://www.w3.org/2000/svg"
            width="15.477"
            height="13.513"
            viewBox="0 0 15.477 13.513"
          >
            <line
              id="Linie_15"
              data-name="Linie 15"
              x2="14.531"
              transform="translate(0 6.409)"
              fill="none"
              stroke="#fff"
              stroke-width="1"
            />
            <path
              id="Pfad_15"
              data-name="Pfad 15"
              d="M0,0,6.4,6.4,0,12.806"
              transform="translate(8.367 0)"
              fill="none"
              stroke="#fff"
              stroke-width="1"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            v-if="myType == 'map'"
            class="button-link-icon-hover button-link-icon-map"
            viewBox="0 0 21 29.87"
            width="21"
            height="29.87"
          >
            <path
              d="M11,1.5a9.5,9.5,0,0,1,8.16,14.37l-8,13.38L2.92,16A9.5,9.5,0,0,1,11,1.5m0-1a10.5,10.5,0,0,0-8.93,16L10.4,30a.88.88,0,0,0,.75.42h0a.91.91,0,0,0,.75-.43L20,16.38A10.5,10.5,0,0,0,11,.5Z"
              transform="translate(-0.5 -0.5)"
              fill="none"
              stroke="#fff"
            />
            <path
              d="M11,6.75A4.25,4.25,0,1,1,6.75,11,4.26,4.26,0,0,1,11,6.75m0-1A5.25,5.25,0,1,0,16.25,11,5.25,5.25,0,0,0,11,5.75Z"
              transform="translate(-0.5 -0.5)"
              fill="none"
              stroke="#fff"
            />
          </svg>

          <svg
            v-if="myType == 'bigArrowRight'"
            class="button-link-icon-hover"
            xmlns="http://www.w3.org/2000/svg"
            width="51.22"
            height="44.597"
            viewBox="0 0 51.22 44.597"
          >
            <g transform="translate(-1839.5 -1991.181)">
              <line
                x2="49"
                transform="translate(1839.5 2013.5)"
                fill="none"
                stroke="#fff"
                stroke-width="2"
              />
              <path
                d="M8044,1988l21.591,21.591L8044,2031.183"
                transform="translate(-6176.286 3.889)"
                fill="none"
                stroke="#fff"
                stroke-width="2"
              />
            </g>
          </svg>

          <svg
            id="Gruppe_281"
            v-if="myType == 'add'"
            class="button-link-icon-hover"
            data-name="Gruppe 281"
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
          >
            <rect
              id="Rechteck_287"
              data-name="Rechteck 287"
              width="4"
              height="40"
              transform="translate(18)"
              fill="#fff"
            />
            <rect
              id="Rechteck_288"
              data-name="Rechteck 288"
              width="4"
              height="40"
              transform="translate(40 18) rotate(90)"
              fill="#fff"
            />
          </svg>

          <LoadingIndicator :visible="showLoadingState" />
        </div>
      </SbLink>
    </div>
  </div>
</template>



<style lang="scss">
@import '@/styles/tools.scss';

.button-link-container {
  height: 100%;
  overflow: hidden;
}
.button-link {
  width: 100%;
  // background-color: var(--bg-color);
  height: 100%;
  // z-index: $z-roof;

  a {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
  }
}
.button-link-hover {
  width: 100%;
  // background-color: var(--bg-color);
  height: 100%;

  a {
    display: flex;
    height: 100%;
    // flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
}

.button-link-seperator {
  position: relative;
  height: 1px;
  width: 100%;
  background-color: $fake-white;
}

.button-link-seperator-left,
.button-link-seperator-right {
  position: absolute;

  top: 0px;
  width: 1px;
  height: 100%;

  display: none;
}
.button-link-seperator-right {
  left: auto;
  right: 0px;
}
.button-link-core {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.button-link-icon {
  position: absolute;
  right: 0;
  align-self: center;
  fill: none;
  stroke: var(--main-color);
  @include media('<=tablet-l') {
    max-width: 40px;
  }
  @include media('<tablet-l') {
    @media (orientation: landscape) {
      max-width: 30px;
    }
  }
  @include media('<=tablet') {
  }
  @include media('<tablet') {
    max-width: 30px;
  }
}

.button-link-icon-hover {
  right: 20px;
  position: absolute;
  align-self: center;
  fill: none;
  stroke: var(--main-color);
}
.button-link-name {
  line-height: 1.2em;
  padding-right: 30px;

  @include media('<tablet-xxl') {
    font-size: 16px;
  }
  @include media('<=tablet') {
    font-size: 14px;
  }
}
.button-link-name-hover {
  margin-left: 20px;
  line-height: 1.2em;
  @include media('<tablet-xxl') {
    font-size: 16px;
  }
  @include media('<=tablet') {
    font-size: 14px;
  }
}
.button-link-box {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.button-link-box-hover {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--brand-color);
}

.button-link-icon-map {
  max-width: 15px;
}
.spaced {
  letter-spacing: 0.5em;
  text-transform: uppercase;
  @include media('<tablet') {
    letter-spacing: 0.35em;
  }
}

.button-link-container-add {
  .button-link-seperator-left,
  .button-link-seperator-right {
    display: block;
  }

  .button-link-name {
    margin-left: 20px;
  }
  .button-link-icon {
    align-self: center;
    right: 20px;
    position: absolute;
  }
}

.button-link-container .loadingindicator-container {
  margin-right: 20px;
}

.button-link-container-loading .button-link-icon-hover,
.button-link-container-loading .button-link-icon {
  opacity: 0;
}
</style>
