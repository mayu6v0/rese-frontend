
<template>
  <div class="container">
    <h1 class="title">店舗管理画面</h1>
    <div class="menu">
      <a class="menu__item" @click="goToRestaurantInfo">店舗情報新規作成・更新</a>
      <a class="menu__item" @click="goToReservationInfo">予約情報照会</a>
    </div>
    <div>
      <table class="restaurant__info">
        <tr>
          <th>店舗ID</th>
          <td>{{ restaurant_id }}</td>
        </tr>
        <tr>
          <th>店名</th>
          <td>{{ name }}</td>
        </tr>
        <tr>
          <th>代表者</th>
          <td>{{ $auth.user.name }}さん
          </td>
        </tr>
      </table>
    </div>
    <div class="create" v-if="restaurant_id === null">
      <h2 class="detail__title">店舗情報作成</h2>
      <validation-observer ref="obs" v-slot="ObserverProps">
        <table class="detail__table">
          <tr>
            <th class="th">店名</th>
            <td>
              <validation-provider v-slot="ProviderProps" rules="required">
                <input type="text" name="店名"   v-model="name" />
                <div class="error">{{ ProviderProps.errors[0] }}</div>
              </validation-provider>
            </td>
          </tr>
          <tr>
            <th>画像URL</th>
            <td>
              <validation-provider v-slot="ProviderProps" rules="required">
                <input class="" name="画像URL" v-model="image_url" />
                <div class="error">{{ ProviderProps.errors[0] }}</div>
              </validation-provider>
            </td>
          </tr>
          <tr>
            <th>画像</th>
            <td>
              <img class="restaurant__img" :src="image_url">
            </td>
          </tr>
          <tr>
            <th>エリア</th>
            <td>
              <validation-provider v-slot="ProviderProps" rules="required">
                <select class="select-restaurant" name="エリア" v-model="area_id">
                  <option v-for="area in areaList" :key="area.id" :value="area.id">{{ area.name }}</option>
                </select>
                <div class="error">{{ ProviderProps.errors[0] }}</div>
              </validation-provider>
            </td>
          </tr>
          <tr>
            <th>ジャンル</th>
            <td>
              <validation-provider v-slot="ProviderProps" rules="required">
                <select name="ジャンル" v-model="genre_id">
                  <option v-for="genre in genreList" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
                </select>
                <div class="error">{{ ProviderProps.errors[0] }}</div>
              </validation-provider>
            </td>
          </tr>
          <tr>
            <th>店舗概要</th>
            <td>
              <validation-provider v-slot="ProviderProps" rules="required">
                <textarea type="text" name="店舗概要" v-model="overview" ></textarea>
                <div class="error">{{ ProviderProps.errors[0] }}</div>
              </validation-provider>
            </td>
          </tr>
        </table>
      <button :disabled="ObserverProps.invalid" @click="createNewRestaurant">新規店舗作成</button>
      </validation-observer>
    </div>
    <div class="update" v-else>
      <h2 class="detail__title">店舗情報</h2>
      <validation-observer ref="obs" v-slot="ObserverProps">
        <table class="detail__table">
          <tr>
            <th class="th">店名</th>
            <td>
              <validation-provider v-slot="ProviderProps" rules="required">
                <input type="text" name=" 店名" v-model="name" />
                <div class="error">{{ ProviderProps.errors[0] }}</div>
              </validation-provider>
            </td>
          </tr>
          <tr>
            <th>画像URL</th>
            <td>
              <validation-provider v-slot="ProviderProps" rules="required">
                <input name="画像URL" v-model="image_url" />
                <div class="error">{{ ProviderProps.errors[0] }}</div>
              </validation-provider>
            </td>
          </tr>
          <tr>
            <th>画像</th>
            <td>
              <img class="restaurant__img" :src="image_url">
            </td>
          </tr>
          <tr>
            <th>エリア</th>
            <td>
              <validation-provider v-slot="ProviderProps" rules="required">
                <select class="select-restaurant" name="エリア" v-model="area_id">
                  <option v-for="area in areaList" :key="area.id" :value="area.id">{{ area.name }}</option>
                </select>
                <div class="error">{{ ProviderProps.errors[0] }}</div>
              </validation-provider>
            </td>
          </tr>
          <tr>
            <th>ジャンル</th>
            <td>
              <validation-provider v-slot="ProviderProps" rules="required">
                <select name="ジャンル" v-model="genre_id">
                  <option v-for="genre in genreList" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
                </select>
                <div class="error">{{ ProviderProps.errors[0] }}</div>
              </validation-provider>
            </td>
          </tr>
          <tr>
            <th>店舗概要</th>
            <td>
              <validation-provider v-slot="ProviderProps" rules="required">
                <textarea type="text" name="店舗概要" v-model="overview" ></textarea>
                <div class="error">{{ ProviderProps.errors[0] }}</div>
              </validation-provider>
            </td>
          </tr>
        </table>
      <button :disabled="ObserverProps.invalid" @click="updateDetail">更新する</button>
      </validation-observer>
    </div>
    <div class="images">
      <h2 class="detail__title">店舗画像</h2>
        <h3 class="detail__title--sub">店舗画像アップロード</h3>
          <div class="image__upload">
            <validation-observer ref="obs" v-slot="ObserverProps">
              <validation-provider v-slot="ProviderProps" rules="required">
                <input name="画像" @change="changeFile" ref="rfafile" type="file" />
                <div class="error">{{ ProviderProps.errors[0] }}</div>
              </validation-provider>
              <button class="button--upload" :disabled="ObserverProps.invalid" @click="upload">アップロード</button>
            </validation-observer>
          </div>
        <h3 class="detail__title--sub">店舗画像一覧</h3>
          <table class="detail__table">
              <tr>
                <th>画像URL</th>
                <th class="td__img">画像</th>
              </tr>
              <tr  v-for="URL in imagesURL" :key=URL.id>
                <td>{{ URL.image_url }}</td>
                <td>
                  <img class="restaurant__img" :src="URL.image_url">
                </td>
              </tr>
          </table>
    </div>
  </div>
