import Vue from 'vue'
import axios from 'axios'
import _ from 'lodash'

const state = {
  data: null,
  accordionOpen: false,
  accordionIndex: 0,
  status: {
    loading: false,
    silent: false,
    error: false,
    message: ''
  }
}

const mutations = {
  setData (state, data) {
    data.solutions = data.solutions === null ? [] : data.solutions
    Vue.set(state, 'data', data)
    return {success: true}
  },

  setStatus (state, status) {
    Vue.set(state, 'status', status)
  },

  clear (state) {
    state.data = null
    return {success: true}
  },

  accordionOpen(state, data) {
    console.log(data)
    Vue.set(state, 'accordionOpen', data)
  },

  setAccordionIndex(state, data) {
    console.log(data)
    Vue.set(state, 'accordionIndex', data)
  }
}

const actions = {

  setModal({state, commit}, {status, index}) {
    console.log(info)
    commit('accordionOpen', status);
    commit('accordionIndex', index);

  },

  setStatus ({commit}, status) {
    commit('setStatus', { loading: status.loading, error: status.error, message: status.message })
    return { success: true }
  },

  async populate ({commit, rootGetters}, info) {
    let identifier = ''
    let silent = false
    if (typeof info === 'object') {
      silent = info.silent
      identifier = info.identifier
    } else {
      silent = false
      identifier = info
    }
    if (silent === false) {
      commit('setStatus', { loading: true, error: false, message: '' })
    }
    const endpoint = '/api/company/' + identifier
    const headers = { 'Authorization': 'Bearer ' + rootGetters['auth/getToken'] }

    try {
      const { data } = await axios.get(endpoint, { headers: headers })
      // await commit('clear')
      data.company.solutions.forEach(solution => {solution.validationsQuantity = 0; solution.surveys.forEach(survey => {survey.solutionId = solution._id; survey.options.forEach(option => option.validationsCount = [])})})
      await commit('setData', data.company)
      console.log('data', data.company)
      if (silent === false) {
        commit('setStatus', { loading: false, error: false, message: 'Success' })
      }
      return { success: true }
    } catch (error) {
      let message = ''
      if (error.response) {
        message = error.response.data.message
      } else if (error.request) {
        message = 'No response received from the server. If the problem persists contact the site administrator (' + error.message + ')'
      } else {
        message = error.message
      }
      if (silent === false) {
        commit('setStatus', { loading: false, error: true, message: message })
      }
      return { success: false }
    }
  },

  async edit ({commit, rootGetters}, form) {
    // console.log(form)
    commit('setStatus', { loading: true, error: false, message: '' })
    const endpoint = form.get('editing') === 'solutions' ? '/api/solution/register' : '/api/company/edit/' + form.get('editing')
    const headers = { 'Authorization': 'Bearer ' + rootGetters['auth/getToken'] }
    // console.log(endpoint)
    // console.log(headers)
    try {
      const response = await axios.post(endpoint, form, { headers: headers })
      console.log(response)
      commit('setStatus', { loading: false, error: false, message: 'Success' })
      // console.log('success')
      return { success: true, solution: response.data.solution}
    } catch (error) {
      console.log('error', error)
      let message = ''
      if (error.response) {
        message = error.response.data.message
      } else if (error.request) {
        message = 'No response received from the server. If the problem persists contact the site administrator (' + error.message + ')'
      } else {
        message = error.message
      }
      commit('setStatus', { loading: false, error: true, message: message })
      return { success: false }
    }
  },

  async addSurvey(x, solution) {
    const endpoint ='/api/solution/addSurvey';
    try {
      await axios.post(endpoint, solution)
      return { success: true }
    } catch (e) {
      console.log(e)
      return { success: false }
    }
  },

  async editSurvey(x, solution) {
    const endpoint ='/api/solution/editSurvey';
    try {
      const response = await axios.post(endpoint, solution)
      console.log(response)
      return { success: true, response }
    } catch (e) {
      console.log(e)
      return { success: false, e }
    }
  },

  async removeSurvey(x, description) {
    console.log('removing', description)
    const endpoint ='/api/solution/remove/survey';
    try {
      await axios.post(endpoint, description)
      return { success: true }
    } catch (e) {
      console.log(e)
      return { success: false }
    }
  },

  async remove ({commit, rootGetters}, solution) {
    commit('setStatus', { loading: true, error: false, message: '' })
    const endpoint = '/api/solution/remove'
    const headers = { 'Authorization': 'Bearer ' + rootGetters['auth/getToken'] }

    try {
      await axios.post(endpoint, solution, { headers: headers })
      commit('setStatus', { loading: false, error: false, message: 'Success' })
      return { success: true }
    } catch (error) {
      let message = ''
      if (error.response) {
        message = error.response.data.message
      } else if (error.request) {
        message = 'No response received from the server. If the problem persists contact the site administrator (' + error.message + ')'
      } else {
        message = error.message
      }
      commit('setStatus', { loading: false, error: true, message: message })
      return { success: false }
    }
  },

  async thanks ({commit, rootGetters}, thanks) {
    commit('setStatus', { loading: true, error: false, message: '' })
    const endpoint = '/api/company/thanks'
    const headers = { 'Authorization': 'Bearer ' + rootGetters['auth/getToken'] }

    try {
      await axios.post(endpoint, thanks, { headers: headers })
      commit('setStatus', { loading: false, error: false, message: 'Success' })
      return { success: true }
    } catch (error) {
      let message = ''
      if (error.response) {
        message = error.response.data.message
      } else if (error.request) {
        message = 'No response received from the server. If the problem persists contact the site administrator (' + error.message + ')'
      } else {
        message = error.message
      }
      commit('setStatus', { loading: false, error: true, message: message })
      return { success: false }
    }
  },

  async publish ({commit, getters, rootGetters}) {
    commit('setStatus', { loading: true, error: false, message: '' })
    const endpoint = '/api/company/publish'
    const headers = { 'Authorization': 'Bearer ' + rootGetters['auth/getToken'] }

    try {
      await axios.post(endpoint, { company: getters['getCompanyData']._id }, { headers: headers })
      commit('setStatus', { loading: false, error: false, message: 'Success' })
      return { success: true }
    } catch (error) {
      let message = ''
      if (error.response) {
        message = error.response.data.message
      } else if (error.request) {
        message = 'No response received from the server. If the problem persists contact the site administrator (' + error.message + ')'
      } else {
        message = error.message
      }
      commit('setStatus', { loading: false, error: true, message: message })
      return { success: false }
    }
  },

  async validate ({commit, getters, rootGetters}, vData) { // Validates benefits from linkedin verified users
    // commit('setStatus', { loading: true, error: false, message: '' }) // This is dirty
    const endpoint = '/api/solution/benefits/validate'
    const headers = { 'Authorization': 'Bearer ' + rootGetters['auth/getToken'] }
    try {
      if (typeof(vData.loggedIn) !== 'undefined') { // user was logged in with linkedin and user.data is being used
        await axios.post(endpoint, { loggedIn: vData.loggedIn, linkedin: vData.linkedin, solutionId: vData.solutionId, benefits: vData.benefits }, { headers: headers })  
      } else { // user was not logged in with linkedin and formData is being used
        await axios.post(endpoint, vData, { headers: headers })
      }
      // commit('setStatus', { loading: false, error: false, message: 'Success' }) // This is dirty
      return { success: true }
    } catch (error) {
      console.log(error)
      let message = ''
      if (error.response) {
        message = error.response.data.message
      } else if (error.request) {
        message = 'No response received from the server. If the problem persists contact the site administrator (' + error.message + ')'
      } else {
        message = error.message
      }
      // commit('setStatus', { loading: false, error: true, message: message }) // This is dirty
      return { success: false }
    }
  },

  clear ({ commit }) {
    commit('clear')
    return {success: true}
  }
}

