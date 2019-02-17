<template>
  <v-layout column mt-3>
    <v-flex xs12>
      <v-layout row wrap text-xs-center align-center justify-center>
        <v-flex xs12 md4 container style="border:1px solid #e3e3e3">
          <span>Registered Companies: {{company.items.length}}</span>
        </v-flex>
        <v-flex xs12 md4 container style="border:1px solid #e3e3e3">
          <span>Registered Solutions: {{solutionsCount}}</span>
        </v-flex>
        <v-flex xs12 md4 container style="border:1px solid #e3e3e3">
          <span>Registered Benefits: {{benefitsCount}}</span>
        </v-flex>
      </v-layout>
    </v-flex>

    <v-flex xs12 container>
      <v-layout row wrap>
        <v-flex xs6 title py-2>List of Users</v-flex>
        <v-spacer></v-spacer>
        <v-flex xs4>
          <v-text-field v-model="user.search" append-icon="search" label="Search" single-line hide-details></v-text-field>
        </v-flex>
      </v-layout>
      <v-divider style="border-bottom:: 1px solid #e3e3e3"></v-divider>
      <v-data-table
        :headers="user.headers"
        :items="user.items"
        :search="user.search"
        class="elevation-1"
        :rows-per-page-items="rows_per_page_items"
        :loading="!status.ready"
        disable-initial-sort
      >
        <template slot="items" slot-scope="props">
          <tr :class="props.item.active? 'grey--text text--darken-3' : 'grey--text text--lighten-1'">
            <td class="text-xs-center">{{ props.item.firstName }} {{ props.item.lastName }}</td>
            <td class="text-xs-center">{{ props.item.email }}</td>
            <td class="text-xs-center">{{ getFormattedDate(props.item.registered) }}</td>
            <td class="text-xs-center">{{ props.item.company.name }}</td>
            <td class="text-xs-center">{{ props.item.company.industry }}</td>
            <td class="text-xs-center">{{ props.item.active ? 'Active' : 'Inactive' }}</td>
            <td class="justify-center layout px-0">
              <v-btn :disabled="!status.ready" :loading="!status.ready" icon class="mx-0" @click="editUserActive(props.item._id)">
                <v-icon small v-if="!props.item.active">fas fa-toggle-off</v-icon>
                <v-icon small v-if="props.item.active">fas fa-toggle-on</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-flex>

    <v-flex xs12 container>
      <v-layout row wrap>
        <v-flex xs6 title py-2>List of Companies</v-flex>
        <v-spacer></v-spacer>
        <v-flex xs4>
          <v-text-field v-model="company.search" append-icon="search" label="Search" single-line hide-details></v-text-field>
        </v-flex>
      </v-layout>
      <v-divider style="border-bottom:: 1px solid #e3e3e3"></v-divider>
      <v-data-table
        item-key="_id"
        :headers="company.headers"
        :items="company.items"
        :search="company.search"
        class="elevation-1"
        :rows-per-page-items="rows_per_page_items"
        :loading="!status.ready"
        disable-initial-sort
      >
        <template slot="items" slot-scope="props">
          <tr :class="props.item.active? 'grey--text text--darken-3' : 'grey--text text--lighten-1'" @click="props.expanded = !props.expanded">
            <td class="text-xs-center">{{ props.item.name }}</td>
            <td class="text-xs-center">{{ props.item.industry }}</td>
            <td class="text-xs-center">{{ props.item.location }}</td>
            <td class="text-xs-center">{{ props.item.active ? 'Active' : 'Inactive' }}</td>
            <td class="justify-center layout px-0">
              <v-btn :disabled="!status.ready" :loading="!status.ready" icon class="mx-0" @click="editCompanyActive(props.item._id)">
                <v-icon small v-if="!props.item.active">fas fa-toggle-off</v-icon>
                <v-icon small v-if="props.item.active">fas fa-toggle-on</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
        <template slot="expand" slot-scope="props">
          <v-card flat>
            <v-data-table
              item-key="_id"
              :headers="company.solutions.headers"
              :items="props.item.solutions"
              class="elevation-1"
              :rows-per-page-items="rows_per_page_items"
              disable-initial-sort
              :hide-details="props.item.solutions.length > 10"
            >
              <template slot="items" slot-scope="props">
                <tr :class="props.item.active? 'grey--text text--darken-3' : 'grey--text text--lighten-1'">
                  <td class="text-xs-center">{{ props.item.description }}</td>
                  <td class="text-xs-center">{{ props.item.subIndustry }}</td>
                  <td class="text-xs-center">{{ props.item.active ? 'Active' : 'Inactive' }}</td>
                  <td class="justify-center layout px-0">
                    <v-btn :disabled="!status.ready" :loading="!status.ready" icon class="mx-0" @click="editSolutionActive(props.item._id)">
                      <v-icon small v-if="!props.item.active">fas fa-toggle-off</v-icon>
                      <v-icon small v-if="props.item.active">fas fa-toggle-on</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </template>
      </v-data-table>
    </v-flex>

  </v-layout>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import FontFaceObserver from 'fontfaceobserver'
import moment from 'moment'
// import _ from 'lodash'

const MIFont = new FontFaceObserver('Material Icons')

