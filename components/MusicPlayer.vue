<template>
  <vs-row class="music-player" align="center" justify="space-between">
    <vs-col w="3">
      <vs-row justify="space-around" align="center">
        <vs-col w="4" type="flex" justify="flex-end">
          <vs-avatar size="70" style="cursor: pointer" @click="toPlaying">
            <img v-if="currentPlaying" :src="currentPlaying.album.picUrl" alt="">
            <i v-else class="bx bx-album" />
          </vs-avatar>
        </vs-col>
        <vs-col w="7" type="flex" style="height: 70px">
          <vs-row align="center" class="info">
            <vs-col w="12">
              <span @click="toPlaying">{{ name }}</span>
            </vs-col>
            <vs-col w="12">
              <small>{{ artists | formatNames }}</small>
            </vs-col>
          </vs-row>
        </vs-col>
      </vs-row>
    </vs-col>

    <vs-col w="4">
      <audio
        ref="player"
        :src="url"
        :loop="mode === 'loop'"
        @timeupdate="timeupdate"
        @canplay="handleCanplay"
        @ended="next"
      />
      <vs-row class="controls" justify="center">
        <vs-col w="8" type="flex" justify="space-around">
          <vs-tooltip>
            <i class="bx bx-rewind" @click="rewind" />
            <template #tooltip>
              后退{{ offsetTime }}s
            </template>
          </vs-tooltip>
          <vs-tooltip>
            <i class="bx bx-skip-previous" @click="prev" />
            <template #tooltip>
              上一首
            </template>
          </vs-tooltip>
          <vs-tooltip v-if="isPaused">
            <i class="bx bx-play" @click="play" />
            <template #tooltip>
              播放
            </template>
          </vs-tooltip>
          <vs-tooltip v-else>
            <i class="bx bx-pause" @click="pause" />
            <template #tooltip>
              暂停
            </template>
          </vs-tooltip>
          <vs-tooltip>
            <i class="bx bx-skip-next" @click="next" />
            <template #tooltip>
              下一首
            </template>
          </vs-tooltip>
          <vs-tooltip>
            <i class="bx bx-fast-forward" @click="forward" />
            <template #tooltip>
              前进{{ offsetTime }}s
            </template>
          </vs-tooltip>
        </vs-col>

        <vs-col w="12" type="flex" justify="center">
          <div class="progress">
            <span class="start">
              {{ start | formatTime }}
            </span>
            <div ref="progressBar" class="progress-bar" @click="changeTime">
              <div ref="now" class="now" />
            </div>
            <span class="end">
              {{ end | formatTime }}
            </span>
          </div>
        </vs-col>
      </vs-row>
    </vs-col>

    <vs-col w="4" type="flex" justify="center">
      <vs-row align="center" justify="center">
        <div class="mode">
          <vs-tooltip v-if="mode === 'order'">
            <i
              class="iconfont icon-xunhuanbofang"
              @click="mode = 'loop'"
            />
            <template #tooltip>
              列表循环
            </template>
          </vs-tooltip>
          <vs-tooltip v-else-if="mode === 'loop'">
            <i
              class="iconfont icon-danquxunhuan"
              @click="mode = 'shuffle'"
            />
            <template #tooltip>
              单曲循环
            </template>
          </vs-tooltip>
          <vs-tooltip v-else>
            <i
              class="iconfont icon-suijibofang"
              @click="mode = 'order'"
            />
            <template #tooltip>
              随机播放
            </template>
          </vs-tooltip>
        </div>

        <div class="volume">
          <vs-tooltip v-if="volume === '0'">
            <i class="bx bx-volume-mute" @click="volume = '1'" />
            <template #tooltip>
              恢复音量
            </template>
          </vs-tooltip>
          <vs-tooltip v-else-if="volume === '1'">
            <i class="bx bx-volume-full" @click="volume = '0'" />
            <template #tooltip>
              静音
            </template>
          </vs-tooltip>
          <vs-tooltip v-else>
            <i class="bx bx-volume-low" @click="volume = '0'" />
            <template #tooltip>
              静音
            </template>
          </vs-tooltip>
        </div>
        <input
          v-model="volume"
          type="range"
          min="0"
          max="1"
          step="0.1"
        >
        <vs-tooltip class="playlist" interactivity>
          <i class="bx bxs-playlist" @click="toggleShowPlaylist(true)" />
          <template #tooltip>
            播放列表
          </template>
        </vs-tooltip>
      </vs-row>
    </vs-col>
  </vs-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'

