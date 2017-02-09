
<template>


  <md-list-item
   :class="{ active: active }"
    @click="$emit('switch-chat-item', chatitem.id)">
  >
    <md-avatar>
      <img :src="head_prefix+user.head_url" alt="People">
    </md-avatar>

    <span>{{user.nickname}}</span>

    <md-button class="md-icon-button md-list-action">
      <md-icon class="md-primary">chat_bubble</md-icon>
    </md-button>

    <div class="thread-time">
      ==
    </div>

  </md-list-item>

</template>




<script>


export default {
  name: 'chatItem',
  props: {
    chatitem: Object,
    active: Boolean
  },
  data () {
    return {
      msg: 'Welcome to Your chat.js App',
      head_prefix : 'http://cn-head-cdn.nihaotalk.com/'
    }
  },
  computed:{
      head_prefix () {
          this.$sotre.state.file_download_profile.headimg_url
      }
  }
}
</script>
