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
  }
}
