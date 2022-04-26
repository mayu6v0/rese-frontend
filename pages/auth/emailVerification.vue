<template>
  <div class="container">
    <div class="card">
      <div class="card__txt">
        <p>{{ text }}</p>
        <button v-if="verified" @click="goToMypage">マイページへ</button>
      </div>
  </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        text: "メール認証中...",
        verified: false,
      }
    },
    methods: {
      goToMypage() {
        this.$router.push("/mypage")
      }
    },
    async mounted() {
      const queryURL = this.$route.query.queryURL || '';
      if (queryURL != '') {
        await this.$axios.$get(queryURL)
          try {
            this.text = "メール認証が完了しました";
            this.verified = true;
            setTimeout(() => {
              this.$router.push("/mypage");
            }, 2000);
          } catch(error) {
            alert('メール認証に失敗しました');
          }
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

.card {
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

.card__txt{
  text-align: center;
  font-size: 20px;
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