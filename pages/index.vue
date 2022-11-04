<template>
  <div>Home</div>
</template>

<script>
export default {
  name: 'IndexPage',
  methods: {
    async getBooks() {
      const res = await this.$api.getBooks()
      console.log({ res })
    },
  },
  mounted() {
    this.getBooks()
  },
}
</script>
