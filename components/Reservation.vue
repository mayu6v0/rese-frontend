<template>
  <div class="reservation-container">
    <div class="form">
      <p class="reservation-title">予約</p>
      <div>
        <input class="select-date" type="date" v-model="date" ><br />
        <select class="select-time" v-model="time">
          <option value="" selected hidden>Time</option>
          <option value="17:00">17:00</option>
          <option value="17:30">17:30</option>
          <option value="18:00">18:00</option>
          <option value="18:30">18:30</option>
          <option value="19:00">19:00</option>
          <option value="19:30">19:30</option>
          <option value="20:00">20:00</option>
          <option value="20:30">20:30</option>
          <option value="21:00">21:00</option>
          <option value="21:30">21:30</option>
          <option value="22:00">22:00</option>
        </select><br />
        <select class="select-number" v-model="number">
          <option value="" selected hidden>Number</option>
          <option value="1">1人</option>
          <option value="2">2人</option>
          <option value="3">3人</option>
          <option value="4">4人</option>
          <option value="5">5人</option>
          <option value="6">6人</option>
          <option value="7">7人</option>
          <option value="8">8人</option>
        </select><br />
        <div class="confirm">

        <table class="confirm--table">
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
        </div>
      </div>
    </div>
    <button class="reservation-btn" @click="reserve">予約する</button>
  </div>
</template>

<script>
export default {
  props: ["id", "name"],
  data() {
    return {
      restaurant_id: this.id,
      date: "",
      time: "",
      number: "",
    }
  },
  methods: {
    async reserve() {
      if(this.$auth.loggedIn) {

      const sendData = {
        user_id: this.$auth.user.id,
        restaurant_id: this.restaurant_id,
        datetime: this.date +" "+ this.time,
        number: this.number,
      };
      console.log(sendData);
      await this.$axios.post("https://m-rese.herokuapp.com/api/reservation", sendData);
      this.$router.push("/done");
      } else {
        this.$router.push("/login");
      };
    },
  }
};
</script>

<style scoped>

.reservation-container {
  /* border: 3px solid green; */
  height: 85%;
  margin: 0 70px;
}
.form {
  color: white;
  padding:40px;
  border-radius: 5px 5px 0 0;
  background: rgb(50, 50, 109);
  height: 90%;
}

.reservation-title {
  font-size: 30px;
  margin-bottom: 25px;
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

.confirm {
  margin-top: 20px;
  padding: 20px;
  /* border: 1px solid red; */
  background-color: rgb(39, 140, 173);
}
.confirm--table {
  width: 100%;
  background-color: rgb(39, 140, 173);
  border-radius: 5px;
  text-align: left;
  line-height: 30px;
}

.confirm th {
  width: 120px;
}

.reservation-btn {
  color: #fff;
  background: blue;
  font-size: 18px;
  border: none;
  box-shadow: none;
  width: 100%;
  height: 10%;
  border-radius: 0 0 5px 5px;
}
</style>