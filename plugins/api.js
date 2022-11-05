export default function ({ env, store }, inject) {
  const baseUrl = env.apiBase

  const api = {
    async getBook(id) {
      const url = `${baseUrl}/books/${id}`
      return await fetch(url).then(response => response.json())
    },
    async getBooks(config = {}) {
      const url = `${baseUrl}/books${buildQueryParams(config)}`
      return await fetch(url).then(response => response.json())
    },
    async getReadingUpdates(config = {}) {
      const url = `${baseUrl}/reading_updates${buildQueryParams(config)}`
      return await fetch(url).then(response => response.json())
    }
  }

  inject('api', api)
}

const buildQueryParams = config => {
  const keys = Object.keys(config)
  if (keys.length < 1) return ''

  // build parameters
  const params = []
  keys.forEach(key => params.push(`${key}=${config[key]}`))

  // append params to url
  return `?${params.join('&')}`
}
