<template>
  <main class="max-w-7xl w-full">
    <template v-if="loaded">
      <FinishedBooks />
      <UnfinishedBooks />
      <RecentBooks />
      <ProgressTracker />
      <SortedBooks />
    </template>
  </main>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'IndexPage',
  computed: {
    ...mapState({
      loaded: (state) => state.books.loaded,
    }),
  },
  async mounted() {
    await this.buildBookList()
  },
  methods: {
    ...mapActions({
      buildBookList: 'books/buildBookList',
    }),
  },
}
</script>
