<template>
  <vs-row justify="center">
    <div ref="title" class="title">
      <h1>{{ title }}</h1>
    </div>
    <vs-navbar v-model="active" class="nav" fixed square>
      <template #left>
        <vs-navbar-item id="songs" :active="active == 'songs'">
          单曲
        </vs-navbar-item>
        <vs-navbar-item id="artists" :active="active == 'artists'">
          歌手
        </vs-navbar-item>
        <vs-navbar-item id="albums" :active="active == 'albums'">
          专辑
        </vs-navbar-item>
        <vs-navbar-item id="videos" :active="active == 'videos'">
          视频
        </vs-navbar-item>
        <vs-navbar-item id="playlists" :active="active == 'playlists'">
          歌单
        </vs-navbar-item>
        <vs-navbar-item id="lyrics" :active="active == 'lyrics'">
          歌词
        </vs-navbar-item>
        <vs-navbar-item id="radios" :active="active == 'radios'">
          主播电台
        </vs-navbar-item>
        <vs-navbar-item id="users" :active="active == 'users'">
          用户
        </vs-navbar-item>
      </template>
    </vs-navbar>

    <vs-col w="11" class="content">
      <!-- 单曲 -->
      <vs-row v-if="active === 'songs'" justify="center">
        <song-list :songs="songsData.songs" :can-search="false" @handle-list-item="handleSongItem" />
        <vs-pagination v-if="songsData.count > limit" v-model="page" :length="Math.ceil(songsData.count / limit)" />
      </vs-row>

      <!-- 歌手 -->
      <vs-row v-if="active === 'artists'" justify="center">
        <div class="grid">
          <vs-card v-for="artist in artistsData.artists" :key="artist.id">
            <template #text>
              <h3>{{ artist.name }}</h3>
            </template>
            <template #img>
              <img :src="artist.img1v1Url" alt="">
            </template>
          </vs-card>
        </div>
        <vs-pagination v-if="artistsData.count > limit" v-model="page" :length="Math.ceil(artistsData.count / limit)" />
      </vs-row>

      <!-- 专辑 -->
      <vs-row v-if="active === 'albums'" justify="center">
        <div class="grid">
          <vs-card v-for="album in albumsData.albums" :key="album.id" type="2">
            <template #img>
              <img :src="album.picUrl" alt="">
            </template>
            <template #title>
              <h3>{{ album.name }}</h3>
            </template>
            <template #text>
              <small>{{ album.artist.name }}</small>
            </template>
          </vs-card>
        </div>
        <vs-pagination v-if="albumsData.count > limit" v-model="page" :length="Math.ceil(albumsData.count / limit)" />
      </vs-row>

      <!-- 视频 -->
      <vs-row v-if="active === 'videos'" justify="center">
        <div class="grid">
          <vs-card v-for="video in videosData.videos" :key="video.id">
            <template #title>
              <h3 class="truncate">
                {{ video.title }}
              </h3>
            </template>
            <template #text>
              <small>by {{ video.creator.map(i => i.userName).join(',') }}</small>
            </template>
            <template #img>
              <img :src="video.coverUrl" alt="">
            </template>
            <template #interactions>
              <vs-button
                transparent
                icon
                color="#F4F6F7"
              >
                <i class="bx bx-play" />
                {{ video.playTime | formatNumber }}
              </vs-button>
              <vs-button size="mini" transparent />
              <vs-button size="mini" transparent />
              <vs-button
                size="mini"
                transparent
                color="#F4F6F7"
              >
                {{ video.durationms | formatTime }}
              </vs-button>
            </template>
          </vs-card>
        </div>
        <vs-pagination v-if="videosData.count > limit" v-model="page" :length="Math.ceil(videosData.count / limit)" />
      </vs-row>

      <!-- 歌单 -->
      <vs-row v-if="active === 'playlists'" justify="center">
        <div class="grid">
          <vs-card v-for="playlist in playlistsData.playlists" :key="playlist.id" type="2">
            <template #img>
              <nuxt-link :to="'/playlist/' + playlist.id">
                <img :src="playlist.coverImgUrl" alt="">
              </nuxt-link>
            </template>
            <template #title>
              <h3>{{ playlist.name }}</h3>
            </template>
            <template #text>
              <small>{{ playlist.creator.nickname }}</small>
            </template>
          </vs-card>
        </div>
        <vs-pagination v-if="playlistsData.count > limit" v-model="page" :length="Math.ceil(playlistsData.count / limit)" />
      </vs-row>

      <!-- 歌词 -->
      <vs-row v-if="active === 'lyrics'" justify="center">
        <div class="grid">
          <vs-card v-for="lyric in lyricsData.lyrics" :key="lyric.id" type="2">
            <template #img>
              <img :src="lyric.album.picUrl" alt="">
            </template>
            <template #title>
              <h3>{{ lyric.name }}</h3>
            </template>
            <template #text>
              <small>{{ lyric.artists.map(i => i.name) | formatNames }}</small>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <!-- <span v-html="lyric.lyrics" /> -->
            </template>
          </vs-card>
        </div>
        <vs-pagination v-if="lyricsData.count > limit" v-model="page" :length="Math.ceil(lyricsData.count / limit)" />
      </vs-row>

      <!-- 主播电台 -->
      <vs-row v-if="active === 'radios'" justify="center">
        <div class="grid">
          <vs-card v-for="radio in radiosData.radios" :key="radio.id" type="2">
            <template #text>
              <h3>{{ radio.name }}</h3>
            </template>
            <template #img>
              <img :src="radio.picUrl" alt="">
            </template>
          </vs-card>
        </div>
        <vs-pagination v-if="radiosData.count > limit" v-model="page" :length="Math.ceil(radiosData.count / limit)" />
      </vs-row>

      <!-- 用户 -->
      <vs-row v-if="active === 'users'" justify="center">
        <subscriber-list :subscribers="usersData.users" />
        <vs-pagination v-if="usersData.count > limit" v-model="page" :length="Math.ceil(usersData.count / limit)" />
      </vs-row>
    </vs-col>
  </vs-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data: () => ({
    keywords: '',
    title: '',
    active: 'radios',
    limit: 100,
    page: 1,
    songsData: {
      songs: [],
      count: 0
    },
    albumsData: {
      albums: [],
      count: 0
    },
    artistsData: {
      artists: [],
      count: 0
    },
    playlistsData: {
      playlists: [],
      count: 0
    },
    usersData: {
      users: [],
      count: 0
    },
    lyricsData: {
      lyrics: [],
      count: 0
    },
    radiosData: {
      radios: [],
      count: 0
    },
    videosData: {
      videos: [],
      count: 0
    }
  }),

  computed: {
    ...mapGetters('playlist', ['currentIndex']),
    offset () {
      return (this.page - 1) * this.limit
    },
    types () {
      return {
        songs: this.searchSongs,
        albums: this.searchAlbums,
        artists: this.searchArtists,
        playlists: this.searchPlaylists,
        users: this.searchUsers,
        lyrics: this.searchLyrics,
        radios: this.searchRadios,
        videos: this.searchVideos
      }
    }
  },

  watch: {
    async active (newVal) {
      const loading = this.$vs.loading({
        type: 'corners'
      })
      this.page = 1
      await this.types[newVal]()
      loading.close()
    },
    async page (newVal) {
      const loading = this.$vs.loading({
        type: 'points'
      })
      scrollTo(0, 0)
      await this.types[this.active]()
      loading.close()
    },
    $route () {
      this.keywords = this.$route?.query?.keywords || ''
      if (this.keywords === '') {
        this.$router.push('/')
      }
      this.types[this.active]()
    }
  },

  mounted () {
    this.keywords = this.$route?.query?.keywords || ''
    if (this.keywords === '') {
      this.$router.push('/')
    }
    this.types[this.active]()
  },

  methods: {
    ...mapActions('playlist', ['addSongs', 'setCurrentIndex']),
    async searchSongs () {
      this.limit = 100
      const { result } = await this.$api.search({
        keywords: this.keywords,
        limit: this.limit,
        offset: this.offset
      })
      const { songs, songCount } = result
      this.songsData.songs = songs.map(item => ({
        id: item.id,
        name: item.name,
        artists: item.ar.map(i => ({ id: i.id, name: i.name })),
        album: {
          id: item.al.id,
          name: item.al.name,
          picUrl: item.al.picUrl
        },
        source: {
          name: '搜索页',
          url: this.$route.path
        },
        dt: item.dt
      }))
      this.songsData.count = songCount
      this.title = `找到${songCount}首单曲`
    },

    handleSongItem (index) { // 切歌
      this.addSongs(this.songsData.songs[index])
      this.setCurrentIndex(this.currentIndex + 1)
    },

    async searchAlbums () {
      this.limit = 20
      const { result } = await this.$api.search({
        keywords: this.keywords,
        limit: this.limit,
        offset: this.offset,
        type: 10
      })
      const { albums, albumCount } = result
      this.albumsData.albums = albums
      this.albumsData.count = albumCount
      this.title = `找到${albumCount}个专辑`
    },

    async searchArtists () {
      this.limit = 20
      const { result } = await this.$api.search({
        keywords: this.keywords,
        limit: this.limit,
        offset: this.offset,
        type: 100
      })
      const { artists, artistCount } = result
      this.artistsData.artists = artists
      this.artistsData.count = artistCount
      this.title = `找到${artistCount}位歌手`
    },

    async searchPlaylists () {
      this.limit = 20
      const { result } = await this.$api.search({
        keywords: this.keywords,
        limit: this.limit,
        offset: this.offset,
        type: 1000
      })
      const { playlists, playlistCount } = result
      this.playlistsData.playlists = playlists
      this.playlistsData.count = playlistCount
      this.title = `找到${playlistCount}个歌单`
    },

    async searchUsers () {
      this.limit = 40
      const { result } = await this.$api.search({
        keywords: this.keywords,
        limit: this.limit,
        offset: this.offset,
        type: 1002
      })
      const { userprofiles, userprofileCount } = result
      this.usersData.users = userprofiles
      this.usersData.count = userprofileCount
      this.title = `找到${userprofileCount}位用户`
    },

    async searchLyrics () {
      this.limit = 40
      const { result } = await this.$api.search({
        keywords: this.keywords,
        limit: this.limit,
        offset: this.offset,
        type: 1006
      })
      const { songs, songCount } = result
      this.lyricsData.lyrics = songs.map(item => ({
        id: item.id,
        name: item.name,
        artists: item.ar.map(i => ({ id: i.id, name: i.name })),
        album: {
          id: item.al.id,
          name: item.al.name,
          picUrl: item.al.picUrl
        },
        source: {
          name: '搜索页',
          url: this.$route.path
        },
        lyrics: item.lyrics,
        dt: item.dt
      }))
      this.lyricsData.count = songCount
      this.title = `找到${songCount}首歌词`
    },

    async searchRadios () {
      this.limit = 20
      const { result } = await this.$api.search({
        keywords: this.keywords,
        limit: this.limit,
        offset: this.offset,
        type: 1009
      })
      const { djRadios, djRadiosCount } = result
      this.radiosData.radios = djRadios
      this.radiosData.count = djRadiosCount
      this.title = `找到${djRadiosCount}个电台`
    },

    async searchVideos () {
      this.limit = 20
      const { result } = await this.$api.search({
        keywords: this.keywords,
        limit: this.limit,
        offset: this.offset,
        type: 1014
      })
      const { videos, videoCount } = result
      this.videosData.videos = videos
      this.videosData.count = videoCount
      this.title = `找到${videoCount}个视频`
    }
  }
}
</script>

<style lang="sass" scoped>
.title
  width: 100%
  background-color: #fff
  position: fixed
  top: 0
  left: 270px
  z-index: 99

.nav
  top: 80px
  left: 260px
  border-bottom: 1px solid #333

.content
  margin-top: 130px

.grid
  display: grid
  width: 100%
  grid-template-columns: repeat(auto-fill, 23%)
  grid-row-gap: 20px
  grid-column-gap: 20px
  justify-content: center
  align-items: center
  margin-bottom: 40px
</style>
