import { defineStore } from "pinia";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, update, remove } from "firebase/database";

import { useRecorrentStore } from "@/store/RecorrentStore";
const recorrentStore = useRecorrentStore();

export const useExpanseStore = defineStore("expanse", {
  state: () => ({
    listExpanse: [],
    downloadOk: false,
    listExpanseGroup: [
      "Cartão de Crédito",
      "Mercado",
      "Transporte",
      "Lanches",
      "Moradia",
      "Theodoro",
      "Guilherme",
      "Empréstimo",
      "Belize",
      "Idalina",
      "Investimento",
      "Presentes",
      "Games"
    ],
    listCreditGroup: ["Salário", "Aluguel", "Emprestado", "Idalina", "Papai", "Samanta"],
  }),
  getters: {
    readListExpanse() {
      return this.listExpanse;
    },
    readDownload() {
      return this.downloadOk;
    },
    readExpanseList() {
      const arrUnique = [...new Set(this.listExpanseGroup)];
      return arrUnique;
    },
    readCreditList() {
      const arrUnique = [...new Set(this.listCreditGroup)];
      return arrUnique;
    },
  },
  actions: {
    addExpanse(item) {
      let expanse = {
        idList: item.idList,
        name: item.name,
        group: item.group,
        mount: item.mount,
        day: item.day,
        dateCreate: Date.now(),
        pay: item.pay,
        recorrent: item.recorrent,
        fix: item.fix,
        operator: item.operator,
        mounthYear: item.mounthYear,
      };

      const db = getDatabase();
      let userUid = getAuth().currentUser.uid

      set(ref(db, `/todo/${userUid}/list/${expanse.idList}/tasks/${expanse.dateCreate}`), expanse);


      if (expanse.recorrent) {
        recorrentStore.addTaskRecorrent(expanse);
      }
    },
    editRegister(item) {
      const db = getDatabase();
      let userUid = getAuth().currentUser.uid
      update(ref(db, `/todo/${userUid}/list/${item.idList}/tasks/${item.dateCreate}`), item);
    },
    editRegisterStatus(item){
      const db = getDatabase();
      let userUid = getAuth().currentUser.uid
      update(ref(db, `/todo/${userUid}/list/${item.idList}/tasks/${item.dateCreate}`), item);
    },
    deleteRegister(item) {
      const db = getDatabase();
      let userUid = getAuth().currentUser.uid

      remove(ref(db, `/todo/${userUid}/list/${item.idList}/tasks/${item.dateCreate}`))

    }
  },
});
