
<template>
  <div class="container">
    <h1 class="title">店舗管理画面</h1>
    <div class="menu">
      <a class="menu-item" @click="goToRestaurantInfo">店舗情報新規作成・更新</a>
      <a class="menu-item" @click="goToReservationInfo">予約情報照会</a>
    </div>
    <div>
      <table class="restaurant_info">
        <tr>
          <th>店舗ID</th>
          <td>{{ restaurant_id }}</td>
        </tr>
        <tr>
          <th>店名</th>
          <td>{{ name }}</td>
        </tr>
        <tr>
          <th>代表者</th>
          <td>{{ $auth.user.name }}さん
          </td>
        </tr>
      </table>
    </div>
    <div class="reservation__content">
      <div class="reservation">
        <h2 class="reservation__ttl">予約一覧</h2>
        <table class="reservation__table">
          <tr>
            <th>予約日時</th>
            <th>人数</th>
            <th>予約者</th>
            <th>メールアドレス</th>
          </tr>
          <tr  v-for="reservation in futureReservation" :key=reservation.id >
            <td>{{ reservation.datetime }}</td>
            <td>{{ reservation.number }}名</td>
            <td>{{ reservation.user.name }}</td>
            <td>{{ reservation.user.email }}</td>
          </tr>
        </table>
      </div>
      <div class="reservation">
        <h2 class="reservation__ttl">過去の予約</h2>
        <table class="reservation__table">
          <tr>
            <th>予約日時</th>
            <th>人数</th>
            <th>予約者</th>
            <th>メールアドレス</th>
          </tr>
          <tr  v-for="reservation in pastReservation" :key=reservation.id >
            <td>{{ reservation.datetime }}</td>
            <td>{{ reservation.number }}名</td>
            <td>{{ reservation.user.name }}</td>
            <td>{{ reservation.user.email }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  middleware: ['auth', 'owner', 'emailVerify'],
  data() {
    return {
      name: "",
      restaurant_id: this.$auth.user.restaurant_id,
      reservationList: [],
      todayMs: "",
    }
  },
  methods: {
    goToRestaurantInfo() {
      this.$router.push("/owner");
    },
    goToReservationInfo() {
      this.$router.push("/reservationinfo");
    },
    // 店舗情報を取得する
    async getDetail() {
      const resData = await this.$axios.get(
        process.env.BASE_URL+"/api/restaurant/"+this.restaurant_id
      );
      const restaurantData = resData.data.data;
      console.log(restaurantData);
      this.name = restaurantData[0].name;
    },
    //飲食店の予約一覧のAPIを取得する
    async getReservationList() {
      const resData = await this.$axios.get(
        process.env.BASE_URL+"/api/owner/reservation?restaurant_id="+this.restaurant_id
      );
      this.reservationList = resData.data.data;
      console.log(this.reservationList);
    },
  },
  computed: {
    futureReservation(){
      const futureReservationList = [];
      //reservationListのdatetimeを取得
      for(let i = 0; i < this.reservationList.length; i++) {
        const reservation = this.reservationList[i];
        //reservationListのdatetimeを取得（文字列）
        const reservationDateStr = reservation.datetime;
        //経過msに変換
        const reservationDate = Date.parse(reservationDateStr.replace(/-/g, "/"));
        //現在日時より先ならfutureReservationListに入れる
        if(reservationDate > this.todayMs ) {
          console.log("未来予約");
          console.log(reservationDateStr);
          futureReservationList.push(reservation);
        }
      }
        console.log(futureReservationList);
        return futureReservationList;
    },
    pastReservation(){
      const pastReservationList = [];
      //reservationListのdatetimeを取得
      for(let i = 0; i < this.reservationList.length; i++) {
        const reservation = this.reservationList[i];
      //   //reservationListのdatetimeを取得（文字列）
        const reservationDateStr = reservation.datetime;
        //経過msに変換
        const reservationDate = Date.parse(reservationDateStr.replace(/-/g, "/"));
        //現在日時より先ならpastReservationListに入れる
        if(reservationDate <= this.todayMs ) {
          console.log("過去予約");
          console.log(reservationDateStr);
          pastReservationList.push(reservation);
        }
      }
        console.log(pastReservationList);
        return pastReservationList.reverse();
    },
  },
  created() {
    this.getDetail();
    this.getReservationList();
    //現在日時を取得
      const today = new Date();
      console.log ("現在日時");
      console.log (today);
      //現在日時を経過msに変換
      this.todayMs = today.getTime();
      console.log(this.todayMs);
  }
}
</script>

<style scoped>
.container {
  width: 90%;
  margin: 0 auto;
  padding: 30px;
}

.title {
  font-size: 35px;
  text-align: center;
}

.menu {
  margin: 0px 0px auto 0px;
  text-align: right;
}

.menu-item {
  display: block;
  font-size: 18px;
  color: #0E3EDA;
  text-decoration: none;
  padding: 10px;
}

.restaurant_info tr,
.restaurant_info th,
.restaurant_info td {
  border: none;
  padding: 3px;
  text-align: left;
}

.restaurant_info th {
  width: 100px;
}

.reservation {
  margin-top: 30px;
  padding-bottom: 30px;
  background-color: #fff;
}

.reservation__ttl {
  margin-top: 50px;
  font-size: 25px;
  color: #fff;
  padding: 20px;
  background-color: #0074E4;
}

.reservation__table {
  margin: 20px auto 0;
  width: 1000px;
}

.reservation__table tr,th,td {
  padding: 10px 30px;
  border: 1px solid black;
  width: 200px;
}

input,
select {
  width: 600px;;
  height: 30px;
}

textarea {
  width: 600px;
  height: 100px;
}

button {
  display: block;
  font-size: 20px;
  color: #fff;
  background-color: #0074E4;
  border: none;
  border-radius: 5px;
  padding: 10px 30px;
  margin: 30px auto 0;
  cursor: pointer;
}
</style>
