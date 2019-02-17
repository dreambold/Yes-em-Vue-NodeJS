<template>
  <v-layouts v-if="!$route.params.editing">
<!--<v-toolbar v-if="$route.path !== '/' && $route.path !== '/:company/:solution/validate'" :fixed="$route.params.identifier ? false : true" :height="$vuetify.breakpoint.smAndDown ? '70': '70'" extension-height="70" :class="sticky ? ' elevation-5' : ' elevation-0'" color="black" style="z-index: 100; background-color: #007676 !important"> -->
    <v-toolbar v-if="$route.path !== '/' && $route.path !== '/:company/:solution/validate'" :fixed="$route.params.identifier ? false : true" :height="$vuetify.breakpoint.smAndDown ? '60': '70'" :class="sticky ? ' elevation-5' : ' elevation-0'" color="black" :style="`z-index: 100; height: ${$vuetify.breakpoint.smAndDown ? '60px' : ''}; background-color: ${$route.path == '/home' ? 'white !important' : '#102740 !important'}; border-bottom: ${$route.path != '/home' ? '3px solid #72bcf7 !important' : ''}`">
      <v-layout justify-center align-center :class="$vuetify.breakpoint.smAndDown ? 'px-3' : 'px-3'" style="margin-top: 0px; margin-left: 0px;">
        <div :style="`display: flex; width: ${$vuetify.breakpoint.smAndDown ? '100%;' : '1175px;'} justify-content: ${$route.path != '/home' ? 'space-between' : $vuetify.breakpoint.smAndDown ? 'space-between' : 'flex-start'}`">
          <div class="hidden-md-and-up" style="display:flex; align-items: center">
            <router-link to="/" class="subheading font-weight-bold" style="text-decoration: none; color: white;"> 
              <img v-if="$route.path != '/home'" src="/static/images/blue_logo.png" alt="logo1" style="width: 36px !important;">
              <img v-if="$route.path == '/home'" src="/static/images/logoBgWhite.png" alt="logo background white YESTHEM" style="height: 22px !important; cursor: pointer; margin-right: 0px;" @click="goTop()">
              <!-- <span style="font-family: Roboto; font-weight: 400; font-size: 19px; letter-spacing: 2px; color: white !important">Yes Them</span> -->
            </router-link>
            <span v-if="$route.path != '/home'" style="margin-left: 10px; font-family: 'Roboto-regular'; letter-spacing:0px;font-size: 25px; margin-bottom: 5px;color: white">Yes Them</span>
          </div>
          <div class="pr-3 hidden-sm-and-down" style="margin-left: 0px; display: flex; align-items: center">
            <router-link to="/" class="" style="text-decoration: none;" @click="goTop()">
              <img v-if="$route.path != '/home'" src="/static/images/blue_logo.png" alt="logo2" style="height: 33px !important; cursor: pointer; margin-right: 0px;" @click="goTop()">
              <img v-if="$route.path == '/home'" src="/static/images/logoBgWhite.png" alt="logo background white YESTHEM" style="height: 28px !important; cursor: pointer; margin-right: 0px;" @click="goTop()">
              <!-- <span  style="font-family: 'Roboto'; font-size: 19px !important; letter-spacing: 1px; color: white !important">Yes Them</span> -->
            </router-link>
            <span v-if="$route.path != '/home'" style="margin-left: 10px; font-family: 'Roboto-regular'; letter-spacing:0px;font-size: 25px; margin-bottom: 5px;color: white">Yes Them</span>
          </div>
              <v-layout v-if="$route.params.identifier && !$vuetify.breakpoint.smAndDown || $route.params.solution && !$vuetify.breakpoint.smAndDown" layout justify-center align-center px-3 :class="$vuetify.breakpoint.smAndDown ? 'px-3 pb-3' : 'px-3'" style="width: 210px;">
                <!-- <div style="width: 100%; height: 34px; display: flex; align-items: center; justify-content: flex-start;">
                  <v-icon style="margin-right: 10px; font-size: 12px; color: white;">fas fa-chevron-right</v-icon>
                  <span style="margin-right: 10px; color: white; font-size: 14px; font-family: 'Roboto-light';">
                    Industrias
                  </span>
                  <v-icon style="margin-right: 10px; font-size: 12px; color: white;">fas fa-chevron-right</v-icon>
                  <span style="margin-right: 10px; color: white; font-size: 14px; font-family: 'Roboto-light';">
                    Compañίas
                  </span>
                </div> -->
              </v-layout> 
              <v-text-field
                label="Buscar empresa..."
                outline
                v-if="showSearchBar"
                prepend-inner-icon="search"
                color="white"
                flat
                solo
                class="pt-1 hidden-sm-and-down searchBar"
                style="width: 170px; height: 50px;"
              ></v-text-field>      
          <!-- <v-spacer class="hidden-md-and-up"></v-spacer>
          <v-spacer></v-spacer> -->

          <v-toolbar-items class="hidden-sm-and-down">
            <!-- <v-btn flat class="black--text text-capitalize" @click="showSearchBarClick()">
              <v-layout column fill-height align-center justify-center>
                <span class="font-weight-bold" style="color: white !important">Buscar servicios</span>
              </v-layout>
            </v-btn> -->
            <v-btn flat class="black--text text-capitalize" to="/help">
              <v-layout column fill-height align-center justify-center v-if="!isLoggedIn">
                <!-- <v-icon class="mr-1 pb-1">info</v-icon> -->
                <span class="" :style="`color: ${$route.path != '/home' ? 'white' : '#012a54'} !important; font-family: 'Poppins-regular'`">¿Como funciona?</span>
              </v-layout>
            </v-btn>            
            <!-- <v-btn flat class="black--text text-capitalize" to="/help">
              <v-layout column fill-height align-center justify-center>
                <span class="" :style="`color: ${$route.path != '/home' ? 'white' : '#012a54'} !important; font-family: 'Poppins-regular'`">Ayuda</span>
              </v-layout>
            </v-btn> -->
            <v-btn flat class="black--text text-capitalize" to="/help">
              <v-layout column fill-height align-center justify-center v-if="!isLoggedIn">
                <!-- <v-icon class="mr-1 pb-1">info</v-icon> -->
                <span class="" :style="`color: ${$route.path != '/home' ? 'white' : '#012a54'} !important; font-family: 'Poppins-regular'`">Ayuda</span>
              </v-layout>
            </v-btn>
            <v-btn @click="$router.push('/register')" v-if="$route.path == '/home'" flat style="position: absolute; right: 30px; background: rgb(70, 39, 101); color white; font-family: 'Poppins-regular'; padding: 10px; text-transform: none">
              <v-layout column fill-height align-center justify-center>
                <span class="font-weight-bold" :style="`color: ${$route.path != '/home' ? 'white' : 'white'} !important; font-family: 'Poppins-bold'`">Activa tus clientes</span>
              </v-layout>
            </v-btn>
            <v-menu v-if="isLoggedIn" offset-y bottom> <!-- THIS IS BUGGED -->
              <v-btn fab slot="activator" small depressed style="height: 48px; width: 48px;">
                <v-layout column child-flex fill-height justify-center align-center>
                  <v-flex xs12 v-if="getCompanyData ? (getCompanyData.logo !== null) : false">
                    <v-avatar size="48" color="white">
                      <img :src="'/static/images/uploads/' + getCompanyData.logo + '?' + Date.now()"/>
                    </v-avatar>
                  </v-flex>
                  <v-flex xs12 v-if="getCompanyData === null || getCompanyData.logo === null">
                    <v-card flat height="48" width="48" color="white" :style="$vuetify.breakpoint.smAndDown ? 'margin-top: -32px; border-radius: 50%' : 'border-radius: 50%; border: solid #e3e3e3 1px !important; margin-top: 0px;' ">
                      <v-layout style="height: 46px; width: 46px" class="white" column fill-height align-center justify-center>
                        <span class="black--text font-weight-bold" style="font-size: 10px">{{getCompanyData ? getShortName(getCompanyData.name) : '...'}}</span>
                      </v-layout>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-btn>
              <v-card>
                <v-list class="white black--text">
                  <v-list-tile :to="`/${currentUser.identifier}/edit/about`">Acabar página</v-list-tile>
                  <v-list-tile :to="`/${currentUser.identifier}/`">Página de Empresa</v-list-tile>
                  <v-list-tile v-if="isLoggedIn" :to="`/${currentUser.identifier}/edit/settings`">Ajustes</v-list-tile>
                  <v-list-tile to="/help">Ayuda</v-list-tile>
                  <v-list-tile @click.prevent="logout">Cerrar sesión</v-list-tile>
                </v-list>
              </v-card>
            </v-menu>
            <v-btn flat class="black--text text-capitalize" to="/login" v-if="!isLoggedIn">
              <v-layout column fill-height align-center justify-center>
                <!-- <v-icon class="mr-1 pb-1">exit_to_app</v-icon> -->
                <span class="" :style="`color: ${$route.path != '/home' ? 'white' : '#012a54'} !important; font-family: 'Poppins-regular'`">Login</span>
              </v-layout>
            </v-btn>
            <!-- <v-btn flat class="black--text text-capitalize " style="margin-right: 55px" to="/register" v-if="!isLoggedIn">
              <v-layout column fill-height align-center justify-center>
                <span class="font-weight-bold" style="font-family: 'Roboto'; color: white;">Activa tus clientes</span>
              </v-layout>
            </!-->
          </v-toolbar-items>
          <v-toolbar-side-icon class="hidden-md-and-up" style="color: #4e0065 !important; font-size: 16px !important" @click="drawer = !drawer"><span v-if="$route.path == '/home'" style="color: black; fint-size: 20px;">☰</span><img v-if="$route.path != '/home'" src="/static/images/menu.png" style="width: 21px;" alt="drawer for surveys yes them"/></v-toolbar-side-icon>
          </div>
      </v-layout>
    </v-toolbar>
