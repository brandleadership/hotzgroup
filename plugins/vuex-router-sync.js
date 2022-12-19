import { sync } from 'vuex-router-sync'
// import store from '../store'
// import router from '~router'

export default ({ app, store }) => {
  sync(app.store, app.router)
}
