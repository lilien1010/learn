import * as types from '../store/mutation-types'

import msgModule from './msgModule'

const LATENCY = 300

export function getAllMessages (cb) {
  setTimeout(() => {
    cb(data)
  }, LATENCY)
}

export function createMessage ({ text, thread }, cb) {
  const timestamp = Date.now()
  const id = 'm_' + timestamp
  const message = {
    id,
    text,
    timestamp,
    threadID: thread.id,
    threadName: thread.name,
    authorName: 'Evan'
  }
  setTimeout(function () {
    cb(message)
  }, LATENCY)
}


export function createWebSocketPlugin(){
  return store => {

    msgModule.on(types.LOG_SUCESS , data => {

      store.commit({type:types.LOG_SUCESS, data:data.data})

      msgModule.getRecentChatList()

    }),

    msgModule.on('login.fail', data => {
      store.commit('login.fail', data)
    })

    msgModule.on(types.GET_CHAT_LIST, data => {
      store.commit({type:types.GET_CHAT_LIST, data:data.data})
    
    })


    msgModule.on('msg.seen', data => {
      store.commit('msg.seen', data)
    })


    msgModule.on('msg.recv', data => {
      store.commit('msg.recv', data)
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
