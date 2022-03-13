<template>
  <div class="container">
    <Header />
      <div class="register-container">
        <p class="form-title">Registration</p>
        <form class="register-form" @submit.prevent="register">
            <validation-observer ref="obs" v-slot="ObserverProps">
          <div class="input-area">
              <fa :icon="['fas', 'user']" class="fontawesome" />
            <validation-provider v-slot="ProviderProps" rules="required">
              <input type="text" v-model="name" placeholder="User name" required /><br />
              <div class="error">{{ ProviderProps.errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="input-area">
            <fa :icon="['fas', 'envelope']" class="fontawesome" />
            <input type="email" v-model="email" placeholder="Email" required /><br />
          </div>
          <div class="input-area">
            <fa :icon="['fas', 'lock']" class="fontawesome" />
            <input type="password" v-model="password" placeholder="Password" required />
          </div>
          <button type="submit" :disabled="ObserverProps.invalid || !ObserverProps.validated">登録</button>
          </validation-observer>
        </form>
      </div>
      <!-- <div>
        <validation-provider v-slot="ProviderProps" rules="required">
          <input type="text" v-model="name" name="ユーザーネーム" placeholder="User name" required /><br />
          <div class="error">{{ ProviderProps.errors[0] }}</div>
        </validation-provider>
      </div> -->
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
        await this.$axios.post("http://m-rese.herokuapp.com/api/auth/register", {
          name: this.name,
          email: this.email,
          password: this.password,
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

.register-container {
  width: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  box-shadow: 5px 5px 5px gray;
  
}

.form-title {
    background-color: blue;
    color: #fff;
  border-radius: 5px 5px 0 0;
  padding: 20px;
  font-size: 18px

}

.register-form {
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

.error {
  color: red;
  display: inline;
}
</style>