<template>
  <div>
    <template v-for="comment in comments">
      <vs-row :key="comment.id" class="item">
        <vs-col w="2" type="flex" justify="center">
          <vs-avatar circle size="60">
            <img :src="comment.user.avatarUrl" alt="">
          </vs-avatar>
        </vs-col>
        <vs-col w="10">
          <vs-col w="12">
            <nuxt-link to="#" class="nickname">
              {{ comment.user.nickname }}:
            </nuxt-link>
            <span class="content">{{ comment.content }}</span>
          </vs-col>
          <vs-col v-if="comment.beReplied.length !== 0" w="12">
            <vs-alert color="#707B7C" style="margin-top: 10px">
              <nuxt-link to="#" class="nickname">
                @{{ comment.beReplied[0].user.nickname }}：
              </nuxt-link>
              <span class="content">
                {{ comment.beReplied[0].content }}
              </span>
            </vs-alert>
          </vs-col>
          <vs-row justify="space-between" align="flex-end">
            <vs-col w="4">
              <span class="time">{{ comment.time | formatDate }}</span>
            </vs-col>
            <vs-col w="4" type="flex" justify="flex-end">
              <vs-button-group>
                <vs-button icon color="#D4AC0D">
                  <i :class="['bx', comment.liked ? 'bxs-like' : 'bx-like']" />
                  {{ comment.likedCount }}
                </vs-button>
                <vs-button icon color="#D4AC0D">
                  <i class="bx bx-share-alt" />
                </vs-button>
                <vs-button icon color="#D4AC0D">
                  <i class="bx bx-comment-detail" />
                </vs-button>
              </vs-button-group>
            </vs-col>
          </vs-row>
        </vs-col>
        <div class="divider" />
      </vs-row>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="sass" scoped>
.item
  padding: 10px

  .divider
    margin-top: 15px
    width: 95%
    border-bottom: 1px solid #eee

.nickname
  text-decoration: none

.content
  font-size: 14px

.time
  font-size: 13px
  color: #616A6B
</style>
