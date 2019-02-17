<template>
    <v-layout align-center justify-center row fill-height>
        <v-flex style="background-color: gray; height: 100%">
            <div><span>Acerca De</span></div>
            <br>
            <div><span>Imagenes</span></div>
        </v-flex>
        <v-flex style="background-color: white; height: 100%">

            <v-card :class="ats('px-4 pt-3 py-4 elevation-0', '=', 'px-4 pt-3 pb-4')">
                <v-layout :column="ats(true, true, false)" :row="ats(false, false, true)" :wrap="ats(false, false, true)" fill-height :align-center="ats(false, false, true)">
                    <v-flex xs12 md3 text-xs-left>
                        <div class="blue-grey--text text--darken-4 font-weight-bold subheading">Nombre Comercial</div>
                        <div class="blue-grey--text text--darken-4 caption">Requerido</div>
                    </v-flex>
                    <v-flex xs12 md9 :class="ats('', '=', 'pl-4')">
                        <v-text-field
                          v-model="about.commercialName"
                          :rules="nameRules"
                          maxlength="100"
                          single-line
                          :disabled="getStatus.loading"
                          :loading="getStatus.loading"
                          required
                        >
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 md3 :class="ats('text-xs-left mt-3', '=', 'text-xs-left')">
                        <div class="blue-grey--text text--darken-4 font-weight-bold subheading">Especialización</div>
                        <div class="blue-grey--text text--darken-4 caption">Requerido</div>
                    </v-flex>
                    <v-flex xs12 md9 :class="ats('', '=', 'pl-4')">
                      <v-select
                        :items="industries"
                        v-model="about.specialization"
                        :rules="industryRules"
                        item-text="name"
                        item-value="name"
                        dense
                        :disabled="getStatus.loading"
                        :loading="getStatus.loading"
                        required
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 md3 :class="ats('text-xs-left mt-3', '=', 'text-xs-left')">
                        <div class="blue-grey--text text--darken-4 font-weight-bold subheading">Pais</div>
                        <div class="blue-grey--text text--darken-4 caption">Requerido</div>
                    </v-flex>
                    <v-flex xs12 md9 :class="ats('', '=', 'pl-4')">
                      <v-select
                        :items="countries"
                        v-model="about.country"
                        :rules="locationRules"
                        item-text="name"
                        item-value="name"
                        dense
                        :disabled="getStatus.loading"
                        :loading="getStatus.loading"
                        required
                      ></v-select>
                    </v-flex>       
                   <v-flex xs12 md3 :class="ats('text-xs-left mt-3', '=', 'text-xs-left')">
                        <div class="blue-grey--text text--darken-4 font-weight-bold subheading">Ciudad</div>
                        <div class="blue-grey--text text--darken-4 caption">Requerido</div>
                    </v-flex>
                    <v-flex xs12 md9 :class="ats('', '=', 'pl-4')" v-if="about.country !== ''">
                      <v-text-field
                        v-model="about.city"
                        :rules="locationRules"
                        item-text="name"
                        item-value="name"
                        dense
                        :disabled="getStatus.loading"
                        :loading="getStatus.loading"
                        required
                      ></v-text-field>
                    </v-flex>                                    
                </v-layout>
            </v-card>

            <v-card :class="ats('pa-4 mt-3 elevation-0', '=', 'pa-4 mt-3')">
              <v-layout row wrap fill-height align-top pt-2>
                <v-flex xs12 md3 text-xs-left>
                      <div class="blue-grey--text text--darken-4 font-weight-bold subheading">Sobre Ti</div>
                      <div class="blue-grey--text text--darken-4 caption mb-2">Requerido</div>
                      <!-- <div class="blue-grey--text text--darken-4 caption">Una frase para que expliques en qué ayudáis a vuestros clientes.</div> -->
                      <div class="blue-grey--text text--darken-4 caption">Describe vuestra experiencia. Esto ayudará a que los clientes os encuentren cuando estén buscando una empresa como la tuya.</div>
                  </v-flex>
                  <v-flex xs12 md9 text-xs-left :class="ats('', '=', 'pl-4')">
                      <v-text-field
                          v-model="about.you"
                          maxlength="35"
                          hint="35 caracteres"
                          persistent-hint
                          :rules="aboutYouRules"
                          validate-on-blur
                          single-line
                          :disabled="getStatus.loading"
                          :loading="getStatus.loading"
                        >
                      </v-text-field>
                  </v-flex>
                  <!-- <v-flex xs12 md3 :class="ats('text-xs-left pt-4', '=', 'text-xs-left pt-5')">
                      <div class="blue-grey--text text--darken-4 font-weight-bold subheading">¿Cuál te gusta más?</div>
                  </v-flex> -->
                  <!-- <v-flex xs12 md9 text-xs-left :class="ats('pt-3', '=', 'pl-4 pt-5')">
                    <v-radio-group v-model="about.howToSay" class="mt-0" :disabled="getStatus.loading" :loading="getStatus.loading">
                      <v-radio :label="getStatus.loading ? 'My company helps clients do this' : getCompanyData.name +' helps clients ' + about.you" value="1"></v-radio>
                      <v-radio class="mt-2" value="2">
                        <div slot="label">
                          <v-layout align-center row wrap>
                            <v-flex>
                              {{getStatus.loading ? 'My company helps clients do this' : getCompanyData.name +' helps clients '}}
                            </v-flex>
                            <v-flex px-2>
                              <v-text-field
                                class="mt-0"
                                v-model="about.customHowToSay"
                                :rules="customHowToSayRules"
                                maxlength="14"
                                hint="3 palabras - 14 caracteres"
                                persistent-hint
                                single-line
                              >
                              </v-text-field>
                            </v-flex>
                            <v-flex>
                              {{getStatus.loading ? 'do this' : ' ' + about.you}}
                            </v-flex>
                          </v-layout>
                        </div>
                      </v-radio>
                    </v-radio-group>
                  </v-flex> -->
              </v-layout>
            </v-card>          

            <v-card :class="ats('pa-4 mt-3 elevation-0', '=', 'pa-4 mt-3')">
              <v-layout row wrap fill-height align-top>
                <v-flex xs12 md3 text-xs-left fill-height>
                      <div class="blue-grey--text text--darken-4 font-weight-bold subheading mt-4">Yes Them URL</div>
                  </v-flex>
                  <v-flex xs12 md9 text-xs-left :class="ats('', '=', 'pl-4')">
                      <v-text-field
                          v-model="about.identifier"
                          :rules="identifierRules"
                          validate-on-blur
                          prefix="yesthem.com/"
                          single-line
                          maxlength="30"
                          :disabled="getStatus.loading"
                          :loading="getStatus.loading"
                          required
                        >
                      </v-text-field>
                  </v-flex>
                </v-layout>
            </v-card>              

        </v-flex>
        <v-flex style="padding: 15px 15px 15px 15px">
            <div style="width: 50%; height: 100%">
                TEST
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      version: 0,
      hover: {
        logo: false,
        coverImage: false,
        recomendationsImage: false,
        resultsImage: false
      },
      formData: new FormData(),
      industries: require('@/misc/industries').default.industries,
      countries: require('@/misc/countries').default.countries,
      about: {
          country: '',
          city: '',
          commercialName: '',
          specialization: '',
          logo: {
            file: null,
            filename: null,
            url: null,
            status: {
              error: false,
              message: ''
            }
          },
          coverImage: {
            file: null,
            filename: null,
            url: null,
            status: {
              error: false,
              message: ''
            }
          },
          recomendationsImage: {
            file: null,
            filename: null,
            url: null,
            status: {
              error: false,
              message: ''
            }
          },
          resultsImage: {
            file: null,
            filename: null,
            url: null,
            status: {
              error: false,
              message: ''
            }
          },                    
          you: '',
          howToSay: '1',
          customHowToSay: '',
          facebook: '',
          instagram: '',
          linkedin: '',
          twitter: '',
          identifier: ''
      },
      valid: false,
      status: {
          loading: false,
          error: false,
          message: ''
      },
      nameRules: [
        (v) => !!v || 'El nombre de la empresa es obligatorio!',
        (v) => (v && v.length >= 3 && v.length <= 100) || 'El nombre debe tener entre 3 y 100 caracteres!'
      ],
      aboutYouRules: [
        (v) => (v.length <= 35) || 'El nombre debe tener entre 3 y 100 caracteres!'
      ],
      customHowToSayRules: [
        (v) => (v.length <= 14) || '3 palabras - 14 caracteres'
      ],
      industryRules: [
        (v) => !!v || 'Debe seleccionar una industria.'
      ],
      locationRules: [
        (v) => !!v || 'Debe seleccionar una opción.'
      ],      
      identifierRules: [
        (v) => !!v || 'Este campo es obligatorio!',
        (v) => (v && v.length >= 3 && v.length <= 30) || 'El nombre debe tener entre 3 y 30 caracteres!'
      ],
      socialRules: [
        (v) => (v.length <= 60) || 'Los links sociales debe tener menos de 60 caracteres!'
      ]
    }
  },
  watch: {
    "getStatus.loading": function (a, b) {
      if (!this.getStatus.loading && !this.getStatus.error) {
        this.about.commercialName = this.getCompanyData.name
        this.about.specialization = this.getCompanyData.industry
        this.about.country = this.getCompanyData.country
        this.about.city = this.getCompanyData.city
        this.version += 1
        this.about.logo.url = this.getCompanyData.logo ? '/static/images/uploads/' + this.getCompanyData.logo + '?' + Date.now() : ''
        this.about.coverImage.url = this.getCompanyData.coverImage ? '/static/images/uploads/' + this.getCompanyData.coverImage + '?' + Date.now() : ''
        this.about.recomendationsImage.url = this.getCompanyData.recomendationsImage ? '/static/images/uploads/' + this.getCompanyData.recomendationsImage + '?' + Date.now() : ''
        this.about.resultsImage.url = this.getCompanyData.resultsImage ? '/static/images/uploads/' + this.getCompanyData.resultsImage + '?' + Date.now() : ''
        this.about.you = this.getCompanyData.description
        this.about.howToSay = this.getCompanyData.howToSay
        this.about.customHowToSay = this.getCompanyData.customHowToSay
        this.about.facebook = this.getCompanyData.facebook
        this.about.twitter = this.getCompanyData.twitter
        this.about.instagram = this.getCompanyData.instagram
        this.about.linkedin = this.getCompanyData.linkedin
        this.about.identifier = this.getCompanyData.identifier
      }
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

    initialize () {
      if (!this.getStatus.loading && !this.getStatus.error) {
        this.about.commercialName = this.getCompanyData.name
        this.about.specialization = this.getCompanyData.industry
        this.about.country = this.getCompanyData.country
        this.about.city = this.getCompanyData.city        
        this.version += 1
        this.about.logo.url = this.getCompanyData.logo ? '/static/images/uploads/' + this.getCompanyData.logo + '?' + Date.now() : ''
        this.about.coverImage.url = this.getCompanyData.coverImage ? '/static/images/uploads/' + this.getCompanyData.coverImage + '?' + Date.now() : ''
        this.about.recomendationsImage.url = this.getCompanyData.recomendationsImage ? '/static/images/uploads/' + this.getCompanyData.recomendationsImage + '?' + Date.now() : ''
        this.about.resultsImage.url = this.getCompanyData.resultsImage ? '/static/images/uploads/' + this.getCompanyData.resultsImage + '?' + Date.now() : ''
        this.about.you = this.getCompanyData.description
        this.about.howToSay = this.getCompanyData.howToSay
        this.about.customHowToSay = this.getCompanyData.customHowToSay
        this.about.facebook = this.getCompanyData.facebook
        this.about.twitter = this.getCompanyData.twitter
        this.about.instagram = this.getCompanyData.instagram
        this.about.linkedin = this.getCompanyData.linkedin
        this.about.identifier = this.getCompanyData.identifier
      } 
    },

    onFocusLogo () {
      this.$refs.fileInputLogo.click()
    },

    onFocusCover () {
      this.$refs.fileInputCover.click()
    },

    onFocusRecomendations () {
      this.$refs.fileInputRecomendation.click()
    },

    onFocusResults () {
    this. $refs.fileInputResults.click()
    },

    onFileChangeLogo ($event) {
      let file = $event.target.files || $event.dataTransfer.files
      file = file[0]
      this.formData.set('id', this.getCompanyData._id)
      this.formData.set('commercialName', this.about.commercialName)
      this.formData.set('specialization', this.about.specialization)
      this.formData.set('country', this.about.country)
      this.formData.set('city', this.about.city)
      this.formData.set('howToSay', this.about.howToSay)
      this.formData.set('customHowToSay', this.about.customHowToSay)
      this.formData.set('aboutYou', this.about.you)
      this.formData.set('facebook', this.about.facebook)
      this.formData.set('linkedin', this.about.linkedin)
      this.formData.set('twitter', this.about.twitter)
      this.formData.set('instagram', this.about.instagram)
      this.formData.set('identifier', this.about.identifier)
      this.formData.set('logo', null)
      if (this.about.coverImage.file) {
        this.formData.set('coverImage', this.about.coverImage.file, this.about.coverImage.filename)
      } else{
        this.formData.set('coverImage', null)
      }

      if (file) {
        if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg') {
          this.about.logo.file = file
          this.about.logo.filename = file.name
          this.formData.set('logo', this.about.logo.file, this.about.logo.filename)
          this.about.logo.status.error = false
          this.about.logo.status.messages = []
          window.URL = window.URL || window.webkitURL
          this.about.logo.url = window.URL.createObjectURL(this.about.logo.file)
          //window.URL.revokeObjectURL(this.about.logo.url);
        } else {
          this.formData.set('logo', null)
          this.about.logo.status.error = true
          this.about.logo.status.messages = ['Only JPEG, JPG, GIF or PNG images are allowed.']
          this.about.logo.url = ''
        }
      } else {
        this.formData.set('logo', null)
        this.about.logo.status.error = false
        this.about.logo.status.messages = []
        this.about.logo.url = ''
      }
    },

    onFileChangeCover ($event) {
      let file = $event.target.files || $event.dataTransfer.files
      file = file[0]
      this.formData.set('id', this.getCompanyData._id)
      this.formData.set('commercialName', this.about.commercialName)
      this.formData.set('specialization', this.about.specialization)
      this.formData.set('country', this.about.country)
      this.formData.set('city', this.about.city)      
      this.formData.set('howToSay', this.about.howToSay)
      this.formData.set('customHowToSay', this.about.customHowToSay)
      this.formData.set('aboutYou', this.about.you)
      this.formData.set('facebook', this.about.facebook)
      this.formData.set('linkedin', this.about.linkedin)
      this.formData.set('twitter', this.about.twitter)
      this.formData.set('instagram', this.about.instagram)
      this.formData.set('identifier', this.about.identifier)
      this.formData.set('coverImage', null)
      if (this.about.logo.file) {
        this.formData.set('logo', this.about.logo.file, this.about.logo.filename)
      } else{
        this.formData.set('logo', null)
      }

      if (file) {
        if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg') {
          this.about.coverImage.file = file
          this.about.coverImage.filename = file.name
          this.formData.set('coverImage', this.about.coverImage.file, this.about.coverImage.filename)
          this.about.coverImage.status.error = false
          this.about.coverImage.status.messages = []
          window.URL = window.URL || window.webkitURL
          this.about.coverImage.url = window.URL.createObjectURL(this.about.coverImage.file)
          //window.URL.revokeObjectURL(this.about.coverImage.url)
        } else {
          this.formData.set('coverImage', null)
          this.about.coverImage.status.error = true
          this.about.coverImage.status.messages = ['Only JPEG, JPG, GIF or PNG images are allowed.']
          this.about.coverImage.url = ''
        }
      } else {
        this.formData.set('coverImage', null)
        this.about.coverImage.status.error = false
        this.about.coverImage.status.messages = []
        this.about.coverImage.url = ''
      }
    },

    onFileChangeRecomendation($event){
      let file = $event.target.files || $event.dataTransfer.files
      file = file[0]
      this.formData.set('id', this.getCompanyData._id)
      this.formData.set('commercialName', this.about.commercialName)
      this.formData.set('specialization', this.about.specialization)
      this.formData.set('country', this.about.country)
      this.formData.set('city', this.about.city)      
      this.formData.set('howToSay', this.about.howToSay)
      this.formData.set('customHowToSay', this.about.customHowToSay)
      this.formData.set('aboutYou', this.about.you)
      this.formData.set('facebook', this.about.facebook)
      this.formData.set('linkedin', this.about.linkedin)
      this.formData.set('twitter', this.about.twitter)
      this.formData.set('instagram', this.about.instagram)
      this.formData.set('identifier', this.about.identifier)
      this.formData.set('recomendationsImage', null)
      if (this.about.logo.file) {
        this.formData.set('logo', this.about.logo.file, this.about.logo.filename)
      } else{
        this.formData.set('logo', null)
      }
      if(this.about.coverImage) {
        this.formData.set('coverImage', this.about.coverImage.file, this.about.coverImage.filename)
      } else{
        this.formData.set('coverImage', null)
      }

      if (file) {
        if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg') {
          this.about.recomendationsImage.file = file
          this.about.recomendationsImage.filename = file.name
          this.formData.set('recomendationsImage', this.about.recomendationsImage.file, this.about.recomendationsImage.filename)
          this.about.recomendationsImage.status.error = false
          this.about.recomendationsImage.status.messages = []
          window.URL = window.URL || window.webkitURL
          this.about.recomendationsImage.url = window.URL.createObjectURL(this.about.recomendationsImage.file)
          //window.URL.revokeObjectURL(this.about.recomendationsImage.url)
        } else {
          this.formData.set('recomendationsImage', null)
          this.about.recomendationsImage.status.error = true
          this.about.recomendationsImage.status.messages = ['Only JPEG, JPG, GIF or PNG images are allowed.']
          this.about.recomendationsImage.url = ''
        }
      } else {
        this.formData.set('recomendationsImage', null)
        this.about.recomendationsImage.status.error = false
        this.about.recomendationsImage.status.messages = []
        this.about.recomendationsImage.url = ''
      }
    },

    onFileChangeResult($event){
        let file = $event.target.files || $event.dataTransfer.files
            file = file[0]
            this.formData.set('id', this.getCompanyData._id)
            this.formData.set('commercialName', this.about.commercialName)
            this.formData.set('specialization', this.about.specialization)
            this.formData.set('country', this.about.country)
            this.formData.set('city', this.about.city)            
            this.formData.set('howToSay', this.about.howToSay)
            this.formData.set('customHowToSay', this.about.customHowToSay)
            this.formData.set('aboutYou', this.about.you)
            this.formData.set('facebook', this.about.facebook)
            this.formData.set('linkedin', this.about.linkedin)
            this.formData.set('twitter', this.about.twitter)
            this.formData.set('instagram', this.about.instagram)
            this.formData.set('identifier', this.about.identifier)
            this.formData.set('resultsImage', null)            
            if (this.about.logo.file) {
              this.formData.set('logo', this.about.logo.file, this.about.logo.filename)
            } else{
              this.formData.set('logo', null)
            }
            if(this.about.coverImage) {
              this.formData.set('coverImage', this.about.coverImage.file, this.about.coverImage.filename)
            } else{
              this.formData.set('coverImage', null)
            }
            if(this.about.recomendationsImage) {
              this.formData.set('recomendationsImage', this.about.recomendationsImage.file, this.about.recomendationsImage.filename)
            } else{
              this.formData.set('recomendationsImage', null)
            }            

            if (file) {
              if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg') {
                this.about.resultsImage.file = file
                this.about.resultsImage.filename = file.name
                this.formData.set('resultsImage', this.about.resultsImage.file, this.about.resultsImage.filename)
                this.about.resultsImage.status.error = false
                this.about.resultsImage.status.messages = []
                window.URL = window.URL || window.webkitURL
                this.about.resultsImage.url = window.URL.createObjectURL(this.about.resultsImage.file)
                //window.URL.revokeObjectURL(this.about.resultsImage.url)
              } else {
                this.formData.set('resultsImage', null)
                this.about.resultsImage.status.error = true
                this.about.resultsImage.status.messages = ['Only JPEG, JPG, GIF or PNG images are allowed.']
                this.about.resultsImage.url = ''
              }
            } else {
              this.formData.set('resultsImage', null)
              this.about.resultsImage.status.error = false
              this.about.resultsImage.status.messages = []
              this.about.resultsImage.url = ''
            }
    },

    async save (reload, to) {
      console.log('Start revoking')
      window.URL = window.URL || window.webkitURL
      window.URL.revokeObjectURL(this.about.resultsImage.url)
      window.URL.revokeObjectURL(this.about.coverImage.url)
      window.URL.revokeObjectURL(this.about.recomendationsImage.url)
      window.URL.revokeObjectURL(this.about.logo.url)
      console.log('Revoked all stuff')
      this.formData.set('id', this.getCompanyData._id)
      this.formData.set('commercialName', this.about.commercialName)
      this.formData.set('specialization', this.about.specialization)
      this.formData.set('country', this.about.country)
      this.formData.set('city', this.about.city)
      this.formData.set('howToSay', this.about.howToSay)
      this.formData.set('customHowToSay', this.about.customHowToSay)
      this.formData.set('aboutYou', this.about.you)
      this.formData.set('facebook', this.about.facebook)
      this.formData.set('linkedin', this.about.linkedin)
      this.formData.set('twitter', this.about.twitter)
      this.formData.set('instagram', this.about.instagram)
      this.formData.set('identifier', this.about.identifier)
      this.formData.set('editing', 'about')

      this.about.coverImage.status.error = false
      this.about.coverImage.status.message = ''
      if (this.$refs.aboutForm.validate()/* && this.about.coverImage.url*/) {
        let redirect = to === 'out' ? false : (this.about.identifier !== this.$route.params.identifier ? true : false)
        const response = await this.$store.dispatch('company/edit', this.formData)
        if (response.success === true) {
          //window.location.reload(true);
          console.log('Reloading in ABOUT.vue')
          if(to !== 'out') {
            // console.log('Emiting reload')
            // await this.$store.dispatch('company/populate', this.currentUser.identifier)
            // this.$emit('reload', {reload: reload, redirect: redirect, to: redirect ? to : null})
          }
          return true
        }
      } else {
        // if (this.about.coverImage.url === null || this.about.coverImage.url === '') {
        //   this.about.coverImage.status.error = true
        //   this.about.coverImage.status.message = 'A cover image is required.'
        // }
        
        await this.$store.dispatch('company/setStatus', { loading: false, error: true, message: 'Por favor asegurate de llenar todos los campos requeridos antes de continuar.' })
        return false
      }
    }
  }
}
</script>

<style>

</style>


