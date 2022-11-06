<template>
  <section>
    <h3 class="section__header">
      Un-finished books and how much is left of them (or % progress)
    </h3>

    <div class="grid grid-cols-6 gap-15">
      <div
        v-for="book in books"
        :key="`unfinished-${book.id}`"
        class="relative bg-gray-200 rounded-lg overflow-hidden"
      >
        <div class="aspect-w-2 aspect-h-3 pointer-events-none">
          <!-- aspect ratio -->
        </div>
        <div class="absolute inset-0 h-max px-15 py-10 font-bold">
          {{ book.title }}
        </div>

        <div
          class="absolute bottom-0 inset-x-0 px-15 py-10 text-gray-600 text-xs"
        >
          {{ book.progress | percent }} Read
        </div>
        <div class="absolute h-5 bottom-0 inset-x-0 bg-gray-300">
          <div
            class="bg-blue-500 h-full"
            :style="`width: calc(100% * ${book.progress})`"
          ></div>
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
    this.books = await this.getUnfinishedBooks()
  },
  methods: {
    ...mapActions({
      getUnfinishedBooks: 'books/getUnfinishedBooks',
    }),
  },
}
</script>
