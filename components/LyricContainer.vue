<template>
  <div class="lyric-container">
    <ul ref="roller" class="roller">
      <li />
      <li />
      <li v-for="(item, idx) in lyrics" ref="items" :key="idx">
        {{ item.lyric }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    lyric: {
      type: String,
      default: ''
    },
    nolyric: {
      type: Boolean,
      default: false
    },
    currentTime: {
      type: Number,
      default: 0
    }
  },
  computed: {
    lyrics () {
      return this.processLyric()
    },
    highlightIdx () {
      let idx = 0
      if (!this.nolyric) {
        const result = this.lyrics.filter(item => item.timestamp < this.currentTime).pop()
        if (result) {
          idx = this.lyrics.findIndex(item => item.timestamp === result.timestamp)
        }
      }
      return idx
    }
  },
  watch: {
    highlightIdx (newVal) {
      if (!this.nolyric) {
        const items = this.$refs.items
        if (items && newVal < items.length) {
          // 先清除所有li的highlight
          this.$refs.items.forEach(item => item.classList.remove('highlight'))
          const li = this.$refs.items[newVal]
          li.classList.add('highlight')
          li.parentNode.scrollTop = newVal * 60
        }
      }
    }
  },

  methods: {
    processLyric () { // 将歌词字符串转为数组
      if (this.nolyric) {
        return [{
          timestamp: 0,
          lyric: '纯音乐，请您欣赏'
        }]
      }
      const result = this.lyric.split('[').slice(1).map((item) => {
        const [time, lyric] = item.replace('\n', '').split(']')
        const [minutes, seconds] = time.split(':').map(Number)
        const timestamp = minutes * 60 + seconds
        return { timestamp, lyric }
      })
      return result
    }
  }
}
</script>

<style lang="sass" scoped>
.lyric-container
  width: 100%
  height: 300px
  position: relative

  &::after
    position: absolute
    content: ''
    width: 100%
    height: 100%
    top: 0
    left: 0
    //  box-shadow: 0 0 30px 10px rgba(255, 255, 255, .7) inset
    box-shadow: inset 0px 20px 20px -15px rgba(255, 255, 255, .7), inset 0px -20px 20px -15px rgba(255, 255, 255, .7)

    pointer-events: none

.roller
  list-style: none
  margin: 0
  padding: 0
  width: 100%
  height: 100%
  overflow: auto
  // scroll-snap-type: y mandatory
  // background-image: linear-gradient(180deg, rgba(0, 0, 0, .9) 0%, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, .9) 100%)
  scroll-behavior: smooth
  overscroll-behavior: contain
  pointer-events: auto

  li
    width: 100%
    height: 60px
    display: flex
    align-items: center
    font-size: 1rem
    color: #333
    // scroll-snap-align: start
    &:last-child
      margin-bottom: 120px

.highlight
  font-weight: bold
  font-size: 1.2rem!important
</style>
