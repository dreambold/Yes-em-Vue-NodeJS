import axios from 'axios'
import { init } from '../plugins/localStorage'

const state = {
  token: init
}

const mutations = {
  setToken (state, token) {
    state.token = token
  },
  resetToken (state) {
    state.token = ''
  }
}

const actions = {
  async login ({ commit }, user) {
    const endpoint = '/api/user/login'
    const { data } = await axios.post(endpoint, user)
    if (data.token) {
      commit('setToken', data.token)
      return ({ success: true })
    } else {
      return ({ success: false, message: data.message })
    }
  },

  async register ({ commit }, user) {
    const endpoint = '/api/user/register'
    const { data } = await axios.post(endpoint, user)
    if (data.token) {
      commit('setToken', data.token)
      return ({ success: true })
    } else {
      return ({ success: false, message: data.message })
    }
  },

  async reload ({ commit, getters }, user) {
    const endpoint = '/api/user/reload'
    const { data } = await axios.post(endpoint, { _id: getters['currentUser']._id })
    if (data.token) {
      commit('setToken', data.token)
      return ({ success: true })
    } else {
      return ({ success: false, message: data.message })
    }
  },

  async verify ({ commit }, { user, linkedin }) {
    const endpoint = '/api/user/verify'
    const { data } = await axios.post(endpoint, { user: user, linkedin: linkedin }, { headers: { 'Authorization': 'Bearer ' + state.token } })
    if (data.token) {
      commit('setToken', data.token)
      return ({ success: true })
    } else {
      return ({ success: false, message: data.message })
    }
  },

  async resetPassword ({commit}, email) {
    const endpoint = '/api/user/password/reset'
    try {
      const { data } = await axios.post(endpoint, {email: email})
      return {success: true, message: data.message}
    }catch(error){
      let message = ''
      if (error.response) {
        message = error.response.data.message
      } else if (error.request) {
        message = "No response received from the server. If the problem persists contact the site administrator ("+error.message+")"
      } else {
        message = error.message
      }
      return {success: false, message: message}
    }
  },

  async changePassword ({commit, getters}, items) {
    const endpoint = '/api/user/password/change'
    try {
      const { data } = await axios.post(endpoint, {items: items})
      return {success: true}
    }catch(error){
      let message = ''
      if (error.response) {
        message = error.response.data.message
      } else if (error.request) {
        message = "No response received from the server. If the problem persists contact the site administrator ("+error.message+")"
      } else {
        message = error.message
      }
      return {success: false, message: message}
    }
  },

  logout ({ commit }) {
    commit('resetToken')
  }
}

const getPayload = ({ token }) => {
  const payload = token.split('.')[1]
  return JSON.parse(atob(payload))
}

const getters = {
  getToken (state) {
    if (!state.token) return false
    else return state.token
  },
  isLoggedIn (state) {
    if (!state.token) return false
    let payload = getPayload(state)
    return payload.exp > (Date.now() / 1000)
  },
  currentUser (state) {
    if (!state.token) return {}
    const { _id, email, identifier, verified } = getPayload(state)
    return { _id, email, identifier, verified }
  },
  isAdmin (state) {
    if (!state.token) return false
    let payload = getPayload(state)
    return payload.role === 'admin'
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
