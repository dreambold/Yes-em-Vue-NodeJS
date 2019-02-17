<template>
    <v-layout align-start justify-start column :style="`margin-top: 0px; border-bottom: ${last ? '1px solid #cecece' : ''}; border-radius: 0px; margin-left: 0px`"> <!-- -45px margin left -->
        <v-flex style="width: 100%; padding: 0px 51px 0px">
            <div style="width: 100%; display: flex; align-items: center; text-align: left">
                <div id="titleSurvey" style="position: relative; width: 100%">
                    <span style="font-size: 26px; line-height: 32px; color: #333333; padding-right: 10px; background: white; font-family: 'Roboto-bold'; position: relative; z-index: 5;">
                        {{transformString(survey.description)}} - {{survey.question}}
                    </span>
                </div>
                <!-- <div style="width: 100%; margin-left: 8px; border: 3px solid rgb(236, 235, 240); border-radius: 4px;"></div> -->
            </div>
        </v-flex>
        <v-flex style="padding: 8px 52px 11px">
            <span style="color: #666666;font-size: 14px;font-family: Roboto-regular;">
                {{getValidationsBySurvey(survey)}} validaciones de {{happyClients}} clientes
            </span>
        </v-flex>

        <div style="width: 100%; height: 100%; display: flex; align-items: flex-start; justify-content: space-between; padding: 0 52px;">
            <div style="width: 100%; margin-right: 0;">
                <dl>
                    <div v-for="(option, i) in survey.options.filter(({ active }) => active)" :key="i">
                        <div style="display: flex">
                            <span class="text" style="width: 400px;text-align:left;font-family: Roboto-regular;margin-top: 10px;font-size: 14px;color: #666666;">
                                {{option.optionDescription}}
                                <span class="text" style="font-family: Roboto-regular;margin-top: 10px;font-size: 14px;margin-left: 134px;color: #666666;background: transparent;">150</span>
                            </span>
                        </div>
                        <dd :style="`background: ${i%2 == 0 ? '' : ''}`" :class="`percentage percentage-${parseInt(100)}`">
                            <span v-if="parseInt(option.perc) > 0" :style="`position: absolute;margin-top: 22px;width: 100%;margin-right: 0px;font-family: 'Roboto-bold'; font-size: 11px;margin-left: ${parseInt(option.perc) == 100 ? 94 : parseInt(option.perc) < 11 ? parseInt(option.perc)+3 : parseInt(option.perc)}%; color: #4f4f4f`">{{parseInt(option.validations.length)}}</span>
                        </dd>
                    </div>
                    <!-- ${parseInt(option.perc)} -->
                    <div v-if="survey.showExtra" style="margin-top: -12px;">
                        <div><span class="text" style="display: flex; width: 290px; height: 62px; align-items: center; border-bottom: 1px solid #cecece; justify-content: space-between;">
                            <span>Otras validaciones</span>
                            <span style="color: #1d7591; cursor: pointer;" @click="showClientsExtraOptions = !showClientsExtraOptions">Ver <v-icon v-if="showClientsExtraOptions" style="color:#1d7591; font-size: 18px; margin-left: 1px">keyboard_arrow_down</v-icon><v-icon v-if="!showClientsExtraOptions" style="color:#1d7591; font-size: 18px; margin-left: 1px">keyboard_arrow_up</v-icon></span>
                            </span></div><dd :class="`percentage percentage-${parseInt(survey.extraOptionPerc)}`"></dd>
                    </div>
                    <div style="width: 100%; margin-top: 10px; margin-left: 412px;">
                        <span style="font-size: 11px; color: #808080; font-family: 'Roboto-regular'">Validaciones de clientes</span>
                    </div>
                </dl>
                <v-layout v-if="showClientsExtraOptions" align-start justify-start column fill-height :style="`width: 100%; background: ${checkBoxToShow.some(item => item == 'extra') ? 'rgb(87, 127, 188)' : ''}`">
                    <v-layout style="width: 100%;margin-top: -14px;position: relative;z-index: 10; " align-start justify-start column="" fill-height>
                        <v-flex style="width: 100%;">
                            <div v-if="survey.extraOptions.length > 0" style="height: 100%;">
                                <div style="margin-bottom: 5px;"><span style="font-family: 'Roboto-regular'; color: #333333">Mostrando <span style="font-family: 'Roboto-bold'">{{currentClients.length}}</span> respuestas</span></div>
                                <div v-for="(option, j) in currentClients" :key="j" :style="`width: 100%; height: 100%; padding-top: 15px; border-bottom: ${checkBoxToShow.some(item => item == 'extra') ? '1px solid rgb(236, 236, 236)' : '1px solid white'}; justify-content: center; display: flex; align-items: center;`">
                                    <div style="width: 100%; padding-bottom: 15px; border-bottom: 1px solid rgb(224, 224, 224)">
                                        <div v-if="option.validations[0]" style="display: flex;">
                                            <div style="margin-right: 10px">
                                                <v-avatar size="31" style="margin-left: 1px">
                                                    <img
                                                        :src="`${Number.isInteger(parseInt(option.validations[0].pictureUrl.split('.')[0])) ? '/static/images/faces/' : option.validations[0].pictureUrl.includes('http') ? '' : '/'}${option.validations[0].pictureUrl}`"
                                                        style="border: 1px solid #e3e3e3; margin-bottom: 15px; margin-right: 3px"
                                                    />
                                                </v-avatar>                                                            
                                            </div>
                                            <div style="width: fit-content;">
                                                <span @click="optionSelected = option; getTotalValidationsInOption = 1; showResultModal = true" :style="`cursor: pointer; font-family: 'Roboto-regular'; color: #666666; font-size: 14px`">
                                                    {{option.optionDescription}}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="survey.extraOptions.length == 0">
                                <span>No hay clientes</span>
                            </div>                  
                        </v-flex>
                    </v-layout> 
                </v-layout>
                <div v-if="survey.extraOptions.length > 4" style="display: flex; justify-content: center; align-items: center; width: 250px; height: 83px; background-color: white;">
                    <div style="margin-right: 5px">
                        <button type="button" @click="pageNumberClient == 0 ? false : prev()" :style="`width: 101px; height: 41px; outline: none; color: ${pageNumberClient == 0 ? 'grey' : '#333333'}; font-family: 'Roboto-regular; font-size: 12px; border-radius: 5px;`"><span><v-icon center style="color: #999999; font-size: 16px; margin-right: 10px">fas fa-chevron-left</v-icon></span> Anterior </button>
                    </div>
                    <div>
                        <button type="button" @click="pageNumberClient >= pageCount  ? false : next()" :style="`width: 101px; height: 41px; outline: none; color: ${pageNumberClient >= pageCount  ? 'grey' : '#333333'}; font-family: 'Roboto-regular; font-size: 12px; border-radius: 5px;`">Siguiente <span><v-icon center style="color: #999999; font-size: 16px; margin-left: 10px">fas fa-chevron-right</v-icon></span></button>
                    </div>
                </div>
            </div>
            <!-- <div style="display: flex; flex-direction: column">
                <div style="width: 354px; height: 94px; background: #f0f7fd; display: flex; flex-direction: column; align-items: flex-start; margin-bottom: 50px">
                    <div style="display: flex; align-items: center; width: 100%; background: white; border-bottom: 1px solid #ececec; margin-bottom: 5px">
                        <div><span @click="tabSelected = 0" :style="`border-bottom: ${tabSelected == 0 ? '2px solid blue' : 'none'}; color: ${tabSelected == 0 ? '#444444' : '#999999'};font-family: 'Roboto-regular'; font-size: ${tabSelected == 0 ? '14px' : '13px'}; cursor:  pointer;`">CLIENTES ENCUESTADOS</span></div>
                        <div @click="tabSelected = 1"><span :style="`border-bottom: ${tabSelected == 1 ? '2px solid blue' : 'none'}; color: ${tabSelected == 1 ? '#444444' : '#999999'};margin: 0 10px 0 10px; font-family: 'Roboto-regular'; font-size: ${tabSelected == 1 ? '14px' : '13px'}; cursor:  pointer;`">EMPRESAS</span></div>
                        <div><span @click="tabSelected = 2" :style="`border-bottom: ${tabSelected == 2 ? '2px solid blue' : 'none'}; color: ${tabSelected == 2 ? '#444444' : '#999999'};font-family: 'Roboto-regular'; font-size: ${tabSelected == 2 ? '14px' : '13px'}; cursor:  pointer;`">INDUSTRIAS</span></div>
                    </div>
                    <div style="display: flex; justify-content: center; align-items: center; margin-left: 16px">
                        <div v-if="tabSelected == 0" style="width: fit-content;padding: 10px 10px 10px 20px;align-items: center;background: white;display: flex;">
                            <div align="left" class="" style="padding-left: 15px; display: flex; align-items: center" v-for="(client, index) in allClients.slice(0,4)" v-bind:key="index">
                                <div v-if="client.pictureUrl" :style="`padding-top: 7px; margin-left: -30px; background-size: cover; border: 1px solid #e3e3e3;border-radius: 50%; width: 39px; height: 39px; background-image: url(${Number.isInteger(parseInt(client.pictureUrl.split('.')[0])) ? '/static/images/faces/' : client.pictureUrl.includes('http') ? '' : '/'}${client.pictureUrl})`">
                                </div> 
                            </div>
                            <div align="left" class="" style="margin-left: 0px; margin-left: -15px;" v-if="allClients.length>3" @click="selectedValidationsClientsList = option.validations; dispatchShowModal(1)" :style="`display: flex; justify-content: center; align-items: center; cursor: pointer;background-size: cover; border: 1px solid #e3e3e3;border-radius: 50%; width: 39px; height: 39px; background-image: linear-gradient( rgba(0, 0, 0, 0.5) 100%, rgba(0, 0, 0, 0.5)100%),url(${Number.isInteger(parseInt(allClients[2].pictureUrl.split('.')[0])) ? '/static/images/faces/' : allClients[2].pictureUrl.includes('http') ? '' : '/'}${allClients[2].pictureUrl})`">
                                <span style="font-weight: bold; margin-left: 0px; font-size: 12px; color: white;">+{{happyClients-4}}</span>
                            </div>  
                            <div v-if="allClients.length > 0" style="margin-left: 10px">
                                <span style="font-family: 'Roboto-regular'; font-size: 12px; color: #444444">{{happyClients}} CLIENTES</span>
                            </div>
                            <div v-if="allClients.length == 0">No hay clientes asociados</div>
                        </div>          
                        <div v-if="tabSelected == 1" style="display: flex; justify-content: center; align-items: center">
                            <div v-if="companies.length > 0">
                                <span v-for="(company, index) in companies.slice(0, 4)" :key="index">
                                    {{company}}<span v-if="companies.length > 4 && index < 3">, </span><span v-if="companies.length < 4 && index < (companies.length-1)">, </span>                            
                                </span>
                            </div>
                            <span v-if="companies.length == 0">No hay empresas asociadas</span>
                        </div>   
                        <div v-if="tabSelected == 2" style="display: flex; justify-content: center; align-items: center">
                            <div v-if="industries.length > 0">
                                <span v-for="(industry, index) in industries.slice(0, 4)" :key="index">
                                    {{industry}}<span v-if="industries.length > 4 && index < 3">, </span><span v-if="industries.length < 4 && index < (industries.length-1)">, </span>
                                </span>
                            </div>
                            <div v-if="industries.length == 0">No hay industrias asociadas</div>
                        </div>                 
                    </div>
                </div>

                <div style=" width: 354px; height: 250px;display: flex; flex-direction: column; align-items: center;">
                    <div style="display: flex; align-items: center; width: 100%;     background: white; border-bottom: 1px solid #ececec; margin-bottom:10px">
                        <div><span @click="tabSelectedExtra = 0" :style="`border-bottom: ${tabSelectedExtra == 0 ? '2px solid blue' : 'none'}; color: ${tabSelectedExtra == 0 ? '#444444' : '#999999'};font-family: 'Roboto-regular'; font-size: ${tabSelectedExtra == 0 ? '14px' : '13px'}; cursor:  pointer;`">DESCRIPCION</span></div>
                        <div @click="tabSelectedExtra = 1"><span :style="`border-bottom: ${tabSelectedExtra == 1 ? '2px solid blue' : 'none'}; color: ${tabSelectedExtra == 1 ? '#444444' : '#999999'};margin: 0 10px 0 10px; font-family: 'Roboto-regular'; font-size: ${tabSelectedExtra == 1 ? '14px' : '13px'}; cursor:  pointer;`">MAS INFORMACION</span></div>
                    </div>
                    <div style="display: flex; justify-content: center; align-items: center">
                        <div v-if="tabSelectedExtra == 0" style="width: 100%; padding: 0px; background: white">
                            <div style="margin: 10px 0 10px 0">
                                <span style="color: #333333; font-family: 'Roboto-regular'; font-size: 14px">Informacion por Yes Them</span>
                            </div>

                            <hr style="border: 0.5px solid #ececec"/>

                            <div style="text-align: left; margin-top: 8px;">
                                <div style="margin: 10px 0 10 0">
                                    <span style="font-family: 'Roboto-bold'; font-size: 15px; color: #333333">Descripcion:</span> <br/>
                                </div>
                                <span style="font-family: 'Roboto-regular'; font-size: 15px; color: #333333">Esta estadistica muestra las razones por las que los clientes de {{name}} decidieron:  <span style="color: #666666">{{solution}}</span></span>
                                <br />
                                <div style="margin: 10px 0 0px 0">
                                    <span style="font-family: 'Roboto-bold'; font-size: 15px; color: #33333">Opciones de respuesta:</span> <br/>
                                </div>
                                <span style="font-family: 'Roboto-regular'; font-size: 15px; color: #333333">Opcion multiple: los clientes pueden validar varias opciones o anadir su propia opcion</span>
                            </div>
                        </div>          
                        <div v-if="tabSelectedExtra == 1" style="width: 100%; padding: 0px; background: white">
                            <div style="margin: 10px 0 10px 0">
                                <span style="color: #333333; font-family: 'Roboto-regular'; font-size: 14px">Por Yes Them</span>
                            </div>

                            <hr style="border: 0.5px solid #ececec"/>

                            <div style="text-align: left; margin-top: 8px;">
                                <div style="margin: 10px 0 10 0">
                                    <span style="font-family: 'Roboto-bold'; font-size: 15px; color: #333333">Descripcion:</span> <br/>
                                </div>
                                <span style="font-family: 'Roboto-regular'; font-size: 15px; color: #333333">Esta estadistica muestra las razones por las que los clientes de {{name}} decidieron:  <span style="color: #666666">{{solution}}</span></span>
                                <br />
                                <div style="margin: 10px 0 0px 0">
                                    <span style="font-family: 'Roboto-bold'; font-size: 15px; color: #33333">Opciones de respuesta:</span> <br/>
                                </div>
                                <span style="font-family: 'Roboto-regular'; font-size: 15px; color: #333333">Opcion multiple: los clientes pueden validar varias opciones o anadir su propia opcion</span>
                            </div>
                        </div>               
                    </div>

                </div>
            </div> -->
        </div>
        <div v-if="loaded" style="width: 100%;margin-left: 0;height: 100%;background: white;display: flex;padding: 20px 57px">
            <div style="text-align: left; width: 182px">
                <span style="color: #333333; font-size: 12px; font-family: 'Roboto-bold';">Fuentes:</span>
                <br />
                <p style="color: #333333;font-size: 12px; font-family: 'Roboto-regular';">
                    {{happyClients}} clientes encuestados, {{totalValidations}} validaciones de clientes.
                </p>
            </div>
            <div style="text-align: left; margin-left: 236px; width: 233px;">
                <span style="color: #333333; font-size: 12px; font-family: 'Roboto-bold';">Clientes Encuestados:</span>
                <br />
                <p style="color: #333333; font-size: 12px; font-family: 'Roboto-regular';">
                    Empresas: 
                    <span v-for="(company, index) in companies.slice(0, 4)" :key="index">
                        {{company}}<span v-if="companies.length > 4 && index < 3">, </span><span v-if="companies.length < 4 && index < (companies.length-1)">, </span>                            
                    </span>
                    <span v-if="companies.length > 4"> y {{companies.length-4}} más</span>.
                    Industrias: 
                    <span v-for="(industry, index) in industries.slice(0, 4)" :key="index">
                        {{industry}}<span v-if="industries.length > 4 && index < 3">, </span><span v-if="industries.length < 4 && index < (industries.length-1)">, </span>
                    </span>
                    <span v-if="industries.length > 4"> y {{industries.length-4}} más</span>.
                </p>
            </div>
            <div style="width: 150px; text-align: left; margin-left: 236px;">
                <span style="font-family: 'Roboto-bold';color: #333333; font-size: 12px">© Yes Them 2019</span>
            </div>
        </div>

        <v-dialog
          v-model="showResultModal"
          lazy
          width="700px"
          :style="`display: ${showResultModal ? 'block' : 'none'}; z-index: 9999 !important;`"
          :fullscreen="$vuetify.breakpoint.smAndDown"
        >
          <v-card style="height: 100%">
            <v-card-title style="background: #f5f6f8; padding: 0px; display: flex; height: 50px; border-bottom: 1px solid rgb(227, 227, 227)" class="pl-2 text-xs-right">
                <div class="px-2">
                    <span style="font-size: 15px; color: black; font-weight: bold">Detalles de Opción</span>
                </div>
                <span style="margin-left: 198px; font-size: 13px;">Información sobre los clientes que han validado</span>
                <v-icon :color="$vuetify.breakpoint.smAndDown? 'black': 'grey darken-1'" style="margin-left: 20px; cursor: pointer;font-size: 20px;font-weight: 400;color: rgba(102, 102, 102, 0.6);" @click="showResultModal = false">close</v-icon>
            </v-card-title>
            <ResultModal
                :result="optionSelected" 
                :validations="getTotalValidationsInOption"
            />
          </v-card>
        </v-dialog>

    </v-layout>
