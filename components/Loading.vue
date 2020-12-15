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
        type: 'circles'
      })
    },
    finish () {
      if (this.loading) {
        this.loading.close()
      }
    }
  }
}
</script>
