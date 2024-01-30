<template>
  <div class="list" v-if="listPeriod.length">
    <v-list class="wrapperlist">
      <v-list-item
        @click.stop="goTo(item.dateCreate)"
        class="listnew bg-black text-white" v-for="item, i in listPeriod" :key="i"
        :class="optionSelect == 2 && idEdit == item.dateCreate ? 'bg-red-accent-1' : 'bg-black' "
      >
        <template v-slot:prepend>
          <v-icon :icon="idEdit == item.dateCreate ? 'mdi-pencil' : 'mdi-calendar-check-outline'" />
        </template>
        <!-- iocao de editar -->
        <v-text-field
          v-if="idEdit == item.dateCreate && optionSelect == 1"
          density="compact"
          class="mt-5"
          v-model="item.name"
        ></v-text-field>
        <!-- opcao de remover -->
        <v-list-item-title
          v-else-if="idEdit == item.dateCreate && optionSelect == 2"
        >
          Deseja apagar esta lista?
        </v-list-item-title>
        <!-- exibicao normal -->
        <v-list-item-title v-else> {{ item.name }}</v-list-item-title>

        <template v-if="idEdit != item.dateCreate" v-slot:append>
          R$ {{ totalResumo(item.tasks) }}
          <v-btn
            variant="text"
            flat
            @click.stop="start = !start"
            class="ml-1"
          >
            <v-icon>mdi-dots-vertical</v-icon>

            <v-menu activator="parent">
              <v-list>
                <v-list-item
                  v-for="(opt, index) in items"
                  :key="index"
                  :value="index"
                  @click="menuOptionActive(opt.id, item.dateCreate)"
                >
                  <template v-slot:prepend>
                    <v-icon>{{ opt.icon }}</v-icon>
                  </template>
                  <v-list-item-title>{{ opt.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-btn>
        </template>
        <template v-else  v-slot:append>
          <v-btn @click.stop="cancel()" size="small" variant="text">Cancelar</v-btn>

          <v-btn @click.stop="editList(item)"  v-if="optionSelect == 1">Editar</v-btn>
          <v-btn color="error" @click.stop="apagarList(item)"  v-else>Apagar</v-btn>
        </template>
      </v-list-item>
    </v-list>
  </div>
  <div v-else class="load">
    <v-progress-circular
      indeterminate
      color="white"
    ></v-progress-circular>
  </div>
</template>

<script>
  import { useListStore } from '@/store/ListStore'
  const listStore = useListStore()

  export default {
    data(){
      return{
        start: false,
          items: [
            { id: 1, title: 'Editar', icon: 'mdi-square-edit-outline' },
            { id: 2, title: 'Deletar', icon: 'mdi-delete' },
            { id: 3, title: 'Desarquivar', icon: 'mdi-archive' },
            // { id: 3, title: 'Arquivar', icon: 'mdi-archive-arrow-down' },
          ],
        idEdit: 0,
        optionSelect: 0,
        listValues: listStore.readListTasks
      }
    },
    computed:{
      listPeriod(){
        return listStore.readList.filter(x => x.archive)
      },
      idDownloadList(){
        return listStore.readDownload
      },
      receber(){
        let somar = this.listValues.filter(x => x.operator == 'credit').map(x => parseFloat(x.mount))
        let total = 0;
        for ( let i = 0; i < somar.length; i++ ){
            total += somar[i]
        }
        return total.toFixed(2)
      },
      pagar(){
        let somar = this.listValues.filter(x => x.operator == 'expanse').map(x => parseFloat(x.mount))
        let total = 0;
        for ( let i = 0; i < somar.length; i++ ){
            total += somar[i]
        }
        return total.toFixed(2)
      },
      receberMenosPagar(){
        let total = this.receber - this.pagar
        return total.toFixed(2)
      }
    },
    methods: {
      goTo(item){
        if(this.optionSelect){
          if(this.idEdit != item){
            this.optionSelect = 0
            this.idEdit = 0
          }
        } else {
          listStore.clear()
          this.$router.push(`/list/register/${item}`)
        }
      },
      menuOptionActive(option, dateCreate){
        if(option == 3) {
          listStore.archiveBackPaste(dateCreate)
          return
        }
        this.optionSelect = option
        this.idEdit = dateCreate
      },
      totalResumo(item){
        let list = []
        let somar = []
        let diminuir = []
        let totalSoma = 0;
        let totalDiminuir = 0

        // Iteração pelo objeto
        for (const chave in item) {
          if (item.hasOwnProperty(chave)) {
            list.push((item[chave]));
          }
        }

        somar = list.filter(x => x.operator == 'credit').map(x => parseFloat(x.mount))
        for ( let i = 0; i < somar.length; i++ ){
            totalSoma += somar[i]
        }

        diminuir = list.filter(x => x.operator == 'expanse').map(x => parseFloat(x.mount))
        for ( let i = 0; i < diminuir.length; i++ ){
            totalDiminuir += diminuir[i]
       }

       let total = totalSoma.toFixed(2) - totalDiminuir.toFixed(2)
       return total.toFixed(2)
      },
      editList(item){
        listStore.editList(item)
        this.cancel()
      },
      apagarList(item){
        listStore.deleteList(item)
        this.cancel()
      },
      cancel(){
        this.optionSelect = 0
        this.idEdit = 0
      },
      loadLists(){
        listStore.cargaList();
      }
    }
  }
</script>

<style scoped>
.load {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
}
.list {
  width: 1280px;
  margin-top: 2rem;
}
.wrapperlist{
  padding: 0;
  width: 100%;
}
.listnew {
  border-bottom: 1px solid white;
}

@media (max-width: 1280px) {
  .list {
    width: 100%;
    margin-top: 2rem;
  }
}
</style>
