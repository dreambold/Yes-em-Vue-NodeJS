<template>
    <div style="width: 100%; height: 100%; background: white">
        <div v-if="!showValidationsClients && !showCompaniesList && !showIndustriesList" :style="`width: 100%; text-align: left; padding: 4px 20px`">       
            <div style="margin-top: 6px; margin-bottom: 15px" @click="showExtraClients ? showExtraClients = false : goToPreview()">
                <span style="font-size: 15px; color: #0b85e5;">
                    <span style="text-decoration: underline">Estadísticas Validadas por Clientes</span> > <span style="text-decoration: underline">{{transformString(solution.category)}}</span>
                </span>
                <span v-if="!allClientsFilter" style="font-size: 15px; color: #4c4c4c;">
                     > {{transformString(selectedSurvey.description)}}
                </span>
                <span v-if="allClientsFilter" style="font-size: 15px; color: #4c4c4c;">
                     > Clientes Encuestados
                </span>
            </div>
        </div>

        <div v-if="showValidationsClients">
            <div style="display: flex; align-items: center; justify-content: space-between; background: #f6f7f9; height: 58px">
                <div @click="dispatchSurvey(oldSelectedSurvey); showValidationsClients = false; dispatchContactBox(false)">
                    <v-icon dark style='color: #002660; font-size: 30px'>arrow_back</v-icon>
                </div>
                <div>
                    <span style='color: #002660; font-size: 15px'>{{selectedValidationsClientsList.length}} Clientes Validaron</span>
                </div>
                <div></div>
            </div>
            <div v-if="selectedValidationsClientsList.length == 0" style="padding: 40px; height: 100vh">
                <span>No hay clientes</span>
            </div>
            <div v-if="selectedValidationsClientsList.length > 0" style="padding: 5px">
                <div v-for="(client, index) in selectedValidationsClientsList" v-bind:key="index">
                    <div style="height: 70px; display: flex; align-items: center;">
                        <div style="margin-right: 15px;">
                            <v-avatar :size="$vuetify.breakpoint.smAndDown ? '54' : '54'" color="white">
                                <img
                                    :src="`${Number.isInteger(parseInt(client.pictureUrl.split('.')[0])) ? '/static/images/faces/' : client.pictureUrl.includes('http') ? '' : '/'}${client.pictureUrl}`"
                                    style="border: 1px solid #e3e3e3"
                                />
                            </v-avatar>
                        </div>
                        <div style="text-align: left; margin-left: 10px">
                            <div>
                                <span style="text-align: left">
                                    <span style="font-weight: bold; font-size: 16px">{{(client.firstName.split(' '))[0]}} {{(client.lastName.split(' '))[0]}}</span> · <span style="font-size: 16px; color: #696969">{{client.positions}}</span> · <span style="font-size: 16px; color: #696969">{{client.company}}</span>
                                </span>
                                <!-- <br>
                                <span>
                                    <span style="font-size: 14px; color: #696969; font-family: Calibri;text-align: left">{{client.hasOwnProperty("positions") ? !client.positions.values ? '' : client.positions.values[0].company.name : client.company }} · {{client.headline}}</span> 
                                </span> -->
                            </div>
                        </div>
                    </div>
                    <hr v-if="index != selectedValidationsClientsList.length-1" style="margin-left: 70px; border: 0.5px solid #d2d2d2;">
                </div>
            </div>            
        </div>

        <div v-if="showExtraClients">
            <div style="display: flex; align-items: center; justify-content: space-between; background: #f6f7f9; height: 58px">
                <div @click="dispatchSurvey(oldSelectedSurvey); showExtraClients = false; dispatchContactBox()">
                    <v-icon dark style='color: #002660; font-size: 30px'>arrow_back</v-icon>
                </div>
                <div>
                    <span style='color: #002660; font-size: 15px'>Otras Validaciones</span>
                </div>
                <div></div>
            </div>
            <div v-if="clientsToShowExtra.length == 0" style="padding: 40px; height: 100vh">
                <span>No hay clientes</span>
            </div>
            <div v-if="clientsToShowExtra.length > 0">
                <div v-for='(option, index) in clientsToShowExtra' :key="index" style="display: flex; align-items: center; padding: 15px; border-bottom: 1px solid #cececece">
                    <div style="margin-right: 10px">
                        <v-avatar size="40" style="margin-left: 1px">
                            <img
                                :src="`${Number.isInteger(parseInt(option.validations[0].pictureUrl.split('.')[0])) ? '/static/images/faces/' : option.validations[0].pictureUrl.includes('http') ? '' : '/'}${option.validations[0].pictureUrl}`"
                                style="border: 1px solid #e3e3e3; margin-bottom: 15px; margin-right: 3px"
                            />
                        </v-avatar>                                                            
                    </div>
                    <div style="width: 100%; text-align: left">
                        <span :style="`font-family: Roboto-light;font-size: 15px;color: #333333;`">
                            {{option.validations[0].firstName}} {{option.validations[0].lastName}}
                            <br/>
                            {{option.optionDescription}}
                        </span>
                    </div>
                </div>
            </div>            
        </div>

        <div v-if="!showExtraClients && !showValidationsClients && !allClientsFilter && !showFilter" style="padding: 4px 14px">
            <div style="text-align: left; margin-bottom: 20px">
                <span style="font-weight: bold; font-size: 16px">{{selectedSurvey.question}}</span>
            </div>

            <div>
                <table style="width:100%">
                    <tr>
                        <th style="width: 275px">
                            <div @click="reverseTable()" style="display: flex; justify-content: flex-end; align-items: center">
                                <v-icon style="color: #333333; font-size: 17px" dark>unfold_more</v-icon>
                            </div>
                        </th>
                        <th>
                            <div @click="reverseTable()" style="display: flex; align-items: center; justify-content: center; text-align: center">
                                <span>Validaciones de Clientes</span>
                                <div style="margin-right: -9px">
                                    <v-icon style="color: #333333; font-size: 17px" dark>unfold_more</v-icon>
                                </div>
                            </div>
                        </th> 
                    </tr>
                    <tr v-for="(option, index) in selectedSurvey.options" v-bind:key="index">
                        <td style="text-align: left; color: #505050"><span>{{option.optionDescription}}</span></td>
                        <td style="text-align: right; color: #505050" @click="dispatchShowModal(option.validations)"><span>{{option.validations.length}}</span></td> 
                    </tr>
                    <tr v-if="selectedSurvey.showExtra" @click="oldSelectedSurvey = selectedSurvey; showExtraClients = true; dispatchSurvey(oldSelectedSurvey); clientsToShowExtra = selectedSurvey.extraOptions; dispatchContactBox()">
                        <td style="text-align: left; color: #505050"><span>Otras Validaciones</span></td>
                        <td style="text-align: right; color: #505050"><span>{{selectedSurvey.extraOptions.length}}</span></td> 
                    </tr>
                </table>
                <div style="width: 100%; display: flex; justify-content: flex-end; align-items: center">
                    <span style="margin-top: 10px;font-family: Roboto-medium;color: rgb(133, 133, 133);font-size: 11px;">© Yes Them 2019</span>
                </div>
            </div>

            <div style="margin-top: 30px">
                <div @click="showSources = !showSources" style="text-align: left; display: flex; align-items: center">
                        <span v-if="showSources"><v-icon style="color: #333333; font-size: 18px" dark>keyboard_arrow_down</v-icon></span>
                        <span v-if="!showSources"><v-icon style="color: #333333; font-size: 18px" dark>keyboard_arrow_right</v-icon></span>
                        <span style="font-weight: bold; font-size: 17px; color: #333333">Fuentes</span>
                </div>
                <div v-if="showSources" style="width: 100%; text-align: left">
                    <div>
                        <ul style="padding-left: 0px; list-style: none;">
                            <li style=" padding: 0px 0px 10px 5px; cursor: pointer; width: 100%; border-radius: 3px;">
                                <!-- <div style="display: flex; align-items: center;">
                                    <img src="/static/images/jpg1/stad.png" alt="stadistic" style="width: 29px; height: auto;"/>
                                    <span style="margin-left: 7px; color: #455f7c; font-family: 'Roboto-regular';font-size: 15px">{{_solution.surveys.filter(({active}) => active).length}} Estadisticas</span>
                                </div> -->
                                <div style="display: flex; align-items: center; margin: 15px 0px 15px 0px; text-align: left">
                                    <img src="/static/images/jpg2/icon3.png" alt="stadistic" style="width: 29px; height: auto;"/>
                                    <span style="margin-left: 7px; color: #333333; font-family: 'Roboto-regular';font-size: 17px">{{getHappyClientsBySurvey(selectedSurvey).length}} Clientes Encuestados</span>
                                </div>
                                <div style="display: flex; align-items: center; text-align: left">
                                    <img src="/static/images/jpg2/icon4.png" alt="stadistic" style="width: 29px; height: auto;"/>
                                    <span style="margin-left: 7px; color: #333333; font-family: 'Roboto-regular';font-size: 17px">{{getAllValidations()}} Validaciones de Clientes</span>
                                </div>                                                
                            </li>
                        </ul>
                    </div>
                </div>            
            </div>

            <div style="margin-top: 10px">
                <div @click="FullInfo = !FullInfo" style="text-align: left; display: flex; align-items: center; margin-bottom: 10px">
                        <span v-if="FullInfo"><v-icon style="color: #333333; font-size: 18px" dark>keyboard_arrow_down</v-icon></span>
                        <span v-if="!FullInfo"><v-icon style="color: #333333; font-size: 18px" dark>keyboard_arrow_right</v-icon></span>
                        <span style="font-weight: bold; font-size: 17px; color: #333333">Clientes Encuestados</span>
                </div>
                <div v-if="FullInfo" style="width: 100%">
                    <div style="text-align: left">
                        <ul style="padding-left: 0px; list-style: none;">
                            <li v-if="uniqueCompanies.length == 0" style="text-align: left; font-size: 17px; color: #333333"><div style="font-weight: bold">Empresas</div><span style="font-size: 17px">No hay clientes</span></li>
                            <li v-if="uniqueCompanies.length > 0" style="font-size: 17px; text-align: left; padding: 0px 0px 10px 5px; cursor: pointer; width: 100%; border-radius: 3px;">
                                <div style="font-weight: bold; margin-bottom: 8px; color: #333333">Empresas</div>
                                <span v-for="(company, index) in uniqueCompanies.slice(0, 4)" :key="index" style="color: #333333">
                                    {{company}}<span v-if="uniqueCompanies.length > 4 && index < 3">, </span><span v-if="uniqueCompanies.length < 4 && index < (uniqueCompanies.length-1)">, </span>                            
                                </span>
                                <span v-if="uniqueCompanies.length > 4"> y {{uniqueCompanies.length-4}} más</span>.                 
                            </li>
                            <li v-if="uniqueCompanies.length == 0"><div style="font-weight: bold; font-size: 17px">Industrias</div><span style="font-size: 17px">No hay clientes</span></li>
                            <li v-if="uniqueIndustries.length > 0" style="font-size: 17px;text-align: left;padding: 0px 0px 10px 5px; cursor: pointer; width: 100%; border-radius: 3px;">
                                <div style="font-weight: bold; margin-bottom: 8px">Industrias</div>
                                <span v-for="(industry, index) in uniqueIndustries.slice(0, 4)" :key="index" style="color: #333333">
                                    {{industry}}<span v-if="uniqueIndustries.length > 4 && index < 3">, </span><span v-if="uniqueIndustries.length < 4 && index < (uniqueIndustries.length-1)">, </span>
                                </span>
                                <span style="color: #333333" v-if="uniqueIndustries.length > 4"> y {{uniqueIndustries.length-4}} más</span>.            
                            </li>                        
                        </ul>
                    </div>
                </div>            
            </div> 

            <div style="font-family: Roboto-bold;text-align: left;margin-top: 40px;color: #0f2741;"><span>MÁS ESTADÍSTICAS Y VALIDACIONES</span></div>
            <div style="margin-bottom: 0px; text-align: left"><span style="color: #0b85e5; font-size: 19px; font-family: 'Roboto-regular'">
                <v-icon center style="color: #0b85e5; font-size: 24px; margin-left: 3px">arrow_right_alt</v-icon>
               <span style="text-decoration: underline">{{transformString(solution.category)}}</span></span></div>
            <br />
            <div style="display: flex; flex-direction: column;  cursor: pointer; padding-bottom: 15px">
                <div v-for="(item, index) in solution.surveys.filter(item => item.description != selectedSurvey.description && item.active).slice(0,4)" :key="index" @click="selectSurvey(item); scrollTop(); Full = false" style="-webkit-box-shadow: 0 6px 10px 0 rgba(0,0,0,.03), 0 1px 18px rgba(0,0,0,.07), 0 5px 26px 0 rgba(67,94,131,.15); -moz-box-shadow: 0 6px 10px 0 rgba(0,0,0,.03), 0 1px 18px rgba(0,0,0,.07), 0 5px 26px 0 rgba(67,94,131,.15); box-shadow: 0 6px 10px 0 rgba(0,0,0,.03), 0 1px 18px rgba(0,0,0,.07), 0 5px 26px 0 rgba(67,94,131,.15); align-items: center; padding: 11px 11px 11px 16px; width: 100%; height: 96px; border-radius: 5px; background: white; margin-bottom: 10px; display: flex">
                    <div>
                        <img src="/static/images/jpg2/icon1.png" alt="stadistic" style="margin-right: 15px; width: 70px"/>
                    </div>
                    <div style="text-align: left">
                        <span style="font-family: 'Roboto-regular'; font-size: 15px; color: #333333"><span style="font-size:15px; color: #333333;">{{item.description}}</span> {{item.question}}</span>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="allClientsFilter && !showFilter && !showCompaniesList && !showIndustriesList" style="display: flex; flex-direction: column">
            <div style="padding: 5px 16px;display: flex; align-items center;border-top: 2px solid #ececec; border-bottom: 2px solid #ececec; ">
                <div style="width: 76%; text-align: left; border-right: 1px solid #cecece;"><span style="color: #333333; font-size: 14px;">{{getHappyClients().length}} clientes encuestados</span></div>
                <div @click="showFilter = true;">
                    <span style="color: #333333; margin-left: 15px">
                        Filtro
                        <v-icon center style="color: #333333; font-size: 14px; margin-left: 3px">fas fa-angle-down</v-icon>
                    </span>
                </div>
            </div>
            <div v-if="loaded" row wrap style="margin-top: 10px;justify-content: center;height: 100%;width: 100%;display: flex;flex-wrap: wrap;align-items: center;">        
                <span v-if="clientsFiltered.length == 0">Ningún cliente ha validado esta solución</span>
                <div v-for="(client, index) in clientsFiltered" v-bind:key="index" :style="`width: 120px;margin-top:18px;margin-bottom: 15px;border-bottom: 1px solid rgb(236, 236, 236);text-align: left;display: flex;align-items: center;height: 145px;flex-direction: column;`">
                    <div>
                        <v-avatar v-if="client.pictureUrl" :size="40" style="border: 0.7px solid #d4d4d4">
                            <img :src="`${Number.isInteger(parseInt(client.pictureUrl.split('.')[0])) ? '/static/images/faces/' : client.pictureUrl.includes('http') ? '' : '/'}${client.pictureUrl}`" alt="" style="border: 0.7px solid #d4d4d4">
                        </v-avatar>
                        <div v-if="!client.pictureUrl" style="display: flex; align-items: center; justify-content: center; background: white; border: 1px solid #cecece; border-radius: 50%">
                            <span v-if="client.firstName" style="color: white; font-weight: bold; font-size: 16px">{{client.firstName[0]}}</span>
                            <span v-if="!client.lastName" style="color: white; font-weight: bold; font-size: 16px">{{client.lastName[0]}}</span>
                        </div>
                    </div>
                    <div v-if="client" style="text-align: center">
                        <span v-if="client.firstName && client.lastName" style="text-align: left; font-family: 'Roboto-bold'; color: #333333; font-size: 14px">{{(client.firstName.split(' '))[0]}} {{(client.lastName.split(' '))[0].substring(0, 5)}}</span>
                        <br>
                        <span v-if="client.positions" style="font-family: 'Roboto-regular';text-align: left; color: #333333; font-size: 14px">{{client.positions.split('').splice(0,10).join('')}}<span v-if="client.positions.length > 10">...</span></span>
                        <br>
                        <span v-if="client.company" style="font-family: 'Roboto-regular';text-align: left; color: #333333; font-size: 14px">{{client.company.split('').splice(0,10).join('')}}<span v-if="client.company.length > 10">...</span></span>
                        <br>
                        <span v-if="client.industry" style="font-family: 'Roboto-regular';text-align: left; color: #333333; font-size: 14px">{{client.industry.split('').splice(0,10).join('')}}<span v-if="client.company.length > 10">...</span></span>                                    
                    </div>
                </div>
            </div>
            <div style="width: 100%%; height: 100%; justify-content: space-between; background: white;display: flex;padding: 15px">
                <div style="text-align: left; width: 233px;">
                    <span style="color: #333333; font-size: 12px; font-family: 'Roboto-bold';">Clientes Encuestados:</span>
                    <br />
                    <p style="color: #333333; font-size: 12px; font-family: 'Roboto-regular';">
                        Empresas: 
                        <span v-for="(company, index) in uniqueCompanies.slice(0, 4)" :key="index">
                            {{company.substring(0, 10)}}<span v-if="uniqueCompanies.length > 4 && index < 3">, </span><span v-if="uniqueCompanies.length < 4 && index < (uniqueCompanies.length-1)">, </span>                            
                        </span>
                        <span v-if="uniqueCompanies.length > 4"> y {{uniqueCompanies.length-4}} más</span>.
                        Industrias: 
                        <span v-for="(industry, index) in uniqueIndustries.slice(0, 4)" :key="index">
                            {{industry.substring(0, 10)}}<span v-if="uniqueIndustries.length > 4 && index < 3">, </span><span v-if="uniqueIndustries.length < 4 && index < (uniqueIndustries.length-1)">, </span>
                        </span>
                        <span v-if="uniqueIndustries.length > 4"> y {{uniqueIndustries.length-4}} más</span>.
                    </p>
                </div>
                <div style="width: 150px; text-align: left;">
                    <span style="font-family: 'Roboto-bold';color: #333333; font-size: 12px">© Yes Them 2019</span>
                </div>
            </div>  
        </div>

        <div v-if="showFilter" style="display: flex; flex-direction: column">
            <div style="padding: 5px 16px;display: flex; align-items center; border-bottom: 2px solid #ececec; ">
                <div @click="showFilter = false" style="width: 76%; text-align: left;">
                    <span style="color: #333333; font-size: 14px;"> <v-icon center style="color: #333333; font-size: 14px; margin-left: 3px">fas fa-angle-left</v-icon> Atras</span>
                </div>
            </div>

            <div style="width: 100%; height: 100vh; overflow-y: scroll; display: flex; align-items: center; flex-direction: column; padding: 15px">
                <div style="width: 100%; text-align: left; color: #333333">Filtros</div>
                <div @click="showFilter = false; showIndustriesList = true" style="min-width: 100%;height: 72px;box-shadow: 0 1px 4px rgba(0,0,0,.1);border: 1px solid #e6e6e6; margin: 8px; cursor: pointer;background: white;padding: 15px 15px 15px 24px;display: flex;align-items: center;justify-content:space-between ;">
                    <div style="text-align: left">
                        <span style="color: black; font-family: 'Roboto-bold'; font-size: 15px">INDUSTRIAS</span>
                    </div>
                </div>
                <div @click="showFilter = false; showCompaniesList = true" style="min-width: 100%;height: 72px;box-shadow: 0 1px 4px rgba(0,0,0,.1);border: 1px solid #e6e6e6; margin: 8px; cursor: pointer;background: white;padding: 15px 15px 15px 24px;display: flex;align-items: center;justify-content:space-between ">
                    <div style="text-align: left">
                        <span style="color: black; font-family: 'Roboto-bold'; font-size: 15px">EMPRESAS</span>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="showCompaniesList" style="display: flex; flex-direction: column">
            <div style="padding: 5px 16px;display: flex; align-items center; border-bottom: 2px solid #ececec; margin-bottom: 10px">
                <div @click="showCompaniesList = false;showFilter = true" style="width: 76%; text-align: left;">
                    <span style="color: #333333; font-size: 14px;"> <v-icon center style="color: #333333; font-size: 14px; margin-left: 3px">fas fa-angle-left</v-icon> Atras</span>
                </div>
            </div>

            <span style="color: black; font-size: 15px;" v-if="uniqueCompanies.length == 0">No hay compañías para filtrar</span>

            <div style="width: 100%; height: 100vh; display: flex; align-items: center; flex-direction: column; padding: 15px">
                <div  v-for="(company, index) in uniqueCompanies" :key="index" @click="filterClients(2, company); showCompaniesList = false;" style="min-width: 100%;height: 50px;box-shadow: 0 1px 4px rgba(0,0,0,.1);border: 1px solid #e6e6e6; margin: 8px; cursor: pointer;background: white;padding: 15px 15px 15px 24px;display: flex;align-items: center;justify-content:space-between ;">
                    <div style="text-align: left">
                        <span style="color: black; font-family: 'Roboto-regular'; font-size: 15px">{{company}}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div v-if="showIndustriesList" style="display: flex; flex-direction: column">
            <div style="padding: 5px 16px;display: flex; align-items center; border-bottom: 2px solid #ececec; margin-bottom: 10px;">
                <div @click="showIndustriesList = false;showFilter = true" style="width: 76%; text-align: left;">
                    <span style="color: #333333; font-size: 14px;"> <v-icon center style="color: #333333; font-size: 14px; margin-left: 3px">fas fa-angle-left</v-icon> Atras</span>
                </div>
            </div>

            <span style="color: black; font-size: 15px;" v-if="uniqueIndustries.length == 0">No hay industrias para filtrar</span>
            <div style="width: 100%; height: 100vh; display: flex; align-items: center; flex-direction: column; padding: 15px">
                <div  v-for="(industry, index) in uniqueIndustries" :key="index" @click="filterClients(1, industry); showIndustriesList = false;" style="min-width: 100%;height: 50px;box-shadow: 0 1px 4px rgba(0,0,0,.1);border: 1px solid #e6e6e6; margin: 8px; cursor: pointer;background: white;padding: 15px 15px 15px 24px;display: flex;align-items: center;justify-content:space-between ;">
                    <div style="text-align: left">
                        <span style="color: black; font-family: 'Roboto-regular'; font-size: 15px">{{industry}}</span>
                    </div>
                </div>
            </div>
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

