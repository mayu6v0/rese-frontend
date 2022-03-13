<template>
  <div class="container">
  <Header />
    <div class="login-container">
      <p class="form-title">Login</p>
    <form class="login-form" @submit.prevent="login">
    <div class="input-area">
      <fa :icon="['fas', 'envelope']" class="fontawesome" />
    <input type="email" v-model="email" placeholder="Email" required />
    </div>
    <div class="input-area">

      <fa :icon="['fas', 'lock']" class="fontawesome" />

    <input type="password" v-model="password" placeholder="Password" required />
    </div>
    <button type="submit">ログイン</button>
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
  /* position: relative; */
  width: 95%;
  margin: 0 auto;
  height: 100vh;
}

.login-container {
  width: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
}

.form-title {
    background-color: blue;
    color: #fff;
  border-radius: 5px 5px 0 0;
  padding: 20px;
  font-size: 18px


}

.login-form {
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

.input-area {
  height: 40px;
  position: relative;
  /* border: 1px solid red; */
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

  /* align-items: right; */
}

.fontawesome {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}

</style>