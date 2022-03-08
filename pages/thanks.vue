<template>
  <div>
    <p>会員登録ありがとうございます</p>
    <button @click="goToLogin">ログインする</button>
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