<!--<v-toolbar v-if="$route.path === '/'" fixed height="70" extension-height="70" :class="sticky ? 'elevation-5' : 'elevation-0'" style="z-index: 100;"> white were here in elevation -->
    <v-toolbar v-if="$route.path === '/'" fixed height="70" extension-height="70" :class="sticky ? 'elevation-5' : 'elevation-0'" style="z-index: 100">
      <v-toolbar-title class="hidden-md-and-up">
        <router-link to="/" class="subheading font-weight-bold black--text" style="text-decoration: none;">
          <img v-if="$route.path != '/home'" src="/static/images/mylogo.png" alt="logo1" style="width: 22px !important; height: 22px !important; margin-right: 10px">
          <img v-if="$route.path == '/home'" src="/static/images/logoBgWhite.png" alt="logo background white YESTHEM" style="height: 22px !important; cursor: pointer; margin-right: 0px;" @click="goTop()">
          <span v-if="$route.path != '/home'" style="font-family: Roboto; font-weight: 400; font-size: 19px; letter-spacing: 2px; color: #0d2c56 !important">Yes Them</span>
        </router-link>
      </v-toolbar-title>
      <v-toolbar-title class="pr-3 hidden-sm-and-down" style="margin-left: 0px">
        <!-- <router-link to="/home" class="subheading font-weight-bold black--text" style="text-decoration: none;" @click="goTop()"> -->
          <img src="/static/images/mylogo.png" alt="logo2" style="width: 22px !important; height: 22px !important; cursor: pointer; margin-right: 10px;" @click="goTop()">
          <span style="font-family: 'Roboto'; font-size: 19px !important; letter-spacing: 1px; color: #000032 !important">YES THEM</span>
        <!-- </router-link> -->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer">
        <img v-if="$route.path != '/home'" src="/static/images/menu.png" style="width: 21px;" alt="drawer menu yes them services and surveys reviews"/>
        <span v-if="$route.path == '/home'" style="color: black; fint-size: 20px;">☰</span>
      </v-toolbar-side-icon>
      <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat depressed style="height: 45px; text-transform: none !important; font-size: 16px; font-family: 'Roboto'; color: #000131 !important" class="mr-2 font-weight-bold" to="/search">Buscar empresas</v-btn>
            <v-btn flat depressed style="height: 45px; text-transform: none !important; font-size: 16px; font-family: 'Roboto'; color: #000131 !important" class="mr-2 font-weight-bold" to="/help">Ayuda</v-btn>
            <v-btn flat depressed style="height: 45px; text-transform: none !important; font-size: 16px; font-family: 'Roboto'; color: #000131 !important" class="mr-2 font-weight-bold" to="/login" v-if="isLoggedIn ? false : ($route.path === '/login' ? false : true)">Login</v-btn>
            <v-btn depressed style="height: 45px; width:180px !important; margin-right: 90px !important; font-family: 14px !important" class="white--text font-weight-bold purple_button px-5 squared" to="/register" v-if="isLoggedIn ? false : ($route.path === '/register' ? false : true)">Activa tus clientes</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-toolbar v-if="$route.path !== '/:company/:solution/validate'" fixed height="70" extension-height="70" class="white elevation-1" style="display: none !important"></v-toolbar>
    <!-- <v-progress-linear class="my-0" v-if="getStatus.loading" :indeterminate="true"></v-progress-linear> -->
    <v-navigation-drawer persistent v-model="drawer" :width="355" clipped fixed disable-resize-watcher :style="$route.path === '/' || $route.path === '/indice' || $route.path === '/register' || $route.path === '/login' ? 'margin-top: 60px; background-color: #d8d8d8 !important; z-index: 9995' : 'margin-top: 60px; background-color: #d8d8d8 !important; z-index: 9995'">
      <v-list dense class="pt-0" style="margin-top: 45% !important">

        <v-list-tile class="py-2 mx-3" style="" active-class="button--text" v-if="!isLoggedIn" to="/login"><span class="subheading font-weight-bold" style="color: #465c83; font-size: 25px !important">Login</span></v-list-tile>
        <v-list-tile class="py-2 mx-3" style="" active-class="button--text" v-if="!isLoggedIn" to="/register"><span class="subheading font-weight-bold" style="color: #465c83; margin-top: -20px !important; font-size: 25px !important">Activa tus clientes</span></v-list-tile>
        <v-list-tile class="py-2 mx-3" style="" active-class="button--text" v-if="isLoggedIn" :to="`/${currentUser.identifier}/edit/about`"><span class="subheading font-weight-bold" style="color: #465c83; margin-top: -20px !important; font-size: 25px !important">Acabar página</span></v-list-tile>
        <v-list-tile class="py-2 mx-3" style="" active-class="button--text" v-if="isLoggedIn" :to="`/${currentUser.identifier}/`"><span class="subheading font-weight-bold" style="color: #465c83; margin-top: -20px !important; font-size: 25px !important">Página de Empresa</span></v-list-tile>
        <v-list-tile class="py-2 mx-3" style="" active-class="button--text" to="/search"><span class="subheading font-weight-bold" style="color: #465c83; margin-top: -20px !important; font-size: 25px !important">Buscar Empresas</span></v-list-tile>
        <v-list-tile class="py-2 mx-3" style="" active-class="button--text" to="/help"><span class="subheading font-weight-bold" style="color: #465c83; margin-top: -20px !important; font-size: 25px !important">Ayuda</span></v-list-tile>
        <v-list-tile class="py-2 mx-3" style="" active-class="button--text" v-if="isLoggedIn" @click.prevent="logout"><span class="subheading font-weight-bold" style="color: #465c83; margin-top: -20px !important; font-size: 25px !important">Cerrar sesión</span></v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'

