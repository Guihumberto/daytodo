<template>
  <div class="list">
    <InformationVue class="info" />
    <OrganizerVue class="org" />
    <RegistersVue />
    <addRegisterVue class="add" />
  </div>
</template>

<script setup>

  import addRegisterVue from "@/components/Register/addRegister.vue";
  import InformationVue from "@/components/Register/Information.vue";
  import OrganizerVue from "@/components/Register/Organizer.vue";
  import RegistersVue from "@/components/Register/Registers.vue";


</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.info {
  animation: slideTop 1.2s ease forwards;
  animation-delay: 0.2s;
  opacity: 0;
}
.org {
  animation: slideTop 1.2s ease forwards;
  animation-delay: 0.4s;
  opacity: 0;
}
.reg{
  animation: slideTop 1.2s ease forwards;
  animation-delay: 0.6s;
  opacity: 0;
}
.add {
  animation: slideTop 1.2s ease forwards;
  animation-delay: 0.8s;
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
