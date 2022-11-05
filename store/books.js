export const state = () => {
  return {}
}

export const actions = {
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
    updates.forEach(u => {
      tracker[u.date] = (tracker[u.date] || 0) + u.progress
    })

    const trackerKeys = Object.keys(tracker)
    return trackerKeys.map(key => ({ date: key, progress: tracker[key] }))
  },
  async getRecentBooks({ dispatch }, daysDelta = 10, limit = 6) {
    const updates = await dispatch('getUpdatesSinceDaysAgo', daysDelta)
    const uniqueBooks = []
    updates.forEach(u => {
      if (!uniqueBooks.includes(u.book)) uniqueBooks.push(u.book)
    })

    // get only first 6 books
    const books = uniqueBooks.slice(0, limit)

    // get book details and compile into array
    return await Promise.all(books.map(b => this.$api.getBook(b)))
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
