<template>
  <div class="container">
    <Header />
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
        <fa :icon="['fas', 'magnifying-glass']" id="fontawesome-glass" class="fontawesome fontawesome-glass" />
        <input type="text" v-model="searchWord" placeholder="Search..." />
      </div>
    <div class="flex flex-center">
      <RestaurantCard @get-list="getList"
        v-for="item in filteredList"
        :key="item.id"
        :id="item.id"
        :url="item.image_url"
        :name="item.name"
        :area="item.area.name"
        :genre="item.genre.name"
        :filteredFavoriteId="filteredFavoriteId"
      ></RestaurantCard>
      <p class="no-restaurant" v-if="filteredList == ''">検索結果に一致する店舗はありません</p>
    </div>
  </div>
</template>

<script>
export default {
  // layout: 'detail',
  data() {
    return {
      restaurantList: [],
      favoriteList: [],
      // filteredFavoriteList: [],
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
    async getList() {
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/restaurant/"
      );
      this.restaurantList = resData.data.data;
      this.getFavoriteList();
    },
    async getFavoriteList() {
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/favorite/"
      );
      this.favoriteList = resData.data.data;
    },
  },
  computed: {
    filteredList() {
      const filteredArray = [];
      for (let i = 0; i < this.restaurantList.length; i++) {
        const restaurant = this.restaurantList[i];
        if (restaurant.area.name.indexOf(this.searchArea) !== -1 && restaurant.genre.name.indexOf(this.searchGenre) !== -1 && restaurant.name.indexOf(this.searchWord) !== -1) {
          filteredArray.push(restaurant);
        }
      }
      return filteredArray;
    },
    filteredFavoriteId() {
      const filteredArray = [];
        if(this.$auth.loggedIn) {
          for (let i = 0; i < this.favoriteList.length; i++) {
            const favorite = this.favoriteList[i];
            if (favorite.user_id === this.$auth.user.id) {
              filteredArray.push(favorite);
            }
          }
          console.log(filteredArray);
          // return filteredArray;
          const array =[];
          for(let k = 0; k < filteredArray.length; k++) {
            const a = filteredArray[k].restaurant_id;
            array.push(a);
          }
        console.log(array);
        return array;

        } else {
          return filteredArray;
        }
    },
  },
  created() {
      this.getList();
      // this.getFavoriteList();
  },
};
</script>

<style scoped>
.container {
  padding: 0;
  background-color: rgb(245, 239, 239);
  /* border: 1px solid red; */
}

.search-field {
  background-color: #fff;
  height: 50px;
  position: absolute;
  top: 40px;
  right: 70px;
  /* transform: translate(0, -50%); */
  /* border: 3px solid red; */
}

select {
  border: none;
  width: 100px;
  height: 50px;
}

input {
  border: none;
  width : 200px;
  line-height: 50px;
}

.fontawesome-glass {
  font-size: 20px !important;
  color:lightgray;
}

.flex-center {
  justify-content: center;
}

.no-restaurant{
  height: 100vh;
  margin-top: 100px;
}
</style>
