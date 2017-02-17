<template>
  <li :id="msg.msg_id"   class="message background-transparent-dark-hover own new-day" :data-username="msg.sender_name" :data-date="msg.server_ts|datetime" :data-timestamp="msg.server_ts">


  <button class="thumb user-card-message" data-username="lien.lee" tabindex="1"><div class="avatar">
  <div class="avatar-image" :style="{backgroundImage:'url('+msg.HU+')'}"></div>
  </div></button>

  <button type="button" class="user user-card-message color-primary-font-color" data-username="lien.lee" tabindex="1">{{msg.from_nickname}}</button>

  <span class="info border-component-color color-info-font-color">


  <span class="time" title=" ">{{msg.server_ts|time}}</span>


  <div class="message-cog-container ">
  <i class="icon-cog message-cog" aria-label="Actions"></i>
  </div>
  </span>
  <div class="body color-primary-font-color " dir="auto">


    <template v-if="msg.msg_type=='text'">
      <textMsg :msg="msg"></textMsg>
    </template>

    <template  v-else-if="msg.msg_type === 'image'">
       <imageMsg :msg="msg"></imageMsg> 
    </template>

   <span class='already_read' v-if='msg.read==1'><i class="icon-ok" aria-label=" "></i>read</span>


  </div>
  <ul class="actionLinks hidden">

  </ul>
  <ul class="reactions hidden">

  <li class="add-reaction">
  <span class="icon-people-plus"></span>
  </li>
  </ul>
</li>

</template>

<script>

import textMsg from './msgTypes/textMsg.vue'
import imageMsg from './msgTypes/imageMsg.vue'

export default {
  name: 'MessageItem',
  props: {
    msg: Object
  },
  components: { textMsg ,imageMsg},
  methods:{

  }

}
</script>

<style>
.already_read{
  color: #b3a9a9;
  font-size: xx-small;
  margin-top: 2px;
  margin-left: 10px;
}
</style>
