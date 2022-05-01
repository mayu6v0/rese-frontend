<template>
  <div class="card">
    <img class="card__img" :src="url" />
    <div class="card__content">
      <p class="card__title">{{ name }}</p>
      <p class="card__tag card__tag--area">#{{ area }}</p>
      <p class="card__tag card__tag--genre">#{{ genre }}</p>
      <br />
      <button @click="goToDetail">詳しくみる</button>

      <!-- mypageの時はお気に入り店舗だけが表示される -->
      <div v-if="mypage" class="favorite__icon">
        <fa :icon="['fas', 'heart']" class="fontawesome heart__favorite" v-if="favorite_id !== null" @click="deleteFavoriteAtMypage" />
      </div>
      <!-- それ以外（home）の時はお気に入り登録の有無によってハートの表示が変わる -->
      <div v-else class="favorite__icon">
        <!-- お気に入り店舗の時 -->
        <fa :icon="['fas', 'heart']" class="fontawesome heart__favorite" v-if="isFavorite" @click="deleteFavorite" />
        <!-- お気に入り店舗でない時 -->
        <fa :icon="['fas', 'heart']" class="fontawesome heart" v-else @click="addFavorite" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "favorite_id", "url", "name", "area", "genre", "favoriteList", "favoriteIdList"],
  methods: {
    goToDetail() {
      this.$router.push("/detail/"+this.id)
    },
    async addFavorite() {
      if(this.$auth.loggedIn && this.$auth.user.email_verified_at !== null) {
        const sendData = {
          user_id: this.$auth.user.id,
          restaurant_id: this.id,
      };
      await this.$axios.post(process.env.BASE_URL+"/api/favorite", sendData);
      this.$emit('get-favorite-list');
      } else {
          this.$router.push("/login");
      }
    },
    async deleteFavorite() {
      let deleteFavoriteId = "";
      for (let i = 0; i < this.favoriteList.length; i++) {
        const favorite = this.favoriteList[i];
        if (favorite.restaurant.id === this.id) {
          deleteFavoriteId = favorite.id;
        }
      };
      await this.$axios.delete(process.env.BASE_URL+"/api/favorite/"+deleteFavoriteId);
      this.$emit('get-favorite-list');
    },
    async deleteFavoriteAtMypage() {
      await this.$axios.delete(process.env.BASE_URL+"/api/favorite/"+this.favorite_id);
      this.$emit('get-favorite-list');
    }
  },
  computed: {
    mypage() {
      return this.$route.name === "mypage";
    },
    isFavorite() {
      return this.favoriteIdList.indexOf(this.id) !== -1
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
    box-shadow: 5px 5px 5px gray;
}

.card__img {
  border-radius: 10px 10px 0 0;
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.card__content {
  padding:15px 20px ;
  position: relative;
}

.card__title {
  font-size: 18px;
  font-weight: bold;
}

.card__tag {
  font-size: 14px;
  margin-top: 10px;
  margin-right: 10px;
  display: inline-block;
}

button {
  color: #fff;
  background-color: #0074E4;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  margin-top: 10px;
  cursor: pointer;
}

.favorite__icon {
  display: inline-block;
  position: absolute;
  bottom: 15px;
  right: 20px;
}

.heart {
  color: lightgray;
  cursor: pointer;
}

.heart__favorite {
  color: #f83979;
  cursor: pointer;
}
</style>