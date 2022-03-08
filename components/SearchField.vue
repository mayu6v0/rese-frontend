<template>
  <div>
    <div class="search-field">
      <select v-model="searchArea">
        <option value="" selected>All area</option>
        <option v-for="area in areaList" :key="area.id" :value="area.value">
          {{ area.name }}
        </option>
      </select>
      <select v-model="searchGenre">
        <option value="" selected>All genre</option>
        <option v-for="genre in genreList" :key="genre.id" :value="genre.value">
          {{ genre.name }}
        </option>
      </select>
      <input type="text" v-model="searchWord" placeholder="🔍Search..." />
    </div>
  </div>
</template>
export default {
  props: ["restaurantList"],
  data() {
    return {
      searchArea: "",
      searchGenre: "",
      searchWord: "",
      areaList: [
        { value: "東京都", name: "東京都" },
        { value: "大阪府", name: "大阪府" },
        { value: "福岡県", name: "福岡県" },
      ],
      genreList: [
        { value: "寿司", name: "寿司" },
        { value: "焼肉", name: "焼肉" },
        { value: "居酒屋", name: "居酒屋" },
        { value: "イタリアン", name: "イタリアン" },
        { value: "ラーメン", name: "ラーメン" },
      ],
    }
  },
  computed: {
    filteredList() {
      const filteredArray = [];
      for (let i = 0; i < this.restaurantList.length; i++) {
        const restaurant = this.restaurantList[i];
        if (restaurant.area.name.indexOf(this.searchArea) !== -1 && restaurant.genre.name.indexOf(this.searchGenre) !== -1 && restaurant.name.indexOf(this.searchWord) !== -1) {
          filteredArray.push(restaurant);
        }
      }
      return filteredArray;
    },
  }