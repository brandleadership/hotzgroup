export const state = () => ({
  isLoading: true,
  showCounter: false,
  loaderimages: {},
  lastRoute: '',
  device: {},
  current: 0,
  amount: 0,
  // cache: {
  //   nav: {},
  //   pages: {},
  //   pillars: {},
  // },
})

export const mutations = {
  isLoading(state, isLoading) {
    state.isLoading = isLoading
  },
  setLoaderImages(state, images) {
    state.loaderimages.images = images
  },
  setLastRoute(state, route) {
    state.lastRoute = route
  },
  setAmount(state, amount) {
    state.amount = amount
  },
  setCurrent(state, current) {
    state.current = current
  },
  setShowCounter(state, showCounter) {
    state.showCounter = showCounter
  },
  // cachePages(state, pages) {
  //   state.cache.pages = pages
  // },
  // cacheNav(state, nav) {
  //   state.cache.nav = nav
  // },
  setDevice(state, device) {
    state.device = device.device
  },
}

export const getters = {
  getLoading(state) {
    return state.isLoading
  },

  getLoaderImages(state) {
    return state.loaderimages.images
  },

  getLastRoute(state) {
    return state.lastRoute
  },
  getAmount(state) {
    return state.amount
  },
  getCurrent(state) {
    return state.current
  },
  getShowCounter(state) {
    return state.showCounter
  },
  // getPages(state) {
  //   return state.cache.pages
  // },
  // getNav(state) {
  //   return state.cache.nav
  // },
  // getRoute(state) {
  //   return state.route
  // },
  getDevice(state) {
    return state.device
  },
}
