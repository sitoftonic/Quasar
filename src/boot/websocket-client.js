import Vue from 'vue';
import SocketIO from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import config from '../configs/config'


export default ({ app }) => {
  // Set i18n instance on app
  Vue.use(new VueSocketIO({
      debug: true,
      connection: SocketIO(config.apiPath), //options object is Optional
      vuex: {
        store: app.store,
        actionPrefix: "SOCKET_",
        mutationPrefix: "SOCKET_"
      }
    })
  )
}


