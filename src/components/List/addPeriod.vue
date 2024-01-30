<template>
  <div class="add">
   <v-text-field
    label="Criar Lista"
    placeholder="Digite o nome da lista"
    v-model="add"
    @keyup.enter="addPeriod()"
    clearable
    density="compact"
   >
   <template v-slot:append>
    <v-btn
      class="mt-3"
      @click="addPeriod()"
      color="success" :disabled="!add"
    >
    Add</v-btn>
   </template>
  </v-text-field>

  </div>
</template>

<script>
  import { useListStore } from '@/store/ListStore'
  const listStore = useListStore()

  export default {
    data(){
      return{
        add: null
      }
    },
    methods:{
      addPeriod(){
        listStore.addList(this.add)
        this.add = null
      }
    }
  }
</script>

<style scoped>
.add {
  width: 1280px;
  padding: 0 0.5rem;
}
@media (max-width: 1280px) {
  .add {
    width: 100%;;
  }
}

</style>
