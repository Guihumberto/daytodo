<template>
  <!-- download -->
  <div v-if="!isDownloadComplete">
    <v-progress-circular
      indeterminate
      color="white"
    ></v-progress-circular>
  </div>

  <!-- list -->
  <div v-else class="list">
    <!-- pendentes -->
    <v-list class="wrapperlist" v-if="list.filter(x => !x.pay).length">
      <v-list-subheader>
        Pendentes
        <v-btn
          variant="text" flat
          @click.stop="showConcluidos = !showConcluidos">
          <v-icon>{{showConcluidos ? 'mdi-chevron-down' : 'mdi-chevron-right'}}</v-icon>
        </v-btn>
      </v-list-subheader>
      <v-expand-transition>
        <div v-show="showConcluidos">
          <v-list-item
            v-if="list.length" class="listnew listPendente bg-black text-white"
            v-for="item, i in list.filter(x => !x.pay)" :key="i"
            :class="optionSelect == 2 && idEdit == item.dateCreate ? 'bg-red-accent-1' : 'bg-black'"
            @click.stop="changePayStatus(item)"
          >
            <template v-slot:prepend="{ isActive }">
              <v-list-item-action start>
                <v-icon class="pl-4" v-if="optionSelect == 2 && idEdit == item.dateCreate" :icon="iconsTextOptions.icon" />
                <v-checkbox-btn
                  v-else
                  v-model-value="item.pay"
                  disabled
                >
                </v-checkbox-btn>
              </v-list-item-action>
            </template>

            <!-- opcao de remover -->
            <v-list-item-title
              v-if="idEdit == item.dateCreate && optionSelect == 2"
              class="text-center deleteText"
            >
              Deseja apagar esta lista?
            </v-list-item-title>

            <!-- opcao normal -->
            <v-list-item-title v-else>
              <v-icon
                :color=" item.operator == 'credit' ?'success' :'error'">{{ item.operator == 'credit' ? 'mdi-arrow-up' : 'mdi-arrow-down'}}
              </v-icon>
              {{ item.name }} <v-icon v-if="item.agendado" size="x-small">mdi-clock</v-icon>
            </v-list-item-title>

            <!-- opcoes deletar -->
            <template v-if="optionSelect == 2 && idEdit == item.dateCreate"  v-slot:append>
              <v-btn @click.stop="optionSelect = 0, idEdit = 0" size="small" variant="text">Cancelar</v-btn>
              <v-btn @click.stop="optionSelect = 0, idEdit = 0"  v-if="optionSelect == 1">Editar</v-btn>
              <v-btn color="error" @click.stop="deleteRegister(item)"  v-else>Apagar</v-btn>
            </template>

            <!-- lista menu e valor -->
            <template v-else v-slot:append>
              R$ {{ item.mount }}
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
                      @click.stop="menuOptionActive(opt.id, item)"
                    >
                      <template v-slot:prepend>
                        <v-icon>{{ opt.icon }}</v-icon>
                      </template>
                      <v-list-item-title>{{ opt.title }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                      v-if="item.operator == 'expanse' && !item.agendado"
                      @click.stop="item.agendado = true, menuOptionActive(4, item)"
                    >
                      <template v-slot:prepend>
                        <v-icon>mdi-clock</v-icon>
                      </template>
                      <v-list-item-title>Agendar</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                      v-if="item.operator == 'expanse' && item.agendado"
                      @click.stop="item.agendado = false, menuOptionActive(4, item)"
                    >
                      <template v-slot:prepend>
                        <v-icon>mdi-clock</v-icon>
                      </template>
                      <v-list-item-title>Cancelar Ag.</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-btn>
            </template>
          </v-list-item>
        </div>
      </v-expand-transition>
    </v-list>
    <div v-else>
      <v-icon size="small">mdi-square-outline</v-icon>
      Não há registros pendentes
    </div>

    <!-- concluidos -->
    <v-list class="wrapperlist" v-if="list.filter(x => x.pay).length">
      <v-list-subheader class="bg-success">
        Concluídos
        <v-btn variant="text" flat @click.stop="showPendentes = !showPendentes"><v-icon>{{showPendentes ? 'mdi-chevron-down' : 'mdi-chevron-right'}}</v-icon></v-btn>
      </v-list-subheader>
      <v-expand-transition>
        <div v-show="showPendentes">
          <v-list-item
            v-if="list.length"
            class="listnew listConcluido bg-black text-white"
            v-for="item, i in list.filter(x => x.pay)" :key="i"
            @click="changePayStatus(item)"
          >
            <template v-slot:prepend="{ isActive }">
              <v-list-item-action start>
                <v-checkbox-btn
                  v-model="item.pay"
                  disabled
                ></v-checkbox-btn>
              </v-list-item-action>
            </template>
            <v-list-item-title class="text-decoration-line-through">
              <v-icon
                :color=" item.operator == 'credit' ?'success' :'error'">
                {{ item.operator == 'credit' ? 'mdi-arrow-up' : 'mdi-arrow-down'}}
              </v-icon>
              {{ item.name }}
            </v-list-item-title>
            <template v-slot:append>
              <span class="text-decoration-line-through"> R$ {{ item.mount }}</span>
            </template>
          </v-list-item>
        </div>
      </v-expand-transition>
    </v-list>
    <div v-else>
      <v-icon size="small">mdi-check</v-icon>
      Não há registros concluídos
    </div>
  </div>

  <!-- dialog edit -->
  <v-dialog
    v-model="dialogEdit"
    max-width="500px"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title
        class="d-flex justify-space-between bg-primary"
      >
        Editar registro
        <v-btn variant="text"
          @click.stop="dialogEdit = false"
        ><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="editRegister()" ref="forms">
          <v-text-field
            label="Nome"
            variant="outlined"
            :placeholder="formEdit.operator == 'credit'  ? 'Digite o nome da receita' : 'Digite o nome da despesa'"
            v-model.trim="formEdit.name"
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
          <v-text-field
            label="Valor"
            variant="outlined"
            placeholder="Digite valor"
            v-model.trim="formEdit.mount"
            :rules="[(val) => !!val || 'Campo Obrigatório']"
            class="my-2"
          />
          <v-text-field
            label="Dia do vencimento"
            variant="outlined"
            placeholder="Digite o nome da receita"
            v-model.trim="formEdit.day"
            :rules="[(val) => !!val || 'Campo Obrigatório']"
          />
          <v-card-actions class="d-flex justify-end">
            <v-btn
              @click.stop="dialogEdit = false"
            >Cancelar</v-btn>
            <v-btn
              type="submit"
              variant="outlined" color="primary">Editar
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
  <!-- form agendamento -->
  <v-dialog
    v-model="dialogInfo"
    max-width="500px"
    transition="dialog-transition"
    >
    <v-card>
      <v-card-text>
        {{  formEdit.agendado ? 'Agendado' : 'agendamento cancelado'}}

      </v-card-text>
      <v-card-actions>
        <v-btn block @click="dialogInfo = ! dialogInfo">FECHAR</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { useListStore } from '@/store/ListStore'
  const listStore = useListStore()

  import { useExpanseStore } from '@/store/ExpanseStore'
  const expanseStore = useExpanseStore()

  export default {
    data(){
      return{
        showConcluidos: true,
        showPendentes: true,
        idEdit: 0,
        optionSelect: 0,
        items: [
          { id: 1, title: 'Editar', icon: 'mdi-square-edit-outline' },
          { id: 2, title: 'Deletar', icon: 'mdi-delete' },
        ],
        dialogEdit: false,
        formEdit : {},
        select: { id: 5, title: "mais recente para o mais antigo" },
        dialogInfo: false
      }
    },
    computed:{
      registerListPendent(){
        return this.list
      },
      registerListPay() {
        return listStore.readListPay.sort(this.order);
      },
      list(){
        let list = listStore.readListTasks.sort(this.order);
        if(listStore.readFilter == 1){
          list = list.filter(x => x.group == 'Cartão de Crédito')
        }
        return list
      },
      isDownloadComplete(){
        return listStore.readDownload
      },
      iconsTextOptions(){
        let list = {
          icon: 'mdi-home',
          title: 'Editar'
        }
        switch(this.optionSelect) {
          case 1:
            list = this.items[0];
            break;
          case 2:
            list = this.items[1]
            break;
        }
        return list
      }
    },
    methods: {
      order(a, b) {
        return a.day < b.day;
        // switch (this.select.id) {
        //   case 1:
        //     a.dateCreate > b.dateCreate;
        //     break;
        //   case 2:
        //     a.dateCreate < b.dateCreate;
        //     break;
        //   case 3:
        //     a.operator > b.operator;
        //     break;
        //   case 4:
        //     a.operator < b.operator;
        //     break;
        //   case 5:
        //     a.day < b.day;
        //     break;
        //   default:
        //     return 0;
        // }
      },
      menuOptionActive(option, item){
        this.optionSelect = option
        this.idEdit = item.dateCreate
        if(this.optionSelect == 1){
          this.dialogEdit = true
          this.formEdit = item
        }
        if(this.optionSelect == 4){
          this.formEdit = item
          this.dialogInfo = true
          expanseStore.editRegister(item)
        }
      },
      async editRegister(){
        const { valid } = await this.$refs.forms.validate()

        if(valid){
          expanseStore.editRegister(this.formEdit)
          this.formEdit = {}
          this.dialogEdit = false
        }

      },
      deleteRegister(item){
        expanseStore.deleteRegister(item)
        this.optionSelect = 0
        this.idEdit = 0
      },
      changePayStatus(item) {
        item.pay = !item.pay
        if(item.pay && item.agendado){
          item.agendado = false
        }
        expanseStore.editRegisterStatus(item)
      }
    },
    created(){
      listStore.idList = this.$route.params.id
      setTimeout(() => {
        listStore.cargaListTasks()
      }, "2000")
    }
  }
</script>

<style scoped>
.list {
  width: 1280px;
  margin-top: 0.5rem;
}
.wrapperlist{
  padding: 0;
  width: 100%;
}
.listnew {
  border-bottom: 1px solid white;
}
.wrapperlist{
  opacity: 0;
  animation: aparecer 1s ease forwards;
}
@keyframes aparecer {
  100%{
    opacity: 1;
  }
}
.listPendente:last-child {
  opacity: 0;
  animation: aparecer 1s ease forwards;
}
.listConcluido:last-child {
  opacity: 0;
  animation: aparecer 1.5s ease forwards;
}

.deleteText {
  opacity: 0;
  transition: .5s;
  animation: textDel 1s ease forwards;
}

@keyframes textDel {
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 1280px) {
  .list {
    width: 100%;
  }
}
</style>
