<template>
  <section>
    <h3>Un-finished books and how much is left of them (or % progress)</h3>
    <div v-for="book in books" :key="`unfinished-${book.id}`">
      {{ book.title }} - {{ book.progress | percent }}
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
    this.books = await this.getUnfinishedBooks()
  },
  methods: {
    ...mapActions({
      getUnfinishedBooks: 'books/getUnfinishedBooks',
    }),
  },
}
</script>
