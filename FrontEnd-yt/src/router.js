import Vue from 'vue'
import Router from 'vue-router'
import Register from './views/Register.vue'
import Preview from './views/Preview.vue'
import Preview2 from './views/Preview2.vue'
import Preview3 from './views/Preview3.vue'
import ValidateLink from './views/ValidateLink.vue'
import Login from './views/Login.vue'
import Edit from './views/Edit.vue'
import Search from './views/Search.vue'
import Store from '@/store'
import Home from './views/Home.vue'
import Construction from './views/Construction.vue'
import Help from './views/Help.vue'
import Indice from './views/Indice.vue'
import SolutionPreview from './views/SolutionPreview.vue'
import Admin from './views/Admin.vue'
import PasswordResetSendEmail from './views/PasswordResetSendEmail.vue'
import PasswordResetConfirm from './views/PasswordResetConfirm.vue'
import CompanyValidation from './views/CompanyValidation.vue'
import oAuthLogin from './views/oAuthLogin.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'construction', component: Construction },    
    { path: '/home', name: 'home', component: Home },
    { path: '/register', name: 'register', component: Register },
    { path: '/login', name: 'login', component: Login },
    { path: '/login/:registered', name: 'login-registered', component: Login },
    // { path: '/indice', name: 'indice', component: Indice },
    { path: '/help', name: 'help', component: Help },
    { path: '/search', name: 'Search', component: Search },
    { path: '/search/:query', name: 'Search', component: Search },
    { path: '/admin', name: 'admin', component: Admin },
    { path: '/forgot-password', name: 'reset-password', component: PasswordResetSendEmail },
    { path: '/password-change/token=:token', name: 'PasswordResetConfirm', component: PasswordResetConfirm},
    { path: '/auth/linkedin/success', name:'linkedin-sucess', component: oAuthLogin },
    { path: '/:identifier', component: Preview },
    { path: '/:identifier/new', component: Preview2 },
    { path: '/:identifier/new/v2', component: Preview3 },
    { path: '/:identifier/:solution/validate', component: ValidateLink },
    { path: '/:identifier/:json/preview', component: SolutionPreview },
    { path: '/:identifier/edit', redirect: '/:identifier/edit/about' },
    { path: '/:identifier/edit/:editing', component: Edit },
    { path: '/:identifier/:solution', component: Preview },
    { path: '/:identifier/:solution/:stad', component: Preview },
    { path: '/:identifier/:solution/clientes-encuestados', component: Preview },
    // { path: '/:identifier/:solution/validate', name:'validate', component: CompanyValidation },
    { path: '/:identifier/:solution/validate/success', name:'validate-sucess', component: ValidateLink },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
    { path: '*', redirect: '/' }
  ]
})

const companyLoad = async function (identifier) {
  await Store.dispatch('company/populate', identifier)
}

router.beforeEach((to, from, next) => {
  const isLoggedIn = Store.getters['auth/isLoggedIn']
  const currentUser = Store.getters['auth/currentUser']
  const isAdmin = Store.getters['auth/isAdmin']
  // const loggedUser = Store.getters['auth/currentUser'].username
  const path = to.path.toLowerCase()

  switch (path) {
    case '/':
      next(isLoggedIn ? { path: '/' + currentUser.identifier } : true)
      break
    case '/home':
      next(isLoggedIn ? { path: '/' + currentUser.identifier } : true)
      break      
    case '/register':
      next(isLoggedIn ? { path: '/' + currentUser.identifier } : true)
      break
    case '/login':
      next(isLoggedIn ? { path: '/' + currentUser.identifier } : true)
      break
    case '/forgot-password':
      next(isLoggedIn ? { path: '/' + currentUser.identifier } : true)
      break
    case '/password-change/token=:token':
      next(isLoggedIn ? { path: '/' + currentUser.identifier } : true)
      break
    case '/' + to.params.identifier:
      next(companyLoad(to.params.identifier))
      break     
    case '/' + to.params.identifier + '/new':
      next(companyLoad(to.params.identifier))
      break    
    case '/' + to.params.identifier + '/new/v2':
      next(companyLoad(to.params.identifier))
      break   
    case '/' + to.params.identifier + '/' + to.params.solution + '/validate':
      next(companyLoad(to.params.identifier))
      break           
      case '/' + to.params.identifier + '/' + to.params.json + '/preview':
      next(companyLoad(to.params.identifier))
      break                 
    case '/' + to.params.identifier + '/edit':
      next(currentUser.identifier === to.params.identifier ? true : { path: '/' + to.params.identifier })
      break
    case '/' + to.params.identifier + '/edit/' + to.params.editing:
      next(currentUser.identifier === to.params.identifier ? true : { path: '/' + to.params.identifier })
      break
    case '/' + to.params.identifier + '/' + to.params.solution:
      next(companyLoad(to.params.identifier))
      break
    case '/' + to.params.identifier + '/' + to.params.solution +'/' + to.params.stad:
      next(companyLoad(to.params.identifier))
      break
    case '/' + to.params.identifier + '/' + to.params.solution +'/clientes-encuestados':
      next(companyLoad(to.params.identifier))
      break      
    // case '/' + to.params.identifier + '/' + to.params.solution + '/validate':
    //   next(companyLoad(to.params.identifier))
    //   break
    // case '/company/' + to.params.identifier + '/service/' + to.params.solution + '/validate-success':
    //   next(companyLoad(to.params.identifier))
    //   break
    // case '/company/' + to.params.identifier + '/edit/' + to.params.editing:
    //   next(currentUser.identifier === to.params.identifier ? companyLoad(to.params.identifier) : { path: '/company/' + to.params.identifier })
    //   break
    case '/admin':
      next(isAdmin ? true : { path: '/' })
      break
    default:
      next()
  }
})

export default router
