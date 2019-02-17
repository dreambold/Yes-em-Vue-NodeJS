import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import company from './modules/company'
import linkedin from './modules/linkedin'
import localStoragePlugin from './plugins/localStorage'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { auth, company, linkedin },
  plugins: [localStoragePlugin]
})
