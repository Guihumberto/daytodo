<template>
  <section class="sec-1 show-animate">
    <h1 class="animate">Habilidades</h1>
    <p class="animate">Desenvolvedor Frontend</p>
  </section>
</template>

<script setup>

</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #fff;
  color: #000;
  overflow: hidden;
}
h1 {
  font-size: 90px;
}
p {
  font-size: 35px;
  color: #0ef;
}

section .animate {
  transition: 1s;
}
.sec-1 .animate {
    transform: translateX(-100%);
    opacity: 0;
}
.sec-1.show-animate .animate {
    transform: translateX(0);
    opacity: 1;
}
</style>
