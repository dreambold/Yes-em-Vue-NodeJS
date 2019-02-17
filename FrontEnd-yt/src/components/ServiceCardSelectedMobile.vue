<template>
    <div style="width: 100%;">
        <div style="width: 100%;background: rgb(243, 243, 243);padding: 8px;border-top: 1px solid #ececec;text-align: left;">
            <span style="font-family: 'Roboto-medium'; font-size: 12px; color: #949494">
                {{solution.category.toUpperCase()}}
            </span>
        </div>
        <div v-if="solution.surveys.filter(({active}) => active).length == 0" style="padding: 15px">
            <span>No se han agregado estadisticas aun</span>
        </div>
        <div v-for="(item, index) in (showAllValidations ? solution.surveys.filter(({active}) => active) : solution.surveys.filter(({active}) => active).slice(0, 3))" :key="index" style="width: 100%;height: 100%;margin-bottom: 0px;padding: 24px 18px 20px 18px;background: white;display: flex;flex-direction: column;border: 1px solid #efefef;border-radius: 3px;">
            <div @click="distpachNavigateToSurvey(item);" style="cursor: pointer; width: 100%; margin-bottom: 7px; text-align: left"><span style="font-family: 'Roboto-bold'; font-size: 18px; color: #333333">{{item.question}}</span></div>
            <div v-if="getHappyClientsBySurvey(item).length > 0" style="display: flex; align-items: center; padding-left: 17px">
                <div align="left" class="" style="padding-left: 15px; display: flex; align-items: center" v-for="(client, index) in getHappyClientsBySurvey(item).slice(0,3)" v-bind:key="index">
                    <div v-if="client.pictureUrl" :style="`padding-top: 7px; margin-left: -30px; background-size: cover; border: 1px solid #e3e3e3;border-radius: 50%; width: 20px; height: 20px; background-image: url(${Number.isInteger(parseInt(client.pictureUrl.split('.')[0])) ? '/static/images/faces/' : client.pictureUrl.includes('http') ? '' : '/'}${client.pictureUrl})`">
                    </div> 
                </div>
                <div @click="distpachNavigateToSurvey(item);" style="width: 100%; text-align: left">
                    <span style="cursor: pointer; color: #949494; font-family: 'Roboto-regular'; font-size: 12px; margin-left: -3px">• {{getHappyClientsBySurvey(item).length}} clientes han validado opciones de la estadistica</span>
                </div>
            </div>
            <div v-if="getHappyClientsBySurvey(item).length == 0" style="display: flex; align-items: center;">
                <span style="color: #949494; font-family: 'Roboto-regular'; font-size: 13px; margin-left: 10px">No hay clientes que hayan validado</span>
            </div>
            <div style="display: flex; align-items: center; margin-top: 7px">
                <div @click="distpachNavigateToSurvey(item)" style="cursor: pointer;display: flex; align-items: center;text-align: left">
                    <img src="/static/images/cajaestad.png" style="margin-right: 10px;" alt="icon header clients">
                    <span style="font-family: 'Roboto-medium'; font-size: 11px; color: #666666">{{item.description}}</span>
                </div>
                <div @click="distpachNavigateToSurvey(item);" style="cursor: pointer;display: flex; align-items: center; margin-left: 30px;text-align: left">
                    <img src="/static/images/cajavalid.png" style="margin-right: 10px" alt="icon header clients">
                    <span style="font-family: 'Roboto-medium'; font-size: 11px; color: #666666">Validaciones <span style="margin: 0 7px 0 5px">•</span> <span style="font-family: 'Roboto-regular';">{{getValidationsBySurvey(item)}}</span></span>
                </div>
            </div>
        </div>
        <div v-if="solution.surveys.filter(({active}) => active).length > 3" @click="showAllValidations = !showAllValidations" style="background: white; display: flex; justify-content: center; align-items: center; padding: 10px;">
            <span style="display: flex; align-items: center">
                <span v-if="!showAllValidations" style="color: #333333">Mas estadisticas</span>
                <span v-if="showAllValidations" style="color: #333333">Menos estadisticas</span>
                <v-icon v-if="showAllValidations" center style="color: #333333; font-size: 16px; margin-right: 10px">keyboard_arrow_up</v-icon>
                <v-icon v-if="!showAllValidations" center style="color: #333333; font-size: 16px; margin-left: 10px">keyboard_arrow_down</v-icon>
            </span>        
        </div>
    </div>

</template>

