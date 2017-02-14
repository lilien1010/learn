import * as api from '../api'
import * as types from './mutation-types'

export const getAllMessages = ({ commit }) => {
  api.getAllMessages(messages => {
    commit(types.RECEIVE_ALL, {
      messages
    })
  })
}

export const sendMessage = ({ commit }, payload) => {
  api.createMessage(payload, message => {
    commit(types.RECEIVE_MESSAGE, {
      message
    })
  })
}

export const switchChatItem = ({ commit }, payload) => {
  commit(types.SWITCH_CHAT_ITEM, payload)
}



export const getChatUserList= ({commit},payload) => {

  commit(types.GET_CHAT_LIST,payload)

}
