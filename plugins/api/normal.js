/**
 * 封装一些普遍会使用的api
 */

export default request => ({
  /**
   * 获取轮播图数据
   */
  async getBanners () {
    return await request.get('banner')
  }
})
