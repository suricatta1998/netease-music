import Vue from 'vue'
import Vuesax from 'vuesax'

Vue.use(Vuesax)

export default (ctx, inject) => {
  const toast = (title = '', text = '', color = 'primary') => {
    Vue.prototype.$vs.notification({
      title,
      text,
      color,
      position: 'top-right',
      progress: 'auto'
    })
  }
  inject('toast', {
    primary (title, text) {
      toast(title, text, 'primary')
    },
    success (title, text) {
      toast(title, text, 'success')
    },
    danger (title, text) {
      toast(title, text, 'danger')
    },
    warning (title, text) {
      toast(title, text, 'warning')
    },
    dark (title, text) {
      toast(title, text, 'dark')
    }
  })
}
