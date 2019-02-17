<template>
  <v-layout row wrap :style="ats('white', '=', 'background-color: #D5E3E4')">
      <v-spacer class="hidden-md-and-down"></v-spacer>
      <v-flex xs12 md4 :class="ats('', '=', '')">
        <div :class="ats('title font-weight-bold py-3', '=', 'headline font-weight-bold mb-3')" style="background-color: #D5E3E4">Activa tus clientes satisfechos</div>
        <v-layout column child-flex :class="ats('mb-3 white', '=', 'elevation-1 mb-3 white')">
          <v-flex pt-4 pb-2 blue-grey darken-4 white--text>
            <div class="title mb-2">¿Comenzamos?</div>
            <div class="body-1">Empieza ahora - es gratis</div>
          </v-flex>
          <div :class="ats('pa-0', '=', 'pa-4')">
              <v-flex :class="ats('px-3', '=', '')" :style="ats('background: linear-gradient(180deg, #263238 25%, #ffffff 0%)', 'background: linear-gradient(180deg, #263238 25%, #ffffff 0%)', '')">
                <!-- <v-btn
                  :small="ats(false, false, true)"
                  depressed
                  block
                  :class="ats('white--text my-0 font-weight-bold px-3', '=', 'white--text ma-0 font-weight-bold')"
                  color="button"
                  @click.native.stop="askForAccesModal = true"
                >
                  Solicita acceso
                </v-btn> -->
                <v-form class="white" ref="formProfile" v-model="valid">
                  <v-text-field
                    v-model="user.name"
                    label="Nombre"
                    :rules="nameRules"
                    maxlength="60"
                    required
                    :flat="ats(true, true, false)"
                    :solo="ats(true, true, false)"
                    :placeholder="ats('Nombre', 'Nombre', '')"
                    :style="ats('border: 1px solid #e3e3e3', '=', '')"
                    :hide-details="validation.name"
                    ref="nombre"
                    @input="blurName()"
                    
                  ></v-text-field>
                  <!-- :disabled="isDisabled" -->
                  <v-text-field
                    v-model="user.email"
                    label="E-mail"
                    :rules="confirmEmailRules"
                    maxlength="30"
                    required
                    :flat="ats(true, true, false)"
                    :solo="ats(true, true, false)"
                    :placeholder="ats('E-mail', 'E-mail', '')"
                    :style="ats('border: 1px solid #e3e3e3', '=', '')"
                    :hide-details="validation.email"
                    ref="email"
                    @input="blurEmail()"
                    
                  ></v-text-field>
                  <v-text-field
                    v-model="user.emailConfirm"
                    label="Confirma tu E-mail"
                    :rules="emailRules"
                    maxlength="30"
                    required
                    :flat="ats(true, true, false)"
                    :solo="ats(true, true, false)"
                    :placeholder="ats('Confirma tu E-mail', 'Confirma tu E-mail', '')"
                    :style="ats('border: 1px solid #e3e3e3', '=', '')"
                    :hide-details="validation.confirmEmail"
                    ref="confirmEmail"
                    @input="blurConfirmEmail()"
                    
                  ></v-text-field>
                  <v-text-field
                    v-model="user.password"
                    label="Contraseña"
                    maxlength="30"
                    :rules="passwordRules"
                    :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
                    @click:append="() => (hidePassword = !hidePassword)"
                    :type="hidePassword ? 'password' : 'text'"
                    required
                    :flat="ats(true, true, false)"
                    :solo="ats(true, true, false)"
                    :placeholder="ats('Contraseña', 'Contraseña', '')"
                    :style="ats('border: 1px solid #e3e3e3', '=', '')"
                    :hide-details="validation.password"
                    ref="password"
                    @input="blurPassword()"
                    
                  ></v-text-field>
                </v-form>
              </v-flex>
              <v-flex :class="ats('text-xs-left py-3 px-4 caption', '=', 'text-xs-left py-3 pb-4 caption')">
                Registrándote aceptas nuestros <span class="blue--text text--darken-3 font-weight-bold">Términos, Política de Privacidad y Uso de Cookies</span>
              </v-flex>
              <v-flex :class="ats('px-3', '=', '')">
                <!-- <v-btn
                  :small="ats(false, false, true)"
                  depressed
                  block
                  :class="ats('white--text my-0 font-weight-bold px-3', '=', 'white--text ma-0 font-weight-bold')"
                  color="button"
                  :disabled="!valid"
                  @click.native.stop="nextStep"
                >
                  Únete
                </v-btn> -->
                <v-btn
                  :small="ats(false, false, true)"
                  depressed
                  block
                  :class="ats('white--text my-0 font-weight-bold px-3', '=', 'white--text ma-0 font-weight-bold')"
                  color="button"
                  @click.native.stop="nextStep"
                >
                  Únete
                </v-btn>
              </v-flex>
          </div>
          <v-dialog
            v-model="askForAccesModal"
            persistent
            scrollable
            lazy
            max-width="700px"
            style="z-index: 9999"
            :fullscreen="$vuetify.breakpoint.smAndDown"
          >
            <v-card>
              <v-card-title :style="ats('max-height: 72px; border-bottom: 4px solid #eeeeee;', '=', 'border-bottom: 1px solid #e3e3e3')" :class="ats('text-xs-left', '=', 'text-xs-left px-4')">
                <span :class="ats('grey--text text--darken-2 font-weight-bold', '=', 'title')">Solicita acceso</span>
                <v-spacer></v-spacer>
                <v-icon :color="$vuetify.breakpoint.smAndDown? 'black': 'grey darken-1'" style="cursor: pointer;" @click="askForAccesModal = false">close</v-icon>
              </v-card-title>
              <v-card-text>
                <v-form class="white" ref="formAskForAccess" v-model="valid" encType="multipart/form-data">
                  <v-layout row wrap>
                    <v-flex xs12 px-3>
                      <v-text-field
                        v-model="askForAccess.name"
                        label="Nombre completo"
                        :rules="nameRules"
                        maxlength="60"
                        required
                        :flat="ats(true, true, false)"
                        :solo="ats(true, true, false)"
                        :placeholder="ats('Nombre completo', 'Nombre completo', '')"
                        :style="ats('border: 1px solid #e3e3e3', '=', '')"
                        color="button"
                        :disabled="status.loading"
                        :hide-details="ats(true, true, false)"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 px-3>
                      <v-text-field
                        v-model="askForAccess.email"
                        label="Email"
                        maxlength="30"
                        :flat="ats(true, true, false)"
                        :solo="ats(true, true, false)"
                        :placeholder="ats('Email', 'Email', '')"
                        :style="ats('border: 1px solid #e3e3e3', '=', '')"
                        color="button"
                        :disabled="status.loading"
                        :hide-details="ats(true, true, false)"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 px-3>
                      <v-text-field
                        v-model="askForAccess.phone"
                        label="Teléfono"
                        maxlength="30"
                        :flat="ats(true, true, false)"
                        :solo="ats(true, true, false)"
                        :placeholder="ats('Teléfono', 'Teléfono', '')"
                        :style="ats('border: 1px solid #e3e3e3', '=', '')"
                        color="button"
                        :disabled="status.loading"
                        :hide-details="ats(true, true, false)"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-card-text>
              <v-card-actions class="px-3 pb-3">
                <v-layout layout row wrap fill-height justify-center align-center>
                  <v-flex text-xs-left xs9>
                    <v-alert outline v-if="status.message" class="px-3 py-1 font-weight-bold" :color="status.error ? 'error' : 'success'" :icon="status.error ? 'warning' : 'check'" value="true">{{status.message}}</v-alert>
                  </v-flex>
                  <v-flex text-xs-right xs3>
                    <v-btn right depressed class="font-weight-bold squared white--text" color="button" :loading="status.loading" :disabled="status.loading" @click.native.stop="askForAccessFn">Enviar</v-btn>
                  </v-flex>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
      </v-flex>
      <v-spacer class="hidden-md-and-down"></v-spacer>
  </v-layout>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      askForAccesModal: false,
      isDisabled: true,
      hidePassword: true,
      valid: false,
      askForAccess: {
        name: '',
        email: '',
        phone: ''
      },
      user: {
        name: '',
        email: '',
        emailConfirm: '',
        password: '',
      },
      validation: {
        name: true,
        email: true,
        confirmEmail: true,
        password: true
      },
      nameRules: [
        (v) => !!v || 'El nombre es requerido!',
        (v) => (v && v.length >= 3 && v.length <= 60) || 'El nombre debe tener entre 3 y 60 caracteres.'
      ],
      emailRules: [
        (v) => !!v || 'El e-mail debe ser válido.',
        (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid.'
      ],
      confirmEmailRules: [
        (v) => !!v || 'El e-mail debe ser válido.',
        (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid.',
        (v) => v == this.user.email || 'E-mail must match'
      ],
      passwordRules: [
        (v) => (!!v && v.length >= 3 && v.length <= 30) || 'La contraseña es requerida y debe tener entre 3 y 30 caracteres.'
      ],
      status: {
        loading: false,
        error: false,
        message: ''
      }
    }
  },
  watch: {
    valid: function () {
      this.$emit('valid', this.valid)
    }
  },
  computed: {},
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

    nextStep() {
      if (this.$refs.formProfile.validate()) {
        this.$emit('nextstepper', this.user)
      }
    },

    blurName () {
      this.validation.name = this.$refs.nombre.validate()
    },

    blurEmail () {
      this.validation.email = this.$refs.email.validate()
    },

    blurConfirmEmail () {
      this.validation.confirmEmail = this.$refs.confirmEmail.validate()
    },

    blurPassword () {
      this.validation.password = this.$refs.password.validate()
    },

    async askForAccessFn () {
      if (this.$refs.formAskForAccess.validate()) {
        this.status.loading = true
        this.status.error = false
        this.status.message = ''
        try {
          let response = await axios.post('/api/user/askForAccess', { askForAccess: this.askForAccess })

          this.isDisabled = response.data.pending
          this.status.loading = false
          this.status.error = false
          this.status.message = 'Se envió un correo con tu solicitud al administrador de Yes Them. Gracias.'
          this.askForAccesModal = response.data.pending
          this.askForAccess.name = ''
          this.askForAccess.email = ''
          this.askForAccess.phone = ''
        } catch (error) {
          let message = ''
          if (error.response) {
            message = error.response.data.message
          } else if (error.request) {
            message = 'No response received from the server. If the problem persists contact the site administrator (' + error.message + ')'
          } else {
            message = error.message
          }
          this.status.loading = false
          this.status.error = true
          this.status.message = message
        }
      } else {
        this.status.loading = false
        this.status.error = true
        this.status.message = 'El nombre es requerido.'
      }
    }
  },
  beforeMount: function () {},
  created: function () {},
  mounted: function () {}
}
</script>

<style>
.no-transition .stepper__content { transition: none; }

.terminosdeuso .v-label { font-size: 12px !important; }
</style>
