<template>
  <v-layout row wrap style="background-color: #D5E3E4">
      <v-spacer></v-spacer>
      <v-flex xs12 md7 white pa-4 :class="ats('', '', 'elevation-1 my-1')">
          <v-layout row wrap child-flex>
            <v-flex xs12 md8 :class="ats('', '', 'pr-3')">
              <v-flex xs12 text-align-left font-weight-bold text-xs-left pt-3 pb-1>
                  Selecciona la especialización que mejor representa a tu empresa. Esto ayudará a que los clientes os
                  encuentren cuando estén buscando una empresa como la tuya.
              </v-flex>
              <v-flex xs12 pa-1>
                <v-form ref="formSpecialization" v-model="valid">
                  <v-select
                    :items="industries"
                    v-model="user.specialization"
                    :rules="industryRules"
                    label="Especialización"
                    item-text="name"
                    item-value="name"
                    dense
                    required
                  ></v-select>
                </v-form>
              </v-flex>
              <v-btn
                  block
                  depressed
                  class="white--text ma-0 font-weight-bold mt-2"
                  color="button"
                  @click.native.stop="$emit('nextstepper', user)"
              >
                  Ok
              </v-btn>
            </v-flex>
            <v-flex xs12 md4 :class="ats('pt-3', '=', 'py-4 pr-3 pl-4')">
              <div class="px-4 py-4" style="min-height: 180px; border: 1px solid #e3e3e3">
                <v-icon large color="grey lighten-1">far fa-lightbulb</v-icon>
                <div class="caption font-weight-bold mt-3 grey--text text--darken-1">Siempre puedes cambiar esto despues</div>
              </div>
            </v-flex>
          </v-layout>
      </v-flex>
      <v-spacer></v-spacer>
  </v-layout>
</template>

<script>

export default {
  data () {
    return {
      valid: false,
      industries: require('@/misc/industries').default.industries,
      user: {
        specialization: ''
      },
      industryRules: [
        (v) => !!v || 'Debe seleccionar una industria.'
      ]
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
