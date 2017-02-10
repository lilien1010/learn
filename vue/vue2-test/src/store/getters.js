export const threads = state => state.threads
export const Config = state => state.threads

export const currentThread = state => {
  return state.currentThreadID
    ? state.threads[state.currentThreadID]
    : {}
}

export const currentMessages = state => {
  const thread = currentThread(state)
  return thread.messages
    ? thread.messages.map(id => state.messages[id])
    : []
}

export const my_profile_img = state => {
  return  state.Config.file_download_profile.headimg_url +  state.Config.my_info.HU
}
 

export const userInfoLists = state => {





}
