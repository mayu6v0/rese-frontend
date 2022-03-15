<template>
  <div>
    <p>店名</p>
    <label for="grade">評価</label>
    <input type="number" id="grade" v-model="grade" />

    <label for="title">タイトル</label>
    <input type="text" v-model="title" />

    <label for="review">コメント</label>
    <textarea type="text" id="review" v-model="review"></textarea>
    <button @click="insertReview">送信</button>
  </div>
</template>

<script>
  export default {
  // props: ["id", "name"],
  data() {
    return {
      grade: "",
      title: "",
      review: "",
    };
  },
  methods: {
    async insertReview() {
      if(this.$auth.loggedIn) {

      const sendData = {
        user_id: this.$auth.user.id,
        restaurant_id: 7,
        reservation_id: 6,
        grade: this.grade,
        title: this.title,
        review: this.review,
      };
      console.log(sendData);
      await this.$axios.post("http://127.0.0.1:8001/api/review", sendData);
      this.$router.push("/mypage");
      } else {
        this.$router.push("/login");
      };
    },
  }
};
</script>

<style scoped>

</style>
