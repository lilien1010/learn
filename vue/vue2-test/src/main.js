// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import * as msgApi from './api'
import store from './store'
/*
import VueMaterial from 'vue-material'

import 'vue-material/dist/vue-material.css'
*/
import 'assets/message.css'
import 'assets/rocket.css'
import 'assets/theme.css'


Vue.config.debug = true

Vue.filter('time', timestamp => {
  return new Date(timestamp).toLocaleTimeString()
})


var loginID = window.location.pathname.substr(1,10)
if(loginID && loginID.length>=5 && /^\d+$/.test(loginID)){
  var userid=parseInt(loginID)
  msgApi.startLogin({userid:userid})
}else{
  debugger
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
