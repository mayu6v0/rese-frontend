<template>
  <div class="container">
      <div class="register__container">
        <p class="form__title">Registration</p>
        <form class="register__form" @submit.prevent="register">
          <validation-observer ref="obs" v-slot="ObserverProps">
            <validation-provider v-slot="ProviderProps" rules="required">
              <div class="input__area">
                <fa :icon="['fas', 'user']" class="fontawesome" />
                <input type="text" v-model="name" name="User name" placeholder="User name" required />
              </div>
              <div class="error">{{ ProviderProps.errors[0] }}</div>
            </validation-provider>
            <validation-provider v-slot="ProviderProps" rules="required">
              <div class="input__area">
                <fa :icon="['fas', 'envelope']" class="fontawesome" />
                <input type="email" v-model="email" name="Email" placeholder="Email" required /><br />
              </div>
              <div class="error">{{ ProviderProps.errors[0] }}</div>
            </validation-provider>
            <validation-provider v-slot="ProviderProps" rules="required|min:8|max:10">
              <div class="input__area">
                <fa :icon="['fas', 'lock']" class="fontawesome" />
                <input type="password" v-model="password" name="Password" placeholder="Password" required />
              </div>
              <div class="error">{{ ProviderProps.errors[0] }}</div>
            </validation-provider>
            <button type="submit" :disabled="ObserverProps.invalid || !ObserverProps.validated">登録</button>
          </validation-observer>
        </form>
      </div>
  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      name: null,
      email: null,
      password: null,
    };
  },
  methods: {
    async register() {
      try {
        await this.$axios.post(process.env.BASE_URL+"/api/auth/register", {
          name: this.name,
          email: this.email,
          password: this.password,
          authority: "user",
        });
        this.$router.push("/thanks");
      } catch {
        alert("入力内容を確認してください");
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

.register__container {
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

.register__form {
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