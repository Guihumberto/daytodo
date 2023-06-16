<template>
  <div class="main">
    <div class="text-center">
      <h1 class="title">DAY-TO-DO</h1>
      <v-btn
        color="primary"
        to="/login"
        variant="flat"
      >
        <v-icon
          icon="mdi-speedometer"
          size="large"
          start
        />
        ENTRAR
      </v-btn>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.main{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
.title {
  border: 2px solid #fff;
  margin-bottom: 1rem;
  min-width:228px;
  opacity: 0;
  animation: slideRight 1s ease forwards;
}

.v-btn{
  opacity: 0;
  animation: aparecer 1s ease forwards;
  animation-delay: 1s;
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
@keyframes aparecer {
  100%{
    opacity: 1;
  }
}
</style>
