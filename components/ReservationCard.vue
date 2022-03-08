<template>
  <div class="card">
      <fa :icon="['far', 'clock']" class="fontawesome" />
      <p class="card--title">予約{{ index+1 }}</p>
      <fa :icon="['far', 'circle-xmark']" class="fontawesome" @click="deleteReservation"/>

      <p class="card--content">Shop{{ name }}</p>
      <p class="card--content">Date{{ date }}</p>
      <p class="card--content">Time{{ time }}</p>
      <p class="card--content">Number{{ number }}人</p>
  </div>
</template>

<script>
export default {
  props: ["index","id", "name", "datetime", "number"],
  data() {
    return {
      reservationDate: []
    }
  },
  methods: {
    goToDetail() {
      this.$router.push("/detail/"+this.id)
    },
    async deleteReservation() {
      await this.$axios.delete("http://127.0.0.1:8000/api/reservation/"+this.id);
      this.$emit('get-reservation-list');
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
        return this.getStringFromDate(this.reservationDate, 'YYYY-MM-DD');
    },
    time() {
        return this.getStringFromTime(this.reservationDate, 'hh:mm');
    },
  },
  created() {
    // mypageから受け継いだdatetimeを文字列→date型（経過ミリ秒）に変換
    const date = Date.parse(this.datetime);
    // 経過ミリ秒から任意の日付を取得
    this.reservationDate = new Date(date);
  },
};
</script>

<style scoped>
.card {
    width: 400px;
    border-radius: 10px;
    margin: 10px 0;
    background-color: blue;
    box-shadow: 5px 5px lightgray;
    padding: 20px;
    color: white;
}

.card--title {
  display: inline-block;
  font-size: 18px;
  margin-left: 10px;
}

.card--content {
  margin-top: 30px;
}

</style>