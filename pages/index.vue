<template>
  <vs-row justify="center">
    <swiper :list="banners" auto-play />

    <!-- 推荐歌单 -->
    <vs-row>
      <h2 class="title">
        <nuxt-link to="/playlist">
          推荐歌单
        </nuxt-link>
      </h2>
      <div class="personalize-content">
        <vs-card v-for="item in personalizedPlayList" :key="item.id" type="2" @click="toPlaylistDetail(item.id)">
          <template #text>
            <p>{{ item.name }}</p>
          </template>
          <template #img>
            <img :src="item.picUrl" alt="">
          </template>
          <template #interactions>
            <vs-button
              size="small"
              transparent
              icon
              color="#F4F6F7"
            >
              <i class="bx bx-headphone" />
              {{ item.playCount | formatNumber }}
            </vs-button>
          </template>
        </vs-card>
      </div>
    </vs-row>

    <!-- 独家放送 -->
    <vs-row justify="center">
      <vs-col w="12">
        <h2 class="title">
          <nuxt-link to="#">
            独家放送
          </nuxt-link>
        </h2>
      </vs-col>
      <vs-row style="width: 90%">
        <vs-col
          v-for="item in privateContent"
          :key="item.id"
          w="4"
          type="flex"
          justify="center"
          style="padding: 0 10px"
        >
          <vs-card type="5">
            <template #text>
              <p>{{ item.name }}</p>
            </template>
            <template #img>
              <img :src="item.sPicUrl" alt="">
            </template>
          </vs-card>
        </vs-col>
      </vs-row>
    </vs-row>

    <!-- 最新音乐 -->
    <vs-row>
      <vs-col w="12">
        <h2 class="title">
          <nuxt-link to="#">
            最新音乐
          </nuxt-link>
        </h2>
      </vs-col>
      <vs-col w="12" type="flex" justify="center">
        <div class="new-songs">
          <vs-row
            v-for="item in personalizedNewSongs"
            :key="item.id"
            class="new-song"
          >
            <vs-col w="3" type="flex" justify="flex-end" style="padding-right: 4px">
              <vs-avatar size="60">
                <img :src="item.picUrl" alt="">
              </vs-avatar>
            </vs-col>
            <vs-col w="8" class="new-song-detail">
              <span class="truncate">{{ item.name }}</span>
              <span class="truncate new-song-artists">{{ item.song.artists.map(item => item.name) | formatNames }}</span>
            </vs-col>
          </vs-row>
        </div>
      </vs-col>
    </vs-row>

    <!-- 推荐MV -->
    <vs-row justify="center">
      <vs-col w="12">
        <h2 class="title">
          <nuxt-link to="#">
            推荐MV
          </nuxt-link>
        </h2>
      </vs-col>
      <vs-row style="width: 90%">
        <vs-col
          v-for="item in personalizedMV"
          :key="item.id"
          w="4"
          type="flex"
          justify="center"
          style="padding: 0 10px"
        >
          <vs-card type="5">
            <template #text>
              <p>{{ item.name }}</p>
            </template>
            <template #img>
              <img :src="item.picUrl" alt="">
            </template>
            <template #interactions>
              <vs-button
                size="small"
                transparent
                icon
                color="#F4F6F7"
              >
                <i class="bx bx-headphone" />&nbsp;
                {{ item.playCount | formatNumber }}
              </vs-button>
            </template>
          </vs-card>
        </vs-col>
      </vs-row>
    </vs-row>
  </vs-row>
</template>

<script>
export default {
  async asyncData ({ $api, $toast }) {
    const { banners } = await $api.getBanners()
    const personalizedPlayList = (await $api.getPersonalized({ limit: 10 })).result
    const privateContent = (await $api.getPrivateContent()).result
    const personalizedMV = (await $api.getPersonalizedMV()).result.slice(0, 3)
    const personalizedNewSongs = (await $api.getPersonalizedNewSong({ limit: 12 })).result
    return {
      banners,
      personalizedPlayList,
      privateContent,
      personalizedMV,
      personalizedNewSongs
    }
  },

  methods: {
    toPlaylistDetail (playlistId) {
      this.$router.push(`/playlist/${playlistId}`)
    }
  }

}
</script>

<style lang="sass" scoped>
.personalize-content
  width: 100%
  display: grid
  grid-template-columns: repeat(auto-fill, 16%)
  grid-row-gap: 20px
  grid-column-gap: 20px
  justify-content: center

.new-songs
  width: 90%
  display: grid
  grid-template-columns: repeat(auto-fill, 32%)
  grid-row-gap: 6px
  grid-column-gap: 6px
  justify-content: center

  .new-song
    padding: 4px

  .new-song-artists
    font-size: 0.1rem
    color: #7B7D7D

  .new-song-detail
    &:hover
      background-color: #eee

  span
    display: block
    width: 100%
    line-height: 30px

.title
  padding-left: 7%
  > a
    text-decoration: none
    color: #000
  &::after
    content: '>'
</style>