const getters = {
  getAccordionOpen(state) {
    return {state: state.accordionOpen, id: state.accordionIndex}
  },
  
  getCompanyData (state) {
    // state.data.solutions.forEach(solution => {
    //   let splitted = solution.category.split(' ');
    //   if (splitted.length > 1) {
    //       solution.category = (splitted.map(word => word.charAt(0).toUpperCase() + (word.slice(1)).toLowerCase())).join(' ');
    //   } else {
    //       solution.category = splitted[0].charAt(0).toUpperCase() + (splitted[0].slice(1)).toLowerCase();
    //   }                
    // })    
    return state.data
  },

  getStatus (state) {
    return state.status
  },

  getSolutions (state) {
    if (state.data) {
      state.data.solutions.forEach(solution => {
        solution.benefits.sort((a, b) => a.validations ? a.validations.length-b.validations.length : console.log(a)).reverse();
      });
      // let solutions = state.data.solutions.map(solution => {
      //   solution.benefits.forEach(benefit => {
      //     benefit.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      //   })
      // })
      return state.data.solutions
    } else {
      return []
    }
  },

  getBenefits (state) {
    if (state.data) {
      let benefits = []
      for (let i = 0, len = state.data.solutions.length; i < len; i++) {
        benefits = benefits.concat(state.data.solutions[i].benefits)
      }
      return benefits
    } else {
      return []
    }
  },

  getExperiences (state) {
    if (!state.status.loading) {
      if (state.data) {
        let experiences = []
        for (let i = 0, len = state.data.solutions.length; i < len; i++) {
          if (state.data.solutions[i].benefits.some(benefit => benefit.validations.length > 0)) {
            experiences.push(state.data.solutions[i].subIndustry)
          }
        }
        return experiences
      } else {
        return []
      }
    } else {
      return []
    }
  },

  getCategories (state) {
    if (state.data) {
      let categories = []
      // let _categories = [];
      for (let i = 0, len = state.data.solutions.length; i < len; i++) {
        if ( !_.find(categories, function (o) { return state.data.solutions[i].category === 'Otra' ? state.data.solutions[i].customCategory === o : o === state.data.solutions[i].category })){
          if (state.data.solutions[i].category === 'Otra') {
            categories.push(state.data.solutions[i].customCategory)
          } else {
            //categories.push(state.data.solutions[i].category)
            categories.push(state.data.solutions[i].category)
          }
        }
      }
      // _categories = ['Inicio', ...categories];
      return categories
      // return _categories
    } else {
      return []
    }
  },

  getCategoriesAndLogo (state) {
    if (state.data) {
      let categories = [];
      // let _categories = [];
      for (let i = 0, len = state.data.solutions.length; i < len; i++) {
        if ( !_.find(categories, function (o) { return state.data.solutions[i].category === 'Otra' ? state.data.solutions[i].customCategory === o : o === state.data.solutions[i].category })){
          if (state.data.solutions[i].category === 'Otra') {
            categories.push({category: state.data.solutions[i].customCategory, image: state.data.solutions[i].image})
          } else {
            categories.push({category: state.data.solutions[i].category, image: state.data.solutions[i].image})
          }
        }
      }
      // _categories = [{ category: 'Inicio', image: state.data.logo }, ...categories];
      // return _categories
      return categories
    } else {
      return []
    }
  },

  getTotalValidations (state) {
    // let validations = 0
    // for (let i = 0, len = state.data.solutions.length; i < len; i++) {
    //   for (let j = 0, len = state.data.solutions[i].benefits.length; j < len; j++) {
    //     validations = validations + state.data.solutions[i].benefits[j].validations.length
    //   }
    // }

    // let results = []
    // for (let x = 0, len = state.data.solutions.length; x < len; x++) {
    //   for (let i = 0, len = state.data.solutions[x].benefits.length; i < len; i++) {
    //     if (state.data.solutions[x].benefits[i].validations.length > 0) {
    //       if (!results.some(result => result === x)) {
    //         results.push(x)
    //       }
    //     }
    //   }
    // }

    // let results = []
    // let count = 0

    // for (let x = 0, len = state.data.solutions.length; x < len; x++) {
    //   let results = []
    //   for (let i = 0, len = state.data.solutions[x].benefits.length; i < len; i++) {
    //     for (let j = 0, len = state.data.solutions[x].benefits[i].validations.length; j < len; j++) {
    //       //if (!results.some(result => result === state.data.solutions[x].benefits[i].validations[j].id)) {
    //         results.push(state.data.solutions[x].benefits[i].validations[j].id)
    //       //}
    //     }
    //   }
    //   count += results.length
    // }

    let validations = 0
    state.data.solutions.surveys.forEach(survey => {
      if(survey.active) {
        survey.options.forEach(option => {
          if(option.active) {
            validations = option.validations.length;                
          }
        });
        survey.extraOptions(({active}) => active ? validations + 1 : false)
      }
    });
    return validations
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
