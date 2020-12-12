<template>
  <div class="subscriber-container">
    <vs-card v-for="item in subscribers" :key="item.id" type="1">
      <template #title>
        <h3>
          <nuxt-link to="#" class="nickname">
            {{ item.nickname }}
          </nuxt-link>
        </h3>
      </template>
      <template #text>
        <p>{{ item.signature }}</p>
      </template>
      <template #img>
        <img :src="item.avatarUrl" alt="">
      </template>
    </vs-card>
  </div>
</template>

<script>
export default {
  props: {
    subscribers: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="sass" scoped>
.subscriber-container
  display: grid
  width: 100%
  grid-template-columns: repeat(auto-fill, 23%)
  grid-row-gap: 20px
  grid-column-gap: 20px
  justify-content: center

.nickname
  text-decoration: none
  color: #212F3C
  &:hover
    color: #95A5A6
</style>
