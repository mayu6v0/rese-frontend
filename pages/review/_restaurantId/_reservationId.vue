<template>
  <div>
    <p>店名</p>
    <p>restaurant_id{{$route.params.restaurantId}}</p>
    <p>reservation_id{{$route.params.reservationId}}</p>
    <!-- reservationAPI叩いてreservation_idから予約情報取得（showメソッド）
    →店名、来店日時を表示 restaurant_idも取得 -->
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
        restaurant_id: this.$route.params.restaurantId,
        reservation_id: this.$route.params.reservationId,
        grade: this.grade,
        title: this.title,
        review: this.review,
      };
      console.log(sendData);
      await this.$axios.post(process.env.BASE_URL+"/api/review", sendData);
      this.$router.push("/thanksReview");
      } else {
        this.$router.push("/login");
      };
    },
  },
  create() {

  },
};
</script>

<style scoped>

</style>