<script>
import Vue from 'vue';
import AvatarList from './AvatarList';
import VueScrollTo from 'vue-scrollto';
import checkView from 'vue-check-view'
import Survey from './Survey';
import SurveyContact from './SurveyContact';
import SurveyMobile from './SurveyMobile';

Vue.use(checkView)
Vue.use(VueScrollTo, {duration: 850})

export default {
    // props: ['solution', 'getCompanyData', 'happyClients', 'index', 'filterChange', '_validations', 'isFiltered', 'chartType'],
    props: ['solution', 'getCompanyData', 'menuOptions', 'email', 'isMobile', 'activeSolution', 'open'],
    components: {
      AvatarList, Survey, SurveyContact, SurveyMobile
    },
    watch: {
        '$route.params': function(val) {
            // window.scrollTo({ top: 300, behavior: 'smooth' })
            // this.$refs.surveysItemsWrapperScroll.scrollLeft = 0
        }
    },
    computed: {
        clientsPageCount() {
            let l = this.getTotalOther(this.selectedSurvey),
                s = 4;
            return Math.ceil(l/s);
        },
        currentClients() {
            const start = this.pageNumberClient * 1,
                end = start + 1;
            const data = (this.selectedSurvey.extraOptions.map(option => option)).filter(({ active }) => active).slice(start, end)
            return data
        }        
    },    
    data () {
        return {
            showAllValidations: false,
            selectedSolution: '',
            pageNumberClient: 0,
            pageNumber: 0,            
            showMoreClients: false,
            clientsByCompany:true,
            pageNumberClient: 0,
            pageNumber: 0,
            total: {
                clients: 0,
                validations: 0
            },
            showClientsExtraOptions: true,
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
        getClientsBySolution(solution) {
            let clients = [];
            (solution.surveys.filter(({ active }) => active)).forEach(survey => {
                (survey.options.filter(({ active }) => active)).forEach(option => {
                    option.validations.forEach(validation => clients.push(validation))
                })
            });
            return (this.checkDuplicateInObject('id', clients));
        },
        getValidationsBySurvey(survey) {
            let validations = 0;
            (survey.options.filter(({ active }) => active)).forEach(option => {
                validations = validations + option.validations.length
            });
            return validations;
        },
        getHappyClientsBySurvey(survey = '') {
          if(survey != '') {
              let validations = [];
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
              return (this.checkDuplicateInObject('id', validations))                
          } else {
              return []
          }
        },
        checkDuplicateInObject(propertyName, inputArray) {
          let seenDuplicate = false,
              testObject = {};
          inputArray.map(item => {
              const itemPropertyName = item[propertyName];
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
        transformString(s) {
            let splitted = s.split(' ');
            if (splitted.length > 1) {
                return (splitted.map(word => word.charAt(0).toUpperCase() + (word.slice(1)).toLowerCase())).join(' ');
            } else {
                return  splitted[0].charAt(0).toUpperCase() + (splitted[0].slice(1)).toLowerCase();
            }
        },
        distpachNavigateToSurvey(item) {
            this.$emit('distpachNavigateToSurvey', item)
        },
        distpachNavigateToClients(item) {
            console.log('distpachNavigateToClients', item)
            this.$emit('distpachNavigateToClients', item)
        }
    },
    beforeMount() {
        this.isMobile = this.checkDeviceType();
        console.log('Company Data', this.getCompanyData)
        this.selectedSolution = this.activeSolution ? this.activeSolution : this.getCompanyData.solutions[0].category;
        this.index == 0 ? this.showBoxContent = true : this.showBoxContent = false
        this.open ? this.showBoxContent = true : this.showBoxContent = false
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

    .surveySelected {
        height: 36px;
        padding: 0 25px 0 25px;
        margin-right: 12px;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        align-items: center;        
        background: #ff6a00;
        color: white; 
        font-weight: bold;
        user-select: none; 
        border-radius: 50px;
        cursor: pointer; 
        text-align: center;
    }

    .surveyNotSelected {
        height: 36px;
        padding: 0 25px 0 25px;
        margin-right: 12px;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        align-items: center;        
        background: #fce2d0;
        color: #f38a3f;
        font-weight: bold;
        user-select: none; 
        border-radius: 50px;
        cursor: pointer; 
        text-align: center; 
    }

    .stickySurveys {
        position: -webkit-sticky;
        position: -moz-sticky;
        position: -ms-sticky;
        position: -o-sticky;
        position: sticky;
        top: 0px;
        margin-bottom: 0px;
        background-color: white;
        border-bottom: 1px solid #ececec;
    }

</style>
