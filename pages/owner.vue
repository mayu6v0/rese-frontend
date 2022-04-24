
<template>
  <div class="container">
    <h1 class="title">店舗管理画面</h1>
    <p class="user-name">{{ $auth.user.name }}さん</p>
    <p>店舗ID：{{ $auth.user.restaurant_id }}</p>
    <div class="detail">
    </div>
    <div class="create">
        <h2 class="detail__title">店舗情報</h2>

      <table class="table__create">
        <tr>
          <th class="th">店名</th>
          <td><input type="text" v-model="name" /></td>
        </tr>
        <tr>
          <th>画像URL</th>
          <td>
            <input class="" v-model="image_url" />
          </td>
        </tr>
        <tr>
          <th>画像</th>
          <td>
            <img class="restaurant-img" :src="image_url">
          </td>
        </tr>
        <tr>
          <th>エリア</th>
          <td>
            <!-- <p>{{ area }}</p> -->
            <select class="select-restaurant" v-model="area_id">
              <!-- <option :value="area_id" selected>{{ area }}</option> -->
              <option v-for="area in areaList" :key="area.id" :value="area.id">{{ area.name }}</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>ジャンル</th>
          <td>
            <!-- <p>{{ genre }}</p> -->
            <select v-model="genre_id">
              <!-- <option value="" selected>変更する</option> -->
              <option v-for="genre in genreList" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
          </select>
          </td>
        </tr>
        <tr>
          <th>店舗概要</th>
          <td><textarea type="text" v-model="overview" ></textarea></td>
        </tr>
      </table>
      <button class="" @click="updateDetail">更新する</button>
    </div>
    <div class="">
      <div class="owner">
        <h2 class="list">予約一覧</h2>
        <table class="owner-list">
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
      <div class="owner">
        <h2 class="list">過去の予約</h2>
        <table class="owner-list">
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
      image_url:"",
      area_id: "",
      genre_id: "",
      area: "",
      genre: "",
      overview: "",
      restaurant_id: this.$auth.user.restaurant_id,
      reservationList: [],
      todayMs: "",
      areaList: [
        { id: 1, name: "東京都" },
        { id: 2, name: "大阪府" },
        { id: 3, name: "福岡県" },
      ],
      genreList: [
        { id: 1, name: "寿司" },
        { id: 2, name: "焼肉" },
        { id: 3, name: "居酒屋" },
        { id: 4, name: "イタリアン" },
        { id: 5, name: "ラーメン" },
      ],
    }
  },
  methods: {
    // 店舗情報を取得する
    async getDetail() {
      const resData = await this.$axios.get(
        process.env.BASE_URL+"/api/restaurant/"+this.restaurant_id
      );
      const restaurantData = resData.data.data;
      console.log(restaurantData);
      this.name = restaurantData[0].name;
      this.image_url = restaurantData[0].image_url
      this.area = restaurantData[0].area.name;
      this.genre = restaurantData[0].genre.name;
      this.area_id = restaurantData[0].area.id
      this.genre_id = restaurantData[0].genre.id
      this.overview = restaurantData[0].overview;
    },
    //飲食店の予約一覧のAPIを取得する
    async getReservationList() {
      const resData = await this.$axios.get(
        process.env.BASE_URL+"/api/owner/reservation?restaurant_id="+this.restaurant_id
      );
      this.reservationList = resData.data.data;
      console.log(this.reservationList);
    },
    async updateDetail() {
      const sendData = {
        name: this.name,
        area_id: this.area_id,
        genre_id: this.genre_id,
        overview: this.overview,
        image_url: this.image_url
      };
      console.log(sendData);
      const resData = await this.$axios.put(process.env.BASE_URL+"/api/restaurant/"+this.restaurant_id, sendData);
      alert('店舗情報が更新されました');
      // 表示する店舗情報を更新
      this.getDetail();
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
  /* background-color: #fff; */
  padding: 30px;
}

.title {
  font-size: 35px;
  text-align: center;
}

.restaurant-img {
  width: 50%;
  display: block;
}

.table tr,th,td {
  padding: 10px 30px;
  border: 1px solid black;
}

.create {
  margin-top: 30px;
  padding-bottom: 30px;
  background-color: #fff;
}

.detail__title {
  font-size: 25px;
  color: #fff;
  padding: 20px;
  background-color: #0074E4;
}

input,
select {
  /* line-height: 30px; */
  width: 600px;;
  height: 30px;
}

textarea {
  width: 600px;
  height: 100px;
}

.table__create {
  width: 800px;
  margin: 20px auto;
}

.table__create th {
  vertical-align: middle;
}

.th {
  width: 200px;
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

.list {
  margin-top: 50px;
  font-size: 25px;
  color: #fff;
  padding: 20px;
  background-color: #0074E4;
}

.owner-list,
.admin-list {
  margin-top: 20px;
  width: 1000px;
}

.owner-list th,
.owner-list td,
.admin-list th,
.admin-list td {
  width: 200px;
}
</style>
