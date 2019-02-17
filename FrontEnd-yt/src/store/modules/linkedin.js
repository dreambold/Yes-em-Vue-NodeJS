import axios from 'axios'
import { linkedin } from '../plugins/localStorage'

const state = {
  token: linkedin
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
  async authorize ({ commit }, val, isFinal) {
    const endpoint = '/api/user/linkedin/state'

    const { data } = await axios.post(endpoint, { data: val })

    if (data.state) {
      window.location = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77a6bd5zeu6cl0&redirect_uri=http%3A%2F%2Fyesthem.com%2Fauth%2Flinkedin%2Fsuccess&state=' + data.state + '&scope=r_liteprofile'
      // window.location = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77a6bd5zeu6cl0&redirect_uri=https%3A%2F%2Fwww.yesthem.com%2Fauth%2Flinkedin%2Fsuccess&state=' + data.state + '&scope=r_basicprofile'
      /*if (isFinal) {
        localStorage.setItem("isfinal", 1);     
      } else {
        localStorage.setItem("isfinal", 0);     
      }*/
      
    } else {
      return ({ success: false, message: data.message })
    }
  },

  async getOauth ({ commit }, val) {
    try {
      const isCorrectState = await axios.post('/api/user/linkedin/token/verify', { state : val.state }) // I check if the state is the same one I created before.

      if (isCorrectState.data.success === true) {
        const { data } = await axios.post('/api/user/linkedin/oAuth', { code: val.code }) // Now I send the code to get the oAuth access token
        console.log('oauth', data)
        if (data.accessToken) {
          commit('setToken', data.accessToken)
          return ({ success: true, identifier: isCorrectState.data.identifier, service: isCorrectState.data.service })
        } else {
          return ({ success: false, message: data.message })
        }
      } else {
        return ({ success: false, message: 'Acceso no autorizad' })
      }
    } catch (error) {
      console.log(error)
      return ({ success: false, message: 'Acceso no autorizad' })
    }
  },

  async getLinkedinUser ({ commit, getters }) {
    console.log('getters[getToken]', getters['getToken'])
    const { data } = await axios.post('/api/user/linkedin/getUser', { accessToken: getters['getToken'] })
    console.log(data.user)
    if (data.user) {
      return ({ success: true, user: data.user })
    } else {
      return ({ success: false, message: data.message })
    }
  },

  logout ({ commit }) {
    commit('resetToken')
    return ({success: true})
  }
}

const getPayload = ({ token }) => {
  const payload = token.split('.')[1]
  return JSON.parse(atob(payload))
}

const getters = {
  getToken (state) {
    if (!state.token) return false
    else return getPayload(state).accessToken
  },
  isAuthorized (state) {
    if (!state.token) return false
    let payload = getPayload(state)
    return (Date.now() + payload.exp) > (Date.now() / 1000)
  },
  currentUser (state) {
    if (!state.token) return {}
    const { _id, email, identifier, verified } = getPayload(state)
    return { _id, email, identifier, verified }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
