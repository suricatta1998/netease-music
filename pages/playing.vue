<template>
  <vs-row justify="space-around">
    <vs-col w="5">
      <vs-row justify="center">
        <vs-col w="12" type="flex" j justify="center">
          <Album :is-rotate="!isPaused" :album-url="currentPlaying.al.picUrl" />
        </vs-col>
        <vs-row justify="space-around" style="width: 70%">
          <vs-tooltip>
            <vs-button icon circle floating color="#B7950B">
              <i class="bx bx-heart" />
            </vs-button>
            <template #tooltip>
              喜欢
            </template>
          </vs-tooltip>
          <vs-tooltip>
            <vs-button icon circle floating color="#B7950B">
              <i class="bx bxs-collection" />
            </vs-button>
            <template #tooltip>
              收藏
            </template>
          </vs-tooltip>
          <vs-tooltip>
            <vs-button icon circle floating color="#B7950B">
              <i class="bx bxs-download" />
            </vs-button>
            <template #tooltip>
              下载
            </template>
          </vs-tooltip>
          <vs-tooltip>
            <vs-button icon circle floating color="#B7950B">
              <i class="bx bxs-share-alt" />
            </vs-button>
            <template #tooltip>
              分享
            </template>
          </vs-tooltip>
        </vs-row>
      </vs-row>
    </vs-col>
    <vs-col w="6">
      <h3>{{ currentPlaying.name }}</h3>
      <vs-row justify="space-between">
        <vs-col w="3" class="truncate">
          <b>专辑:</b>
          <nuxt-link to="#">
            {{ currentPlaying.al.name }}
          </nuxt-link>
        </vs-col>
        <vs-col w="3" class="truncate">
          <b>歌手:</b>
          {{ artists | formatNames }}
        </vs-col>
        <vs-col w="4" class="truncate">
          <b>来源:</b>
          <nuxt-link :to="'/playlist/' + currentPlaying.source.id">
            {{ currentPlaying.source.name }}
          </nuxt-link>
        </vs-col>
      </vs-row>
      <vs-row justify="center" style="padding-top: 30px">
        <lyric-container :lyric="lyric" :current-time="currentTime" :nolyric="nolyric" />
      </vs-row>
    </vs-col>
    <vs-row justify="space-around">
      <vs-col w="7">
        <vs-col v-if="hotComments.length !== 0" w="12">
          <h3>精彩评论</h3>
          <comment-list :comments="hotComments" />
        </vs-col>
        <vs-col w="12">
          <h3 ref="newCommentsTitle">
            最新评论 ({{ total }})
          </h3>
          <comment-list :comments="comments" />
        </vs-col>
        <vs-pagination v-if="total > limit" v-model="page" :length="Math.ceil(total / limit)" />
      </vs-col>
      <vs-col w="4">
        <h3>相似歌曲</h3>
        <ul class="simi-songs">
          <li v-for="song in simiSongs" :key="song.id" @click="addSimiSong(song)">
            <vs-row align="center">
              <vs-col w="3" type="flex" justify="center">
                <vs-avatar size="70" class="pic">
                  <img :src="song.album.picUrl" alt="">
                </vs-avatar>
              </vs-col>
              <vs-col w="8">
                <vs-row>
                  <vs-col w="12" style="padding-bottom: 10px">
                    {{ song.name }}
                  </vs-col>
                  <vs-col class="truncate">
                    <small>
                      {{ song.artists.map(i => i.name) | formatNames }}
                    </small>
                  </vs-col>
                </vs-row>
              </vs-col>
            </vs-row>
          </li>
        </ul>
      </vs-col>
    </vs-row>
  </vs-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    lyric: '',
    nolyric: false,
    limit: 40,
    page: 1,
    comments: [],
    total: 0,
    hotComments: [],
    simiSongs: []
  }),
  computed: {
    ...mapGetters('playlist', ['currentPlaying', 'isPaused', 'currentTime', 'currentIndex']),
    artists () {
      return this.currentPlaying.ar.map(i => i.name)
    },
    offset () {
      return (this.page - 1) * this.limit
    }
  },

  watch: {
    currentPlaying () {
      this.getLyric()
      this.getSimiSongs()
    },

    page () {
      this.getComments()
    }
  },

  async created () {
    this.getLyric()
    this.getSimiSongs()
    const { comments, total, hotComments } = await this.$api.getSongComment({
      id: this.currentPlaying.id,
      limit: this.limit
    })
    this.comments = comments
    this.total = total - hotComments.length
    this.hotComments = hotComments
  },

  methods: {
    ...mapActions('playlist', ['addSongs', 'setCurrentIndex']),
    async getLyric () {
      const result = await this.$api.getLyric(this.currentPlaying.id)
      this.nolyric = result?.nolyric || false
      this.lyric = result?.lrc?.lyric || '纯音乐，请您欣赏'
    },

    async getComments () {
      const loading = this.$vs.loading({
        type: 'scale'
      })
      const { comments } = await this.$api.getSongComment({
        id: this.currentPlaying.id,
        limit: this.limit,
        offset: this.offset
      })
      loading.close()
      this.comments = comments
      this.$refs.newCommentsTitle.scrollIntoView()
    },

    async getSimiSongs () {
      const { songs } = await this.$api.getSimiSongs(this.currentPlaying.id)
      this.simiSongs = songs
    },

    addSimiSong (song) {
      // TODO
      // this.addSongs(song)
      // this.setCurrentIndex(this.currentIndex + 1)
    }
  }

}
</script>

<style lang="sass" scoped>
a
  text-decoration: none
  &:hover
    color: #85C1E9

.simi-songs
  list-style: none
  margin: 0
  padding: 0
  width: 100%
  height: 100%

  li
    width: 100%
    height: 80px
    display: flex
    align-items: center
    border-radius: 10px

    &:hover
      background-color: #ddd
</style>
