<template>
    <!-- <div>
        SERVICE CARD NEW
    </div> -->
    <div style="width: 100%; height: 100%; display: block">
        <div style="position: sticky;height: 100%;width: 86px;background: #fafafa;padding: 9px;display: flex;flex-direction: column;top: 100px;margin-left: -169px;border-radius: 4px;border-top: 1px solid rgb(206, 206, 206);border-bottom: 1px solid rgb(206, 206, 206);border-left: 1px solid rgb(206, 206, 206);margin-right: 56px;">
            <div style="cursor: pointer;width: 100px;height: 32px;margin-bottom: 5px;border-radius: 3px;color: white;background: black;display: flex;align-items: center;justify-content: center;margin-left: -30px;">
                <span v-if="getCompanyData.name.length < 17" style="font-family: 'Roboto-bold';color: white;font-size: 12px;">{{transformString(getCompanyData.name)}}</span>
                <span v-if="getCompanyData.name.length > 16" style="font-family: 'Roboto-bold';color: white;font-size: 12px;">{{transformString(getCompanyData.name).substring(0,10)}} ...</span>
            </div>
            <div v-tooltip.right="'Número total de estadísticas publicadas. Cada estadística se ha ocupado de la recolección, agrupación, presentación y análisis de datos. Estos datos tratan sobre la experiencia de clientes con los productos o servicios que contrato.'" style="cursor:pointer;width: 70px; height: 33px; border-radius: 3px; padding: 10px; color: white; background: #0076b5; display: flex; align-items: center;">
                <img src="/static/images/jpg1/white_stad.png" alt="stadistic" style="margin-right: 10px;width: 18px;height: auto;"/>
                <span style="font-family: Roboto-regular;color: white;font-size: 12px;">{{getAllStad()}}</span>
            </div>
            <div v-tooltip.right="`La metodología seguida para la recolección de datos ha sido la encuesta. Un total de ${getAllClients()} clientes han dado su opinión validando opciones de respuesta o escribiendo la suya propia.`" style="cursor:pointer;width: 70px; height: 33px; border-radius: 3px; padding: 10px; color: white; margin: 5px 0 5px 0; background: #3b5999; display: flex; align-items: center;">
                <img src="/static/images/jpg1/white_clients.png" alt="stadistic" style="margin-right: 10px;width: 18px;height: auto;"/>            
                <span style="font-family: Roboto-regular;color: white;font-size: 12px;">{{getAllClients()}}</span>            
            </div>
            <div v-tooltip.right="'Se ha solicitado a los clientes dar su opinión en forma de validación. Se busca así demostrar que las estadísticas son válidas para el propósito que buscan. Las validaciones se reparten de una manera no proporcional en todas las estadísticas publicadas.'" style="cursor:pointer;width: 70px; height: 33px; border-radius: 3px; padding: 10px; color: white; background: #95cd38; display: flex; align-items: center;">
                <img src="/static/images/jpg1/white_validations.png" alt="stadistic" style="margin-right: 10px;width: 18px;height: auto;"/>
                <span style="font-family: Roboto-regular;color: white;font-size: 12px;">{{getAllValidations()}}</span>
            </div>
        </div>    
        <div :style="ats('', '=', 'margin-top: -166px; border: 1px solid #cecece; display: flex; flex-direction: column; align-items: center; justify-content: space-evenly; background-color: white; padding: 0px 0 0px 0; text-align: left; margin-bottom: -33px; height: 100%')"> 
            <div :style="`width: 100%; text-align: left; padding: ${showClients ? ' 18px 0px 7px 51px' : '18px 50px 7px 53px'}`">
                <div style="display: flex; align-items: center; justify-content: space-between">
                    <span style="font-size: 14px;">
                        <span @click="goToPreview()" style="font-family: 'Roboto-regular'; color: #5fb4f7; cursor: pointer">{{getCompanyData.name}}</span> <span style="font-size: 14px; color: black; padding: 8px">></span> 
                        <span v-if="!showClients" @click="goToPreview()" style="font-family: 'Roboto-regular'; font-size: 14px; color: #5fb4f7; cursor: pointer">{{transformString(solution.category)}}</span> <span v-if="!showClients" style="font-size: 14px; color: black; padding: 8px">></span> 
                        <span v-if="showClients" style="font-family: 'Roboto-regular'; font-size: 14px; color: #333333">
                             Clientes Encuestados
                        </span>
                        <span v-if="!showClients" style="font-family: 'Roboto-regular'; font-size: 14px; color: #333333">
                             {{selectedSurvey.description}}
                        </span>
                    </span>
                    <div v-if="!showClients">
                        <button  type="click" style="width: 214px; padding: 5px; height: 30px; border: 1px solid #95cd34; border-radius: 2px; cursor: pointer">
                            <span style="color: #95cd34; font-size: 13px; font-family: 'Roboto-regular';">{{getValidationsBySurvey(selectedSurvey)}} VALIDACIONES DE CLIENTES</span>
                        </button>
                    </div>
                </div>
                <!-- <div v-if="showClients">
                    <span style="font-size: 14px; cursor: pointer"><span @click="goToPreview()" style="color: #5fb4f7">{{name}}</span> <span style="font-size: 14px; color: black; padding: 8px">></span> <span style="font-size: 14px; color: #5fb4f7;" @click="goToService(solution.category)">{{transformString(solution.category)}}</span> <span style="font-size: 14px; color: black; padding: 8px">></span> <span style="font-size: 14px; color: rgb(69, 95, 124)">Clientes Encuestados</span></span>
                </div>             -->
                <!-- <div v-if="showClients" style="margin-top: 5px;">
                    <span v-if="showClients" style="font-size: 14px; color: #333333">
                        > Clientes Encuestados
                    </span>
                </div>            
                <div v-if="!showClients" style="margin-top: 5px;">
                    <span v-if="!showClients" style="font-size: 14px; color: #333333">
                        > {{selectedSurvey.description}} {{selectedSurvey.question}}
                    </span>
                </div> -->
            </div>

            <div v-if="solution.surveys.length > 0 && selectedSurvey.active && !showClients" style="width: 100%; height: 100%; background: transparent; margin-bottom: 0px; margin-left: 0px">
                <!-- <button @click="showValidationsClients = true" type="button">ABRIR</button> -->
                <Survey
                    :survey="selectedSurvey"
                    :companies="uniqueCompanies"
                    :industries="uniqueIndustries"
                    :happyClients="getHappyClientsBySurvey(selectedSurvey).length"
                    :totalOther="getTotalOther(selectedSurvey)"
                    :totalValidations="getValidationsBySurvey(selectedSurvey)"
                    :totalOptions="getTotalOptions(selectedSurvey)" 
                    @dispatchShowModal="dispatchShowModal($event)"
                />
            </div>

            <v-layout v-if="showClients && loaded" align-center justify-center row fill-height style="width: 100%; height: 100%; margin-top: 20px; background: white; padding-left: 27px">
                <v-flex xs3 :style="`margin-top: ${uniqueCompanies.length > 8 || uniqueIndustries.length > 8 ? '-100px' : '-200px'};`">
                    <ul style="list-style: none">
                        <li style="text-align: left;">
                            <span style="font-family: 'Roboto-bold'; font-size: 15px; color: #333333">Industrias</span>
                        </li>
                        <div class="divWithCustomScroll" :style="`width: 251px; height: ${uniqueIndustries.length > 8 ? '161px' : '100%'}; ${uniqueIndustries.length > 8 ? 'overflow-y: scroll' : ''}; padding-left: ${uniqueIndustries.length > 8 ? '0px' : '0px'};`">
                            <li style="width: 221px; text-align: left;" v-for="(industry, index) in uniqueIndustries" v-bind:key="index">
                                <span @click="filterClients(1, industry)" class="ul-list" :style="`text-decoration: ${industry === selectedClientFilter && clientsFiltered.length !== 0 ? 'underline' : ''}; font-family:'Roboto-regular'; font-size: 14px; color: #333333`">{{industry}}</span>
                            </li>
                        </div>
                    </ul> <br>
                    <ul style="list-style: none">
                        <li style="text-align: left;" >
                            <span style="font-family: 'Roboto-bold'; font-size: 15px; color: #333333">Empresas</span>
                        </li>
                        <div class="divWithCustomScroll" :style="`width: 251px; height: 161px; overflow-y: ${uniqueCompanies.length > 8 ? 'scroll' : 'none'}; padding-left: ${uniqueCompanies.length > 8 ? '0px' : '0px'};`">
                            <li style="width: 221px; text-align: left;" v-for="(company, index) in uniqueCompanies" v-bind:key="index">
                                <span @click="filterClients(2, company)" class="ul-list" :style="`text-decoration: ${company === selectedClientFilter && clientsFiltered.length !== 0 ? 'underline' : ''}; font-family: 'Roboto-regular'; font-size: 14px; color: #333333`">{{company}}</span>
                            </li>
                        </div>
                    </ul>
                </v-flex>
                <v-flex xs10 style="padding: 22px 0 0 55px">
                    <v-layout row wrap :style="`padding: 0px 0 40px 0; margin-top: 10px; height: 471px; overflow-y: ${clientsFiltered.length > 12 ? 'scroll' : ''}`">        
                        <span v-if="clientsFiltered.length == 0">Ningún cliente ha validado esta solución</span>
                            <div  v-for="(client, index) in clientsFiltered.slice(0,50)" v-bind:key="index" :style="`text-align: left; height: 70px; width: 242px; margin-bottom: ${clientsFiltered.length > 12 ? '50px' : '0px'}`">
                                <div :style="`text-align: left; display: flex; flex-wrap: wrap; align-items: flex-start; height: 70px`"> 
                                    <div>
                                        <v-avatar :size="55" style="border: 0.7px solid #d4d4d4">
                                            <img :src="`${Number.isInteger(parseInt(client.pictureUrl.split('.')[0])) ? '/static/images/faces/' : client.pictureUrl.includes('http') ? '' : '/'}${client.pictureUrl}`" alt="" style="border: 0.7px solid #d4d4d4">
                                        </v-avatar>
                                    </div>
                                    <div style="margin-left: 18px">
                                        <span style="text-align: left; font-family: 'Roboto-bold'; color: #333333; font-size: 14px">{{(client.firstName.split(' '))[0]}} {{(client.lastName.split(' '))[0]}}</span>
                                        <br>
                                        <span style="font-family: 'Roboto-regular';text-align: left; color: #333333; font-size: 14px">{{client.positions.split('').splice(0,14).join('')}}<span v-if="client.positions.length > 14">...</span></span>
                                        <br>
                                        <span style="font-family: 'Roboto-regular';text-align: left; color: #333333; font-size: 14px">{{client.company.split('').splice(0,20).join('')}}<span v-if="client.company.length > 20">...</span></span>
                                        <br>
                                        <span style="font-family: 'Roboto-regular';text-align: left; color: #333333; font-size: 14px">{{client.industry.split('').splice(0,20).join('')}}<span v-if="client.company.length > 20">...</span></span>                                    
                                    </div>
                                </div>
                            </div>
                    </v-layout>
                </v-flex>
            </v-layout>

            <div v-if="showClients && loaded" style="width: 95%; height: 100%; justify-content: space-between; background: white;display: flex;padding: 20px 25px 20px 70px">
                <div style="text-align: left; width: 182px">
                    <span style="color: #333333; font-size: 12px; font-family: 'Roboto-bold';">{{transformString(solution.category)}}. Fuentes:</span>
                    <br />
                    <p style="color: #333333;font-size: 12px; font-family: 'Roboto-regular';">
                        <!-- {{getHappyClientsBySurvey().length}} clientes encuestados, {{10}} validaciones de clientes. -->
                    </p>
                </div>
                <div style="text-align: left; margin-left: 90px; width: 233px;">
                    <span style="color: #333333; font-size: 12px; font-family: 'Roboto-bold';">Clientes Encuestados:</span>
                    <br />
                    <p style="color: #333333; font-size: 12px; font-family: 'Roboto-regular';">
                        Empresas: 
                        <span v-for="(company, index) in uniqueCompanies.slice(0, 4)" :key="index">
                            {{company}}<span v-if="uniqueCompanies.length > 4 && index < 3">, </span><span v-if="uniqueCompanies.length < 4 && index < (uniqueCompanies.length-1)">, </span>                            
                        </span>
                        <span v-if="uniqueCompanies.length > 4"> y {{uniqueCompanies.length-4}} más</span>.
                        Industrias: 
                        <span v-for="(industry, index) in uniqueIndustries.slice(0, 4)" :key="index">
                            {{industry}}<span v-if="uniqueIndustries.length > 4 && index < 3">, </span><span v-if="uniqueIndustries.length < 4 && index < (uniqueIndustries.length-1)">, </span>
                        </span>
                        <span v-if="uniqueIndustries.length > 4"> y {{uniqueIndustries.length-4}} más</span>.
                    </p>
                </div>
                <div style="width: 150px; text-align: left; margin-left: 90px;">
                    <span style="font-family: 'Roboto-bold';color: #333333; font-size: 12px">© Yes Them 2019</span>
                </div>
            </div>        

            <div style="margin-bottom: 0px;width: 100%;height: 466px;display: flex;padding-top: 55px;padding-bottom: 50px;justify-content: center;border-top: 1px solid rgb(206, 206, 206);margin-top: 0px;background: #f5f9fc;border-bottom: 1px solid rgb(206, 206, 206);">
                <div style="width: 968px; height: 350px; border: 1px solid rgb(206, 206, 206); border-radius: 5px; background: url(/static/images/waves.png) white; background-position: center;">
                    <div style="padding: 15px 0 0 22px; font-size: 14px; color #333333; font-family: 'Roboto-bold'"><span>MÁS ESTADÍSTICAS Y VALIDACIONES</span></div>
                    <div style="margin-bottom: 18px"><span style="color: #5fb4f7; font-size: 21px; padding-left: 20px; font-family: 'Roboto-light'">→ {{transformString(solution.category)}}</span></div>
                    <br />
                    <div style="display: flex; margin-left: -28px; margin-top: -8px">
                        <div style="display: flex; flex-direction: column; margin-right: 17px; cursor: pointer;">
                            <div v-for="(item, index) in solution.surveys.filter(item => item.description != selectedSurvey.description && item.active).slice(0,2)" :key="index" @click="selectSurvey(item); scrollTop(); showClients = false" style="-webkit-box-shadow: rgba(94, 94, 94, 0.57) 0px 0px 12px 1px; -moz-box-shadow: rgba(94, 94, 94, 0.57) 0px 0px 12px 1px; box-shadow: rgba(94, 94, 94, 0.57) 0px 0px 12px 1px; align-items: center; padding: 20px; width: 502px; height: 104px; border-radius: 5px; border: 1px solid #cecece; background: white; margin-bottom: 20px; display: flex">
                                <div>
                                    <img src="/static/images/jpg1/stad_box.png" alt="stadistic" style="width: 22px; height: auto; margin-right: 15px;"/>
                                </div>
                                <div>
                                    <span style="font-family: 'Roboto-regular'; font-size: 15px; color: #333333"><span style="font-size:15px; color: #333333; font-family: 'Helvetica-bold';">{{item.description}}</span> {{item.question}}</span>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: column; margin-right: 0px; cursor: pointer;">
                            <div v-for="(item, index) in solution.surveys.filter(item => item.description != selectedSurvey.description && item.active).slice(2,4)" :key="index" @click="selectSurvey(item); scrollTop()" style="-webkit-box-shadow: rgba(94, 94, 94, 0.57) 0px 0px 12px 1px; -moz-box-shadow: rgba(94, 94, 94, 0.57) 0px 0px 12px 1px; box-shadow: rgba(94, 94, 94, 0.57) 0px 0px 12px 1px; align-items: center; padding: 20px; width: 502px; height: 104px; border-radius: 5px; border: 1px solid #cecece; background: white; margin-bottom: 20px; display: flex">
                                <div>
                                    <img src="/static/images/jpg1/stad_box.png" alt="stadistic" style="width: 22px; height: auto; margin-right: 15px;"/>
                                </div>
                                <div>
                                    <span style="font-family: 'Roboto-regular'; font-size: 15px; color: #333333"><span style="font-size:15px; color: #333333; font-family: 'Helvetica-bold';">{{item.description}}</span> {{item.question}}</span>
                                </div>
                            </div>
                        </div>                    
                    </div>
                </div>
            </div>
        </div>
        
        <v-dialog v-model="showValidationsClients" lazy width="774px" style="z-index: 9999 !important;" :fullscreen="$vuetify.breakpoint.smAndDown">
            <v-card style="height: 100%">
                <v-card-title :style="ats('height: 30px; border-bottom: 4px solid #eeeeee;', '=', 'padding: 0px; height: 50px; border-bottom: 1px solid #e3e3e3')" :class="ats('text-xs-right', '=', 'pl-2 text-xs-right')">
                    <div class="font-size-20 px-2 color-00306e">
                        {{selectedValidationsClientsList.length}} Clientes Validaron
                    </div>
                    <v-icon :color="$vuetify.breakpoint.smAndDown? 'black': 'grey darken-1'" style="cursor: pointer;font-size: 30px;font-weight: 400;color: rgba(102, 102, 102, 0.6);margin-left: 464px" @click="showValidationsClients= false">close</v-icon>
                </v-card-title>
                <div style="padding: 10px 0px 10px 10px;">
                    <v-layout align-left justify-start column fill-height>
                        <v-flex v-for="(client, index) in selectedValidationsClientsList" v-bind:key="index">
                            <v-layout align-left justify-start row fill-height style="height: 70px;">
                                <v-flex xs1 style="margin-right: 15px;">
                                    <v-avatar :size="$vuetify.breakpoint.smAndDown ? '54' : '54'" color="white" style="margin-top: 10px;">
                                        <img
                                            :src="`${Number.isInteger(parseInt(client.pictureUrl.split('.')[0])) ? '/static/images/faces/' : client.pictureUrl.includes('http') ? '' : '/'}${client.pictureUrl}`"
                                            style="border: 1px solid #e3e3e3"
                                        />
                                    </v-avatar>
                                </v-flex>
                                <v-flex xs10 style="text-align: left; margin-left: -5px">
                                    <div style="margin-top: 24px;">
                                        <span style="text-align: left">
                                            <span style="font-weight: bold; font-size: 16px">{{(client.firstName.split(' '))[0]}} {{(client.lastName.split(' '))[0]}}</span> · <span style="font-size: 16px; color: #696969">{{client.positions}}</span> · <span style="font-size: 16px; color: #696969">{{client.company}}</span>
                                        </span>
                                        <!-- <br>
                                        <span>
                                            <span style="font-size: 14px; color: #696969; font-family: Calibri;text-align: left">{{client.hasOwnProperty("positions") ? !client.positions.values ? '' : client.positions.values[0].company.name : client.company }} · {{client.headline}}</span> 
                                        </span> -->
                                    </div>
                                </v-flex>
                            </v-layout>
                            <hr v-if="index != selectedValidationsClientsList.length-1" style="margin-left: 70px; border: 0.5px solid #d2d2d2;">
                        </v-flex>
                    </v-layout>
                </div>
            </v-card>
        </v-dialog>       

        <v-dialog v-model="showValidationsOtherClients" lazy width="774px" style="z-index: 9999 !important;" :fullscreen="$vuetify.breakpoint.smAndDown">
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
    props: ['name', 'solution', 'selectedSurvey', 'showClients', 'getCompanyData'],
    components: {
      AvatarList, Survey, SurveyContact
    },
    watch: {
        selectedSurveyToShow: function(val) {
            console.log('AQUI AQUI AQUI AUQI')
        },
        solution: function(val) {
            // this.selectedSurvey = 'all'
            this.getUniquesItems()
        },
        showClients: function (val) {
            console.log('showClientsshowClientsshowClientsshowClientsshowClients')
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
        clickToActiveItem(index = 0, identifier = '', category = '') {
            console.log('CATEGORY CATEGORY CATEGORY', category)    
            this.$emit('clickToActiveItem', {index, identifier: this.getCompanyData.identifier, category});
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
            if(filterWord == this.selectedClientFilter) {
                this.selectedClientFilter = '';
                this.clientsFiltered = this.getHappyClients()
            } else {
                this.selectedClientFilter = filterWord
                this.clientsFiltered = this.getHappyClients().filter(item => type === 1 ? 
                                                                    item.industry.toLowerCase() === filterWord.toLowerCase() : 
                                                                    item.company.toLowerCase() === filterWord.toLowerCase())
            }
      },
        getValidationsBySurvey(survey) {
            let validations = 0;
            (survey.options.filter(({ active }) => active)).forEach(option => {
                validations = validations + option.validations.length
            });
            survey.extraOptions.forEach(extra => validations++)
            return validations;
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
            console.log(solution)
                this.solution.surveys.forEach(survey => {
                    survey.options.filter(({ active }) => active).forEach(option => {
                        option.validations.forEach(validation => {
                            validations.push(validation)
                        })
                    })
                    if(survey.extraOptions) {
                        survey.extraOptions.filter(({ active }) => active).forEach(option => {
                            validations.push(option.validations[0])
                        })                    
                    }    
                })        
            return (this.checkDuplicateInObject('id', validations))
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
                        validations.push(option.validations[0])
                    })                    
                }    
                return (this.checkDuplicateInObject('id', validations))                
            } else {
                return []
            }
        },
        selectSurvey(survey, solution = '') {
            this.scrollTop()
            this.selectedSurvey = survey
        },   
        getUniquesItems() {
            let clients = this.getHappyClients()
            const industries = clients.map(client => client.industry)
            const companies = clients.map(client => client.company)

            const positions = clients.map(client => client.positions)
            this.uniqueIndustries = [...new Set(industries.sort())];
            this.uniqueCompanies = [...new Set(companies.sort())];
            this.uniquePositions  = [...new Set(positions.sort())];
            if(this.uniqueIndustries.length == 0) {
                this.filterClients(1, 'undefined')
            } else {
                this.clientsFiltered = this.getHappyClients()
            }
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
        getAllStad() {
            let counter = 0;
            this.getCompanyData.solutions.forEach(solution => {
            solution.surveys.forEach(survey => {
                if(survey.active) counter++
            })
            })
            return counter
        },
        getAllValidations() {
            let validations = 0
            this.getCompanyData.solutions.forEach(solution => {
            solution.surveys.forEach(survey => {
            if(survey.active) {
                survey.options.forEach(option => {
                if(option.active) {
                    validations = validations + option.validations.length;                
                }
                });
                survey.extraOptions.filter(({active}) => active ? validations = validations + 1 : false)
            }
            });
            })
            return validations
        },
        getAllClients() {
            let clients = [];
            this.getCompanyData.solutions.forEach(solution => {
            solution.surveys.filter(({ active }) => active).forEach(survey => {
                (survey.options.filter(({ active }) => active)).forEach(option => {
                    option.validations.forEach(validation => clients.push(validation))
                })
            });
            })
            let c = (this.checkDuplicateInObject('id', clients)).length;
            return c
        },        
    },
    beforeMount() {
        this.isMobile = this.checkDeviceType();
    },
    mounted() {
        this.getUniquesItems()
        this.loaded = false
        this.loaded = true;
    },
    updated() {
    },
    beforeUpdate() {
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
            if(survey.options.filter(({ active }) => active).length > 0) {
                survey.extraOptionPerc = ((100*(survey.extraOptions.filter(({active}) => active)).length)/survey.options.filter(({ active }) => active)[0].validations.length)
            }
        });
        this.loaded = false
        this.loaded = true
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
        width: 5px;
    }

    /* Track */
    div.divWithCustomScroll::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px #cecece; 
        border-radius: 10px;
    }
    
    /* Handle */
    div.divWithCustomScroll::-webkit-scrollbar-thumb {
        background: black;
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
