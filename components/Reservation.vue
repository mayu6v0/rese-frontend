<template>
  <div class="reservation-container">
    <div class="form">
      <p class="reservation-title">予約</p>
      <div>
        <input class="select-date" type="date" v-model="date" ><br />
        <select class="select-time" v-model="time">
          <option value="" selected hidden>Time</option>
          <option v-for="time in timeList" :key="time.id" :value="time.value">{{ time.name}}</option>
        </select><br />
        <select class="select-number" v-model="number">
          <option value="" selected hidden>Number</option>
          <option v-for="number in numberList" :key="number.id" :value="number.value">{{number.name}}人</option>
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
        { value: "10", name: "10" },
        { value: "21", name: "21" }
      ],
    };
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
      await this.$axios.post("http://127.0.0.1:8001/api/reservation", sendData);
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
  box-shadow: 5px 5px 5px gray;
  border-radius: 5px;

  height: 85%;
  margin: 50px 70px;
}
.form {
  color: white;
  padding:40px;
  border-radius: 5px 5px 0 0;
  background: #0E3EDA;
  height: 90%;
}

.reservation-title {
  font-size: 28px;
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
  background-color: #41B3D3;
}
.confirm--table {
  width: 100%;
  background-color: #41B3D3;
  border-radius: 5px;
  text-align: left;
  line-height: 30px;
}

.confirm th {
  width: 120px;
}

.reservation-btn {
  color: #fff;
  background: #0074E4;
  font-size: 18px;
  border: none;
  box-shadow: none;
  width: 100%;
  height: 10%;
  border-radius: 0 0 5px 5px;
}

@media screen and (max-width: 768px) {
  .reservation-container {
  height: 450px;
  margin-top: 30px;
}
  .form {
    padding:10px 40px;
    height: 80%;
  }

  .confirm {
  /* margin-top: 20px; */
  padding: 10px;
  /* border: 1px solid red; */
  /* background-color: rgb(39, 140, 173); */
}

  .reservation-btn {
    height: 20%;
  cursor: pointer;

  }
}
</style>