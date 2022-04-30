# Rese
Rese(リーズ)はある企業のグループ会社の飲食店予約サービスを想定したアプリです。


　* バックエンドとしてrese-backendの使用を前提としています。

  rese-backend
  <https://github.com/mayu6v0/rese-backend.git>

## 開発環境
* Nuxt.js　2.15.8
* Laravel　8.75

## URL
<https://rese-nuxt.herokuapp.com>


## 機能一覧
### 店舗ページ
  * エリア、ジャンル、店舗名での検索
  * お気に入り店舗登録
  * 店舗詳細情報の表示
  * 予約機能

### マイページ
  * 認証機能
  * 予約一覧の表示
  * 予約情報の変更・削除
  * お気に入り店舗の編集
  * 過去の予約一覧の表示
  * 店舗のレビュー（5段階評価とコメント）

### 管理画面
  * 店舗代表者
    * 店舗情報の作成、更新、予約情報の作成
  * 管理者
    * 店舗代表者の作成
    * メール送信機能

### その他
  * メール認証機能
  * 予約時と予約当日に認証QRコード付きのメール送信
  * レスポンシブデザイン対応


## 環境構築方法

```bash
# パッケージのインストール
$ yarn install

# バックエンドのURL設定
  cross-envを使用し本番環境と開発環境のURLの切り分けが可能です。
  env.development.js と　env.production.js　
  それぞれに環境変数に合わせたURLの値を設定してください。

# ローカルサーバーの立ち上げ（localhost:3000）
$ yarn dev

#  Node.js サーバにデプロイする場合
$ yarn build
$ yarn start

# 静的ホスティングサービスにデプロイする場合
$ yarn generate
```
