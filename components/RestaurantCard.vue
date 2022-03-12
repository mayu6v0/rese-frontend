<template>
  <div class="card">
    <img class="card-img" :src="url" />
    <div class="card-content">
      <p class="card-title">{{ name }}</p>
      <p class="card-tag card-tag--area">#{{ area }}</p>
      <p class="card-tag card-tag--genre">#{{ genre }}</p>
      <br />
      <button @click="goToDetail">詳しくみる</button>

      <!-- mypageの時はお気に入り店舗だけが表示される -->
      <div v-if="mypage" class="favorite-icon">
        <fa :icon="['fas', 'heart']" class="fontawesome heart-favorite" v-if="favorite_id !== null" @click="deleteFavoriteAtMypage" />
      </div>
      <!-- それ以外（home）の時はお気に入り登録の有無によってハートの表示が変わる -->
      <div v-else class="favorite-icon">
        <!-- お気に入り店舗の時 -->
        <fa :icon="['fas', 'heart']" class="fontawesome heart-favorite" v-if="isFavorite" @click="deleteFavorite" />
        <!-- お気に入り店舗でない時 -->
        <fa :icon="['fas', 'heart']" class="fontawesome heart" v-else @click="addFavorite" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "favorite_id", "url", "name", "area", "genre", "filteredFavoriteList", "filteredFavoriteId"],
  methods: {
    goToDetail() {
      this.$router.push("/detail/"+this.id)
    },
    async addFavorite() {
      if(this.$auth.loggedIn) {

        const sendData = {
          user_id: this.$auth.user.id,
        restaurant_id: this.id,
      };
      // console.log(sendData);
      await this.$axios.post("https://m-rese.herokuapp.com/api/favorite", sendData);
      this.$emit('get-list');
        } else {
          this.$router.push("/login");
        }
    },
    async deleteFavorite() {
      let deleteFavoriteId = "";
      for (let i = 0; i < this.filteredFavoriteList.length; i++) {
        const favorite = this.filteredFavoriteList[i];
        if (favorite.restaurant.id === this.id) {
          // console.log(favorite.id);
          deleteFavoriteId = favorite.id;
        }
      };
          // console.log(deleteFavoriteId);
      await this.$axios.delete("https://m-rese.herokuapp.com/api/favorite/"+deleteFavoriteId);
      console.log(deleteFavoriteId);
      this.$emit('get-favorite-list');
    },
    async deleteFavoriteAtMypage() {
      await this.$axios.delete("https://m-rese.herokuapp.com/api/favorite/"+this.favorite_id);
      this.$emit('get-favorite-list');
    }
  },
  computed: {
    mypage() {
      return this.$route.name === "mypage";
    },
    isFavorite() {
      return this.filteredFavoriteId.indexOf(this.id) !== -1
    }
  },

};

</script>

<style scoped>
.card {
    width: 280px;
    border-radius: 10px;
    margin: 20px 10px 0;
    background-color: #fff;
    box-shadow: 5px 5px lightgray;
}

.card-img {
  border-radius: 10px 10px 0 0;
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.card-content {
  padding:15px 20px ;
  position: relative;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
}

.card-tag {
  font-size: 14px;
  margin-top: 10px;
  margin-right: 10px;
  display: inline-block;
}

button {
  color: #fff;
  background-color: blue;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  margin-top: 10px;
}

.favorite-icon {
  display: inline-block;
  position: absolute;
  bottom: 15px;
  right: 20px;
}

.heart {
  color: lightgray;
}

.heart-favorite {
  color: #f83979;
}
</style>