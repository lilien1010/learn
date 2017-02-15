<template>
  <div class="message-popup-position">
     <div class="message-popup content-background-color">

         <div class="message-popup-title secondary-background-color">
           人
         </div>

       <div class="message-popup-items">

           <div class="popup-item selected" data-id="palasso">


    
   <div class="popup-user-status border-transparent-dark popup-user-status-online"></div>
   <div class="popup-user-avatar" style="background-image:url(https://cdn-demo.rocket.chat/avatar/palasso?_dc=0);"></div>

 <strong>palasso</strong>


           </div>

           <div class="popup-item" data-id="tanujsanwal">






   <div class="popup-user-status border-transparent-dark popup-user-status-online"></div>
   <div class="popup-user-avatar" style="background-image:url(https://cdn-demo.rocket.chat/avatar/tanujsanwal?_dc=221);"></div>

 <strong>tanujsanwal</strong>


           </div>

           <div class="popup-item" data-id="jaganatha.rao.pemmadi">






   <div class="popup-user-status border-transparent-dark popup-user-status-online"></div>
   <div class="popup-user-avatar" style="background-image:url(https://cdn-demo.rocket.chat/avatar/jaganatha.rao.pemmadi?_dc=0);"></div>

 <strong>jaganatha.rao.pemmadi</strong>


           </div>

           <div class="popup-item" data-id="Ice-Cream">






   <div class="popup-user-status border-transparent-dark popup-user-status-online"></div>
   <div class="popup-user-avatar" style="background-image:url(https://cdn-demo.rocket.chat/avatar/Ice-Cream?_dc=506);"></div>

 <strong>Ice-Cream</strong>


           </div>

 <div class="popup-item" data-id="chirag.chamoli">

       <div class="popup-user-status border-transparent-dark popup-user-status-online"></div>
       <div class="popup-user-avatar" style="background-image:url(https://cdn-demo.rocket.chat/avatar/chirag.chamoli?_dc=571);"></div>

     <strong>chirag.chamoli</strong>

           </div>

           <div class="popup-item" data-id="all"> <strong>all</strong> 提醒房间中的所有人


           </div>

       </div>


     </div>
   </div>
</template>

<script>

export default {
  name: 'roomUsers',
  props: {
    msg: Object
  }
}
</script>
