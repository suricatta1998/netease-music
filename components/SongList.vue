<template>
  <vs-table striped>
    <template v-if="canSearch" #header>
      <vs-input v-model="search" border placeholder="搜索歌单音乐" />
    </template>
    <template #thead>
      <vs-tr>
        <vs-th>
          音乐标题
        </vs-th>
        <vs-th>
          歌手
        </vs-th>
        <vs-th>
          专辑
        </vs-th>
        <vs-th>
          时长
        </vs-th>
      </vs-tr>
    </template>
    <template #tbody>
      <vs-tr
        v-for="(song, index) in $vs.getSearch(songs, search)"
        :key="song.id"
        class="item"
        @dblclick.native="handle(index)"
      >
        <vs-td>
          {{ song.name }}
        </vs-td>
        <vs-td>
          {{ song.artists.map(i => i.name) | formatNames }}
        </vs-td>
        <vs-td>
          {{ song.album.name }}
        </vs-td>
        <vs-td>
          {{ song.dt | formatTime }}
        </vs-td>
      </vs-tr>
    </template>
  </vs-table>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default: () => []
    },
    canSearch: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      search: ''
    }
  },
  methods: {
    handle (index) {
      this.$emit('handle-list-item', index)
    }
  }
}
</script>

<style lang="sass" scoped>
.item
  &:hover
    cursor: pointer
</style>
