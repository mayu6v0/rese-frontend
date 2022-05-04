<template>
  <div class="container">
    <div class="card__done">
      <p class="card__ttl">お支払いがキャンセルされました</p>
      <p class="card__txt">ご予約は完了しております。</p>
      <p class="card__txt">ご登録のメールアドレス宛の予約完了メールをご確認ください。</p>
      <button @click="goToMypage">戻る</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToMypage() {
    this.$router.push('/mypage');
    },
  }
}
</script>

<style scoped>
.container {
  width: 95%;
  margin: 0 auto;
  height: 100vh;
  padding: 0;
}

.card__done {
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
</style>