<template>
  <v-app class="bg-black">
    <appBar />
    <v-app-bar :elevation="0" color="black" app>
      <v-app-bar-title>Day-to-do</v-app-bar-title>
      <template v-slot:append>
        <v-menu location="right">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item to="/">
              <v-list-item-title>Sair</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>
    <default-view />
  </v-app>
</template>

<script setup>
  import DefaultView from './View.vue'
  import appBar from './SistemAppBar.vue'

  import { useAuthStore } from "@/store/AuthStore";
  const authStore = useAuthStore();

  authStore.handlerAuthStateChange();


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
