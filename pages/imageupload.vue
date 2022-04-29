<template>
    <div id="app" class="family">
		ファイルを選択
        <input @change="changeFile" ref="rfafile" type="file" />
        <input @click="regist" type="button" value="Upload"/>
    </div>
</template>
<script>
// import axios from 'axios';
export default {
  data() {
    return {
      uploadfile: {},
    };
  },
  methods: {
    changeFile(e) {
      const files = e.target.files || e.dataTransfer.files;
	  // ファイルが選択されたら変数に入れる
      this.uploadfile = files[0];
    },
    // 送信アクション
    async regist() {
      // パラメータ生成
      var params = new FormData();
      // FormDataにアップロードするファイルを設定
      params.append('photo', this.uploadfile);
      // API実行
      const response = await this.$axios.post(process.env.BASE_URL+"/api/images",
        params,
        {
          headers: {
            // multipartで送信
            'content-type': 'multipart/form-data',
          },
        },
      );
        console.log(response);
    },
  },
};
</script>
<style>
</style>