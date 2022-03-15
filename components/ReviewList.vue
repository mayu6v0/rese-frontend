<template>
  <div class="container">
    <p>総合評価{{ averageGrade }}</p>
    <div class="review" v-for="item in reviewList" :key="item.id">
      <p>{{ item.title }}</p>
      <p>評価{{ item.grade }}</p>
      <p>{{item.review}}</p>
      <button @click="getUsersReservationList">ユーザー予約情報取得</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      reviewList: [],
      userReservationList:[],
    }
  },
  methods: {
    //店舗のレビュー一覧のAPIを取得する
    async getReviewList() {
      const resData = await this.$axios.get(
        "http://127.0.0.1:8001/api/review?restaurant_id="+this.id
      );
      this.reviewList = resData.data.data;
      console.log(this.reviewList);
    },
    async getUsersReservationList() {
      const resData = await this.$axios.get(
        "http://127.0.0.1:8001/api/reservation/user"
      );
      this.userReservationList = resData.data.data;
      console.log(this.userReservationList);
    },
  },
  computed: {
    averageGrade() {
      //計算式　配列作ってひとつずつ足してlengthで割る？
      return "gradeの平均値";
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
