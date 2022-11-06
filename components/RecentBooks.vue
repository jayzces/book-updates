<template>
  <section>
    <h3>Books with activity in the last 10 days</h3>
    <div v-for="book in books" :key="`recent-${book.id}`">
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
    this.books = await this.getRecentBooks()
  },
  methods: {
    ...mapActions({
      getRecentBooks: 'books/getRecentBooks',
    }),
  },
}
</script>
