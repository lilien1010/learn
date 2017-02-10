import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
import * as msgApi from '../api'

var socketPlugin  = msgApi.createWebSocketPlugin()

Vue.use(Vuex)

const state = {
  currentChatUserID: null,
  currentLoginUserID: 1000372,
  Config:{
     file_download_profile:{
      headimg_url:'http://cn-head-cdn.nihaotalk.com/'
    },
    my_info : {
      HU:'cs_logo.jpg'
    }
  },
  chatuserlist: [


  ],
  messages: {

  },

}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins : [socketPlugin]
})
