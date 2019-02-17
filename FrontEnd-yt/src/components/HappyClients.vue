<template>
  <v-card :flat="$vuetify.breakpoint.smAndDown" class="px-4 pt-3 pb-4">
    <v-layout row wrap>
      <v-flex xs12 py-4 text-xs-left>
        <div class="button--text font-weight-bold subheading">Rebice apoyo de tus clientes</div>
        <div class="mt-1">
          Las validaciones de terceros es lo que un cliente potencial necesita para decidir sobre que producto o servicio adquirir.
        </div>
      </v-flex>
      <v-flex xs12 md4 :class="ats('pb-4 text-xs-left', '=', 'px-3 pt-3 pb-4 text-xs-left')">
        <div>
            <v-btn fab small depressed color="teal accent-4" class="white--text body-1">1</v-btn>
        </div>
        <div class="grey--text text--darken-2 body-1 font-weight-bold my-1">Envía el link de tu solución.</div>
        <div class="grey--text text--darken-2 body-1">Envía este link a tus clientes y recibe su apoyo.</div>
      </v-flex>
      <v-flex xs12 md4 :class="ats('pb-4 text-xs-left', '=', 'px-3 pt-3 pb-4 text-xs-left')">
        <div>
            <v-btn fab small depressed color="light-blue accent-4" class="white--text body-1">2</v-btn>
        </div>
        <div class="grey--text text--darken-2 body-1 font-weight-bold my-1">Recibe apoyos.</div>
        <div class="grey--text text--darken-2 body-1">Tus clientes validan tu solución y resultados.</div>
      </v-flex>
      <v-flex xs12 md4 :class="ats('pb-4 text-xs-left', '=', 'px-3 pt-3 pb-4 text-xs-left')">
        <div>
            <v-btn fab small depressed color="red accent-4" class="white--text body-1">3</v-btn>
        </div>
        <div class="grey--text text--darken-2 body-1 font-weight-bold my-1">Muestra tus Happy Clients.</div>
        <div class="grey--text text--darken-2 body-1">Ayuda a que un cliente potencial tome una decisión sobre tu producto o servicio.</div>
      </v-flex>
      <v-flex xs12 text-xs-left>
        <div class="button--text font-weight-bold subheading pb-3">Tus soluciones</div>
        <div v-if="!getStatus.loading && getSolutions.length > 0" v-for="(solution, index) in getSolutions" :key="solution._id">
          <v-layout row wrap child-flex fill-height justify-center align-center>
            <v-flex :class="ats('subheading grey--text text--darken-4 pr-3 font-weight-bold', '=', 'subheading grey--text text--darken-4 pr-3 font-weight-bold')">Solución {{index + 1}} Link</v-flex>
            <v-flex :class="ats('grey--text text--darken-1 font-weight-bold caption', '=', 'grey--text text--darken-1 font-weight-bold')">
              www.yesthem.com/{{getCompanyData.identifier}}/{{solution.category}}
            </v-flex>
            <input ref="solutionLink" type="text" :value="!getStatus.loading? 'www.yesthem.com/' + getCompanyData.identifier + '/' + solution.category : ''" tabindex='-1' aria-hidden='true' style="position: absolute; left: -9999px">
            <v-flex :class="ats('mb-3', '=', '')">
              <div>
                <v-btn icon small :style="ats('height: 24px; width: 24px; margin-left: 0px !important', '=', 'height: 36px; width: 36px')" fab color="grey lighten-1" @click="copyToClipboard(index)">
                  <v-icon small :style="ats('font-size: 12px', '=', 'font-size: 18px')" color="white">fas fa-link</v-icon>
                </v-btn>
                <span :class="ats('subheading grey--text text--darken-1 font-weight-bold body-1', '=', 'subheading grey--text text--darken-1 font-weight-bold')">Copy Link</span>
              </div>
            </v-flex>
          </v-layout>
        </div>
        <v-progress-linear v-if="getStatus.loading" color="button" :indeterminate="true"></v-progress-linear>
        <div v-if="!getStatus.loading && getSolutions.length === 0" class="caption">No hay soluciones registradas.</div>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn', 'currentUser']),
    ...mapGetters('company', ['getCompanyData', 'getStatus', 'setStatus', 'getSolutions', 'getBenefits', 'getExperiences', 'getTotalValidations'])
  },
  methods: {
    copyToClipboard (index) {
      this.$refs.solutionLink[index].select()
      document.execCommand('copy')
    },

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
    }
  }
}
</script>

<style>
</style>