export default {
  props: ['sticky'],
  data () {
    return {
      drawer: false,
      extendedSearch: false,
      showServicesSearch: false,
      counter: 0,
      showSearchBar: false
    }
  },
  watch: {
    '$route' (to, from) {
      this.drawer = false
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn', 'currentUser']),
    ...mapGetters('company', ['getStatus', 'getCompanyData'])
  },
  methods: {
    goTop () {
      console.log('ROUTER PARAMS', this.$router)
      this.$router.push(`http://yesthem.com/${this.$router.params.identifier ? this.$router.params.identifier : ''}`)
      // window.location.replace(`http://yesthem.com/${this.$router.params.identifier ? this.$router.params.identifier : ''}`)
    },

    showSearchBarClick() {
      this.counter++;
      if(this.counter % 2 === 0) {
        this.showSearchBar = false;
      } else {
        this.showSearchBar = true;
      }
    },

    extendedSearchBar (isFocus) {
      let elem = this.$refs.searchBar.$el;
      elem.style.webKitTransition = "all .5s ease";
      elem.style.transition = "all .5s ease";
      elem.style.mozTransition = "all .5s ease";
      isFocus ? elem.style.maxWidth = "340px" : elem.style.maxWidth = "170px";
    },

    getShortName (name) {
      let splittedName = name.split(' ');
      let final = '';
      if (splittedName.length > 1) {
        const initials = (splittedName.map(n => n.charAt(0).toUpperCase())).join("");
        final = initials;
      } else {
        // console.warn(name.charAt(0))
        final = (name.charAt(0)).toUpperCase();
      }
      // console.warn(final + "up")
      return final;
    },

    logout () {
      this.$store.dispatch('auth/logout')
      this.$router.push('/')
    }
  },
  beforeMount: function () {},
  created: function () {},
  mounted: function () {}
}
</script>

<style scoped>
.v-overlay .v-overlay--active {
  background-color: #e8e8e8 !important;
}
.searchBar .theme--light.v-text-field--outline .v-input__slot {
  border: 2px solid white !important;
}

.searchBar .theme--light.v-icon { /*revisar to get inside the things */
  color: white !important
}

.theme--light.v-label {
  color: white !important
}

.theme--light.v-input:not(.v-input--is-disabled) input, .theme--light.v-input:not(.v-input--is-disabled) textarea {
  color: white !important
}

.v-toolbar__content {
  height: 60px !important;
}

</style>
