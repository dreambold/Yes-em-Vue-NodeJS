<template>
  <v-dialog
    v-model="show"
    persistent
    scrollable
    lazy
    max-width="900px"
    :fullscreen="$vuetify.breakpoint.smAndDown"
  >
  <v-card class="pa-0">
    <v-card-title style="border-bottom: 1px solid #e3e3e3; max-height: 65px" :class="$vuetify.breakpoint.smAndDown? 'white' : ''">
      <v-icon class="hidden-md-and-up" :color="$vuetify.breakpoint.smAndDown? 'button': 'grey darken-1'" style="cursor: pointer;" @click="show = false">fas fa-arrow-left</v-icon>
      <v-spacer></v-spacer>
      <span :class="$vuetify.breakpoint.smAndDown? 'body-2 font-weight-bold' : 'headline'">Añade resultados</span>
      <v-spacer></v-spacer>
      <v-icon class="hidden-sm-and-down" :color="$vuetify.breakpoint.smAndDown? 'white': 'grey darken-1'" style="cursor: pointer;" @click="show = false">close</v-icon>
    </v-card-title>
    <v-card-text class="pa-0">
      <v-layout row wrap fill-height>
        <v-flex xs2 sm1 md1 class="grey lighten-4">
          <v-stepper class="transparent elevation-0" vertical>

            <template v-for="(benefit, index) in benefitsToAdd">
              <v-stepper-step color="grey lighten-2" class="px-0" :style="ats('margin-left: 45%', '=', 'margin-left: 45%')"></v-stepper-step>
              <div v-bind:key="index" v-if="(index + 1) !== benefitsToAdd.length" :style="ats('padding-bottom: 110px !important; border-right: 3px solid #DDDDDD !important; width: 15px !important; margin-left: 45%', '=', 'padding-bottom: 90px !important; border-right: 3px solid #DDDDDD !important; width: 15px !important; margin-left: 45%')"></div>
            </template>

          </v-stepper>
        </v-flex>
        <v-flex xs10 sm11 md7 class="grey lighten-4">
          <v-form ref="benefitsForm" v-model="valid">
            <div v-for="(benefit, index) in benefitsToAdd" v-bind:key="index" class="pa-3 pr-4">
              <v-textarea
                v-model="benefit.description"
                :rules="benefitRules"
                maxlength="72"
                :rows="ats(4, 4, 2)"
                row-height="24"
                color="grey darken-3"
                style="background-color: white"
                class="body-1"
                outline
                no-resize
                hide-details
              ></v-textarea>
              <v-layout row wrap px-2>
                <v-flex text-xs-left>
                  <span class="caption grey--text text--darken-1 pt-1">11 palabras / 72 caracteres</span>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex text-xs-right pr-2>
                  <v-icon right small color="grey lighten-1" style="cursor: pointer" @click="benefitsToAdd.length > 1 ?  benefitsToAdd.splice(index, 1) : null">delete</v-icon>
                </v-flex>
              </v-layout>
            </div>
          </v-form>
        </v-flex>
        <v-flex xs12 md4 class="pa-4 grey--text text--darken-3">
          <div style="text-align: justify" class="caption">
              Explica por qué tu solución fue útil para cada uno de los clientes a los que has ayudado.
          </div>
          <div style="text-align: justify" class="caption pt-2">
              Algunos aspectos en los que te puedes centrar.
          </div>
          <div class="caption pt-2" style="max-height: 250px; overflow-y: scroll; overflow-x: hidden">
            <v-expansion-panel>
              <v-expansion-panel-content
                v-for="(item,i) in help"
                :key="i"
                expand-icon="keyboard_arrow_down"
              >
                <div slot="header">{{item.title}}</div>
                <v-card>
                  <v-card-text>
                    <div v-for="(question, j) in item.questions" class="caption" v-bind:key="j">- {{question.text}}</div>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </div>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions class="pb-3 px-3">
      <v-layout row wrap fill-height>
        <v-flex xs12 md8 text-xs-right>
          <v-layout row wrap>
            <v-flex>
              <v-alert class="pa-1 px-4 my-0" v-if="status.error" color="error" icon="warning" value="true">{{status.message}}</v-alert>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex>
              <v-btn small :right="ats(true, true, false)" fab outline :disabled="benefitsToAdd.length === 10" color="grey lighten-1" @click="addBenefit()" class="mx-4"><v-icon color="grey lighten-1">add</v-icon></v-btn>
              <v-btn right depressed :class="ats('px-5 mx-2', '=', 'px-5 mx-2')"  color="primary" @click.native.stop="save()">Guardar</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs4 class="hidden-sm-and-down"></v-flex>
      </v-layout>
    </v-card-actions>
  </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {},
  data () {
    return {
        show: false,
        valid: false,
        help: [
          {title: 'Ahorro de tiempo', questions: [
              {text: '¿En qué aspectos has ahorrado tiempo?'},
              {text: '¿Cuánto era el tiempo antes y cuanto ahora?'},
              {text: 'Hace más trabajo con menos recursos'}
          ]},
          {title: 'Productividad', questions: [
              {text: '¿Hay reducciones o aumentos en métricas importantes?'},
              {text: '¿Encuentran o hacen algo más rápido ahora que antes?'}
          ]},
          {title: 'Ventas / Marketing', questions: [
              {text: '¿En qué ha mejorado su ventaja competitiva?'},
              {text: '¿Incrementos o mejoras?'}
          ]},
          {title: 'Gestión', questions: [
              {text: '¿Mejoras en la gestión de los empleados?'},
              {text: '¿Cambios en la gestión de la organización?'}
          ]},
          {title: 'Servicio al cliente', questions: [
              {text: '¿Se resuelven los problemas más rápido que antes?'}
          ]},
          {title: 'Seguridad', questions: [
              {text: '¿Se producen menos eventos relacionados con la seguridad?'}
          ]},
          {title: 'Compliance', questions: [
              {text: '¿Se cumple mejor con los requisitos regulatorios?'}
          ]},
          {title: 'Finanzas', questions: [
              {text: '¿Que costes se eliminaron?'}
          ]},
          {title: 'Entrega', questions: [
              {text: '¿Se cumplió el tiempo y plazo del proyecto?'}
          ]},
          {title: 'Futuro', questions: [
              {text: '¿Cuales eran algunos de los objetivos del cliente que se han cumplido?'}
          ]},
          {title: 'Varias', questions: [
              {text: '¿Por qué eligio el cliente tu solución?'},
              {text: '¿Ratio de implementación?'},
              {text: '¿Facilidad de integración con otros sistemas?'},
              {text: '¿Que ha permitido lograr tu solución?'},
              {text: '¿Qué problemas ha resuelto?'}
          ]},
        ],
        benefitsToAdd: [],
        status: {
          error: false,
          message: ''
        },
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

    initialize (benefits) {
      if (benefits.length == 0) {
        this.benefitsToAdd = [{ description: '' }]  
      } else {
        this.benefitsToAdd = benefits
      }
      this.show = true
    },

    addBenefit () {
      if (this.benefitsToAdd.length <= 10) {
        this.benefitsToAdd.push({ description: '' })
      }
    },

    save () {
      this.status.error = false
      this.status.message = ''

      if (this.$refs.benefitsForm.validate()) {
        console.log(this.benefitsToAdd)
        this.$emit('save', this.benefitsToAdd)
        this.show = false
      } else {
        this.status.error = true
        this.status.message = 'Make sure there are no empty fields.'
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
    border: 2px solid #DDDDDD;
}

.application .theme--light.v-stepper .v-stepper__step__step, .application .theme--light.v-stepper .v-stepper__step__step .v-icon, .theme--light .v-stepper .v-stepper__step__step, .theme--light .v-stepper .v-stepper__step__step .v-icon {
    color: transparent !important;
}

.v-stepper__step__step {
  min-height: 28px !important;
  min-width: 28px !important;
}

.v-stepper--vertical .v-stepper__step {
  padding-bottom: 5px !important;
  padding-top: 16px !important;
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