Vue.use(checkView)
Vue.use(VueScrollTo, {duration: 850})

export default {
    // props: ['solution', 'getCompanyData', 'happyClients', 'index', 'filterChange', '_validations', 'isFiltered', 'chartType'],
    props: ['name', 'solution', 'selectedSurvey', 'Full', 'getCompanyData', 'allClientsFilter'],
    components: {
      AvatarList, Survey, SurveyContact
    },
    watch: {
        selectedSurveyToShow: function(val) {
        },
        solution: function(val) {
            this.getUniquesItems()
        },
        Full: function (val) {
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
            showCompaniesList: false,
            showIndustriesList: false,
            showFilter: false,
            oldSelectedSurvey: null,
            clientsToShowExtra: [],
            showExtraClients: false,
            showSources: true,
            FullInfo: true,
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
        },
        prev(type = 0) {
            type === 0 ? this.pageNumber-- : this.pageNumberClient--;
            // this.currentSurveys = this.prevStack
        },
        dispatchContactBox(extra = true) {
            let item = extra ? this.showExtraClients : this.showValidationsClients
            this.$emit('dispatchContactBox', !item);
            window.scrollTo({ top: 0 })
        },
        reverseTable() {
            this.selectedSurvey.options = [...this.selectedSurvey.options].reverse();
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
        dispatchShowModal(clients) {
            this.oldSelectedSurvey = this.selectedSurvey;
            this.selectedValidationsClientsList = clients;
            this.showValidationsClients = true;
            this.dispatchContactBox(false)
        },
        dispatchSurvey(survey) {
            this.$emit('dispatchSurvey', survey)
        },
        filterClients(type, filterWord) {
            // console.log(type, filterWord)
          this.selectedClientFilter = filterWord
              this.clientsFiltered = this.getHappyClients().filter(item => type === 1 ? 
                                                                    item.industry.toLowerCase() === filterWord.toLowerCase() : 
                                                                    item.company.toLowerCase() === filterWord.toLowerCase())
      },
        getTotalOther(survey) {
            let total = 0;
            survey.showExtra && survey.extraOptions.length > 0 ? 
            survey.extraOptions.filter(({ active }) => active).forEach(option => total = total + option.validations.length ) :
            false
            return total;
        },
        goToPreview() {
            // this.selectedSurvey = 'all'
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
            // console.log('clients', clients)
            const industries = (clients.map(client => client.industry)).filter(item => item != '124')
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
                // this.filterClients(1, this.uniqueIndustries[0])
                this.clientsFiltered = this.getHappyClients()
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
            // let validations = 0
            // this.getCompanyData.solutions.forEach(solution => {
            // solution.surveys.forEach(survey => {
            // if(survey.active) {
            //     survey.options.forEach(option => {
            //     if(option.active) {
            //         validations = validations + option.validations.length;                
            //     }
            //     });
            //     survey.extraOptions.filter(({active}) => active ? validations = validations + 1 : false)
            // }
            // });
            // })
            // return validations
            let validations = 0
            this.selectedSurvey.options.forEach(option => {
                if(option.active) {
                    validations = validations + option.validations.length;                
                }
            });
            this.selectedSurvey.extraOptions.filter(({active}) => active ? validations = validations + 1 : false)
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
            // console.log('CCCC', c)
            return c
        },        
    },
    beforeMount() {
        this.isMobile = this.checkDeviceType();
        // this.filterClients(1, 'Real State')   
        // this.selectedSurvey = 'all'
        // this.survey = this.solution.surveys[0] 
    },
    mounted() {
        // this.getTotalCountValidations()
        // this.filterClients(1, 'Real State')
        this.getUniquesItems()
        this.loaded = false
        this.loaded = true;
        // console.log('NAME', this.name)
        // console.log('CATEGORY', this.category)
        // console.log('selectedSurvye', this.selectedSurvey)
        // // this.selectedSurvey = (this.solution.surveys.slice(start, end))[0];
    },
    updated() {
    },
    beforeUpdate() {
        // console.log('before updated', this.solution)
        // this.getTotalCountValidations()
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
            // survey.extraOptionPerc = ((100*(survey.extraOptions.filter(({active}) => active)).length)/survey.options.filter(({ active }) => active)[0].validations.length)
        });
        // console.log('BY CLIENTS MENU', this.byClientsMenu)
        // this.getUniquesItems()
        // console.log('CLIENT FILTERED', this.clientsFiltered)
        // this.getUniquesItems();
        console.log('CLIENT FILTERED', this.clientsFiltered)
        this.loaded = false
        this.loaded = true
        // console.log('selectedSurveyToShow', this.selectedSurveyToShow)
    },
    destroyed() {
        this.isLoaded = false
    }
}
</script>

<style scoped>
    table {
        background: #d9d9d9;
        border-spacing: 1px;
    }

    /* td, th {
    } */

    th {
        padding: 4px 14px 4px 14px;
        text-align: center;
    }

    td {
        padding: 12px 14px 12px 14px;
        text-align: left;
    }

    tr:nth-child(odd) {
        background-color: #f6f7f9;
    }

    tr:nth-child(even) {
        background: white;
    }
</style>
