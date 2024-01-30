<template>
  <v-app class="bg-black">
    <default-bar />
    <default-view />
    <Footer />
  </v-app>
</template>

<script setup>
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
  import Footer from './Footer.vue';
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  border: none;
  outline: none;
  scroll-behavior: smooth;
  font-family: 'Poppins', sans-serif;
}
:root{
  --bg-color:#081b29;
  --second-bg-color: #112e42;
  --text-color: #ededed;
  --main-color: #6606a4;
  --second-main-color: #57b6bd;
}
html{
  /* font-size: 62.5%; */
  overflow-x: hidden;
}
body{
  background: var(--bg-color);
  color: var(--text-color);
}
.app {
  background: rgb(24, 21, 21);
}
</style>
