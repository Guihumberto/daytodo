<template>
  <section class="sec-2">
    <h1 class="animate">Oi, eu sou Humberto</h1>
    <p class="animate">Desenvolvedor Frontend</p>
  </section>
</template>

<script>
  export default {

  }
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #000;
  color: #fff;
  overflow: hidden;
}
h1 {
  font-size: 90px;
}
p {
  font-size: 35px;
  color: #0f0;
}

section .animate {
  transition: 1s;
}
.sec-2 .animate {
    transform: translateX(100%);
}
.sec-2.show-animate .animate {
    transform: translateX(0);
}

</style>
