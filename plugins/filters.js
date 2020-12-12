import Vue from 'vue'

const filters = {
  formatNumber (value) {
    // 39522576 -> 395万
    let unit = ''
    const k = 10000
    const units = ['', '万', '亿', '万亿']
    if (value > k) {
      const i = Math.floor(Math.log(value) / Math.log(k))
      value = ((value / Math.pow(k, i))).toFixed(0)
      unit = units[i]
    }
    return value + unit
  },

  formatNames (value) {
    return value.join(' / ')
  },

  formatDate (value) {
    const date = new Date(value)
    const year = date.getFullYear()
    const month = date.getMonth().toString().padStart(2, 0)
    const day = date.getDay().toString().padStart(2, 0)
    return `${year}-${month}-${day}`
  },

  formatTime (value) {
    const date = new Date(value)
    const minutes = date.getMinutes().toString().padStart(2, 0)
    const seconds = date.getSeconds().toString().padStart(2, 0)
    return `${minutes}:${seconds}`
  }
}

Object.keys(filters).forEach((key) => {
  return Vue.filter(key, filters[key])
})
