<template>
  <div class="container flex">
    <div class="detail">
      <div class="restaurant__detail">
        <div class="relative">
          <button class="back__btn" @click="backPage">＜</button>
          <h2 class="restaurant__name">{{ name }}</h2>
        </div>
        <img class="restaurant__img" :src="image_url">
        <p class="restaurant__tag">#{{ area }}</p>
        <p class="restaurant__tag">#{{ genre }}</p>
        <p class="restaurant__overview">{{ overview }}</p>
      </div>
    </div>
    <div class="reservation">
      <Reservation :id="$route.params.id" :name=name />
    </div>
    <div class="review">
      <p class="rating">総合評価</p>
      <star-rating
      :read-only="true" :rating="averageRating" :increment="0.1"></star-rating>
      <p v-show="averageRating === 'NaN'" class="nothing">評価はまだありません</p>
      <ReviewCard v-for="item in reviewList"
        :key="item.id"
        :title="item.title"
        :rating="item.rating"
        :review="item.review">
      </ReviewCard>
    </div>
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
      reviewList: [],
      rating: "",
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
    async getReviewList() {
      const resData = await this.$axios.get(
        process.env.BASE_URL+"/api/restaurantreview?restaurant_id="+this.$route.params.id
      );
      this.reviewList = resData.data.data;
    },
  },
  computed: {
    ratingArray() {
      const ratingArray = [];
      //favoriteListのrestaurant_idで新たに配列を作る
      for(let i = 0; i < this.reviewList.length; i++) {
        const rating = this.reviewList[i].rating;
        ratingArray.push(rating);
      };
      return ratingArray;
    },
    averageRating() {
      let sum = 0;
      for (let i = 0; i < this.ratingArray.length; i++) {
        sum += this.ratingArray[i];
      }
      const average = sum / this.ratingArray.length;
      return average.toFixed(1);
    },
  },
  created() {
      this.getDetail();
      this.getReviewList();
  },
};
</script>

<style scoped>
.container {
  width: 95%;
  margin: 0 auto;
  background-color: #EFF0F4;
}

.detail {
  width: 50%;
}

.reservation {
  width: 50%;
}

.restaurant__detail {
  width: 85%;
  margin: 0 auto;
  padding: 50px 0;
}

.back__btn {
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

.restaurant__name {
  display: inline-block;
  font-size: 30px;
  position: absolute;
  top: 50%;
  left: 50px;
  transform: translate(0, -50%);

}

.restaurant__img {
  width: 100%;
  display: block;
  margin-top: 40px;
}

.restaurant__tag {
  margin-top: 20px;
  display: inline-block;
}

.restaurant__overview {
  margin-top: 20px;
  line-height:25px;
}

.review {
  margin: 30px auto;
  width: 80%;
}

.rating {
  font-size: 20px;
  font-weight: bold;
}

.nothing {
  margin-top: 30px;
}

@media screen and (max-width: 768px) {
  .flex {
    display: block;
  }

  .detail {
    width: 100%;
  }

  .reservation {
    width: 100%;
  }

  .review {
  width: 100%;
  }
}
</style>