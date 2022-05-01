<template>
  <div class="container">
    <p class="user-name" v-if="$auth.loggedIn">{{ $auth.user.name }}さん</p>
    <div class="flex mypage__container">
      <div class="reservation">
        <h2 class="title">予約状況</h2>
        <ReservationCard @get-reservation-list="getReservationList"
          v-for="(item, index) in futureReservation"
          :index="index"
          :key="item.id"
          :id="item.id"
          :name="item.restaurant.name"
          :restaurant_id="item.restaurant.id"
          :datetime="item.datetime"
          :number="item.number">
        </ReservationCard>
        <div class="no-list" v-if="reservationList == ''">予約情報はありません</div>
      </div>
      <div class="favorite">
        <h2 class="title">お気に入り店舗</h2>
        <div class="flex-center">
          <!-- favoriteListに存在するときは💖を表示 -->
          <RestaurantCard @get-favorite-list="getFavoriteList"
            v-for="item in favoriteList"
            :key="item.id"
            :id="item.restaurant.id"
            :favorite_id="item.id"
            :url="item.restaurant.image_url"
            :name="item.restaurant.name"
            :area="item.restaurant.area.name"
            :genre="item.restaurant.genre.name">
          </RestaurantCard>
          <div class="no-list" v-if="favoriteList == ''">お気に入り店舗はありません</div>
        </div>
      </div>
    </div>
    <div class="reservation-history">
      <h2 class="title">予約履歴</h2>
      <ReservationHistoryCard @get-reservation-list="getReservationList"
        v-for="(item, index) in pastReservation"
        :index="index"
        :key="item.id"
        :id="item.id"
        :name="item.restaurant.name"
        :restaurant_id="item.restaurant.id"
        :datetime="item.datetime"
        :number="item.number" :reviewedReservationList="reviewedReservationList">
      </ReservationHistoryCard>
    </div>
  </div>
</template>

<script>
export default {
  //メール認証済みのログインユーザーのみがmypageにアクセスできる
  middleware: ['auth','emailVerify'],
  data() {
    return {
      reservationList: [],
      favoriteList:[],
      reviewList: [],
      todayMs: "",
    }
  },
  methods: {
    async getReservationList() {
      const resData = await this.$axios.get(
        process.env.BASE_URL+"/api/reservation",
      );
      this.reservationList = resData.data.data;
    },
    async getFavoriteList() {
      const resData = await this.$axios.get(
        process.env.BASE_URL+"/api/favorite",
      );
      this.favoriteList = resData.data.data;
    },
    async getReviewList() {
      const resData = await this.$axios.get(
        process.env.BASE_URL+"/api/review",
      );
      this.reviewList = resData.data.data;
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
          futureReservationList.push(reservation);
        }
      }
        return futureReservationList;
    },
    pastReservation(){
      const pastReservationList = [];
      //reservationListのdatetimeを取得
      for(let i = 0; i < this.reservationList.length; i++) {
        const reservation = this.reservationList[i];
        //reservationListのdatetimeを取得（文字列）
        const reservationDateStr = reservation.datetime;
        //経過msに変換
        const reservationDate = Date.parse(reservationDateStr.replace(/-/g, "/"));
        //現在日時より先ならpastReservationListに入れる
        if(reservationDate <= this.todayMs ) {
          pastReservationList.push(reservation);
        }
      }
        return pastReservationList.reverse();
    },
    reviewedReservationList() {
      const reviewedReservationList = [];
      //reviewListのreservation_idで新たに配列を作る
      for(let i = 0; i < this.reviewList.length; i++) {
        const reviewedReservation = this.reviewList[i].reservation_id;
        reviewedReservationList.push(reviewedReservation);
      };
      return reviewedReservationList;
    },
  },
  created() {
      this.getReservationList();
      this.getFavoriteList();
      this.getReviewList();
      //現在日時を取得
      const today = new Date();
      //現在日時を経過msに変換
      this.todayMs = today.getTime();
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

.mypage__container {
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
  .mypage__container {
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
