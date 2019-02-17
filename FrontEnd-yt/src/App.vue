<template>
  <!-- <div id="app"> -->
    <v-app>
      <head></head>
      <Menu v-if="$route.path !== '/'" :sticky="sticky"></Menu>
      <!-- <v-content class="grey lighten-4"> -->
      <v-content class="" :style="`background-color: ${$vuetify.breakpoint.smAndDow ? 'white' : 'rgb(238, 238, 238)'}`"> <!--#f2f3f7-->
        <router-view 
          @sticky="sticky = $event" 
          :style="$route.path === '/' ? 'margin-top: 0px' : ($route.params.editing ? 'margin-top: 0px' : $vuetify.breakpoint.smAndDown ? 'margin-top: 0px': $route.params.identifier ? 'margin-top: 0px; height: 100%;' : 'margin-top: 58px')"/>
          <!-- :style="$route.path === '/' ? 'margin-top: 70px' : ($route.params.editing ? 'margin-top: 0px' : $vuetify.breakpoint.smAndDown ? 'margin-top: 50px': $route.path !== '/' ? 'margin-top: 0px' : '')"/> -->
      </v-content>
      <Footer v-if="$route.path !== '/'" :style="$route.params.editing || $route.params.identifier || $route.path === '/' || $route.path === '/indice' ? $vuetify.breakpoint.smAndDown ? 'margin-top: 16px' : 'margin-top: 0px': ($vuetify.breakpoint.smAndDown ? 'margin-top: 0px' : 'margin-top: 0px')"></Footer> <!--50px-->
    </v-app>
  <!-- </div> -->
</template>

<script>
import Menu from '@/components/Menu'
import Footer from '@/components/Footer'

export default {
  components: { Menu, Footer },
  name: 'App',
  data () {
    return {
      sticky: false
    }
  },
  watch: {
    '$route' (to, from) {
      this.$vuetify.goTo(0, {duration: '0', easing: 'linear'})
    }
  },
  mounted() {
    var UID = {
    _current: 0,
      getNew: function(){
        this._current++;
        return this._current;
      }
    };

    HTMLElement.prototype.pseudoStyle = function(element,prop,value){
      var _this = this;
      var _sheetId = "pseudoStyles";
      var _head = document.head || document.getElementsByTagName('head')[0];
      var _sheet = document.getElementById(_sheetId) || document.createElement('style');
      _sheet.id = _sheetId;
      var className = "pseudoStyle" + UID.getNew();
      
      _this.className +=  " "+className; 
      
      _sheet.innerHTML += " ."+className+":"+element+"{"+prop+":"+value+"}";
      _head.appendChild(_sheet);
      return this;
    };
    console.log('here')
  }
}
</script>

<style>
body {
  /* Disables pull-to-refresh but allows overscroll glow effects. */
  overscroll-behavior-y: contain;
}
.slider {
  overflow: none;
    /* line them up horizontally */
    display: flex;

    /* allow for scrolling */
    overflow-x: auto;

    /* make it smooth on iOS */
    -webkit-overflow-scrolling: touch;

}
.selectedCategory {
  color: #3a44b1 !important;
  border-left: 3px solid #3a44b1;
}
.slider>div {
    /* make sure the width is honored */
    flex-shrink: 0;
    animation: moveSlideshow 12s linear infinite;
}

.tooltip {
  width: 280px;
  display: block !important;
  z-index: 10000;
}
.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
  line-height: 20px;
  font-family: 'Roboto-regular'
}
.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}
.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}
.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}
.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}
.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}
.tooltip[x-placement^="right"] {
  margin-left: 5px;
}
.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}
.tooltip[x-placement^="left"] {
  margin-right: 5px;
}
.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}
.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s, visibility 0.15s;
}
.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}

@keyframes moveSlideshow {
            0% {
                transform: translate3d(100px, 0, 0);
            }
            90% {
                transform: translate3d(-500px, 0, 0);
            }
            100% {
                transform: translate3d(100px, 0, 0);
            }
}

@font-face {
  font-family: Roboto-light;
  src: url('/static/fonts/Roboto-Light.ttf');
}

@font-face {
  font-family: Roboto-medium;
  src: url('/static/fonts/Roboto-Medium.ttf');
}

@font-face {
  font-family: Roboto-regular;
  src: url('/static/fonts/Roboto-Regular.ttf');
}

@font-face {
  font-family: Helvetica-bold;
  src: url('/static/fonts/HelveticaBlack.ttf');
}

@font-face {
  font-family: Helvetica-medium;
  src: url('/static/fonts/HelveticaMedium.ttf');
}

@font-face {
  font-family: Helvetica-regular;
  src: url('/static/fonts/HelveticaRegular.ttf');
}

@font-face {
  font-family: Roboto-bold;
  src: url('/static/fonts/Roboto-Bold.ttf');
}

@font-face {
  font-family: Poppins-regular;
  src: url('/static/fonts/Poppins-Regular.ttf');
}

@font-face {
  font-family: Poppins-bold;
  src: url('/static/fonts/Poppins-Bold.ttf');
}

@font-face {
  font-family: Segoe;
  src: url('/static/fonts/Segoe.ttf');
}

@font-face {
  font-family: Segoe-light;
  src: url('/static/fonts/segoeuil.ttf');
}
@font-face {
  font-family: Segoe-semibold;
  src: url('/static/fonts/Segoe-semibold.ttf');
}

@font-face {
  font-family: Segoebold;
  src: url('/static/fonts/Segoe-ui-bold.ttf');
}

#app {
  font-family: Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

.v-overlay .v-overlay--active {
  background-color: #e8e8e8 !important;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.purple_button {
  background-color: #4e0065 !important;
}

.camera-img-form-companyvalidation:hover {
  cursor: pointer;
}

.fa-pencil-alt {
  font-size: 18px !important;
  color: rgb(240, 238, 238);
}

.font-size-10 {
  font-size: 10px !important
}

.font-size-11 {
  font-size: 11px !important
}

.font-size-12 {
  font-size: 12px !important
}

.font-size-14 {
  font-size: 14px !important
}

.font-size-16 {
  font-size: 16px !important
}

.font-size-18 {
  font-size: 18px !important
}

.font-size-20 {
  font-size: 20px !important
}

.font-size-22 {
  font-size: 22px !important
}

.font-size-32 {
  font-size: 32px !important;
}
.font-size-28 {
  font-size: 30px !important;
}
.color-00306e {
  color: #00306e !important;
}

.color-0030ff {
  color: #0030ff !important; 
}

.color-1d2d35 {
  color: #1d2d35 !important;
}

.color-002d00 {
  color: #002d00 !important;
}

.color-a8a8bb {
  color: #a8a8bb !important;
}

.color-4A85FB {
  color: #4A85FB !important;
}

.color-1bbea4 {
  color: #1bbea4 !important
}

.color-3f46ae {
  color: #3f46ae !important;
}

.button--green {
  background-color: #81C54C !important;
}

.segoe-regular {
  font-family: 'Segoe' !important;
}

.segoe-semibold {
  font-family: 'Segoe-semibold' !important;
}

.segoe-bold {
  font-family: 'Segoebold' !important;
}

.arial {
  font-family: Arial !important;
}

.roboto {
  font-family: 'Roboto' !important;
}

.gothic-century {
  font-family: 'Century Gothic' !important;
}

.squared {
  border-radius: 0px !important;
}

.searchBar {
   -webkit-transition: all .5s ease;
   -moz-transition: all .5s ease;
   transition: all .5s ease;
}
.searchBar:focus {
   max-width: 250px;
}

/*.v-btn {
  border-radius: 0% !important;
}*/

</style>