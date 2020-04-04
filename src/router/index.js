import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import config from '../configs/config'
import axios from 'axios'
import secureStorage from '../configs/secureStorage'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
function checkTokenValidity (token, next) {
  axios
    .post(config.apiPath + 'token', { token })
    .then(ans => {
      if (ans.data.check === 'valid') {
        next()
      }
      else {
        secureStorage.clear()
        next({ name: 'login' })
      }
    })
}

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    //mode: process.env.VUE_ROUTER_MODE,
    mode: 'history',
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    try {
      const token = secureStorage.getItem('token')
      if (to.name !== 'login' && to.name !== 'signup') {
        if (token) {
          checkTokenValidity(token, next)
        }
        else {
          next({ name: 'login' })
        }
      }
      else {
        if (token) {
          next({ name: 'dashboard' })
        }
        else {
          next()
        }
      }
    } catch (e) {
      // TODO log error
      console.log(e)
      secureStorage.clear()
      next({ name: 'login' })
    }
  })

  return Router
}
