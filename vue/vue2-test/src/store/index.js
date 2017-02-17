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
      HU:'http://cn-head-cdn.nihaotalk.com/cs_logo.jpg'
    }
  },
  chatuserlist: {
    /*
      userid => {
      ts:最后消息的时间
      ,unreadCnt:未读数量,
      loading:个人资料是否在家中,
      index:index ，当前所在下标 列表
    }
     */

  },
  roominfo:{
      /* roomid: {
         name: '',
         userids:[]
    }*/
  },
  userinfo : {
    /* userid => {} */
  },

  messages: {
    /*   userid => {
            msg_ids : {},
            list    : []
        }
    */
  },


}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins : [socketPlugin]
})
