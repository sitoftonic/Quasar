import Vue from 'vue';
import config from '../configs/config'
import VueIziToast from 'vue-izitoast'

import 'izitoast/dist/css/iziToast.min.css';


export default () => {
  // Set i18n instance on app
  Vue.use(VueIziToast)
}
