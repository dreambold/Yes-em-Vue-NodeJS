<template>
  <div>
    <v-footer v-if="!$vuetify.breakpoint.smAndDown" :height="$vuetify.breakpoint.smAndDown ? 334 : 290" :class="$vuetify.breakpoint.smAndDown ? 'white pa-4' : 'white grey--text text--darken-1 px-5 py-5'" :style="`z-index: 2; border-top: 1px solid #e3e3e3 !important; background: #0d3240 !important; color: white !important`">
      <div style="width: 100%; display: flex; flex-direction: column; justify-content: space-between; align-items: center;">
        <div style="display: flex; flex-direction: row; justify-content: center; align-items: center">
          <div style="margin-right: 10px; width: 100%">
            <input v-model="query" placeholder="Busca una Empresa..." type="text" :style="`color: #505050; width: ${$vuetify.breakpoint.smAndDown ? '100%' : '450px'}; height: 42px; padding: 10px; border: 1px solid #ececec; border-radius: 4px; font-size: 12px; background: white; outline: none;`">
          </div>
          <div>
            <button @click="$router.push(`/search/${query.replace(/\s/g, '-')}`)" type="button" style="outline: none; border: 1px solid #cecece; border-radius: 5px; padding: 10px;">Busqueda</button>
          </div>
        </div>
        <br />
        <div :style="`display: flex; flex-direction: ${$vuetify.breakpoint.smAndDown ? 'column' : 'row'}; justify-content: center; align-items: center`">
          <div style="font-size: 15px; font-family: 'Helvetica-regular'"><span>Yes Them directorio de empresas (por orden) </span></div>
          <div :style="`display: flex; justify-content: center; flex-direction: ${$vuetify.breakpoint.smAndDown ? 'row' : 'row'}; flex-wrap: wrap; text-align: center;`"><div v-for="(letter, index) in abc" :key="index" style="cursor: pointer; padding: 3px; font-size: 15px; font-family: 'Roboto-regular'"><span style="font-family: 'Helvetica-regular'">{{letter}}</span></div></div>
        </div>
        <br />
        <div :style="`width: 80%; display: flex; flex-direction: ${$vuetify.breakpoint.smAndDown ? 'column' : 'row'}; justify-content: space-between; align-items: center; cursor: pointer`">
          <span style="font-size: 15px; font-family: 'Helvetica-regular'">Somos Nosotros</span>
          <span style="font-size: 15px; font-family: 'Helvetica-regular'">Unete al Equipo</span>
          <span style="font-size: 15px; font-family: 'Helvetica-regular'">Politica de Privacidad</span>
          <span style="font-size: 15px; font-family: 'Helvetica-regular'">Terminos de Uso</span>
          <div style="display: flex;">
                <v-btn href="https://www.facebook.com/YesThemGlobal/" target="_blank" fab small depressed :style="$vuetify.breakpoint.smAndDown ? 'height: 24px !important; width: 24px !important' : 'height: 30px !important; width: 30px !important'" class="grey lighten-1 font-weight-bold mx-2"><v-icon color="white" class="font-weight-thin" :style="$vuetify.breakpoint.smAndDown ? 'font-size: 14px' : 'font-size: 18px'">fab fa-facebook</v-icon></v-btn>
                <!-- <v-btn fab small depressed :style="$vuetify.breakpoint.smAndDown ? 'height: 24px !important; width: 24px !important' : 'height: 30px !important; width: 30px !important'" class="grey lighten-1 font-weight-bold mx-2"><v-icon color="white" class="font-weight-thin" :style="$vuetify.breakpoint.smAndDown ? 'font-size: 14px' : 'font-size: 18px'">fab fa-linkedin</v-icon></v-btn> -->
                <v-btn href="https://twitter.com/YesThem_global" target="_blank" fab small depressed :style="$vuetify.breakpoint.smAndDown ? 'height: 24px !important; width: 24px !important' : 'height: 30px !important; width: 30px !important'" class="grey lighten-1 font-weight-bold mx-2"><v-icon color="white" class="font-weight-thin" :style="$vuetify.breakpoint.smAndDown ? 'font-size: 14px' : 'font-size: 18px'">fab fa-twitter</v-icon></v-btn>
                <v-btn href="https://www.instagram.com/yesthem_global/" target="_blank" fab small depressed :style="$vuetify.breakpoint.smAndDown ? 'height: 24px !important; width: 24px !important' : 'height: 30px !important; width: 30px !important'" class="grey lighten-1 font-weight-bold mx-2"><v-icon color="white" class="font-weight-thin" :style="$vuetify.breakpoint.smAndDown ? 'font-size: 14px' : 'font-size: 18px'">fab fa-instagram</v-icon></v-btn>
          </div>
        </div>
      </div>
    </v-footer>

    <v-footer v-if="$route.params.identifier && $vuetify.breakpoint.smAndDown" :height="$vuetify.breakpoint.smAndDown ? 334 : 290" :class="$vuetify.breakpoint.smAndDown ? 'white pa-4' : 'white grey--text text--darken-1 px-5 py-5'" :style="`height: 60px;z-index: 2;border-top: 1px solid rgb(227, 227, 227) !important;background: #002660 !important;color: white !important;`">
      <div style="width: 100%; display: flex; justify-content: space-between; align-items: center">
        <span style="color: white; font-size: 20px;">Yes Them</span>
        <div style="display: flex; align-items: center">
              <v-btn href="https://www.facebook.com/YesThemGlobal/" target="_blank" fab small depressed :style="$vuetify.breakpoint.smAndDown ? 'height: 24px !important; width: 24px !important' : 'height: 30px !important; width: 30px !important'" class="grey lighten-1 font-weight-bold mx-2"><v-icon color="#002660" class="font-weight-thin" :style="$vuetify.breakpoint.smAndDown ? 'font-size: 14px' : 'font-size: 18px'">fab fa-facebook</v-icon></v-btn>
              <v-btn href="https://twitter.com/YesThem_global" target="_blank" fab small depressed :style="$vuetify.breakpoint.smAndDown ? 'height: 24px !important; width: 24px !important' : 'height: 30px !important; width: 30px !important'" class="grey lighten-1 font-weight-bold mx-2"><v-icon color="#002660" class="font-weight-thin" :style="$vuetify.breakpoint.smAndDown ? 'font-size: 14px' : 'font-size: 18px'">fab fa-twitter</v-icon></v-btn>
              <v-btn href="https://www.instagram.com/yesthem_global/" target="_blank" fab small depressed :style="$vuetify.breakpoint.smAndDown ? 'height: 24px !important; width: 24px !important' : 'height: 30px !important; width: 30px !important'" class="grey lighten-1 font-weight-bold mx-2"><v-icon color="#002660" class="font-weight-thin" :style="$vuetify.breakpoint.smAndDown ? 'font-size: 14px' : 'font-size: 18px'">fab fa-instagram</v-icon></v-btn>
        </div>
      </div>
    </v-footer>        
</template>

<script>
export default {
  data () {
    return {
      abc: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ],
      query: ''
    }
  },
  computed: {},
  methods: {
    search(query) {
      location.href = `${window.location.origin}/search/${query.trim()}`;
    }
  },
  beforeMount: function () {},
  created: function () {},
  mounted: function () {
  }
}
</script>

<style>

.ul-hover {
  text-decoration: none;
}

.ul-hover:hover {
  text-decoration: underline;
}
</style>
