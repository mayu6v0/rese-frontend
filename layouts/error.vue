<template>
  <div class="container">
    <div class="title">Error!!!</div>
    <p>{{ error.statusCode }}</p>
    <p>{{ error.message }}</p>
  </div>
</template>
<script>
export default {
  props: ["error"],
};
</script>
<style scoped>
.container {
  width: 95%;
  text-align: center;
  font-size: 30px;
  line-height: 50px;
}

.title {
  font-size: 50px;
  margin: 100px 0 30px 0;
}
</style>