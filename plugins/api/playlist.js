/**
 * 封装与歌单有关的api
 */

export default request => ({

  /**
   * 获取歌单详情
   *
   * @param {String} params.id 歌单id
   * @param {Number} params.s 歌单最近的 s 个收藏者,默认为8
   */
  async getPlaylistDetail (params) {
    return await request.get('playlist/detail', params)
  }
})
