<script>
import SpatzekScroll from '~/scripts/SpatzekScroll'
import { gsap } from 'gsap'
import { CSSRulePlugin } from 'gsap/CSSRulePlugin'
import { createSbUrl, testWebpSupport } from '~/scripts/utils'

/**
 * component to handle stoyblock images

imgParams: {
  width: int
  height: int
  fitIn: bool
  smartcrop: bool
  filters: string
  fullscreen: bool -> automaticaly calc the size based on screen width and height
  fullscreenGap: int -> gap to be added in fullscreen mode
  fullscreenUseVh: int -> 
  useSrcset: bool
}
 * sample:
 <Sbimage  :imgParams="{src: item.content.image_overview,width:100,height:100,fitIn:true, filters:'fill(transparent):format(png)' }" />

 * for more information read https://www.storyblok.com/docs/image-service
 */

gsap.registerPlugin(CSSRulePlugin)

export default {
  name: 'Sbimage',
  components: {},
  params: [
    'imgParams', // top -> down for srcs  // default image for 2560
    //=imageParams 'imgParamsDesktopXXL', // larger/equal 2260
    'imgParamsDesktopL', // larger/equal 1920
    'imgParamsTabletXXL', // larger 1366
    'imgParamsTabletL', // tabletL
    'imgParamsTablet', // phone to tablet
    'imgParamsPhone', // 0 -> phone
    'class',
    'usesrcset',
    'lazy',
    'alt',
    'forcewebp',
    'loadPreviewPic',
    //'autofit': 'width' // -> au
  ],
  data() {
    //andere schreibweise für function() {

    return {
      breakpoints: {},
      usesrcset: true,
      loadLazy: false,
      previewPicLoaded: false,
      loadedLazy: false,
      isInViewPort: true,
      nuxtLoader: undefined,
      isMounted: false,
      useWebp: this.$attrs.imgParams.forcewebp === true,
      maxWh: 4000,
      maxDensity: 2,
      src: '',
      srcset: '',
      width: 0,
      height: 0,
    }
  },
  computed: {
    rndId: function() {
      return 'sbimage-' + Math.floor(Math.random() * 100000000000)
    },
    /* srcset: function() {
      //return ''
      if (!this.usesrcset) return

      if (this.loadLazy) return this.getSrcset()
    }, */
    alt: function() {
      if (!this.$attrs.imgParams) return
      if (!this.$attrs.imgParams.src) return
      if (this.$attrs.imgParams.alt) {
        return this.$attrs.imgParams.alt
      }
      const arrUrlParts = this.$attrs.imgParams.src.split('/')
      let filename = arrUrlParts[arrUrlParts.length - 1]
        .split('.')[0]
        .replace(/-/g, ' ')
        .replace(/^(.)|\s+(.)/g, function($1) {
          return $1.toUpperCase()
        })

      return filename
    },
    /* src: function() {
      if (!this.isMounted) return this.getSrcLazy()

      if (!this.loadLazy && !this.checkIsInViewPort()) {
        return this.getSrcLazy()
      } else {
        return this.getSrc()
      }
    }, */
  },
  created: function() {},

  mounted: function() {
    this.useWebp = testWebpSupport()

    let imgParams = this.$attrs.imgParams

    if (!imgParams) {
      console.error('Imageparams not set')
      return
    }

    this.spatzekscroll = SpatzekScroll()

    // this.testWebpSupport()

    this.width = this.getWidth()
    this.height = this.getHeight()

    this.$nextTick(() => {
      // test if we should show the Lazy image
      //if (
      //!this.loadLazy
      // && !this.checkIsInViewPort()
      //) {
      if (this.$attrs.imgParams.loadPreviewPic) {
        this.src = this.getSrcLazy()
      } else {
        this.src = this.getSrc()
      }

      //} else {
      //  this.src = this.getSrc()
      //}

      // if (this.loadLazy)
      // this.srcset = this.getSrcset()
      // this.initLazyLoad()
      this.isMounted = true

      // if (this.checkIsInViewPort()) {
      this.nuxtLoader = this.$nuxt.$loading
      if (this.nuxtLoader.addSbImageToWaitFor)
        this.nuxtLoader.addSbImageToWaitFor(this)

      // this.isInViewPort = true

      // console.log('is in viewport load it')

      // this.load()
      this.loadedLazy = true
      // } else {
      this.isInViewPort = false
      // }

      //alert(this.isInViewPort)
    })
  },

  methods: {
    testWebpSupport: function() {
      return testWebpSupport()
    },
    triggerLazyLoad: function() {
      this.load()
    },
    initLazyLoad: function() {
      let dummyTl = gsap.timeline({
        onComplete: () => {
          // contains
          //console.log('on complete', this.$el)
          this.load()
        },
        paused: true,
      })

      var rule = CSSRulePlugin.getRule('img', this.$el)

      //dummyTl.to(rule, { duration: 0.1, x: 0 })
      dummyTl.to(this.$el, {
        duration: 0.1,
        marginTop: 0,
        clearProps: 'marginTop',
      })

      this.spatzekscroll.addScene({
        triggerElement: this.$el,
        hook: 1,
        reTrigger: false,
        tween: dummyTl,
        // duration: 20,
      })
    },
    setSpatzekscrolltainer: function(scrolltainer) {
      this.spatzekscroll = SpatzekScroll({ scrolltainer: scrolltainer })
      this.initLazyLoad()
    },
    load: function(fromInterval) {
      this.loadLazy = true
      this.src = this.getSrc()
      this.srcset = this.getSrcset()
    },
    getSrcLazy: function() {
      let imgParams = { ...this.$attrs.imgParams }
      imgParams = this.extractSizeFromUrl(imgParams)
      if (imgParams.fullscreen)
        imgParams = this.calcFullscreenDimensions(imgParams)

      //if (imgParams.width) imgParams.width = imgParams.width * 0.3
      //if (imgParams.height) imgParams.height = imgParams.height * 0.3

      // “https://img2.storyblok.com/0x1080/filters:quality(90):format(webp)/f/72501/2550x1440/ff2a896ae1/land-of-fishermen.jpg

      imgParams.quality = 10
      const imageSrc = this.getImageSrc(imgParams)
      return this.getImageSrc(imgParams) // fallback -<default image
    },
    getSrc: function() {
      let imgParams = { ...this.$attrs.imgParams }
      imgParams = this.extractSizeFromUrl(imgParams)
      if (imgParams.fullscreen)
        imgParams = this.calcFullscreenDimensions(imgParams)

      return this.getImageSrc(imgParams, true) // fallback -<default image
    },

    getWidth: function() {
      let imgParams = this.$attrs.imgParams
      return imgParams.width
    },

    getHeight: function() {
      let imgParams = { ...this.$attrs.imgParams }
      imgParams = this.extractSizeFromUrl(imgParams)

      if (imgParams.fullscreen)
        imgParams = this.calcFullscreenDimensions(imgParams)

      if (imgParams.height) {
        if (imgParams.fullscreen) {
        }
        return imgParams.height
      } else {
        // berechnen aufgrund original dimensions

        var factor = imgParams.width / imgParams.orgDimensions.width
        return Math.ceil(imgParams.orgDimensions.height * factor)
      }
      return ''
    },

    getSrcset: function() {
      let imgParams = this.$attrs.imgParams // default image for desctop

      var srcset = ''
      imgParams = this.extractSizeFromUrl(imgParams)

      if (this.$attrs.imgParams.fullscreen) {
        imgParams = this.calcFullscreenDimensions(imgParams)

        var srcset = this.getImageSrc(imgParams) + ' ' + imgParams.width + 'w, '
        srcset += this.getImageSrc(imgParams, true, 1.5) + ' 1.5x, '
        srcset += this.getImageSrc(imgParams, true, 2) + ' 2x, '
        srcset += this.getImageSrc(imgParams, true, 2.5) + ' 2.5x, '
        srcset += this.getImageSrc(imgParams, true, 3) + ' 3x '
      } else if (imgParams.bp) {
        Object.keys(imgParams.bp).forEach(breakpoint => {
          //console.log(breakpoint, imgParams.bp[breakpoint])
          let breakpointData = imgParams.bp[breakpoint]
          let breakPointImageParams = { ...imgParams }

          breakPointImageParams.width = breakpointData.width

          if (breakpointData.height) {
            breakPointImageParams.height = breakpointData.height
          }

          if (!breakpointData.height && imgParams.height) {
            // berechnen
            let sizeFactor = imgParams.width / breakpointData.width
            breakPointImageParams.height = Math.ceil(
              imgParams.height / sizeFactor
            )
          }

          if (breakpointData.dpr == undefined || breakpointData.dpr == true) {
            srcset +=
              this.getImageSrc(breakPointImageParams, true) +
              ' ' +
              (parseInt(breakpoint) + 1) * window.devicePixelRatio +
              'w, '
          } else {
            srcset +=
              this.getImageSrc(breakPointImageParams, true) +
              ' ' +
              (parseInt(breakpoint) + 1) +
              'w, '
          }
        })

        // eintrag für das größte bild
        srcset +=
          this.getImageSrc(imgParams, true) +
          ' ' +
          (parseInt(2560) + 1) * window.devicePixelRatio +
          'w, '
        // srcset += this.getImageSrc(imgParams, true, 1.5) + ' ' + 2560 * 1.5 + 'w, '
        // srcset += this.getImageSrc(imgParams, true, 2) + ' ' + 2560 * 2 + 'w, '
        // srcset += this.getImageSrc(imgParams, true, 2.5) + ' ' + 2560 * 2.5 + 'w, '
        // srcset += this.getImageSrc(imgParams, true, 3) + ' ' + 2560 * 3 + 'w, '
      }

      return srcset

      // TODO: auto set manuel image width

      // go bottom down for srcset

      const baseWidth = 2560 // for calculation
      const sidebarWidth = 100
      const sideOffset = 60
      const sideOffsetM = 60
      const sideOffsetS = 20

      const breakpointDesktopXXL = 2260
      const breakpointDesktopL = 1920
      const breakpointTabletXXL = 1365
      const breakpointTabletL = 1024
      const breakpointTablet = 767
      const breakpointPhoneL = 376

      //let imgParamsDesktopXXL = this.$attrs.imgParamsDesktopXXL ? this.$attrs.imgParamsDesktopXXL : { ...imgParams }
      let imgParamsDesktopL = this.$attrs.imgParamsDesktopL
        ? { ...imgParams, ...this.$attrs.imgParamsDesktopL }
        : { ...imgParams }
      let imgParamsTabletXXL = this.$attrs.imgParamsTabletXXL
        ? { ...imgParams, ...this.$attrs.imgParamsDesktopL }
        : { ...imgParamsDesktopL }
      let imgParamsTabletL = this.$attrs.imgParamsTabletL
        ? { ...imgParamsTabletXXL, ...this.$attrs.imgParamsDesktopL }
        : { ...imgParamsTabletXXL }
      let imgParamsTablet = this.$attrs.imgParamsTablet
        ? { ...imgParamsTabletL, ...this.$attrs.imgParamsTablet }
        : { ...imgParamsTabletL }
      let imgParamsPhoneL = this.$attrs.imgParamsPhoneL
        ? { ...imgParamsTablet, ...this.$attrs.imgParamsPhoneL }
        : { ...imgParamsTablet }
      let imgParamsPhone = this.$attrs.imgParamsPhone
        ? { ...imgParamsPhoneL, ...this.$attrs.imgParamsPhone }
        : { ...imgParamsPhoneL }

      imgParams = this.extractSizeFromUrl(imgParams) // default für
      imgParamsDesktopL = this.extractSizeFromUrl(imgParamsDesktopL)
      imgParamsTabletXXL = this.extractSizeFromUrl(imgParamsTabletXXL)
      imgParamsTabletL = this.extractSizeFromUrl(imgParamsTabletL)
      imgParamsTablet = this.extractSizeFromUrl(imgParamsTablet)
      imgParamsPhoneL = this.extractSizeFromUrl(imgParamsPhoneL)
      imgParamsPhone = this.extractSizeFromUrl(imgParamsPhone)

      const size_factor = baseWidth / breakpointDesktopL

      // TODO: Sidebar mit einberechnen und jeweiligen sideoffset
      const sizefactorDesctopL =
        (baseWidth - sidebarWidth - sideOffset * 2) / breakpointDesktopL
      const sizefactorTabletXXL =
        (baseWidth - sidebarWidth - sideOffset * 2) / breakpointTabletXXL
      const sizefactorTabletL =
        (baseWidth - sidebarWidth - sideOffset * 2) / breakpointTabletL
      const sizefactorTablet =
        (baseWidth - sidebarWidth - sideOffsetM * 2) / breakpointTablet
      const sizefactorPhoneL =
        (baseWidth - sidebarWidth - sideOffsetS * 2) / breakpointPhoneL
      const sizefactorPhone =
        (baseWidth - sidebarWidth - sideOffsetS * 2) / breakpointPhoneL

      if (imgParamsDesktopL.width)
        imgParamsDesktopL.width = Math.ceil(
          imgParamsDesktopL.width / sizefactorDesctopL
        )
      if (imgParamsDesktopL.height)
        imgParamsDesktopL.height = Math.ceil(
          imgParamsDesktopL.height / sizefactorDesctopL
        )

      if (imgParamsTabletXXL.width)
        imgParamsTabletXXL.width = Math.ceil(
          imgParamsTabletXXL.width / sizefactorTabletXXL
        )
      if (imgParamsTabletXXL.height)
        imgParamsTabletXXL.height = Math.ceil(
          imgParamsTabletXXL.height / sizefactorTabletXXL
        )

      if (imgParamsTabletL.width)
        imgParamsTabletL.width = Math.ceil(
          imgParamsTabletL.width / sizefactorTabletL
        )
      if (imgParamsTabletL.height)
        imgParamsTabletL.height = Math.ceil(
          imgParamsTabletL.height / sizefactorTabletL
        )

      if (imgParamsTablet.width)
        imgParamsTablet.width = Math.ceil(
          imgParamsTablet.width / sizefactorTablet
        )
      if (imgParamsTablet.height)
        imgParamsTablet.height = Math.ceil(
          imgParamsTablet.height / sizefactorTablet
        )

      if (imgParamsPhoneL.width)
        imgParamsPhoneL.width = Math.ceil(
          imgParamsPhoneL.width / sizefactorPhoneL
        )
      if (imgParamsPhoneL.height)
        imgParamsPhoneL.height = Math.ceil(
          imgParamsPhoneL.height / sizefactorPhoneL
        )

      if (imgParamsPhone.width)
        imgParamsPhone.width = Math.ceil(imgParamsPhone.width / sizefactorPhone)
      if (imgParamsPhone.height)
        imgParamsPhone.height = Math.ceil(
          imgParamsPhone.height / sizefactorPhone
        )

      // fullscreenmode
      // automatisch an screen größe anpassen
      /* if (imgParams.fullscreen) {
        // screen height > width -> portrait
        imgParams = this.calcFullscreenDimensions(imgParams)
      } */

      // TODO: parameter für gap hinzufügen (oversize)

      // bildverhältniss mode -> width: höhe automatisch anpassen

      // bildgrößen automatisch verkleinern anhand des faktors
      /* if (!this.$attrs.imgParamsPhone) {
        if (imgParamsPhone.width) imgParamsPhone.width = parseInt(imgParamsPhoneL.width / factorPhone)

        if (imgParamsPhone.height) imgParamsPhone.height = parseInt(imgParamsPhoneL.height / factorPhone)
      }

      if (!this.$attrs.imgParamsPhoneL) {
        if (imgParamsPhoneL.width) imgParamsPhoneL.width = parseInt(imgParamsPhoneL.width / factorPhoneL) // um den factor der 768 verkleinern

        if (imgParamsPhoneL.height) imgParamsPhoneL.height = parseInt(imgParamsPhoneL.height / factorPhoneL) // um den factor der 768 verkleinern
      } */

      let imageParamsTapletLandscape = imgParamsTablet
      /* var srcset = this.getImageSrc(imgParamsPhone, true) + ' ' + imgParamsPhone.width + 'w, '
      srcset += this.getImageSrc(imgParamsPhoneL, true) + ' ' + imgParamsPhoneL.width + 'w, '
      srcset += this.getImageSrc(imgParamsTablet, true) + ' ' + imgParamsTablet.width + 'w, '
      srcset += this.getImageSrc(imgParamsTabletL, true) + ' ' + imgParamsTabletL.width + 'w, '
      srcset += this.getImageSrc(imgParamsTabletXXL, true) + ' ' + imgParamsTabletXXL.width + 'w, '
      srcset += this.getImageSrc(imgParamsDesktopL, true) + ' ' + imgParamsDesktopL.width + 'w, '
      srcset += this.getImageSrc(imgParams, true) + ' ' + imgParams.width + 'w, ' */

      var srcset =
        this.getImageSrc(imgParamsPhone, true) +
        ' ' +
        (breakpointPhoneL - 1) +
        'w, '
      srcset +=
        this.getImageSrc(imgParamsPhoneL, true) + ' ' + breakpointPhoneL + 'w, '
      srcset +=
        this.getImageSrc(imgParamsTablet, true) + ' ' + breakpointTablet + 'w, '
      srcset +=
        this.getImageSrc(imgParamsTabletL, true) +
        ' ' +
        breakpointTabletL +
        'w, '
      srcset +=
        this.getImageSrc(imgParamsTabletXXL, true) +
        ' ' +
        breakpointTabletXXL +
        'w, '
      srcset +=
        this.getImageSrc(imgParamsDesktopL, true) +
        ' ' +
        breakpointDesktopL +
        'w, '
      // srcset += this.getImageSrc(imgParams, true) + ' ' + breakpointDesktopXXL + 'w, '

      /* srcset += this.getImageSrc(imgParams, true, 2) + ' 2x, '
      srcset += this.getImageSrc(imgParams, true, 2.5) + ' 2.5x, '
      srcset += this.getImageSrc(imgParams, true, 3) + ' 3x, ' */

      // 100er steps from large to smal
      let largest = imgParams.width * 3

      /* srcset = ''
      let myParams = { ...imgParams }
      myParams.width = largest
      srcset += this.getImageSrc(myParams) + ' ' + myParams.width + 'w, '

      for (var size = 100 * Math.floor(largest / 100); size >= 300; size -= 100) {
        var scaleFactor = largest / size
        let myParams = { ...imgParams }
        myParams.width = size
        srcset += this.getImageSrc(myParams) + ' ' + myParams.width + 'w, '
      } */

      // srcset += this.getImageSrc(imgParamsPhone, true, 2) + ' 2x, '
      // srcset += this.getImageSrc(imgParamsPhoneL, true, 2) + ' 2x, '
      // srcset += this.getImageSrc(imgParamsTablet, true, 2) + ' 2x, '
      // srcset += this.getImageSrc(imgParamsTabletL, true, 2) + ' 2x, '
      // srcset += this.getImageSrc(imgParamsTabletXXL, true, 2) + ' 2x, '
      // srcset += this.getImageSrc(imgParamsDesktopL, true, 2) + ' 2x, '
      // srcset += this.getImageSrc(imgParams, true, 2) + ' 2x, '

      /* srcset += this.getImageSrc(imgParamsPhone, true, 2.5) + ' ' + imgParamsPhone.width + 'w 2.5x, '
      srcset += this.getImageSrc(imgParamsPhoneL, true, 2.5) + ' ' + imgParamsPhoneL.width + 'w 2.5x, '
      srcset += this.getImageSrc(imgParamsTablet, true, 2.5) + ' ' + imgParamsTablet.width + 'w 2.5x, '
      srcset += this.getImageSrc(imgParamsTabletL, true, 2.5) + ' ' + imgParamsTabletL.width + 'w 2.5x, '
      srcset += this.getImageSrc(imgParamsTabletXXL, true, 2.5) + ' ' + imgParamsTabletXXL.width + 'w 2.5x, '
      srcset += this.getImageSrc(imgParamsDesktopL, true, 2.5) + ' ' + imgParamsDesktopL.width + 'w 2.5x, '
      srcset += this.getImageSrc(imgParams, true, 2.5) + ' ' + imgParams.width + 'w 2.5x, '

      srcset += this.getImageSrc(imgParamsPhone, true, 3) + ' ' + imgParamsPhone.width + 'w 3x, '
      srcset += this.getImageSrc(imgParamsPhoneL, true, 3) + ' ' + imgParamsPhoneL.width + 'w 3x, '
      srcset += this.getImageSrc(imgParamsTablet, true, 3) + ' ' + imgParamsTablet.width + 'w 3x, '
      srcset += this.getImageSrc(imgParamsTabletL, true, 3) + ' ' + imgParamsTabletL.width + 'w 3x, '
      srcset += this.getImageSrc(imgParamsTabletXXL, true, 3) + ' ' + imgParamsTabletXXL.width + 'w 3x, '
      srcset += this.getImageSrc(imgParamsDesktopL, true, 3) + ' ' + imgParamsDesktopL.width + 'w 3x, '
      srcset += this.getImageSrc(imgParams, true, 3) + ' ' + imgParams.width + 'w 3x, ' */

      //srcset += this.getImageSrc(imgParams, true, 2) + ' ' + imgParams.width * 2 + 'w 2x, '
      //srcset += this.getImageSrc(imgParams, true, 2.5) + ' ' + imgParams.width * 2.5 + 'w 2.5x, '
      //srcset += this.getImageSrc(imgParams, true, 3) + ' ' + imgParams.width * 3 + 'w 3x, '

      // TODO: highres bilder

      //srcset += this.getImageSrc(imgParamsTabletL) + ' 768w, '
      return srcset
    },

    getImageSrc: function(imgParams, retina, density) {
      if (!imgParams) {
        return
      }

      let src = imgParams.src

      if (!src) {
        return
      }

      if (!imgParams.width) imgParams.width = 0
      if (!imgParams.height) imgParams.height = 0

      if (retina && density !== undefined) {
        if (imgParams.width)
          imgParams.width_retina = Math.ceil(imgParams.width * density)
        else imgParams.width_retina = 0

        if (imgParams.height)
          imgParams.height_retina = Math.ceil(imgParams.height * density)
        else imgParams.height_retina = 0
      } else if (retina) {
        if (imgParams.width)
          imgParams.width_retina = Math.ceil(
            imgParams.width *
              (window.devicePixelRatio > this.maxDensity
                ? this.maxDensity
                : window.devicePixelRatio)
          )
        else imgParams.width_retina = 0

        if (imgParams.height)
          imgParams.height_retina = Math.ceil(
            imgParams.height *
              (window.devicePixelRatio > this.maxDensity
                ? this.maxDensity
                : window.devicePixelRatio)
          )
        else imgParams.height_retina = 0
      }

      // TODO: check if retina width/height is larger than the original sizes
      // resize it

      if (imgParams.orgDimensions.width < imgParams.width_retina) {
        let ratio = imgParams.orgDimensions.width / imgParams.width_retina

        imgParams.width_retina = Math.ceil(imgParams.width_retina * ratio)
        imgParams.height_retina = Math.ceil(imgParams.height_retina * ratio)
      }

      // check if size is larger max

      if (imgParams.width_retina > this.maxWh) {
        // scale it to the max
        var scale_factor = imgParams.width_retina / this.maxWh
        imgParams.width_retina = this.maxWh
        imgParams.height_retina = Math.ceil(
          imgParams.height_retina / scale_factor
        )
      }

      if (imgParams.height_retina > this.maxWh) {
        // scale it to the max
        var scale_factor = imgParams.height_retina / this.maxWh
        imgParams.height_retina = this.maxWh
        imgParams.width_retina = Math.ceil(
          imgParams.width_retina / scale_factor
        )
      }

      // if ((window.devicePixelRatio && window.devicePixelRatio > 1) || retina) {

      if (retina) {
        // console.log('retina1', this.useWebp)
        return this.buildUrlRetina(imgParams, this.useWebp)
      } else {
        // console.log('retina2', this.useWebp)
        return this.buildUrl(imgParams, this.useWebp)
      }
    },

    buildUrl: function(imgParams, useWebp) {
      // console.log(createSbUrl(imgParams, useWebp))
      // console.log(useWebp)
      return createSbUrl(imgParams, useWebp)
      let imageService = 'https://img2.storyblok.com/'
      let path = imgParams.src
        .replace('https://a.storyblok.com', '')
        .replace('//a.storyblok.com', '')
        .replace('https://img2.storyblok.com/', '')
      let fitIn = imgParams.fitIn ? 'fit-in/' : ''

      let filters = '/filters:quality(90)'

      if (imgParams.quality) {
        filters = '/filters:quality(' + imgParams.quality + ')'
      }

      if (this.useWebp) {
        filters += ':format(webp)'
      }

      let smartcrop = imgParams.smartcrop ? '/smart' : ''

      return (imgParams.src =
        imageService +
        fitIn +
        imgParams.width +
        'x' +
        imgParams.height +
        smartcrop +
        filters +
        path)
    },

    buildUrlRetina: function(imgParams, useWebp) {
      let imageService = 'https://img2.storyblok.com/'
      let path = imgParams.src
        .replace('https://a.storyblok.com', '')
        .replace('//a.storyblok.com', '')
        .replace('https://img2.storyblok.com/', '')
      let fitIn = imgParams.fitIn ? 'fit-in/' : ''
      //let filters = this.$attrs.imgParams.filters ? '/filters:' + this.$attrs.imgParams.filters : ''
      let filters = '/filters:quality(90)'
      if (imgParams.quality) {
        filters = '/filters:quality(' + imgParams.quality + ')'
      }

      if (useWebp) {
        filters += ':format(webp)'
      }
      // console.log(useWebp, 'WTFOIDA')
      let smartcrop = imgParams.smartcrop ? '/smart' : ''

      return (imgParams.src_retina =
        imageService +
        fitIn +
        imgParams.width_retina +
        'x' +
        imgParams.height_retina +
        smartcrop +
        filters +
        path)
    },

    calcFullscreenDimensions: function(imgParams) {
      // immer den höheren wert verwenden
      let ratio = 1
      let screenHeight = screen.height
      let screenWidth = screen.width

      if (imgParams.fullscreenUseVh) {
        var vh = parseFloat(
          getComputedStyle(document.documentElement)
            .getPropertyValue('--vh')
            .replace('px', '')
        ) // #999999

        screenHeight = Math.ceil(vh * imgParams.fullscreenUseVh)
      }

      // todo: Screenheight for vh mode

      if (screen.width > screen.height) {
        // landscape mode

        ratio = imgParams.orgDimensions.width / screen.width

        // check if the resized image is to smal
        if (imgParams.orgDimensions.height / ratio < screenHeight) {
          // use height instead
          let scaleratio = imgParams.orgDimensions.height / screenHeight
          imgParams.height = screenHeight
          imgParams.width = Math.ceil(
            imgParams.orgDimensions.width / scaleratio
          )
        } else {
          let scaleratio = imgParams.orgDimensions.width / screenWidth
          imgParams.width = screenWidth
          imgParams.height = Math.ceil(
            imgParams.orgDimensions.height / scaleratio
          )
        }
      } else {
        ratio = imgParams.orgDimensions.width / screen.height
        // check if the resized image is to smal
        if (imgParams.orgDimensions.height / ratio < screenHeight) {
          let scaleratio = imgParams.orgDimensions.height / screenHeight
          imgParams.height = screen.height
          imgParams.width = Math.ceil(
            imgParams.orgDimensions.width / scaleratio
          )
        } else {
          imgParams.width = screenHeight

          let scaleratio = imgParams.orgDimensions.width / screenHeight
          imgParams.heigth = Math.ceil(
            imgParams.orgDimensions.height / scaleratio
          )
        }
      }

      return imgParams
    },

    extractSizeFromUrl: function(imgParams) {
      if (imgParams.src) {
        const arrUrlParts = imgParams.src.split('/')
        if (arrUrlParts[5]) {
          const size = arrUrlParts[5].split('x')
          imgParams.orgDimensions = { width: size[0], height: size[1] }
        }
      } else {
        imgParams.orgDimensions = { width: 0, height: 0 }
      }

      return imgParams
    },

    onLoad: function() {
      if (this.loadLazy) {
        this.loadedLazy = true
        // if (this.nuxtLoader != undefined) {
        //   requestAnimationFrame(() => {
        //     if (this.nuxtLoader.onSbImageLoaded)
        //       this.nuxtLoader.onSbImageLoaded(this)
        //   })
        // }
      } else {
        if (this.nuxtLoader != undefined) {
          if (this.nuxtLoader.onSbImageLoaded)
            this.nuxtLoader.onSbImageLoaded(this)
          // console.log(this)

          // if (this.checkIsInViewPort() && this.loadedLazy) {
          setTimeout(() => {
            this.load()
          }, 100)
          // }
        }

        this.previewPicLoaded = true
      }
    },

    onError: function() {
      if (this.loadLazy) {
        this.loadedLazy = true
        /* if (this.nuxtLoader != undefined) {
          if (this.nuxtLoader.onSbImageLoaded)
            this.nuxtLoader.onSbImageLoaded(this)
        } */
      } else {
        if (this.nuxtLoader != undefined) {
          if (this.nuxtLoader.onSbImageLoaded)
            this.nuxtLoader.onSbImageLoaded(this)
        }

        this.previewPicLoaded = true
      }
    },

    /* HELPER */
    checkIsInViewPort: function() {
      let windowOffset = document.documentElement.scrollTop
      let windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight
      let elementTop = this.$el.getBoundingClientRect().top + windowOffset

      return elementTop < windowOffset + windowHeight
    },

    isCached: function(src) {
      var imgEle = document.createElement('img')
      imgEle.src = src
      return imgEle.complete || imgEle.width + imgEle.height > 0
    },

    getBase64: function(url) {
      let imgParams = this.$attrs.imgParams
      return axios
        .get(url, {
          responseType: 'arraybuffer',
        })
        .then(response =>
          Buffer.from(response.data, 'binary').toString('base64')
        )
    },
  },
}
</script>

<template>
  <img
    :id="rndId"
    draggable="false"
    :width="width"
    :height="height"
    :class="{ sbimage: true, lazy: !loadedLazy && !isInViewPort }"
    :src="src"
    :srcset="srcset"
    :alt="alt"
    @load="() => onLoad()"
    @error="onError"
  />
</template>
<style>
.sbimage {
  /* transition: 1s filter linear; */
}
/* .lazy {
  filter: blur(4px);
}
.img-loaded {
  filter: blur(0px);
} */
</style>
