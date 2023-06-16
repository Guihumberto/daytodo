import { defineStore } from "pinia";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from 'vue-router'
const router = useRouter()


import { useListStore } from "./ListStore";
const listStore = useListStore();

import { useRecorrentStore } from '@/store/RecorrentStore'
const recorrentStore = useRecorrentStore()

export const useAuthStore = defineStore("auth", {
  state: () => ({
    users: [],
    user: {
      email: "",
      password: "",
      name: "",
      photo: "",
      uid: "",
    },
    isloggedIn: false,
  }),
  getters: {
    readLoggedIn() {
      return this.loggedIn;
    },
    readUser() {
      return this.user;
    },
  },
  actions: {
    // async registerUser(user) {
    //   Loading.show();
    //   await auth
    //     .createUserWithEmailAndPassword(user.email, user.password)
    //     .then((response) => {
    //       Loading.hide();
    //     })
    //     .catch((error) => {
    //       Loading.hide();
    //       showErrorMessage(error.message);
    //     });
    // },
    async loginUser(user) {
      const auth = getAuth()
      await signInWithEmailAndPassword(auth, user.email, user.password)
        .then((response) => {
          console.log(response, 'acertou');
        })
        .catch((error) => {
          console.log(error, 'errou');
        });
    },
    logOut() {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if(user) {
          this.isloggedIn = true
        } else {
          this.isloggedIn = false
          router.replace("/auth").catch((err) => {});
          this.user = {
            email: "",
            password: "",
          };
        }
      })
    },
    handlerAuthStateChange() {
      const auth = getAuth()
      auth.onAuthStateChanged((user) => {
        // Loading.hide();
        if (user) {
          this.isloggedIn = true;
          // LocalStorage.set("loggedIn", true);
          listStore.cargaList();
          recorrentStore.cargaList()
          // plan.cargaPlans();
          // router.replace("/");
        } else {
          this.isloggedIn = false;
          // LocalStorage.set("loggedIn", false);
        }
      });
    },
    // async loginGmail() {
    //   const provider = new firebase.auth.GoogleAuthProvider();
    //   firebase.auth().languageCode = "pt-br";

    //   try {
    //     //login user
    //     const result = await firebase.auth().signInWithPopup(provider);
    //     const user = result.user;
    //     this.setUser(user);
    //     //register user
    //     const usuario = {
    //       name: user.displayName,
    //       email: user.email,
    //       uid: user.uid,
    //       photo: user.photoURL,
    //     };
    //     //Guardar en Firestore
    //     await db.collection("usuarios").doc(usuario.uid).set(usuario);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    setUser(user) {
      this.user = {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
        uid: user.uid,
      };
    },
  },
});
