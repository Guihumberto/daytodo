<template>
  <div class="text-center">
    <v-btn
      color="transparent"
      class="ml-2"
    >
      <v-icon class="mt-2 ml-2" size="x-large">mdi-history</v-icon>

      <v-dialog
        v-model="dialog"
        activator="parent"
        width="auto"
        scrollable
      >
        <v-card min-width="350">
          <v-card-title class="bg-primary d-flex justify-space-between">
            Despesas Recorrentes
            <v-btn variant="text" flat @click.stop="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
          </v-card-title>
          <!-- filtros -->
          <v-card-text class="border-b" v-if="!selectList">
            <v-text-field
              label="Busca.."
              density="compact"
              variant="outlined"
              append-inner-icon="mdi-magnify"
              v-model="search"
              clearable
            ></v-text-field>
            <v-radio-group
              v-model="filterChoice"
              inline
            >
              <v-radio
                :label="item"
                :value="item"
                v-for="item, i in filter"
                :key="i"
              ></v-radio>
            </v-radio-group>
            <div class="d-flex justify-space-between">
              <v-btn size="small" variant="text" @click="desmarcarTodos()">Desmarcar Todos</v-btn>
              <v-btn size="small" variant="text" @click="marcarTodos()">Marcar todos</v-btn>
            </div>
          </v-card-text>
          <!-- incluir -->
          <v-card-text style="height: 400px;" v-if="!selectList">
            <v-list>
              <v-list-item v-for="item, i in listRecorrent" :key="i">
                <template v-slot:prepend="{ isActive }">
                  <v-list-item-action start>
                    <v-checkbox-btn
                      @click.stop="includeRegister(item)"
                      v-model="item.add"
                      ></v-checkbox-btn>
                </v-list-item-action>
                </template>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <template v-slot:append>
                  <v-icon
                    :color="item.operator ==  'credit' ? 'success':'error'"
                    :icon="item.operator ==  'credit' ? 'mdi-arrow-up':'mdi-arrow-down'">
                  </v-icon>
                  <v-btn @click="excluirRecorrent(item)" variant="text" color="red"><v-icon>mdi-delete</v-icon></v-btn>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
          <!-- adicionar -->
          <v-card-text style="height: 400px;" v-else>
            <v-list>
              <v-list-item v-for="item, i in listRecorrent.filter(x => x.add)" :key="i">
                <template v-slot:prepend>
                  <v-list-item-action start>
                    <v-checkbox-btn
                      @click.stop="includeRegister(item)"
                      v-model="item.add">
                    </v-checkbox-btn>
                </v-list-item-action>
                </template>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <template v-slot:append>
                  <v-icon
                  :color="item.operator ==  'credit' ? 'success':'error'"
                  :icon="item.operator ==  'credit' ? 'mdi-arrow-up':'mdi-arrow-down'">
                </v-icon>

                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
          <!-- acções -->
          <v-card-actions class="d-flex justify-end border-t">
            <v-btn color="primary" @click.stop="dialog = false">Cancelar</v-btn>
            <v-btn v-if="selectList" variant="plain"  @click.stop="selectList = false">Voltar</v-btn>
            <v-btn
              v-if="!selectList" variant="outlined" color="primary"
              @click.stop="addRegister()"
              :disabled="!listRecorrent.filter( x => x.add).length">incluir</v-btn>
            <v-btn
              v-else variant="outlined" color="success"
              @click.stop="addSelectedsRegister()"
              :disabled="!listRecorrent.filter( x => x.add).length">Adicionar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-btn>
  </div>
</template>

<script>
import { useRecorrentStore } from '@/store/RecorrentStore'
const recorrentStore = useRecorrentStore()

import { useExpanseStore } from "@/store/ExpanseStore";
const expanseStore = useExpanseStore();

  export default {
    data () {
      return {
        dialog: false,
        filter: ['Todos', 'Receita', 'Despesa'],
        search: null,
        filterChoice: 'Todos',
        selectList: false,
        check: true
      }
    },
    computed:{
      listRecorrent(){
        let list = this.listComplete

        if(this.filterChoice == 'Receita'){
          list = list.filter(x => x.operator == 'credit')
        }

        if(this.filterChoice == 'Despesa'){
          list = list.filter(x => x.operator == 'expanse')
        }

        return list
      },
      listComplete(){
        return recorrentStore.readRecorrent
      }
    },
    methods: {
      includeRegister(item){
        item.add = !item.add
        if(!this.listRecorrent.filter(x => x.add).length){
          this.selectList = false
        }
      },
      addRegister(){
        this.filterChoice = 'Todos',
        this.selectList = true
      },
      addSelectedsRegister(){
          this.listRecorrent.filter(x => x.add).forEach(x => {
            x.day = 1
            x.idList = this.$route.params.id
            x.recorrent = false
            x.fix = false
            expanseStore.addExpanse(x);
          })
          this.selectList = false
          this.dialog = false
          this.desmarcarTodos()
      },
      marcarTodos(){
        this.listComplete.forEach( x => {
          x.add = true
        })
      },
      desmarcarTodos(){
        this.listComplete.forEach( x => {
          x.add = false
        })
      },
      excluirRecorrent(item){
        recorrentStore.deleteRecorrent(item)
      }
    },
  }
</script>
