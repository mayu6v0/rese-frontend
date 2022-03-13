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
      <RestaurantCard @get-list="getRestaurantList"
      @get-favorite-list="getFavoriteList"
        v-for="item in filteredRestaurant"
        :key="item.id"
        :id="item.id"
        :url="item.image_url"
        :name="item.name"
        :area="item.area.name"
        :genre="item.genre.name"
        :filteredFavoriteList = "filteredFavoriteList"
        :filteredFavoriteId="filteredFavoriteId"
      ></RestaurantCard>
      <div class="no-restaurant" v-if="filteredRestaurant == ''">検索結果に一致する店舗はありません</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      restaurantList: [],
      favoriteList: [],
      filteredFavoriteList: [],
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
      const resData = await this.$axios.get(
        "https://m-rese.herokuapp.com/api/restaurant"
      );
      this.restaurantList = resData.data.data;
      //homeで♡押したときに変更が適用されるように際読み込み
      this.getFavoriteList();
    },
    //お気に入り一覧のAPIを取得する
    async getFavoriteList() {
      const resData = await this.$axios.get(
        "https://m-rese.herokuapp.com/api/favorite"
      );
      this.favoriteList = resData.data.data;
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
      return filteredRestaurant;
    },
    filteredFavoriteId() {
      const filteredFavoriteList = [];
        //ユーザーがログインしていたら、お気に入り一覧のuser_idとログインidが一致するもので新たに配列を作成する
        if(this.$auth.loggedIn) {
          for (let i = 0; i < this.favoriteList.length; i++) {
            const favorite = this.favoriteList[i];
            if (favorite.user_id === this.$auth.user.id) {
              filteredFavoriteList.push(favorite);
            }
          }
          this.filteredFavoriteList = filteredFavoriteList;
          // console.log(filteredFavoriteList);
          // return filteredArray;

          //filterdFavoriteListから、そのrestaurant_idだけで別の配列を作る
          const filteredFavoriteIdList =[];
          for(let i = 0; i < filteredFavoriteList.length; i++) {
            const favoriteListId = filteredFavoriteList[i].restaurant_id;
            filteredFavoriteIdList.push(favoriteListId);
          }
        console.log(filteredFavoriteIdList);
        return filteredFavoriteIdList;

        } else {
          return filteredFavoriteList; //ログインしていない場合は空の配列を返す
        }
    },
  },
  created() {
      this.getRestaurantList();
      //いらない？
      this.getFavoriteList();
  },
};
</script>

<style scoped>
.container {
  width: 95%;
  margin: 0 auto;
  background-color: rgb(245, 239, 239);
  /* border: 1px solid red; */
}

.search-field {
  background-color: #fff;
  height: 50px;
  position: absolute;
  top: 40px;
  right: 70px;
  /* border: 1px solid red; */
}

.search {
  display: inline-block;
  height: 100%;
  /* border: 1px solid blue; */
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
  /* position: absolute; */
  /* top: 50%; */
  /* left: 30px; */
  /* transform: translate(0, 0); */
}

.fontawesome-glass {
  width: 25px;
  height: 25px;
  color:lightgray;
  /* border: 1px solid red; */
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
    /* width: 95%; */
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
