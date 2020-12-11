/**
 * 封装与操作有关的api
 */

export default request => ({
  /**
   * 搜索
   *
   * @param {String} params.keywords
   * @param {Number} params.limit  返回数量，默认为30
   * @param {Number} params.offset 偏移数量，默认为0
   * @param {Number} params.type   搜索类型，默认为1
   *        取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频，1018:综合
   */
  async search (params) {
    return await request.get('search', params)
  }
})
