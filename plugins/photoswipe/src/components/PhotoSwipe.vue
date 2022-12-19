<script>
import 'photoswipe/dist/photoswipe.css'
import '../skin/default-skin.css'

import PhotoSwipe from 'photoswipe/dist/photoswipe'
import PhotoSwipeDefaultUI from 'photoswipe/dist/photoswipe-ui-default'
// import PhotoSwipeDefaultUI from '../skin/photoswipe-ui-default'

import { find, hasClass, isTouchDevice } from '~/scripts/elements.js'

export default {
  methods: {
    open(
      index,
      items,
      options = {
        captionEl: true,
        fullscreenEl: true,
        history: false,
        shareEl: true,
        tapToClose: true,
        closeOnScroll: false,
      }
    ) {
      const opts = Object.assign(
        {
          index: index,
          /* getThumbBoundsFn(index) {
            alert('test')
            const thumbnail = document.querySelectorAll('.preview-img-item')[index]
            const pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            const rect = thumbnail.getBoundingClientRect()
            return {
              x: rect.left,
              y: rect.top + pageYScroll,
              w: rect.width,
            }
          }, */
        },
        options
      )

      this.photoswipe = new PhotoSwipe(
        this.$el,
        PhotoSwipeDefaultUI,
        items,
        opts
      )
      this.photoswipe.listen('beforeChange', () => {
        // alert('test')
        //setTimeout(function() {

        // pswp__custom_caption
        const cappy = find('.pswp__caption .pswp__caption__center')[1]
        // console.log(cappy)
        if (cappy != undefined) {
          let observer = new MutationObserver(function(records, instance) {
            const arCurItemText = cappy.innerHTML.split('|')
            // console.log(arCurItemText)
            if (!cappy.innerHTML) return
            //console.log(arCurItemText)
            find('.pswp__custom_caption')[0].innerHTML =
              '<span>' + arCurItemText.join('</span><span>') + '</span>'

            //alert(find('.pswp__caption').length)
            instance.disconnect()
          })

          observer.observe(cappy, {
            attributes: false,
            childList: true,
            characterData: true,
          })
        }
        // find('.pswp__caption .pswp__caption__center').forEach(element => {

        // })

        find('.pswp__counter').forEach(element => {
          let observer = new MutationObserver(function(records, instance) {
            const arCurItemText = element.innerText.split(' ')
            arCurItemText[0] = arCurItemText[0].padStart(2, '0')
            arCurItemText[1] = '/'
            element.innerHTML =
              '<span>' + arCurItemText.join('</span>&nbsp;<span>') + '</span>'
            instance.disconnect()
          })

          observer.observe(element, {
            attributes: false,
            childList: true,
            characterData: true,
          })
        })
        //}, 200)
      })
      this.photoswipe.init()
    },

    close() {
      this.photoswipe.close()
    },
  },
}
</script>

