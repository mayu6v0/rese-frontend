<template>
  <div class="container">
    <Header @reset-filter="resetFilter"/>
    <div class="search-field">
      <select v-model="searchArea">
        <option value="" selected>All area</option>
        <option v-for="area in areaList" :key="area.id" :value="area.value">
          {{ area.name }}
        </option>
      </select>
      <select v-model="searchGenre">
        <option value="" selected>All genre</option>
        <option v-for="genre in genreList" :key="genre.id" :value="genre.value">
          {{ genre.name }}
        </option>
      </select>
      <div class="search relative">
        <fa :icon="['fas', 'magnifying-glass']" class="fontawesome fontawesome-glass" />
        <input type="text" v-model="searchWord" placeholder="Search..." />
      </div>
    </div>
    <div class="flex-center">
      <RestaurantCard @get-favorite-list="getFavoriteList"
        v-for="item in filteredRestaurant"
        :key="item.id"
        :id="item.id"
        :url="item.image_url"
        :name="item.name"
        :area="item.area.name"
        :genre="item.genre.name"
        :favoriteList = "favoriteList"
        :favoriteIdList="favoriteIdList">
      </RestaurantCard>
      <div class="no-restaurant" v-if="filteredRestaurant == ''">{{ message }}</div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'top',
  data() {
    return {
      message : "読み込み中...",
      restaurantList: [],
      favoriteList: [],
      searchArea: "",
      searchGenre: "",
      searchWord: "",
      areaList: [
        { value: "東京都", name: "東京都" },
        { value: "大阪府", name: "大阪府" },
        { value: "福岡県", name: "福岡県" },
      ],
      genreList: [
        { value: "寿司", name: "寿司" },
        { value: "焼肉", name: "焼肉" },
        { value: "居酒屋", name: "居酒屋" },
        { value: "イタリアン", name: "イタリアン" },
        { value: "ラーメン", name: "ラーメン" },
      ],
    }
  },
  methods: {
    //飲食店一覧のAPIを取得する
    async getRestaurantList() {
      this.message = '読み込み中...';

      const resData = await this.$axios.get(
        process.env.BASE_URL+"/api/restaurant"
      );
      this.restaurantList = resData.data.data;
    },
    async getFavoriteList() {
      if(this.$auth.loggedIn && this.$auth.user.email_verified_at !== null) {
        const token = this.$auth.strategy.token.get();
        //ユーザーがログインしていたらユーザーのお気に入り一覧のAPIを取得する
        const resData = await this.$axios.get(
        process.env.BASE_URL+"/api/favorite",
        );
      this.favoriteList = resData.data.data;
      } else {
        this.favoriteList = [];
      }
    },
    resetFilter() {
      //検索条件をリセット
      this.searchArea = "",
      this.searchGenre = "",
      this.searchWord = ""
    },
  },
  computed: {
    //飲食店一覧から検索条件に合うものを抽出する
    filteredRestaurant() {
      //検索条件に合う飲食店一覧で新たに配列を作成する
      const filteredRestaurant = [];
      for (let i = 0; i < this.restaurantList.length; i++) {
        const restaurant = this.restaurantList[i];
        if (restaurant.area.name.indexOf(this.searchArea) !== -1 && restaurant.genre.name.indexOf(this.searchGenre) !== -1 && restaurant.name.indexOf(this.searchWord) !== -1) {
          filteredRestaurant.push(restaurant);
        }
      }
      if(filteredRestaurant == '') {
        setTimeout(() => {
              this.message = '検索結果に一致する店舗はありません';
        }, 500);
      }

      return filteredRestaurant;
    },
    favoriteIdList() {
      const favoriteIdList = [];
      if(this.$auth.loggedIn && this.$auth.user.email_verified_at !== null) {
      //favoriteListのrestaurant_idで新たに配列を作る
      for(let i = 0; i < this.favoriteList.length; i++) {
        const favoriteId = this.favoriteList[i].restaurant_id;
        favoriteIdList.push(favoriteId);
      };
      return favoriteIdList;
      } else {
        return favoriteIdList;
      }
    },
  },
  created() {
      this.getRestaurantList();
      this.getFavoriteList();
  },
};
</script>

<style scoped>
.container {
  width: 95%;
  margin: 0 auto;
  background-color: #EFF0F4;
  /* border: 1px solid red; */
}

.search-field {
  background-color: #fff;
  height: 50px;
  position: absolute;
  top: 40px;
  right: 70px;
  box-shadow: 5px 5px 5px gray;
}

.search {
  display: inline-block;
  height: 100%;
}

select {
  border: none;
  width: 100px;
  height: 100%;
  margin-right: 20px;
}

input {
  border: none;
  width : 200px;
  height: 50px;
  line-height: 50px;
  margin-left: 30px;
}

.fontawesome-glass {
  width: 25px;
  height: 25px;
  color:lightgray;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  margin-right: 10px;
}

.no-restaurant{
  height: 100vh;
  margin-top: 100px;
}

/* --------responsive---------- */

@media screen and (max-width: 768px) {
  .search-field {
    width: 90%;
    position: static;
    margin: 0 auto;
  }

  .search {
  max-width: 100%;
  background-color: #fff;
  margin-right: 0;
  }

  select {
  max-width: 15%;
  margin-right: 0;
  }

  input {
    width: 100%;
  }
}

</style>
