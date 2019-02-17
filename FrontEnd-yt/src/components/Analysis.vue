<template>
    <div :style="ats('width: 100%; height: 100%', '=', 'width: 989px')">
        <div :class="ats('mobileBox', '=', 'box')">
            <v-layout align-start justify-start row fill-height style="height: 48px; position: sticky; top: 135px; z-index: 3; background: white;">
                <v-flex :class="ats('xs6', '=', 'xs2')" style="margin-left: 16px;">
                    <div @click="activeItemAnalysis = 'analysis'; pageNumber = 0; showClientsExtraOptions = true" :class="activeItemAnalysis == 'analysis' ? 'activeItemAnalysis' : ''" style="cursor: pointer; margin-left: 4px; padding: 15px 3px 6px 3px; float: left">
                        <img v-show="activeItemAnalysis !== 'analysis'" src="/static/images/edit/analysis.png" style="width: 16px; height: auto; margin-right: 14px;">
                        <img v-show="activeItemAnalysis === 'analysis'" src="/static/images/edit/analysis_act.png" style="width: 16px; height: auto; margin-right: 14px;">
                        <span style="cursor: pointer;font-size: 16px">Análisis</span>
                    </div>
                </v-flex>
                <v-flex :class="ats('xs6', '=', 'xs2')" style="margin-left: -55px">
                    <div  @click="activeItemAnalysis = 'secret';pageNumber = 0; showClientsExtraOptions = true"  :class="activeItemAnalysis !== 'analysis' ? 'activeItemAnalysis' : ''" style="cursor: pointer; padding: 15px 3px 4px 3px; float: left">
                        <img v-show="activeItemAnalysis !== 'analysis'" src="/static/images/edit/pub_act.png" style="width: 16px; height: auto; margin-right: 14px;">
                        <img v-show="activeItemAnalysis === 'analysis'" src="/static/images/edit/pub.png" style="width: 16px; height: auto; margin-right: 14px;">                        
                        <span style="cursor: pointer;font-size: 16px">Publicaciόn</span>
                    </div>
                </v-flex>
                <v-flex v-if="activeItemAnalysis !== 'analysis' && !$vuetify.breakpoint.smAndDown">
                    <div style="padding: 15px; text-align: right; margin-right: 20px">
                        <span style="color: grey; cursor: pointer;">Publica en tu Perfil Yes Them<v-tooltip z-index="230" bottom max-width="200px"><v-icon slot="activator" left dark style="padding-top: 1px; margin-left: 4px;cursor: pointer; font-size: 20px; color: #cecece">fas fa-info-circle</v-icon><span>Publica tu pefil en YES THEM.</span></v-tooltip></span>
                    </div>
                </v-flex>
                <!-- <div style="border-bottom: 1px solid #d4d4d4"></div> -->
            </v-layout>
            <hr style="position: sticky; top: 183px;border: 0.5px solid #ececec; z-index: 3">

            <div v-if="activeItemAnalysis === 'analysis'" :style="ats('padding: 15px', '=', 'padding: 6px 130px 6px 6px;')">
                <v-layout v-if="!$vuetify.breakpoint.smAndDown" align-center justify-center row fill-height>
                    <v-flex xs8>
                        <div style="padding: 12px 20px 16px 12px; text-align: left"><span style="font-weight: bold; font-size: 20px">Encuestas</span></div>
                    </v-flex>
                    <v-flex style="width: 37%">
                        <div style="padding: 20px 20px 20px 92px;">
                            <span :style="`font-size: 16px; margin-right: 50px; cursor: pointer; color: ${pageNumber==0 ? '#999999' : 'black'}`" @click="pageNumber==0 ? false : prev()"><v-icon center style="color: #999999; font-size: 16px; margin-right: 10px">fas fa-chevron-left</v-icon>Anterior</span>
                            <span :style="`font-size: 16px; cursor: pointer; color:  ${pageNumber >= pageCount -1 ? '#999999' : 'black'}`" @click="pageNumber >= pageCount -1 ? false : next()">Siguiente<v-icon center style="color: #999999; font-size: 16px; margin-left: 10px">fas fa-chevron-right</v-icon></span>
                        </div>
                    </v-flex>
                </v-layout>
                <v-layout v-if="!$vuetify.breakpoint.smAndDown" align-start justify-start row fill-height style="padding: 0px 8px 24px 12px">
                    <v-flex xs4 v-for="(survey, index) in currentSurveys" @click="selectSurvey(survey)"  :key="index" style="user-select: none; margin-right: 21px; border-radius: 3px; cursor: pointer; width: 290px; height: 72px; padding: 15px; text-align: center; border: 1px solid #cecece; padding: 25px">
                        <span :style="selectedSurvey.description === survey.description ? 'color: #207ac0; font-weight: bold' : 'font-weight: bold'">{{survey.description}}</span>
                    </v-flex>
                </v-layout>

                <div v-if="$vuetify.breakpoint.smAndDown" style="margin-bottom: 20px; width: 100%; overflow-x: scroll; overflow-y: hidden; white-space: nowrap;">
                    <div style="display: flex; flex-direction: row;">
                        <div v-for="(survey, index) in solution.surveys" @click="selectSurvey(survey)"  :key="index" style="user-select: none; margin-right: 21px; border-radius: 3px; cursor: pointer; width: 110%; height: 72px; padding: 15px; text-align: center; border: 1px solid #cecece; padding: 25px">
                            <span :style="selectedSurvey.description === survey.description ? 'color: #207ac0; font-weight: bold' : 'font-weight: bold'">{{survey.description}}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <div style="padding: 2px 15px 26px 12px; text-align: left">
                        <span :style="ats('font-size: 16px;', '=', 'font-size: 22px;')">{{selectedSurvey.question ? selectedSurvey.question : '¿Cuales fueron los aspectos mas valiosos del servicio prestado?'}}</span>
                    </div>
                    <v-layout align-center justify-center column fill-height>
                        <v-flex :style="ats('width: 100%; background: rgb(250, 250, 250); padding: 5px; margin-left: 0px;', '=', 'width: 830px; background: rgb(250, 250, 250); padding: 5px; margin-left: -30px;')">
                            <v-layout align-center justify-center row fill-height>
                                <v-flex xs11 style="text-align: left">
                                    <div style="text-align: left; color: black; font-weight: bold; font-size: 15px">Opciones</div>
                                </v-flex>
                                <v-flex style="text-align: left">
                                    <div style="text-align: left; color: black; font-weight: bold; font-size: 15px">Validaciones</div>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex :style="ats('width: 100%; margin-left: 0px;', '=', 'width: 830px; margin-left: -20px;')">
                            <v-layout v-for="(option, index) in selectedSurvey.options" :key="index" align-center justify-center row fill-height style="border-bottom: 1px solid #ececec">
                                <v-flex v-if="$vuetify.breakpoint.smAndDown" @click="selectedValidationsClientsList = option.validations; showValidationsMobileClients = index; showValidationsMobileClients = true" xs11 style="margin-top: 10px">
                                    <div style="display: flex; margin-left: 10px">
                                    <div><span style="font-weight: bold; font-size: 14px">{{index+1}}</span></div>
                                    <div :style="ats('margin-left: 10px; width: 80%; text-align: left;', '=', 'margin-left: 20px')"><span style="font-size: 14px">{{option.optionDescription}}</span></div>
                                    </div>
                                </v-flex>
                                <v-flex v-if="!$vuetify.breakpoint.smAndDown" xs11 style="margin-top: 10px">
                                    <div style="display: flex; margin-left: 10px">
                                    <div><span style="font-weight: bold; font-size: 14px">{{index+1}}</span></div>
                                    <div style="margin-left: 20px"><span style="font-size: 14px">{{option.optionDescription}}</span></div>
                                    </div>
                                </v-flex>                                
                                <v-flex style="margin-left: -30px">
                                    <div style="display: flex">
                                        <!-- <div><span>{{option.validations.length}}</span></div> -->
                                        <div><span style="font-size: 14px">{{option.validations.length}}</span></div>
                                        <div style="margin-left: 70px; cursor: pointer">
                                            <span style="font-weight: bold;">
                                                <v-icon @click="indexToRemove = index; dialog = true;" center style="color: gray; font-size: 12px">fas fa-trash-alt</v-icon>
                                            </span> 
                                        </div> 
                                    </div>
                                </v-flex>
                            </v-layout>
                            <v-layout v-if="selectedSurvey.showExtra" :key="index" align-center justify-center row fill-height style="border-bottom: 1px solid #ececec">
                                <v-flex xs9 style="margin-top: 10px">
                                    <div style="display: flex; margin-left: 10px;">
                                        <div><span style="font-weight: bold; font-size: 14px">{{selectedSurvey.options.length+1}}</span></div>
                                        <div style="margin-left: 20px"><span style="font-size: 14px">Otras Opciones</span></div>
                                    </div>
                                </v-flex>
                                <v-flex :style="ats('text-align: center; font-size: 12px; cursor: pointer', '=', 'text-align: left; cursor: pointer')" @click="showClientsExtraOptions = !showClientsExtraOptions">
                                    <div><span style="color: #207ac0; user-select: none">Validaciones <span v-if="showClientsExtraOptions">▼</span><span v-if="!showClientsExtraOptions" style="margin-right: 4px">⯈</span></span></div>
                                </v-flex>
                                <v-flex v-if="!$vuetify.breakpoint.smAndDown">
                                    <div style="display: flex;">
                                        <!-- <div><span>{{option.validations.length}}</span></div> -->
                                        <div><span style="font-size: 14px; margin-left: 0px;">{{selectedSurvey.extraOptions.length === 0 ? 0 : getTotalOtherValidations(selectedSurvey)}}</span></div>
                                        <div style="margin-left: 78px; cursor: pointer; user-select: none">
                                            <span style="font-weight: bold;">
                                                <!-- <v-icon center style="color: gray; font-size: 12px">fas fa-trash-alt</v-icon> -->
                                            </span>
                                        </div>
                                    </div>
                                </v-flex>
                            </v-layout>   
                            <v-layout v-if="showClientsExtraOptions" align-start justify-start row fill-height style="border-bottom: 1px solid #ececec">
                                <v-flex xs12 style="padding: 8px 0px 8px 10px; text-align: left;">
                                   <div>
                                       <span style="color: green; font-size: 15px; user-select: none">VALIDACIONES</span>
                                   </div>
                                </v-flex>
                            </v-layout>              
                            <v-layout v-if="showClientsExtraOptions" :key="index" align-start justify-start column="" fill-height>
                                <v-flex style="margin-top: 10px; width: 100%; text-align: left; margin-bottom: 10px;">
                                   <div :style="ats('margin-left: 15px', '=', 'margin-left: 32px')">
                                       <span style="color: #999999; font-size: 12px">Mostrando <span style="font-weight: bold">{{selectedSurvey.extraOptions.length === 0 ? 0 : getTotalOtherValidations(selectedSurvey)}}</span> Validaciones <span v-if="selectedSurvey.extraOptions.length === 0"><span style="font-weight: bold"> –</span> Ningún cliente ha respondido con su propia validación.</span></span>
                                   </div>
                                </v-flex>
                                <v-flex style="width: 100%">
                                    <!-- <div v-if="selectedSurvey.extraOptions.length === 0" style="width: 100%;height: 278px; overflow-y: scroll; width: 100%;">
                                        <span>Ningùn cliente ha agregado una opciòn extra</span>
                                    </div> -->
                                    <div v-if="selectedSurvey.extraOptions.length > 0" :style="ats('width: 100%; padding-left: 15px; height: 278px; overflow-y: scroll; width: 100%;', '=', 'width: 100%; padding-left: 32px; height: 278px; overflow-y: scroll; width: 100%;')">
                                        <div v-for="(option, index) in selectedSurvey.extraOptions" :key="index" style="display: flex; padding: 23px 0px 23px 0px; border-bottom: 1px solid #ececec;">
                                            <div style="width: 89%; text-align: left;"><span>{{option.optionDescription}}</span></div>
                                            <div>
                                                <v-icon @click="removeOption(selectedSurvey, index, 1)" center style="color: gray; font-size: 12px; cursor: pointer;">fas fa-trash-alt</v-icon>
                                            </div>
                                        </div>
                                    </div>
                                </v-flex>
                            </v-layout>                                                                     
                        </v-flex>
                        <v-flex v-if="!$vuetify.breakpoint.smAndDown" style="padding: 10px 28px 10px 10px">
                            <v-flex style="background-color: rgb(250, 250, 250); width: 960px; padding: 5px 2px 5px 2px; text-align: left">
                                <span style="font-weight: bold; font-size: 16px">Clientes que han Validado</span>
                            </v-flex>
                        </v-flex>
                        <v-flex v-if="!$vuetify.breakpoint.smAndDown" style="width: 960px; padding: 0px 28px 6px 13px; margin-top: 0px">
                            <v-layout align-center justify-center row fill-height>
                                <v-flex xs1 style="text-align: left">
                                    <span style="font-weight: bold; font-size: 12px; margin-left: 0">Opcion</span>
                                </v-flex>
                                <v-flex style="text-align: left">
                                    <span style="margin-left: -8px; font-weight: bold; font-size: 12px; text-align: left">Clientes</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex v-if="!$vuetify.breakpoint.smAndDown" style="width: 100%; height: 100%">
                            <v-flex v-for="(option, index) in selectedSurvey.options" :key="index" style="width: 100%; padding: 0px 28px 0px 0px;">
                                <div style="display: flex;">
                                    <div style="margin-top: 16px; margin-left: 15px">
                                        <span style="font-weight: bold;">{{index+1}}<v-tooltip z-index="230" right max-width="200px" style="margin-left: 10px"><v-icon slot="activator" left dark style="padding-top: 0px; margin-left: 1px;cursor: pointer; font-size: 15px; color: #cecece;">fas fa-info-circle</v-icon><span>{{option.optionDescription}}</span></v-tooltip></span>
                                    </div>
                                    <div v-if="option.validations.length>0" class="divWithCustomScroll" style="padding: 20px 0px 0px 34px; height: 278px; overflow-y: scroll; width: 918px;">
                                        <v-layout align-left justify-start row fill-height wrap>
                                            <v-flex xs4 v-for="(client, i) in option.validations" v-bind:key="i" style="margin-bottom: 30px;">
                                                <ClientBox :client="client" @dispatchRemoveClient="removeClients(selectedSurvey, index, i, 0)"/>
                                            </v-flex>
                                        </v-layout>
                                    </div>   
                                    <div v-if="option.validations.length === 0" style="padding: 80px; margin-left: -10px">
                                        <span style="text-align: center">Ningún cliente ha validado esta opción</span>
                                    </div>
                                </div>
                                <hr style="width: 790px; margin-left: 82px; border: 2px solid rgb(217, 227, 237);"/>
                            </v-flex>
                        </v-flex>
                        <v-flex v-if="selectedSurvey.showExtra && !$vuetify.breakpoint.smAndDown" style="width: 100%">
                            <div style="display: flex;">
                                <div style="margin-top: 16px; margin-left: 15px"><span style="font-weight: bold">{{selectedSurvey.options.length+1}}</span></div>
                                <div v-if="selectedSurvey.extraOptions.length !== 0" class="divWithCustomScroll" style="padding: 20px 0px 0px 60px; height: 278px; overflow-y: scroll; width: 909px;">
                                    <v-layout align-left justify-start row fill-height wrap>
                                        <v-flex xs4 v-for="(option, i) in selectedSurvey.extraOptions" v-bind:key="i" style="margin-bottom: 30px;">
                                            <ClientBox :client="option.validations[0]" @dispatchRemoveClient="removeClients(selectedSurvey, 0, i, 1)"/>
                                        </v-flex>
                                    </v-layout>
                                </div>   
                                <div v-if="selectedSurvey.extraOptions.length === 0" style="padding: 80px">
                                    <span style="text-align: center">Ningún cliente ha validado esta opción</span>
                                </div>
                            </div>                                
                            <!-- <hr style="border: 2px solid rgb(217, 227, 237);"/> -->
                        </v-flex>                                        
                    </v-layout>
                </div>
            </div>

            <div v-if="activeItemAnalysis !== 'analysis'" :style="ats('padding: 15px', '=', '')">
                <v-layout v-if="!$vuetify.breakpoint.smAndDown" align-center justify-center row fill-height>
                    <v-flex xs8>
                        <div style="padding: 21px 20px 16px 18px; text-align: left"><span style="font-weight: bold; font-size: 20px">Encuestas</span></div>
                    </v-flex>
                    <v-flex  style="width: 37%">
                        <div style="padding: 20px 20px 20px 92px;">
                            <span :style="`font-size: 16px; margin-right: 50px; cursor: pointer; color: ${pageNumber==0 ? '#999999' : 'black'}`" @click="pageNumber==0 ? false : prev()"><v-icon center style="color: #999999; font-size: 16px; margin-right: 10px">fas fa-chevron-left</v-icon>Anterior</span>
                            <span :style="`font-size: 16px; cursor: pointer; color:  ${pageNumber >= pageCount -1 ? '#999999' : 'black'}`" @click="pageNumber >= pageCount -1 ? false : next()">Siguiente<v-icon center style="color: #999999; font-size: 16px; margin-left: 10px">fas fa-chevron-right</v-icon></span>
                        </div>
                    </v-flex>
                </v-layout>

                <v-layout v-if="!$vuetify.breakpoint.smAndDown" align-start justify-start row fill-height style="padding: 3px 8px 0px 18px">
                    <v-flex xs4 v-for="(survey, index) in currentSurveys" @click="selectSurvey(survey)"  :key="index" style="user-select: none; margin-right: 21px; border-radius: 3px; cursor: pointer; width: 290px; height: 72px; padding: 15px; text-align: center; border: 1px solid #cecece; padding: 25px">
                        <span :style="selectedSurvey.description === survey.description ? 'color: #207ac0; font-weight: bold' : 'font-weight: bold'">{{survey.description}}</span>
                    </v-flex>
                </v-layout>

                <div v-if="$vuetify.breakpoint.smAndDown" style="margin-bottom: 20px; width: 100%; overflow-x: scroll; overflow-y: hidden; white-space: nowrap;">
                    <div style="display: flex; flex-direction: row;">
                        <div v-for="(survey, index) in solution.surveys" @click="selectSurvey(survey)"  :key="index" style="user-select: none; margin-right: 21px; border-radius: 3px; cursor: pointer; width: 110%; height: 72px; padding: 15px; text-align: center; border: 1px solid #cecece; padding: 25px">
                            <span :style="selectedSurvey.description === survey.description ? 'color: #207ac0; font-weight: bold' : 'font-weight: bold'">{{survey.description}}</span>
                        </div>
                    </div>
                </div>

                <v-layout align-start justify-start column :style="ats('', '=', 'padding: 4px 50px 0px 19px;')">
                    <v-flex>
                        <v-layout align-start justify-start row>
                            <v-flex xs12><div :style="`margin-top: ${index===0 ? '5px' : ats('6px', '=', '25px')}; text-align: left;`"><span :style="ats('font-size: 17px; color: rgb(51, 51, 51); padding-right: 10px; background: white; font-family: Roboto-bold; position: relative;', '=', 'font-size: 26px; color: rgb(51, 51, 51); padding-right: 10px; background: white; font-family: Roboto-bold; position: relative;')">{{selectedSurvey.description.toUpperCase()}}</span></div></v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex :style="ats('margin-top: 0px; margin-bottom: 4px; text-align: left', '=', 'margin-top: 15px; margin-bottom: 4px;')">
                        <span :style="ats('color: #333333; font-size: 16px; font-family: Roboto-regular;', '=', 'color: #333333; font-size: 22px; font-family: Roboto-regular;')">{{ selectedSurvey.question }}</span>
                    </v-flex>
                    <v-flex style="width: 100%; margin-top: -20px">
                        <v-layout align-end justify-end row fill-height>
                            <!-- <div style="opacity: 0; width: 510px; border-bottom: 0.5px solid #ececec; margin-right: 58px; text-align: left;"><span style="font-size: 16px">Opciones</span></div>
                            <div xs3 style="opacity: 0; width: 224px; margin-right: 22px; border-bottom: 0.5px solid #ececec; text-align: left"><span style="font-size: 16px">Validaciones de Clientes</span></div> -->
                            <!-- <v-flex xs1 style="margin-right: 95px; margin-top: -18px">
                                <v-btn @click="publishSurvey(selectedSurvey, true, index)" depressed style="background: #419453; text-transform: none; font-weight: bold; color: white">Publicar</v-btn>
                            </v-flex> -->
                            <!-- <v-flex xs1 style="margin-top: -18px">
                                <v-btn @click="publishSurvey(selectedSurvey, false, index)" depressed style="background: #cecece; text-transform: none; font-weight: bold; color: white">Desactivar</v-btn>
                            </v-flex> -->
                        </v-layout>
                    </v-flex>
                    <br>
                    <v-flex :style="`width: 100%; margin-bottom: 0; padding-top: 8px;`">
                        <div v-if="!$vuetify.breakpoint.smAndDown" style="width: 100%; border: 1px solid #e5e5e5;background: #ffffff; background:-webkit-linear-gradient(top, #ffffff, #f6f7f8); background: -moz-linear-gradient(top, #ffffff, #f6f7f8); background: -ms-linear-gradient(top, #ffffff, #f6f7f8); background: -o-linear-gradient(top, #ffffff, #f6f7f8); background: linear-gradient(to bottom, #ffffff, #f6f7f8); height: 33px; font-size: 13px; display: flex; align-items: center;">
                            <div style="width: 94px; height: 100%;border-right: 1px solid #ececec; display: flex; align-items: center; justify-content: flex-end">
                                <img v-if="checkBoxToShow.length != selectedSurvey.options.length+1" src="/static/images/_checkbox.png" @click="checkBoxToShow = []; selectedSurvey.options.forEach((item, i) => checkBoxToShow.push(i)); checkBoxToShow.push('extra')" style="cursor: pointer; width: 14px; height: 14px; border-radius: 2px; border: 1px solid #cecece; margin-right: 12px;" alt="checkbox not selected"/>
                                <img v-if="checkBoxToShow.length == selectedSurvey.options.length+1" src="/static/images/_checkbox_selected.png" @click="checkBoxToShow = []" style="cursor: pointer; width: 14px; height: 15px; border-radius: 2px; border: 1px solid #cecece; margin-right: 12px" alt="checkbox not selected"/>                
                            </div>
                            <div style="border-right: 1px solid #ececec; width: 464px; padding-left: 15px; height: 100%; display: flex; align-items: center;">
                                <span style="font-size: 12px; color: #333333; font-family: 'Roboto-regular';">Opciones</span>
                            </div>
                            <div style="border-right: 1px solid #ececec; width: 203px; height: 100%; padding-left: 14px; display: flex; align-items: center;">
                                <span style="font-size: 12px; color: #333333; font-family: 'Roboto-regular';">Validaciones</span>
                            </div>
                            <div style="border-right: 1px solid #ececec; width: 256px; height: 100%; padding-left: 15px; display: flex;align-items: center;">
                                <span style="font-size: 12px; color: #333333; font-family: 'Roboto-regular';">Clientes</span>
                            </div>
                            <!-- <div :style="`width: 100px; height: 30px; text-align: left; padding-left: 15px;`">
                            </div>                -->
                            <div v-tooltip.top="'Publicaras todas las opciones seleccionadas'" style="width: 168px; height: 100%;display: flex;align-items: center; justify-content: center;">
                                <v-btn @click="publishSurvey(selectedSurvey, true, index)" depressed style="height: 24px; background: #419453; text-transform: none; font-weight: bold; color: white">Publicar</v-btn>
                                <!-- <span style="font-size: 12px; color: #333333; font-family: 'Roboto-regular';">Validado</span> -->
                            </div>            
                        </div>
                        <div v-if="!$vuetify.breakpoint.smAndDown">
                            <div v-for="(option, i) in selectedSurvey.options" :key="i" :style="`height: 54px; background: ${checkBoxToShow.some(item => item === i) ? '#577FBC' : i == (selectedSurvey.options.length - 1) ? '#f5f6f7' : (selectedSurvey.options.length - 1) % 2 == 0 ? i % 2 != 0 ? 'white' : '#f5f6f7' : i % 2 != 0 ? '#f5f6f7' : 'white'}; border-bottom: 1px solid rgb(236, 236, 236); text-align: left; padding: 15px 0 15px 0; display: flex; justify-content: start; align-items: center;`">
                                <div style="width: 94px; padding: 10px; display: flex; align-items: center; justify-content: flex-end">
                                    <img v-if="!checkBoxToShow.some(item => item == i)" src="/static/images/_checkbox.png" @click="checkBoxToShow.push(i)" style="margin-right: 14px; cursor: pointer; width: 14px; height: 15px; border-radius: 2px; border: 1px solid #cecece;" alt="checkbox not selected"/>
                                    <img v-if="checkBoxToShow.some(item => item == i)" src="/static/images/_checkbox_selected.png" @click="checkBoxToShow.splice(checkBoxToShow.indexOf(i), 1)" style="margin-right: 14px; cursor: pointer; width: 14px; height: 15px; border-radius: 2px; border: 1px solid #cecece;" alt="checkbox not selected"/>
                                </div>  
                                <div :style="`width: 322px; padding-left: 12px; margin-right: 62px;`">
                                    <span @click="optionSelected = option; getTotalValidationsInOption = option.validations.length; showResultModal = true" :style="`cursor: pointer; width: 300px; color: ${checkBoxToShow.some(item => item === i) ? 'white' : '#385898'}; font-size: 13px; margin-left: 0px;font-family: 'Roboto-medium';`">{{option.optionDescription.substring(0, 83)}}</span>
                                </div>
                                <div style="display: flex; flex-direction: column; margin-left: 5px">
                                    <span :style="`margin-left: 16px; margin-bottom: 4px; font-size: 15px; color: ${checkBoxToShow.some(item => item === i) ? 'white' : '#333333'};`">
                                        {{option.validations.length}}
                                    </span>
                                    <div v-if="option.perc > 0" :style="`width: 61px; height: 8px; margin-left: 15px; background-color: transparent; border-radius: 5px`">
                                        <div :style="`transition: ease-in-out 0.3s; width: ${option.perc}%; max-width: 61px; height: 8px; border-radius: 5px; background-color: #f1692f`">
                                        </div>
                                    </div>                            
                                </div>
                                <div :style="`width: 118px; height: 30px; text-align: left; padding-left: 15px;`">
                                </div>
                                <div style="flex: 3; margin-left: 5px">
                                    <v-layout align-start justify-start row :style="``">
                                            <div  align="left" class="" style="margin-left: 0px" v-for="(client, index) in option.validations.slice(0,2)" v-bind:key="index">
                                                <div :style="`padding-top: 7px; background-size: cover; border: 1px solid #e3e3e3;border-radius: 50%; width: 34px; height: 34px; background-image: url(${Number.isInteger(parseInt(client.pictureUrl.split('.')[0])) ? '/static/images/faces/' : client.pictureUrl.includes('http') ? '' : '/'}${client.pictureUrl})`">
                                                </div>
                                            </div>
                                            <div align="left" class="" style="margin-left: 0px" v-if="option.validations.length>2" @click="selectedValidationsClientsList = option.validations; dispatchShowModal(1)" :style="`display: flex; justify-content: center; align-items: center; cursor: pointer;background-size: cover; border: 1px solid #e3e3e3;border-radius: 50%; width: 34px; height: 34px; background-image: linear-gradient( rgba(0, 0, 0, 0.5) 100%, rgba(0, 0, 0, 0.5)100%),url(${Number.isInteger(parseInt(option.validations[2].pictureUrl.split('.')[0])) ? '/static/images/faces/' : option.validations[2].pictureUrl.includes('http') ? '' : '/'}${option.validations[2].pictureUrl})`">
                                                <span style="font-family: 'Roboto-regular'; margin-left: 0px; font-size: 13px; color: white;">+{{option.validations.length-2}}</span>
                                            </div>                                        
                                    </v-layout>                                                                        
                                </div>
                                <div v-if="option.active && !optionActive" style="width: 105px; margin-right: 51px; margin-top: 8px;"> <!--12PX-->
                                    <div v-tooltip.bottom="'Desactivaras la opcion, y no podrá ser vista en tu página de empresa'" style="display: flex">
                                        <div style="margin-left: 25px">
                                            <span style="cursor: pointer;"><img src="/static/images/edit/pin.png"></span>
                                        </div>
                                        <div>
                                            <div @click="changeOption2(option, i)" style="cursor: pointer; text-align: left;"><span style="text-decoration: underline; color: #8a8a8a; font-size: 15px; margin-left: 14px">DESACTIVAR</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div style="width: 105px; margin-right: 28px;" v-if="!option.active && !optionActive"> <!--38PX-->
                                    <label class="container">
                                        <input type="checkbox" @change="changeOption(option, i)" :checked="option.active" name="radio" :disabled="loadingCheckboxes">
                                        <span class="checkmark"></span>
                                    </label>                                
                                </div>                             
                            </div>
                        </div>
                      
                        <v-layout v-if="selectedSurvey.showExtra && !$vuetify.breakpoint.smAndDown" align-left justify-start row fill-height style="padding-left: 0px; height: 60px; margin-bottom: 0px; margin-top: -2px">
                            <div :style="`text-align: left; width: 100%; display: flex; border-top: 1px solid #ececec; margin-bottom: 0px; justify-content: start; align-items: center; background: ${checkBoxToShow.some(item => item === 'extra') ? '#577FBC' : 'white'};`">
                                <div style="margin-left: 48px; width: 48px; display: flex; align-items: center; justify-content: center">
                                    <img v-if="!checkBoxToShow.some(item => item === 'extra')" src="/static/images/_checkbox.png" @click="checkBoxToShow.push('extra')" style="margin-right: 20px; cursor: pointer; width: 14px; height: 15px; border-radius: 2px; border: 1px solid #cecece;" alt="checkbox not selected"/>
                                    <img v-if="checkBoxToShow.some(item => item === 'extra')" src="/static/images/_checkbox_selected.png" @click="checkBoxToShow.splice(checkBoxToShow.indexOf('extra'), 1)" style="margin-right: 20px; cursor: pointer; width: 14px; height: 15px; border-radius: 2px; border: 1px solid #cecece;" alt="checkbox not selected"/>
                                </div> 
                                <div :style="`width: 326px; margin-right: 59px; margin-left: 10px;`">
                                    <!-- <div style="margin-top: -4px; text-align: left"> -->
                                    <span v-if="selectedSurvey.extraOptions.length === 0" :style="`user-select: none; cursor: pointer; color: ${checkBoxToShow.some(item => item === 'extra') ? 'white' : '#385898'}; font-size: 13px; margin-left: 0px;font-family: 'Roboto-medium';`">Otras Validaciones<span style="margin-right: -5px">►</span></span>
                                    <span 
                                        @click="showClientsExtraOptions = !showClientsExtraOptions" 
                                        v-if="selectedSurvey.extraOptions.length > 0"
                                        :style="`user-select: none; cursor: pointer;font-family: 'Roboto-medium'; color: ${checkBoxToShow.some(item => item === 'extra') ? 'white' : '#385898'}; font-size: 13px; margin-left: 0px;`">
                                        Otras Validaciones
                                        <span v-if="showClientsExtraOptions">▼</span>
                                        <span v-if="!showClientsExtraOptions" style="margin-right: -5px;">►</span>
                                    </span>
                                    <!-- </div> -->
                                </div>
                                <div :style="`display: flex; flex-direction: column; margin-left: ${selectedSurvey.extraOptions.length == 0 ? '8px' : '5px'};`">
                                    <span :style="`margin-bottom: 4px; font-size: 15px; color: ${checkBoxToShow.some(item => item === 'extra') ? 'white' : '#333333'};`">
                                        {{selectedSurvey.extraOptions.length}}
                                    </span>
                                    <div v-if="selectedSurvey.extraOptions.length > 0" :style="`width: 61px; height: 7px; background-color: transparent; border-radius: 5px; opacity: ${selectedSurvey.extraOptions.length == 0 ? '0' : '1'};`">
                                        <div :style="`transition: ease-in-out 0.3s; max-width: 61px; width: ${selectedSurvey.extraOptionPerc}%; height: 7px; border-radius: 5px; background-color: #f1692f`">
                                        </div>
                                    </div>                        
                                </div>
                                <div :style="`width: 118px; height: 30px; text-align: left;`">
                                </div>
                                <div style="flex: 3; margin-left: 5px">
                                    <v-layout align-start justify-start row :style="``">
                                            <div  align="left" class="" style="margin-left: 0px" v-for="(client, index) in selectedSurvey.extraOptions.slice(0,2)" v-bind:key="index">
                                                <div :style="`padding-top: 7px; background-size: cover; border: 1px solid #e3e3e3;border-radius: 50%; width: 34px; height: 34px; background-image: url(${Number.isInteger(parseInt(client.validations[0].pictureUrl.split('.')[0])) ? '/static/images/faces/' : client.validations[0].pictureUrl.includes('http') ? '' : '/'}${client.validations[0].pictureUrl})`">
                                                </div>
                                            </div>
                                            <div align="left" class="" style="margin-left: 0px" v-if="selectedSurvey.extraOptions.length>2" @click="selectedValidationsClientsList = selectedSurvey.extraOptions; dispatchShowModal(2)" :style="`display: flex; justify-content: center; align-items: center; cursor: pointer;  padding-top: 0px; background-size: cover; border: 1px solid #e3e3e3;border-radius: 50%; width: 34px; height: 34px; background-image: linear-gradient( rgba(0, 0, 0, 0.5) 100%, rgba(0, 0, 0, 0.5)100%),url(${Number.isInteger(parseInt(selectedSurvey.extraOptions[2].validations[0].pictureUrl.split('.')[0])) ? '/static/images/faces/' : selectedSurvey.extraOptions[2].validations[0].pictureUrl.includes('http') ? '' : '/'}${selectedSurvey.extraOptions[2].validations[0].pictureUrl})`">
                                                <span style="font-family: 'Roboto-regular'; margin-left: 0px; font-size: 13px; color: white;">+{{selectedSurvey.extraOptions.length-2}}</span>
                                            </div>                                        
                                    </v-layout>                                                                        
                                </div>
                                <!-- <div :style="`width: 152px; padding: 10px 10px 10px 0px; display: flex; align-items: center; justify-content: flex-start; opacity: ${selectedSurvey.extraOptions.length == 0 ? '0' : '1'};`">
                                    <img src="/static/images/check.png" style="cursor: pointer; width: 14px; height: 15px;" alt="checkbox not selected"/>
                                </div>                     -->
                            </div>
                        </v-layout>

                        <v-layout v-if="showClientsExtraOptions && !$vuetify.breakpoint.smAndDown" align-start justify-start column fill-height :style="`width: 100%; background: ${checkBoxToShow.some(item => item == 'extra') ? 'rgb(87, 127, 188)' : ''}`">
                            <v-layout style="width: 100%; " align-start justify-start column="" fill-height>
                                <v-flex style="width: 100%; padding-left: 104px">
                                    <div v-if="selectedSurvey.extraOptions.length > 0" style="height: 100%; overflow-y: hidden;">
                                        <div v-for="(option, j) in currentClients" :key="j" :style="`width: 448px; height: 100%; padding-top: 15px; border-bottom: ${checkBoxToShow.some(item => item == 'extra') ? '1px solid rgb(236, 236, 236)' : '1px solid white'}; justify-content: center; display: flex; align-items: center;`">
                                            <div style="width: 100%; padding-bottom: 15px; border-bottom: 1px solid #ececec;">
                                                <div style="display: flex;">
                                                    <div style="margin-right: 10px">
                                                        <v-avatar size="31" style="margin-left: 1px">
                                                            <img
                                                                :src="`${Number.isInteger(parseInt(option.validations[0].pictureUrl.split('.')[0])) ? '/static/images/faces/' : option.validations[0].pictureUrl.includes('http') ? '' : '/'}${option.validations[0].pictureUrl}`"
                                                                style="border: 1px solid #e3e3e3; margin-bottom: 15px; margin-right: 3px"
                                                            />
                                                        </v-avatar>                                                            
                                                    </div>
                                                    <div style="width: 211px; text-align: left">
                                                        <span @click="optionSelected = option; getTotalValidationsInOption = 1; showResultModal = true" :style="`cursor: pointer; font-family: 'Roboto-medium'; font-size: 13px; color: ${checkBoxToShow.some(item => item == 'extra') ? 'white' : '#385898'}`">
                                                            {{option.optionDescription}}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <div v-if="option.active && !optionActive" style="width: 105px; margin-right: 26px; z-index: 3">
                                                            <div v-tooltip.bottom="'Desactivaras la opcion, y no podrá ser vista en tu página de empresa'" style="display: flex">
                                                                <div>
                                                                    <span style="cursor: pointer;"><img src="/static/images/edit/pin.png"></span>
                                                                </div>
                                                                <div>
                                                                    <div @click="changeOption2E(option, option._index)" style="cursor: pointer; text-align: left;"><span style="text-decoration: underline; color: #8a8a8a; font-size: 15px; margin-left: 20px">DESACTIVAR</span></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style="width: 105px; margin-left: 56px;" v-if="!option.active && !optionActive">
                                                            <label class="container">
                                                                <input type="checkbox" @change="changeOptionE(option, option._index)" :checked="option.active" name="radio" :disabled="loadingCheckboxes">
                                                                <span class="checkmark"></span>
                                                            </label>                                
                                                        </div> 
                                                    </div>
                                                </div>
                                                <!-- <div style="text-align: left; margin-left: 38px"><span style="font-size: 12px;">{{option.optionDescription}}</span></div> -->
                                            </div>
                                        </div>
                                    </div>                      
                                    <div v-if="selectedSurvey.extraOptions.length > 4" style="display: flex; justify-content: center; align-items: center; width: 250px; height: 83px; background-color: white;">
                                        <div style="margin-right: 5px">
                                            <button type="button" @click="pageNumberClient == 0 ? false : prevClient()" :style="`width: 101px; height: 41px; outline: none; color: ${pageNumberClient == 0 ? 'grey' : 'black'}; border: ${pageNumberClient == 0 ? 'none' : '1px solid #cecece'}; border-radius: 5px; background: ${pageNumberClient == 0 ? 'transparent' : '#f5f6f8'}`"><span>.</span> Anterior</button>
                                        </div>
                                        <div>
                                            <button type="button" @click="pageNumberClient >= pageCount  ? false : nextClient()" :style="`width: 101px; height: 41px; outline: none; color: ${pageNumberClient >= pageCount  ? 'grey' : 'black'}; border: ${pageNumberClient >= pageCount  ? 'none' : '1px solid #cecece'}; border-radius: 5px; background: ${pageNumberClient >= pageCount  ? 'transparent' : '#f5f6f8'}`">Siguiente <span>.</span></button>
                                        </div>
                                    </div>
                                </v-flex>
                            </v-layout> 
                        </v-layout> 
                        
                        <table v-if="$vuetify.breakpoint.smAndDown && !showExtraClients" style="width:100%">
                            <tr>
                                <th style="width: 150px">
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
                                <th @click="publishSurvey(selectedSurvey, true, index)">
                                    <v-btn depressed style="height: 24px; background: #419453; text-transform: none; font-weight: bold; color: white">
                                        ✓
                                    </v-btn>
                                </th>                                
                            </tr>
                            <tr v-for="(option, index) in selectedSurvey.options" v-bind:key="index">
                                <td style="text-align: left; color: #505050"><span>{{option.optionDescription}}</span></td>
                                <td style="text-align: right; color: #505050"><span>{{option.validations.length}}</span></td>
                                <td style="text-align: right; color: #505050; display: flex; justify-content: center; align-items: center">
                                    <div>
                                        <div @click="changeOption2(option, index)" v-if="option.active && !optionActive" style="margin-right: 0px; z-index: 3">
                                            <div style="display: flex">
                                                <div>
                                                    <span style="cursor: pointer;"><img src="/static/images/edit/pin.png"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="!option.active && !optionActive">
                                            <label class="container">
                                                <input type="checkbox" @change="changeOption(option, index)" :checked="option.active" name="radio" :disabled="loadingCheckboxes">
                                                <span class="checkmark"></span>
                                            </label>                                
                                        </div> 
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="selectedSurvey.showExtra" @click="oldSelectedSurvey = selectedSurvey; showExtraClients = true; clientsToShowExtra = selectedSurvey.extraOptions;">
                                <td style="text-align: left; color: #505050"><span>Otras Validaciones</span></td>
                                <td style="text-align: right; color: #505050"><span>{{selectedSurvey.extraOptions.length}}</span></td> 
                                <td style="text-align: right; color: #505050">
                                    <div>
                                        <!-- <div @click="changeOption2(option, index)" v-if="option.active && !optionActive" style="margin-right: 26px; z-index: 3">
                                            <div style="display: flex">
                                                <div>
                                                    <span style="cursor: pointer;"><img src="/static/images/edit/pin.png"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="!option.active && !optionActive">
                                            <label class="container">
                                                <input type="checkbox" @change="changeOption(option, index)" :checked="option.active" name="radio" :disabled="loadingCheckboxes">
                                                <span class="checkmark"></span>
                                            </label>                                
                                        </div>  -->
                                    </div>
                                </td>
                            </tr>
                        </table>

                        <div v-if="showExtraClients">
                            <v-btn @click="publishSurvey(selectedSurvey, true, index)" depressed style="height: 24px; background: #419453; text-transform: none; font-weight: bold; color: white">
                                ✓
                            </v-btn>
                            <div style="display: flex; align-items: center; justify-content: space-between; background: #f6f7f9; height: 58px">
                                <div @click=" showExtraClients = false;"> <!--dispatchSurvey(oldSelectedSurvey);-->
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
                                <div v-for='(option, index) in currentClients' :key="index" style="display: flex; align-items: center; padding: 15px; border-bottom: 1px solid #cececece">
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
                                    <div>
                                        <div v-if="option.active && !optionActive" style="margin-right: 6px; z-index: 3">
                                            <div style="display: flex">
                                                <div @click="changeOption2E(option, option._index)">
                                                    <span style="cursor: pointer;"><img src="/static/images/edit/pin.png"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div style="margin-left: 56px;" v-if="!option.active && !optionActive">
                                            <label class="container">
                                                <input type="checkbox" @change="changeOptionE(option, option._index)" :checked="option.active" name="radio" :disabled="loadingCheckboxes">
                                                <span class="checkmark"></span>
                                            </label>                                
                                        </div> 
                                    </div>
                                </div>
                            </div>            
                        </div>                          
                        <br>                             
                        <!-- <hr v-if="index != solution.surveys.length-1" style="border: 2px solid rgb(217, 227, 237);"/> -->
                    </v-flex>
                </v-layout>               
            </div>
        </div>

        <!-- CLOSE MODAL -->
        <v-dialog v-model="dialog" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">¿Estas seguro que deseas borrar?</v-card-title>
            <v-card-text class="caption py-2" style="text-align:left">Se perderá toda informacion relacionada.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" class="font-weight-bold" flat @click.native="dialog = false">Cancelar</v-btn>
              <v-btn color="primary" class="font-weight-bold" flat @click.native="removeOption(selectedSurvey, indexToRemove, 0); dialog = false">Confirmar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- CLIENTS MODAL -->
       <v-dialog
          v-model="showValidationsClients"
          lazy
          width="774px"
          style="z-index: 9999 !important; margin-top: -10%;"
          :fullscreen="$vuetify.breakpoint.smAndDown"
        >
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




        <v-dialog
          v-model="showValidationsMobileClients"
        lazy
        style="z-index: 999999 !important; width: 100%;"
        :fullscreen="$vuetify.breakpoint.smAndDown"
        >
            <v-card>
                <div style="background: #012a5e; padding: 12px; border-bottom: 1px solid #ececec;">
                    <div style="display: flex">
                        <v-icon style="cursor: pointer; font-size: 16px; color: white;" @click="showValidationsMobileClients = false">fas fa-chevron-left</v-icon>
                        <div style="width: 100%; font-size: 16px; font-weight: bold; color: white;">
                            <!-- {{validations.length}} Clientes Validaron -->
                            Clientes ({{selectedValidationsClientsList.length}})
                        </div>
                    </div>
                </div>
                <div style="padding: 0px 10px 10px 10px;">
                    <div v-for="(client, index) in selectedValidationsClientsList" v-bind:key="index">
                        <div style="display: flex; align-items: center;">
                            <div>
                                <v-avatar :size="$vuetify.breakpoint.smAndDown ? '39' : '39'" color="white">
                                    <img
                                        :src="`${Number.isInteger(parseInt(client.pictureUrl.split('.')[0])) ? '/static/images/faces/' : client.pictureUrl.includes('http') ? '' : '/'}${client.pictureUrl}`"
                                        style="border: 1px solid #e3e3e3"
                                    />
                                </v-avatar>
                            </div>
                            <div style="display: flex; flex-direction: column; width: 100%; padding-bottom: 15px; padding-top: 15px; margin-left: 20px; text-align: left;">
                                <span style="font-size: 14px; font-weight: bold">{{(client.firstName.split(' '))[0]}} {{(client.lastName.split(' '))[0]}}</span>
                                <span style="font-size: 13px; color: #696969">{{client.positions}} · {{client.company}}</span>
                            </div>
                            <div>
                                <v-icon @click="removeClients(selectedSurvey, optionIndexSelected, i, 0); showValidationsMobileClients = false" center style="color: gray; font-size: 12px">fas fa-trash-alt</v-icon>
                            </div>
                        </div>
                        <hr v-if="index != selectedValidationsClientsList.length-1" style="margin-left: 58px; border: 0.5px solid #ececec;">
                    </div>
                </div>
            </v-card>
        </v-dialog>   
       
       
       
       
       
       
       <v-dialog
          v-model="showValidationsOtherClients"
          lazy
          width="774px"
          style="z-index: 9999 !important; margin-top: -10%;"
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


    </div>
