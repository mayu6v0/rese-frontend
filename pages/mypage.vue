<template>
  <div class="container">
    <Header />
    <p class="user-name" v-if="$auth.loggedIn">{{ $auth.user.name }}さん</p>
   $auth.user {{ $auth.user }}
   {{$store.state.token}}
    <!-- <button v-on:click="getUser">APIを叩く</button> -->
    <!-- {{ filteredReservationList }} -->
    <div class="flex mypage--container">
      <div class="reservation">
        <p class="title">予約状況</p>
        <ReservationCard @get-reservation-list="getReservationList"
         v-for="(item, index) in reservationList" :index="index" :key="item.id" :id="item.id" :name="item.restaurant.name" :restaurant_id="item.restaurant.id" :datetime="item.datetime" :number="item.number"></ReservationCard>
        <div class="no-list" v-if="reservationList == ''">
          予約情報はありません
        </div>
      </div>
      <div class="favorite">
        <p class="title">お気に入り店舗</p>
        <div class="flex-center">
          <!-- filteredFavoriteListに存在するときは💖を表示 -->
          <RestaurantCard @get-favorite-list="getFavoriteList" v-for="item in favoriteList" :key="item.id" :id="item.restaurant.id" :favorite_id="item.id" :url="item.restaurant.image_url" :name="item.restaurant.name" :area="item.restaurant.area.name" :genre="item.restaurant.genre.name"></RestaurantCard>
          <div class="no-list" v-if="favoriteList == ''">
          お気に入り店舗はありません
        </div>
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
      console.log("development or production")
      console.log(process.env.BASE_URL+"api/reservation");
      const token = this.$auth.strategy.token.get();
      const resData = await this.$axios.get(
        process.env.BASE_URL+"api/reservation",
        {
          // params: {
          //   user_id: this.$auth.user.id
          // }
          headers: { Authorization: 'Bearer ' + token }
        });
      this.reservationList = resData.data.data;
      console.log(this.reservationList);
    },
    async getFavoriteList() {
      const resData = await this.$axios.get(
        process.env.BASE_URL+"api/favorite",
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
    //user_idで抽出用に作成　laravel側でやったらいらない
    // filteredReservationList() {
    //   const filteredReservationList = [];
      // もしユーザーがログインしてたら
      // restaurantList[i].user_idが
      // this.$auth.user.idと一致するものを抽出して新たな配列を作る
    //   for (let i = 0; i < this.reservationList.length; i++) {
    //     const reservation = this.reservationList[i];
    //     if (reservation.user_id === this.$auth.user.id) {
    //       filteredReservationList.push(reservation);
    //     }
    //   }
    //   console.log(filteredReservationList);
    //   return filteredReservationList;
    // },
    // filteredFavoriteList() {
    //   const filteredFavoriteList = [];
    //   for (let i = 0; i < this.favoriteList.length; i++) {
    //     const favorite = this.favoriteList[i];
    //     if (favorite.user_id === this.$auth.user.id) {
    //       filteredFavoriteList.push(favorite);
    //     }
    //   }
    //   console.log(filteredFavoriteList);
    //   return filteredFavoriteList;
    // },
  },
  created() {
      this.getReservationList();
      this.getFavoriteList();
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
