<template>
<v-layout column fill-height style="background-color: #D5E3E4; min-height: 900px" v-scroll="onScroll">
    <v-toolbar dense fixed class="white elevation-0">
        <v-toolbar-items>
                <v-layout fill-height justify-center align-center @click="exit()" class="font-weight-bold subheading grey--text text--darken-3 underline" style="cursor: pointer;">
                    <v-flex>
                        <div>
                            <v-icon small class="mr-2">fas fa-arrow-left</v-icon>
                            Salir del editor
                        </div>
                    </v-flex>
                </v-layout>
        </v-toolbar-items>
        <v-spacer></v-spacer>
    </v-toolbar>
    <v-flex xs12 class="py-4" style="width: auto; margin: 0 auto;">
        <v-layout row wrap>
            <v-spacer class="hidden-md-and-down"></v-spacer>
            <v-flex xs12 md10>
                <v-layout column fill-height>
                    <v-flex xs12 mb-4 style="margin-top: 27px">
                        <v-layout row wrap>
                            <v-flex order-xs2 order-md1 xs12 md8 v-if="editing!=='settings'">                              
                                <!-- <v-tabs grow hide-slider color="white" class="hidden-md-and-down" style="width: 730px !important"> -->
                                <v-tabs grow hide-slider color="white" class="hidden-md-and-down" style="width: 730px !important;">
                                    <v-tab :to="'/' + currentUser.identifier + '/edit/about'" :disabled="getStatus.loading" :ripple="false" style="text-transform: capitalize !important; color: #1bbea4" class="font-weight-bold font-size-18" active-class="selected-tab"><img class="pr-2" :disabled="getStatus.loading" style="width: 30px; height: 24px" :src="editing === 'about' ? '/static/images/edit/icon-1-selected.png' : '/static/images/edit/blue_icon1.png'">Tu empresa</v-tab>
                                    <v-tab :to="'/' + currentUser.identifier + '/edit/services'" :disabled="getStatus.loading" :ripple="false" style="text-transform: capitalize !important; color: #1bbea4" class="font-weight-bold font-size-18" active-class="selected-tab"><img class="pr-2" :disabled="getStatus.loading" style="width: 30px; height: 24px" :src="editing === 'services' ? '/static/images/edit/icon-2-selected.png' : '/static/images/edit/blue_icon2.png'">Tus servicios</v-tab>
                                    <!-- <v-tab :to="'/' + currentUser.identifier + '/edit/happyclients'" :disabled="getStatus.loading" :ripple="false" style="text-transform: capitalize !important; color: #1bbea4; width: 150px !important" class="font-weight-bold font-size-18" active-class="selected-tab"><img class="pr-2" :disabled="getStatus.loading" style="width: 30px; height: 24px" :src="editing === 'happyclients' ? '/static/images/edit/icon-3-selected.png' : '/static/images/edit/icon-3.png'">Clientes Contentos</v-tab> -->
                                    <v-tab :to="'/' + currentUser.identifier + '/edit/happyclients'" :disabled="getStatus.loading" :ripple="false" style="text-transform: capitalize !important; color: #1bbea4; width: 150px !important" class="font-weight-bold font-size-18" active-class="selected-tab"><img class="pr-2" :disabled="getStatus.loading" style="width: 30px; height: 24px" :src="editing === 'happyclients' ? '/static/images/edit/icon-3-selected.png' : '/static/images/edit/blue_icon3.png'">Clientes Contentos</v-tab>
                                    <!-- <v-tab :to="'/' + currentUser.identifier + '/edit/thanks'" :disabled="getStatus.loading" :ripple="false" style="text-transform: capitalize !important" class="font-weight-bold font-size-18 color-00306e" active-class="selected-tab"><img class="pr-2" :disabled="getStatus.loading" style="width: 30px; height: 24px" :src="editing === 'thanks' ? '/static/images/edit/icon-4-selected.png' : '/static/images/edit/icon-4.png'">Da las Gracias</v-tab> -->
                                </v-tabs>
                                <v-list class="transparent hidden-md-and-up pb-4" v-if="editing !== 'settings'">
                                  <v-list-tile :to="'/' + currentUser.identifier + '/edit/about'" :disabled="getStatus.loading" class="py-1">
                                    <span :class="editing === 'about'? 'cSelected font-weight-bold subheading' : 'font-weight-bold grey--text text--darken-1 subheading'" style="text-align: center !important; width: 100%">Tu Empresa</span>
                                  </v-list-tile>
                                  <v-list-tile :to="'/' + currentUser.identifier + '/edit/services'" :disabled="getStatus.loading" class="py-1">
                                    <span :class="editing === 'services'? 'cSelected font-weight-bold subheading' : 'font-weight-bold grey--text text--darken-1 subheading'" style="text-align: center !important; width: 100%">Tus Servicios</span>
                                  </v-list-tile>
                                  <v-list-tile :to="'/' + currentUser.identifier + '/edit/happyclients'" :disabled="getStatus.loading" class="py-1">
                                    <span :class="editing === 'happyclients'? 'cSelected font-weight-bold subheading' : 'font-weight-bold grey--text text--darken-1 subheading'" style="text-align: center !important; width: 100%">Clientes Contentos</span>
                                  </v-list-tile>
                                  <!-- <v-list-tile :to="'/' + currentUser.identifier + '/edit/thanks'" :disabled="getStatus.loading" class="py-1">
                                    <span :class="editing === 'thanks'? 'cSelected font-weight-bold subheading' : 'font-weight-bold grey--text text--darken-1 subheading'" style="text-align: center !important; width: 100%">Da las Gracias</span>
                                  </v-list-tile> -->
                                </v-list> 
                            </v-flex>
                            <v-spacer class="hidden-md-and-down"></v-spacer>
                            <v-flex v-if="editing!=='settings'" order-xs1 order-md2 xs12 md4 :class="ats('text-xs-center mx-3', '=', 'text-xs-right')">
                              <v-btn :block="ats(true, true, false)" depressed :disabled="!allowPublish || getStatus.loading" :loading="getStatus.loading" class="white--text font-weight-bold px-5 my-0" :style="ats('height: 50px', '=', 'height: 70px; min-width: 333px; width: 220px; height: 64px !important; margin-left: 100px !important')" color="#1bbea4" @click="publish">{{getStatus.loading ? 'Loading...' : (getCompanyData.published ? 'Haz tu cartera de servicios privada' : 'Lanza tu cartera de servicios')}}</v-btn>
                            </v-flex>
                        </v-layout>        
                    </v-flex>
                    <v-flex xs12 mt-5 mb-4 v-if="editing !== 'settings'">
                        <div v-if="editing === 'about'">
                            <div class="display-1 font-weight-bold mb-2">Tu empresa</div>
                            <div class="body-1 font-weight-bold">Crea una primera gran impresión</div>
                        </div>
                        <div v-if="editing === 'services'" style="margin-left: -8% !important;">
                            <div class="display-1 font-weight-bold mb-2">Tus servicios</div>
                            <div class="body-1 font-weight-bold">Explica los servicios con los que habéis ayudado a vuestros clientes.</div>
                        </div>
                        <div v-if="editing === 'happyclients'">
                            <div class="display-1 font-weight-bold mb-2">Clientes Contentos</div>
                            <div class="body-1 font-weight-bold">Demuestra el apoyo de los clientes a los que ya has ayudado.</div>
                        </div>
                        <div v-if="editing === 'thanks'">
                            <div class="display-1 font-weight-bold mb-2">Gracias</div>
                            <div class="body-1 font-weight-bold">Dale las gracias a tus clientes por mostrarte su apoyo.</div>
                        </div>
                    </v-flex>
                    <v-flex xs12>
                      <v-layout row wrap fill-height >
                          <v-flex xs12 :md8="editing!=='settings'" :md12="editing==='settings'">
                              <About ref="about" v-show="editing === 'about'" @reload="reload($event)"></About>
                              <Solutions ref="solutions" v-show="editing === 'services'" @reload="reload($event)" @create="solution.create = $event" @open="solution.open = $event" @part="solution.part = $event" @mouseOverActionKey="mouseOverActionKey($event)" @mouseLeaveActionKey="mouseLeaveActionKey($event)"></Solutions>
                              <HappyClients ref="happyclients" v-show="editing === 'happyclients'" @reload="reload($event)"></HappyClients>
                              <Thanks ref="thanks" v-show="editing === 'thanks'" @reload="reload($event)"></Thanks>
                              <Settings v-show="editing === 'settings'"></Settings>
                          </v-flex>
                          <v-flex xs12 md4>
                              <v-layout ref="containerLimit" column px-3>
                                  <v-flex xs12 v-if="editing === 'about' || editing === 'thanks'">
                                      <v-btn block depressed :disabled="getStatus.loading" :loading="getStatus.loading" :class="ats('font-weight-bold px-5 mt-5 white--text', '=', 'font-weight-bold px-5 my-0 white--text')" :style="ats('height: 60px', '=', 'height: 70px')" color="button" @click="save">Guardar cambios</v-btn>
                                  </v-flex>
                                  <v-card v-if="editing === 'about' || editing === 'thanks'" class="pa-0 mt-3">
                                      <v-alert v-if="getStatus.error" class="my-0"  color="error" icon="warning" value="true">{{getStatus.message}}</v-alert>
                                  </v-card>
                                  <v-card v-if="solution.type != 0 && editing === 'services'" 
                                          :class="solution.type === 1 ? 'card1 px-4 pb-4 hidden-sm-and-down text-xs-left' : 
                                                  solution.type === 2 ? 'card2 px-4 pb-4 hidden-sm-and-down text-xs-left' : 
                                                  solution.type === 3 ? 'card3 px-4 pb-4 hidden-sm-and-down text-xs-left' : 
                                                  solution.type === 4 ? 'card4 px-4 pb-4 hidden-sm-and-down text-xs-left' : 
                                                  solution.type === 5 ? 'card5 px-4 pb-4 hidden-sm-and-down text-xs-left' : false" 
                                          style="background-color: white; min-height: 263px; width: 360px; margin-left: 80px">
                                    <div v-if="(solution.create || solution.open) && solution.part === 1 && solution.type === 1">
                                        <div class="subheading font-weight-bold" style="color: black; padding-top: 33px; margin-bottom: 33px;"><span style="border-bottom: 1px solid #DD5347;">CATEGORÍA</span></div>
                                        <img :src="'https://www.yesthem.com/static/images/edit/'+solution.type+'.png'" style="width: 98%" alt="image of form description">
                                    </div>
                                    <div v-if="(solution.create || solution.open) && solution.part === 1 && solution.type === 2">
                                        <div class="subheading font-weight-bold" style="color: black; padding-top: 33px; margin-bottom: 33px;"><span style="border-bottom: 1px solid #DD5347;">SERVICIO</span></div>
                                        <img :src="'https://www.yesthem.com/static/images/edit/'+solution.type+'.png'" style="width: 98%" alt="image of form description">
                                    </div>
                                    <div v-if="(solution.create || solution.open) && solution.part === 2 && solution.type === 3">
                                        <div class="subheading font-weight-bold" style="color: black; padding-top: 33px; margin-bottom: 33px;"><span style="border-bottom: 1px solid #DD5347;">CLIENTES CONTENTOS</span></div>
                                        <img :src="'https://www.yesthem.com/static/images/edit/'+solution.type+'.png'" style="width: 98%" alt="image of form description">
                                    </div>
                                    <div v-if="(solution.create || solution.open) && solution.part === 3 && solution.type === 4">
                                        <div class="subheading font-weight-bold" style="color: black; padding-top: 33px; margin-bottom: 33px;"><span style="border-bottom: 1px solid #DD5347;">RESULTADOS</span></div>
                                        <img :src="'https://www.yesthem.com/static/images/edit/'+solution.type+'.png'" style="width: 98%" alt="image of form description">
                                    </div>
                                    <div v-if="(solution.create || solution.open) && solution.part === 4 && solution.type === 5">
                                        <div class="subheading font-weight-bold" style="color: black; padding-top: 33px; margin-bottom: 33px;"><span style="border-bottom: 1px solid #DD5347;">IMAGEN</span></div>
                                        <img :src="'https://www.yesthem.com/static/images/edit/'+solution.type+'.png'" style="width: 98%" alt="image of form description">
                                    </div>                                                                                                                                                
                                  </v-card>
                                  <!-- <v-card v-if="solution.type == 0 && editing === 'services'" ref="movingBox" class="px-4 pb-4 hidden-sm-and-down text-xs-left moving-box" style="background-color: #ddefef; min-height: 263px"> -->
                                  <!-- <v-card ref="movingBox" class="px-4 pb-4 hidden-sm-and-down text-xs-left moving-box" v-if="editing === 'services'" style="min-height: 263px; width: 360px; margin-left: 80px"> -->
                                  <!-- <v-card v-if="solution.type == 0 && editing === 'services'" class="px-4 pb-4 hidden-sm-and-down text-xs-left" style="background-color: #ddefef; min-height: 263px"> -->
                                  <v-card class="px-4 pb-4 hidden-sm-and-down text-xs-left" v-if="solution.type == 0 && editing === 'services'" style="min-height: 263px; width: 360px; margin-left: 80px; background-color: #ddefef !important;">                                    
                                    <div v-if="!solution.create && !solution.open">
                                        <div class="subheading font-weight-bold red_button--text" style="padding-top: 33px; margin-bottom: 33px;"><span style="border-bottom: 1px solid #DD5347;">Algunas Ideas</span></div>
                                        <div style="text-align: justify;">
                                          <div style="padding-bottom: 43px; font-size: 16px">Vamos a proporcionarte la posibilidad de que expliques de una manera rápida y visual la experiencia de tus cliente con tus servicios.</div>
                                          <div style="padding-bottom: 43px; font-size: 16px">Un clientes potencial prefieren ver un resumen genérico de estabilidad y resultados de aquellas empresas a las que está pensando contratar.</div>
                                          <div style="padding-bottom: 43px; font-size: 16px">Hoy en día todos estamos demasiado ocupados, por lo que la pregunta a responder es de una manera rápida es ¿puedes hacer el trabajo y puedes hacerlo bien?</div>
                                        </div>
                                    </div>

                                    <div v-if="(solution.create || solution.open) && solution.part === 1">
                                        <div class="subheading font-weight-bold red_button--text" style="padding-top: 33px; margin-bottom: 33px;"><span style="border-bottom: 1px solid #DD5347;">Detalles</span></div>
                                        <div style="text-align: justify; padding-bottom: 43px; font-size: 16px">
                                          <div style="padding-bottom: 43px; font-size: 16px">Describe un servicio que ya hayas prestado de una manera genérica. Si dudas como describirlo la sección soluciones o servicios de tu página web te puede dar ideas. </div>
                                          <div style="padding-bottom: 43px; font-size: 16px">Hemos puesto un límite texto porque hoy en día la gente quiere leer rápido y directo al grano. </div>
                                          Una descripción breve y el respaldo de tus clientes a tu servicio es todo lo que un cliente potencial necesita.
                                        </div>
                                    </div>

                                    <!-- <div v-if="(solution.create || solution.open) && solution.part === 2">
                                        <div class="subheading font-weight-bold red_button--text" style="padding-top: 33px; margin-bottom: 33px;"><span style="border-bottom: 1px solid #DD5347;">Detalles</span></div>
                                        <div style="text-align: justify; padding-bottom: 43px; font-size: 16px">
                                          Identifica un poco más qué tipo de servicio has prestado ya con éxito. Te hemos dado la posibilidad de que escribas tú la categoría para individualizar más tu cartera de servicios.
                                        </div>
                                    </div> -->

                                    <div v-if="(solution.create || solution.open) && solution.part === 2">
                                        <div class="subheading font-weight-bold red_button--text" style="padding-top: 33px; margin-bottom: 33px;"><span style="border-bottom: 1px solid #DD5347;">Detalles</span></div>
                                        <div style="text-align: justify; padding-bottom: 43px; font-size: 16px">
                                          Esto lo usaremos para recordarte cuantos apoyos de tus clientes llevas y cuantos puedes conseguir todavía
                                        </div>
                                    </div>

                                    <div v-if="(solution.create || solution.open) && solution.part === 3">
                                        <div class="subheading font-weight-bold red_button--text" style="padding-top: 33px; margin-bottom: 33px;"><span style="border-bottom: 1px solid #DD5347;">Detalles</span></div>
                                        <div style="text-align: justify; padding-bottom: 43px; font-size: 16px">
                                          Explica qué resultados conseguiste con el servicio que prestaste a tus clientes. Alguna de las áreas donde puedes describir mejoras son: ahorro de tiempo, productividad, eficiencia, antes y después, mejora de algún aspecto, seguridad o impacto financiero.
                                        </div>
                                    </div>

                                    <div v-if="(solution.create || solution.open) && solution.part === 4">
                                        <div class="subheading font-weight-bold red_button--text" style="padding-top: 33px; margin-bottom: 33px;"><span style="border-bottom: 1px solid #DD5347;">Detalles</span></div>
                                        <div style="text-align: justify; padding-bottom: 43px; font-size: 16px">
                                          <div style="padding-bottom: 43px; font-size: 16px">Una imágen vale más que mil palabras, sube una imágen que ayude a describir tu servicio y soluciones.</div>
                                          Algunas páginas donde puedes encontrar una imágen increíble rápidamente son: <a href="https://www.pexels.com" target="_blank">www.pexels.com</a>, <a href="https://www.pixabay.com" target="_blank">www.pixabay.com</a> o <a href="https://https://burst.shopify.com" target="_blank">https://burst.shopify.com</a>
                                        </div>
                                    </div>

                                  </v-card>
                              </v-layout>
                          </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-snackbar bottom :color="snackbar.success? 'success' : 'error'" :timeout="10000" :multi-line="true" v-model="snackbar.show">
                        {{ snackbar.message }}
                        <v-btn flat color="white" @click.stop="snackbar = false">Close</v-btn>
                    </v-snackbar>
                </v-layout>
            </v-flex>
            <v-spacer class="hidden-md-and-down"></v-spacer>
        </v-layout>
    </v-flex>
