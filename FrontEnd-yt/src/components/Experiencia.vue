<template>
  <v-layout row wrap style="background-color: #D5E3E4">
      <v-spacer></v-spacer>
      <v-flex xs12 md7 white pa-4 :class="ats('', '', 'elevation-1 my-1')">
          <v-layout row wrap child-flex>
            <v-flex xs12 md8 :class="ats('', '', 'pr-3')">
              <v-flex xs12 text-align-left font-weight-bold text-xs-left pt-3 pb-1>
                  Describe vuestra experiencia. Esto ayudará a que los clientes os
                  encuentren cuando estén buscando una empresa como la tuya.
              </v-flex>
              <v-flex xs12 pa-1>
                <v-form ref="formSpecialization" v-model="valid">
                  <!-- <v-select
                    :items="industries"
                    v-model="user.specialization"
                    :rules="industryRules"
                    label="Especialización"
                    item-text="name"
                    item-value="name"
                    dense
                    required
                  ></v-select> -->
                  <v-text-field
                      v-model="user.description"
                      label="Experiencia"
                      persistent-hint
                      hint="12 palabras"
                      :rules="nameRules"
                      prepend-icon="search"
                      maxlength="100"
                      required
                  ></v-text-field>
                </v-form>
              </v-flex>
              <v-alert v-if="status.error" class="font-weight-bold" color="error" icon="warning" value="true">{{status.message}}</v-alert>
              <v-btn
                  block
                  depressed
                  class="white--text ma-0 font-weight-bold mt-2"
                  color="button"
                  :disabled="status.loading"
                  :loading="status.loading"
                  @click.native.stop="$emit('register', user)"
              >
                  Finalizar
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
  props: ['status'],
  data () {
    return {
      valid: false,
      // industries: require('@/misc/industries').default.industries,
      user: {
        description: '',
      },
      // industryRules: [
      //   (v) => !!v || 'Debe seleccionar una industria.'
      // ],
      nameRules: [
        (v) => !!v || 'Debes describir tu empresa!',
        (v) => (v && v.length >= 3 && v.length <= 100) || 'El nombre debe tener entre 3 y 100 caracteres!'
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
