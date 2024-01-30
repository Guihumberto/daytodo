<template>
  <section id="login">
    <div class="wrapper">
      <div class="infoApp">
        <info />
      </div>
      <div class="login">
       <login />
      </div>
    </div>
  </section>
</template>

<script setup>
  import info from '@/components/Login/infoApp.vue'
  import login from '@/components/Login/Login.vue'
</script>

<style scoped>
section {
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1280px;
  margin: 0 15px;
}
.infoApp{
  width: 50%;
  animation: slideRight 1s ease forwards;
  animation-delay: 1s;
  opacity: 0;
}
.login{
  width: 50%;
  animation: slideRight 1s ease forwards;
  animation-delay: 1.2s;
  opacity: 0;
}
@keyframes slideRight {
  0%{
    opacity: 0;
    transform: translateX(-100px);
  }
  100%{
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 1167px) {
  .wrapper {
    margin: 0;
  }
  .infoApp {
    display: none;
  }
  .login{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
}

</style>''
