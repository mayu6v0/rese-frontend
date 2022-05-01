<template>
  <div class="card relative">
    <p class="card__title">ご来店ありがとうございました</p>
      <table>
        <tr>
          <th>Shop</th>
          <td>{{ name }}</td>
        </tr>
        <tr>
          <th>Date</th>
          <td>{{ date }}</td>
        </tr>
        <tr>
          <th>Time</th>
          <td>{{ time }}</td>
        </tr>
        <tr>
          <th>Number</th>
          <td>{{ number }}人</td>
        </tr>
      </table>
      <button v-if="reviewedReservation">レビュー済み</button>
      <button v-else @click="goToReview">お店のレビューを書く</button>
  </div>
</template>

<script>
export default {
  props: ["index", "id", "name", "restaurant_id", "datetime", "number", "reviewedReservationList"],
  data() {
    return {
      reservationDate: [],
    }
  },
  methods: {
    goToReview() {
      //this.idはreservationのid
      this.$router.push("/review/"+this.id)
    },
    getStringFromDate(date, format) {
        // formatのYYYYを文字列に置換
        format = format.replace(/YYYY/g, date.getFullYear());
        // 月を文字列に置換して先頭に0を足し、後ろの2文字を取得してMM部分に置換
        format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
        // 日を文字列に置換して先頭に0を足し、後ろの2文字を取得してMM部分に置換
        format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
        return format;
    },
    getStringFromTime(date, format) {
        format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
        format = format.replace(/mm/g, ('0' + this.reservationDate.getMinutes()).slice(-2));
        return format;
    },
  },
  computed: {
    date() {
      // mypageから受け継いだdatetimeを文字列→date型（経過ミリ秒）に変換
      const date = Date.parse(this.datetime.replace(/-/g, "/"));
      // 経過ミリ秒から任意の日付を取得
      this.reservationDate = new Date(date);
      this.newDate = this.getStringFromDate(this.reservationDate, 'YYYY-MM-DD');
      return this.newDate;
    },
    time() {
      // const date = Date.parse(this.datetime);
      // this.reservationDate = new Date(date);
      this.newTime = this.getStringFromTime(this.reservationDate, 'hh:mm');
      return this.newTime;
    },
    reviewedReservation() {
      //レビューが既に書かれているかどうか
      return this.reviewedReservationList.indexOf(this.id) !== -1
    }
  },
};
</script>

<style scoped>
.card {
    max-width: 1000px;
    border-radius: 10px;
    margin: 20px auto;
    background-color: #fff;
    box-shadow: 5px 5px 5px gray;
    padding: 20px;
    color: black;
}

.card__title {
  display: inline-block;
  font-size: 18px;
  margin-left: 10px;
}

table {
  margin-top: 20px;
}

table th,
table td {
  padding: 10px 20px;
  text-align: left;
}

button {
  color: #fff;
  font-size: 18px;
  background-color: #41B3D3;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 10px 0 0 auto;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .card {
    margin: 20px auto;
  }
}
</style>