<template>
<v-layout row wrap :class="ats('pa-0', '=', 'pa-5')" style="background-color: #D5E3E4; min-height: 100%">
    <v-spacer></v-spacer>
    <v-flex xs12 md4 style="margin-top: 80px">
        <div :class="ats('headline font-weight-bold mb-3', '=', 'headline font-weight-bold mb-3')">Accede</div>
        <v-layout column child-flex :class="ats('elevation-0 mb-3 white mx-3', '=', 'elevation-1 mb-1 white')">
          <div class="pa-4">
              <v-flex>
                <v-form ref="formProfile" v-model="valid">
                  <v-text-field
                    v-model="user.email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="user.password"
                    :rules="passwordRules"
                    label="Password"
                    maxlength="30"
                    :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
                    @click:append="() => (hidePassword = !hidePassword)"
                    :type="hidePassword ? 'password' : 'text'"
                    required
                  ></v-text-field>
                </v-form>
              </v-flex>
              <v-flex text-xs-right py-3 pb-4>
                <router-link style="text-decoration: none" class="blue--text text--accent-3 caption font-weight-bold" to="/forgot-password">¿Olvidaste tu contraseña?</router-link>
              </v-flex>
              <v-btn
                large
                block
                depressed
                class="white--text ma-0 font-weight-bold"
                color="blue accent-3"
                @click.native="login"
                @keyup.enter.native.prevent="login"
                :disabled="status.loading || !valid"
                :loading="status.loading"
              >
                Iniciar sesión
              </v-btn>
              <v-alert v-if="status.message" :color="status.error ? 'error' : 'success'" :icon="status.error ? 'warning' : 'check_circle'" value="true">{{status.message}}</v-alert>
              <v-flex xs12 text-xs-center py-3>
                <label class="caption grey--text text--darken-1">¿Nuevo en Yes Them?</label><router-link style="text-decoration: none" class="blue--text text--accent-3 caption mx-2 font-weight-bold" to="/register">Registrate</router-link>
              </v-flex>
          </div>
        </v-layout>
    </v-flex>
    <v-spacer></v-spacer>
</v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      valid: true,
      status: {
        loading: false,
        error: false,
        message: ''
      },
      user: {
        email: '',
        password: ''
      },
      hidePassword: true,
      emailRules: [
        (v) => !!v || 'El e-mail es requerido.',
        (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        (v) => !!v || 'Password is required'
      ]
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

    async login () {
      this.status.loading = true
      this.status.error = false
      this.status.message = ''

      if (this.$refs.formProfile.validate()) {
        try {
          let response = await this.$store.dispatch('auth/login', {...this.user})
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
            this.status.message = 'No response received from the server. If the problem persists contact the site administrator (' + error.message + ')'
          } else {
            this.status.message = error.message
          }
        }
      } else {
        this.status.loading = false
        this.status.error = true
        this.status.message = 'Please make sure to fill all the necessary information.'
      }
    }

  },
  created: function () {
    if(this.$route.params.registered == 'password-change-success'){
      this.status.message = "Tu contraseña se cambio con éxito. Ahora puedes hacer login."
      this.status.error = false
    }
  }
}
</script>

<style>
</style>
