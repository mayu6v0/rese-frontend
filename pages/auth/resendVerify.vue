<template>
  <div class="container">
    <div class="card">
      <p class="card__ttl">メール認証が未完了です</p>
      <div class="card__txt">
        <p>メール認証が行われていません。</p>
        <p>お送りしているメールに記載のURLをクリックして認証を完了してください。</p>
        <p>認証メールを再送信する場合は、下記フォームにメールアドレスを入力の上
          「認証メールを再送する」を押してください。</p>
      </div>
      <div class="card__resend">
        <div class="card__form">
          <input type="email" v-model="email" placeholder="メールアドレスを入力">
          <button @click="ReSendVerifyEmail">認証メールを再送する</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        email: "",
      }
    },
    methods: {
      async ReSendVerifyEmail(){
        const resData = await this.$axios.post(process.env.BASE_URL+"/api/auth/email/resend",
        {
          email: this.email,
        });
          alert(resData.data);
      },

    }

  }
</script>

<style scoped>
.container {
  width: 95%;
  margin: 0 auto;
  height: 100vh;
}

.card {
  background-color: white;
  width: 80%;
  padding: 100px;
  border-radius: 5px;
  box-shadow: 5px 5px 5px gray;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.card__ttl {
  text-align: center;
  font-size: 20px;
}

.card__txt {
  margin-top: 20px;
  font-size: 14px;
  line-height: 25px;
}

.card__resend {
  text-align: center;
}

.card__form {
  margin-top: 30px;
  display: inline-block;
}

input {
  width: 300px;
  margin-right: 20px;
  height: 40px;
}

button {
  color: #fff;
  background-color: blue;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 30px auto 0;
  /* display: block; */
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .card {
    width: 100%;
    padding: 100px;
  }
}
</style>