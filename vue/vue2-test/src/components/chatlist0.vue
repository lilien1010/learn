<template>


<div class="chatlist-viewport">

    <md-toolbar class="md-large">
      <div class="md-toolbar-container">
        <h3 class="md-title">Hellotalk 1</h3>
      </div>
    </md-toolbar>


        <div class="chat-viewport">
          <md-list>
            <md-list-item v-for="user in recentChats">
              <md-avatar>
                <img :src="user.head_url" alt="People">
              </md-avatar>

              <span>{{user.nickname}}</span>

              <md-button class="md-icon-button md-list-action">
                <md-icon class="md-primary">chat_bubble</md-icon>
              </md-button>

            </md-list-item>


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


export default {
  name: 'chatlist0',
  data () {
    return {
      head_prefix: 'http://ht-head.oss-cn-shenzhen.aliyuncs.com/',
      msg: 'Welcome to Your chat.js App',
      recentChats: [
          {head_url: 'http://ht-head.oss-cn-shenzhen.aliyuncs.com/20160803/c2aa08ac6ad0502a6_0c791.jpg', nickname: 'lilien'},
          {head_url: 'http://ht-head.oss-cn-shenzhen.aliyuncs.com/140813/thumbsize_100_100_67757_53eb292a2b3ae.jpg', nickname: 'Chocolate ㅋ'}]
    }
  },
  methods: {
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
