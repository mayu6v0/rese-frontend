<template>
  <div>
    <p>ご予約ありがとうございます</p>
    <button @click="goToMypage">戻る</button>
  </div>
</template>

<script>
export default {
 methods: {
   goToMypage() {
     this.$router.go(-1);
   }
 },
}
</script>
