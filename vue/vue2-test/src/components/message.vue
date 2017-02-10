<template>
  <li class="message-list-item">
    <h5 class="message-author-name">{{ message.authorName }}</h5>
    <div class="message-time">
      {{ message.timestamp | time }}
    </div>
    <div v-if="message.msg_type=='img'" class="message-img">
        <span><img :src="message.url" alt="People"></span>
    </div>
    <div v-else class="message-text">{{ message.text }}</div>
  </li>
</template>

<script>

export default {
  name: 'Message',
  props: {
    message: Object
  }
}
</script>
