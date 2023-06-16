<template>
  <v-footer app color="transparent" class="d-flex justify-center">
    <div class="text-center">
        Idealizado e desenvolvidor por <br>
        João Humberto S. Ribeiro Júnior
    </div>
  </v-footer>
</template>
<style scoped>
  div {
    color: #fff;
    animation: aparecer 1s ease forwards;
    animation-delay: 1.5s;
    opacity: 0;
    transition: .5s;
  }
  @keyframes aparecer {
  100%{
    opacity: 1;
  }
}
</style>
