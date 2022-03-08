<template>
  <div class="container">
    <Header />
    <p class="user-name" v-if="$auth.loggedIn">{{ $auth.user.name }}さん</p>
    <!-- <button v-on:click="getUser">APIを叩く</button> -->
    <!-- {{ filteredReservationList }} -->
    <div class="flex mypage--container">
      <div class="reservation">
        <p class="title">予約状況</p>
        <ReservationCard @get-reservation-list="getReservationList" v-for="(item, index) in filteredReservationList" :index="index" :key="item.id" :id="item.id" :name="item.restaurant.name" :datetime="item.datetime" :number="item.number"></ReservationCard>
      </div>
      <div class="favorite">
        <p class="title">お気に入り店舗</p>
        <div class="flex">
          <!-- filteredFavoriteListnに存在するときは💖を表示 -->
          <RestaurantCard @get-favorite-list="getFavoriteList" v-for="item in filteredFavoriteList" :key="item.id" :id="item.id" :url="item.restaurant.image_url" :name="item.restaurant.name" :area="item.restaurant.area.name" :genre="item.restaurant.genre.name"></RestaurantCard>
        </div>
      </div>
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
    }
  },
  methods: {
    async getReservationList() {
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/reservation/"
      );
      this.reservationList = resData.data.data;
    },
    async getFavoriteList() {
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/favorite/"
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
    filteredReservationList() {
      const filteredArray = [];

      // もしユーザーがログインしてたら
      // if(this.$auth.loggedIn)

      // restaurantList[i].user_idが
      // this.$auth.user.idと一致するものを抽出して新たな配列を作る


      for (let i = 0; i < this.reservationList.length; i++) {
        const reservation = this.reservationList[i];
        if (reservation.user_id === this.$auth.user.id) {
          filteredArray.push(reservation);
        }
      }
      console.log(filteredArray);
      return filteredArray;
    },
    filteredFavoriteList() {
      const filteredArray = [];
      for (let i = 0; i < this.favoriteList.length; i++) {
        const favorite = this.favoriteList[i];
        if (favorite.user_id === this.$auth.user.id) {
          filteredArray.push(favorite);
        }
      }
      console.log(filteredArray);
      return filteredArray;
    },
  },
  created() {
      this.getReservationList();
      this.getFavoriteList();
    },
};
</script>

<style scoped>
.user-name {
  font-size: 25px;
  font-weight: bold;
  margin-top: 30px;
}

.mypage--container {
  margin-top: 30px;
}
.title {
  font-size: 25px;
  font-weight: bold;
}

.reservation {
  width: 40%;
}

.favorite {
  width: 60%;
}
</style>
