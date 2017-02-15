<template>
  <li :id="msg.msg_id"
  class="message background-transparent-dark-hover own new-day" :data-username="msg.sender_name" :data-date="msg.server_ts|datetime" :data-timestamp="msg.server_ts">


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
  <a v-if='msg._room_at' class="mention-link mention-link-me background-primary-action-color" :data-username="msg._room_at">@{{msg._room_at}}</a>

  <template v-if="msg.msg_type=='text'">
    <div v-html="escapeHtml2(msg.text.text)"></div>
  </template>

  <template  v-else-if="msg.msg_type === 'image'">

    <div class="attachment">

  <div class="attachment-block">
    <div class="attachment-block-border background-info-font-color" style="background-color: "></div>
      <div class="attachment-title">
          <a :href="msg.image.url" target="_blank">File Uploaded: desktop.jpg</a>
            <a class="icon-download attachment-download-icon" :href="msg.image.url" target="_blank" download=""></a>
           <span class="collapse-switch icon-down-dir" data-index="0"></span>

      </div>



      <div class="attachment-flex">
      </div>
      <div class="attachment-image">

          <figure>
            <div class="inline-image" :style="{backgroundImage: 'url('+msg.image.thumb_url+')'}">
              <img :src="msg.image.thumb_url" height="375" class="gallery-item" data-title="File Uploaded: desktop.jpg">
            </div>
          </figure>

        </div>
  </div>
</div>


  </template>


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
  },
  methods:{
    escapeHtml2 : function(tt){
        var html = this.escapeHtml(tt)
        html  = html.replace(/class="emojione/g,'class="emojione big')
        return html
     }
  }

}
</script>
