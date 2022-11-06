export const state = () => {
  return {
    books: [],
    updates: [],
    loaded: false,
  }
}

export const mutations = {
  setBooks(state, list) {
    state.books = list
  },
  setLoaded(state, value) {
    state.loaded = value
  },
  setUpdates(state, list) {
    state.updates = list
  }
}

export const actions = {
  async buildBookList({ commit }) {
    const books = await this.$api.getBooks()
    const readingUpdates = await this.$api.getReadingUpdates({
      _sort: 'date',
      _order: 'desc'
    })

    const appendedUpdates = books.map(book => {
      const updates = readingUpdates.filter(u => u.book === book.id)
      return {
        ...book,
        reading_updates: updates,
        /**
         * Add last_update for sorting usage, last_update can be interpreted as
         * end_date if book is finished. Since updates are ordered desc, first
         * one is the most recent
         */
        last_update: updates[0].date || null
      }
    })

    // sort books by most recent
    appendedUpdates
      .sort((b1, b2) => new Date(b2.last_update) - new Date(b1.last_update))

    commit('setBooks', appendedUpdates)
    commit('setUpdates', readingUpdates)
    commit('setLoaded', true)
  },
  getFinishedBooks({ state }, limit = 6) {
    const books = state.books.filter(b => b.finished)
    return books.slice(0, limit)
  },
  getProgressPerDay({ state }, daysDelta = 10) {
    const date = getNewFlatDate(daysDelta)
    const updates = state.updates.filter(u => new Date(u.date) >= date)
    const tracker = {}

    for (const u of updates) {
      tracker[u.date] = (tracker[u.date] || 0) + u.progress
    }

    const trackerKeys = Object.keys(tracker)
    return trackerKeys.map(key => ({ date: key, progress: tracker[key] }))
  },
  getRecentBooks({ state }, daysDelta = 10, limit = 6) {
    const date = getNewFlatDate(daysDelta)
    const books = state.books.filter(b => new Date(b.last_update) >= date)
    return books.slice(0, limit)
  },
  getSortedBookList({ state }, limit = 6) {
    return state.books.slice(0, limit)
  },
  getUnfinishedBooks({ state }, limit = 6) {
    const books = state.books.filter(b => !b.finished)
    return books.map(b => {
      const compiledProgress = b.reading_updates.map(u => u.progress)
        .reduce((a, b) => a + b, 0)
      return {
        ...b,
        progress: (b.start_location + compiledProgress) / b.end_location
      }
    }).slice(0, limit)
  },
}

const getNewFlatDate = daysDelta => {
  const date = new Date()
  date.setDate(date.getDate() - daysDelta)
  const isoDate = date.toISOString().split('T')[0]
  return new Date(isoDate)
}