export default {
  data: () => ({
    url: '',
    canplay: false,
    duration: 0,
    offsetTime: 5,
    mode: 'order',
    shuffleList: [],
    shuffleIndex: 0,
    volume: '0.5',
    playlistOpen: false
  }),

  computed: {
    ...mapGetters('playlist', ['currentPlaying', 'isPaused', 'currentTime', 'playlist', 'currentIndex']),
    name () {
      return this.currentPlaying ? this.currentPlaying.name : ''
    },
    artists () {
      if (this.currentPlaying) {
        return this.currentPlaying.artists.map(i => i.name)
      }
      return []
    },
    start () {
      return this.currentTime * 1000
    },
    end () {
      return this.duration * 1000
    }
  },

  watch: {
    async currentPlaying () {
      this.url = await this.getSongUrl()
    },

    currentTime () {
      this.$refs.now.style.width = this.currentTime / this.duration.toFixed(3) * 100 + '%'
    },

    mode (newVal) {
      if (newVal === 'shuffle') {
        this.shuffleList = _.shuffle([...Array(this.playlist.length).keys()])
      }
    },

    volume (newVal) {
      this.$refs.player.volume = newVal
    }
  },

  methods: {
    ...mapActions('playlist', ['setCurrentIndex', 'setCurrentTime', 'changePaused', 'toggleShowPlaylist']),
    async getSongUrl () {
      const { success, message } = await this.$api.checkSong({
        id: this.currentPlaying.id
      })

      if (success) {
        const { data } = await this.$api.getSongUrl({
          id: this.currentPlaying.id
        })
        const { url } = data[0]
        return url
      } else {
        this.$toast.danger('获取音乐url失败', message)
      }
    },

    handleCanplay () { // 当媒体文件可以播放的时候会触发
      this.canplay = true
      this.duration = this.$refs.player.duration
      this.$refs.player.volume = this.volume
      this.play()
    },

    timeupdate () { // 实时当前监听播放时间
      this.setCurrentTime(this.$refs.player.currentTime)
    },

    play () {
      if (this.canplay) {
        // this.$refs.player.load()
        this.$refs.player.play()
        this.changePaused(false)
      }
    },

    pause () {
      if (this.canplay) {
        this.$refs.player.pause()
        this.changePaused(true)
      }
    },

    changeTime (e) { // 点击进度条改变当前播放时间
      if (this.canplay) {
        const coordStart = this.$refs.progressBar.getBoundingClientRect().left
        const coordEnd = e.pageX
        const p = (coordEnd - coordStart) / this.$refs.progressBar.offsetWidth
        this.$refs.player.currentTime = p * this.duration
      }
    },

    rewind () { // 后退
      if (this.canplay) {
        this.$refs.player.currentTime -= this.offsetTime
      }
    },

    forward () { // 前进
      if (this.canplay) {
        this.$refs.player.currentTime += this.offsetTime
      }
    },

    next () {
      if (this.mode === 'shuffle') {
        if (this.shuffleIndex + 1 === this.shuffleList.length) {
          this.shuffleIndex = 0
        } else {
          this.shuffleIndex++
        }
        this.setCurrentIndex(this.shuffleList[this.shuffleIndex])
      }
      const idx = this.currentIndex + 1 === this.playlist.length ? 0 : this.currentIndex + 1
      this.setCurrentIndex(idx)
    },

    prev () {
      if (this.mode === 'shuffle') {
        if (this.shuffleIndex - 1 < 0) {
          this.shuffleIndex = this.shuffleList.length - 1
        } else {
          this.shuffleIndex--
        }
        this.setCurrentIndex(this.shuffleList[this.shuffleIndex])
      }
      const idx = this.currentIndex - 1 < 0 ? this.playlist.length - 1 : this.currentIndex - 1
      this.setCurrentIndex(idx)
    },

    toPlaying () {
      if (this.currentPlaying) {
        this.$router.push('/playing')
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.music-player
  height: 80px
  width: calc( 100% - 254px )
  position: fixed
  bottom: 0
  background: hsla(192, 15%, 99%, .75)
  -webkit-backdrop-filter: blur(5px)
  backdrop-filter: blur(5px)
  z-index: 9999

@mixin text-overflow
  overflow: hidden
  white-space: nowrap
  text-overflow: ellipsis

.info
  span
    font-size: 16px
    width: 100%
    display: inline-block
    @include text-overflow

    &:hover
      cursor: pointer
      color: #566573

  small
    width: 100%
    display: inline-block
    @include text-overflow

@mixin i-button($size: 35px)
  font-size: $size

  &:hover
    cursor: pointer
    color: #808B96

.controls
  i
    @include i-button

.mode
  margin-right: 20px
  i
    font-weight: bold
    @include i-button(24px)

.volume
  i
    @include i-button

.playlist
  i
    @include i-button

.playlist-content
  overflow: auto
  overscroll-behavior: contain

.progress
  display: flex
  justify-content: space-between
  align-items: center
  width: 380px

  .progress-bar
    position: relative
    width: 70%
    height: 5px
    background-color: #eee
    vertical-align: 2px
    border-radius: 3px
    cursor: pointer

  .now
    position: absolute
    left: 0
    display: inline-block
    height: 5px
    width: 0px
    background-color: #2c3e50

    // &::after
    //   content: ''
    //   position: absolute
    //   left: 100%
    //   width: 7px
    //   height: 7px
    //   border-radius: 3px
    //   background-color: #3498DB
</style>
