<template>
  <div v-scroll="onScroll">
    <v-layout column style="background: white">
    <div align="left" style="margin-top: 50px; text-align: left; margin-left: 50px">
      <span style="font-size: 33px; text-align: left;">
        Valida aspectos del Servicio que te presto <span style="color: #2b8bcb">{{ name }}</span>
      </span>
    </div>
    <v-layout align-start justify-start row fill-height>
        <v-flex style="padding-left: 50px; padding-right: 50px">
            <div v-for="(survey, index) in  previewData.survey" v-bind:key="index" style="width: 810px; text-align: left; margin-top: 25px;border-top: 2px solid #e8e8ea; padding-top: 20px; padding-bottom: 20px;">
                <span v-if="survey.description" style="font-size: 20px; font-weight: bold">{{survey.description}}</span>
                <span v-if="!survey.description" style="font-size: 18px; font-weight: bold">Titulo de la encuesta</span>
                <br>
                <span style="font-size: 20px;">{{survey.question ? survey.question : '¿Cuales fueron los aspectos mas valiosos del servicio prestado?'}}</span>
                <br>
                <span>Selecciona todos los que apliquen</span>
                <br>
                <!--surveys-->
                <div style="text-align: left; cursor: pointer"  v-for="(option, i) in survey.options" v-bind:key="i">
                    <div id="checkboxes">
                      <div style="display: flex">
                        <input type="checkbox" name="rGroup" :value="`${index}${i}`" :id="`i${index}${i}`"/>
                        <label class="whatever" :for="`i${index}${i}`">{{ option.optionDescription }}</label>                                
                      </div>
                    </div>
                </div>
                <div v-if="survey.showExtra" style="text-align: left;">
                    <div style="width: 800px; padding: 10px; text-align: left; margin-bottom: 20px; background: #f6f7fb; ">
                      <div style="display: flex">
                        <div style="margin-left: 5px; display: flex">
                          <div>
                            <span style="font-size: 18px">
                                Otros
                            </span>                                    
                          </div>
                          <div style="margin-left: 15px;">
                            <input type="text" style="background: white; height: 35px; width: 400px" :placeholder="'Escribe tu respuesta'" max-length="55">
                          </div>
                        </div>
                      </div>
                    </div>
                </div>                        
            </div>            
        </v-flex>

    </v-layout>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue';
import { mapGetters } from 'vuex'
import ContactComponent from '../components/Contact'
import ServiceCard from '../components/ServiceCard'
import Background from '../components/Background'
import HeaderBox from '../components/HeaderBox'
import _ from 'lodash'
import VueScrollTo from 'vue-scrollto';

Vue.use(VueScrollTo, {duration: 850})

