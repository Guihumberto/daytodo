<template>
  <div class="org">
    <v-select
      label="Organizar"
      variant="outlined"
      density="compact"
    ></v-select>
    <recorrente />
  </div>
</template>

<script>
  import RecorrentesVue from './Recorrentes.vue'
  export default {
    components: {
      recorrente: RecorrentesVue
    }

  }
</script>

<style scoped>
.org {
  width: 1280px;
  display: flex;
  padding: 0 0.5rem;
}
@media (max-width: 1280px) {
  .org {
    width: 100%;
  }
}
</style>
