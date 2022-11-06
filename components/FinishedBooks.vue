<template>
  <section>
    <h3>Finished books and when they were finished (date of last update)</h3>
    <div v-for="book in books" :key="`finished-${book.id}`">
      {{ book.title }} - {{ book.last_update }}
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
    this.books = await this.getFinishedBooks()
  },
  methods: {
    ...mapActions({
      getFinishedBooks: 'books/getFinishedBooks',
    }),
  },
}
</script>
