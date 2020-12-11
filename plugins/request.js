export default ({ $axios }, inject) => {
  inject('request', {
    get (url, params) {
      return new Promise((resolve, reject) => {
        $axios.$get(url, { params })
          .then(data => resolve(data))
          .catch(err => reject(err))
      })
    },
    post (url, data) {
      return new Promise((resolve, reject) => {
        $axios.$post(url, { data })
          .then(data => resolve(data))
          .catch(err => reject(err))
      })
    }
  })
}
