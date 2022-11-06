<template>
  <section>
    <h3>Combined progress per day in the last 10 days</h3>
    <div v-for="(p, pI) in list" :key="`progress-${pI}`">
      {{ p.date }} - {{ p.progress }} page{{ p.progress === 1 ? '' : 's' }}
      read
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      list: [],
    }
  },
  async mounted() {
    this.list = await this.getProgressPerDay()
  },
  methods: {
    ...mapActions({
      getProgressPerDay: 'books/getProgressPerDay',
    }),
  },
}
</script>
