import { set } from 'vue'
import * as types from './mutation-types'
import * as msgApi from '../api'
import userinfoCenter from '../api/userinfoCenter'


export default {
  [types.RECEIVE_ALL] (state, { messages }) {
    let latestMessage
    messages.forEach(message => {
      // create new thread if the thread doesn't exist
      if (!state.threads[message.threadID]) {
        createThread(state, message.threadID, message.threadName)
      }
      // mark the latest message
      if (!latestMessage || message.timestamp > latestMessage.timestamp) {
        latestMessage = message
      }
      // add message
      addMessage(state, message)
    })
    // set initial thread to the one with the latest message
    setCurrentThread(state, latestMessage.threadID)
  },

  [types.RECEIVE_MESSAGE] (state, { message }) {
    addMessage(state, message)
  },

  [types.SWITCH_CHAT_ITEM] (state, { id }) {
    console.log(id)
  },

  [types.LOG_SUCESS] (state,{data}) {

   state.Config = data
   changeUserinfo(state,state.Config.my_info)
   set(state.userinfo,state.currentLoginUserID+'',state.Config.my_info)
    console.log(types.LOG_SUCESS,state.Config)
  },
  [types.SHOW_USER_BASE_INFO] (state,{data}) {

    if(data){
        data.forEach(function(v,index){
            v.loading = 0
            v.from_profile_ts = 0
            changeUserinfo(state,v)
            set(state.userinfo, v.UI+'',v)
        })
    }
    console.log(types.SHOW_USER_BASE_INFO,data)
  },
  [types.GET_CHAT_LIST] (state,{data}) {
    if(data){

        state.currentChatUserID = data[0].UI
        var now   = new Date().getTime()
        data.forEach(function(v,index){
            set(state.chatuserlist, v.UI+'',{ts:(now-5*360*86400*1000-index ),unread:0,loading:0})
            v.loading = 0
            v.from_profile_ts = now/1000
            changeUserinfo(state,v)
            set(state.userinfo, v.UI+'',v)
        })
        //console.log('  state.chatuserlist=',JSON.stringify(  state.chatuserlist))
    }
    console.log(types.GET_CHAT_LIST,data)
  },

  //
  [types.RECEIVE_MESSAGE] (state,{data}) {
    if(!data){
      console.log(types.RECEIVE_MESSAGE,'bad data')
       return
    }
    addMessage(state,data)


    console.log(types.RECEIVE_MESSAGE,data)
  },
  [types.SEND_MESSAGE_OK] (state,{data}) {

    console.log(types.SEND_MESSAGE_OK,data)
  },
  [types.P2P_MESSAGESEEN] (state,{data}) {

      var str_userid  = data.from == state.currentLoginUserID? data.to : data.from

    if(state.messages[str_userid] && data.data.msg_id){

      state.messages[str_userid].msg_ids[data.data.msg_id].read = 1
    }
    console.log(types.P2P_MESSAGESEEN,data)
  },

}


function addMessage (state, data) {

  data.data.to    = data.to
  data.data.from  = data.from

  var str_userid  = data.from == state.currentLoginUserID? data.to : data.from
  state.currentChatUserID = str_userid
  if(state.chatuserlist[str_userid] ) {
    state.chatuserlist[str_userid].ts       = data.data.server_ts
    state.chatuserlist[str_userid].unread  ++
    //set(state.chatuserlist[str_userid],ts,data.data.server_ts)
    //set(state.chatuserlist[str_userid],ts,data.data.server_ts)
  }else{
    set(state.chatuserlist, str_userid,{ts  : data.data.server_ts,unread : 1,loading:0})
  }

  if(state.currentChatUserID == str_userid){
      state.chatuserlist[str_userid].unread = 0
  }

  if(!state.messages[str_userid]){
       set(state.messages, str_userid,{
          msg_ids : {},
          list    : []
       })
  }

  if(state.userinfo[str_userid]){
    if(state.userinfo[str_userid].from_profile_ts<data.data.from_profile_ts)
    {
      state.userinfo[str_userid].from_profile_ts  = data.data.from_profile_ts
      updateUserinfo(state,str_userid)
    }
  //  set(state.userinfo[str_userid],from_profile_ts,data.data.from_profile_ts)
  }else{
    updateUserinfo(state,str_userid)
  }

  var len = state.messages[str_userid].list.length
  set(state.messages[str_userid].msg_ids,data.data.msg_id,{index:len,unRead:0})

  state.messages[str_userid].list.push(data.data)



}

function updateUserinfo(state,userid){
  if(state.userinfo[userid]){
      if(state.userinfo[userid].loading==1){
        return
      }
      state.userinfo[userid].loading = 1
  }else{
    //state.userinfo[userid] =  {loading:1}
    set(state.userinfo,userid, {loading:1})
  }


  msgApi.loadUserinfo(userid)
}


function setCurrentThread (state, id) {
  state.currentThreadID = id
  if (!state.threads[id]) {
    debugger
  }
  // mark thread as read
  state.threads[id].lastMessage.isRead = true
}

function changeUserinfo(state,userItem){
        userItem.HU = state.Config.file_download_profile.headimg_url+userItem.HU
        userItem.nation_flag = userinfoCenter.getProfileFlag(userItem.NN)
}
