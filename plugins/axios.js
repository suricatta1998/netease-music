export default ({ $axios, $toast }) => {
  $axios.onError((err) => {
    if (process.client && err.response.status !== 200) {
      $toast.danger('请求失败', err.response)
    }
  })
}
