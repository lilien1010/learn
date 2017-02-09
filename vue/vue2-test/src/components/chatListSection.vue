<template>


<div class="chatlist-viewport">

    <md-toolbar class="md-large">
      <div class="md-toolbar-container">
        <h3 class="md-title">Hellotalk 1</h3>
      </div>
    </md-toolbar>


        <div class="chat-viewport">
          <md-list>
            <chatItem
               

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
        'threads',
        'currentThread'
      ]),

      head_prefix () {
          this.$sotre.state.file_download_profile.headimg_url
      },
      recentChats() {
          this.$sotre.state.file_download_profile.headimg_url
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
min-height:28px;
}
a {
  color: #42b983;
}
</style>
