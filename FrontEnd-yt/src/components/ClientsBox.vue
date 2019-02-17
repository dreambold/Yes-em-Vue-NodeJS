<template>
    <v-layout align-center justify-center row fill-height style="width: 100%; height: 100%; background: white; border-right: 1px solid #d6e4ee;">
        <v-flex xs9 style="padding: 22px 18px;">
            <span style="font-family: 'Roboto-regular'; font-size: 18px; color: #1a2c47">CLIENTES POR INDUSTRIA Y EMPRESAS</span>
            <v-layout row wrap style="padding: 0px 0 40px 0; margin-top: 10px; height: 471px;">        
                <span v-if="clientsFiltered.length == 0">Ningún cliente ha validado esta solución</span>
                <!-- <span v-if="solution.length === 0">No hay clientes aún</span> -->
                    <v-flex text-xs-left :class="'xs4'" v-for="(client, index) in clientsFiltered.slice(0,12)" v-bind:key="index" :style="index <=  3 ? 'text-align: left; margin-bottom: 0px;height: 120px;' : `height: 120px;text-align: left; margin-bottom: 0px;`">
                        <!-- {{clientsFiltered}} -->
                        <v-layout align-start justify-start column :style="`margin-top: ${clientsFiltered.length > 3 && clientsFiltered.length < 7 && index > 2 && index < 6? '-70px;' : '0px'}`"> 
                            <v-flex xs3>
                                <v-avatar :size="55" style="border: 0.7px solid #d4d4d4">
                                    <img :src="`${Number.isInteger(parseInt(client.pictureUrl.split('.')[0])) ? '/static/images/faces/' : client.pictureUrl.includes('http') ? '' : '/'}${client.pictureUrl}`" alt="" style="border: 0.7px solid #d4d4d4">
                                </v-avatar>
                            </v-flex>
                            <v-flex style="margin-left: 0px">
                                <span style="text-align: left; font-family: 'Roboto-regular'; color: #333333; font-size: 14px">{{(client.firstName.split(' '))[0]}} {{(client.lastName.split(' '))[0]}}</span>
                                <br>
                                <span style="font-family: 'Roboto-regular';text-align: left; color: #333333; font-size: 14px">{{client.positions.split('').splice(0,14).join('')}}<span v-if="client.positions.length > 14">...</span></span>
                                <br>
                                <span style="font-family: 'Roboto-regular';text-align: left; color: #333333; font-size: 14px">{{client.company.split('').splice(0,20).join('')}}<span v-if="client.company.length > 20">...</span></span>                                    
                            </v-flex>
                        </v-layout>
                    </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs5 :style="`margin-top: ${uniqueCompanies.length > 8 || uniqueIndustries.length > 8 ? '-5px' : '-135px'};`">
            <ul style="list-style: none">
                <li style="text-align: left;">
                    <span style="font-family: 'Roboto-bold'; font-size: 16px; color: #1a2c47">Industrias</span>
                </li>
                <div class="divWithCustomScroll" :style="`height: ${uniqueIndustries.length > 8 ? '161px' : '100%'}; ${uniqueIndustries.length > 8 ? 'overflow-y: scroll' : ''}; padding-left: ${uniqueIndustries.length > 8 ? '20px' : '0px'}; direction: rtl;`">
                    <li  style="text-align: left;" v-for="(industry, index) in uniqueIndustries" v-bind:key="index">
                        <span @click="filterClients(1, industry)" class="ul-list" :style="`text-decoration: ${industry === selectedClientFilter && clientsFiltered.length !== 0 ? 'underline' : ''}; font-family:'Roboto-regular'; font-size: 14px; color: #003953`">{{industry}}</span>
                    </li>
                </div>
            </ul> <br>
            <ul style="list-style: none">
                <li style="text-align: left;" >
                    <span style="font-family: 'Poppins-bold'; font-size: 16px; #1a2c47">Empresas</span>
                </li>
                <div class="divWithCustomScroll" :style="`height: 161px; overflow-y: ${uniqueCompanies.length > 8 ? 'scroll' : 'none'}; padding-left: ${uniqueCompanies.length > 8 ? '20px' : '0px'}; direction: rtl;`">
                    <li  style="text-align: left;" v-for="(company, index) in uniqueCompanies" v-bind:key="index">
                        <span @click="filterClients(2, company)" class="ul-list" :style="`text-decoration: ${company === selectedClientFilter && clientsFiltered.length !== 0 ? 'underline' : ''}; font-family: 'Poppins-regular'; font-size: 12`">{{company}}</span>
                    </li>
                </div>
            </ul>
        </v-flex>                    
    </v-layout>
</template>

<script>
import Vue from 'vue';
import AvatarList from './AvatarList';
import VueScrollTo from 'vue-scrollto';
import checkView from 'vue-check-view'
import Survey from './Survey';
import SurveyContact from './SurveyContact';

