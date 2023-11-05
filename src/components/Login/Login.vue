<template>
  <div class="wrapperLogin">
    <h1 class="text-center mb-10">Entrar</h1>
    <v-form @submit.prevent="login()" ref="forms">
      <v-text-field
        label="E-mail"
        placeholder="Digite seu e-mail"
        prepend-inner-icon="mdi-email"
        type="email"
        v-model="user.email"
        variant="solo"
        @keydown.esc="user.email = ''"
      ></v-text-field>
      <v-text-field
        label="Senha"
        placeholder="Digite sua senha"
        variant="solo"
        prepend-inner-icon="mdi-lock"
        class="my-3"
        type="password"
        v-model="user.password"
      ></v-text-field>
      <p v-if="errMsg" class="text-center text-red">{{ errMsg }}</p>
      <v-btn block color="primary" type="submit">Entrar</v-btn>
      <div class="links py-3 my-4 justify-space-between">
        <a href="#"> <v-icon size="small">mdi-account-plus</v-icon> Criar conta</a>
        <a href="#">Esqueceu sua senha?</a>
      </div>
    </v-form>
    <div class="logoinwithgoogle">
      <a @click.prevent="google()" class="border">
        <v-icon size="small" class="mr-1">mdi-google</v-icon>
        Entrar com Google
      </a>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/store/AuthStore";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const auth = useAuthStore();

export default {
  name: "loginComponent",
  props: ["tab"],
  data() {
    return {
      auth,
      user: {
        name: "",
        email: "",
        password: "",
      },
      errMsg: ''
    };
  },
  methods: {
    isValidEmail(email) {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    },
    async login() {
      const { valid } = await this.$refs.forms.validate()
      if(valid){
        const auth = getAuth()
        await signInWithEmailAndPassword(auth, this.user.email, this.user.password)
          .then((response) => {
            console.log(response, 'acertou');
            this.$router.push("/list")
          })
          .catch((error) => {
            console.log(error, 'errou');
            switch (error.code) {
              case "auth/invalid-email":
                this.errMsg = "E-mail inválido"
                break;
              case "auth/user-not-found":
                this.errMsg = "Nenhuma conta com este email foi encontrada"
                break;
              case "auth/wrong-password":
                this.errMsg = "Senha errada"
                break;
              default:
                this.errMsg = "E-mail ou senha incorreto"
                break;
            }
          });
      }
    },
    google(){
      const provider = new GoogleAuthProvider();
      // firebase.auth().languageCode = "pt-br";
      signInWithPopup(getAuth(), provider)
      .then((result) => {
        console.log(result.user)
        this.$router.push("/list")
      })
      .catch((error) => {
        console.log('deu erro', error)
      })
    }
  },
};
</script>

<style scoped>
.wrapperLogin{
  width: 90%;
  border: 2px solid grey;
  border-radius: 14px;
  padding: 2rem;
  color: #fff;
  height: 450px;
}
.links {
  display: flex;
  flex-wrap: wrap;
}
.links a {
  color: #fff;
  text-decoration: none;
  padding: 0.2rem 0.8rem;
  transition: .5s;
  border: 2px solid blue;
  border-radius: 14px;
  letter-spacing: 1px;
  margin-bottom: 5px;
}
.links a:hover {
  background: blue;
  box-shadow: 0 0 20px blue;
}
.logoinwithgoogle {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 50px;
}
.logoinwithgoogle a{
  background: #000;
  padding: 6px;
  border: 2px solid rgb(220, 220, 231);
  border-radius: 16px;
  transition: 1s ;
}
.logoinwithgoogle a:hover{
  background: #de5448;
}
@media (max-width: 1167px) {
  .wrapperLogin {
    max-width: 440px;
  }
}
</style>