</template>
<script>
export default {
  middleware: ['auth', 'owner', 'emailVerify'],
  data() {
    return {
      name: "",
      image_url:"",
      area_id: "",
      genre_id: "",
      area: "",
      genre: "",
      overview: "",
      restaurant_id: this.$auth.user.restaurant_id,
      areaList: [
        { id: 1, name: "東京都" },
        { id: 2, name: "大阪府" },
        { id: 3, name: "福岡県" },
      ],
      genreList: [
        { id: 1, name: "寿司" },
        { id: 2, name: "焼肉" },
        { id: 3, name: "居酒屋" },
        { id: 4, name: "イタリアン" },
        { id: 5, name: "ラーメン" },
      ],
      uploadfile: {},
      imagesURL: [],
    }
  },
  methods: {
    goToRestaurantInfo() {
      this.$router.push("/owner");
    },
    goToReservationInfo() {
      this.$router.push("/reservationinfo");
    },
    // 店舗情報を取得する
    async getDetail() {
      const resData = await this.$axios.get(
        process.env.BASE_URL+"/api/restaurant/"+this.restaurant_id
      );
      const restaurantData = resData.data.data;
      this.name = restaurantData[0].name;
      this.image_url = restaurantData[0].image_url
      this.area = restaurantData[0].area.name;
      this.genre = restaurantData[0].genre.name;
      this.area_id = restaurantData[0].area.id
      this.genre_id = restaurantData[0].genre.id
      this.overview = restaurantData[0].overview;
    },
    async createNewRestaurant() {
      const sendData = {
        name: this.name,
        area_id: this.area_id,
        genre_id: this.genre_id,
        overview: this.overview,
        image_url: this.image_url
      };
      const resData = await this.$axios.post(process.env.BASE_URL+"/api/restaurant", sendData);
      this.restaurant_id = resData.data.data.id;

      //新規追加した店舗のrestaurant_idをログインユーザーのrestaurant_idに追加
      const Data = await this.$axios.put(process.env.BASE_URL+"/api/auth/update",
      {
        restaurant_id: this.restaurant_id
      });

      // // 表示する店舗情報を更新
      this.getDetail();
      alert('新規店舗情報が作成されました');
    },
    async updateDetail() {
      const sendData = {
        name: this.name,
        area_id: this.area_id,
        genre_id: this.genre_id,
        overview: this.overview,
        image_url: this.image_url
      };
      const resData = await this.$axios.put(process.env.BASE_URL+"/api/restaurant/"+this.restaurant_id, sendData);
      alert('店舗情報が更新されました');
      // 表示する店舗情報を更新
      this.getDetail();
    },
    changeFile(e) {
      const files = e.target.files || e.dataTransfer.files;
	    // ファイルが選択されたらdataのuploadfileに入れる
      this.uploadfile = files[0];
    },
    async upload() {
      // パラメータ生成
      const params = new FormData();
      // FormDataにアップロードするファイルを設定
      params.append('uploadimage', this.uploadfile);
      const response = await this.$axios.post(process.env.BASE_URL+"/api/images",
        params,
        {
          headers: {
            // multipartで送信
            'content-type': 'multipart/form-data',
          },
        },
      );
      alert('画像がアップロードされました');
      this.getImagesURL();
    },
    async getImagesURL() {
      const response = await this.$axios.get(process.env.BASE_URL+"/api/images");
      this.imagesURL = response.data.data;
    },
  },
  created() {
    this.getDetail();
    this.getImagesURL();
  }
}
</script>

<style scoped>
.container {
  width: 90%;
  margin: 0 auto;
  padding: 30px;
}

.title {
  font-size: 35px;
  text-align: center;
}

.menu {
  margin: 0px 0px auto 0px;
  text-align: right;
}

.menu__item {
  display: block;
  font-size: 18px;
  color: #0E3EDA;
  text-decoration: none;
  padding: 10px;
}

.restaurant__info tr,
.restaurant__info th,
.restaurant__info td {
  border: none;
  padding: 3px;
  text-align: left;
}

.restaurant__info th {
  width: 100px;
}

.restaurant__img {
  width: 50%;
  display: block;
}

.table tr,th,td {
  padding: 10px 30px;
  border: 1px solid black;
}

.create,
.update,
.images {
  margin-top: 30px;
  padding-bottom: 30px;
  background-color: #fff;
}

.detail__title {
  font-size: 25px;
  color: #fff;
  padding: 20px;
  background-color: #0074E4;
}

input,
select {
  width: 600px;;
  height: 30px;
}

textarea {
  width: 600px;
  height: 100px;
}

.detail__table {
  width: 800px;
  margin: 20px auto;
}

.detail__table th {
  vertical-align: middle;
}

.th {
  width: 200px;
}

.td__img {
  width: 100%;
}

button {
  display: block;
  font-size: 20px;
  color: #fff;
  background-color: #0074E4;
  border: none;
  border-radius: 5px;
  padding: 10px 30px;
  margin: 30px auto 0;
  cursor: pointer;
}

.image__upload {
  margin: 30px auto;
  width: 50%;
  padding: 30px;
}

.detail__title--sub {
  font-size: 18px;
  padding: 10px;
  color: #fff;
  background-color:  #6495ed;
}

.button--upload {
  font-size: 18px;
  padding: 10px 20px;
}

.error {
  color: red;
  font-size: 14px;
}
</style>
