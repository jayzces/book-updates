export default function ({ env, store }, inject) {
  const baseUrl = env.apiBase

  const api = {
    async getBooks() {
      const url = `${baseUrl}/books`
      return await fetch(url)
        .then(response => response.json())
    }
  }

  inject('api', api)
}
