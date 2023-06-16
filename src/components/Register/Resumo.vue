<template>
  <div class="text-center">
    <v-btn
      color="transparent"
    >
      <v-icon size="large">mdi-information</v-icon>

      <v-dialog
        v-model="dialog"
        activator="parent"
        max-width="400"

      >
        <v-card>
          <v-card-text class="bg-green">
            <h3 class="text-center">Resumo</h3>
            <v-divider></v-divider>
            <v-row class="mt-5">
              <v-col class="my-0 py-0" cols="7">Recebido/a receber</v-col>
              <v-col class="my-0 py-0">R$ {{ receber }}</v-col>
              <v-col cols="7">Pago/a pagar</v-col>
              <v-col>R$ {{ pagar }}</v-col>
              <v-col class="my-0 py-0" cols="7">SALDO</v-col>
              <v-col class="mt-0 pt-0" cols="5">R$ {{ receberMenosPagar }}</v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn color="success" block @click="dialog = false">Fechar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-btn>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
      }
    },
    props:{
      listValues: Array
    },
    computed:{
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
    }
  }
</script>
