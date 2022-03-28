<template>
  <div class="container">
    {{ratingArray}}
    <p>総合評価<star-rating :read-only="true" :rating="averageRating" :increment="0.1"></star-rating></p>
    
    <div class="review" v-for="item in reviewList" :key="item.id">
      <p>{{ item.title }}</p>
      <p>評価{{ item.rating }}</p>
      <p>{{item.review}}</p>
      <!-- <button @click="getUsersReservationList">ユーザー予約情報取得</button> -->
    </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      reviewList: [],
      // userReservationList:[],
    }
  },
  methods: {
    //店舗のレビュー一覧のAPIを取得する
    async getReviewList() {
      const resData = await this.$axios.get(
        process.env.BASE_URL+"/api/review?restaurant_id="+this.id
      );
      this.reviewList = resData.data.data;
      console.log(this.reviewList);
    },
    // async getUsersReservationList() {
    //   const resData = await this.$axios.get(
    //     process.env.BASE_URL+"/api/reservation/user"
    //   );
    //   this.userReservationList = resData.data.data;
    //   console.log(this.userReservationList);
    // },
  },
  computed: {
    ratingArray() {
      const ratingArray = [];
      //favoriteListのrestaurant_idで新たに配列を作る
      for(let i = 0; i < this.reviewList.length; i++) {
        const rating = this.reviewList[i].rating;
        // console.log(this.favoriteList[0]);
        ratingArray.push(rating);
      };
      console.log(ratingArray);
      return ratingArray;
    },
    averageRating() {
      //計算式　配列作ってひとつずつ足してlengthで割る？
      let sum = 0;
      for (let i = 0; i < this.ratingArray.length; i++) {
        sum += this.ratingArray[i];
      }
      const average = sum / this.ratingArray.length;
      console.log( average );
      console.log(average.toFixed(1));
      return average.toFixed(1);
    },
  },
  created() {
    this.getReviewList();
  },
}
</script>

<style scoped>
.review {
  border: 1px solid red;
  margin: 30px;
}
</style>
