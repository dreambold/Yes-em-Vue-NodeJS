import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueAnalytics from 'vue-analytics'
// import VueCarousel from 'vue-carousel';
import GSignInButton from 'vue-google-signin-button';
Vue.use(GSignInButton);
// Vue.use(VueCarousel);

Vue.use(Vuetify, {
  theme: {
    primary: '#00897B',
    // button: '#1565C0'
    button: '#2979FF',
    green_button: '#6FC23D',
    red_button: '#DD5347',
    dark_blue_button: '#494FB1'
  }
})
Vue.config.productionTip = false


Vue.use(VueAnalytics, {
  id: 'UA-109675107-7',
  router
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
