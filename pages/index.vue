<template>
  <main>
    <section>
      <h3>Finished books and when they were finished (date of last update)</h3>
      <div v-for="book in section1Books" :key="`finished-${book.id}`">
        {{ book.title }} - {{ book.end_date }}
      </div>
    </section>

    <section>
      <h3>Un-finished books and how much is left of them (or % progress)</h3>
      <div v-for="book in section2Books" :key="`unfinished-${book.id}`">
        {{ book.title }} - {{ book.progress | percent }}
      </div>
    </section>

    <section>
      <h3>Books with activity in the last 10 days</h3>
      <div v-for="book in section3Books" :key="`recent-${book.id}`">
        {{ book.title }}
      </div>
    </section>

    <section>
      <h3>Combined progress per day in the last 10 days</h3>
      <div v-for="(p, pI) in section4Progress" :key="`progress-${pI}`">
        {{ p.date }} - {{ p.progress }} page{{ p.progress === 1 ? '' : 's' }}
        read
      </div>
    </section>

    <section>
      <h3>Book list sorted by latest activity</h3>
      <div v-for="book in section5books" :key="`latest-${book.id}`">
        {{ book.title }}
      </div>
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
      section3Books: [],
      section4Progress: [],
      section5books: [],
    }
  },
  methods: {
    ...mapActions({
      buildBookList: 'books/buildBookList',
      getLatestFinishedBooks: 'books/getLatestFinishedBooks',
      getProgressPerDay: 'books/getProgressPerDay',
      getRecentBooks: 'books/getRecentBooks',
      getSortedBookList: 'books/getSortedBookList',
      getUnfinishedBooks: 'books/getUnfinishedBooks',
    }),
    async getData() {
      ;[
        this.section1Books,
        this.section2Books,
        this.section3Books,
        this.section4Progress,
        this.section5books,
      ] = await Promise.all([
        this.getLatestFinishedBooks(),
        this.getUnfinishedBooks(),
        this.getRecentBooks(),
        this.getProgressPerDay(),
        this.getSortedBookList(),
      ])
    },
  },
  async mounted() {
    await this.buildBookList()
    this.getData()
  },
}
</script>

<style scoped>
section:not(:first-child) {
  @apply mt-20;
}
</style>
