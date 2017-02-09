
<template>
  <div id="im-chat">
    <imnavtab></imnavtab>

    <MessageSection></MessageSection>
  </div>


</template>

<script>

import imnavtab from './components/imnavtab'
import MessageSection from './components/MessageSection'

const NotFound = { template: '<p>Page not found</p>' }
const Home = { template: '<p>home page</p>' }
const About = { template: '<p>about page</p>' }
const routes = {
  '/': Home,
  '/about': About
}


export default {
  name: 'im-chat',
  components: {
    MessageSection:      MessageSection,
    imnavtab:   imnavtab
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
  margin-top: 0px;
}

.side-nav {
    color: rgba(255,255,255,0.6);
    background-color: #3f51b5
}
.side-nav {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 270px;
    height: auto;
    overflow: visible;
    z-index: 100;
    padding: 12px 0 0;
    will-change: transform
}

#im-chat {
    display: block;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: auto;
    height: auto;
    opacity: 1;
    visibility: visible;
    -webkit-transition: opacity 0.2s ease-out;
    -moz-transition: opacity 0.2s ease-out;
    -o-transition: opacity 0.2s ease-out;
    transition: opacity 0.2s ease-out
}
</style>
