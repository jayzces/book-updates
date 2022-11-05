import Vue from 'vue'

export default () => {
  Vue.filter('percent', (value) => {
    if (!value) return ''
    if (typeof value !== 'number') return value
    return `${(value * 100).toFixed(2)}%`
  })
}
