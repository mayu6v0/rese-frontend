<template>
  <div class="container">
      <div class="card__thanks">
        <p class="card__ttl">会員登録ありがとうございます</p>
        <div class="card__txt">
          <p>ご登録のメールアドレスに認証メールをお送りしております。</p>
          <p>メールに記載のURLをクリックして認証を完了してください。</p>
        </div>
        <button @click="resendVerify">認証メールを再送する</button>
      </div>
  </div>
</template>

<script>
export default {
  methods: {
    resendVerify() {
      this.$router.push("/auth/resendverify")
    }
  },
}
</script>

<style scoped>
.container {
  width: 95%;
  margin: 0 auto;
  height: 100vh;
}

.card__thanks {
  background-color: white;
  width: 500px;
  padding: 100px 20px;
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
  text-align: center;
  line-height: 25px;
}

button {
  color: #fff;
  background-color: blue;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 30px auto 0;
  display: block;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .card__thanks {
    width: 100%;
  }
}
</style>
