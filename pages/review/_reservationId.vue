<template>
  <div>
    <p>店名{{restaurantName}}</p>
    <p>来店日時{{reservationDate}}</p>
    <!-- <p>restaurant_id{{$route.params.restaurantId}}</p> -->
    <!-- <p>reservation_id{{$route.params.reservationId}}</p> -->
    <!-- reservationAPI叩いてreservation_idから予約情報取得（showメソッド）
    →店名、来店日時を表示 restaurant_idも取得 -->
    <label>評価</label>
    <star-rating v-model="rating" @rating-selected ="setRating"></star-rating>

    <label for="title">タイトル</label>
    <input type="text" v-model="title" /><br />

    <label for="review">コメント</label>
    <textarea type="text" id="review" v-model="review"></textarea>
    <button @click="insertReview">レビューを送信</button>
  </div>
</template>

<script>
  export default {
  // props: ["id", "name"],
  data() {
    return {
      reservation: [],
      restaurantName: "",
      restaurantId: "",
      reservationDate:"",

      rating: 5, //初期表示
      title: "",
      review: "",
    };
  },
  methods: {
    async getReservation() {
      const resData = await this.$axios.get(
        process.env.BASE_URL+"/api/reservation/"+this.$route.params.reservationId,
      );
      this.reservation = resData.data.data;
      console.log(this.reservation);
      this.restaurantName = this.reservation[0].restaurant.name;
      this.restaurantId = this.reservation[0].restaurant_id;
      this.reservationDate = this.reservation[0].datetime;
    },
    setRating: function(rating){
      this.rating= rating;
    },
    async insertReview() {
      if(this.$auth.loggedIn) {

      const sendData = {
        user_id: this.$auth.user.id,
        restaurant_id: this.$route.params.restaurantId,
        reservation_id: this.$route.params.reservationId,
        rating: this.rating,
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
  created() {
    this.getReservation();
  },
};
</script>

<style scoped>

</style>