export default {
  data () {
    return {
      solutionsCount: 0,
      benefitsCount: 0,
      user: {
        search: '',
        items: [],
        headers: [
          { text: 'Name', align: 'center', value: 'firstName' },
          { text: 'Email', align: 'center', value: 'email' },
          { text: 'Registered', align: 'center', value: 'registered' },
          { text: 'Company', align: 'center', value: 'company.name' },
          { text: 'Industry', align: 'center', value: 'company.industry' },
          { text: 'Active', align: 'center', value: 'active' }
        ]
      },
      company: {
        search: '',
        items: [],
        solutions: {
          headers: [
            { text: 'Description', align: 'center', value: 'description' },
            { text: 'Sub-Industry', align: 'center', value: 'subIndustry' },
            { text: 'Validations', align: 'center', value: 'validations.length' },
            { text: 'Active', align: 'center', value: 'active' }
          ]
        },
        headers: [
          { text: 'Name', align: 'center', value: 'name' },
          { text: 'Industry', align: 'center', value: 'industry' },
          { text: 'Location', align: 'center', value: 'location' },
          { text: 'Active', align: 'center', value: 'active' }
        ]
      },
      solution: {
        count: 0,
        search: ''
      },
      benefit: {
        count: 0,
        search: ''
      },
      rows_per_page_items: [10, 20, 30, {'text': 'All', 'value': -1}],
      status: {
        ready: false,
        error: false,
        message: ''
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn', 'currentUser', 'getToken', 'isAdmin'])
  },
  methods: {
    async editUserActive (user) {
      this.setStatus(false, false, '')
      try {
        await axios.post('/api/admin/user/active', { user: user }, { headers: { 'Authorization': 'Bearer ' + this.getToken } })
        this.fetchData()
      } catch (error) {
        let message = ''
        if (error.response) {
          message = error.response.data.message
        } else if (error.request) {
          message = 'No response received from the server. If the problem persists contact the site administrator (' + error.message + ')'
        } else {
          message = error.message
        }
        this.setStatus(true, true, message)
      }
    },

    async editCompanyActive (company) {
      this.setStatus(false, false, '')
      try {
        await axios.post('/api/admin/company/active', { company: company }, { headers: { 'Authorization': 'Bearer ' + this.getToken } })
        this.fetchData()
      } catch (error) {
        let message = ''
        if (error.response) {
          message = error.response.data.message
        } else if (error.request) {
          message = 'No response received from the server. If the problem persists contact the site administrator (' + error.message + ')'
        } else {
          message = error.message
        }
        this.setStatus(true, true, message)
      }
    },

    async editSolutionActive (solution) {
      this.setStatus(false, false, '')
      try {
        await axios.post('/api/admin/solution/active', { solution: solution }, { headers: { 'Authorization': 'Bearer ' + this.getToken } })
        this.fetchData()
      } catch (error) {
        let message = ''
        if (error.response) {
          message = error.response.data.message
        } else if (error.request) {
          message = 'No response received from the server. If the problem persists contact the site administrator (' + error.message + ')'
        } else {
          message = error.message
        }
        this.setStatus(true, true, message)
      }
    },

    getFormattedDate (date) {
      return moment(date).format('YYYY-MM-DD')
    },

    setStatus (ready, error, message) {
      this.status.ready = ready
      this.status.error = error
      this.status.message = message
    },

    async fetchData () {
      this.setStatus(false, false, '')
      if (this.isAdmin) {
        try {
          let result = await Promise.all([
            axios.get('/api/admin/user/list', { headers: { 'Authorization': 'Bearer ' + this.getToken } }),
            axios.get('/api/admin/company/list', { headers: { 'Authorization': 'Bearer ' + this.getToken } })
          ])
            .catch(error => {
              throw error
            })
          this.user.items = result[0].data.list
          this.company.items = result[1].data.list
          this.solutionsCount = 0
          for (let i = 0, len = this.company.items.length; i < len; i++) {
            this.solutionsCount += this.company.items[i].solutions.length
          }

          this.benefitsCount = 0
          for (let i = 0, len = this.company.items.length; i < len; i++) {
            for (let j = 0, len = this.company.items[i].solutions.length; j < len; j++) {
              this.benefitsCount += this.company.items[i].solutions[j].benefits.length
            }
          }
          // this.userCount = result[1].data.count
          // this.battlesCount = result[2].data.count
          // this.maintenance = result[3].data.maintenance

          /* for (const  key in this.userList){
            this.userList[key].count = _.filter(result[4].data.battles, { player : this.userList[key].username }).length
          } */
          this.setStatus(true, false, '')
        } catch (error) {
          let message = ''
          if (error.response) {
            message = error.response.data.message
          } else if (error.request) {
            message = 'No response received from the server. If the problem persists contact the site administrator (' + error.message + ')'
          } else {
            message = error.message
          }
          this.setStatus(true, true, message)
        }
      } else {
        this.setStatus(true, true, 'Unauthorized access.')
      }
    }
  },
  beforeMount: function () {},
  created: function () {
    MIFont.load().then(() => { this.MIReady = true })
  },
  mounted: function () {
    this.fetchData()
  }
}
</script>

<style>
</style>
