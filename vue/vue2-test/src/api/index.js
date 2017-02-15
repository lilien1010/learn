import * as types from '../store/mutation-types'
import { CMD_DEFINE,CMD_DEFINE_OR, MSG_RECEIPT_CODE_OR} from './protoDefine'
import msgModule from './msgModule'

const LATENCY = 300

export function getAllMessages (cb) {
  setTimeout(() => {
    cb(data)
  }, LATENCY)
}


export function createWebSocketPlugin(){
  return store => {

    msgModule.on(types.LOG_SUCESS , data => {

      store.commit({type:types.LOG_SUCESS, data:data.data})

      msgModule.getRecentChatList()

      msgModule.recvOffline('1970-10-10 00:00:00')

    }),

    msgModule.on(types.LOG_FAIL, data => {
      store.commit({type:types.LOG_FAIL, data:data.data})
    })

    msgModule.on(types.GET_CHAT_LIST, data => {
      store.commit({type:types.GET_CHAT_LIST, data:data.data})
    })


    msgModule.on(types.RECEIVE_MESSAGE, data => {
      store.commit({type:types.RECEIVE_MESSAGE, data:data.data})
    })

    msgModule.on(types.SHOW_USER_BASE_INFO, data => {
      store.commit({type:types.SHOW_USER_BASE_INFO, data:data.data})
    })

    msgModule.on(types.SEND_MESSAGE_FAIL, data => {
      store.commit({type:types.SEND_MESSAGE_FAIL, data:data.data})
    })


    msgModule.on(types.P2P_MESSAGESEEN, data => {
      store.commit({type:types.P2P_MESSAGESEEN, data:data.data})
    })


    msgModule.on(types.SEND_PACK, data => {
      var cmd   = ''
     if(data.data && data.data.pack &&  data.data.pack.cmd){
        cmd = data.data.pack.cmd
      }

      if(cmd==CMD_DEFINE.CMD_P2P_MESSAGE){
        store.commit({type:types.RECEIVE_MESSAGE, data:data.data.pack})
      }

    })


    store.subscribe(mutation => {
      if (mutation.type === 'UPDATE_DATA') {
        socket.emit('update', mutation.payload)
      }
    })
  }
}

export function startLogin({userid} ) {
    var url   = 'ws://qtest.hellotalk.org/im/'+userid

    /*检测本地数据库，有则更新*/

  	msgModule.initChat(url,userid, function(Config){

        /*检测本地数据库，*/
    },function(data){

    })

}

export function createMessage(touserid,msg_type,content){
     var msgCid   = {}
     msgCid['msg_type']   =   msg_type
      if(msg_type=='text'){
          msgCid['content']  = {text:content}

          msgModule.sendJsonMsg(msgCid,touserid)
      }
}

export function loadUserinfo(userid) {
  msgModule.loadUserinfo(userid)
}
