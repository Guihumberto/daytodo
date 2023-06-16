/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDTngbtzVy3mMrmXdVALxYDQ5wokkjBa4",
  authDomain: "day-to-do-177e5.firebaseapp.com",
  databaseURL: "https://day-to-do-177e5-default-rtdb.firebaseio.com",
  projectId: "day-to-do-177e5",
  storageBucket: "day-to-do-177e5.appspot.com",
  messagingSenderId: "411946252324",
  appId: "1:411946252324:web:052dbcd6840e81288500b1"
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);
getDatabase(fire);

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
