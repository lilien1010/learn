<template>

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

<script>

export default {
  name: 'imageMsg',
  props: {
    msg: Object
  },
  methods:{
    escapeHtmlTextMsg : function(tt){
        var html = this.escapeHtml(tt)
        html  = html.replace(/class="emojione/g,'class="emojione big')
        return html
     }
  }

}
</script>
