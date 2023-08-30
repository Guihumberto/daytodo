<template>
  <div class="org">
    <v-select
      label="Filtrar"
      variant="outlined"
      density="compact"
      :items="list"
      item-title="name"
      item-value="id"
      v-model="selectItem"
    ></v-select>
    <recorrente />
  </div>
</template>

<script>
  import { useListStore } from '@/store/ListStore'
  const listStore = useListStore()

  import RecorrentesVue from './Recorrentes.vue'
  export default {
    components: {
      recorrente: RecorrentesVue
    },
    data(){
      return{
        selectItem: 0,
        list: [
          {id: 0, name:'Selecione'},
          {id: 1, name:'Cartão de Crédito'},
        ]
      }
    },
    watch:{
      'selectItem' :  {
          handler: function (after, before) {
            listStore.selectFilter(this.selectItem)
          }
      }
    },
    methods:{
      selectFilter(){
        listStore.selectFilter(this.selectItem)
      }
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
