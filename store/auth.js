export const state = () => ({
  dialog: false,
  user: null
})

export const mutations = {
  TOGGLE_DIALOG (state, status) {
    state.dialog = status
  },

  SET_USER (state, data) {
    state.user = data
  }
}

export const getters = {
  isAuth (state) {
    return state.user !== null
  },

  user (state) {
    return state.user
  }
}

export const actions = {
  toggleLoginDialog ({ commit }, status) {
    commit('TOGGLE_DIALOG', status)
  },

  setUser ({ commit }, data) {
    commit('SET_USER', data)
  }
}
