// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import * as msgApi from './api'
import store from './store'
/*
import VueMaterial from 'vue-material'

import 'vue-material/dist/vue-material.css'

import 'assets/message.css'
import 'assets/rocket.css'
import 'assets/theme.css'
*/

Vue.config.debug = true


moment && moment.locale(navigator.browserLanguage?navigator.browserLanguage:navigator.language)
if(emojione){
  emojione.sprites  =   true
}

Vue.filter('datetime', timestamp => {
  return  moment(timestamp).format("YYYY MMM Do");
})

Vue.filter('time', timestamp => {
  return new Date(timestamp).toLocaleTimeString()
})

Vue.prototype.escapeHtml = function (unsafe) {
	 //必须加空格，否则容易导致后面的 URL替换连接到一起
	var  html=unsafe
	.replace(/&/g, "&amp;")
	.replace(/</g, "&lt;")
	.replace(/>/g, "&gt;")
	.replace(/"/g, "&quot;")
	.replace(/\r\n/g, " <br>")
	.replace(/\r/g, " <br>")
	.replace(/\n/g, " <br>")
	.replace(/'/g, "&#039;");
  return emojione.unicodeToImage(html)
}

Vue.filter('textToHtml', text => {
  var html  = Vue.prototype.escapeHtml(text)
  return html

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
