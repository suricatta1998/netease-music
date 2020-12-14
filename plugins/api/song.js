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
  },

  /**
   * 获取对应的音乐的 url
   *
   * @param {String} params.id 音乐id
   * @param {Number} params.br 码率，默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
   */
  async getSongUrl (params) {
    return await request.get('song/url', params)
  },

  /**
   * 获取音乐是否可用,返回 { success: true, message: 'ok' } 或者 { success: false, message: '亲爱的,暂无版权' }
   *
   * @param {String} params.id 音乐id
   */
  async checkSong (params) {
    return await request.get('check/music', params)
  },

  /**
   * 获取歌词
   *
   * @param {String} id 音乐id
   */
  async getLyric (id) {
    return await request.get('lyric', { id })
  },

  /**
   * 获得歌单的所有评论
   *
   * @param {String} params.id 歌单id
   * @param {Number} params.limit 取出评论数量, 默认为 20
   * @param {Number} params.offset 偏移数量, 用于分页
   * @param {String} params.before 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
   */
  async getSongComment (params) {
    return await request.get('comment/music', params)
  },

  /**
   * 获取歌词
   *
   * @param {String} id 音乐id
   */
  async getSimiSongs (id) {
    return await request.get('simi/song', { id })
  }
})
