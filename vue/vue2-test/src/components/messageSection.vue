

<template>
<div class="main-content content-background-color" style="transform: translateX(0px); ">


<div class="room-container" style="
    top: -60px;
    position: absolute;
    width: 100%;
">
<div class="dropzone" v-show='has_recent_chat'>
<div class="dropzone-overlay">
<div>
Drop to upload file
</div>
</div>
<section class="messages-container border-component-color " id="chat-window-4SFNEydqQhHtj5KkPD5XuHAoeDqQADsHLR" aria-label="Channel">


        <header class="fixed-title content-background-color border-component-color">
        					<div class="burger">
        		<i></i>
        		<i></i>
        		<i></i>

        			<div class="unread-burger-alert color-error-contrast background-error-color">
        				•
        			</div>

        	</div>
        					<h2>
                  <div class="md-avatar md-theme-default">
                    <img :src="head_img" alt="People" class="head_img">
                     <img :src="nation_flag" class="nation_flag img-circle"></div>

        							<a href="#favorite" class="toggle-favorite"><i class="icon-star-empty" aria-label="Favorite"></i></a>


        						<span class="room-title">{{user_name}}</span>
        						<span class="room-topic"></span>
        					</h2>
        				</header>

<div class="container-bars">




</div>
<div class="messages-box" style="height: calc(100% - 131px);top: 60px;">
<div class="ticks-bar"></div>
<!-- <button class="new-message not">
<i class="icon-down-big"></i>
New messages
</button>
<div class="jump-recent not">
<button>Jump to recent messages <i class="icon-level-down"></i></button>
</div>-->

<div class="wrapper"  ref="list">
  <ul aria-live="polite">
    <li class="start color-info-font-color">
										开始交谈
									</li>

      <MessageItem
      v-for="item in currentMessageList"
       :msg="item"

      >

      </MessageItem>
    </ul>
</div>
</div>
<footer class="footer border-component-color">

<form class="message-form" method="post" action="/">
<div class="message-popup-results">


  <roomUsers v-if='showRoomUsers'></roomUsers>
</div>

<div class="message-input border-component-color">
<div class="input-message-container">
<textarea dir="ltr" v-model='input_text' @keydown.enter="sendTextMessage($event)" name="msg" class="input-message autogrow-short" placeholder="Message" style="height: 35px;"></textarea>

<div class="inner-left-toolbar">
<i class="emoji-picker-icon icon-people"></i>
</div>
</div>

<template v-if="has_text">

      <div @click='sendTextMessage' class="message-buttons send-button">
          <i class="icon-paper-plane" aria-label="发送"></i>
        </div>
</template>

<template v-else>

  <div class="message-buttons file">
    <i class="icon-attach file"></i>
    <input type="file" accept="image/*,audio/*,video/*,application/zip,application/gzip,application/x-gzip,application/x-rar-compressed,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document">
  </div>

  <div class="message-buttons">
    <div class="mic">
      <i class="icon-mic" aria-label="Record"></i>
    </div>
    <div class="stop-mic hidden">
      <i class="icon-stop" aria-label="Stop Recording"></i>
    </div>
  </div>


  <div class="message-buttons video-button">
    <i class="icon-videocam" aria-label="Record"></i>
  </div>

</template>

</div>

<div class="stream-info">

</div>

<!--
<div class="formatting-tips" aria-hidden="true" dir="auto">

<b>*bold*</b>
<i>_italics_</i>
<span>~<strike>strike</strike>~</span>


<code class="inline">`inline_code`</code>
<code class="inline"><span class="hidden-br"><br></span>```<span class="hidden-br"><br></span><i class="icon-level-down"></i>multi<span class="hidden-br"><br></span><i class="icon-level-down"></i>line<span class="hidden-br"><br></span><i class="icon-level-down"></i>```</code>


<span><a href="https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX" target="_blank">\[KaTeX\]</a></span>


<q><span class="hidden-br"><br></span>&gt;quote</q>

</div>
-->


<div class="editing-commands" aria-hidden="true" dir="auto">
<div class="editing-commands-cancel">Esc to <button type="button">Cancel</button></div>
<div class="editing-commands-save">Enter to <button type="button">Save changes</button></div>
</div>
</form>

</footer>
</section>
<section class="flex-tab  border-component-color">




</section>
</div></div></div>

</template>


<script>

import * as api from '../api'
import MessageItem from './MessageItem.vue'
import roomUsers from './roomUsers.vue'
import { mapGetters } from 'vuex'
import userinfoCenter from '../api/userinfoCenter'

export default {
  name: 'MessageSection',
  data () {
    return {
        input_text :'',
        _showRoomUsers:false
     }
  },
  components: { MessageItem ,roomUsers},
  watch: {
    'currentMessageList': function () {
      this.$nextTick(() => {
        const ul = this.$refs.list
        ul.scrollTop = ul.scrollHeight
      })
    }
  },
  computed :{
    ...mapGetters({
      currentMessageList: 'currentMessageList',
      userinfo: 'currentChatUser' ,
    }),
    has_recent_chat() {
        return (this.userinfo && this.userinfo.HU)?true:false
    },
    head_img ( ) {
      if(this.userinfo && this.userinfo.HU){
        return   this.userinfo.HU
      }
      return ''
    },
    user_name(){
      if(!this.userinfo){
        return ''
      }
      if(this.userinfo._type=='muc'){
        return this.userinfo.roomname
      }else{
        return this.userinfo.NK || this.userinfo.UN
      }
    },
    nation_flag() {
      if(this.userinfo.NN){
        return userinfoCenter.getProfileFlag(this.userinfo.NN)
      }
      return ''
    },
    has_text () {
      return this.input_text.length>0
    },
    showRoomUsers() {
        return this._showRoomUsers || this.input_text=='@'
    }
  },
  methods: {
      sendTextMessage($event) {
        $event.preventDefault()
        $event.stopPropagation()
        console.log('sendTextMessage',this.input_text)
          if(this.input_text.length>0){
              api.createMessage(this.userinfo.UI,'text',this.input_text)
          }
          this.input_text=''
      }
  }
}
</script>


<style  >

</style>
