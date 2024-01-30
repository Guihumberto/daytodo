import { defineStore } from "pinia";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, set, remove } from "firebase/database";

export const useRecorrentStore = defineStore("recorrent", {
  state: () => ({
    listRecorrent: [],
    downloadOK: false,
  }),
  getters: {
    readRecorrent() {
      this.listRecorrent.forEach( x => {
        x.add = false
      })
      return this.listRecorrent;
    },
  },
  actions: {
    async cargaList(){
      let userUid = getAuth().currentUser.uid
      const db = getDatabase();

      const starCountRef = ref(db, `todo/${userUid}/recorrent`);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        this.listRecorrent = []
        for (let id in data){
          this.listRecorrent.push(data[id])
        }
        this.completeDowload(true)
      });
    },
    completeDowload(value) {
      this.downloadOk = value;
    },
    addTaskRecorrent(item) {
      item.idList = null;

      const db = getDatabase();
      let userUid = getAuth().currentUser.uid
      set(ref(db, `/todo/${userUid}/recorrent/${item.dateCreate}`), item);

    },
    deleteRecorrent(item){
      const db = getDatabase();
      let userUid = getAuth().currentUser.uid

      remove(ref(db, `/todo/${userUid}/recorrent/${item.dateCreate}`))
    }
  },
});
