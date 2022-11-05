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
      }).then(response => ({ ...b, end_date: response[0].date })))
    )
  },
  async getUnfinishedBooks(_, limit = 6) {
    const books = await this.$api.getBooks({
      finished: false,
      _page: 1,
      _limit: limit
    })

    console.log({ books })
  }
}
