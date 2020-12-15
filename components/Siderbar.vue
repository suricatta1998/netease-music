<template>
  <div class="siderbar">
    <vs-sidebar v-model="active" open>
      <template #logo>
        <nuxt-link to="/">
          <Logo :width="200" />
        </nuxt-link>
      </template>

      <!-- 搜索 -->
      <vs-sidebar-item>
        <template #icon>
          <i class="bx bx-search" />
        </template>
        <vs-input v-model="keywords" @keydown.enter="search" />
      </vs-sidebar-item>

      <template v-for="item in items">
        <vs-sidebar-item
          :id="item.id"
          :key="item.id"
          :to="item.route"
        >
          <template #icon>
            <i :class="item.icon" />
          </template>
          {{ item.name }}
        </vs-sidebar-item>
      </template>
      <template v-if="isAuth">
        <!-- 我的 -->
        <vs-sidebar-group>
          <template #header>
            <vs-sidebar-item arrow>
              我的
            </vs-sidebar-item>
          </template>
          <template v-for="item in my">
            <vs-sidebar-item
              :id="item.id"
              :key="item.id"
              :to="item.route"
            >
              <template #icon>
                <i :class="item.icon" />
              </template>
              {{ item.name }}
            </vs-sidebar-item>
          </template>
        </vs-sidebar-group>

        <!-- 创建的歌单 -->
        <vs-sidebar-group>
          <template #header>
            <vs-sidebar-item arrow>
              创建的歌单
            </vs-sidebar-item>
          </template>

          <template v-for="item in createdPlaylist">
            <vs-sidebar-item
              :id="item.id"
              :key="item.id"
              :to="item.route"
            >
              <template #icon>
                <i :class="item.icon" />
              </template>
              {{ item.name }}
            </vs-sidebar-item>
          </template>
        </vs-sidebar-group>

        <!-- 收藏的歌单 -->
        <vs-sidebar-group>
          <template #header>
            <vs-sidebar-item arrow>
              收藏的歌单
            </vs-sidebar-item>
          </template>

          <template v-for="item in collectedPlaylist">
            <vs-sidebar-item
              :id="item.id"
              :key="item.id"
              :to="item.route"
            >
              <template #icon>
                <i :class="item.icon" />
              </template>
              {{ item.name }}
            </vs-sidebar-item>
          </template>
        </vs-sidebar-group>
      </template>

      <template #footer>
        <vs-row justify="space-between">
          <template v-if="isAuth">
            <vs-avatar>
              <nuxt-link to="profile">
                <img :src="user.detail.profile.avatarUrl" alt="">
              </nuxt-link>
            </vs-avatar>

            <vs-tooltip>
              <vs-button
                icon
                warn
                gradient
                @click="logout"
              >
                <i class="bx bx-log-out-circle" />
              </vs-button>
              <template #tooltip>
                退出登录
              </template>
            </vs-tooltip>
          </template>
          <vs-tooltip v-else>
            <vs-button
              gradient
              warn
              floating
              size="large"
              @click="toggleLoginDialog(true)"
            >
              <i class="bx bx-log-in" />&nbsp;Login
            </vs-button>
            <template #tooltip>
              登录网易云音乐
            </template>
          </vs-tooltip>
        </vs-row>
      </template>
    </vs-sidebar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    active: 'discover',
    keywords: '',
    items: [
      {
        id: 'discover',
        icon: 'bx bx-music',
        name: '发现音乐',
        route: '/'
      }, {
        id: 'video',
        icon: 'bx bx-video',
        name: '视频',
        route: '/video'
      }, {
        id: 'fm',
        icon: 'bx bx-radio',
        name: '私人FM',
        route: '/fm'
      }
    ],

    my: [
      {
        id: 'cloud',
        icon: 'bx bx-cloud',
        name: '音乐云盘',
        route: '/cloud'
      }, {
        id: 'friend',
        icon: 'bx bx-group',
        name: '朋友',
        route: '/friend'
      }, {
        id: 'collections',
        icon: 'bx bx-collection',
        name: '收藏',
        route: '/collection'
      }, {
        id: 'radio',
        icon: 'bx bx-station',
        name: '电台',
        route: '/radio'
      }
    ]
  }),

  computed: {
    ...mapGetters('auth', ['isAuth', 'user']),
    createdPlaylist () {
      const createdPlaylist = this.user.playlist.playlist.slice(0, this.user.subcount.createdPlaylistCount)
      const likedPlaylist = createdPlaylist[0]
      return [
        {
          id: String(likedPlaylist.id),
          icon: 'bx bx-heart',
          name: '我喜欢的音乐',
          route: `/playlist/${likedPlaylist.id}`
        },
        ...createdPlaylist.slice(1).map(item => ({
          id: String(item.id),
          icon: 'bx bxs-playlist',
          name: item.name,
          route: `/playlist/${item.id}`
        }))
      ]
    },
    collectedPlaylist () {
      return this.user.playlist.playlist.slice(this.user.subcount.createdPlaylistCount).map(item => ({
        id: String(item.id),
        icon: 'bx bxs-playlist',
        name: item.name,
        route: `/playlist/${item.id}`
      }))
    }
  },

  methods: {
    ...mapActions('auth', ['toggleLoginDialog', 'setUser']),
    async search () { // 搜索歌曲
      // TODO
    },
    logout () {
      localStorage.removeItem('user')
      this.setUser(null)
      this.$api.logout()
      this.$router.push('/')
    }
  }
}
</script>

<style lang="sass" scoped>
  .siderbar
    position: fixed
</style>
