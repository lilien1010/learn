<template>

  <aside class="side-nav primary-background-color color-tertiary-font-color" role="navigation">
  		<header class="header">
  			<div class="account-box" aria-label="Account" role="region">

  			<div class="info status-offline primary-background-color">

  					<div class="thumb" data-status="隐身">
  						<div class="avatar">
  		<div class="avatar-image" :style="{backgroundImage : 'url('+my_head_img+')'}"></div>
  	</div>
  					</div>
  					<div class="data">
  						<h4>{{my_nickname}}</h4>
  					</div>

  			</div>
  			<nav class="options primary-background-color animated-hidden">
  				<div class="wrapper" @click="showMore">
  					<button data-status="online" class="status online"><span>在线</span></button>
  					<button data-status="away" class="status away"><span>离开</span></button>
  					<button data-status="busy" class="status busy"><span>忙碌</span></button>
  					<button data-status="offline" class="status offline"><span>隐身</span></button>
  					<button id="account" class="account-link"><i class="icon-sliders"></i><span>我的账户</span></button>


  					<button id="logout"><i class="icon-logout"></i><span>退出</span></button>
  				</div>
  			</nav>

  	</div>
  		</header>

  			<div class="toolbar">
  		<div class="toolbar-wrapper">
  			<div class="toolbar-search">
  				<i class="toolbar-search__icon icon-search"></i>
  				<input type="text" name="toolbar-input" class="toolbar-search__input background-transparent-light color-content-background-color border-transparent-lighter" placeholder="搜索">
  				<i class="toolbar-search__icon toolbar-search__icon--cancel icon-cancel"></i>
  			</div>

  				<div class="toolbar-search__buttons">
  					<i class="toolbar-search__create-channel icon-plus"></i>
  				</div>

  		</div>


  	</div>
  			<!--
        <div class="unread-rooms background-primary-action-color color-primary-action-contrast top-unread-rooms">
  				更多未阅读 <i class="icon-up-big"></i>
  			</div>
      -->
  			<div class="rooms-list" aria-label="频道" role="region">

            <chatListSectionRock>
            </chatListSectionRock>

  			</div>
  			<div class="unread-rooms background-primary-action-color color-primary-action-contrast bottom-unread-rooms hidden">
  				更多未阅读 <i class="icon-down-big"></i>
  			</div>
  			<div class="flex-nav primary-background-color animated-hidden">
  				<section>




  				</section>
  			</div>
  			<span class="arrow bottom"></span>

  		<footer class="footer">
  			<!--
        <a href="https://github.com/RocketChat/Rocket.Chat" class="logo" target="_blank"> <img src="/images/logo/logo.svg?v=3"> <small><i class="icon-github-circled"></i> Fork it on github</small> </a>

      -->
  		</footer>
  	</aside>


</aside>



</template>

<script>

import chatListSectionRock from './chatListSectionRock'
import { mapGetters } from 'vuex'

export default {
  name: 'imnavtab_rock',
  components: {
    chatListSectionRock:   chatListSectionRock,
  },
  methods :{
    showMore() {

    }
  }
  , computed:{
        ...mapGetters([
          'my_profile_img'
        ]),

        my_nickname (){
          return this.$store.state.Config.my_info.NK
        },
        my_head_img(){ 
          return  this.$store.state.Config.my_info.HU
        }
    },
}
</script>

<style  >


</style>
