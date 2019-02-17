<template>
	<v-layout style="">
    <!-- <v-toolbar fixed height="88" extension-height="58" class="white elevation-1 no-padding" style="z-index: 9998">
      <v-layout row wrap fill-height justify-center align-center>
        <v-flex xs12 md8 white>
          <v-layout row wrap>
              <div>
                  <router-link to="/" class="subheading font-weight-bold black--text" style="text-decoration: none;">
                    <img src="/static/images/logo.png" alt="logo" class="mt-3" style="width: 90px !important; height: 37px !important">
                  </router-link>
              </div>
              <v-spacer></v-spacer>
          </v-layout>
        </v-flex>
      </v-layout>
    </!-->
    <v-flex xs12 v-if="status.loading === true">
      <v-layout row fill-height justify-center align-top>
        <v-flex xs6 pa-5 style="margin-top: 12%">
          <v-progress-circular indeterminate size="46" color="button" class="mb-3"></v-progress-circular>
          <br>
          <span class="font-weight-bold">{{status.message}}</span>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12 v-if="status.loading === false && status.error === true">
      <v-layout row fill-height justify-center align-top>
        <v-flex xs6 pa-5 style="margin-top: 12%"> 
          <v-icon size="64" color="red">warning</v-icon>
          <br>
          <span class="font-weight-bold">{{status.message}}</span>
          <br>
          <button @click="$router.push(`/`)" type="button" style="outline: none; border: 1px solid #cecece; border-radius: 5px; padding: 10px;">Go Back</button>
        </v-flex>
      </v-layout>
    </v-flex>
	</v-layout>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  components: {},
  data () {
    return {
      status: {
        loading: false,
        error: false,
        message: ''
      }
    }
  },
  computed: {
    ...mapGetters('linkedin', ['isAuthorized', 'authorize', 'getToken']),
    ...mapGetters('auth', ['isLoggedIn', 'currentUser', 'getToken']),
    ...mapGetters('company', ['getCompanyData', 'getStatus', 'getSolutions', 'getBenefits', 'getCategories', 'getExperiences', 'getTotalValidations'])
  },
  methods: {},
  mounted: async function () {
    this.status.loading = true
    this.status.error = false
    this.status.message = 'Logging you in with Linkedin'

    try {
      let response = await this.$store.dispatch('linkedin/getOauth', { code: this.$route.query.code, state: this.$route.query.state })
      if (response.success === true) {
        this.$router.push('/' + response.identifier + '/' + response.service + '/validate')
      } else {
        this.status.loading = false
        this.status.error = true
        this.status.message = 'Acceso no autorizado'
      }
    
    } catch (error) {
      this.status.loading = false
      this.status.error = true
      this.status.message = 'Acceso no autorizado'
    }

  }
}
</script>

<style scoped>
.v-toolbar__content {
  padding: 0px !important;
}
</style>
