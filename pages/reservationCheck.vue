<template>
  <div class="container">
    <div class="card">
      <div class="card__txt">
        <p>{{ text }}</p>
        <div v-if="checked">
          <table>
            <tr>
              <th>お名前</th>
              <td>{{ username }}様</td>
            </tr>
            <tr>
              <th>店名</th>
              <td>{{ restaurant_name }}</td>
            </tr>
            <tr>
              <th>日時</th>
              <td>{{ datetime }}</td>
            </tr>
            <tr>
              <th>人数</th>
              <td>{{ number }}名</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['auth', 'owner', 'emailVerify'],
  data() {
    return {
      text: "予約情報取得中...",
      checked: false,
      username: "",
      restaurant_name: "",
      datetime: "",
      number: ""
    }
  },
  async mounted() {
    const queryURL = this.$route.query.queryURL || '';
    if (queryURL != '') {
      const resData = await this.$axios.get(queryURL)
        try {
          console.log(resData);
          this.username = resData.data.data.user.name;
          this.restaurant_name = resData.data.data.restaurant.name;
          this.datetime = resData.data.data.datetime;
          this.number = resData.data.data.number;
          this.text = "予約情報取得完了";
          this.checked = true;
        } catch (error) {
          this.text = '予約情報が確認できません';
        };
    }
  },
}
</script>

<style scoped>
.container {
  width: 95%;
  margin: 0 auto;
  height: 100vh;
}

.card {
  background-color: white;
  width: 500px;
  padding: 100px 20px;
  border-radius: 5px;
  box-shadow: 5px 5px 5px gray;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.card__txt{
  text-align: center;
  font-size: 20px;
}

table {
  margin-top: 50px;
}

table th,
table td {
  padding: 10px 20px;
  text-align: left;
}

button {
  color: #fff;
  background-color: blue;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 30px auto 0;
  display: block;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .card {
    width: 100%;
  }
}
</style>