Vue.use(checkView)
Vue.use(VueScrollTo, {duration: 850})

export default {
    // props: ['solution', 'getCompanyData', 'happyClients', 'index', 'filterChange', '_validations', 'isFiltered', 'chartType'],
    props: ['solution', 'getCompanyData', 'menuOptions', 'email', 'clientsBySolution'],
    components: {
      AvatarList, Survey, SurveyContact
    },
    watch: {
        solution: function(val) {
            this.selectedSurvey = 'all'
            this.getUniquesItems()
        },
        clientsBySolution: function (val, val2) {
            console.log('clientsBySOlution Service card')
            console.log('clientsBySolution', val)
            console.log('clientsBySolution', val2)
            this.clientsBySolutionScoped = val;
            // console.log('clickToGoToClientsData', val)
            // this.filterClients(val.type, val.name)
            // VueScrollTo.scrollTo('#clientsByIndustryAndCompany', 500, { easing: 'ease-in', offset: -60, cancelable: true, x: false, y: true });
        }
    },
    computed: {
        pageCount(){
            //console.log('page counte', this.solution)
            let l = this.solution.surveys.length,
                s = (this.pageNumber == 0 ? 2 : 3);
            return Math.ceil(l/s);
        },
        currentSurveys(){
            const start = this.pageNumber * (this.pageNumber == 0 ? 2 : 2),
                end = start + (this.pageNumber == 0 ? 2 : 3);
                // console.log('START', start)
                if(this.pageNumber == 0) {
                    this.selectedSurvey = 'all'   
                } else {
                    this.selectedSurvey = (this.solution.surveys.slice(start, end))[0];
                }
            return (this.solution.surveys.filter(({ active }) => active)).slice(start, end);
        },        
        clientsPageCount() {
            let l = this.getTotalOther(this.selectedSurvey),
                s = 4;
            return Math.ceil(l/s);
        },
        currentClients() {
            const start = this.pageNumberClient * 4,
                end = start + 4;
            const data = (this.selectedSurvey.extraOptions.map(option => option)).filter(({ active }) => active).slice(start, end)
            return data
        }
    },    
    data () {
        return {
            clientsBySolutionScoped: false,
            clientsByCompany:true,
            pageNumberClient: 0,
            pageNumber: 0,
            total: {
                clients: 0,
                validations: 0
            },
            uniqueIndustries: [],
            uniqueCompanies: [],
            totalResults: null,
            locationUrl: '',
            isMobile: false,
            content: 'solutions',
            filter: '',
            isLoaded: false,
            optionActive: false,
            surveys: [],
            extra: [],
            newOptions: [],
            selectedValidationsClientsList: [],
            indexToRemove: null,
            dialog: false,
            extraOp: [],
            showValidationsOtherClients: false,
            showValidationsClients: false,
            selectedSurvey: '',
        }
    },
    methods: {
      ats(xs, sm, mdAndUp) { // According to Size
          if (this.$vuetify.breakpoint.xs) {
              return xs
          } else if (this.$vuetify.breakpoint.sm) {
              return sm === '=' ? xs : sm
          }
          if (this.$vuetify.breakpoint.mdAndUp) {
              return mdAndUp
          }
      },
        filterClients(type, filterWord) {
          this.selectedClientFilter = filterWord
          if(this.selectedSurvey === 'all') {
            //   console.log('es este')
              this.clientsFiltered = this.getHappyClients().filter(item => type === 1 ? 
                                                                    item.industry === filterWord : 
                                                                    item.company === filterWord)
          } else {
            this.clientsFiltered = this.getHappyClients(this.selectedSurvey).filter(item => type === 1 ? 
                                                                    item.industry === filterWord : 
                                                                    item.company === filterWord)
          }
            this.clientsByCompany = false
            this.clientsByCompany = true
      },

        getHappyClients (survey = this.solution.surveys) {
            let validations = []
            // console.log(survey)
            if(!Array.isArray(survey)) {
                survey.options.filter(({ active }) => active).forEach(option => {
                    option.validations.forEach(validation => {
                        validations.push(validation)
                    })
                })
                if(survey.extraOptions) {
                    survey.extraOptions.filter(({ active }) => active).forEach(option => {
                        // console.log('EXTRAS', option.validations[0])
                        validations.push(option.validations[0])
                    })                    
                }

                // console.log('indivdual', survey)
            } else {
                // console.log(survey)
                survey.forEach(survey => {
                    survey.options.filter(({ active }) => active).forEach(option => {
                        option.validations.forEach(validation => {
                            validations.push(validation)
                        })
                    })
                })
                if(survey.extraOptions) {
                    survey.extraOptions.filter(({ active }) => active).forEach(option => {
                        // console.log('EXTRAS', option.validations[0])
                        validations.push(option.validations[0])
                    })        
                }
                        
            }
            // console.log(validations)
            return (this.checkDuplicateInObject('id', validations))
            // return validations
        },                         
        selectSurvey(survey) {
            this.selectedSurvey = survey
            this.pageNumberClient = 0
        },   
        getUniquesItems() {
            let clients = null;
            this.selectedSurvey === 'all' ? clients = this.getHappyClients() : clients = this.getHappyClients(this.selectedSurvey)
            // console.log('clients', clients)
            const industries = clients.map(client => client.industry)
            // console.log('industries', industries)
            const companies = clients.map(client => client.company)
            // console.log('comapanies', companies)
            this.uniqueIndustries = [...new Set(industries.sort())];
            this.uniqueCompanies = [...new Set(companies.sort())];
            if(this.uniqueIndustries.length == 0) {
                // console.log(this.uniqueIndustries, this.uniqueIndustries)                
                this.filterClients(1, 'undefined')
            } else {
                // console.log('filtering', this.uniqueIndustries[0])
                this.filterClients(1, this.uniqueIndustries[0])
            }
            // console.log('unique indusries',this.uniqueIndustries)
            // console.log('unique companies', this.uniqueCompanies)
        }  ,
        checkDuplicateInObject(propertyName, inputArray) {
            let seenDuplicate = false,
                testObject = {};
            inputArray.map(item => {
                const  itemPropertyName = item[propertyName];
                if (itemPropertyName in testObject) {
                    testObject[itemPropertyName].duplicate = true;
                    item.duplicate = true;
                    seenDuplicate = true;
                } else {
                    testObject[itemPropertyName] = item;
                    item.duplicate = false;
                }
            });
            return Object.values(testObject);
        },
    },
    mounted() {
        this.getTotalCountValidations()
        this.filterClients(1, 'Real State')
        this.getUniquesItems()
        // this.selectedSurvey = (this.solution.surveys.slice(start, end))[0];
    },
    updated() {
    },
    beforeUpdate() {
        // console.log('before updated', this.solution)
        this.getTotalCountValidations()
        let counter = 0
        this.solution.surveys.forEach(survey => {
            (survey.options.sort((a, b) => b.validations.length - a.validations.length)).filter(({active}) => active).forEach((option, index) => {
                if(!option.hasOwnProperty('perc')) {
                    if(option.validations.length !== 0) {
                        option.perc = index === 0 ? 100 : ((100*option.validations.length)/survey.options.filter(({ active }) => active)[0].validations.length)
                    } else {
                        option.perc = 0;
                    }
                    
                }
            });
            survey.extraOptionPerc = ((100*(survey.extraOptions.filter(({active}) => active)).length)/survey.options.filter(({ active }) => active)[0].validations.length)
        });
        console.log(this.clientsBySolution)
        // this.clientsBySolutionScoped = this.clientsBySolution
        this.getUniquesItems()
    }
}
</script>

