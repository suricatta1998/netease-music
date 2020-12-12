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
  },

  /**
   * 获得歌单的所有评论
   *
   * @param {String} params.id 歌单id
   * @param {Number} params.limit 取出评论数量, 默认为 20
   * @param {Number} params.offset 偏移数量, 用于分页
   * @param {String} params.before 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
   */
  async getPlaylistComment (params) {
    return await request.get('comment/playlist', params)
  },

  /**
   * 获得歌单的所有评论
   *
   * @param {String} params.id 歌单id
   * @param {Number} params.type 资源类型，0:歌曲, 1:mv, 2:歌单, 3:专辑, 4:电台, 5:视频
   * @param {Number} params.limit 取出评论数量, 默认为 20
   * @param {Number} params.offset 偏移数量, 用于分页
   * @param {String} params.before 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
   */
  async getPlaylistHotComment (params) {
    return await request.get('comment/hot', params)
  },

  /**
   * 获取歌单的所有收藏者
   *
   * @param {String} params.id 歌单id
   * @param {Number} params.limit 取出评论数量, 默认为 20
   * @param {Number} params.offset 偏移数量, 用于分页
   */
  async getPlaylistSubscribers (params) {
    return await request.get('playlist/subscribers', params)
  }
})
