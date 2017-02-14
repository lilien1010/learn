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

export const my_profile_img = (state ) => {
  console.log('my_profile_img index=',index,',state=',state)
  var pre   = state.Config.file_download_profile.headimg_url
  if(index ){
    if('me'==index){
      return pre  +  state.Config.my_info.HU
    }
      if(state.userinfo[index+'']){
          return pre+state.userinfo[index+''].HU
      }else{
        return ''
      }
  }
  return pre  +  state.Config.my_info.HU
}

export const currentChatUser = (state) => {
  if(!state.currentChatUserID){
    return {}
  }
  return state.userinfo[state.currentChatUserID+''] || {}
}



export const currentMessageList = (state) => {
    console.log('getter currentMessageList',state.currentChatUserID,state.messages)
    if(!state.currentChatUserID){
      return []
    }
    var str_userid = ''+state.currentChatUserID
    var list  = []
    if(state.messages[str_userid]){
        list  = Object.assign([], state.messages[str_userid].list)

      }
      list.forEach(function(v){
           var show_id  = v.from+''
           var info     = state.userinfo[show_id]
           if(info){
              Object.assign(v,{HU:info.HU,nation_flag:info.nation_flag})
           }
      })

    return list;

}

export const recentChatUsers =   state =>{
    var list  = [];
    console.log('getter recentChatUsers',state.chatuserlist)

      for( var ik in state.chatuserlist ){

        if(typeof(ik) !='string'){
          continue;
        }
        var str_userid = ik +''
        if(state.userinfo[str_userid] && state.userinfo[str_userid].UI){
            var item  = Object.assign({}, state.chatuserlist[ik] ,state.userinfo[str_userid])


            if(state.messages[str_userid]){

                var len = state.messages[str_userid].list.length
                if(len>0){
                  item.lastMessage  =     state.messages[str_userid].list[len-1]
                }
            }

             list.push(item)
        }
/**/
    }

    list.sort(function(a,b){
                return b.ts-a.ts});
  list.forEach(function(v){

      console.log('  state.list=',v.UI,v.ts,moment(v.ts).format('MMMM Do YYYY, h:mm:ss a')  ,v.unread)
  })


    return list
}

export const userInfoLists = state => {





}