export default {
    name: 'home',
    components: {
        ContactComponent,
        ServiceCard, HeaderBox, Background
    },
    data() {
        return {
          name: '',
            previewData: '',
          selectedService: '',
          showSurveys: true,
          chartType: 0,
          viewHandler: 1,
          scrollTabs: false,
          isFiltered: false,
          active: false,
            scrollLeftCounter: 740,
            scrollRightCounter: 740,          
          activeIndex: 0,
          email: '',
          tab: null,
          headerOpacity: 0,
          headerOpacityR: 0,
          byUrl: 0,
            _solution: '',
            _validations: [],
            isLoad: false,
            indexOfServiceSelected: null,
            tumbsUpMargin: 0,
            oldHeight: 0,
            solutionDesOfServiceSelected: null,
            lastServiceSelected: [],
            showResults: false,
            heightOfResultCardDiv: 300,
            heightOfClientsDiv: 371,
            moreClients: [],
            locationUrl: '',
            isMobile: false,
            content: 'solutions',
            filter: '',
            specificClients: [],
            specificRecomendations: [],
            headerData: {},
            finalSpecificClients: [],
            finalOrderedClients: [],
            stackOfClients: [],
            selectedSolution: '',
            // version: 0,
            tab: 1,
            clients: 4,
            beingHovered: null,
            snackbar: {
                show: false,
                success: true,
                message: ''
            },
            sticky: false,
            offsetTop: 0,
            contact: {
                dialog: {
                    show: false,
                    form: true,
                    message: '',
                    email: '',
                    phone: '',
                    name: ''
                },
                status: {
                    ready: true,
                    error: false,
                    message: ''
                }
            },
            emailRules: [
                (v) => !!v || 'Este campo es requerido.',
                (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'El e-mail debe ser válido.'
            ],
            requiredRules: [
                (v) => !!v || 'Este campo es requerido.'
            ]
        }
    },
    // watch: {
    //   "getStatus.loading": function (a, b) {
    //     if (!this.getStatus.loading && !this.getStatus.error) {
    //       this.version += 1
    //     }
    //   }
    // },
    computed: {
        ...mapGetters('auth', ['isLoggedIn', 'currentUser', 'getToken']),
        ...mapGetters('company', ['getCompanyData', 'getStatus', 'getSolutions', 'getBenefits', 'getCategories', 'getCategoriesAndLogo', 'getExperiences', 'getTotalValidations']),

        allowPublish() {
            if (this.getStatus.loading === false) {
                if (this.getCompanyData.name !== '' && this.getCompanyData.industry !== '' && this.getCompanyData.description !== '' && this.getCompanyData.coverImage !== '' && this.getSolutions.length > 0 && this.getBenefits.length > 0) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        },

        style() {
            return {
                'background-image': this.getCompanyData ? (this.getCompanyData.coverImage ? 'url("/static/images/uploads/' + this.getCompanyData.coverImage + '?' + Date.now() + '")' : 'linear-gradient(to bottom, rgba(0,0,0,0.10) 0%,rgba(0,0,0,0.5) 100%)') : 'linear-gradient(to bottom, rgba(0,0,0,0.10) 0%,rgba(0,0,0,0.5) 100%)',
                // 'background-image' : this.getStatus.loading ? 'linear-gradient(to bottom, rgba(0,0,0,0.10) 0%,rgba(0,0,0,0.5) 100%)' : (this.getCompanyData.coverImage ? 'url("/static/images/uploads/' + this.getCompanyData.coverImage + '#' + Date.now() + '")' : 'linear-gradient(to bottom, rgba(0,0,0,0.10) 0%,rgba(0,0,0,0.5) 100%)'),
                // 'background-image' : 'linear-gradient(to bottom, rgba(0,0,0,0.10) 0%,rgba(0,0,0,0.85) 100%)',
                'background-repeat': 'no-repeat scroll',
                'background-position': this.ats('top', '=', 'center center'),
                'background-size': this.ats('100% 262px', '100% 265px', 'cover'),
                'background-color': '#ECECEC',
                'min-height': this.ats('300px', '250px', '218px')
            }
        },

        style2() {
            return {
                'width': '1125px',
                'background-image': this.getCompanyData ? (this.getCompanyData.coverImage ? 'url("/static/images/uploads/' + this.getCompanyData.coverImage + '?' + Date.now() + '")' : 'linear-gradient(to bottom, rgba(0,0,0,0.10) 0%,rgba(0,0,0,0.5) 100%)') : 'linear-gradient(to bottom, rgba(0,0,0,0.10) 0%,rgba(0,0,0,0.5) 100%)',
                // 'background-image' : this.getStatus.loading ? 'linear-gradient(to bottom, rgba(0,0,0,0.10) 0%,rgba(0,0,0,0.5) 100%)' : (this.getCompanyData.coverImage ? 'url("/static/images/uploads/' + this.getCompanyData.coverImage + '#' + Date.now() + '")' : 'linear-gradient(to bottom, rgba(0,0,0,0.10) 0%,rgba(0,0,0,0.5) 100%)'),
                // 'background-image' : 'linear-gradient(to bottom, rgba(0,0,0,0.10) 0%,rgba(0,0,0,0.85) 100%)',
                'background-repeat': 'no-repeat scroll',
                'background-position': 'center',
                'background-size': 'cover',
                'background-color': '#ECECEC',
                'min-height': '200px'
            }
        },
        getFilteredSolutions() {
            this.specificClients = [];
            this.specificRecomendations = [];
            this.selectedSolution = '';
            if (this.filter === '') {
                let recom = 0
                let clients = []
                let ordered = this.getOrderedSolutions
                ordered.forEach(item => {
                    item.benefits.forEach(benefit => {
                        recom = recom + benefit.validations.length
                        benefit.validations.forEach(validation => clients.push(validation))
                    })
                });
                this.headerData.recomendations = recom;
                this.headerClients = clients
                //this._clients = clients;
                this.finalOrderedClients = this.checkDuplicateInObject('id', clients);
                this.moreClients = this.finalOrderedClients.slice();
                this.heightOfClientsDiv = this.isMobile ? (90 * this.finalOrderedClients.length) + 200 - 120 : (90 * this.finalOrderedClients.length) + 200 - 105
                return this.getOrderedSolutions
            } else {
                this.heightOfClientsDiv = 371
                let recomendations = 0;
                let clients = [];
                let _ordered = this.getOrderedSolutions
                _ordered.forEach(item => { item.benefits.forEach(benefit => {benefit.validations.forEach(validation => clients.push(validation)) }) });                
                this.finalOrderedClients = this.checkDuplicateInObject('id', clients);
                let ordered = this.getOrderedSolutions.filter(solution => solution.category === this.filter);
                let c = []
                ordered.forEach(item => {
                    this.selectedSolution = (item.category).toLowerCase();
                    item.benefits.forEach(benefit => {
                        recomendations = recomendations + benefit.validations.length
                        this.specificRecomendations.push(benefit);
                        benefit.validations.forEach(validation => c.push(validation))
                    })
                });
                //this._clients = c;
                //this.finalSpecificClients = this.checkDuplicateInObject('id', this.specificClients);
                this.finalSpecificClients = this.finalOrderedClients
                this.headerData.services = 1;
                this.headerData.results = ordered[0].benefits.length;
                this.headerData.clients = this.specificClients.length;
                this.headerData.recomendations = recomendations;
                let final = this.getOrderedSolutions.filter(solution => solution.category === this.filter);
                this.moreClients = this.finalSpecificClients.slice();
                this.heightOfClientsDiv = (87 * this.finalSpecificClients.length) + this.heightOfClientsDiv - 120;
                // return final;
                return 371;
            }
            //return this.filter === '' ? this.getOrderedSolutions : this.getOrderedSolutions.filter( solution => solution.category === this.filter)
        },

        getOrderedSolutions() {
            let ordered = _.orderBy(this.getSolutions, function(o) {
                function getHappyClients(benefits) {
                    let validations = []
                    for (let i = 0, len = benefits.length; i < len; i++) {
                        if (benefits[i].validations.length > 0) {
                            for (let j = 0, len = benefits[i].validations.length; j < len; j++) {
                                if (!validations.some(validation => validation.id.toString() === benefits[i].validations[j].id.toString())) {
                                    validations.push(benefits[i].validations[j])
                                }
                            }
                        }
                    }
                    return validations
                }
                return getHappyClients(o.benefits).length
            }, ['desc'])
            return ordered
        },

        oClients() {
            return this.specificRecomendations
            /*if (!this.getStatus.loading) { // THIS IS DEPRECATED
              let clients = []
              let ordered = this.getOrderedSolutions
              ordered.forEach(item => {
                item.benefits.forEach(benefit => {
                  benefit.validations.forEach(validation => clients.push(validation))
                })
              });
              let finalClients = this.checkDuplicateInObject('id', clients);
              return finalClients
            } else {
              return []
            }*/
        },

        cClients(type) {
            //let b = this.oClients.slice(0, this.clients);
            let clients = []
            let ordered = this.getOrderedSolutions
            ordered.forEach(item => {
                item.benefits.forEach(benefit => {
                    benefit.validations.forEach(validation => clients.push(validation))
                })
            });
            let finalClients = this.checkDuplicateInObject('id', clients);
            return finalClients
        },

        specificClients() {
            return this.specificClients
            //  let clients = this.getValidatedSolutions();
            //specificClients
        },

        specificRecomendations() {
            return this.specificRecomendations
        }
    },
    watch: {
      filter: {
        deep: true,
        handler(val) {
          this.heightOfClientsDiv = 371
          // console.warn('CHANGING')
          let clients = []
          let ordered = this.getOrderedSolutions
          ordered.forEach(item => {
              item.benefits.forEach(benefit => {
                  benefit.validations.forEach(validation => clients.push(validation))
              })
          });
          this.finalOrderedClients = this.checkDuplicateInObject('id', clients);   
          this.heightOfClientsDiv = (87 * this.finalOrderedClients.length) + this.heightOfClientsDiv - 120;      
        }
      }
    },    
        methods: {
        getHappyClientsValidates (benefits) {
          let validations = []
          for (let i = 0, len = benefits.length; i < len; i++) {
            if (benefits[i].validations.length > 0) {
              for (let j = 0, len = benefits[i].validations.length; j < len; j++) {
                if (!validations.some(validation => validation.id.toString() === benefits[i].validations[j].id.toString())) {
                  validations.push(benefits[i].validations[j])
                }
              }
            }
          }
          console.log(validations)
          return validations.length
        },
        getTotalYes (benefits) {
          let yes = 0
          for (let i = 0, len = benefits.length; i < len; i++) {
            yes += benefits[i].validations.length
          }
          // console.log('yes', yes)
          return yes
        },        
        async getEmail () {
            let identifier = this.$route.params.identifier;
            let { data } = await axios.post('/api/user/findByCompanyId', {name: identifier});
            // // console.log(data.data)
            this.email = data.data.email;
            //this.userId = data.data._id
        },       
          scrollLeft() {
            this.scrollLeftCounter = this.scrollLeftCounter + 740
            this.$refs.horizontalTabs.scrollLeft = this.scrollLeftCounter
            // // console.log('left', this.scrollLeftCounter)
        },
        scrollRight() {
            this.scrollLeftCounter = this.scrollLeftCounter - this.scrollRightCounter;
            this.scrollRightCounter = this.scrollLeftCounter - this.scrollRightCounter
            this.$refs.horizontalTabs.scrollLeft = this.scrollRightCounter > 0 ? this.scrollRightCounter*-1 : this.scrollRightCounter
            // // console.log('right', this.scrollRightCounter)
        },
        dispatchClickHowToHelp(data) {
          localStorage.setItem('quickStartSelected', 'howToHelp');
          // console.log(localStorage.getItem('quickStartSelected'))
          this.clickToActiveItem(data.index+1, this.getCompanyData.identifier, data.category);
          // this.filterClickAction(this.getCompanyData.identifier, data.category);
        },
        dispatchClickClients(data) {
          localStorage.setItem('quickStartSelected', 'clients');
          // console.log(localStorage.getItem('quickStartSelected'))
          this.clickToActiveItem(data.index+1, this.getCompanyData.identifier, data.category);
          // this.filterClickAction(this.getCompanyData.identifier, data.category);
        },
        transformString(s) {
            let splitted = s.split(' ');
            if (splitted.length > 1) {
                return (splitted.map(word => word.charAt(0).toUpperCase() + (word.slice(1)).toLowerCase())).join(' ');
            } else {
                return  splitted[0].charAt(0).toUpperCase() + (splitted[0].slice(1)).toLowerCase();
            }
        },
        detectmob() {
            if (navigator.userAgent.match(/Android/i)
                //|| navigator.userAgent.match(/webOS/i)
                ||
                navigator.userAgent.match(/iPhone/i) ||
                navigator.userAgent.match(/iPad/i) ||
                navigator.userAgent.match(/iPod/i) ||
                navigator.userAgent.match(/BlackBerry/i) ||
                navigator.userAgent.match(/Windows Phone/i)
            ) {
                this.isMobile = true;
            } else {
                this.isMobile = false;
            }
        },
        showMoreClients(lastIndex, isFiltered) {
            if (isFiltered) {
                let final = this.getOrderedSolutions.filter(solution => solution.category === this.filter);
                for (let i = lastIndex; i <= final.length; i++) {
                    finalSpecificClients.push(final[i])
                }
            }
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
        onScroll(e) {
            // this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
            // let headerOffset = this.$refs.stickyheader.offsetTop ? this.$refs.stickyheader.offsetTop : 0
            // if (this.offsetTop > headerOffset /*&& this.$vuetify.breakpoint.smAndUp*/) {
            //   this.sticky = true
            // } else {
            //   this.sticky = false
            // }
        },

        setHover(index) {
            if (this.beingHovered !== null) {
                this.beingHovered = null
            } else {
                this.beingHovered = index
            }
        },

        solutionStyle(image) {
            return {
                'width': '100%',
                'min-height': this.ats('230px', '230px', '300px'),
                'background-color': '#ECECEC',
                'background-image': 'url("/static/images/uploads/' + image + '")',
                'background-position': this.$vuetify.breakpoint.smAndDown ? 'top' : 'center',
                'background-size': 'cover'
            }
        },

        getValidatedSolutions() { //getHappyClients total for all solutions
            /*let validations = []
            for (let x = 0, len = this.getSolutions.length; x < len; x++) {
              for (let i = 0, len = this.getSolutions[x].benefits.length; i < len; i++) {
                if (this.getSolutions[x].benefits[i].validations.length > 0) {
                  for (let j = 0, len = this.getSolutions[x].benefits[i].validations.length; j < len; j++) {
                    if (!validations.some(validation => validation.id.toString() === this.getSolutions[x].benefits[i].validations[j].id.toString())) {
                      validations.push(this.getSolutions[x].benefits[i].validations[j])
                    }
                  }
                }
              }
            }
            return validations
            */
            let clients = 0;
            this.getOrderedSolutions.forEach(solution => {
                solution.benefits.forEach(benefit => {
                    clients += benefit.validations.length
                })
            })
            return clients
        },

        getHappySolutions() { // Soluciones para EMPRESAS: Numero de soluciones con al menos un resultado validado.
            let results = []
            for (let x = 0, len = this.getSolutions.length; x < len; x++) {
                for (let i = 0, len = this.getSolutions[x].benefits.length; i < len; i++) {
                    if (this.getSolutions[x].benefits[i].validations.length > 0) {
                        if (!results.some(result => result === x)) {
                            results.push(x)
                        }
                    }
                }
            }
            return results.length
        },

        getHappyResults() { // Results para EMPRESAS: Numero de BENEFICIOS de todas las SOLUCIONES de la Empresa con al menos 1 validación.
            // Changed on 27-10-18
            // let results = 0
            // for (let x = 0, len = this.getSolutions.length; x < len; x++) {
            //   for (let i = 0, len = this.getSolutions[x].benefits.length; i < len; i++) {
            //     if (this.getSolutions[x].benefits[i].validations.length > 0) {
            //       results ++
            //     }
            //   }
            // }
            // return results

            let results = 0
            for (let x = 0, len = this.getSolutions.length; x < len; x++) {
                results += this.getSolutions[x].benefits.length
            }
            return results
        },

        getHappyClients(benefits) {
            let validations = [];
            benefits.forEach(benefit => {
                benefit.validations.forEach(validation => validations.push(validation))
            })
            /*for (let i = 0, len = benefits.length; i < len; i++) {
              if (benefits[i].validations.length > 0) {
                for (let j = 0, len = benefits[i].validations.length; j < len; j++) {
                  if (!validations.some(validation => validation.id.toString() === benefits[i].validations[j].id.toString())) {
                    validations.push(benefits[i].validations[j])
                  }
                }
              }
            }*/
            this._validations = validations
            return this.checkDuplicateInObject('id', validations)
        },

        getRemainingValidations() {
            let validations = 0
            for (let i = 0, len = this.getBenefits.slice(3).length; i < len; i++) {
                validations = validations + this.getBenefits.slice(3)[i].validations.length
            }
            return validations
        },

        getOrderedBenefits() {
            return _.orderBy(this.getBenefits, 'validations', 'desc')
        },

        getShortName(name) {
            let splittedName = name.split(' ');
            let final = '';
            if (splittedName.length > 1) {
                const initials = (splittedName.map(n => n.charAt(0).toUpperCase())).join("");
                final = initials;
            } else {
                final = (name.charAt(0)).toUpperCase();
            }
            return final;
        },

        scrollToHome() {
            //return this.specificRecomendations
          VueScrollTo.scrollTo(this.$refs.servicesTitle, 850, { offset: 22 });
        },

        filterClickAction(identifier, category, chips = false) {
            if (identifier === 'yt') {
              this.isFiltered = false;
                this.filter = '';
                this.scrollToHome();
                window.history.replaceState(null, null, `https://www.yesthem.com/${this.getCompanyData.identifier}`);
                            return this.specificRecomendations
            } else {
                if (this.filter === category) {
                    this.isFiltered = false
                    this.filter = '';
            return this.specificRecomendations
                    //this.$refs[('extra'+index+'')].style.display="none"
            return this.specificRecomendations
                    window.history.replaceState(null, null, `https://www.yesthem.com/${this.getCompanyData.identifier}`);
                } else {
                    this.isFiltered = true;
                    this.filter = category;
                    let selectedService = this.getOrderedSolutions.filter(solution => solution.category === this.filter);
                    this._solution = selectedService[0];
                    this.getHappyClients(this._solution.benefits)
                    // // //console.log('category without spaces %20', .replace(' ', ''));
                    let _category = category.replace(/\s/g, '');
                    // // // console.log('new category', _category);
                    // // // console.log('category without spaces %20', category.replace(' ', ''));
                    window.history.replaceState(null, null, `https://www.yesthem.com/${this.getCompanyData.identifier}/${_category}`);
                    if(!chips) {
                      VueScrollTo.scrollTo(this.$refs.servicesTitle, 850, { offset: 22 });
                    }
                }
            }
        },

        clickToActiveItem(index, identifier, category) {
          this.chartType = 1;
          // console.log('CHART TYPE', this.chartType);
          this.activeIndex = index;
          category !== 'Inicio' ? this.filterClickAction(identifier, category, true) : this.filterClickAction('yt', null);
        },        

        async publish() {
            let response = await this.$store.dispatch('company/publish')
            if (response.success === true) {
                this.snackbar.show = true
                this.snackbar.success = true
                this.snackbar.message = 'Tu perfil Yes Them se ha publicado con éxito.'
                this.$store.dispatch('company/populate', this.$route.params.identifier)
            }
        },

        showSnack(value) {
            if (value) {
                this.contact.status.ready = true
                this.contact.status.error = false
                this.contact.status.message = 'An e-mail with your contact was sent to ' + this.getCompanyData.name + '. Thank you.'
                this.contact.dialog.show = false
                this.snackbar.show = true
                this.snackbar.success = !this.contact.status.error
                this.snackbar.message = this.contact.status.message
            } else {
                this.contact.status.ready = false
                this.contact.status.error = true
                this.contact.status.message = 'An error ocurred. Please, try later.'
                this.snackbar.show = true
                this.snackbar.success = this.contact.status.error
                this.snackbar.message = !this.contact.status.message
            }
        },

        async contactCompany() {
            if (this.$refs.contactForm.validate()) {
                this.contact.status.ready = false
                this.contact.status.error = false
                this.contact.status.message = ''
                try {
                    await axios.post('/api/company/contact/company', {
                        company: this.getCompanyData._id,
                        user: this.contact.dialog.name,
                        email: this.contact.dialog.email,
                        phone: this.contact.dialog.phone,
                        message: this.contact.dialog.message
                    })
                    this.contact.status.ready = true
                    this.contact.status.error = false
                    this.contact.status.message = 'An e-mail with your inquiry was sent to ' + this.getCompanyData.name + '. Thank you.'
                    this.contact.dialog.show = false
                    this.snackbar.show = true
                    this.snackbar.success = !this.contact.status.error
                    this.snackbar.message = this.contact.status.message
                } catch (error) {
                    let message = ''
                    if (error.response) {
                        message = error.response.data.message
                    } else if (error.request) {
                        message = 'No response received from the server. If the problem persists contact the site administrator (' + error.message + ')'
                    } else {
                        message = error.message
                    }
                    this.contact.status.ready = true
                    this.contact.status.error = true
                    this.contact.status.message = message
                    this.snackbar.show = true
                    this.snackbar.success = !this.contact.status.error
                    this.snackbar.message = this.contact.status.message
                }
            } else {
                this.contact.status.ready = true
                this.contact.status.error = true
                this.contact.status.message = 'Todos los campos son requeridos.'
                this.snackbar.show = true
                this.snackbar.success = !this.contact.status.error
                this.snackbar.message = this.contact.status.message
            }
        },
    },
    created: function() {
        if (this.$route.query.published === 'true') {
            this.snackbar.show = true
            this.snackbar.success = true
            this.snackbar.message = 'Tu perfil Yes Them se publicó con éxito.'
        } else if (this.$route.query.published === 'false') {
            this.snackbar.show = true
            this.snackbar.success = true
            this.snackbar.message = 'Tu perfil Yes Them ahora es privada.'
        } else {
            this.snackbar.show = false
            this.snackbar.success = true
            this.snackbar.message = ''
        }
        // this.$store.dispatch('company/populate', this.$route.params.identifier)
    },
    beforeCreate() {
      // console.log('creater preview deleteing localstorage')
      if(localStorage.getItem('quickStartSelected') === 'howToHelp' || localStorage.getItem('quickStartSelected') === 'clients') {
            localStorage.removeItem('quickStartSelected')
            // console.log('removiendo item')
        } else {
          // console.log('nada se ha quitado de application')
        }      
    },
    created() {
      console.log('Preview!')
      console.log(((JSON.parse(atob(localStorage.getItem('preview'))))));
      console.log(((JSON.parse(atob(localStorage.getItem('preview')))).survey).pop());
      this.name = this.$route.params.identifier
      let p = ((JSON.parse(atob(localStorage.getItem('preview')))).survey);
      p.pop()
      this.previewData = {survey: p};
      console.log(this.previewData)
      localStorage.removeItem('preview')
    },
    beforeMount() {
        this.detectmob();
    },
    destroyed() {
      localStorage.removeItem('preview')
    }

}
</script>

<style>
.tabsContainer {
  margin-left: 0px;
  overflow: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
}
.tabsContainer::-webkit-scrollbar { 
  display: none; 
}

.selectedCategory {
  color: #3a44b1 !important;
  border-left: 3px solid #3a44b1;
}

.loading:before {
  content: "|";
}

.load-100 {
  width: 100%;
}

.load-75 {
  width: 75%;
}

.load-50 {
  width: 50%;
}

.selected-tab {
  color: #1565C0 !important;
}

.v-tabs__slider {
  height: 2px !important;
}

.blue-grey-background {
  background-color: #d9e1e4;
}

.blurry-text {
  color: transparent !important;
  text-shadow: 0 0 8px rgba(0,0,0,0.5) !important;
}

.blurry-image {
  -webkit-filter: blur(7px);
  filter: blur(2px);
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}

.triangle, .triangle-big, .triangle-v {
  position: relative;
  width: 100%;
  height: 100%;
}

.v-dialog {
  /* margin-top: 7% !important;
  max-width: 720px !important */
}

.triangle-big:after { 
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 0;
  height: 0;
  border: 25px solid transparent;
  border-left-color: white;
  border-right: 0;
  margin-top: -10px;
  margin-right: -20px;
  z-index: 2;
  transition: all .25s;
}
.scrolling-wrapper {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;


}
  .card {
    display: inline-block;
  }
.triangle:after { 
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 0;
  height: 0;
  border: 20px solid transparent;
  border-left-color: white;
  border-right: 0;
  margin-top: -10px;
  margin-right: -20px;
  z-index: 2;
  transition: all .25s;
}

.triangle-v:after { 
  content: '';
  position: absolute;
  left: 10%;
  bottom: 0%;
  width: 0;
  height: 0;
  border: 20px solid transparent;
  border-bottom-color: white;
  border-top: 0;
  margin-left: -20px;
  margin-top: -20px;
  z-index: 2;
  transition: all .25s;
}

.triangle-l, .triangle-l-big {
  position: relative;
  width: 100%;
  height: 100%;
}

.triangle-l:after { 
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  width: 0;
  height: 0;
  border: 20px solid transparent;
  border-right-color: white;
  border-left: 0;
  margin-top: -10px;
  margin-left: -20px;
  z-index: 2;
  transition: all .25s;
}

.triangle-l-big:after { 
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  width: 0;
  height: 0;
  border: 25px solid transparent;
  border-right-color: white;
  border-left: 0;
  margin-top: -10px;
  margin-left: -20px;
  z-index: 2;
  transition: all .25s;
}

.arrow-right {
  transition: all .5s;
  position: relative;
  left: 0px;
  opacity: 1;
}
#checkboxes input[type=checkbox]{
    display: none;
}

#checkboxes input[type=checkbox]:checked + .whatever{
  cursor: pointer;
    width: 800px; padding: 10px; text-align: left; margin-bottom: 20px; background: red; color: white; font-size: 15px
}

.whatever{
  cursor: pointer;
width: 800px; padding: 10px; text-align: left; margin-bottom: 20px; background: #f2f2f2; font-size: 15px;
}
.arrow-right-moved {
  opacity: 0.50;
}

.zoomable {
  transition: all .5s;
}

.zoomed {
  transform: scale(1.1);
  transition: all .5s;
}

.sticky {
  position: fixed !important;
  top: 0 !important;
  width: 100% !important;
  z-index: 9999 !important;
}

.shadowed-text {
  text-shadow: -1px 1px 2px #000000 !important;
}
</style>
