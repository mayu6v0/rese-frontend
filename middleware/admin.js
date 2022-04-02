export default function ({ store, redirect, error }) {
  // authorityがadminでない場合
  if (store.state.auth.user.authority != 'admin') {
    return error({
      statusCode: 401,
      message: '権限がありません。'
    })
  }
}