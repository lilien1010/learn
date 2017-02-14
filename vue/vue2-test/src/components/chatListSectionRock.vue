    <template>
<div class="wrapper">
<!--

  <div class="unread-rooms-mode">
    <h3>
      未读房间 <span class="room-count-small">(3)</span>
    </h3>

  </div>
   <button class="more more-channels background-transparent-darker-hover">更多频道...</button>



        <h3 class="add-room">
    		直接发送消息 <span class="room-count-small">(2)</span>
    	</h3>

      -->

    	<ul>



        <chatItemRock
          v-for="item in recentChatUsers"
           :userinfo="item"
           @switch-chat-item="switchChatItem(item.UI)"

        ></chatItemRock>
        <hr class="md-divider md-inset">





    	</ul>



 </div>

</template>

<script>

import chatItemRock from './chatItemRock.vue'
import { mapGetters } from 'vuex'
import * as types from '../store/mutation-types'

export default {
  name: 'chatListSectionRock',
  components: { chatItemRock },

  data () {
    return {
      msg: 'Welcome to Your chat.js App',
    }
  },
  computed:{
      ...mapGetters([
        'recentChatUsers', 
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
      this.$store.dispatch(types.SWITCH_CHAT_ITEM, { id })
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
<style  >


</style>
