<template>
    <div :style="ats('', '=', 'margin-top: 0px; display: flex; flex-direction: column; align-items: center; justify-content: space-evenly; background-color: white; padding: 0px 0 0px 0; text-align: left; margin-bottom: 20px; height: 100%')"> 

        <div style="width: 100%; height: 100%; padding-top: 0px; display: flex; justify-content: space-evenly; flex-direction: column; margin-top: 0px">
            <div v-if="solutions.length > 3" style="display: flex; align-items:flex-end; justify-content: flex-end">
                <div style="padding: 0px 55px 0px 92px">
                    <span :style="`font-family: 'Roboto-regular'; user-select: none; font-size: 16px; margin-right: 25px; cursor: pointer; color: ${pageNumber==0 ? '#b8b8b8' : '#333333'}`" @click="pageNumber==0 ? false : prev()"><v-icon center style="color: #b8b8b8; font-size: 16px; margin-right: 10px">fas fa-chevron-left</v-icon>Anterior</span>
                    <span :style="`font-family: 'Roboto-regular'; user-select: none; font-size: 16px; cursor: pointer; color:  ${pageNumber >= pageCount -1 ? '#b8b8b8' : '#333333'}`" @click="pageNumber >= pageCount -1 ? false : next()">Siguiente<v-icon center style="color: #b8b8b8; font-size: 16px; margin-left: 10px">fas fa-chevron-right</v-icon></span>
                </div>                
            </div>
            <!-- <div :class="solution.surveys.filter(({active}) => active).length > 3 ? 'divWithCustomScroll3' : ''" :style="solution.surveys.filter(({active}) => active).length > 3 ? 'width: 100%;overflow-x: scroll; overflow-y: hidden; white-space: nowrap;' : 'width: 100%;height: 100%;display: flex;flex-direction: row; justify-content: space-evenly;'"> -->
            <div style="margin: 0 0px 0 38px">
                <div :style="`width: 100%; display: flex; flex-direction: column`">
                    <div :style="`width: 100%; display: flex; justify-content: ${currentSolution.length == 1 ? '' : 'center'}; margin-left: ${currentSolution.length == 1 ? '27px' : ''}`">
                        <div
                            v-for="(solution, index) in currentSolution"
                            :key="index"
                            :style="`min-width: 342px; width: 342px; height: 381px; cursor: pointer; margin: ${index == currentSolution.length ? '0px 0px 0px 0px;' : '0px 27px 0px 0px;'} -webkit-box-shadow: 0 1px 4px rgba(0,0,0,.1); box-shadow: 0 1px 4px rgba(0,0,0,.1); display: flex; flex-direction: column; -webkit-box-sizing: border-box; box-sizing: border-box; padding: 24px; background-color: #fff; border: 1px solid #e6e6e6; border-radius: 3px; -webkit-transition: .3s box-shadow; -o-transition: .3s box-shadow; transition: .3s box-shadow;`"
                        >
                            <div style="margin-bottom: 2px; margin-left: -4px" @click="dispatchSolution(solution.category)">
                                <span style="color: #333333; font-family: 'Roboto-bold'; font-size: 14px; text-transform: uppercase">{{solution.category}}</span>
                            </div>
                            <div class="divWithCustomScroll2" :style="`margin-left: -6px; overflow-y: ${solution.surveys.length > 4 ? 'scroll' : ''}; overflow-x: hidden`">
                                <div 
                                class="boxItemSolution"
                                v-for="(survey, index) in solution.surveys.filter(({ active }) => active)"
                                :key="index"           
                                @click="selectSurvey(survey, solution)" 
                                style="display: flex; justify-content: flex-start; align-items: center; padding: 8px 3px; margin-right: 10px;">
                                    <v-tooltip bottom max-width="230px">
                                        <div slot="activator" style="width: 100%; display: flex; align-items: center">
                                            <div>
                                                <img src="/static/images/jpg1/stad_box.png" alt="stadistic" style="width: 27px; height: auto">
                                            </div>
                                            <div  style="width: 224px; color: #333333; font-size: 15px; text-align: left; margin-left: 10px;">
                                                <span style="font-family: 'Roboto-regular'">
                                                    {{survey.description}} - {{survey.question}}
                                                </span>
                                            </div>
                                        </div>
                                        <span>{{survey.description}} - {{survey.question}}</span>
                                    </v-tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="pageCount > 1" style="width: 100%; display: flex; justify-content: center">
                        <div v-for="item in pageCount" :key="item">
                            <!-- <span>{{item}}</span> -->
                            <div :style="`width: 12px;height: 12px;background: ${item-1 === pageNumber ? '#595a5a' : 'white'};border-radius: 50%;cursor: pointer;border: 1px solid #595a5a;margin: 0 5px 0 5px;`"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
       <v-dialog
          v-model="showValidationsOtherClients"
          lazy
          width="774px"
          style="z-index: 9999 !important;"
          :fullscreen="$vuetify.breakpoint.smAndDown"
        >
          <v-card style="height: 100%">
            <v-card-title :style="ats('height: 30px; border-bottom: 4px solid #eeeeee;', '=', 'padding: 0px; height: 50px; border-bottom: 1px solid #e3e3e3')" :class="ats('text-xs-right', '=', 'pl-2 text-xs-right')">
                <div class="font-size-20 px-2 color-00306e">
                    {{extraOp.length}} Clientes Validaron
                </div>              
                <v-icon :color="$vuetify.breakpoint.smAndDown? 'black': 'grey darken-1'" style="cursor: pointer;font-size: 30px;font-weight: 400;color: rgba(102, 102, 102, 0.6);margin-left: 460px" @click="showValidationsOtherClients = false">close</v-icon>
            </v-card-title>
            <div style="padding: 10px 0px 10px 10px;">
                <v-layout align-left justify-start column fill-height>
                    <v-flex v-for="(op, index) in extraOp" v-bind:key="index">
                        <v-layout align-left justify-start row fill-height style="height: 70px;">
                            <v-flex xs1 style="margin-right: 15px;">
                                <v-avatar :size="$vuetify.breakpoint.smAndDown ? '54' : '54'" color="white" style="margin-top: 10px;">
                                    <img
                                        :src="`${Number.isInteger(parseInt(op.validations[0].pictureUrl.split('.')[0])) ? '/static/images/faces/' : op.validations[0].pictureUrl.includes('http') ? '' : '/'}${op.validations[0].pictureUrl}`"
                                        style="border: 1px solid #e3e3e3"
                                    />
                                </v-avatar>
                            </v-flex>
                            <v-flex xs10 style="text-align: left; margin-left: -5px">
                                <div style="margin-top: 24px;">
                                    <span style="text-align: left">
                                        <span style="font-weight: bold; font-size: 16px">{{(op.validations[0].firstName.split(' '))[0]}} {{(op.validations[0].lastName.split(' '))[0]}}</span> · <span style="font-size: 16px; color: #696969">{{op.validations[0].positions}}</span> · <span style="font-size: 16px; color: #696969">{{op.validations[0].company}}</span>
                                    </span>                                    
                                    <!-- <span style="font-size: 16px; font-weight: bold;text-align: left">
                                        {{(op.validations[0].firstName.split(' '))[0]}} {{(op.validations[0].lastName.split(' '))[0]}} · <span style="font-size: 14px; color: #696969; font-family: Calibri;text-align: left"></span>
                                    </span> -->
                                    <!-- <br>
                                    <span>
                                        <span style="font-size: 14px; color: #696969; font-family: Calibri;text-align: left">{{op.validations[0].positions}}·{{op.validations[0].company}}</span>                                         
                                        <span style="font-size: 14px; color: #696969; font-family: Calibri;text-align: left">{{op.validations[0].hasOwnProperty("positions") ? !op.validations[0].positions.values ? '' : op.validations[0].positions.values[0].company.name : op.validations[0].company }} · {{op.validations[0].headline}}</span> 
                                    </span> -->
                                </div>
                            </v-flex>
                        </v-layout>
                        <hr v-if="index != extraOp.length-1" style="margin-left: 70px; border: 0.5px solid #d2d2d2;">
                    </v-flex>
                </v-layout>
            </div>
          </v-card>
        </v-dialog>   


    </div>
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
    props: ['solution', 'getCompanyData', 'solutions', 'menuOptions', 'email', 'byClientsMenu', 'selectedSurveyToShow'],
    components: {
      AvatarList, Survey, SurveyContact
    },
    watch: {
        solution: function(val) {
            this.selectedSurvey = 'all'
            this.getUniquesItems()
        },
    },
    computed: {
        pageCount(){
            let l = this.solutions.length,
                s = 3
            return Math.ceil(l/s);
        },
        currentSolution(){
            const start = this.pageNumber * 3,
                end = start + 3
                console.log('thispage numebr', this.pageNumber)
                    this.selectedSurvey = (this.solutions.slice(start, end))[0];
            return (this.solutions.filter(({ active }) => active)).slice(start, end);
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
            circleCount: [],
            loaded: false,
            selectedClientFilter: '',
            tab: 0,
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
            uniquePositions: [],
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
        validate() {
            localStorage.setItem('getCompanyData', JSON.stringify(this.getCompanyData));
            window.location.replace(`http://yesthem.com/${this.getCompanyData.identifier}/${(this.solution.identifier).toLowerCase()}/validate`)
        },
        scrollTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        },
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
        next(type = 0) {
            type === 0 ? this.pageNumber++ : this.pageNumberClient++;
            // this.stack = this.currentSurveys.map(item => item)
            // this.prevStack = this.currentSurveys.map(item => item)
            // this.currentSurveys = this.solution.surveys.splice(0,3)
            // console.log('current', this.currentSurveys)
        },
        prev(type = 0) {
            type === 0 ? this.pageNumber-- : this.pageNumberClient--;
            // this.currentSurveys = this.prevStack
        },         
        transformString(s) {
            let splitted = s.split(' ');
            if (splitted.length > 1) {
                return (splitted.map(word => word.charAt(0).toUpperCase() + (word.slice(1)).toLowerCase())).join(' ');
            } else {
                return  splitted[0].charAt(0).toUpperCase() + (splitted[0].slice(1)).toLowerCase();
            }
        },
        dispatchSolution(solution) {
            this.$emit('dispatchSolution', {solution})
        },
        filteringPosition(position) {
            console.log('FILTERING POSITION', position)
            return position.length < 10
        },
        getTotalCountValidations() {
            let clients = [];
            (this.solution.surveys.filter(({ active }) => active)).forEach(survey => {
                (survey.options.filter(({ active }) => active)).forEach(option => {
                    option.validations.forEach(validation => clients.push(validation))
                })
            });
            this.total.clients = (this.checkDuplicateInObject('id', clients)).length;
            (this.solution.surveys.filter(({ active }) => active)).forEach(survey => {
                (survey.extraOptions.filter(({ active }) => active)).forEach(eo => {
                    // console.log(eo)
                    if(eo.validations.length > 0) {
                        clients.push(eo.validations[0]);
                        this.total.clients = this.total.clients + 1
                    }
                })
            })
            this.total.validations = clients.length;
        },
        clickToActiveItem(index = 0, identifier = '', solution = '', survey = '') {
            console.log('CATEGORY CATEGORY CATEGORY', solution)    
            this.$emit('clickToActiveItem', {index, identifier: this.getCompanyData.identifier, solution, survey: survey});
        },      
        getTotalOptions(survey) {
            let validations = []
                survey.options.filter(({ active }) => active).forEach(option => {
                option.validations.forEach(validation => {
                    validations.push(validation)
                })
            })
            return validations.length
        },
        dispatchShowModal(data) {
            // console.log(data)
            if(data.type === 1) {
                this.selectedValidationsClientsList = data.data;
                this.showValidationsClients = true;
            } else {
                this.extraOp = data.data;
                this.showValidationsOtherClients = true;
            }
        },
        filterClients(type, filterWord) {
            // console.log(type, filterWord)
          this.selectedClientFilter = filterWord
              this.clientsFiltered = this.getHappyClients().filter(item => type === 1 ? 
                                                                    item.industry.toLowerCase() === filterWord.toLowerCase() : 
                                                                    item.company.toLowerCase() === filterWord.toLowerCase())
            // console.log(this.clientsFiltered)
      },
        getTotalOther(survey) {
            let total = 0;
            survey.showExtra && survey.extraOptions.length > 0 ? 
            survey.extraOptions.filter(({ active }) => active).forEach(option => total = total + option.validations.length ) :
            false
            return total;
        },
        goToPreview() {
            this.selectedSurvey = 'all'
            this.$emit('goToPreview')
        },
        goToService(data) {
            this.$emit('goToService', data)
        },
        getHappyClients () {
            let validations = [];
                this.solution.surveys.forEach(survey => {
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
                })        
            return (this.checkDuplicateInObject('id', validations))
        },                         
        selectSurvey(survey, solution = '') {
            console.log('SURVEY SURVEY SURVEY SUUUURVEEEY', survey)
            console.log(this.solutions)
            this.scrollTop()
            this.clickToActiveItem(0,0,solution, survey)
            // this.selectedSurvey = survey
            // this.pageNumberClient = 0
        },   
        getUniquesItems() {
            let clients = this.getHappyClients()
            // console.log('clients', clients)
            const industries = clients.map(client => client.industry)
            // console.log('industries', industries)
            const companies = clients.map(client => client.company)

            const positions = clients.map(client => client.positions)
            // console.log('comapanies', companies)
            this.uniqueIndustries = [...new Set(industries.sort())];
            this.uniqueCompanies = [...new Set(companies.sort())];
            this.uniquePositions  = [...new Set(positions.sort())];
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
      checkDeviceType() {
          let check = false;
          (function(a) {
              if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
          })(navigator.userAgent || navigator.vendor || window.opera);
          return check;
      },
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
    beforeMount() {
        this.isMobile = this.checkDeviceType();
        // this.filterClients(1, 'Real State')   
        this.selectedSurvey = 'all'
        // this.survey = this.solution.surveys[0] 
    },
    mounted() {
        this.getTotalCountValidations()
        this.filterClients(1, 'Real State')
        this.getUniquesItems()
        this.loaded = false
        this.loaded = true
        // this.selectedSurvey = (this.solution.surveys.slice(start, end))[0];
    },
    updated() {
        console.log('updated upadted updated')
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
        for(let i = 0; i < solution.surveys.filter(({ active }) => active).length; i++) {
            if(i % 3 === 0) this.circleCount.push(i);
        }
        // console.log('BY CLIENTS MENU', this.byClientsMenu)
        this.getUniquesItems()
        this.loaded = false
        this.loaded = true
        console.log('selectedSurveyToShow', this.selectedSurveyToShow)
    },
    destroyed() {
        this.isLoaded = false
    }
}
</script>

<style scoped>
    
    .v-tabs__item {
        padding: 6px 22px !important
    }

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
    div.divWithCustomScroll2::-webkit-scrollbar {
        width: 6px;
    }

    /* Track */
    div.divWithCustomScroll2::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px #cecece; 
        border-radius: 10px;
    }
    
    /* Handle */
    div.divWithCustomScroll2::-webkit-scrollbar-thumb {
        background: #595a5a;
        border: 0px solid #ecf0f3;
        border-radius: 10px;
    }

    div.divWithCustomScroll2::-webkit-scrollbar-thumb:hover {
        cursor: pointer;
    }




    /* width */
    div.divWithCustomScroll3::-webkit-scrollbar {
        width: 6px;
        height: 8px
    }

    /* Track */
    div.divWithCustomScroll3::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px #cecece; 
        border-radius: 10px;
    }
    
    /* Handle */
    div.divWithCustomScroll3::-webkit-scrollbar-thumb {
        background: #595a5a;
        border: 0px solid #ecf0f3;
        border-radius: 10px;
    }

    div.divWithCustomScroll3::-webkit-scrollbar-thumb:hover {
        cursor: pointer;
    }


    /* width */
    div.divWithCustomScroll::-webkit-scrollbar {
        width: 7px;
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

    .boxItemSolution {
        transition: all 0.1s;
    }

    .boxItemSolution:hover {
        background: rgba(0,0,0,.03);
    }
</style>
