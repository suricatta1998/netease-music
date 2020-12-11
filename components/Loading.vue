<template>
  <div />
</template>

<script>
export default {
  data: () => ({
    loading: null
  }),

  methods: {
    start () {
      this.loading = this.$vs.loading({
        progress: 0,
        type: 'circles'
      })
    },
    finish () {
      this.loading.close()
    },
    increase (num) {
      this.loading.changeProgress(num)
    }
  }
}
</script>
