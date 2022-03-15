<template>
  <div class="container">
    <!-- <Header /> -->
      <div class="card__thanks">
        <p class="card__text">会員登録ありがとうございます</p>
        <button @click="goToLogin">ログインする</button>
      </div>
  </div>
</template>

<script>
export default {
 methods: {
   goToLogin() {
     this.$router.push("/login")
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
  padding: 100px;
  border-radius: 5px;
  box-shadow: 5px 5px 5px gray;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.card__text {
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
