import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from "./router"

import { registerPlugins } from '@/plugins'

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";




const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router)
})
app.use(pinia)
app.use(router)

const firebaseConfig = {
  apiKey: "AIzaSyDDTngbtzVy3mMrmXdVALxYDQ5wokkjBa4",
  authDomain: "day-to-do-177e5.firebaseapp.com",
  databaseURL: "https://day-to-do-177e5-default-rtdb.firebaseio.com",
  projectId: "day-to-do-177e5",
  storageBucket: "day-to-do-177e5.appspot.com",
  messagingSenderId: "411946252324",
  appId: "1:411946252324:web:052dbcd6840e81288500b1"
};

const fire = initializeApp(firebaseConfig);
getDatabase(fire);

registerPlugins(app)

app.mount('#app')
