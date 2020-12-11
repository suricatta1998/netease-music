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
   */
  async getCities () {
    return await request.get('https://unpkg.com/province-city-china@7.0.0/dist/city.json')
  }

})
