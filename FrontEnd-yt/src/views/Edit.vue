<template>
<v-layout column fill-height style="background-color: #f9f9f9; z-index: 8%" v-scroll="onScroll">
    <v-toolbar v-if="!$vuetify.breakpoint.smAndDown " dense class="elevation-0" style="height: 75px;background: white; border-bottom: 2px solid #cecece; z-index: 5">
        <v-toolbar-items style="margin-top: 35px; width: 100%">
                <div class="subheading grey--text text--darken-3" style="cursor: pointer; margin-left: 30px">
                  <span @click="$router.push('/')" style="font-size: 20px">Yes Them</span>
                </div>
                <div class="subheading" :style="`color: ${editing === 'about' ? '#296761' : 'black'}; font-weight: ${editing === 'about' ? 'bold' : '400'}; margin-top: 5px; cursor: pointer; margin-left: 50px`">
                  <span style="font-size: 14px">
                    <router-link :to="'/' + currentUser.identifier + '/edit/about'" class="colorChange"  :style="`text-decoration: none; color: ${editing === 'about' ? '#296761' : 'black'};`"> Acerca De </router-link>
                  </span>
                </div>
                <div class="subheading" :style="`color: ${editing === 'services' ? '#296761' : 'black'}; font-weight: ${editing === 'services' ? 'bold' : '400'}; margin-top: 5px; cursor: pointer; margin-left: 20px`">
                  <span style="font-size: 14px">
                    <router-link v-if="editing != 'services'" :to="'/' + currentUser.identifier + '/edit/services'" class="colorChange"  :style="`color: ${editing === 'services' ? '#296761' : 'black'};text-decoration: none;`"> Servicios </router-link>
                    <span @click="goToServices();" v-if="editing === 'services'" class="colorChange" style="font-size: 14px">Servicios</span>
                  </span>
                </div>
                <div class="subheading" style="margin-top: 5px; cursor: pointer; margin-left: 20px">
                  <span class="colorChange" style="font-size: 14px">Perfil YesThem</span>
                </div>
                <div class="subheading" style="margin-top: 5px; cursor: pointer; margin-left: 20px">
                  <span class="colorChange" style="font-size: 14px">Marketing</span>
                </div>
                <div class="subheading" style="margin-top: 5px; cursor: pointer; margin-left: 20px; margin-right: 155px">
                  <span class="colorChange" style="font-size: 14px">Ayuda</span>
                </div>
                <v-layout class="subheading" style="opacity: 1; cursor: pointer; margin-top: 6px; user-select: none">
                  <v-flex>
                    <div style="display: flex">
                      <div style="margin-right: 10px; border-left: 1px solid black; padding-left: 10px;">
                        <span style="color: #515151; margin-right: 0; font-size: 16px">Visibilidad</span>
                      </div>
                      <div @click="changeProfileStatus = true">
                        <span v-if="!isPublicProfile" style="cursor: pointer; font-size: 13px; color: #555555">
                          <v-icon small class="" style="margin-right: 0px; font-size: 18px; color: #555555">fas fa-eye-slash</v-icon>
                          Perfil Privado
                        </span>
                        <span v-if="isPublicProfile" style="cursor: pointer; font-size: 13px; color: #555555">
                          <v-icon small class="" style="margin-right: 0px; font-size: 18px; color: #555555">fas fa-eye</v-icon>
                          Perfil Publico
                        </span>                       
                      </div>
                      <div style="margin-top: -3px; margin-left: 3px"><v-icon small>fas fa-sort-down</v-icon></div>
                      <div style="margin-left: 11px; border-right: 1px solid black"></div>
                    </div>
                  </v-flex>
                    <transition name="fade">
                      <div v-if="changeProfileStatus" style="position: absolute; left: 722px; top: 18px; width: 250px; height: 130px; background: white; padding: 14px 20px 5px 20px; -webkit-box-shadow: 0px 0px 6px 3px rgba(0,0,0,0.09);
                          -moz-box-shadow: 0px 0px 6px 3px rgba(0,0,0,0.09);
                          box-shadow: 0px 0px 6px 3px rgba(0,0,0,0.09);">
                          <v-radio-group v-model="publicProfile">
                            <v-radio label="Perfil Publico" :value="true"></v-radio>
                            <v-radio label="Perfil Privado" :value="false"></v-radio>
                          </v-radio-group>
                          <hr style=" border-top: 0.3px solid #ececec; width: 250px; margin-left: -20px; margin-top: -16px">
                          <div style="display: flex; padding-left: 62px; padding-top: 8px;">
                            <div style="margin-right: 10px"><button @click="publicProfile = isPublicProfile; changeProfileStatus=false" type="button" style="outline: none; font-weight: bold; font-size: 13px">CANCELAR</button></div>
                            <div><button type="button" @click="publish(); changeProfileStatus = false"  style="outline: none; font-weight: bold; font-size: 13px; color: #207bc1; background: transparent">GUARDAR</button></div>
                          </div>
                      </div>        
                  </transition>          
                </v-layout>
                <v-layout @click="exit()" class="subheading" style="cursor: pointer; margin-top: 6px;"> <!--38% margin left-->
                    <v-flex>
                        <div style="position: absolute; right: 50px;">
                            <span style="color: #207bc1">Salir del editor</span>
                            <v-icon small class="mr-2" style="font-size: 20px; margin-left: 15px;">fas fa-user-circle</v-icon>
                        </div>
                    </v-flex>
                </v-layout>
        </v-toolbar-items>
        <v-spacer></v-spacer>
    </v-toolbar>
    <v-toolbar v-if="$vuetify.breakpoint.smAndDown " dense class="elevation-0" style="height: 75px;background: white; border-bottom: 2px solid #cecece; z-index: 5">
        <v-toolbar-items style="margin-top: 35px; width: 100%; display: flex; justify-content: space-between;">
          <div class="subheading grey--text text--darken-3" style="cursor: pointer; margin-left: 15px;">
            <span @click="$router.push('/')" style="font-size: 20px">Yes Them</span>
          </div>
          <div @click.stop="drawerEdit = !drawerEdit" style="margin-top: 5px; margin-right: 20px; cursor: pointer;">
            <v-icon style="font-size: 20px; color: black;">fas fa-bars</v-icon>
          </div>
        </v-toolbar-items>
        <v-spacer></v-spacer>
    </v-toolbar>    
    <v-navigation-drawer
      v-model="drawerEdit"
      absolute
      temporary
      style="background-color: rgb(249, 249, 249)"
    >
      <div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start; padding: 20px">
        <div style="margin: 20px">
          <router-link :to="'/' + currentUser.identifier + '/edit/about'" style="color: #2d3e4f; text-decoration: none; font-size: 20px; font-weight: bold;">Acerca De</router-link>
        </div>
        <div style="margin: 20px">
            <router-link v-if="editing != 'services'" :to="'/' + currentUser.identifier + '/edit/services'" style="color: #2d3e4f; text-decoration: none; font-size: 20px; font-weight: bold;">Servicios</router-link>
            <span @click="goToServices();" v-if="editing === 'services'" style="color: #2d3e4f; font-size: 20px; font-weight: bold;">Servicios</span>          
        </div>
        <div style="margin: 20px">
          <span style="color: #2d3e4f; font-size: 20px; font-weight: bold;">Perfil YesThem</span>
        </div>
        <div style="margin: 20px">
          <span style="color: #2d3e4f; font-size: 20px; font-weight: bold;">Marketing</span>
        </div>
        <div style="margin: 20px">
          <span style="color: #2d3e4f; font-size: 20px; font-weight: bold;">Ayuda</span>
        </div>
      </div>
    </v-navigation-drawer>
    <v-flex xs12 :class="ats('', '=', 'py-1')" style="height: 100%">
        <v-layout row wrap :style="`margin-bottom: ${moreScrollHeight ? '150px' : '425px'}`">
            <!-- <v-spacer class="hidden-md-and-down"></v-spacer> -->
            <v-flex xs12 md12>
                <v-layout column fill-height>
                    <v-flex xs12 style="margin-top: 0px;">
                      <v-layout row wrap fill-height style="margin-bottom: 30px;">
                          <v-flex v-if="editing === 'about'" :class="ats('xs3 md3', '=', 'xs2 md2')" :style="ats('border-right: 1px solid #d5e3e4; text-align: left; height: 100%; background: rgb(242, 246, 249); padding: 15px 15px 15px 15px;', '=', 'border-right: 1px solid #d5e3e4; text-align: left; height: 100vh; background: rgb(242, 246, 249); padding: 15px 15px 15px 15px;')">
                            <div @click="images = false"><span class="sideMenuEdit" :style="images ? 'font-weight: 400' : 'font-weight: bold;'"><span class='sideMenuEdit'>Acerca De</span></span></div>
                            <br/>
                            <div @click="images = true"><span class="sideMenuEdit" :style="images ? 'font-weight: bold' : 'font-weight: 400;'"><span class='sideMenuEdit'>Imagenes</span></span></div>
                          </v-flex>                        
                          <v-flex :xs9="editing === 'about'" :xs12="editing === 'services'" :md8="editing!=='settings'" :md12="editing === 'services'" style="margin-botom: 40px">
                              <About ref="about" :images="images" :editing="editing" v-show="editing === 'about'" @reload="reload($event)"></About>
                              <Solutions ref="solutions" v-show="editing === 'services'" @dispatchAnalysis="dispatchAnalysis($event)" @reload="reload($event)" @create="solution.create = $event" @open="solution.open = $event" @part="solution.part = $event" @mouseOverActionKey="mouseOverActionKey($event)" @mouseLeaveActionKey="mouseLeaveActionKey($event)"></Solutions>
                              <HappyClients ref="happyclients" v-show="editing === 'happyclients'" @reload="reload($event)"></HappyClients>
                              <Thanks ref="thanks" v-show="editing === 'thanks'" @reload="reload($event)"></Thanks>
                              <Settings v-show="editing === 'settings'"></Settings>
                          </v-flex>
                          <v-flex class="ats('xs12 md12', '=', 'xs2 md2')" v-if="editing === 'about'" >
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
import Dropdown from 'bp-vuejs-dropdown';
export default {
  name: 'home',
  components: {
    About, Solutions, HappyClients, Thanks, Settings, Dropdown
  },
  data () {
    return {
      drawerEdit: false,
      moreScrollHeight: false,
      isPublicProfile: false,
      publicProfile: false,
      changeProfileStatus: false,
      privateProfile: true,
      images: false,
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

    dispatchAnalysis(status) {
      this.changeProfileStatus = false
      if(status) {
        this.moreScrollHeight = true
      } else {
        this.moreScrollHeight = false
      }
    },

    goToServices() {
      window.location.reload(true)
    },

    mouseOverActionKey (key) {
      this.solution.type = key;
    },

    mouseLeaveActionKey(key) {
      this.solution.type = 0;
    },

    onScroll (e) {
      // this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
      // let headerOffset = this.$refs.solutions.offsetTop ? this.$refs.solutions.offsetTop : 0
      // this.$nextTick( () => {
      //   if (this.offsetTop > headerOffset && this.editing === 'services') {
      //     let move = this.offsetTop <= (this.$refs.solutions.$el.clientHeight - this.$refs.movingBox.$el.clientHeight) ? this.offsetTop : (this.$refs.solutions.$el.clientHeight - this.$refs.movingBox.$el.clientHeight)
      //         move = move < 0 ? 0 : move
      //     this.$refs.movingBox.$el.style.transform = 'translateY(' + move + 'px)'
      //   } else {
      //     // this.sticky = false
      //   }
      // })
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
          await this.$store.dispatch('auth/reload')
          await this.$store.dispatch('company/populate', this.currentUser.identifier)
      }
      if (event.redirect === true) {
          this.$router.push('/' + this.currentUser.identifier + '/edit/' + event.to)
      }
    },


    async publish () {
      const response = await this.$store.dispatch('company/publish');
      await this.$store.dispatch('company/populate', this.currentUser.identifier);
      if(this.getCompanyData.published) {
        this.isPublicProfile = true;
        this.publicProfile = true;
      } else {
        this.isPublicProfile = false;
        this.publicProfile = false;      
      }      
      // let response = await this.$store.dispatch('company/publish')
      // if (response.success === true) {
      //   if (this.getCompanyData.published)
      //     this.$router.push('/' + this.currentUser.identifier + '?published=false')
      //   else
      //     this.$router.push('/' + this.currentUser.identifier + '?published=true')
      // }
    },

    async exit () {
      if(this.$route.params.editing == 'about') {
        let response = await this.$refs.about.save(true, 'out')
        if (response === true) {
            await this.$store.dispatch('auth/reload')
            window.location.href = `http://yesthem.com/${this.getCompanyData.identifier}`
        } else {}
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
    if(this.getCompanyData.published) {
      this.isPublicProfile = true;
      this.publicProfile = true;
    } else {
      this.isPublicProfile = false;
      this.publicProfile = false;      
    }
    console.log('Published', this.getCompanyData.published)
  },
  async beforeUpdate() {
  },
  async beforeRouteUpdate (to, from, next) {
    await this.$store.dispatch('company/populate', this.currentUser.identifier) 
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
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
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

.colorChange:hover {
    color: #296761 !important;
    font-weight: bold
}

.selected-tab {
  color: white !important;
  background-color: #B3BEC0 !important;
}

.v-toolbar__content {
  height: 75px !important
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

.sideMenuEdit:hover {
  cursor: pointer;
  font-weight: bold;
}

.my-class {
  margin-top: -50px;
  margin-left: 35px;
}

.my-class-bp__btn {
  background: transparent;
  border: none
}

.my-class-bp__btn--active {
  background: transparent;
}

.my-class-bp__body {
  cursor: pointer;
  width: 100px; 
  /* padding: 2rem;  */
  font-size: 16px;
}
</style>
