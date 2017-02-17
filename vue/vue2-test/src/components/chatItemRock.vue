
<template>

  <li class=" background-transparent-darker-hover md-list-item ">


  <div class="md-list-item-container"   :title="userinfo.NK"
    :class="{ active: active }"
      @click="$emit('switch-chat-item', userinfo.UI)"
  >

 <div  class="md-avatar md-theme-default" v-if="userinfo._type!='muc'">
   <img :src="head_img"  class="head_img"  alt="People"  >
  <img :src="nation_flag" class="nation_flag img-circle"   >
 </div>

 <div class="md-list-text-container">

   <span>{{user_name}}</span>

   <p class='last-text' v-html="last_text"></p>

 </div>



  <button type="button" class="md-button md-icon-button md-list-action md-theme-default">
    <i aria-hidden="true" class="md-icon md-theme-default material-icons">chat_bubble</i>
    <div class="md-ink-ripple">
      <div class="md-ripple" style="width: 40px; height: 40px;"></div>
    </div>
  </button>

<hr class="md-divider md-inset">
  </div>

</li>



</template>




<script>

import userinfoCenter from '../api/userinfoCenter'

export default {
  name: 'chatItemRock',
  props: {
    userinfo: Object,
    active: Boolean,
    lastactive:Number
  },
  data () {
      return {

      }
  },
  computed:{
    head_img ( ) {
        return  this.userinfo.HU
    },
    nation_flag() {
        return this.userinfo.nation_flag
    },
    user_name(){
      if(this.userinfo._type=='muc'){
        return this.userinfo.roomname
      }else{
        return this.userinfo.NK || this.userinfo.UN
      }
    },
    last_text(){

      var text  = ''

      if(this.userinfo.lastMessage){
          var item  = this.userinfo.lastMessage
          var _type =item.msg_type
          switch(_type){
                case 'text': {
                  text = item.text.text.replace(/\r\n/g, " ")
                	.replace(/\r/g, " ")
                	.replace(/\n/g, " ");
                  text =  this.escapeHtml(text);
                }break;
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

<style scope>
.md-list-text-container>:nth-child(2), .md-list-text-container>:nth-child(3) {
    margin: 0;
    color:rgba(224, 255, 252, 0.68);
    font-size: 14px;
}

.head_img{
  border-radius: 50%;
  width: 100%;
  height: 100%;
  display: block;
}

.nation_flag{
  position: absolute;   width: 14px;
height: 14px;
top: 35px;
left:  1px;
border: solid 1px #fff;
border-radius: 50%;
z-index: 10000;
}

.md-icon  {
    color: #2196f3 !important;
}

.md-list-text-container>* {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
        color: #fff;
}

.md-avatar {
    margin-right: 16px;
    width: 50px;
    min-width: 50px;
    height: 50px;
    min-height: 50px;
    margin: auto;
    display: inline-block;
    overflow: hidden;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position: relative;
    border-radius:  0px;
    vertical-align: middle;
}

.md-list.md-triple-line .md-list-item .md-list-item-container {
    min-height: 88px;
}

.md-list-item .md-list-item-container {
    min-height: 68px;
        cursor: pointer;
    margin: 0;
    padding: 0  0px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-flow: row nowrap;
    flex-flow: row nowrap;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex: 1;
    flex: 1;
    position: relative;
    font-size: 16px;
    font-weight: 400;
    text-align: left;
    text-transform: none;
}

.md-list-text-container {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-flow: column nowrap;
    flex-flow: column nowrap;
    -ms-flex: 1;
    flex: 1;
    overflow: hidden;
    line-height: 1.25em;
    white-space: normal;
}

.md-button.md-icon-button {
    width: 40px;
    min-width: 40px;
    height: 40px;
    margin: 0 0px;
    padding: 8px;
    border-radius: 50%;
    line-height: 24px;
}

.md-list-item .md-divider {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
}
.md-divider.md-inset {
    margin-left: 72px;
}
.md-divider {
    height: 1px;
    margin: 0;
    padding: 0;
    display: block;
    border: 0;
    background-color: rgba(0,0,0,.12);
}

.md-list-item .md-list-item-container .md-avatar:first-child, .md-list-item .md-list-item-container .md-list-action:first-child {
    margin-right: 16px;
}

.last-text .emojione{
 height: 14px;
 width: 14px;
  min-height: 14px;
min-width: 14px;
      margin: 0 .02em;
}


</style>
