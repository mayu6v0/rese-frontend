<template>
  <div>
    店舗代表者ページ
  </div>
</template>
<script>
export default {
  //ログインユーザーのみがmypageにアクセスできる
  middleware: ['auth','owner'],
}
</script>