<template>
  <vs-sidebar class="current-playlist" :open.sync="status" right>
    <vs-row justify="center" align="center" style="height: 100vh">
      <ul v-if="playlist.length !== 0">
        <li v-for="(song, index) in playlist" :key="song.id">
          <span class="name truncate">
            <template v-if="currentIndex === index">
              <i v-if="isPaused" class="bx bx-pause" />
              <i v-else class="bx bx-play" />
            </template>
            <i v-else />
            {{ song.name }}
          </span>
          <span class="truncate">
            {{ song.artists.map(i => i.name) | formatNames }}
          </span>
        </li>
      </ul>
      <span v-else>你还没有添加任何歌曲</span>
    </vs-row>
  </vs-sidebar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {

  computed: {
    ...mapGetters('playlist', ['playlist', 'showPlaylist', 'currentIndex', 'isPaused']),
    status: {
      set (newVal) {
        this.toggleShowPlaylist(newVal)
      },
      get () {
        return this.showPlaylist
      }
    }
  },

  methods: {
    ...mapActions('playlist', ['toggleShowPlaylist'])
  }
}
</script>

<style lang="sass" scoped>
ul
  width: 100%
  list-style: none
  margin: 0
  padding: 5px

  li
    width: 100%
    height: 30px
    display: flex
    align-items: center
    justify-content: space-between

    &:hover
      background-color: #ddd

    &:nth-child(odd)
      background-color: #F0F3F4

    span
      width: 33%

</style>
