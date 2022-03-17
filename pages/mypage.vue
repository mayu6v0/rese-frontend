<template>
  <div class="container">
    <!-- <Header /> -->
    <p class="user-name" v-if="$auth.loggedIn">{{ $auth.user.name }}さん</p>
   <!-- <p>$auth.user {{ $auth.user }}</p> -->
   <!-- <p>$store.state {{$store.state.auth.user}}</p> -->
    <!-- <button v-on:click="getUser">APIを叩く</button> -->
    <div class="flex mypage--container">
      <div class="reservation">
        <h2 class="title">予約状況</h2>
        <ReservationCard @get-reservation-list="getReservationList"
         v-for="(item, index) in futureReservation" :index="index" :key="item.id" :id="item.id" :name="item.restaurant.name" :restaurant_id="item.restaurant.id" :datetime="item.datetime" :number="item.number"></ReservationCard>
        <div class="no-list" v-if="reservationList == ''">
          予約情報はありません
        </div>
      </div>
      <div class="favorite">
        <h2 class="title">お気に入り店舗</h2>
        <div class="flex-center">
          <!-- filteredFavoriteListに存在するときは💖を表示 -->
          <RestaurantCard @get-favorite-list="getFavoriteList" v-for="item in favoriteList" :key="item.id" :id="item.restaurant.id" :favorite_id="item.id" :url="item.restaurant.image_url" :name="item.restaurant.name" :area="item.restaurant.area.name" :genre="item.restaurant.genre.name"></RestaurantCard>
          <div class="no-list" v-if="favoriteList == ''">
          お気に入り店舗はありません
        </div>
        </div>
      </div>
    </div>
    <div class="reservation-history">
      <h2 class="title">予約履歴</h2>
      <ReservationHistoryCard @get-reservation-list="getReservationList"
         v-for="(item, index) in pastReservation" :index="index" :key="item.id" :id="item.id" :name="item.restaurant.name" :restaurant_id="item.restaurant.id" :datetime="item.datetime" :number="item.number"></ReservationHistoryCard>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      reservationList: [],
      favoriteList:[],
      todayMs: "",
    }
  },
  methods: {
    async getReservationList() {
      console.log(process.env.BASE_URL+"/api/reservation");
      const token = this.$auth.strategy.token.get();
      console.log(token);
      const resData = await this.$axios.get(
        process.env.BASE_URL+"/api/reservation",
        {
          // params: {
          //   user_id: this.$auth.user.id
          // }
          headers: { Authorization: 'Bearer ' + token }
        });
      this.reservationList = resData.data.data;
      console.log("reservationList");
      console.log(this.reservationList);
    },
    async getFavoriteList() {
      const resData = await this.$axios.get(
        process.env.BASE_URL+"/api/favorite",
        {
          params: {
            user_id: this.$auth.user.id
          }
        }
      );
      this.favoriteList = resData.data.data;
    },
    // async getUser() {
    //   try {
    //     const res = await this.$axios.get("http://127.0.0.1:8000/api/auth/user", {
    //     });
    //     console.log(res);
    //   } catch (e) {
    //     console.error(e)
    //   }
    // },
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
      this.getReservationList();
      this.getFavoriteList();
      //現在日時を取得
      const today = new Date();
      console.log ("現在日時");
      console.log (today);
      //現在日時を経過msに変換
      this.todayMs = today.getTime();
      console.log(this.todayMs);
    },
};
</script>

<style scoped>

.container {
  width: 95%;
  margin: 0 auto;
}

.user-name {
  font-size: 25px;
  font-weight: bold;
  margin-top: 30px;
  position: absolute;
  top: 40px;
  right: 200px;
}

.mypage--container {
  margin-top: 50px;
}
.title {
  font-size: 25px;
  font-weight: bold;
  margin-left: 20px;
}

.reservation {
  width: 40%;
  padding: 20px;

}

.favorite {
  width: 60%;
  padding: 20px;
}

.no-list {
  margin: 50px;
}

.reservation-history {
  margin-top: 100px;
}

@media screen and (max-width: 768px) {
  .mypage--container {
    display: block;
  }

  .flex {
    justify-content: center;
  }

  .user-name {
  font-size: 25px;
  font-weight: bold;
  margin-top: 30px;
  position: static;
  /* top: 40px;
  right: 200px; */
}

  .reservation {
  width: 100%;
}

.favorite {
  width: 100%;
  margin-top: 80px;
}
}
</style>
