/**
 * 封装与歌曲相关的api
 */

export default request => ({

  /**
   * 获得歌曲详情
   *
   * @param {Array} params.ids 音乐id
   */
  async getSongDetail (params) {
    params.ids = params.ids.join(',')
    return await request.get('song/detail', params)
  }
})
