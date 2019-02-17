<template>
  <v-layout row wrap :class="ats('pa-0', '=', 'pa-5')" style="background-color: #D5E3E4; min-height: 100%">
    <v-spacer></v-spacer>
    <v-flex xs12 md4>
      <div :class="ats('headline font-weight-bold mb-3 mt-3', '=', 'headline font-weight-bold mb-3')">Cambia tu contraseña</div>
      <v-layout column child-flex :class="ats('elevation-0 mb-3 white mx-3', '=', 'elevation-1 mb-1 white')">
        <div class="pa-4">
          <v-flex>
            <v-form ref="formReset" v-model="valid">
              <v-text-field 
                label="Nueva contraseña" 
                v-model="password" 
                :rules="passwordRules" 
                :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (hidePassword = !hidePassword)"
                :type="hidePassword ? 'password' : 'text'"
                @keyup.enter.native.prevent="submit"
                required>
              </v-text-field>
            </v-form>
          </v-flex>
          <v-btn
            large
            block
            depressed
            class="white--text ma-0 font-weight-bold"
            color="blue accent-3"
            @click.native="submit"
            @keyup.enter.native.prevent="submit"
            :disabled="status.loading || !valid"
            :loading="status.loading"
          >
            Cambiar mi contraseña
          </v-btn>
          <v-alert v-if="status.error" color="error" icon="warning" value="true">{{status.message}}</v-alert>
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
  data: () => ({
    password: '',
    loading: false,
    valid: false,
    passwordRules: [
      (v) => !!v || 'Password is required'
    ],
    hidePassword: true,
    status: {
      loading: false,
      error: false,
      message: ''
    }
  }),
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

    async submit () {
      if (this.$refs.formReset.validate()) {
        this.status.loading = true
        this.status.error = false
        this.status.message = ''
        try {
          let response = await this.$store.dispatch('auth/changePassword', { token: this.$route.params.token, password: this.password })
          if (response.success === true) {
            this.status.loading = false
            this.status.error = false
            this.status.message = ''
            this.$router.push('/login/password-change-success')
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
      }
    }
  }
}
</script>

<style>
</style>
