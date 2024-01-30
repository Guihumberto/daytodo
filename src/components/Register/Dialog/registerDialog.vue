<template>
  <div class="wrapper">
    <v-card width="350px">
      <v-card-title class="d-flex justify-space-between align-center" :class="`bg-${typeDesign.color}`">
        Adicionar {{ typeDesign.title}}
        <v-btn variant="text" flat @click="$emit('close')"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-card-text class="mt-5">
        <v-form @submit.prevent="addRegister()" ref="forms">
          <v-text-field
            label="Nome"
            variant="outlined"
            :placeholder="type == 1  ? 'Digite o nome da receita' : 'Digite o nome da despesa'"
            v-model.trim="registerForm.name"
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
          <v-text-field
            label="Valor"
            variant="outlined"
            placeholder="Digite valor"
            v-model.trim="registerForm.mount"
            :rules="[(val) => !!val || 'Campo Obrigatório']"
            class="my-2"
          />
          <v-text-field
            label="Dia do vencimento"
            variant="outlined"
            placeholder="Digite o nome da receita"
            v-model.trim="registerForm.day"
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
          <v-select
            label="Grupo do Registro"
            variant="outlined"
            v-model.trim="registerForm.group"
            :items="type == 1  ? listCreditGroup : listExpanseGroup"
            class="mt-2"
          />
          <div class="d-flex justify-space-around">
            <v-checkbox
              color="primary" label="Recorrente" v-model="registerForm.recorrent"
              @keyup.right="registerForm.recorrent = !registerForm.recorrent"
            ></v-checkbox>
            <v-checkbox
              color="primary" v-if="registerForm.recorrent" label="Fixo" v-model="registerForm.fix"
              @keyup.right="registerForm.fix = !registerForm.fix"
            ></v-checkbox>
          </div>
          <v-card-actions class="d-flex justify-end border-t">
            <v-btn color="primary"  @click.stop="$emit('close')">Fechar</v-btn>
            <v-btn color="primary" variant="outlined" type="submit">Salvar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { useExpanseStore } from "@/store/ExpanseStore";
const expanseStore = useExpanseStore();

  export default {
    data(){
      return{
        registerForm: {
          name: "",
          group: "",
          mount: "",
          day: null,
          dateCreate: "",
          pay: false,
          recorrent: false,
          fix: false,
          mounthYear: "02/2023",
        },
      }
    },
    props:{
      type: Number,
    },
    watch:{
      'registerForm.recorrent' :  {
          handler: function (after, before) {
            if(!this.registerForm.recorrent){
            this.registerForm.fix = false
          }
        }
      }
    },
    computed:{
      listExpanseGroup() {
        return expanseStore.readExpanseList;
      },
      listCreditGroup() {
        return expanseStore.readCreditList;
      },
      typeDesign(){
        return this.type == 1
        ? {color: 'success', title: 'receita', icon:'mdi-plus'}
        : {color: 'error', title: 'despesa', icon:'mdi-minus'}
      }
    },
    methods: {
     async addRegister(){
        if(this.type == 1){
          this.registerForm.operator = "credit"
        } else {
          this.registerForm.operator = "expanse"
        }

        this.registerForm.idList = this.$route.params.id

        const { valid } = await this.$refs.forms.validate()
        if(valid){
          expanseStore.addExpanse(this.registerForm);
          this.$emit('close')
        }
      },
      clearForms(){
        this.registerForm = {
          name: "",
          group: "",
          mount: "",
          day: null,
          dateCreate: "",
          pay: false,
          recorrent: false,
          fix: false,
          mounthYear: "02/2023",
        }
      }
    }
  }
</script>

<style scoped>
.wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
