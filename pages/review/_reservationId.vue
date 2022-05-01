<template>
  <div class="container">
    <validation-observer ref="obs" v-slot="ObserverProps">
      <table>
        <tr>
          <th>店名</th>
          <td>{{restaurantName}}</td>
        </tr>
        <tr>
          <th>来店日時</th>
          <td>{{reservationDate}}</td>
        </tr>
        <tr>
          <th>評価</th>
          <td>
            <star-rating v-model="rating" @rating-selected ="setRating"></star-rating>
          </td>
        </tr>
        <tr>
          <th>
            <label for="title">タイトル</label>
          </th>
          <td>
            <validation-provider v-slot="ProviderProps" rules="required">
              <input type="text" name="タイトル" v-model="title" />
              <div class="error">{{ ProviderProps.errors[0] }}</div>
            </validation-provider>
          </td>
        </tr>
        <tr>
          <th>
            <label for="review">コメント</label>
          </th>
          <td>
            <validation-provider v-slot="ProviderProps" rules="required">
              <textarea type="text" name="コメント" id="review" v-model="review"></textarea>
              <div class="error">{{ ProviderProps.errors[0] }}</div>
            </validation-provider>
          </td>
        </tr>
      </table>
      <button :disabled="ObserverProps.invalid || !ObserverProps.validated" @click="insertReview">レビューを送信</button>
    </validation-observer>
  </div>
</template>

<script>
  export default {
  middleware: ['auth','emailVerify'],
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
        restaurant_id: this.restaurantId,
        reservation_id: this.$route.params.reservationId,
        rating: this.rating,
        title: this.title,
        review: this.review,
      };
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
.container {
  width: 90%;
  margin: 0 auto;
  background-color: #fff;
  padding: 30px;
}

table {
  margin: 20px auto;
}

table th,
table td {
  padding: 10px 20px;
  text-align: left;
}

table th {
  vertical-align: middle;
}

input,
textarea {
  width: 500px;
  line-height: 30px;
}

textarea {
  height: 200px;
}

button {
  display: block;
  color: #fff;
  background-color: #0074E4;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 30px auto;
  cursor: pointer;
}

.error {
  color: red;
  font-size: 14px;
}
</style>
