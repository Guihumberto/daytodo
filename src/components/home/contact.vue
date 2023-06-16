<template>
  <section class="sec-3">
    <h1 class="animate">Contato</h1>
    <p class="animate">juninho.joao@hotmail.com</p>
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
  background: #fff;
  color: #000;
  overflow: hidden;
}
h1 {
  font-size: 90px;
}
p {
  font-size: 35px;
  color: #e0f;
}
section .animate {
  transition: 1s;
  filter: blur(5px)
}
section.show-animate .animate {
  filter: blur(0)
}
.sec-3 .animate {
    transform: scale(.7);
}
.sec-3.show-animate .animate {
    transform: scale(1);
}
</style>
