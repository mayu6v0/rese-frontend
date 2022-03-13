<template>
  <div class="card relative">
      <fa :icon="['far', 'clock']" class="fontawesome" />
      <p class="card--title">予約{{ index+1 }}</p>
      <fa :icon="['far', 'circle-xmark']" class="fontawesome xmark" @click="deleteReservation"/>
        
        <div v-if="!update">
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
      <button @click="openUpdateReservation">予約を変更する</button>
        </div>
        <div v-else class="update">
          <p class="update-title">予約変更</p>
          <p class="restaurant-name">shop: {{ name }}</p>
          <input class="select-date" type="date" v-model="newDate" ><br />
          <select class="select-time" v-model="newTime">
            <option value="" selected hidden>Time</option>
            <option v-for="time in timeList" :key="time.id" :value="time.value">{{ time.name}}</option>
          </select><br />
          <select class="select-number" v-model="newNumber">
            <option value="" selected hidden>Number</option>
            <option v-for="number in numberList" :key="number.id" :value="number.value">{{number.name}}人</option>
          </select>
          <button @click="openUpdateReservation">キャンセル</button>
          <button @click="updateReservation">変更する</button>
          </div>
  </div>
</template>

<script>
export default {
  props: ["index", "id", "name", "restaurant_id",  "datetime", "number"],
  data() {
    return {
      reservationDate: [],
      update: false,
      newDate: "",
      newTime: "",
      newNumber: this.number,
      timeList: [
        { value: "17:00", name: "17:00" },
        { value: "17:30", name: "17:30" },
        { value: "18:00", name: "18:00" },
        { value: "18:30", name: "18:30" },
        { value: "19:00", name: "19:00" },
        { value: "19:30", name: "19:30" },
        { value: "20:00", name: "20:00" },
        { value: "20:30", name: "20:30" },
        { value: "21:00", name: "21:00" },
        { value: "21:30", name: "21:30" },
        { value: "22:00", name: "22:00" },
        { value: "22:30", name: "22:30" }
      ],
      numberList: [
        { value: "1", name: "1" },
        { value: "2", name: "2" },
        { value: "3", name: "3" },
        { value: "4", name: "4" },
        { value: "5", name: "5" },
        { value: "6", name: "6" },
        { value: "7", name: "7" },
        { value: "8", name: "8" },
        { value: "9", name: "9" },
        { value: "10", name: "10" }
      ],
    }
  },
  methods: {
    async deleteReservation() {
      await this.$axios.delete("https://m-rese.herokuapp.com/api/reservation/"+this.id);
      this.$emit('get-reservation-list');
    },
    openUpdateReservation() {
      this.update = !this.update;
    },
    async updateReservation() {
      console.log(this.id);
      const sendData = {
        user_id: this.$auth.user.id,
        restaurant_id: this.restaurant_id,
        datetime: this.newDate+ " "+this.newTime,
        number: this.newNumber,
      };
      console.log(sendData);
      await this.$axios.put("https://m-rese.herokuapp.com/api/reservation/"+this.id, sendData);
      this.$emit('get-reservation-list');
      this.update = !this.update;
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
      console.log(date);
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
  },
};
</script>

<style scoped>
.card {
    max-width: 400px;
    border-radius: 10px;
    margin: 20px auto;
    background-color: #0074E4;
    box-shadow: 5px 5px 5px gray;
    padding: 20px;
    color: white;
}

.card--title {
  display: inline-block;
  font-size: 18px;
  margin-left: 10px;
}

.xmark {
 position: absolute;
 top: 15px;
 right: 15px;
cursor: pointer;

}

table {
  margin-top: 20px;
}
table th,
table td {
  padding: 10px 20px;
  text-align: left;
}


.restaurant-name {
  font-size: 18px;
  margin-bottom: 20px;
}
.select-time {
  width: 100%;
  height: 25px;
  margin-top: 20px;
}

.select-number {
  width: 100%;
  height: 25px;
  margin-top: 20px;
}

.update {
  padding: 10px;
  margin-top: 20px;
  background-color: rgb(13, 148, 238);
  color: #fff;
}

.update-title {
  font-size:18px;
  margin-bottom: 20px;
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
  /* display: inline-block; */
}

@media screen and (max-width: 768px) {
.card {
  margin: 20px auto;
}

}
</style>