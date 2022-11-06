<template>
  <section>
    <h3 class="section__header">Books with activity in the last 10 days</h3>

    <div class="grid grid-cols-6 gap-15">
      <div
        v-for="book in books"
        :key="`recent-${book.id}`"
        class="relative bg-gray-200 rounded-lg overflow-hidden"
      >
        <div class="aspect-w-2 aspect-h-3 pointer-events-none">
          <!-- aspect ratio -->
        </div>
        <div class="absolute inset-0 h-max px-15 py-10 font-bold">
          {{ book.title }}
        </div>
      </div>
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
