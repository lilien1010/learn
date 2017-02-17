<template>
  <span>
    <a v-if='msg._room_at' class="mention-link mention-link-me background-primary-action-color" :data-username="msg._room_at">@{{msg._room_at}}</a>

  <div style='display:inline' v-html="escapeHtmlTextMsg(msg.text.text)"></div>
</span>
</template>

<script>

export default {
  name: 'textMsg',
  props: {
    msg: Object
  },
  methods:{
    escapeHtmlTextMsg : function(html){
       var URL_REP 	=	/(((http|ftp|https|rtsp|mms):\/{2}(([0-9a-z_-]+\.)+([a-zA-Z]{2,9}|(\d{1,3}\.\d{1,3}\.\d{1,3}))(:[0-9]+)?($|\s|(?=[^\x00-\x7F])|((\#|\/|\\|\?)([0-9a-zA-Z\d-_\.\/\?&\%\!\@\#\$><=!\+\*~;:\(\)\|\[\]\\]+)?))))|(((http|ftp|https|rtsp|mms):\/{2})?(([0-9a-z_-]+\.)+(com|net|org|gov|cn|co|tk|edu|gov|uk|io|hk|jp|(\d{1,3}\.\d{1,3}\.\d{1,3}))(:[0-9]+)?($|\s|(?=[^\x00-\x7F])|((\#|\/|\\|\?)([0-9a-zA-Z\d-_\.\/\?&\%\!\@\#\$><=!\+\*~;:\(\)\|\[\]\\]+)?))))|(hellotalk:\/{2}([0-9a-zA-Z\d-_\\\/\?=&])+))/gi
       var html = this.escapeHtml(html)
       html = 	html.replace(URL_REP, function(d){
 				var src 	=	d
 				if(d.indexOf('http')!=0){
 					d	=	'http://'+d
 				}
 				return "<a class='founded_url'  target='_blank' href='"+d+"'>"+src+"</a>"
 			});

        html  = html.replace(/class="emojione/g,'class="emojione big')
        return html
     }
  }

}
</script>
