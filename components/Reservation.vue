<template>
  <div class="reservation__container">
    <validation-observer ref="obs" v-slot="ObserverProps">
      <div class="form">
        <p class="reservation__title">予約</p>
        <div>
          <validation-provider v-slot="ProviderProps" rules="required">
            <input class="select-date" type="date" name="日付" v-model="date" :min="tommorow" >
            <div class="error">{{ ProviderProps.errors[0] }}</div>
          </validation-provider>
          <validation-provider v-slot="ProviderProps" rules="required">
            <select class="select__time" name="予約時間" v-model="time">
              <option value="" selected hidden>ご予約時間を選択</option>
              <option v-for="time in timeList" :key="time.id" :value="time.value">{{ time.name }}</option>
            </select>
            <div class="error">{{ ProviderProps.errors[0] }}</div>
          </validation-provider>
          <validation-provider v-slot="ProviderProps" rules="required">
            <select class="select__number" name="人数" v-model="number">
              <option value="" selected hidden>ご予約人数を選択</option>
              <option v-for="number in numberList" :key="number.id" :value="number.value">{{ number.name }}人</option>
            </select>
            <div class="error">{{ ProviderProps.errors[0] }}</div>
          </validation-provider>
          <validation-provider v-slot="ProviderProps" rules="required">
            <select class="select__payment-method" name="お支払い方法" v-model="paymentMethod">
              <option value="" selected hidden>お支払い方法を選択</option>
              <option value="cash">当日現金払い</option>
              <option value="card">カード払い（予約処理完了後に決済画面に遷移します）</option>
            </select>
            <div class="error">{{ ProviderProps.errors[0] }}</div>
          </validation-provider>
          <div class="confirm">
            <table class="confirm__table">
              <tr>
                <th>店名</th>
                <td>{{ name }}</td>
              </tr>
              <tr>
                <th>ご予約日</th>
                <td>{{ date }}</td>
              </tr>
              <tr>
                <th>ご予約時間</th>
                <td>{{ time }}</td>
              </tr>
              <tr>
                <th>ご予約人数</th>
                <td>{{ number }}人</td>
              </tr>
              <tr>
                <th>コース</th>
                <td>Aコース　お一人様4000円（税込）</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <button class="reservation-btn" :disabled="ObserverProps.invalid || !ObserverProps.validated" @click="reserve">予約する</button>
    </validation-observer>
    <stripe-checkout
      ref="checkoutRef"
      :pk="publishableKey"
      :session-id="sessionId"
    />
  </div>
</template>

<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe';

export default {
  components: {
    StripeCheckout,
  },
  props: ["id", "name"],
  data() {
    return {
      restaurant_id: this.id,
      date: "",
      time: "",
      number: "",
      today: "",
      timeList: [
        { value: "17:00", name: "17:00" },
        { value: "17:30", name: "17:30" },
        { value: "18:00", name: "18:00" },
        { value: "18:30", name: "18:30" },
        { value: "19:00", name: "19:00" },
        { value: "19:30", name: "19:30" },
        { value: "20:00", name: "20:00" },
        { value: "20:30", name: "20:30" },
        { value: "21:00", name: "21:00" },
        { value: "21:30", name: "21:30" },
        { value: "22:00", name: "22:00" },
        { value: "22:30", name: "22:30" }
      ],
      numberList: [
        { value: "1", name: "1" },
        { value: "2", name: "2" },
        { value: "3", name: "3" },
        { value: "4", name: "4" },
        { value: "5", name: "5" },
        { value: "6", name: "6" },
        { value: "7", name: "7" },
        { value: "8", name: "8" },
        { value: "9", name: "9" },
        { value: "10", name: "10" },
      ],
      paymentMethod: '',
      publishableKey:'pk_test_51KvglMLC0jpceEiOEitdpIxN1hmumOrc7kZ6EhzMu5wS6xrdB7sNElAqOQQams1PiAdEzFSIG6k2fRMITYcTxq9u00t1Hifbvk',
      loading: false,
      sessionId: '', // session_id from backend リダイレクト先urlや商品情報をこの中に含む
    };
  },
  methods: {
    async reserve() {
      if(this.$auth.loggedIn && this.$auth.user.email_verified_at !== null) {
        const sendData = {
          user_id: this.$auth.user.id,
          restaurant_id: this.restaurant_id,
          datetime: this.date +" "+ this.time,
          number: this.number,
        };
        if(this.paymentMethod === 'cash') {
          await this.$axios.post(process.env.BASE_URL+"/api/reservation", sendData);
          this.$router.push("/done");
        };
        if(this.paymentMethod === 'card') {
          const resData = await this.$axios.post(process.env.BASE_URL+"/api/reservation-card", sendData);
          console.log(resData.data.id);
          //受け取ったidをsessionIdに代入
          this.sessionId = resData.data.id;
          //checkoutに遷移し、決済後フロントエンドにリダイレクト
          this.$refs.checkoutRef.redirectToCheckout();
        }
      } else {
        this.$router.push("/login");
      };
    },
    async submit () {
      const res = await this.$axios.post(process.env.BASE_URL+"/api/create-checkout-session", {
          number: this.number
      });
      console.log(res.data.id);
      this.sessionId = res.data.id;
      // You will be redirected to Stripe's secure checkout page
      this.$refs.checkoutRef.redirectToCheckout();
    },
    getStringFromDate(date, format) {
        // formatのYYYYを文字列に置換
        format = format.replace(/YYYY/g, date.getFullYear());
        // 月を文字列に置換して先頭に0を足し、後ろの2文字を取得してMM部分に置換
        format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
        // 日を文字列に置換して先頭に0を足し、後ろの2文字を取得してMM部分に置換
        format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
        return format;
    },
  },
    computed: {
      tommorow() {
        //本日に1日足して翌日の日付を取得
        const tommorow = this.today.setDate(this.today.getDate()+1);
        //翌日の日付をYYYY-MM-DDの形式に
        const tommorowStr = this.getStringFromDate(this.today, 'YYYY-MM-DD');
        return tommorowStr;
      }
    },
    created() {
      //本日の日付を取得
      this.today = new Date();
    }
};
</script>

<style scoped>

.reservation__container {
  box-shadow: 5px 5px 5px gray;
  border-radius: 5px;
  /* height: 85%; */
  margin: 50px 70px;
}

.form {
  color: white;
  padding:40px;
  border-radius: 5px 5px 0 0;
  background: #0E3EDA;
  /* height: 90%; */
}

.reservation__title {
  font-size: 28px;
  margin-bottom: 25px;
}

.select__time,
.select__number,
.select__payment-method {
  width: 100%;
  height: 25px;
  margin-top: 20px;
}

.confirm {
  margin-top: 20px;
  padding: 20px;
  background-color: #41B3D3;
}

.confirm__table {
  width: 100%;
  background-color: #41B3D3;
  border-radius: 5px;
  text-align: left;
  line-height: 30px;
}

.confirm th {
  width: 120px;
}

.reservation-btn {
  color: #fff;
  background: #0074E4;
  font-size: 18px;
  border: none;
  box-shadow: none;
  width: 100%;
  /* height: 10%; */
  border-radius: 0 0 5px 5px;
  cursor: pointer;
}

.error {
  color: #fff;
  font-size: 14px;
}

@media screen and (max-width: 768px) {
  .reservation__container {
    margin-top: 30px;
  }

  .form {
    padding:10px 40px;
  }

  .confirm {
  padding: 10px;
}
}
</style>