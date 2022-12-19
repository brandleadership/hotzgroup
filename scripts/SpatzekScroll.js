import { find } from '~/scripts/elements.js'
import { addListener, removeListener } from '~/scripts/events'
import { gsap } from 'gsap'

const SpatzekScroll = settings => {
  // if (!window) return

  //Options
  let defaultOptions = {
    hook: 1, //end of VP
    reTrigger: false,
    duration: false,
    scrolltainer: window,
    // forcePlayFromZero: true
  }

  // Hier wird optional das Parent Element übergeben werden, welches statt dem window triggered:
  // im spatzekscroll aufruf dann zb:
  // this.spatzekscroll = SpatzekScroll({ scrolltainer: this.scrolltainer })

  let options = {
    ...defaultOptions,
    ...settings,
  }
  let scenes = []
  let windowOffset, windowHeight, elementTop, triggerHook

  const addScene = scene => {
    scenes.push({
      triggerElement: scene.triggerElement,
      hook: scene.hook,
      reTrigger:
        scene.reTrigger === undefined ? options.reTrigger : scene.reTrigger,
      tween: scene.tween,
      duration:
        scene.duration === undefined ? options.duration : scene.duration,
      alreadyDone: false,
    })
  }

  //animation based on trigger -> running fixed for X seconds
  const init = () => {
    ticking = false

    windowOffset =
      options.scrolltainer.pageYOffset || document.documentElement.scrollTop
    windowHeight =
      options.scrolltainer.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight

    for (var i = 0; i < scenes.length; i++) {
      //trigger based Animations:
      if (scenes[i].duration == false) {
        // console.log("TRIGGERANIMATION");
        elementTop =
          scenes[i].triggerElement.getBoundingClientRect().top + windowOffset
        triggerHook = windowOffset + windowHeight * scenes[i].hook

        if (elementTop <= triggerHook && scenes[i].alreadyDone === false) {
          scenes[i].tween.play(0)
          scenes[i].alreadyDone = true // avoid spamming
        }

        //reset on re-enter:
        if (elementTop > triggerHook && scenes[i].alreadyDone === true) {
          if (scenes[i].reTrigger == true) {
            scenes[i].tween.reverse() // retrigger both directions
          }
          scenes[i].alreadyDone = false
        }
      } else {
        //progress based Animations:

        // console.log("PROGRESSANIMATION");
        elementTop =
          scenes[i].triggerElement.getBoundingClientRect().top + windowOffset
        triggerHook = windowOffset + windowHeight * scenes[i].hook

        let scrolledSinceTrigger = triggerHook - elementTop
        //check if pixel or vieports
        let animDuration
        if (scenes[i].duration > 10) {
          animDuration = scenes[i].duration
        } else {
          animDuration = windowHeight * scenes[i].duration
        }

        let progress = (100 * scrolledSinceTrigger) / animDuration / 100
        if (progress < 0) {
          progress = 0
        } else if (progress > 1) {
          progress = 1
        }
        //set Tween on Progress:
        scenes[i].tween.progress(progress)
      }
    }
  }

  //https://www.html5rocks.com/en/tutorials/speed/animations/ -> guide to rAF
  let latestKnownScrollY = 0
  let ticking = false
  const onScroll = () => {
    latestKnownScrollY =
      options.scrolltainer.scrollY || options.scrolltainer.scrollTop
    tick()
  }
  const tick = () => {
    if (!ticking) {
      requestAnimationFrame(init)
      ticking = true
    }
  }
  const addListeners = () => {
    addListener(window, 'resize', onScroll)
    addListener(options.scrolltainer, 'scroll', onScroll)
  }

  addListener(window, 'load', onScroll)
  addListeners()

  const destroy = () => {
    // removeListener(window, 'load', onscroll)
    removeListener(window, 'resize', onScroll)
    removeListener(options.scrolltainer, 'scroll', onScroll)
  }

  // const reEnable = () => {
  //   for (var i = 0; i < scenes.length; i++) {
  //     scenes[i].tween.progress(1)
  //   }
  //   addListeners()
  // }

  const initiate = () => {
    init()
  }

  return {
    addScene,
    destroy,
    initiate,
    // reEnable
  }
}

export default SpatzekScroll
