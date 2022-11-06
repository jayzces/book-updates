<template>
  <section>
    <h3>Book list sorted by latest activity</h3>
    <div v-for="book in books" :key="`latest-${book.id}`">
      {{ book.title }}
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      books: [],
    }
  },
  async mounted() {
    this.books = await this.getSortedBookList()
  },
  methods: {
    ...mapActions({
      getSortedBookList: 'books/getSortedBookList',
    }),
  },
}
</script>
