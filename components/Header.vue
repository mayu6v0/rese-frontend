<template>
  <div container>
    <div class="header__menu flex">
      <div class="menu" @click="changeIsOpen" :class="isOpen ? 'open' : ''">
        <span class="menu__line--top"></span>
        <span class="menu__line--middle"></span>
        <span class="menu__line--bottom"></span>
      </div>
      <a @click="goToHome" class="header-title" :class="isOpen ? 'open' : ''"
        >Rese</a
      >
    </div>
    <div class="menu-bg" :class="isOpen ? 'open' : ''">
      <div class="menu-list">
        <ul @click="changeIsOpen">
          <li class="menu-item">
            <a @click="goToHome">Home</a>
          </li>
          <li class="menu-item" v-if="!$auth.loggedIn">
            <NuxtLink to="/register">Registration</NuxtLink>
          </li>
          <li class="menu-item" v-if="!$auth.loggedIn">
            <NuxtLink to="/login">Login</NuxtLink>
          </li>
          <li class="menu-item" v-if="$auth.loggedIn">
            <a @click="logout">Logout</a>
          </li>
          <li class="menu-item" v-if="$auth.loggedIn">
            <NuxtLink to="/mypage">Mypage</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    changeIsOpen() {
      this.isOpen = !this.isOpen;
    },
    async logout() {
      try {
        await this.$auth.logout();
        this.$router.push("/login");
      } catch (error) {
        console.log(error);
      }
    },
    goToHome() {
      // homeのままのとき検索条件がリセットされる
      this.$emit('reset-filter');
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.header__menu {
  /* margin: 0 70px; */
  padding: 20px;
  background-color: rgb(245, 239, 239);
  /* border: 1px solid red; */
}

.header-title {
  color: blue;
  font-size: 40px;
  font-weight: bold;
}

.header-title.open {
  display: none;
}

.menu {
  display: inline-block;
  width: 36px;
  height: 36px;
  background-color: blue;
  cursor: pointer;
  border-radius: 5px;
  position: relative;
  margin-right: 20px;
  z-index: 10;
  box-shadow: 5px 5px lightgray;
}

.menu__line--top,
.menu__line--middle,
.menu__line--bottom {
  display: inline-block;
  height: 2px;
  background-color: #fff;
  position: absolute;
  transition: 0.5s;
}

.menu__line--top {
  width: 40%;
  top: 6px;
  left: 5px;
}

.menu__line--middle {
  width: 60%;
  top: 16px;
  left: 5px;
}

.menu__line--bottom {
  width: 20%;
  bottom: 7px;
  left: 5px;
}

.menu.open span:nth-of-type(1) {
  width: 70%;
  top: 18px;
  transform: rotate(45deg);
}
.menu.open span:nth-of-type(2) {
  opacity: 0;
}
.menu.open span:nth-of-type(3) {
  width: 70%;
  top: 18px;
  transform: rotate(-45deg);
}

.menu-bg {
  display: none;
  width: 100vw;
  height: 100vh;
  z-index: 9;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;

  border: 1px solid pink;
}

.menu-bg.open {
  display: block;
  /* margin: 0; */
}

.menu-list {
  /* border: 1px solid red; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.menu-item a {
  display: block;
  font-size: 30px;
  color: blue;
  text-decoration: none;
  text-align: center;
  padding: 30px;
}
</style>
