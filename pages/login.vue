<template>
  <div class="container">
    <div class="login__container">
      <p class="form__title">Login</p>
      <form class="login__form" @submit.prevent="login">
        <validation-observer ref="obs" v-slot="ObserverProps">
          <validation-provider v-slot="ProviderProps" rules="required">
            <div class="input__area">
              <fa :icon="['fas', 'envelope']" class="fontawesome" />
              <input type="email" name="Email" v-model="email" placeholder="Email" required />
            </div>
            <div class="error">{{ ProviderProps.errors[0] }}</div>
          </validation-provider>
          <validation-provider v-slot="ProviderProps" rules="required|min:8">
            <div class="input__area">
              <fa :icon="['fas', 'lock']" class="fontawesome" />
              <input type="password" name="Password" v-model="password" placeholder="Password" required />
            </div>
            <div class="error">{{ ProviderProps.errors[0] }}</div>
          </validation-provider>
        <button type="submit" :disabled="ObserverProps.invalid || !ObserverProps.validated">ログイン</button>
        </validation-observer>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith("laravelJWT", {
          data: {
            email: this.email,
            password: this.password,
          },
        });
        this.$router.push("/mypage");
      } catch {
        alert("メールアドレスまたはパスワードが間違っております");
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 95%;
  margin: 0 auto;
  height: 100vh;
}

.login__container {
  width: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  box-shadow: 5px 5px 5px gray;
}

.form__title {
    background-color: blue;
    color: #fff;
  border-radius: 5px 5px 0 0;
  padding: 20px;
  font-size: 18px


}

.login__form {
  background-color: #fff;
  padding: 20px;
  border-radius: 0 0 5px 5px;

}

input {
  width: 90%;
  height: 35px;
  font-size: 18px;
  position: absolute;
  left: 10%;
  top: 50%;
  transform: translate(0, -50%);
  border: none;
  border-bottom: 1px solid lightgray;
}

.input__area {
  height: 40px;
  position: relative;
}

button {
  color: #fff;
  background-color: blue;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 10px 0 0 auto;
  display: block;
  cursor: pointer;
}

.fontawesome {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}

.error {
  color: red;
  font-size: 14px;
}
</style>