<template>


<aside class="side-nav" role="navigation">

<chatListSection>
</chatListSection>

</aside>



</template>

<script>

import chatListSection from './chatListSection'

export default {
  name: 'imnavtab',
  components: {
    chatListSection:   chatListSection,
  }
}
</script>

<style scoped>
.side-nav{
  border-right: #d0cccc 1px;
    border-style: solid;
  }

</style>
