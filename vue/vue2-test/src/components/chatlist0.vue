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
                <img :src="head_prefix+user.head_url" alt="People">
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
          {head_url: '20160803/c2aa08ac6ad0502a6_0c791.jpg', nickname: 'lilien'},
          {head_url: '140813/thumbsize_100_100_67757_53eb292a2b3ae.jpg', nickname: 'Chocolate ㅋ'},
          {head_url:'20170206/0a00cbabc6c2b5316_08978.jpg',nickname:'Sara'},
          {head_url:'20170206/dc307b42be7fc6076_163d6.jpg',nickname:'maru '},
          {head_url:'20170206/fa5ca2b88488b98ab_64c6d.jpg',nickname:'一如你我0223 '},
          {head_url:'20170206/a12396e5147711d46_6e289.jpg',nickname:'조성하s '},
          {head_url:'20170206/c698c4c38e9ff133b_7a718.jpg',nickname:'lida '},
          {head_url:'20170206/3413da29b0fb59bf7_9c367.jpg',nickname:'ke nji '},
        ] 
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