<template>
  <!-- Root element of PhotoSwipe. Must have class pswp. -->
  <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
    <!-- Background of PhotoSwipe. 
    It's a separate element as animating opacity is faster than rgba().-->
    <div class="pswp__bg"></div>

    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">
      <!-- Container that holds slides. 
                PhotoSwipe keeps only 3 of them in the DOM to save memory.
      Don't modify these 3 pswp__item elements, data is added later on.-->
      <div class="pswp__container">
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
      </div>

      <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
      <div class="pswp__ui pswp__ui--hidden">
        <div class="pswp__top-bar">
          <!--  Controls are self-explanatory. Order can be changed. -->
          <div class="pswp__custom_caption"></div>

          <div class="pswp__counter"></div>

          <div class="pswp__controlls">
            <div class="pswp__controlls-3btns">
              <button class="pswp__button pswp__button--zoom" title="Zoom in/out">
                <!-- <span class="pswp__button-txt pswp__show_on_zoomed_in">ZOOM</span>
                <span class="pswp__button-txt pswp__show_on_fullscreen">ZOOM</span>-->
                <span class="pswp__button-txt">ZOOM</span>
              </button>
              <span class="pswp__button-spacer">&nbsp;&nbsp;&nbsp;—&nbsp;&nbsp;&nbsp;</span>
              <button class="pswp__button pswp__button--share" title="Share">
                <span class="pswp__button-txt">SHARE</span>
              </button>
              <span class="pswp__button-spacer">&nbsp;&nbsp;&nbsp;—&nbsp;&nbsp;&nbsp;</span>
              <button class="pswp__button pswp__button--fs" title="Toggle fullscreen">
                <span class="pswp__button-txt">FULLSCREEN</span>
              </button>
            </div>

            <button class="pswp__button pswp__button--close" title="Close (Esc)">
              <span class="pswp__button--close-txt">Back</span>
              <svg
                class="pswp__button--close-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="28.913"
                height="26.207"
                viewBox="0 0 28.913 26.207"
              >
                <g
                  id="back_arrow_detail"
                  data-name="back arrow detail"
                  transform="translate(-61.811 111.311) rotate(-90)"
                >
                  <path
                    id="Pfad_38"
                    data-name="Pfad 38"
                    d="M5942.189,15440c-8.025,2-14.861,1.5-16.645-3s-2.675-14.5-1.783-19.5"
                    transform="translate(-5831 -15351)"
                    fill="none"
                    stroke="#fff"
                    stroke-width="1"
                  />
                  <path
                    id="Pfad_39"
                    data-name="Pfad 39"
                    d="M5924.6,15413s-3.2,7.8-7.2,9.6,8.2-7.4,8.2-7.4l2.8,10.2"
                    transform="translate(-5831 -15351)"
                    fill="none"
                    stroke="#fff"
                    stroke-width="1"
                  />
                </g>
              </svg>
            </button>
            <!-- <button class="pswp__button pswp__button--zoom" title="Zoom in/out">
              <svg
                class="pswp__show_on_zoomed_in"
                xmlns="http://www.w3.org/2000/svg"
                width="28.207"
                height="28.207"
                viewBox="0 0 28.207 28.207"
              >
                <g id="zoom_icon" data-name="zoom icon" transform="translate(-1747.5 -34)">
                  <g
                    id="Ellipse_9"
                    data-name="Ellipse 9"
                    transform="translate(1747.5 34)"
                    fill="none"
                    stroke="#fff"
                    stroke-width="2"
                  >
                    <circle cx="12" cy="12" r="12" stroke="none" />
                    <circle class="pswp__change_on_hover" cx="12" cy="12" r="11" fill="none" />
                  </g>
                  <line
                    id="Linie_213"
                    data-name="Linie 213"
                    x2="8"
                    y2="8"
                    transform="translate(1767 53.5)"
                    fill="none"
                    stroke="#fff"
                    stroke-width="2"
                  />
                  <line
                    id="Linie_214"
                    data-name="Linie 214"
                    x2="9"
                    transform="translate(1755 46.5)"
                    fill="none"
                    stroke="#fff"
                    stroke-width="2"
                  />
                </g>
              </svg>

              <svg
                class="pswp__show_normal"
                xmlns="http://www.w3.org/2000/svg"
                width="28.207"
                height="28.207"
                viewBox="0 0 28.207 28.207"
              >
                <g id="zoom_icon" data-name="zoom icon" transform="translate(-1747.5 -34)">
                  <g
                    id="Ellipse_9"
                    data-name="Ellipse 9"
                    transform="translate(1747.5 34)"
                    fill="none"
                    stroke="#fff"
                    stroke-width="2"
                  >
                    <circle cx="12" cy="12" r="12" stroke="none" />
                    <circle class="pswp__change_on_hover" cx="12" cy="12" r="11" fill="none" />
                  </g>
                  <line
                    id="Linie_213"
                    data-name="Linie 213"
                    x2="8"
                    y2="8"
                    transform="translate(1767 53.5)"
                    fill="none"
                    stroke="#fff"
                    stroke-width="2"
                  />
                  <line
                    id="Linie_214"
                    data-name="Linie 214"
                    x2="9"
                    transform="translate(1755 46.5)"
                    fill="none"
                    stroke="#fff"
                    stroke-width="2"
                  />
                  <line
                    id="Linie_215"
                    data-name="Linie 215"
                    x2="9"
                    transform="translate(1759.5 42) rotate(90)"
                    fill="none"
                    stroke="#fff"
                    stroke-width="2"
                  />
                </g>
              </svg>
            </button>
            <button class="pswp__button pswp__button--share" title="Share">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="28" viewBox="0 0 25 28">
                <g id="share_icon" data-name="share icon" transform="translate(-1748 -34)">
                  <g
                    id="Ellipse_6"
                    data-name="Ellipse 6"
                    transform="translate(1763 34)"
                    fill="none"
                    stroke="#fff"
                    stroke-width="2"
                  >
                    <circle cx="5" cy="5" r="5" stroke="none" />
                    <circle class="pswp__change_on_hover" cx="5" cy="5" r="4" fill="none" />
                  </g>
                  <g
                    id="Ellipse_7"
                    data-name="Ellipse 7"
                    transform="translate(1763 52)"
                    fill="none"
                    stroke="#fff"
                    stroke-width="2"
                  >
                    <circle cx="5" cy="5" r="5" stroke="none" />
                    <circle class="pswp__change_on_hover" cx="5" cy="5" r="4" fill="none" />
                  </g>
                  <g
                    id="Ellipse_8"
                    data-name="Ellipse 8"
                    transform="translate(1748 43)"
                    fill="none"
                    stroke="#fff"
                    stroke-width="2"
                  >
                    <circle cx="5" cy="5" r="5" stroke="none" />
                    <circle cx="5" class="pswp__change_on_hover" cy="5" r="4" fill="none" />
                  </g>
                  <line
                    id="Linie_211"
                    data-name="Linie 211"
                    x1="8"
                    y2="5"
                    transform="translate(1756.5 41.5)"
                    fill="none"
                    stroke="#fff"
                    stroke-width="2"
                  />
                  <line
                    id="Linie_212"
                    data-name="Linie 212"
                    x1="8"
                    y1="5"
                    transform="translate(1756.5 50.5)"
                    fill="none"
                    stroke="#fff"
                    stroke-width="2"
                  />
                </g>
              </svg>
            </button>
            <button class="pswp__button pswp__button--fs" title="Toggle fullscreen">
              <svg
                class="pswp__show_normal"
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="28"
                viewBox="0 0 34 28"
              >
                <g
                  id="fullscreen_icon"
                  data-name="fullscreen icon"
                  transform="translate(-1946.5 -34)"
                >
                  <path
                    id="Pfad_100"
                    data-name="Pfad 100"
                    d="M1831.5,41V33h11"
                    transform="translate(116 2)"
                    fill="none"
                    stroke="#fff"
                    stroke-width="2"
                  />
                  <path
                    id="Pfad_101"
                    data-name="Pfad 101"
                    d="M1831.5,41V33h11"
                    transform="translate(3811 94) rotate(180)"
                    fill="none"
                    stroke="#fff"
                    stroke-width="2"
                  />
                  <path
                    id="Pfad_102"
                    data-name="Pfad 102"
                    d="M1842.5,41V33h-11"
                    transform="translate(137 2)"
                    fill="none"
                    stroke="#fff"
                    stroke-width="2"
                  />
                  <path
                    id="Pfad_103"
                    data-name="Pfad 103"
                    d="M0,0V8H11"
                    transform="translate(1947.5 53)"
                    fill="none"
                    stroke="#fff"
                    stroke-width="2"
                  />
                </g>
              </svg>

              <svg
                class="pswp__show_on_fullscreen"
                xmlns="http://www.w3.org/2000/svg"
                width="33"
                height="28"
                viewBox="0 0 33 28"
              >
                <g
                  id="fullscreen_icon"
                  data-name="fullscreen icon"
                  transform="translate(-1946.5 -34)"
                >
                  <path
                    id="Pfad_100"
                    data-name="Pfad 100"
                    d="M1831.5,41V33h11"
                    transform="translate(137 21)"
                    fill="none"
                    stroke="#fff"
                    stroke-width="2"
                  />
                  <path
                    id="Pfad_101"
                    data-name="Pfad 101"
                    d="M1831.5,41V33h11"
                    transform="translate(3789 75) rotate(180)"
                    fill="none"
                    stroke="#fff"
                    stroke-width="2"
                  />
                  <path
                    id="Pfad_102"
                    data-name="Pfad 102"
                    d="M1842.5,41V33h-11"
                    transform="translate(115 21)"
                    fill="none"
                    stroke="#fff"
                    stroke-width="2"
                  />
                  <path
                    id="Pfad_103"
                    data-name="Pfad 103"
                    d="M0,0V8H11"
                    transform="translate(1968.5 34)"
                    fill="none"
                    stroke="#fff"
                    stroke-width="2"
                  />
                </g>
              </svg>
            </button>

            <button class="pswp__button pswp__button--close" title="Close (Esc)">
              <svg
                id="hamburger_close"
                data-name="hamburger close"
                xmlns="http://www.w3.org/2000/svg"
                width="28.284"
                height="28.284"
                viewBox="0 0 28.284 28.284"
              >
                <rect
                  id="Rechteck_63"
                  data-name="Rechteck 63"
                  width="38"
                  height="2"
                  transform="translate(1.414) rotate(45)"
                  fill="#fff"
                />
                <rect
                  id="Rechteck_65"
                  data-name="Rechteck 65"
                  width="38"
                  height="2"
                  transform="translate(0 26.87) rotate(-45)"
                  fill="#fff"
                />
              </svg>
            </button>-->
          </div>

          <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
          <!-- element will get class pswp__preloader--active when preloader is running -->
          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="pswp__controlls_nav">
          <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
            <svg xmlns="http://www.w3.org/2000/svg" width="60.5" height="9" viewBox="0 0 60.5 9">
              <g id="arrow_left" data-name="arrow left" transform="translate(-20 -559)">
                <path
                  id="Pfad_109"
                  data-name="Pfad 109"
                  d="M4.5-6,9,7H0Z"
                  transform="translate(26 568) rotate(-90)"
                  fill="#fff"
                />
                <line
                  id="Linie_216"
                  data-name="Linie 216"
                  x2="48"
                  transform="translate(32.5 563.5)"
                  fill="none"
                  stroke="#fff"
                  stroke-width="1"
                />
              </g>
            </svg>
          </button>
          <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
            <svg
              id="arrow_right"
              data-name="arrow right"
              xmlns="http://www.w3.org/2000/svg"
              width="60.5"
              height="9"
              viewBox="0 0 60.5 9"
            >
              <path
                id="Pfad_110"
                data-name="Pfad 110"
                d="M4.5,13,9,0H0Z"
                transform="translate(47.5 9) rotate(-90)"
                fill="#fff"
              />
              <line
                id="Linie_217"
                data-name="Linie 217"
                x1="48"
                transform="translate(0 4.5)"
                fill="none"
                stroke="#fff"
                stroke-width="1"
              />
            </svg>
          </button>
        </div>

        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
          <div class="pswp__share-tooltip"></div>
        </div>

        <!-- <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>

        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>-->

        <div class="pswp__caption">
          <div class="pswp__caption__center"></div>
        </div>
        <div class="pswp__yellowborder"></div>
      </div>
    </div>
  </div>
</template>
