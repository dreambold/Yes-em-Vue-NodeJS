<template>
  <v-card :flat="$vuetify.breakpoint.smAndDown" class="px-4 pt-3 pb-5">
    <v-layout column fill-height>
      <v-flex py-4 text-xs-left>
        <div class="button--text font-weight-bold subheading">¿Cómo quieres dar las gracias a tus clientes?</div>
        <div class="mt-1">
          Escribe un mensaje que verán una vez muestren su apoyo a tus soluciones. No te preocupes, puedes volver a editarlo en cualquier momento.
        </div>
      </v-flex>
      <v-flex>
        <v-textarea
          v-model="thanks"
          outline
          style="background-color: white"
          :disabled="getStatus.loading"
          :rows="10"
          no-resize
        >
        </v-textarea>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      thanks: ''
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn', 'currentUser']),
    ...mapGetters('company', ['getCompanyData', 'getStatus', 'setStatus', 'getSolutions', 'getBenefits', 'getExperiences', 'getTotalValidations'])
  },
  watch: {
    "getStatus.loading": function (a, b) {
      if (!this.getStatus.loading && !this.getStatus.error) {
        this.thanks = this.getCompanyData.thanks
      }
    }
  },
  methods: {
    async save (reload) {
      if (this.thanks.length <= 100) {
        const response = await this.$store.dispatch('company/thanks', {thanks: this.thanks, company: this.getCompanyData._id})
        if (response.success === true) {
          this.$emit('reload', {reload: reload, redirect: false})
          return true
        }
      } else {
        await this.$store.dispatch('company/setStatus', { loading: false, error: true, message: 'Please make sure to fill all the necessary information.' })
        return false
      }
    }
  }
}
</script>

<style>
</style>
