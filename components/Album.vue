<template>
  <div class="ablum-container">
    <img src="vinyl-record.png" class="background">
    <div class="album">
      <img ref="albumImg" :src="albumUrl">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    albumUrl: {
      type: String,
      default: ''
    },
    isRotate: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    timer: null,
    deg: 0
  }),

  watch: {
    albumUrl () { // 切换歌曲将图片旋转角度复原
      this.deg = 0
    },

    isRotate (newVal) {
      if (newVal) {
        this.rotate()
      } else {
        this.clear()
      }
    }
  },

  destroyed () {
    this.clear()
  },

  created () {
    if (this.isRotate) {
      this.rotate()
    }
  },

  methods: {
    rotate () {
      this.timer = setInterval(() => {
        this.$refs.albumImg.style.transform = `rotate(${this.deg}deg)`
        this.deg += 0.2
      }, 20)
    },

    clear () {
      clearInterval(this.timer)
    }
  }
}
</script>

<style lang="sass" scoped>
.ablum-container
  position: relative
  width: 25rem
  height: 25rem

  .background
    position: absolute
    width: 100%
    height: 100%

  .album
    display: flex
    justify-content: center
    align-items: center
    position: absolute
    margin: auto
    left: 0
    right: 0
    top: 0
    bottom: 0

    img
      height: 15rem
      width: 15rem
      border-radius: 50%

</style>
