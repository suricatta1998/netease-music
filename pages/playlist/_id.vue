<template>
  <vs-row>
    <vs-col w="4" type="flex" justify="flex-end">
      <vs-avatar size="280" square>
        <img :src="playlist.coverImgUrl" alt="">
      </vs-avatar>
    </vs-col>
    <vs-col w="8" class="detail">
      <span class="name">{{ playlist.name }}</span>
      <vs-row align="center" class="creator">
        <vs-col w="1" type="flex" justify="center">
          <vs-avatar size="30" circle>
            <img :src="creator.avatarUrl" alt="">
          </vs-avatar>
        </vs-col>
        <vs-col w="3">
          <a href="#">{{ creator.nickname }}</a>
        </vs-col>
        <vs-col w="6">
          <span>{{ playlist.createTime | formatDate }}</span>&nbsp;创建
        </vs-col>
      </vs-row>
      <vs-row align="center">
        <vs-button-group>
          <vs-button icon color="#8E44AD">
            <i class="bx bx-play" />
            播放全部
          </vs-button>
          <vs-button icon color="#8E44AD">
            <i class="bx bx-plus" />
          </vs-button>
        </vs-button-group>
        <vs-button icon size="large" color="#34495E">
          <i class="bx bxs-collection" />
          收藏&nbsp;({{ playlist.subscribedCount | formatNumber }})
        </vs-button>
        <vs-button icon size="large" color="#34495E">
          <i class="bx bxs-share-alt" />
          分享&nbsp;({{ playlist.shareCount | formatNumber }})
        </vs-button>
        <vs-button icon size="large" color="#34495E">
          <i class="bx bxs-download" />
          下载全部
        </vs-button>
      </vs-row>
      <div>
        <p>标签：{{ playlist.tags | formatNames }}</p>
        <p>歌曲：{{ playlist.trackCount }}&nbsp;&nbsp;播放：{{ playlist.playCount | formatNumber }}</p>
        <span>
          简介：
          <details v-if="playlist.description.indexOf('\n') !== -1">
            <summary>
              {{ description.summary }}
            </summary>
            <span class="desc-wrapper">
              {{ description.detail }}
            </span>
          </details>
          <span v-else class="desc-wrapper">
            {{ playlist.description }}
          </span>
        </span>
      </div>
    </vs-col>

    <vs-row justify="center">
      <vs-navbar v-model="active">
        <vs-navbar-item id="songs" :active="active == 'songs'">
          歌曲列表
        </vs-navbar-item>
        <vs-navbar-item id="comments" :active="active == 'comments'">
          评论({{ playlist.commentCount }})
        </vs-navbar-item>
        <vs-navbar-item id="subscribers" :active="active == 'subscribers'">
          收藏者
        </vs-navbar-item>
      </vs-navbar>
      <vs-col type="flex" justify="center" class="nav-content">
        <song-list v-show="active === 'songs'" :songs="songs" />

        <vs-row v-show="active === 'comments'" justify="center">
          <div v-if="hotComments.length !== 0">
            <h3>精彩评论</h3>
            <comment-list :comments="hotComments" />
          </div>
          <vs-col w="12">
            <h3 ref="newCommentsTitle">
              最新评论 ({{ total }})
            </h3>
            <comment-list :comments="comments" />
          </vs-col>
          <vs-pagination v-if="total > limit" v-model="page" :length="Math.ceil(total / limit)" />
        </vs-row>

        <vs-row v-show="active === 'subscribers'" justify="center">
          <subscriber-list :subscribers="subscribers" style="margin-bottom: 15px" />
          <vs-pagination v-if="subscriberTotal > limit" v-model="subscriberPage" :length="Math.ceil(subscriberTotal / limit)" />
        </vs-row>
      </vs-col>
    </vs-row>
  </vs-row>
</template>

<script>
export default {
  async asyncData ({ $api, params }) {
    const id = params.id
    const { playlist } = await $api.getPlaylistDetail({ id })
    const { songs } = await $api.getSongDetail({
      ids: playlist.trackIds.map(track => track.id)
    })

    const limit = 40
    const { comments, total, hotComments } = await $api.getPlaylistComment({ id, limit })
    const subscriberData = await $api.getPlaylistSubscribers({ id, limit })
    const subscriberTotal = subscriberData.total
    const { subscribers } = subscriberData

    return {
      playlist,
      songs,
      comments,
      hotComments,
      total: total - hotComments.length,
      subscribers,
      subscriberTotal,
      limit
    }
  },
  data: () => ({
    active: 'songs',
    page: 1,
    subscriberPage: 1
  }),
  computed: {
    creator () {
      return this.playlist.creator
    },
    description () {
      const summary = this.playlist.description.split('\n')[0]
      const detail = this.playlist.description.split(summary)[1]
      return {
        summary,
        detail
      }
    },
    offset () {
      return (this.page - 1) * this.limit
    },
    subscriberOffset () {
      return (this.subscriberPage - 1) * this.limit
    }
  },
  watch: {
    async page () {
      const loading = this.$vs.loading({
        type: 'scale'
      })
      const { comments } = await this.$api.getPlaylistComment({
        id: this.playlist.id,
        limit: this.limit,
        offset: this.offset
      })
      this.comments = comments
      loading.close()
      this.$refs.newCommentsTitle.scrollIntoView()
    },
    async subscriberPage () {
      const loading = this.$vs.loading({
        type: 'scale'
      })
      const { subscribers, total } = await this.$api.getPlaylistSubscribers({
        id: this.playlist.id,
        limit: this.limit,
        offset: this.subscriberOffset
      })
      this.subscribers = subscribers
      this.subscriberTotal = total
      loading.close()
    }
  }
}
</script>

<style lang="sass" scoped>
.detail
  padding-left: 10px

.name
  display: block
  font-size: 30px
  font-weight: bold
  margin-bottom: 10px

.creator
  margin-bottom: 10px

.desc-wrapper
  white-space: pre-wrap

.nav-content
  margin-top: 50px
  width: 90%

</style>
