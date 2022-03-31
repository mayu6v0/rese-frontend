<template>
  <div class="card">
    <p class="title">{{ title }}</p>
    <p class="rating">評価<star-rating :read-only="true" :rating="rating" :increment="0.1" :star-size="20"></star-rating></p>
    <p class="review">{{ review }}</p>
  </div>
</template>

<script>
export default {
  props: ["title", "rating", "review"],
  data() {
    return {
    }
  },
}
</script>

<style scoped>
.card {
    max-width: 1000px;
    border-radius: 10px;
    margin: 20px auto;
    background-color: #fff;
    box-shadow: 5px 5px 5px gray;
    padding: 20px;
    color: black;
}

.title {
  font-size: 20px;
}

.rating,
.review {
  margin-top: 20px;
}
</style>