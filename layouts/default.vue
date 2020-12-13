<template>
  <div>
    <Siderbar />
    <Login />
    <main class="main-page">
      <Nuxt />
      <music-player />
    </main>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  mounted () {
    const user = JSON.parse(localStorage.getItem('user'))
    this.setUser(user)
  },

  methods: {
    ...mapActions('auth', ['setUser'])
  }
}
</script>
