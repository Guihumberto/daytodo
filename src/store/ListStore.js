import { defineStore } from "pinia";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, set, remove, update } from "firebase/database";

export const useListStore = defineStore("list", {
  state: () => ({
    list: [],
    tasks: [],
    downloadOk: false,
    listItems: null,
    idList: null,
    filter: 0,
  }),
  getters: {
    readList() {
      let values = this.list.filter(function (a) {
        return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
      }, Object.create(null));
      return values;
    },
    readListTasks(){
      return this.tasks
    },
    readDownload() {
      return this.downloadOk;
    },
    readListItems() {
        const list = this.list.find( x => x.dateCreate == this.idList)
        return list
    },
    readListPendent() {
      return this.readListItems.filter((x) => !x.pay);
    },
    readListPay() {
      return this.readListItems.filter((x) => x.pay);
    },
    sumCredit(){
      return 10
    },
    sumExpanse(){
      return 5
    },
    totalMonth(){
      return this.sumCredit - this.sumExpanse
    },
    readFilter(){
      return this.filter
    },
    isArchive(){
      const exist = this.readList.filter(x => x.archive)
      const result = exist.length ? true : false 
      return result
    }
  },
  actions: {
    async cargaList(){
        let userUid = getAuth().currentUser.uid
        const db = getDatabase();

        const starCountRef = ref(db, `todo/${userUid}/list`);
        onValue(starCountRef, (snapshot) => {
          this.list = []
          const data = snapshot.val();
          for (let id in data){
            this.list.push(data[id])
          }
          this.completeDownload(true)
        });
    },
    async cargaListTasks(){
      let userUid = getAuth().currentUser.uid
      const db = getDatabase();
      const starCountRef = ref(db, `todo/${userUid}/list/${this.idList}/tasks`);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        this.tasks = []
        for (let id in data){
          this.tasks.push(data[id])
        }
        this.completeDownload(true)
      });
    },
    addList(item) {
      let list = {
        name: item,
        dateCreate: Date.now(),
        complete: false,
        archive: false,
      };

      const db = getDatabase();
      let userUid = getAuth().currentUser.uid
      set(ref(db, `/todo/${userUid}/list/${list.dateCreate}`), list);
    },
    editList(item) {

      let editList = {
        name: item.name,
        dateCreate: item.dateCreate
      };

      const db = getDatabase();
      let userUid = getAuth().currentUser.uid
      update(ref(db, `/todo/${userUid}/list/${editList.dateCreate}`), editList);
    },
    deleteList(item) {
      const db = getDatabase();
      let userUid = getAuth().currentUser.uid

      remove(ref(db, `/todo/${userUid}/list/${item.dateCreate}`))
    },
    completeDownload(value) {
      this.downloadOk = value;
    },
    clear(){
      this.tasks = []
      this.downloadOk = false
    },
    selectFilter(item){
      this.filter = item
    },
    archivePaste(item){
      let editList = {
        archive: true,
        dateCreate: item
      };

      const db = getDatabase();
      let userUid = getAuth().currentUser.uid
      update(ref(db, `/todo/${userUid}/list/${editList.dateCreate}`), editList);
    },
    archiveBackPaste(item){
      let editList = {
        archive: false,
        dateCreate: item
      };

      const db = getDatabase();
      let userUid = getAuth().currentUser.uid
      update(ref(db, `/todo/${userUid}/list/${editList.dateCreate}`), editList);
    }
  },
});
