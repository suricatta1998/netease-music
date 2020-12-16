/**
 * 封装一些普遍会使用的api
 */

export default request => ({
  /**
   * 获取轮播图数据
   */
  async getBanners () {
    return await request.get('banner')
  },

  /**
   * 获取省份代码
   *
   */
  async getProvinces () {
    return await request.get('https://unpkg.com/province-city-china@7.0.0/dist/province.json')
  },

  /**
   * 获取城市
   *
   */
  async getCities () {
    return await request.get('https://unpkg.com/province-city-china@7.0.0/dist/city.json')
  },

  /**
   * 获取推荐歌单
   *
   * @param {Number} params.limit 数量
   *
   */
  async getPersonalized (params) {
    return await request.get('personalized', params)
  },

  /**
   * 获取独家放送入口列表
   *
   */
  async getPrivateContent (params) {
    return await request.get('personalized/privatecontent', params)
  },

  /**
   * 获取推荐 mv
   *
   */
  async getPersonalizedMV () {
    return await request.get('personalized/mv')
  },

  /**
   * 获取推荐新音乐
   *
   * @param {Number} params.limit 数量
   */
  async getPersonalizedNewSong (params) {
    return await request.get('personalized/newsong', params)
  },

  /**
   * 获得热门评论
   *
   * @param {String} params.id 歌单id
   * @param {Number} params.type 资源类型，0:歌曲, 1:mv, 2:歌单, 3:专辑, 4:电台, 5:视频
   * @param {Number} params.limit 取出评论数量, 默认为 20
   * @param {Number} params.offset 偏移数量, 用于分页
   * @param {String} params.before 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
   */
  async getHotComment (params) {
    return await request.get('comment/hot', params)
  },

  /**
   * 搜索传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开
   *
   * @param {String} params.keywords 关键词
   * @param {Number} params.limit 返回数量
   * @param {Number} params.offset 偏移量
   * @param {Number} params.type 搜索类型
   *        取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
   */
  async search (params) {
    return await request.get('cloudsearch', params)
  }

})
