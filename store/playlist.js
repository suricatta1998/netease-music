import _ from 'lodash'

export const state = () => ({
  playlist: [],
  currentIndex: 0,
  currentTime: 0,
  isPaused: true
})

export const mutations = {
  SET_PLAYLIST (state, playlist) {
    state.playlist = playlist
  },

  ADD_SONGS (state, songs) {
    state.playlist.splice(state.currentIndex + 1, 0, ...songs)
    // 去重
    state.playlist = _.uniq(state.playlist)
  },

  SET_INDEX (state, idx) {
    state.currentIndex = idx
  },

  SET_TIME (state, time) {
    state.currentTime = time
  },

  CHANGE_PAUSED (state, status) {
    state.isPaused = status
  }
}

export const getters = {
  playlist (state) {
    return state.playlist
  },

  currentPlaying (state) {
    return state.playlist[state.currentIndex]
  },

  currentTime (state) {
    return state.currentTime
  },

  isPaused (state) {
    return state.isPaused
  },

  currentIndex (state) {
    return state.currentIndex
  }
}

export const actions = {
  setPlaylist ({ commit }, playlist) {
    commit('SET_PLAYLIST', playlist)
  },

  addSongs ({ commit }, data) {
    const songs = Array.isArray(data) ? data : [data]
    commit('ADD_SONGS', songs)
  },

  setCurrentIndex ({ commit }, idx) {
    commit('SET_INDEX', idx)
  },

  setCurrentTime ({ commit }, time) {
    commit('SET_TIME', time)
  },

  changePaused ({ commit }, status) {
    commit('CHANGE_PAUSED', status)
  }
}
