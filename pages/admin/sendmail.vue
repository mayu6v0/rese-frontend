
<template>
  <div class="container">
    <h1 class="title">管理画面</h1>
    <div class="menu">
      <a class="menu__item" @click="goToNewOwner">店舗代表者・管理者作成</a>
      <a class="menu__item" @click="goToSendMail">メール送信</a>
    </div>
    <div class="mail">
      <h2 class="list">メール送信</h2>
      <validation-observer ref="obs" v-slot="ObserverProps">
        <table class="send-new-mail">
          <tr>
            <th>送信先</th>
            <validation-provider v-slot="ProviderProps" rules="required">
              <td>
                <select class="" name="送信先" v-model="mailTo">
                  <option value=""  selected hidden>送信先を選択</option>
                  <option value="user">全ユーザー</option>
                  <option value="owner">全店舗代表者</option>
                  <option value="admin">全管理者</option>
                </select>
                <div class="error">{{ ProviderProps.errors[0] }}</div>
              </td>
            </validation-provider>
          </tr>
          <tr>
            <th>タイトル</th>
            <validation-provider v-slot="ProviderProps" rules="required">
              <td>
                <input type="text" name="タイトル"   v-model="mailTitle">
                <div class="error">{{ ProviderProps.errors[0] }}</div>
              </td>
            </validation-provider>
          </tr>
          <tr>
            <th>本文</th>
            <validation-provider v-slot="ProviderProps" rules="required">
              <td>
                <textarea name="本文" id="" v-model="mailText"></textarea>
                <div class="error">{{ ProviderProps.errors[0] }}</div>
              </td>
            </validation-provider>
          </tr>
        </table>
        <button @click="sendMail" :disabled="ObserverProps.invalid || !ObserverProps.validated">送信</button>
      </validation-observer>
    </div>
  </div>
</template>
<script>
export default {
  middleware: ['auth','admin', 'emailVerify'],
  data() {
    return {
      mailTo: "",
      mailTitle: "",
      mailText: "",
    }
  },
  methods: {
    goToNewOwner() {
      this.$router.push("/admin/createowner");
    },
    goToSendMail() {
      this.$router.push("/admin/sendmail");
    },
    async sendMail() {
      const sendData = {
          mailTo : this.mailTo,
          mailTitle: this.mailTitle,
          mailText: this.mailText,
      };
      console.log(sendData);
      await this.$axios.post(process.env.BASE_URL+"/api/sendmail", sendData);
        alert("メール送信が完了しました");
    }
  },
}
</script>

<style scoped>
.container {
  width: 90%;
  margin: 0 auto;
  padding: 30px;
}

.title {
  font-size: 35px;
  text-align: center;
}

.menu {
  margin: 0px 0px auto 0px;
  text-align: right;
}

.menu__item {
  display: block;
  font-size: 18px;
  color: #0E3EDA;
  text-decoration: none;
  padding: 10px;
}

tr,th,td {
  padding: 10px 30px;
}

.mail {
  margin-top: 30px;
  padding-bottom: 30px;
  background-color: #fff;
}

input,
select {
  width: 600px;;
  height: 30px;
}

textarea {
  width: 600px;;
  height: 200px;
}

button {
  display: block;
  font-size: 20px;
  color: #fff;
  background-color: #0074E4;
  border: none;
  border-radius: 5px;
  padding: 10px 30px;
  margin: 30px auto 0;
  cursor: pointer;
}

.list {
  margin-top: 50px;
  font-size: 25px;
  color: #fff;
  padding: 20px;
  background-color: #0074E4;
}

.send-new-mail {
  margin: 20px auto;
  width: 800px;
}

.send-new-mail th {
  vertical-align: middle;
  text-align: left;
}

.error {
  color: red;
  font-size: 14px;
}
</style>
