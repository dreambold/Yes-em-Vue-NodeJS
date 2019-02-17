<template>
    <div style="text-align: left; background-image: url(/static/images/bg.png); background-size: cover; background-position: center; background-repeat: no-repeat; width: 100% !important; height: 100% !important;">

      <div style="display: flex; width: 100%; height: 70px; padding: 20px; border-bottom: 1px solid rgba(185, 185, 185, 0.26);">
        <div style="width: 74%">
           <span>YES THEM LOGO</span>
        </div>
        <div style="display: flex">
            <div style="cursor: pointer; margin-right: 15px; padding: 5px 6px 5px 6px; border-radius: 50%; background: #aecb95;"><span><v-icon style="font-size: 18px; color: rgb(0, 27, 65);">fab fa-twitter</v-icon></span></div>
            <div style="cursor: pointer; margin-right: 15px; background: #aecb95; padding: 5px 11px 5px 11px; border-radius: 50%;"><span><v-icon style="font-size: 18px; color: rgb(0, 27, 65);">fab fa-facebook-f</v-icon></span></div>
            <div style="cursor: pointer; margin-right: 15px; background: #aecb95; padding: 5px 7px 5px 7px; border-radius: 50%;"><span><v-icon style="font-size: 20px; color: rgb(0, 27, 65);">fab fa-instagram</v-icon></span></div>
        </div>
      </div>

      <div style="display: flex;">
        <div class="construction-content">
          <div>
            <span class="first-title">Demuestra</span>
          </div>
          <div style="margin-top: -12px">
            <span class="second-title">Como Ayudas a tus Clientes</span>
          </div>
          <div class="description-wrapper">
            <p class="description">
              Da de alta tus productos y servicios en tu perfil Yes Them. <br/>
              Encuesta a tus clientes sobre su experiencia. <br/>
              Publica tu expertise validado por los clientes con los que has trabajado
            </p>
          </div>
          <div>
            <button @click="goToRegister()" type="button" style="background: rgba(174, 203, 149, 0.67); border: none; outline: none; padding: 10px; border-radius: 5px">
              <span style="color: white; font-family: 'Poppins-bold'; font-size: 18px;">Demuestra tu Expertise</span>
            </button>
          </div>
        </div>
      </div>

      <div class="construction-footer-wrapper">
        <div class="construction-footer">
          <div style="margin-left: 0px; margin-right: 30px; cursor: pointer; color: white;"><span style="font-family: 'Poppins-regular'">Sobre Nosotros</span></div>
          <div style="margin-right: 30px; cursor: pointer; color: white;"><span style="font-family: 'Poppins-regular'">Unete al Equipo</span></div>
          <div style="margin-right: 30px; cursor: pointer; color: white;"><span style="font-family: 'Poppins-regular'">Politica de Privacidad</span></div>
          <div style="margin-right: 30px; cursor: pointer; color: white;"><span style="font-family: 'Poppins-regular'">Terminos de Uso</span></div>
        </div>
        <div>
          <span style="color: #aecb95; cursor: pointer; font-size: 16px; font-family: 'Poppins-regular'">Yes Them</span>
        </div>
      </div>

      <v-dialog
        v-model="askForAccesModal"
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
                    :rules="emailRules"
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

    </div>
</template>

<script> 
import axios from 'axios'
export default {
  data() {
    return {
      askForAccesModal: false,
      isDisabled: true,
      valid: false,      
      askForAccess: {
        name: '',
        email: '',
        phone: ''
      },
      status: {
        loading: false,
        error: false,
        message: ''
      },
      emailRules: [
        (v) => !!v || 'El e-mail debe ser válido.',
        (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid.'
      ],      
    }
  },
  watch: {
    valid: function () {
      this.$emit('valid', this.valid)
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

    goToRegister() {
      this.askForAccesModal = true
        // this.$router.push('/register')
    },

    async askForAccessFn () {
      if (this.$refs.formAskForAccess.validate()) {
        this.status.loading = true
        this.status.error = false
        this.status.message = ''
        try {
          let response = await axios.post('/api/user/askForAccess', { askForAccess: this.askForAccess })
          this.isDisabled = response.data.pending
          console.log('yesthemdell', this.isDisabled)
          this.status.loading = false
          this.status.error = false
          this.status.message = 'Se envió un correo con tu solicitud al administrador de Yes Them. Gracias.'
          this.askForAccesModal = response.data.pending
          this.askForAccess.name = ''
          this.askForAccess.email = ''
          this.askForAccess.phone = ''
          !this.isDisabled ? this.$router.push('/register') : false;
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

  }
}
</script>

<style scoped>

.construction-content {
  padding: 100px 0px 0px 150px
}

.first-title {
  color: white; font-size: 70px; font-family: 'Poppins-bold'
}

.second-title {
  color: white; font-size: 40px; font-family: 'Poppins-bold'
}

.description {
  font-family: 'Poppins-regular'; color: #aecb95; font-size: 18px
}

.description-wrapper {
  margin: 20px 0px 30px 0px
}

.construction-footer-wrapper {
  position: absolute; bottom: 0px; display: flex; width: 100%; padding: 20px; border-top: 2px solid rgba(185, 185, 185, 0.15);
}

.construction-footer {
  width: 85%; display: flex
}

@media (min-width: 768px) and (max-width: 1024px) {
  .construction-content {
    padding: 70px 0px 0px 0px;
    text-align: center
  }

  .first-title {
    font-size: 40px
  }

  .second-title {
    font-size: 20px
  }

  .description {
    font-size: 16px;
  }

  .description-wrapper {
    margin: 0px;
    padding: 50px 20px 50px 20px
  }

  .construction-footer-wrapper {
    flex-direction: column;
    height: none
  }

  .construction-footer {
    flex-direction: column
  }
}

@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
  .construction-content {
    padding: 70px 0px 0px 0px;
    text-align: center
  }

  .first-title {
    font-size: 40px
  }

  .second-title {
    font-size: 20px
  }

  .description {
    font-size: 16px;
  }

  .description-wrapper {
    margin: 0px;
    padding: 50px 20px 50px 20px
  }

  .construction-footer-wrapper {
    flex-direction: column;
    height: none
  }

  .construction-footer {
    flex-direction: column
  }  
}

@media (min-width: 481px) and (max-width: 767px) {
  .construction-content {
    padding: 70px 0px 0px 0px;
    text-align: center
  }
  
  .first-title {
    font-size: 40px
  }

  .second-title {
    font-size: 20px
  }

  .description {
    font-size: 16px;
  }

  .description-wrapper {
    margin: 0px;
    padding: 50px 20px 50px 20px
  }

  .construction-footer-wrapper {
    flex-direction: column;
    height: none
  }

  .construction-footer {
    flex-direction: column
  }  
}

@media (min-width: 320px) and (max-width: 480px) {
  .construction-content {
    padding: 70px 0px 0px 0px;
    text-align: center
  }

  .first-title {
    font-size: 40px
  }

  .second-title {
    font-size: 20px
  }

  .description {
    font-size: 16px;
  }

  .description-wrapper {
    margin: 0px;
    padding: 50px 20px 50px 20px
  }

  .construction-footer-wrapper {
    flex-direction: column;
    height: none;
  }

  .construction-footer {
    flex-direction: column
  }  
}
</style>

