<template>
<v-layout :class="ats('pa-0', '=', 'pa-5')" style="background-color: #D5E3E4 !important; height: 100%">
    <v-flex :class="ats('white', '=', '')" :style="ats('margin-top: 60px', '=', '')">
        <v-stepper v-model="stepper" alt-labels class="elevation-0 no-transition">
            <v-layout row wrap :class="ats('shadowed', '=', '')" style="background-color: #D5E3E4">
                <v-spacer class="hidden-md-and-down"></v-spacer>
                <v-flex xs12 md7>
                    <v-layout row wrap>
                        <v-flex xs12 md8>
                          <v-stepper-header v-show="stepper !== 1" class="elevation-0 noselect" :style="ats('margin-left: 0px', '=', 'margin-left: -50px')">
                            <v-stepper-step :complete="stepper > 1" step="1" complete-icon="" color="blue darken-3">Únete</v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step :complete="stepper > 2" step="2" complete-icon="" color="blue darken-3">Empresa</v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step :complete="stepper > 3" step="3" complete-icon="" color="blue darken-3">Especialización</v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step step="4" complete-icon="" color="blue darken-3">Experiencia</v-stepper-step>
                          </v-stepper-header>
                        </v-flex>
                        <v-spacer></v-spacer>
                        <v-flex class="hidden-md-and-down" xs2 v-show="stepper !== 1" pt-4 text-xs-right>
                            <v-btn small depressed class="mx-1" color="white" style="min-width: 35px; height: 38px" @click="stepper === 1 ? stepper : stepper--" :disabled="stepper === 1"><v-icon small>fas fa-arrow-left</v-icon></v-btn>
                            <v-btn small depressed class="mx-1" color="white" style="min-width: 35px; height: 38px" @click="stepper === 4 ? stepper : stepper++" :disabled="stepper === 4 || valid2 === false || valid3 === false || user.commercialName === ''"><v-icon small>fas fa-arrow-right</v-icon></v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-spacer class="hidden-md-and-down"></v-spacer>
            </v-layout>
            <v-stepper-items>

                <v-stepper-content step="1" class="pa-0">
                    <Unete @nextstepper="stepper = 2; setData($event)" @valid="valid1 = $event"/>
                </v-stepper-content>

                <v-stepper-content step="2" class="pa-0">
                    <NombreComercial :style="ats('', '=', 'min-height: 572px')" @nextstepper="stepper = 3; user.commercialName = $event.commercialName" @valid="valid2 = $event"/>
                </v-stepper-content>

                <v-stepper-content step="3" class="pa-0">
                    <Especializacion :style="ats('', '=', 'min-height: 572px')" @nextstepper="stepper = 4; user.specialization = $event.specialization" @valid="valid3 = $event"/>
                </v-stepper-content>

                <v-stepper-content step="4" class="pa-0">
                    <Experiencia :style="ats('', '=', 'min-height: 572px')" :status="status" @valid="valid4 = $event" @register="user.description = $event.description; register()"/>
                </v-stepper-content>

            </v-stepper-items>
        </v-stepper>
    </v-flex>
</v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

import Unete from '@/components/Unete.vue'
import NombreComercial from '@/components/NombreComercial.vue'
import Experiencia from '@/components/Experiencia.vue'
import Especializacion from '@/components/Especializacion.vue'

export default {
  name: 'home',
  components: {
    Unete, NombreComercial, Experiencia, Especializacion
  },
  data () {
    return {
        stepper: 1,
        valid1: false,
        valid2: false,
        valid3: false,
        valid4: false,
        user: {
            name: '',
            email: '',
            password: '',
            commercialName: '',
            description: '',
            specialization: ''
        },
        status: {
            loading: false,
            error: false,
            message: ''
        }
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn', 'currentUser'])
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

    setData (user) {
        this.user.name = user.name
        this.user.email = user.email
        this.user.password = user.password
    },

    async register () {
        this.status.loading = true
        this.status.error = false
        this.status.message = ''

        if (this.valid1 && this.valid2 && this.valid3 && this.valid4) {
            try {
              const response = await this.$store.dispatch('auth/register', this.user)
              if (response.success === true) {
                this.status.loading = false
                this.status.error = false
                this.status.message = ''
                this.$router.push('/' + this.currentUser.identifier)
              } else {
                this.status.loading = false
                this.status.error = true
                this.status.message = response.message
              }
            } catch (error) {
              this.status.loading = false
              this.status.error = true
              if (error.response) {
                this.status.message = error.response.data.message
              } else if (error.request) {
                this.status.message = 'No response received from the server. If the problem persists contact the admin.'
              } else {
                this.status.message = error.message
              }
            }            
        } else {
            this.status.error = true
            this.status.message = 'Please make sure to fill all the necessary information.'
        }
    }
  }
}
</script>

<style>
.v-stepper--alt-labels .v-stepper__step {
    flex-basis: 148px !important;
}

.v-stepper__label {
    font-size: 12px !important;
    font-weight: bold;
    display: block !important
}

.v-stepper--alt-labels .v-stepper__step__step {
    margin-right: 0;
    margin-bottom: 7px !important;
}

.application .theme--light.v-stepper .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error) .v-stepper__step__step, .theme--light .v-stepper .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error) .v-stepper__step__step {
    background: transparent !important;
    border: 1px solid grey;
}

.application .theme--light.v-stepper .v-stepper__step__step, .application .theme--light.v-stepper .v-stepper__step__step .v-icon, .theme--light .v-stepper .v-stepper__step__step, .theme--light .v-stepper .v-stepper__step__step .v-icon {
    color: transparent !important;
}

.v-stepper__step {
  padding-bottom: 15px !important;
}

.v-stepper__step__step {
    font-size: 12px;
    height: 16px !important;
    margin-right: 8px;
    min-width: 16px !important;
    width: 16px !important;
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

div.btn__content {
  padding: 0;
}

div.card__actions .btn {
  min-width: 0;
}

.shadowed {
  -moz-box-shadow:    inset 0 0 2px #BDBDBD;
  -webkit-box-shadow: inset 0 0 2px #BDBDBD;
  box-shadow:         inset 0 0 2px #BDBDBD;
}
</style>