<style>
  
    .selected {
        color: #3a44b1 !important;
    }

    .sectionSelected {
        border-bottom: 3px solid #00c1a6;
        text-transform: none;
        color: gray;
        transform: all 0.1s
    }

    .ul-list:hover {
        cursor: pointer !important
    }

    .v-chip .v-chip__content:hover {
        cursor: pointer !important;
    }

    .v-chip .v-chip__content:hover {
        background-color: rgb(209, 209, 209);
    }

    .moreValidationsButton:hover {
        background-color: rgb(233, 233, 233);
        cursor: pointer !important;
    }

    /* width */
    div.divWithCustomScroll::-webkit-scrollbar {
        width: 4px;
    }

    /* Track */
    div.divWithCustomScroll::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px #cecece; 
        border-radius: 10px;
    }
    
    /* Handle */
    div.divWithCustomScroll::-webkit-scrollbar-thumb {
        background: rgb(0, 0, 167); 
        border-radius: 10px;
    }

    div.divWithCustomScroll::-webkit-scrollbar-thumb:hover {
        cursor: pointer;
    }

 ._surveySelected {
        background: white;
        color: #e57e35; 
        font-weight: bold;
        user-select: none; 
        margin-right: 12px;
        border-radius: 3px;
        cursor: pointer; 
        width: 294px; 
        height: 72px;
        padding: 15px; 
        text-align: center; 
        border-top: 1px solid #cecece; 
        border-left: 1px solid #cecece; 
        border-right: 1px solid #cecece; 
        border-bottom: 5px solid #e57e35;
        padding: 25px    
    }

    ._surveyNotSelected {
        background: white;
        color: black;
        user-select: none; 
        margin-right: 12px;
        border-radius: 3px;
        cursor: pointer; 
        width: 294px; 
        height: 72px;
        padding: 15px; 
        text-align: center; 
        border: 1px solid #cecece; 
        padding: 25px    
    }

</style>
