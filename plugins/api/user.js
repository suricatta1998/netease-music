/**
 * 封装与用户相关的api
 */

export default request => ({
  /**
   * 手机登录
   *
   * @param {String} data.phone 手机号
   * @param {String} data.password 密码
   */
  async loginByPhone (data) {
    return await request.post('login/cellphone', data)
  },

  /**
   * 163邮箱登录
   *
   * @param {String} data.email 163邮箱
   * @param {String} data.password 密码
   */
  async loginByEmail (data) {
    return await request.get('login', data)
  },

  /**
   * 登录
   *
   * @param {String} data.loginType 登录类型
   * @param {String} data.account   登录账号
   * @param {String} data.password  登录密码
   */
  async login (data) {
    const { loginType, account, password } = data
    if (loginType === 'phone') {
      return await this.loginByPhone({ phone: account, password: encodeURIComponent(password) })
    } else {
      return await this.loginByEmail({ email: account, password: encodeURIComponent(password) })
    }
  },

  /**
   * 登出
   *
   */
  async logout () {
    return await request.get('logout')
  },

  /**
   * 获取用户账号信息
   *
   */
  async getUserAccount () {
    return await request.get('user/account')
  },

  /**
   * 获取用户详情
   *
   * @param {String} params.uid 用户id
   */
  async getUserDetail (params) {
    return await request.get('user/detail', params)
  },

  /**
   * 获取用户信息 , 歌单，收藏，mv, dj 数量
   *
   */
  async getUserSubcount () {
    return await request.get('user/subcount')
  },

  /**
   * 获取用户等级信息
   *
   */
  async getUserLevel () {
    return await request.get('user/level')
  },
  /**
   * 获取用户歌单
   *
   * @param {String} params.uid 用户id
   */
  async getUserPlaylist (params) {
    return await request.get('user/playlist', params)
  }
})
