<template>
  <li :id="msg.msg_id"
  class="message background-transparent-dark-hover sequential own" :data-username="msg.sender_name" data-date="2017年1月2日" :data-timestamp="msg.server_ts">


<button class="thumb user-card-message" data-username="lien.lee" tabindex="1"><div class="avatar">
<div class="avatar-image" :style="{backgroundImage:'url('+msg.HU+')'}"></div>
</div></button>



<button type="button" class="user user-card-message color-primary-font-color" data-username="lien.lee" tabindex="1">{{msg.from_nickname}}</button>

<span class="info border-component-color color-info-font-color">


<span class="time" title="2013年1月2日 下午2点38分">{{msg.server_ts|time}}</span>


<div class="message-cog-container ">
<i class="icon-cog message-cog" aria-label="Actions"></i>
</div>
</span>
<div class="body color-primary-font-color " dir="auto">
{{msg.text.text}}

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

export default {
  name: 'MessageItem',
  props: {
    msg: Object
  }
}
</script>
