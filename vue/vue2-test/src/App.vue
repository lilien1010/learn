
<template>
  <div id="rocket-chat">
    <div class="connection-status">
		 </div>

    <imnavtab_rock></imnavtab_rock>

    <MessageSection></MessageSection>
  </div>


</template>

<script>

import imnavtab from './components/imnavtab'
import imnavtab_rock from './components/imnavtab_rock'
import MessageSection from './components/MessageSection'



export default {
  name: 'rocket-chat',
  components: {
    MessageSection:      MessageSection,
    imnavtab_rock:imnavtab_rock
  }
}
</script>

<style>


</style>