</template>
<script>
import ClientBox from '@/components/ClientBox.vue'
import ResultModal from './ResultModal'
export default {
    components: {
        ClientBox, ResultModal
    },
    props: ['solution'],
    computed: {
        pageCount(){
            let l = this.solution.surveys.length,
                s = 3;
            return Math.ceil(l/s);
        },
        currentSurveys(){
            const start = this.pageNumber * 3,
                end = start + 3;
                Object.keys(this.selectedSurvey).length === 0 ? this.selectedSurvey = (this.solution.surveys.slice(start, end))[0] : false;
            return this.solution.surveys.slice(start, end);
        },
        clientsPageCount() {
            let l = this.getTotalOtherValidations(this.selectedSurvey),
                s = 4;
            return Math.ceil(l/s);
        },
        currentClients() {
            const start = this.pageNumberClient * 4,
                end = start + 4;
            const data = (this.selectedSurvey.extraOptions.map((option, index) => {
                option._index = index
                return option
            })).slice(start, end)
            return data
        }
    },        
    data() {
        return {
            oldSelectedSurvey: null,
            showExtraClients: false,
            optionSelected: null,
            showResultModal: false,
            getTotalValidationsInOption: 0,
            checkBoxToShow: [],
            optionIndexSelected: 0,
            showValidationsMobileClients: false,
            optionActive: false,
            surveys: [],
            extra: [],
            newOptions: [],
            selectedValidationsClientsList: [],
            indexToRemove: null,
            dialog: false,
            extraOp: [],
            showValidationsOtherClients: false,
            loadingCheckboxes: false,
            showValidationsClients: false,
            showClientsExtraOptions: true,
            activeItemAnalysis: 'analysis',
            pageNumber: 0,
            pageNumberClient: 0,
            notNext: true,
            selectedSurvey: '',
            colorsMdArray: [
                ["#ffebee","#fce4ec","#f3e5f5","#ede7f6","#e8eaf6","#e3f2fd","#e1f5fe","#e0f7fa","#e0f2f1","#e8f5e9","#f1f8e9","#f9fbe7","#fffde7","#fff8e1","#fff3e0","#fbe9e7","#efebe9","#fafafa","#eceff1"],
                ["#ffcdd2","#f8bbd0","#e1bee7","#d1c4e9","#c5cae9","#bbdefb","#b3e5fc","#b2ebf2","#b2dfdb","#c8e6c9","#dcedc8","#f0f4c3","#fff9c4","#ffecb3","#ffe0b2","#ffccbc","#d7ccc8","#f5f5f5","#cfd8dc"],
                ["#ef9a9a","#f48fb1","#ce93d8","#b39ddb","#9fa8da","#90caf9","#81d4fa","#80deea","#80cbc4","#a5d6a7","#c5e1a5","#e6ee9c","#fff59d","#ffe082","#ffcc80","#ffab91","#bcaaa4","#eeeeee","#b0bec5"],
                ["#e57373","#f06292","#ba68c8","#9575cd","#7986cb","#64b5f6","#4fc3f7","#4dd0e1","#4db6ac","#81c784","#aed581","#dce775","#fff176","#ffd54f","#ffb74d","#ff8a65","#a1887f","#e0e0e0","#90a4ae"],
                ["#ef5350","#ec407a","#ab47bc","#7e57c2","#5c6bc0","#42a5f5","#29b6f6","#26c6da","#26a69a","#66bb6a","#9ccc65","#d4e157","#ffee58","#ffca28","#ffa726","#ff7043","#8d6e63","#bdbdbd","#78909c"],
                ["#f44336","#e91e63","#9c27b0","#673ab7","#3f51b5","#2196f3","#03a9f4","#00bcd4","#009688","#4caf50","#8bc34a","#cddc39","#ffeb3b","#ffc107","#ff9800","#ff5722","#795548","#9e9e9e","#607d8b"],
                ["#e53935","#d81b60","#8e24aa","#5e35b1","#3949ab","#1e88e5","#039be5","#00acc1","#00897b","#43a047","#7cb342","#c0ca33","#fdd835","#ffb300","#fb8c00","#f4511e","#6d4c41","#757575","#546e7a"],
                ["#d32f2f","#c2185b","#7b1fa2","#512da8","#303f9f","#1976d2","#0288d1","#0097a7","#00796b","#388e3c","#689f38","#afb42b","#fbc02d","#ffa000","#f57c00","#e64a19","#5d4037","#616161","#455a64"],
                ["#c62828","#ad1457","#6a1b9a","#4527a0","#283593","#1565c0","#0277bd","#00838f","#00695c","#2e7d32","#558b2f","#9e9d24","#f9a825","#ff8f00","#ef6c00","#d84315","#4e342e","#424242","#37474f"],
                ["#b71c1c","#880e4f","#4a148c","#311b92","#1a237e","#0d47a1","#01579b","#006064","#004d40","#1b5e20","#33691e","#827717","#f57f17","#ff6f00","#e65100","#bf360c","#3e2723","#424242","#37474f"],
                ["#ff8a80","#ff80ab","#ea80fc","#b388ff","#8c9eff","#82b1ff","#80d8ff","#84ffff","#a7ffeb","#b9f6ca","#ccff90","#f4ff81","#ffff8d","#ffe57f","#ffd180","#ff9e80","#424242","#37474f","#ff6d00"],
                ["#ff5252","#ff4081","#e040fb","#7c4dff","#536dfe","#448aff","#40c4ff","#18ffff","#64ffda","#69f0ae","#b2ff59","#eeff41","#ffff00","#ffd740","#ffab40","#ff6e40","#424242","#37474f","#ff6d00"],
                ["#ff1744","#f50057","#d500f9","#651fff","#3d5afe","#2979ff","#00b0ff","#00e5ff","#1de9b6","#00e676","#76ff03","#c6ff00","#ffea00","#ffc400","#ff9100","#ff3d00","#424242","#37474f","#ff6d00"],
                ["#d50000","#c51162","#aa00ff","#6200ea","#304ffe","#2962ff","#0091ea","#00b8d4","#00bfa5","#00c853","#64dd17","#aeea00","#ffd600","#ffab00","#ff6d00","#dd2c00","#424242","#37474f","#ff6d00"]
            ],
        }
    },
    methods: {
        changeOption(option, index) {
            let p = {...option};
            p.active = p.active ? false : true;
            this.newOptions.push({index, option: p});
        },    
        changeOption2(option, i) {
            console.log(this.surveys)
            this.selectedSurvey.options[i].active = false
            this.changeOptionStatus(this.selectedSurvey)
            this.optionActive = true
            this.optionActive = false
        },    
        changeOptionE(option, index) {
            let p = {...option};
            p.active = p.active ? false : true;
            this.extra.push({index, option: p});
            // console.log(this.extra)
            // this.surveys[index].extraOptions[i].active = true
            // this.optionActive = true
            // this.optionActive = false
        },    
        changeOption2E(option, i) {
            console.log(option)
            console.log(i)
            // console.log(this.surveys[index])
            // console.log(this.surveys[index].extraOptions[i])
            this.selectedSurvey.extraOptions[i].active = false
            this.changeOptionStatus(this.selectedSurvey)
            this.optionActive = true
            this.optionActive = false
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
        dispatchShowModal(type) {
            type === 1 ? 
            this.showValidationsClients = true :
            this.showValidationsOtherClients = true;
        },
        next() {
            this.pageNumber++;
        },
        prev() {
            this.pageNumber--;
        },
        nextClient() {
            this.pageNumberClient++;
        },
        prevClient() {
            this.pageNumberClient--;
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
        getHappyClients (survey) {
            let validations = []
            survey.options.forEach(option => {
                option.validations.forEach(validation => {
                    validations.push(validation)
                })
            })
            return (this.checkDuplicateInObject('id', validations)).length
        },   
        selectSurvey(survey) {
            this.selectedSurvey = survey
        },
        getTotalOtherValidations(survey) {
            let total = 0;
            survey.extraOptions.forEach(option => {
                total = total + option.validations.length
            })
            // console.log('total others validations', total);
            return total;
        },
        publishSurvey(survey, active, index) {
            let p = {...survey};
            this.newOptions.forEach(option => {
                p.options[option.index] = {...option.option}
                p.options[option.index].active = option.active ? false : true;
            });
            // console.log('p1', p)
            this.extra.forEach(option => {
                // console.log('option', option)
                // console.log(p.extraOptions[option.index])
                // p.extraOptions[option.index] = option.option
                p.extraOptions[option.index].active = option.option.active
            });
            // console.log('p2', p)
            survey.options.every(option => !option.active) ? survey.active = false : survey.active = true;
            this.$emit('dispatchEditSurvey', {survey: p});
            this.surveys[index] = p
            this.newOptions = []
            this.extra = []
            this.surveys = this.solution.surveys
            this.activeItemAnalysis = 'analysis'
            this.activeItemAnalysis = (Math.random()).toString()
        },
        changeOptionStatus(survey) {
            this.$emit('dispatchEditSurvey', {survey: survey});
        },
        removeOption(survey, index, type) {
            type === 0 ? survey.options.splice(index, 1) : survey.extraOptions.splice(index, 1);
            this.$emit('dispatchEditSurvey', {survey: survey});
        },
        removeClients(survey, surveyOptionIndex, validationIndex, type) {
            if(type === 0) {
                survey.options[surveyOptionIndex].validations.splice(validationIndex, 1);
                this.$emit('dispatchEditSurvey', {survey: survey});
            } else {
                survey.extraOptions.splice(validationIndex, 1)
                this.$emit('dispatchEditSurvey', {survey: survey});
            }
            // type === 0 ? survey.extraOptions.splice(index, 1) : survey.extraOptions.splice(index, 1);
            // this.$emit('dispatchEditSurvey', {survey: survey});
        },
        getTotalOptions(survey) {
            let validations = []
                survey.options.forEach(option => {
                option.validations.forEach(validation => {
                    validations.push(validation)
                })
            })
            return validations.length
        },
        checkUndefined(item) {
            typeof item === 'undefined' ? true : false
        }
    },
    mounted() {
                console.log("ANALYSIS!")
        if(this.$vuetify.breakpoint.smAndDown) {
            Object.keys(this.selectedSurvey).length === 0 ? this.selectedSurvey = this.solution.surveys[0] : false;
        }
    },
    beforeUpdate() {
        console.log("ANALYSIS!")
        let counter = 0
        this.solution.surveys.forEach(survey => {
            (survey.options.sort((a, b) => b.validations.length - a.validations.length)).forEach((option, index) => {
                if(!option.hasOwnProperty('perc')) {
                    option.perc = index === 0 ? 100 : ((100*option.validations.length)/survey.options[0].validations.length)
                }
            });
            survey.extraOptionPerc = ((100*(survey.extraOptions).length)/survey.options[0].validations.length)
        });
        this.surveys = this.solution.surveys
        this.$emit('dispatchEditSurvey', {survey: this.surveys[0]})
    },
}
</script>
<style>
.box {
    width: 1098px; 
    height: 100%; 
    background: white;
    border-bottom: 1px solid #cecece; 
    border-right: 1px solid #cecece;
    border-left: 1px solid #cecece;
    border-radius: 1px;
    -webkit-box-shadow: 0px 2px 8px -4px rgba(0,0,0,0.29); 
    -moz-box-shadow: 0px 2px 8px -4px rgba(0,0,0,0.29); 
    box-shadow: 0px 2px 8px -4px rgba(0,0,0,0.29);
}

.mobileBox {
    width: 100%; 
    height: 100%; 
    background: white;
    border-bottom: 1px solid #cecece; 
    border-right: 1px solid #cecece;
    border-left: 1px solid #cecece;
    border-radius: 1px;
    -webkit-box-shadow: 0px 2px 8px -4px rgba(0,0,0,0.29); 
    -moz-box-shadow: 0px 2px 8px -4px rgba(0,0,0,0.29); 
    box-shadow: 0px 2px 8px -4px rgba(0,0,0,0.29);
}

.activeItemAnalysis {
    border-bottom: 3px solid #2c747a;
    color: #2c747a;
}
.clientsBox:hover {
    -webkit-box-shadow: -1px -1px 16px -9px rgba(0,0,0,0.75);
    -moz-box-shadow: -1px -1px 16px -9px rgba(0,0,0,0.75);
    box-shadow: -1px -1px 16px -9px rgba(0,0,0,0.75);
    transform: scale(1.02)
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
    background: rgb(15, 58, 81);
    border-radius: 10px;
}

div.divWithCustomScroll::-webkit-scrollbar-thumb:hover {
    cursor: pointer;
}

/* The container */
.container {
  display: block;
  position: relative;
  padding: 0;
  padding-left: 20px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 13px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom radio button */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 14px;
  width: 14px;
  background-color: #eee;
  border: 1px solid grey;
  /* border-radius: 50%; */
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
  border: 1px solid grey
}

/* When the radio button is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #f2f6f9;
  border: 1px solid grey
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

.xs9Bg:hover {
    background: #ececec;
    cursor: pointer;
}

/* Style the indicator (dot/circle) */
.container .checkmark:after {
 	top: 3px;
	left: 3px;
	width: 6px;
	height: 6px;
	/* border-radius: 50%; */
	background: #2e7675;
}

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

