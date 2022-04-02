
<template>
  <div class="container">
    <h1 class="title">管理者ページ</h1>
    <div class="">
      <table class="create-user">
        <tr>
          <th>店舗代表者名/管理者名</th>
          <td><input type="text" v-model="name" /></td>
        </tr>
        <tr>
          <th>権限</th>
          <td>
            <select class="" v-model="authority">
              <!-- <option value="" selected hidden>選択</option> -->
              <option value="owner" selected>店舗代表者</option>
              <option value="adminr">管理者</option>
        </select>
          </td>
        </tr>
        <tr v-show="authority === 'owner'">
          <th>店舗名</th>
          <td>
            <select class="select-restaurant" v-model="restaurant_id">
              <option value="" selected hidden>選択する</option>
              <option v-for="item in restaurantList" :key="item.id" :value="item.restaurant_id">{{ item.name }}</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>メールアドレス</th>
          <td><input type="email" /></td>
        </tr>
        <tr>
          <th>パスワード</th>
          <td><input type="password"></td>
        </tr>
        
      </table>
    </div>
  </div>
</template>
<script>
export default {
  //ログインユーザーのみがmypageにアクセスできる
  middleware: ['auth','admin'],
  data() {
    return {
      restaurantList: [],
      name: "",
      email: "",
      password: "",
      restaurant_id: "",
      authority: "owner",
    }
  },
  methods: {
    //飲食店一覧のAPIを取得する
    async getRestaurantList() {
      const resData = await this.$axios.get(
        process.env.BASE_URL+"/api/restaurant"
      );
      this.restaurantList = resData.data.data;
    },
  },
  created() {
    this.getRestaurantList();
  }
}
</script>
<style scoped>
.container {
  width: 90%;
  margin: 0 auto;
  background-color: #fff;
  padding: 30px;
}
</style>
