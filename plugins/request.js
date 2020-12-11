export default ({ $axios }, inject) => {
  inject('request', {
    get (url, params) {
      return new Promise((resolve, reject) => {
        $axios.$get(url, { params })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    post (url, data) {
      return new Promise((resolve, reject) => {
        data.timestamp = new Date().getTime()
        $axios.$post(url, data)
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    }
  })
}
