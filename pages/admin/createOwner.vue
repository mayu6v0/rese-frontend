
<template>
  <div class="container">
    <h1 class="title">管理画面</h1>
    <div class="menu">
      <a class="menu__item" @click="goToNewOwner">店舗代表者・管理者作成</a>
      <a class="menu__item" @click="goToSendMail">メール送信</a>
    </div>
    <div class="create">
      <h2 class="create__title">店舗代表者・管理者　新規登録</h2>
        <validation-observer ref="obs" v-slot="ObserverProps">
          <form class="register__form" @submit.prevent="register">
            <table class="table__create">
              <tr>
                <th>店舗代表者名/管理者名</th>
                <td>
                  <validation-provider v-slot="ProviderProps" rules="required">
                    <input type="text" name="名前" v-model="name" />
                    <div class="error">{{ ProviderProps.errors[0] }}</div>
                  </validation-provider>
                </td>
              </tr>
              <tr>
                <th>権限</th>
                <td>
                  <select class="" v-model="authority">
                    <option value="owner" selected>店舗代表者</option>
                    <option value="admin">管理者</option>
                  </select>
                </td>
              </tr>
              <tr v-show="authority === 'owner'">
                <th>店舗名</th>
                <td>
                  <select class="select-restaurant" name="店舗名" v-model="restaurant_id">
                    <option value="" selected>新規店舗</option>
                    <optgroup label="既存店舗">
                      <option v-for="item in restaurantList" :key="item.id" :value="item.id">{{ item.name }}</option>
                    </optgroup>
                  </select>
                </td>
              </tr>
              <tr>
                <th>メールアドレス</th>
                <td>
                  <validation-provider v-slot="ProviderProps" rules="required|email">
                    <input type="email" name="メールアドレス" v-model="email" />
                    <div class="error">{{ ProviderProps.errors[0] }}</div>
                  </validation-provider>
                </td>
              </tr>
              <tr>
                <th>パスワード</th>
                <td>
                  <validation-provider v-slot="ProviderProps" rules="required|min:8|max:10">
                    <input type="password" name="パスワード" v-model="password" />
                    <div class="error">{{ ProviderProps.errors[0] }}</div>
                  </validation-provider>
                </td>
              </tr>
            </table>
          <button type="submit" :disabled="ObserverProps.invalid">登録</button>
        </form>
      </validation-observer>
    </div>
    <div>
      <div class="owner">
        <h2 class="list">店舗代表者一覧</h2>
        <table class="table__owner">
          <tr>
            <th>店舗名</th>
            <th>店舗代表者名</th>
            <th>メールアドレス</th>
          </tr>
          <tr  v-for="owner in ownerList" :key=owner.id >
            <td v-if="!owner.restaurant"></td>
            <td v-else>{{ owner.restaurant.name }}</td>
            <td>{{ owner.name }}</td>
            <td>{{ owner.email }}</td>
          </tr>
        </table>
      </div>
      <div class="admin">
        <h2 class="list">管理者一覧</h2>
        <table class="table__admin">
          <tr>
            <th>管理者名</th>
            <th>メールアドレス</th>
          </tr>
          <tr  v-for="admin in adminList" :key=admin.id >
            <td>{{ admin.name }}</td>
            <td>{{ admin.email }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  middleware: ['auth','admin', 'emailVerify'],
  data() {
    return {
      authority: "owner",
      name: "",
      email: "",
      password: "",
      restaurant_id: "",
      restaurantList: [],
      ownerList: [],
      adminList: [],
    }
  },
  methods: {
    goToNewOwner() {
      this.$router.push("/admin/createowner");
    },
    goToSendMail() {
      this.$router.push("/admin/sendmail");
    },
    //飲食店一覧のAPIを取得する
    async getRestaurantList() {
      const resData = await this.$axios.get(
        process.env.BASE_URL+"/api/restaurant"
      );
      this.restaurantList = resData.data.data;
    },
    async getOwnerList() {
      const resData = await this.$axios.get(
        process.env.BASE_URL+"/api/auth/owner"
      );
      this.ownerList = resData.data.data;
      console.log(this.ownerList);
    },
    async getAdminList() {
      const resData = await this.$axios.get(
        process.env.BASE_URL+"/api/auth/admin"
      );
      this.adminList = resData.data.data;
      console.log(this.adminList);
    },
    async register() {
      try {
        // 管理者を登録する場合はrestaurant_idをnullにする
        if(this.authority === "admin") {
          this.restaurant_id = null;
        }

        // 新規会員登録する
        const sendData = {
          name: this.name,
          email: this.email,
          password: this.password,
          authority: this.authority,
          restaurant_id: this.restaurant_id
        };
        await this.$axios.post(process.env.BASE_URL+"/api/auth/register", sendData);
        alert("新規店舗代表者/管理者が登録されました");

        // 店舗代表者と管理者の一覧を更新する
        this.getOwnerList();
        this.getAdminList();
      } catch {
        alert("入力内容を確認してください");
      }
    },
  },
  created() {
    this.getRestaurantList();
    this.getOwnerList();
    this.getAdminList();
  },
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

tr,th,td {
  padding: 10px 30px;
}

.create,
.owner,
.admin {
  margin-top: 30px;
  padding-bottom: 30px;
  background-color: #fff;
}

.create__title {
  font-size: 25px;
  color: #fff;
  padding: 20px;
  background-color: #0074E4;
}

input,
select {
  width: 300px;;
  height: 30px;
}

.table__create {
  margin: 20px auto;
}

.table__create th {
  text-align:left;
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

.list {
  margin-top: 50px;
  font-size: 25px;
  color: #fff;
  padding: 20px;
  background-color: #0074E4;
}

.table__owner,
.table__admin {
  margin: 20px auto;
  width: 800px;
}

.table__admin tr,
.table__admin th,
.table__admin td,
.table__owner tr,
.table__owner th,
.table__owner td {
  border: 1px solid black;

}
.table__owner th,
.table__owner td,
.table__admin th,
.table__admin td {
  width: 200px;
}

.error {
  color: red;
  font-size: 14px;
}
</style>
