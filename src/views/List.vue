<template>
  <div class="list">
    <add-period class="add-period" />
    <listPeriod class="list-period" />
  </div>
</template>

<script setup>
  import addPeriod from '@/components/List/addPeriod.vue';
  import listPeriod from '@/components/List/listPeriod.vue';

</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.add-period {
  animation: slideTop 1s ease forwards;
  animation-delay: .5s;
  opacity: 0;
}
.list-period{
  animation: slideTop 1.2s ease forwards;
  animation-delay: 0.7s;
  opacity: 0;
}

@keyframes slideTop {
  0%{
    opacity: 0;
    transform: translateY(100px);
  }
  100%{
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
