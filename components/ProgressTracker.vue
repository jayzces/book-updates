<template>
  <section>
    <div class="section__header flex justify-between items-center">
      <h3>Combined progress per day in the last 10 days</h3>

      <span>{{ pagesGoal }} pages / day</span>
    </div>

    <div class="grid grid-cols-2 gap-15">
      <div
        v-for="(p, pI) in list"
        :key="`progress-${pI}`"
        class="pl-60 py-5 relative"
      >
        <div class="text-gray-600 absolute text-right w-40 left-10 text-xs">
          {{ p.date | monthDay }}
        </div>
        <div class="h-20 w-full rounded bg-gray-300 overflow-hidden">
          <div
            class="
              h-full
              text-xs
              leading-[20px]
              text-center text-white
              whitespace-nowrap
            "
            :class="[p.progress >= pagesGoal ? 'bg-green-500' : 'bg-blue-500']"
            :style="`width: ${computeWidth(p.progress)}`"
          >
            <span>
              {{ p.progress }} page{{ p.progress === 1 ? '' : 's' }} read
            </span>
          </div>
        </div>

        <div
          v-if="computeWidth(p.progress) === '100%'"
          class="
            absolute
            w-15
            h-15
            right-5
            inset-y-0
            my-auto
            rounded-full
            flex
            text-white
          "
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 16 16"
            class="w-full h-auto m-auto"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="m2.75 8.75l3.5 3.5l7-7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  filters: {
    monthDay(value) {
      if (!value) return ''
      const dateString = value.split('-')
      return `${dateString[2] || ''}-${dateString[1] || ''}`
    },
  },
  data() {
    return {
      list: [],
      pagesGoal: 150,
    }
  },
  async mounted() {
    this.list = await this.getProgressPerDay()
  },
  methods: {
    ...mapActions({
      getProgressPerDay: 'books/getProgressPerDay',
    }),
    computeWidth(value) {
      const percent = (value / this.pagesGoal) * 100
      if (percent > 100) return '100%'
      return `${percent.toFixed(2)}%`
    },
  },
}
</script>
