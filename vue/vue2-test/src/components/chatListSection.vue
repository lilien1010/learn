<template>


<div class="chatlist-viewport">

    <md-toolbar class="md-large">
      <div class="md-toolbar-container">

        <div class="avatar" style="width: 60px;height: 60px;">
          <div class="avatar-image"  :style="{backgroundImage: 'url('+my_profile_img+')' }"></div>
        </div>
         <span class='my_nickname'>{{my_nickname}}</span>
      </div>
    </md-toolbar>


        <div class="chat-viewport">
          <md-list>
            <chatItem
              v-for="item in recentChatUsers"
               :userinfo="item"
                @switch-chat-item="switchChatItem()"

            ></chatItem>
          </md-list>
        </div>

          </md-sidenav>

     <md-toolbar>
      <div class="md-toolbar-container">
        <h3 class="md-title">Sidenav content</h3>
      </div>
    </md-toolbar>
</div>



</template>

<script>

import chatItem from './chatItem.vue'
import { mapGetters } from 'vuex'
import * as types from '../store/mutation-types'

export default {
  name: 'chatListSection',
  components: { chatItem },

  data () {
    return {
      msg: 'Welcome to Your chat.js App',
    }
  },
  computed:{
      ...mapGetters([
        'recentChatUsers',
        'currentThread',
        'my_profile_img'
      ]),
      chatuserlist(){
        return this.$store.state.chatuserlist
      },
      my_nickname (){
        return this.$store.state.Config.my_info.NK
      },
      head_prefix () {
          this.$store.state.Config.file_download_profile.headimg_url
      },
      recentChats() {

      }

  },
  methods: {

    switchChatItem (id) {
      this.$store.dispatch('switchChatItem', { id })
    },
  toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    },
    toggleRightSidenav() {
      this.$refs.rightSidenav.toggle();
    },
    closeRightSidenav() {
      this.$refs.rightSidenav.close();
    },
    open(ref) {
      console.log('Opened: ' + ref);
    },
    close(ref) {
        this.$refs.leftSidenav.open();
      console.log('Closed: ' + ref);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.my_nickname{
  margin-left: 8px;
    position: relative;
    margin-top: -40px;
    font-size: larger;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

.chat-viewport>ul>li{
  /*margin-left:-10px; */
  margin: 0 0px;
}

li {
  display: inline-block;
  margin: 0 10px;
}

.md-toolbar.md-large{
min-height:38px;
}
a {
  color: #42b983;
}
</style>