</template>

<script>
import ResultModal from './ResultModal'
export default {
    props: ['name', 'solution', 'survey', 'happyClients', 'totalOther', 'totalOptions', 'companies', 'industries', 'last', 'totalValidations'],
    components: {ResultModal},
    computed: {
        clientsPageCount() {
            let l = this.totalOther,
                s = 4;
            return Math.ceil(l/s);
        },
        currentClients() {
            const start = this.pageNumberClient * 4,
                end = start + 4;
            const data = (this.survey.extraOptions.map(option => option)).filter(({ active }) => active).slice(start, end)
            return data
        }
    },
    data() {
        return {
            tabSelectedExtra: 0,
            tabSelected: 0,
            showResultModal: false,
            getTotalValidationsInOption: 0,
            optionSelected: null,
            showClientsExtraOptions: true,
            pageNumberClient: 0,
            selectedValidationsClientsList: [],
            checkBoxToShow: [],
            totalValidations: 0,
            loaded: false,
            allClients: []
        }
    },
    methods: {
        next() {
            this.pageNumberClient++;
        },
        prev() {
            this.pageNumberClient--;
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
        dispatchShowModal(type) {
            this.$emit('dispatchShowModal', {data: this.selectedValidationsClientsList, type: type})
        },
        getValidationsBySurvey(survey) {
            let validations = 0;
            (survey.options.filter(({ active }) => active)).forEach(option => {
                validations = validations + option.validations.length
            });
            survey.extraOptions.forEach(extra => validations++)
            return validations;
        },
        getValidationsBySurveyClients(survey) {
            (survey.options.filter(({ active }) => active)).forEach(option => {
                option.validations.forEach(validation => this.allClients.push(validation))
            });
        },
    },
    mounted() {
        let topPosition = 47
        this.survey.options.filter(({ active }) => active).forEach((option, index) => {
            if(option.active) {
                this.totalValidations += option.validations.length
            }
            // if(option.top) {
            //     option.top = 0; 
            // } else {
            //     if(index == 0) {
            //         option.top = 47;
            //     } else {
            //         topPosition += 61;
            //         option.top = topPosition;            
            //     }     
            // }
        })
        console.log(this.survey.options)
        this.survey.extraOptions.forEach(e => e.active ? this.totalValidations += 1 : false)
        this.loaded = true;
    },
    beforeUpdate() {
        this.totalValidations = 0
        this.survey.options.filter(({ active }) => active).forEach((option, index) => {
            if(option.active) {
                this.totalValidations += option.validations.length
            }
        })
        this.allClients = []
        this.getValidationsBySurveyClients(this.survey)
        this.survey.extraOptions.forEach(e => e.active ? this.totalValidations += 1 : false)
        this.loaded = true;
    }
    
}
</script>


<style scoped>
    dl {
        display: flex;
        background-color: white;
        flex-direction: column;
        width: 100%;
        /* max-width: 700px; */
        position: relative;
        padding: 20px 20px 2px 20px;
    }
    dt {
        align-self: flex-start;
        width: 100%;
        font-weight: 700;
        display: block;
        text-align: center;
        font-size: 1.2em;
        font-weight: 700;
        margin-bottom: 20px;
        margin-left: 130px;
    }
    .text {
        font-family: 'Roboto-regular';
        display: flex;
        align-items: center;
        height: 40px;
        width: 320px;
        background-color: white;
        position: absolute;
        left: -4px;
        justify-content: flex-end;
        color: #666666;
        font-size: 14px;
        text-align: right
    }
    .percentage {
        font-size: 0.8em;
        line-height: 1;
        text-transform: uppercase;
        width: 58%;
        height: 60px;
        margin-left: 454px;
        /* background: repeating-linear-gradient(to right, #ddd, #ddd 1px, #fff 1px, #fff 20%); */
    }
    .percentage:after {
        content: "";
        display: block;
        background-color: #2675dd;
        width: 50px;
        margin-bottom: 10px;
        height: 25px;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        transition: background-color 0.3s ease;
        cursor: pointer;
    }
    /* .percentage:hover:after, .percentage:focus:after {
        background-color: #aaa;
    } */
    .percentage-0:after {
        width: 0%;
    }
    .percentage-1:after {
        width: 1%;
    }
    .percentage-2:after {
        width: 2%;
    }
    .percentage-3:after {
        width: 3%;
    }
    .percentage-4:after {
        width: 4%;
    }
    .percentage-5:after {
        width: 5%;
    }
    .percentage-6:after {
        width: 6%;
    }
    .percentage-7:after {
        width: 7%;
    }
    .percentage-8:after {
        width: 8%;
    }
    .percentage-9:after {
        width: 9%;
    }
    .percentage-10:after {
        width: 10%;
    }
    :after {
        width: 11%;
    }
    .percentage-12:after {
        width: 12%;
    }
    .percentage-13:after {
        width: 13%;
    }
    .percentage-14:after {
        width: 14%;
    }
    .percentage-15:after {
        width: 15%;
    }
    .percentage-16:after {
        width: 16%;
    }
    .percentage-17:after {
        width: 17%;
    }
    .percentage-18:after {
        width: 18%;
    }
    .percentage-19:after {
        width: 19%;
    }
    .percentage-20:after {
        width: 20%;
    }
    .percentage-21:after {
        width: 21%;
    }
    .percentage-22:after {
        width: 22%;
    }
    .percentage-23:after {
        width: 23%;
    }
    .percentage-24:after {
        width: 24%;
    }
    .percentage-25:after {
        width: 25%;
    }
    .percentage-26:after {
        width: 26%;
    }
    .percentage-27:after {
        width: 27%;
    }
    .percentage-28:after {
        width: 28%;
    }
    .percentage-29:after {
        width: 29%;
    }
    .percentage-30:after {
        width: 30%;
    }
    .percentage-31:after {
        width: 31%;
    }
    .percentage-32:after {
        width: 32%;
    }
    .percentage-33:after {
        width: 33%;
    }
    .percentage-34:after {
        width: 34%;
    }
    .percentage-35:after {
        width: 35%;
    }
    .percentage-36:after {
        width: 36%;
    }
    .percentage-37:after {
        width: 37%;
    }
    .percentage-38:after {
        width: 38%;
    }
    .percentage-39:after {
        width: 39%;
    }
    .percentage-40:after {
        width: 40%;
    }
    .percentage-41:after {
        width: 41%;
    }
    .percentage-42:after {
        width: 42%;
    }
    .percentage-43:after {
        width: 43%;
    }
    .percentage-44:after {
        width: 44%;
    }
    .percentage-45:after {
        width: 45%;
    }
    .percentage-46:after {
        width: 46%;
    }
    .percentage-47:after {
        width: 47%;
    }
    .percentage-48:after {
        width: 48%;
    }
    .percentage-49:after {
        width: 49%;
    }
    .percentage-50:after {
        width: 50%;
    }
    .percentage-51:after {
        width: 51%;
    }
    .percentage-52:after {
        width: 52%;
    }
    .percentage-53:after {
        width: 53%;
    }
    .percentage-54:after {
        width: 54%;
    }
    .percentage-55:after {
        width: 55%;
    }
    .percentage-56:after {
        width: 56%;
    }
    .percentage-57:after {
        width: 57%;
    }
    .percentage-58:after {
        width: 58%;
    }
    .percentage-59:after {
        width: 59%;
    }
    .percentage-60:after {
        width: 60%;
    }
    .percentage-61:after {
        width: 61%;
    }
    .percentage-62:after {
        width: 62%;
    }
    .percentage-63:after {
        width: 63%;
    }
    .percentage-64:after {
        width: 64%;
    }
    .percentage-65:after {
        width: 65%;
    }
    .percentage-66:after {
        width: 66%;
    }
    .percentage-67:after {
        width: 67%;
    }
    .percentage-68:after {
        width: 68%;
    }
    .percentage-69:after {
        width: 69%;
    }
    .percentage-70:after {
        width: 70%;
    }
    .percentage-71:after {
        width: 71%;
    }
    .percentage-72:after {
        width: 72%;
    }
    .percentage-73:after {
        width: 73%;
    }
    .percentage-74:after {
        width: 74%;
    }
    .percentage-75:after {
        width: 75%;
    }
    .percentage-76:after {
        width: 76%;
    }
    .percentage-77:after {
        width: 77%;
    }
    .percentage-78:after {
        width: 78%;
    }
    .percentage-79:after {
        width: 79%;
    }
    .percentage-80:after {
        width: 80%;
    }
    .percentage-81:after {
        width: 81%;
    }
    .percentage-82:after {
        width: 82%;
    }
    .percentage-83:after {
        width: 83%;
    }
    .percentage-84:after {
        width: 84%;
    }
    .percentage-85:after {
        width: 85%;
    }
    .percentage-86:after {
        width: 86%;
    }
    .percentage-87:after {
        width: 87%;
    }
    .percentage-88:after {
        width: 88%;
    }
    .percentage-89:after {
        width: 89%;
    }
    .percentage-90:after {
        width: 90%;
    }
    .percentage-91:after {
        width: 91%;
    }
    .percentage-92:after {
        width: 92%;
    }
    .percentage-93:after {
        width: 93%;
    }
    .percentage-94:after {
        width: 94%;
    }
    .percentage-95:after {
        width: 95%;
    }
    .percentage-96:after {
        width: 96%;
    }
    .percentage-97:after {
        width: 97%;
    }
    .percentage-98:after {
        width: 98%;
    }
    .percentage-99:after {
        width: 99%;
    }
    .percentage-100:after {
        width: 100%;
    }
</style>