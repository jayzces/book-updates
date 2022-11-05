<template>
  <main>
    <section>
      <h3>Finished books and when they were finished (date of last update)</h3>
      <div v-for="book in section1Books" :key="book.id">
        {{ book.title }} - {{ book.end_date }}
      </div>
    </section>

    <section>
      <h3>Un-finished books and how much is left of them (or % progress)</h3>
    </section>

    <section>
      <h3>Books with activity in the last 10 days</h3>
    </section>

    <section>
      <h3>Combined progress per day in the last 10 days</h3>
    </section>

    <section>
      <h3>Book list sorted by latest activity</h3>
    </section>
  </main>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'IndexPage',
  data() {
    return {
      section1Books: [],
      section2Books: [],
    }
  },
  methods: {
    ...mapActions({
      getLatestFinishedBooks: 'books/getLatestFinishedBooks',
    }),
    async getBooks() {
      this.section1Books = await this.getLatestFinishedBooks()
    },
  },
  mounted() {
    this.getBooks()
  },
}
</script>

<style scoped>
section:not(:first-child) {
  @apply mt-20;
}
</style>
