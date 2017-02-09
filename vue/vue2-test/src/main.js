// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'Vuex'
import App from './App'

/**/
import VueMaterial from 'vue-material'

import 'vue-material/dist/vue-material.css'

import 'assets/message.css'
import 'assets/rocket.css'

Vue.use(VueMaterial)

import store from './store'
//
//
Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
