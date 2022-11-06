export const state = () => {
  return {
    books: [],
    updates: []
  }
}

export const mutations = {
  saveBooks(state, list) {
    state.books = list
  },
  saveUpdates(state, list) {
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
        // since updates are ordered desc, first one is the most recent
        end_date: updates[0].date || null
      }
    })

    commit('saveBooks', appendedUpdates)
    commit('saveUpdates', readingUpdates)
  },
  async getLatestFinishedBooks(_, limit = 6) {
    const books = await this.$api.getBooks({
      finished: true,
      _page: 1,
      _limit: limit
    })

    return await Promise.all(
      books.map(b => this.$api.getReadingUpdates({
        book: b.id,
        _sort: 'date',
        _order: 'desc',
      }).then(updates => ({ ...b, end_date: updates[0].date })))
    )
  },
  async getProgressPerDay({ dispatch }, daysDelta = 10) {
    const updates = await dispatch('getUpdatesSinceDaysAgo', daysDelta)
    const tracker = {}

    for (const u of updates) {
      tracker[u.date] = (tracker[u.date] || 0) + u.progress
    }

    const trackerKeys = Object.keys(tracker)
    return trackerKeys.map(key => ({ date: key, progress: tracker[key] }))
  },
  async getRecentBooks({ dispatch }, daysDelta = 10, limit = 6) {
    const updates = await dispatch('getUpdatesSinceDaysAgo', daysDelta)
    const uniqueBooks = []

    for (const u of updates) {
      // get only first 6 books
      if (uniqueBooks.length > limit) break
      if (!uniqueBooks.includes(u.book)) uniqueBooks.push(u.book)
    }

    // get book details and compile into array
    return await Promise.all(uniqueBooks.map(b => this.$api.getBook(b)))
  },
  getSortedBookList({ state }, limit = 6) {
    const books = [...state.books]
    books.sort((b1, b2) => new Date(b2.end_date) - new Date(b1.end_date))
    return books.slice(0, limit)
  },
  async getUnfinishedBooks(_, limit = 6) {
    const books = await this.$api.getBooks({
      finished: false,
      _page: 1,
      _limit: limit
    })

    return await Promise.all(
      books.map(b => this.$api.getReadingUpdates({
        book: b.id,
      }).then(updates => {
        const compiledProgress = updates.map(u => u.progress)
          .reduce((a, b) => a + b, 0)
        return {
          ...b,
          progress: (b.start_location + compiledProgress) / b.end_location
        }
      }))
    )
  },
  async getUpdatesSinceDaysAgo(_, daysDelta = 10) {
    const date = new Date()
    date.setDate(date.getDate() - daysDelta)
    const dateString = date.toISOString().split('T')[0]
    return await this.$api.getReadingUpdates({
      date_gte: dateString,
      _sort: 'date',
      _order: 'desc'
    })
  }
}
