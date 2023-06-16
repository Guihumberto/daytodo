<template>
  <div class="btnAdd">
      <v-menu location="top">
        <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            icon
            v-bind="props"
          >
          <v-icon size="x-large">mdi-plus</v-icon>
          </v-btn>
        </template>
          <v-btn
            v-for="(item, index) in items"
            :key="index"
            icon
            :color="item.color"
            class="mb-2"
            @click.stop="type = item.id"
          >
            <v-icon>{{ item.icon }}</v-icon>
            <v-dialog
              v-model="dialog"
              activator="parent"
              min-width="380"
            >
              <register :type="type" @close="dialog = false" />
            </v-dialog>
          </v-btn>

      </v-menu>
  </div>
</template>

<script>
import registerDialogVue from './Dialog/registerDialog.vue'
  export default {
    data () {
      return {
        dialog: false,
        type: null,
        items: [
          {id:1, title: 'Receita', icon: 'mdi-plus', color:'success' },
          {id:2, title: 'Despesa', icon: 'mdi-minus', color: 'error' },
        ],
      }
    },
    components: {
      register: registerDialogVue
    }
  }
</script>


<style scoped>
.btnAdd {
  position: fixed;
  bottom: 0;
  margin-bottom: 0.5rem;
}

</style>
