/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding startup/initialization code.
 * Use "quasar new boot <name>" and add it there.
 * One boot file per concern. Then reference the file(s) in quasar.conf.js > boot:
 * boot: ['file', ...] // do not add ".js" extension to it.
 *
 * Boot files are your "main.js"
 **/
import Vue from 'vue'
import './import-quasar.js'



import App from 'app/src/App.vue'


import createStore from 'app/src/store/index'

import createRouter from 'app/src/router/index'


import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

import config from '../src/configs/config'



export default async function () {
  // create store and router instances

  const store = typeof createStore === 'function'
    ? await createStore({Vue})
    : createStore

  const router = typeof createRouter === 'function'
    ? await createRouter({Vue, store})
    : createRouter

  // make router instance available in store
  store.$router = router

  Vue.use(new VueSocketIO({
    debug: true,
    connection: config.apiPath,
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    },
  }))

  // Create the app instantiation Object.
  // Here we inject the router, store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    el: '#q-app',
    router,
    store,
    render: h => h(App)
  }



  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return {
    app,
    store,
    router
  }
}
