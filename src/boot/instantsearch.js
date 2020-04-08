import Vue from 'vue';
import config from '../configs/config'
import InstantSearch from 'vue-instantsearch'


export default () => {
  // Set i18n instance on app
  Vue.use(InstantSearch)
}
