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

}

export const switchChatItem = ({ commit ,state}, payload) => {
 
  state.currentChatUserID = payload.id

}


export const getChatUserList= ({commit},payload) => {

  commit(types.GET_CHAT_LIST,payload)

}
