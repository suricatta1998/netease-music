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
  }

})
