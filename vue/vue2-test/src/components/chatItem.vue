
<template>


  <md-list-item
   :class="{ active: active }"
    @click="$emit('switch-chat-item', userinfo.UI)">

    <md-avatar :style="{'border-radius':'0%'}">
      <img :src="userinfo.HU"  class="head_img"  alt="People"  >
      <img :src="userinfo.nation_flag" class="nation_flag img-circle" :style="nationStyle"  >
    </md-avatar>


    <div class="md-list-text-container">
           <span>{{userinfo.NK}}</span>

           <p>{{userinfo.lastMessage?userinfo.lastMessage.des:'2ssssssssssssssssssssssss22'}}</p>
   </div>




    <md-button class="md-icon-button md-list-action">
      <span>{{userinfo.OL}}</span><md-icon class="md-primary">chat_bubble</md-icon>
    </md-button>

    <md-divider class="md-inset"></md-divider>

  </md-list-item>

</template>




<script>

import userinfoCenter from '../api/userinfoCenter'

export default {
  name: 'chatItem',
  props: {
    userinfo: Object,
    active: Boolean,
    lastactive:Number
  },
  data () {
      return {
          nationStyle : {
            width: '15px',
            height: '15px',
          }
      }
  },
  computed:{
  
    last_text(){

      var text  = ''

      if(this.userinfo.lastMessage){
          var item  = this.userinfo.lastMessage
          var _type =item.msg_type
          switch(_type){
                case 'text':   text =  item.text;  break;
                case 'image':  text = '[image]'; break;
                case 'voice':    text = '[voice]'; break;
                case 'doodle':    text = '[doodle]'; break;
                case 'video':    text = '[video]'; break;
                case 'notify':    text = '[notify]'; break;
                case 'sticker':    text = '[sticker]'; break;
                case 'correction':    text = '[correction]'; break;
                case 'translate':    text = '[translate]'; break;
                case 'voip':    text = '[voip]'; break;
                case 'introduction':    text = '[introduction]'; break;
                default: break;
          }

      }

      return text
    }
  },

}
</script>

<style>
.head_img{
  border-radius: 40px;
}

.nation_flag{
  position: absolute;   width: 19px;
height: 19px;
top: 25px;
left: -1px;
border: solid 1px #fff;
border-radius: 50%;
z-index: 10000;
}
</style>