</v-layout>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'

import About from '@/components/About.vue'
import Solutions from '@/components/Solutions.vue'
import HappyClients from '@/components/HappyClients.vue'
import Thanks from '@/components/Thanks.vue'
import Settings from './Settings.vue'
export default {
  name: 'home',
  components: {
    About, Solutions, HappyClients, Thanks, Settings
  },
  data () {
    return {
      snackbar: {
        show: false,
        success: true,
        message: ''
      },
      offsetTop: 0,
      solution: {
        open: null,
        create: null,
        part: 1,
        type: 0
      }
    }
  },
  computed: { 
    ...mapGetters('auth', ['isLoggedIn', 'currentUser']),
    ...mapGetters('company', ['getCompanyData', 'getStatus', 'setStatus', 'getSolutions', 'getBenefits', 'getExperiences', 'getTotalValidations']),
    editing () {
        return this.$route.params.editing.toLowerCase()
    },
    allowPublish () {
      if (this.getStatus.loading === false) {
        if (this.getCompanyData.name !== '' && this.getCompanyData.industry !== '' && this.getCompanyData.description !== '' && this.getCompanyData.coverImage !== '' && this.getSolutions.length > 0 && this.getBenefits.length > 0) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }
  },
  methods: {
    ats (xs, sm, mdAndUp) { // According to Size
      if (this.$vuetify.breakpoint.xs) {
        return xs
      }
      else if (this.$vuetify.breakpoint.sm) {
        return sm === '=' ? xs : sm
      }
      if (this.$vuetify.breakpoint.mdAndUp) {
        return mdAndUp
      }
    },

    mouseOverActionKey (key) {
      this.solution.type = key;
    },

    mouseLeaveActionKey(key) {
      this.solution.type = 0;
    },

    onScroll (e) {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
      let headerOffset = this.$refs.solutions.offsetTop ? this.$refs.solutions.offsetTop : 0
      this.$nextTick( () => {
        if (this.offsetTop > headerOffset && this.editing === 'services') {
          let move = this.offsetTop <= (this.$refs.solutions.$el.clientHeight - this.$refs.movingBox.$el.clientHeight) ? this.offsetTop : (this.$refs.solutions.$el.clientHeight - this.$refs.movingBox.$el.clientHeight)
              move = move < 0 ? 0 : move
          this.$refs.movingBox.$el.style.transform = 'translateY(' + move + 'px)'
        } else {
          // this.sticky = false
        }
      })
    },

    initializeAbout () {
        this.$refs.about.initialize()
    },
    save () {
      if (this.editing === 'about') {
          this.$refs.about.save(true, 'about')
      }

      if (this.editing === 'thanks') {
          this.$refs.thanks.save(true, 'thanks')
      }
    },

    async reload (event) {
      if (event.reload === true) {
          //await this.$store.dispatch('company/populate', this.currentUser.identifier)
          console.log('REload true')
          location.reload(true);
          console.log('have reload')
          //window.location.reload(true)
          //await this.$store.dispatch('auth/reload')
          //await this.$store.dispatch('company/populate', this.currentUser.identifier)
          //window.location.reload(true)
      }
      if (event.redirect === true) {
          console.log('REdirect true')
          //window.location.reload(true)
          //this.$router.push('/' + this.currentUser.identifier + '/edit/' + event.to)
      }
    },

    async publish () {
      let response = await this.$store.dispatch('company/publish')
      if (response.success === true) {
        if (this.getCompanyData.published)
          this.$router.push('/' + this.currentUser.identifier + '?published=false')
        else
          this.$router.push('/' + this.currentUser.identifier + '?published=true')
      }
    },

    async exit () {
      window.location.href = `http://yesthem.com/${this.getCompanyData.identifier}`
      if(this.$route.params.editing == 'about') {
        // window.location.reload(true);
        // window.location.replace("http://yesthem.com/");
        //let response = await this.$refs.about.save(true, 'out')
        // if (response === true) {
        //     await this.$store.dispatch('auth/reload')
        //     window.location.reload(true);
        //     window.location.replace("http://yesthem.com/"+this.currentUser.identifier);
        //     //this.$router.push('/' + this.currentUser.identifier)
        // } else {}
      } else if (this.$route.params.editing == 'thanks') {
        let response = await this.$refs.thanks.save(true, 'out')
        if (response === true) {
            await this.$store.dispatch('auth/reload')
            this.$router.push('/' + this.currentUser.identifier)
        } else {}
      } else {
        this.$router.push('/' + this.currentUser.identifier)
      }
    }
  },
  created: function () {
    this.$store.dispatch('company/populate', this.$route.params.identifier)
  },
  async beforeRouteUpdate (to, from, next) {
    if(from.params.editing == 'about') {
      let response = await this.$refs.about.save(true, to.params.editing)
      if (response === true) {
          next(true)
      } else {
          next(false)
      }
    } else if (from.params.editing == 'thanks') {
      let response = await this.$refs.thanks.save(true, to.params.editing)
      if (response === true) {
          next(true)
      } else {
          next(false)
      }
    } else {
      next(true)
    }

    // if (to.params.editing == 'about') {
    //   next(this.$store.dispatch('company/populate', this.$route.params.identifier))
    // } else {
    //   next(true)
    // }
  }
}
</script>

<style>
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}

.cSelected {
  color: #1565C0 !important;
}

div.btn__content {
  padding: 0;
}

div.card__actions .btn {
  min-width: 0;
}

.underline:hover {
    text-decoration: underline;
}

.selected-tab {
  color: white !important;
  background-color: #B3BEC0 !important;
}

.card1 {
  margin-top: 140px !important
}

.card2 {
  margin-top: 260px !important
}

.card3 {
  margin-top: 142px !important
}

.card4 {
  margin-top: 145px !important
}

.card5 {
  margin-top: 135px !important
}

.moving-box {
  transition: transform 1s;
}
</style>
