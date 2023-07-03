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
      <v-btn block color="primary" type="submit">Entrar</v-btn>
      <div class="links py-3 my-4 justify-space-between">
        <a href="#"> <v-icon size="small">mdi-account-plus</v-icon> Criar conta</a>
        <a href="#">Esqueceu sua senha?</a>
      </div>
    </v-form>

  </div>
</template>

<script>
import { useAuthStore } from "@/store/AuthStore";
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
        auth.loginUser(this.user);
        this.$router.push("/list")
      }

    },
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
@media (max-width: 1167px) {
  .wrapperLogin {
    max-width: 440px;
  }
}
</style>
