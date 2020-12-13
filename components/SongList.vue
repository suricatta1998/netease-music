<template>
  <vs-table striped>
    <template #header>
      <vs-input v-model="search" border placeholder="搜索歌单音乐" />
    </template>
    <template #thead>
      <vs-tr>
        <vs-th sort @click="data = $vs.sortData($event, data, 'name')">
          音乐标题
        </vs-th>
        <vs-th sort @click="data = $vs.sortData($event, data, 'artists')">
          歌手
        </vs-th>
        <vs-th sort @click="data = $vs.sortData($event, data, 'album')">
          专辑
        </vs-th>
        <vs-th sort @click="data = $vs.sortData($event, data, 'time')">
          时长
        </vs-th>
      </vs-tr>
    </template>
    <template #tbody>
      <vs-tr
        v-for="(song, index) in $vs.getSearch(data, search)"
        :key="song.id"
        class="item"
        @dblclick.native="handle(index)"
      >
        <vs-td>
          {{ song.name }}
        </vs-td>
        <vs-td>
          {{ song.artists | formatNames }}
        </vs-td>
        <vs-td>
          {{ song.album }}
        </vs-td>
        <vs-td>
          {{ song.time | formatTime }}
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
    }
  },
  data: () => ({
    search: '',
    data: []
  }),
  created () {
    this.data = this.songs.map(item => ({
      id: item.id,
      name: item.name,
      artists: item.ar.map(i => i.name),
      album: item.al.name,
      time: item.dt
    }))
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
