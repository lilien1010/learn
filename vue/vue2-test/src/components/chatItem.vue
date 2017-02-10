
<template>


  <md-list-item
   :class="{ active: active }"
    @click="$emit('switch-chat-item', userinfo.UI)">

    <md-avatar>
      <img :src="head_img" alt="People">
    </md-avatar>


    <div class="md-list-text-container">
           <span>{{userinfo.NK}}</span>
           <p>{{userinfo.lastMessage?userinfo.lastMessage.des:'2ssssssssssssssssssssssss22'}}</p>
   </div>




    <md-button class="md-icon-button md-list-action">
      <md-icon class="md-primary">chat_bubble</md-icon>{{lastactive}}
    </md-button>

    <md-divider class="md-inset"></md-divider>

  </md-list-item>

</template>




<script>


export default {
  name: 'chatItem',
  props: {
    userinfo: Object,
    active: Boolean,
    lastactive:Number
  },
  data () {

  },
  computed:{
    head_img ( ) {
        return  this.$store.state.Config.file_download_profile.headimg_url+this.userinfo.HU
    }
  },

}
</script>
