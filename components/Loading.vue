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
      this.loading.close()
    }
  }
}
</script>
