<template>
  <div class="wrapperinfo">
    <h1>Day-to-do</h1>
    <h6>Gerenciador de Finanças</h6>
    <v-divider class="my-5"></v-divider>
    <v-list class="bg-transparent">
      <v-list-item v-for="item, i in 5" :key="i">
        <template v-slot:prepend>
          <v-icon icon="mdi-square"></v-icon>
        </template>
        <v-list-item-title>Items</v-list-item-title>
      </v-list-item>
    </v-list>

  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>
.wrapperinfo{
  width: 90%;
  background: rgb(114, 145, 228);
  padding: 2rem;
  border-radius: 14px;
  line-height: 1.2;
  height: 450px;
  animation-delay: 1s;
  animation: sombra .5s ease forwards;
  transition: .5s;
}
@keyframes sombra {
  100%{
    box-shadow: 0 0 50px  rgb(173, 219, 221);
  }
}
.wrapperinfo h1 {
  font-size: 54px;
}
.wrapperinfo h6 {
  font-size: 20px;
}
</style>
