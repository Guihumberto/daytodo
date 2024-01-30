<template>
  <div class="list">
    <add-period class="add-period" v-if="!showArchive" />
    <v-btn v-if="isArchive" @click="showArchive = !showArchive" variant="outlined"> <v-icon class="mr-2">mdi-archive</v-icon>Arquivados</v-btn>
    <listPeriod v-if="!showArchive" class="list-period" />
    <archiveList v-else class="list-period"/>
  </div>
</template>

<script>
  import addPeriod from '@/components/List/addPeriod.vue';
  import listPeriod from '@/components/List/listPeriod.vue';
  import archiveList from '@/components/List/archiveList.vue';

  import { useListStore } from '@/store/ListStore'
  const listStore = useListStore()

  export default{
    components:{
      addPeriod, listPeriod, archiveList
    },
    data(){
      return{
        showArchive: false
      }
    },
    computed:{
      isArchive(){
        return listStore.isArchive
      }
    }
  }

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
