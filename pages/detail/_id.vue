<template>
  <div class="container flex">
    <div class="detail">
      <!-- <Header /> -->
      <div class="restaurant-detail">
        <div class="relative">
          <button class="back-btn" @click="backPage">＜</button>
          <h2 class="restaurant-name">{{ name }}</h2>
        </div>
        <img class="restaurant-img" :src="image_url">
        <p class="restaurant-tag">#{{ area }}</p>
        <p class="restaurant-tag">#{{ genre }}</p>
        <p class="restaurant-overview">{{ overview }}</p>
      </div>
    </div>
    <div class="reservation">
      <Reservation :id="$route.params.id" :name=name />
    </div>
    <ReviewList :id="$route.params.id" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      image_url:"",
      area: "",
      genre: "",
      overview: "",
    }
  },
  methods: {
    async getDetail() {
      const resData = await this.$axios.get(
        process.env.BASE_URL+"/api/restaurant/"+this.$route.params.id
      );
      const restaurantData = resData.data.data;
      this.name = restaurantData[0].name;
      this.image_url = restaurantData[0].image_url
      this.area = restaurantData[0].area.name;
      this.genre = restaurantData[0].genre.name;
      this.overview = restaurantData[0].overview;
    },
    backPage() {
      this.$router.go(-1);
    },
  },
  created() {
      this.getDetail();
    },
};
</script>

<style scoped>
.container {
  width: 93.4%;
  margin: 0 auto;
  background-color: rgb(245, 239, 239);
}

.detail {
  width: 50%;
}

.reservation {
  width: 50%;
}

.restaurant-detail {
  width: 85%;
  margin: 0 auto;
  padding: 50px 0;
  /* border: 1px solid red; */
  /* margin-bottom: 30px; */
}

.back-btn {
  width: 30px;
  height: 30px;
  cursor: pointer;
  border-radius: 5px;
  padding: 0;
  box-shadow: 5px 5px 5px gray;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  border: none;
  background-color: #fff;
}

.restaurant-name {
  display: inline-block;
  font-size: 30px;
  /* border: solid 1px red; */
  position: absolute;
  top: 50%;
  left: 50px;
  transform: translate(0, -50%);

}

.restaurant-img {
  width: 100%;
  display: block;
  margin-top: 40px;
}

.restaurant-tag {
  margin-top: 20px;
  display: inline-block;
}

.restaurant-overview {
  margin-top: 20px;
  line-height:25px;
}

@media screen and (max-width: 768px) {
  .flex {
    display: block;
  }

  .header-and-detail {
  width: 100%;
  }

  .reservation {
    width: 100%;
  }
}
</style>