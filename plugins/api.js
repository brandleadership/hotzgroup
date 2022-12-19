import Vue from 'vue'
import sbApi from '../scripts/api'

export default ({
  app,
  isDev,
  query
}, inject) => {
  // isDev = false
  const api = sbApi({
    app,
    isDev,
    query
  })
  app.sbApi = api
  inject('sbApi', api)
}
