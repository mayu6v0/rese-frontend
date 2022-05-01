export default function ({ store, error }) {
  // authorityがownerでない場合
  if (store.state.auth.user.authority != 'owner') {
    return error({
      statusCode: 401,
      message: '権限がありません'
    })
  }
}