<template>
  <div id="app">
    <img src="./assets/logo.png">
    <chatlistview></chatlistview>
  </div>
</template>

<script>
import chatlistview from './components/chatListView'

export default {
  name: 'app',
  components: {
    chatlistview
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
