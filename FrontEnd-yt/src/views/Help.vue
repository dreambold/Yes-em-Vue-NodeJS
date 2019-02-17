<template>
  <v-layout fill-height column>
    <v-flex xs12 text-xs-center :class="ats('py-4 px-5', '=', 'pa-1')"  :style="ats('background-color: white !important; margin-top: 60px; padding: 15px; border-bottom: 1px solid #cecece', '=', 'display: flex; background-color: white !important; border-bottom: 1px solid rgb(206, 206, 206); flex-direction: column; justify-content: center;')">
      <div>
        <span style="ats('color: #3676a2; font-size: 26px; font-family: Roboto-medium','=', 'color: #3676a2; font-size: 50px; font-family: Roboto-regular')">Contacta con Nosotros</span>
      </div>
      <br />
      <div>
        <span style="color: gray; font-size: 16px; font-family: 'Roboto-regular'">No importa si estás empezando o tienes una duda puntual,
        te daremos todas las respuestas <br> para que demuestres tus resultados en Yes Them.
        </span>
      </div>
    </v-flex>
    <v-flex xs12 :style="ats('background: white; padding: 0px;', '=', 'background: white; padding: 50px;')">
      <div :style="ats('display: flex; flex-direction: column; justify-content: space-evenly; align-items: center;', '=', 'display: flex; justify-content: space-evenly; align-items: center;')">
        <div :align="ats('', '=', 'right')" :style="ats('width: 100%', '=', 'width: 45%')">
          <v-form ref="contactHelp" v-model="contact.valid">
            <input :disabled="status.loading" type="text" v-model="contact.name" placeholder="Nombre Completo" :style="ats('margin-top: 5px; height: 56px; padding: 15px; width: 100%; font-size: 14px; background: #fbfbfb; border-radius: 2px; border: 1px solid #e7e7e7;', '=', 'margin: 5px; height: 56px; padding: 15px; width: 100%; font-size: 14px; background: #fbfbfb; border-radius: 2px; border: 1px solid #e7e7e7;')" />
            <br/>
            <input :disabled="status.loading" type="email" v-model="contact.email" placeholder="E-mail" :style="ats('margin-top: 5px;  height: 56px; padding: 15px; width: 100%; font-size: 14px; background: #fbfbfb; border-radius: 2px; border: 1px solid #e7e7e7;', '=', 'margin: 5px; height: 56px; padding: 15px; width: 100%; font-size: 14px; background: #fbfbfb; border-radius: 2px; border: 1px solid #e7e7e7;')" />
            <br />
            <select :disabled="status.loading" :style="ats('margin-top: 5px; resize: none; height: 56px; padding: 15px; cursor: pointer; width: 100%; border: 1px solid #e7e7e7;', '=', 'resize: none; margin: 5px; height: 56px; padding: 15px; cursor: pointer; width: 100%; border: 1px solid #e7e7e7;')" v-model="serviceSelected">
              <option value="Preguntas Generales" style="font-size: 18px">Preguntas Generales</option>
            </select>            
            <br />
            <textarea :disabled="status.loading" resize v-model="contact.message" cols="10" rows="5" placeholder="Escribe tu mensaje" :style="ats('margin-top: 5px; padding: 15px; width: 100%; font-size: 14px; background: #fbfbfb; border-radius: 2px; border: 1px solid #e7e7e7;', '=', 'margin: 5px; padding: 15px; width: 100%; font-size: 14px; background: #fbfbfb; border-radius: 2px; border: 1px solid #e7e7e7;')"> </textarea>
            <!-- <v-text-field
              v-model="contact.name"
              label="Nombre"
              :rules="requiredRules"
            ></v-text-field> -->
            <!-- <v-text-field
              v-model="contact.email"
              label="E-mail"
              :rules="requiredRules"
            ></v-text-field>
            <v-textarea
              v-model="contact.message"
              label="Mensaje"
              :rules="requiredRules"
              outline
              no-resize
            ></v-textarea> -->
          </v-form>
          <button :disabled="!contact.message || !contact.email || !contact.name" @click="contactHelp()" type="button" style="color: white; text-transform: uppercase; padding:  14px 22px 14px 22px; background-color: #55c289; font-size: 12px; outline: none; border-radius: 2px; font-family: 'Roboto-bold'">
            <span v-if="!status.loading">ENVIAR MENSAJE</span>
            <v-progress-circular
              v-if="status.loading"
              indeterminate
              color="primary"
            ></v-progress-circular>            
          </button>
        </div>  

        <div style="ats('width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: flex-start', '=', 'width: 25%; display: flex; flex-direction: column; justify-content: center; align-items: flex-start')">
        
          <div :class="ats('contactInfoMobile', '=', 'contactInfo')">
            <div style="display: flex; flex-direction: row; justify-content: center; align-items: center">
              <img src="static/images/help/help_icon.png" alt="Help Icon">
              <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: left; margin-left: 15px;">
                <span style="width: 100%; font-family: 'Roboto-regular'; color: gray">DARTE DE ALTA EN YES THEM</span>
                <span style="width: 100%; font-family: 'Roboto-bold'; color: #3676a2">+1.888.604.3188</span>
              </div>
            </div>
          </div>

          <div :class="ats('contactInfoMobile', '=', 'contactInfo')">
            <div style="display: flex; flex-direction: row; justify-content: center; align-items: center">
              <img src="static/images/help/help_icon.png" alt="Help Icon">
              <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: left; margin-left: 15px;">
                <span style="width: 100%; font-family: 'Roboto-regular'; color: gray">ATENCION AL CLIENTE</span>
                <span style="width: 100%; font-family: 'Roboto-bold'; color: #3676a2">support@yesthem.com</span>
              </div>
            </div>
          </div>   

          <div :class="ats('contactInfoMobile', '=', 'contactInfo')">
            <div style="display: flex; flex-direction: row; justify-content: center; align-items: center">
              <img src="static/images/help/help_icon.png" alt="Help Icon">
              <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: left; margin-left: 15px;">
                <span style="width: 100%; font-family: 'Roboto-regular'; color: gray">PRESS</span>
                <span style="width: 100%; font-family: 'Roboto-bold'; color: #3676a2">press@yesthem.com</span>
              </div>
            </div>
          </div>        

          <div :class="ats('contactInfoMobile', '=', 'contactInfo')">
            <div style="display: flex; flex-direction: row; justify-content: center; align-items: center">
              <img src="static/images/help/help_icon.png" alt="Help Icon">
              <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: left; margin-left: 15px;">
                <span style="width: 100%; font-family: 'Roboto-regular'; color: gray">PARTNERSHIP</span>
                <span style="width: 100%; font-family: 'Roboto-bold'; color: #3676a2">support@yesthem.com</span>
              </div>
            </div>
          </div>

          <div :class="ats('contactInfoMobile', '=', 'contactInfo')">
            <div style="display: flex; flex-direction: row; justify-content: center; align-items: center">
              <img src="static/images/help/help_icon.png" alt="Help Icon">
              <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: left; margin-left: 15px;">
                <span style="width: 100%; font-family: 'Roboto-regular'; color: gray">INVESTORS</span>
                <span style="width: 100%; font-family: 'Roboto-bold'; color: #3676a2">press@yesthem.com</span>
              </div>
            </div>
          </div>

          <div :class="ats('contactInfoMobile', '=', 'contactInfo')">
            <div style="display: flex; flex-direction: row; justify-content: center; align-items: center">
              <img src="static/images/help/help_icon.png" alt="Help Icon">
              <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: left; margin-left: 15px;">
                <span style="width: 100%; font-family: 'Roboto-regular'; color: gray">DIRECCION EN ESPAÑA</span>
                <span style="width: 100%; font-family: 'Roboto-bold'; color: #3676a2">Toptal, LLC. 2810 N. Church St #36879, Wilmington, DE 1802-447</span>
              </div>
            </div>
          </div>        
        </div>

      </div>
    </v-flex>

		<v-flex style="ats('background-color: #3945b1 !important; background-image: url(static/images/new-home/bg4.png); background-repeat: no-repeat scroll; background-size: cover; background-position: center top; width: 100%; min-height: 300px !important; margin-bottom: 0px;', '=', 'background-color: #3945b1 !important; background-image: url(static/images/new-home/bg4.png); background-repeat: no-repeat scroll; background-size: cover; background-position: center top; width: 100%; min-height: 300px !important; margin-bottom: 58px;')">
			<v-layout column>
				<v-flex :class="ats('px-3 pt-3 pb-0 text-xs-left', '=', 'px-5 pt-0 pb-3 text-xs-center')">
					<div :class="ats('headline pb-4 px-3 pt-5 white--text', '=', 'display-2 pb-4 px-2 pt-5 white--text')" :style="ats('', '=', 'line-height: 50px !important; font-family: Roboto-medium')">
						¿Comenzamos?
					</div>
					<div class="subheading px-2 white--text" :style="!isMobile ? 'line-height: 1.7 !important; font-size: 22px; font-family: Roboto-medium; letter-spacing: 1px' : 'line-height: 1.7 !important; font-size: 22px; font-family: Roboto; font-weight: 400;letter-spacing: 1px'">
						Registrarse es gratis y sólo te llevará unos minutos. Obtén tu perfil ahora mismo y comienza a disfrutar de sus beneficios.
					</div>
					<div>
						<v-btn large depressed class="my-4 mx-0 purple_button px-5 squared" style="height: 44px; font-size: 14px !important; color: white; font-family: 'Roboto-medium'" to="/register">Activa tus clientes satisfechos</v-btn>
					</div>
				</v-flex>
			</v-layout>
		</v-flex>


    <v-snackbar bottom :color="snackbar.success? 'success' : 'error'" timeout="10000" multi-line="true" v-model="snackbar.show">
        {{ snackbar.message }}
        <v-btn flat color="white" @click.native.stop="snackbar.show = false">Close</v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  data () {
    return {
      contact: {
        valid: false,
        name: '',
        email: '',
        message: '',
        option: 'Preguntas generales'
      },
      status: {
        loading: false,
        error: false,
        message: ''
      },
      snackbar: {
        show: false,
        success: true,
        message: ''
      },
      requiredRules: [
        (v) => !!v || 'This field is required.'
      ]
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn', 'currentUser']),
    ...mapGetters('company', ['getCompanyData', 'getStatus', 'setStatus', 'getSolutions', 'getBenefits', 'getExperiences', 'getTotalValidations'])
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

    async contactHelp () {
      if (this.$refs.contactHelp.validate()) {
        this.status.loading = true
        this.status.error = false
        this.status.message = ''
        try {
          await axios.post('/api/company/contact/email', { user: this.contact.name, email: this.contact.email, message: this.contact.message, option: this.contact.option })
          this.status.loading = false
          this.status.error = false
          this.contact.message = ''
          this.contact.email = ''
          this.contact.name = ''
          this.status.message = 'An e-mail with your inquiry was sent. Thank you.'
          this.snackbar.show = true
          this.snackbar.success = !this.status.error
          this.snackbar.message = this.status.message
        } catch (error) {
          let message = ''
          console.log('not okey', error)
          if (error.response) {
            if (Array.isArray(error.response.data.message)) {
              for (let i = 0, len = error.response.data.message.length; i < len; i++) {
                message += error.response.data.message[i] + (i === (error.response.data.message.length - 1) ? '.' : ', ')
              }
            } else {
              message = error.response.data.message
            }
          } else if (error.request) {
            message = 'No response received from the server. If the problem persists contact the site administrator (' + error.message + ')'
          } else {
            message = error.message
          }
          this.status.loading = false
          this.status.error = true
          this.status.message = message
          this.snackbar.show = true
          this.snackbar.success = !this.status.error
          this.snackbar.message = this.status.message
        }
      } else {
        this.status.loading = false
        this.status.error = true
        this.status.message = 'All the fields are required.'
        this.snackbar.show = true
        this.snackbar.success = !this.status.error
        this.snackbar.message = this.status.message
      }
    }
  }
}
</script>

<style>
.contactInfoMobile {
  margin: 12px; display: flex; flex-direction: column; justify-content: center; align-items: flex-start
}
.contactInfo {
  margin: 12px; display: flex; flex-direction: column; justify-content: center; align-items: center
}
</style>
