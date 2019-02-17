<template>
  <v-dialog
    v-model="show"
    persistent
    scrollable
    lazy
    max-width="700px"
    style="z-index: 9999"
    :fullscreen="$vuetify.breakpoint.smAndDown"
  >
  <v-card v-if="!thanks" class="pa-0">
    <v-card-title :style="ats('max-height: 72px; border-bottom: 4px solid #eeeeee;', '=', 'border-bottom: 1px solid #e3e3e3')" :class="ats('text-xs-left', '=', 'pl-5 text-xs-left')">
      <v-layout :class="ats('row wrap', '=', '')">
        <v-flex xs11>
          <span :class="ats('grey--text text--darken-2 font-weight-bold', '=', 'title')">Selecciona los resultados que te ayudaron   <v-progress-circular class="mx-3" color="button" v-show="status.loading" indeterminate></v-progress-circular></span>
        </v-flex>
        <v-flex xs1 text-xs-right>
          <v-icon :color="$vuetify.breakpoint.smAndDown? 'black': 'grey darken-1'" style="cursor: pointer;" :disabled="status.loading" @click="show = false; thanks = false; $emit('enable-sticky');">close</v-icon>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-card-text class="px-3">
      <v-layout column fill-height px-3>
        <v-flex v-if="!getStatus.loading && solution.benefits.length > 0" v-for="(benefit, index) in solution.benefits" text-xs-left class="py-3 font-weight-bold" :style="index === solution.benefits.length - 1 ? '' : 'border-bottom: 1px solid #e3e3e3'">
          <div>
            <v-layout child-flex>
              <v-flex style="max-width: 66px">
                <v-btn :style="ats('height: 26px; width: 26px', '=', 'height: 40px; width: 40px')" fab outline :color="isSelected(benefit) ? 'blue darken-1' : 'grey lighten-1'" :disabled="status.loading" @click="isSelected(benefit) ? remove(benefit) : select(benefit)" class="ml-2 mr-3 my-0">
                  <v-icon :color="isSelected(benefit) ? 'blue darken-1' : 'grey lighten-1'">add</v-icon>
                </v-btn>
              </v-flex>
              <v-flex>
                <div :class="isSelected(benefit) ? ats('title blue--text text--darken-1', '=', '') : ats('title', '=', '')">{{benefit.description}}</div>
                <div class="caption mt-2 font-weight-bold grey--text text--darken-1"><span class="font-weight-bold">{{benefit.validations.length}} <img style="vertical-align: text-bottom" src="/static/images/smile.png"> Recomendaciones</span></div>
              </v-flex>
            </v-layout>
          </div>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions class="pb-3 px-3">
      <v-layout row wrap fill-height>
        <v-flex xs12 text-xs-right>
          <v-layout row wrap>
            <v-flex order-xs2 order-md1 xs12 md10>
              <v-alert class="pa-1 px-4 my-0" v-if="status.error" color="error" icon="warning" value="true">{{status.message}}</v-alert>
            </v-flex>
            <!-- <v-spacer class="hidden-md-and-down"></v-spacer> -->
            <v-flex order-xs1 order-md2 xs12 md2 :class="ats('text-xs-center', '=', 'text-xs-right pr-3')">
              <v-btn depressed class="white--text font-weight-bold" color="green_button" :disabled="status.loading" @click="validate()">Enviar</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card-actions>
  </v-card>
  <v-card v-if="thanks" class="pa-0 blue accent-2 white--text" style="z-index: 9999">
    <v-card-title style="border-bottom: 2px solid white !important; max-height: 72px" :class="$vuetify.breakpoint.smAndDown? 'blue accent-2 pl-3' : 'pl-5'" text-xs-left>
      <v-layout :class="ats('row wrap', '=', '')">
        <v-flex xs11>
          <span :class="$vuetify.breakpoint.smAndDown? 'white--text title font-weight-bold' : 'white--text headline'">Gracias en nombre de {{getCompanyData.name}}</span>
        </v-flex>
        <v-flex xs1 text-xs-right>
          <v-icon :color="$vuetify.breakpoint.smAndDown? 'white': 'white'" style="cursor: pointer;" :disabled="status.loading" @click="show = false; thanks = false; $emit('enable-sticky');">close</v-icon>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-card-text class="py-3 px-5 font-weight-bold text-xs-left" style="min-height: 300px">
      {{getCompanyData.thanks}}
    </v-card-text>
    <v-card-actions class="pb-3 px-3">
      <v-spacer></v-spacer>
      <v-btn dark :right="ats(false, false, true)" depressed color="white" class="blue--text text--accent-2 font-weight-bold" @click="show = false; thanks = false; $emit('enable-sticky');">Cerrar</v-btn>
      <v-spacer class="hidden-md-and-up"></v-spacer>
    </v-card-actions>
  </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['solution', 'linkedin'],
  components: {},
  data () {
    return {
        show: false,
        help: [],
        selectedBenefits: [],
        status: {
          loading: false,
          error: false,
          message: ''
        },
        thanks: false,
        benefitRules: [
          (v) => !!v || 'Este campo no puede estar vacío!',
          (v) => (v && v.length >= 1 && v.length <= 72) || 'La descripción debe tener menos de 72 caracteres!'
        ]
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn', 'currentUser']),
    ...mapGetters('company', ['getCompanyData', 'getStatus', 'setStatus', 'getSolutions', 'getExperiences', 'getTotalValidations'])
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

    open () {
      this.show = true
      this.$emit('disable-sticky')
      this.getValidated()
    },

    reloadToken () {
      this.linkedin.User.refresh()
      setTimeout(() => { 
        this.getValidated()
      }, 3000)
    },

    getValidated () {
      this.status.loading = true
      this.status.error = false
      this.status.message = ''
      let selected = []
      let solution = this.solution

      IN.API.Raw('people/~:(id,first-name,last-name,headline,industry,positions,picture-url)?format=json').method('GET').result(function (response) {
        for (let i = 0, len = solution.benefits.length; i < len; i++) {
          if (solution.benefits[i].validations.some(user => user.id.toString() === response.id.toString())) {
            selected.push(solution.benefits[i])
          }
        }
        this.selectedBenefits = selected
        this.status.loading = false
        this.status.error = false
        this.status.message = ''
      }, this).error(function (response) {
        console.log(response)
        if(response.errorCode === 0) {
          this.reloadToken()
        } else {
          this.status.loading = false
          this.status.error = true
          this.status.message = 'There was an error fetching your validated benefits. Please try again later.'
        }
      }, this)
    },

    select (benefit) {
      this.selectedBenefits.push(benefit)
    },

    remove (benefit) {
      this.selectedBenefits = this.selectedBenefits.filter( iBenefit => iBenefit._id !== benefit._id )
    },

    isSelected (benefit) {
      return _.find(this.selectedBenefits, { '_id': benefit._id }) ? true : false
    },

    validate () {
      this.status.loading = true
      this.status.error = false
      this.status.message = ''
      if (this.linkedin.User.isAuthorized()) {
        this.linkedin.API.Raw('people/~:(id,first-name,last-name,headline,industry,positions,picture-url)?format=json').method('GET').result(async function (response) {
          let data = await this.$store.dispatch('company/validate', { linkedin: response, solution: this.solution._id, benefits: this.selectedBenefits })
          if (data.success === true) {
            await this.$store.dispatch('company/populate', { identifier: this.$route.params.identifier, silent: true })
            this.status.loading = false
            this.status.error = false
            this.status.message = ''
            this.thanks = true
            // this.show = false
            // this.$emit('snackbar', { error: false, message: 'Benefits validated successfully. Thank you for your input.' })
          } else {
            this.status.loading = false
            this.status.error = false
            this.status.message = ''
            this.$emit('snackbar', { error: true, message: 'Unfortunately we couldn\'t process your validations properly. Please try again later.' })
          }
        }, this).error( function () {
          this.status.loading = false
          this.status.error = true
          this.status.message = 'There was an error processing your validations. Please try again later.'
        }, this)
      } else {
        this.show = false
        this.$emit('snackbar', { error: true, message: 'Your account must be verified so you can validate benefits.' })
      }
    }
  },
  created: function () {
    // this.$store.dispatch('company/populate', this.$route.params.identifier)
  }
}
</script>

<style scoped>
.v-stepper--alt-labels .v-stepper__step {
    flex-basis: 175px !important;
}

.v-stepper__label {
    font-size: 12px !important;
    font-weight: bold;
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

.underline:hover {
    text-decoration: underline;
}

.v-textarea.v-text-field--box .v-text-field__prefix, .v-textarea.v-text-field--box textarea, .v-textarea.v-text-field--enclosed .v-text-field__prefix, .v-textarea.v-text-field--enclosed textarea {
  margin-top: 12px !important;
}
</style>
