<template>
  <header>
    <div class="wrapper" @click="linkIndex()">
      <div class="logo">
        <h1>DAY-TO-DO</h1>
        <h6>Gerenciador de Finanças</h6>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  methods:{
    linkIndex () {
      this.$router.push("/").catch((err) => {});
    }
  }
}
</script>

<style scoped>
header {
  position: fixed;
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrapper {
  width: 1580px;
  display: flex;
  justify-content: end;
  align-items: center;
}
.logo {
  padding-right: 2rem;
  text-align: center;
  line-height: 1.2;
  animation: aparecer 1s ease forwards;
  animation-delay: 1s;
  opacity: 0;
  transition: .5s;
  cursor: pointer;
}
.logo:hover{
  color: #3072C5;
}
@keyframes aparecer {
  100%{
    opacity: 1;
  }
}
h1 {
  letter-spacing: .5px
}
h6 {
  font-size: 14px;
  letter-spacing: .4px;
}
@media (max-width: 1080px) {
  .wrapper {
    /* width: 100%; */
  }
}
</style>
