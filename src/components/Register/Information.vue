<template>
  <div class="wrapper">
    <div class="main">
      <v-btn color="transparent" icon="mdi-chevron-left" to="/list"></v-btn>
      <h2
        v-if="nameListItems">{{ nameListItems.name }}
        <v-icon @click="details = !details"> {{ details ? 'mdi-chevron-down' : 'mdi-chevron-right' }} </v-icon>
      </h2>
      <resumo :listValues="listValues" />
    </div>
  </div>
  <v-expand-transition>
    <div class="details" v-if="details">
      <v-row class="text-center my-5" justify="center" align-content="center" align="center" no-gutters>
        <v-col cols="6">
          <v-icon color="success" size="small" class="mb-1" icon="mdi-arrow-up" />
          Receitas
        </v-col>
        <v-col cols="6">
          <v-icon color="error" size="small" class="mb-1" icon="mdi-arrow-down" />
          Despesas
        </v-col>
        <v-col cols="6"><span>F:</span> R$ {{ receberFalta }}</v-col>
        <v-col cols="6"><span>F:</span> R$ {{ pagarFalta }}</v-col>
        <v-col cols="6"><span>R:</span> R$ {{ receber }}</v-col>
        <v-col cols="6"><span>P:</span> R$ {{ pagar }}</v-col>
      </v-row>
      <v-row align="center" class="text-center mb-1" v-if="listPagamentosAgendados.list.length" @click="dialogDetalhesAgendados = true">
        <v-col class="text-right" cols="6"> <v-icon size="small" class="mr-2">mdi-clock</v-icon> AGENDADO:</v-col>
        <v-col class="text-left">R$ {{listPagamentosAgendados.total }}</v-col>
      </v-row>
    </div>
  </v-expand-transition>
  <v-dialog
    v-model="dialogDetalhesAgendados"
    max-width="450"
  >
    <v-card>
      <v-card-title class="bg-primary d-flex justify-space-between align-center">
        Lista Agendados
        <v-icon @click="dialogDetalhesAgendados = false" size="small">mdi-close</v-icon>
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="item, i in listPagamentosAgendados.list" :key="i">
            <v-list-item-title>{{item.name}}</v-list-item-title>
            <template v-slot:append>
              R$ {{ item.mount }}
              <v-icon @click="removeAgendado(item)" color="error" size="small">mdi-close</v-icon>
            </template>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class=" bg-grey text-center">Total R$ {{ listPagamentosAgendados.total }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-btn block @click="dialogDetalhesAgendados = false">FECHAR</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ResumoVue from './Resumo.vue'
import { useListStore } from '@/store/ListStore'
const listStore = useListStore()

import { useExpanseStore } from '@/store/ExpanseStore'
  const expanseStore = useExpanseStore()

export default {
    data(){
      return{
        details: false,
        dialogDetalhesAgendados: false
      }
    },
    computed:{
      nameListItems(){
        return listStore.readListItems
      },
      listValues(){
        return listStore.readListTasks
      },
      receberFalta(){
        let somar = this.listValues.filter(x => x.operator == 'credit' && !x.pay).map(x => parseFloat(x.mount))
        let total = 0;
        for ( let i = 0; i < somar.length; i++ ){
            total += somar[i]
        }
        return total.toFixed(2)
      },
      receber(){
        let somar = this.listValues.filter(x => x.operator == 'credit' && x.pay).map(x => parseFloat(x.mount))
        let total = 0;
        for ( let i = 0; i < somar.length; i++ ){
            total += somar[i]
        }
        return total.toFixed(2)
      },
      pagarFalta(){
        let somar = this.listValues.filter(x => x.operator == 'expanse' && !x.pay).map(x => parseFloat(x.mount))
        let total = 0;
        for ( let i = 0; i < somar.length; i++ ){
            total += somar[i]
        }
        return total.toFixed(2)
      },
      pagar(){
        let somar = this.listValues.filter(x => x.operator == 'expanse' && x.pay).map(x => parseFloat(x.mount))
        let total = 0;
        for ( let i = 0; i < somar.length; i++ ){
            total += somar[i]
        }
        return total.toFixed(2)
      },
      listPagamentosAgendados(){
        let list = this.listValues.filter(x => x.operator == 'expanse' && x.agendado && !x.pay)
        let somar = this.listValues.filter(x => x.operator == 'expanse' && x.agendado && !x.pay).map(x => parseFloat(x.mount))
        let total = 0;
        for ( let i = 0; i < somar.length; i++ ){
            total += somar[i]
        }
        return {total, list}
      }
    },
    components: {
      resumo: ResumoVue
    },
    methods:{
      removeAgendado(item){
          item.agendado = false
          expanseStore.editRegister(item)
      }
    }
  }
</script>

<style scoped>
.wrapper {
  width: 1280px;
  padding: 10px 5px;
  display: flex;
  flex-direction: column;
}
.wrapper .main {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.wrapper .details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
}
.v-btn--variant-text {
  padding: 0;
}
@media (max-width: 1280px) {
  .wrapper {
    width: 100%;
  }
}
</style>
