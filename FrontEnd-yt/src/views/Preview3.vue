<template>
  <div v-scroll="onScroll">
    <v-layout ref="topBar" column>

      <div style="display: flex; flex-direction: column; margin-top: 0px">

        <v-flex v-if="!getStatus.loading && currentUser.identifier === $route.params.identifier && !getCompanyData.published" xs12 :class="ats('text-xs-center pt-4 caption', '=', 'text-xs-center pt-4')" style="max-height: 110px; min-height: 110px; border-color: currentcolor currentcolor rgb(231, 236, 240); border-style: none none solid; border-width: medium medium 2px;">
            <div class="my-1">
                <span :class="ats('', '', 'subheading')">Edita tu Perfil Yes Them. Una vez esté listo, publicalo.</span>
            </div>
            <v-btn :to="'/'+currentUser.identifier+'/edit/about'" depressed :disabled="getStatus.loading" :loading="getStatus.loading" color="dark_blue_button" :class="ats('font-weight-bold white--text mx-1 squared', '=', 'font-weight-bold white--text mx-3 squared')">Edita tu Perfil Yes Them</v-btn>
        </v-flex>
    
        <div v-if="isLoad && $vuetify.breakpoint.smAndDown && mobileHome" class="stickyPosition" style="border-bottom: 1px solid #ececec; z-index: 99999; display: flex; align-items: center; height: 56px; background: #f7f7f7; width: 100%">
          <div @click="topSelectedMenu = 'home'; scrollToSurveys('topBar', false)" style="text-align: center; width: 100%"><span :style="`font-family: 'Roboto-medium'; font-size: 14px; color: ${topSelectedMenu == 'home' ? 'blue' : 'black'}`">Inicio</span></div>
          <div @click="topSelectedMenu = 'stad'; scrollToSurveys('stad', false)" style="text-align: center;width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;border-left: 2px solid #eaeaea;border-right: 2px solid #eaeaea;"><span :style="`font-family: 'Roboto-medium'; font-size: 14px; color: ${topSelectedMenu == 'stad' ? 'blue' : 'black'}`">Estadisticas</span></div>
          <div @click="topSelectedMenu = 'data'; scrollToSurveys('optionData', false)" style="text-align: center; width: 100%"><span :style="`font-family: 'Roboto-medium'; font-size: 14px; color: ${topSelectedMenu == 'data' ? 'blue' : 'black'}`">Datos clave</span></div>
        </div>

        <v-flex ref="principalDiv" xs12 :style="isMobile ? 'margin-bottom: 3px;' : ''" v-if="getCompanyData === null ? false : (getCompanyData.published ? true : (currentUser.identifier === $route.params.identifier ? true : false))">

            <v-layout  align-center justify-center column fill-height v-if="$vuetify.breakpoint.smAndDown && !showContactView && mobileHome" :class="$vuetify.breakpoint.smAndDown ? '' : '' " :style="ats('height: 100%; background: white', '=', 'background-color: rgb(234, 236, 240);')">
                <HeaderBoxMobile 
                  :isMobile="isMobile" 
                  :service="transformString(_solution.category)"
                  :getCompanyData="getCompanyData"
                  :getAllClients="getAllClients().length"
                  :allStad="getAllStad()"
                  :allValidations="getAllValidations()"
                  :solutionIdentifier="_solution.identifier"
                  @dispatchActiveSlideUpToDown="activeSlideUpToDown = true"
                  @dispatchContactClick="contact.dialog.show = true" >
                </HeaderBoxMobile>
            </v-layout>

            <v-layout v-if="!$vuetify.breakpoint.smAndDown && !showService && type == 0 && !showClients" justify-center align-center column :class="$vuetify.breakpoint.smAndDown ? 'px-3 pb-3' : 'px-4'" style="margin-bottom: 0px">
              <!-- <HeaderBox 
                :allStad="getAllStad()"
                :allValidations="getAllValidations()"
                :getAllClients="getAllClients()"
                :isMobile="isMobile" 
                :clients="clientsToHeader"
                :uniqueCompanies="uniqueCompanies"
                :uniqueIndustries="uniqueIndustries"
                :getCompanyData="getCompanyData"
                @goToService="showClients = false; clickToActiveItem2($event.identifier, $event.category)"
                @dispatchContactClick="contact.dialog.show = true">
              </HeaderBox> -->
              <div v-if="all" style="width: 1258px;padding: 0 25px 25px 25px;background: rgb(250, 250, 250);border-left: 1px solid #ccc;border-top: 1px solid #ccc;border-right: 1px solid #ccc;">
                <div style="width: 1204px;text-align: left;margin-bottom: 151px;margin-top: 8px; display: flex; flex-direction: column">
                    <span style="font-size: 12px; font-family: 'Roboto-regular'; color: #666666">{{getCompanyData.name}} > Estadisticas Validadas por Clientes</span>
                    <div :style="`width: 1204px; height: 275px; margin-top: 10px; display: flex; justify-content: center; align-items: flex-start; background-image: url(/static/images/uploads/${getCompanyData.coverImage}?${getCompanyData.coverImage.toString(36).substr(2, 9)}; background-size: cover; background-position: center; background-repeat: no-repeat; padding: 0;`">
                        <div style="width: 950px; background: transparent; margin-top: 112px; display: flex; flex-direction: column;">
                            <div style="width: 100%;height: 162px;background-color: rgba(249, 249, 249, 0.93);padding: 17px 27px 30px;border-top-right-radius: 5px;border-top-left-radius: 5px;display: flex;flex-direction: row;align-items: flex-start;-webkit-box-shadow: 0px 0px 10px 0px rgba(224,224,224,0.91); box-shadow: 0px 0px 10px 0px rgba(224,224,224,0.91);">
                                <div style="display: flex; flex-direction: row; align-items: flex-start; width: 415px">
                                    <div>
                                        <div v-if="getCompanyData.logo" :style="`background-image: url(/static/images/uploads/${getCompanyData.logo}##${Math.random().toString(36).substring(7)}); margin-top: 0px; background-size: cover; border-radius: 0px; background-position: center; background-repeat: no-repeat; width: 130px !important; height: 130px !important;`"></div>
                                    </div>
                                    <div style="width: 500px; display: flex; flex-direction: column; margin-left: 10px; margin-top: -8px; text-align: left;">
                                        <!-- <v-tooltip z-index="230" right max-width="200px" style="margin-left: 10px">
                                          <span slot="activator" style="font-size: 24px; color: #333333; font-family: 'Roboto-bold'">
                                              {{getCompanyData.name}} <span style="cursor: pointer; font-size: 18px; font-family: 'Roboto-regular'">(<span style="color: #225bbc;">{{getAllValidations()}} <img src="/static/images/header/header3.png" style="width: 14px; height: 14px; margin-left: 3px" alt="icon header validations"> </span>)</span>
                                          </span>
                                          <span>Número de validaciones totales de clientes recibidas</span>
                                        </v-tooltip> -->
                                        <span slot="activator" style="font-size: 24px; color: #333333; font-family: 'Roboto-bold'; margin-left: 10px">
                                          {{getCompanyData.name}}
                                        </span>
                                        <span style="font-size: 16px; color: #777777; font-family: 'Roboto-regular'; margin-left: 10px">Estadísticas Validadas por Clientes</span>
                                        <div style="display: flex; align-items: center; margin-top: 12px; margin-left: 10px;">
                                            <div v-if="clientsToHeader.clients.length > 0" style="margin-left: 15px; display: flex; margin-left: 15px; color: #333333">
                                                <v-avatar :size="30" v-for="(client, index) in clientsToHeader.clients" :key="index" style="margin-left: -15px !important">
                                                    <img
                                                        :src="`${Number.isInteger(parseInt(client.pictureUrl.split('.')[0])) ? '/static/images/faces/' : client.pictureUrl.includes('http') ? '' : '/'}${client.pictureUrl}`"
                                                        :style="`border: 1px solid #e3e3e3;`"
                                                    />
                                                </v-avatar>
                                            </div>
                                            <div style="color: #333333;text-align: left;width: 219px;margin-left: 6px;">
                                                <span style="font-family: 'Roboto-regular'; font-size: 13px; color: #0654ba;">
                                                  {{getAllClients().length}} clientes han validado, una o varias, opciones de las estadisticas
                                                </span>
                                                <!-- <span style="font-family: 'Roboto-regular'; font-size: 14px; color: #333333">Empleados de <span v-if="companies.length > 0">{{companies[0]}}</span><span v-if="companies.length > 1">, {{companies[1]}}</span> <span v-if="companies.length>2"> y {{getAllClients-2}} empresas <br/>más</span> han validado estadísticas de {{getCompanyData.name}}</span> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style="width: 50px"></div>
                                <div style="text-align: left; margin-top: 57px; width: 370px;">
                                    <span style="width: 100%; font-size: 15px;font-family:'Roboto-regular'; color: #333333; margin-bottom: 12px;">
                                        Estadisticas validadas por clientes sobre la actividad de {{getCompanyData.description.substring(0,35)}} desarrollada por {{getCompanyData.name}}
                                    </span>
                                </div>
                                <div style="width: 80px; cursor: pointer">
                                    <span style="color: #0654ba; display: flex; align-items: center; font-size: 12">
                                      <img src="/static/images/header/headercontact.png" alt="contact yesthem stadistic" /> Contacto
                                    </span>
                                </div>
                            </div>
                            <div style="width: 100%;height: 158px;background: white;display: flex;flex-direction: column;padding: 10px 27px 30px 27px;align-items: center;-webkit-box-shadow: 0px 0px 10px 0px rgba(224,224,224,0.91); box-shadow: 0px 0px 10px 0px rgba(224,224,224,0.91);border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;">
                                <div style="display: flex;align-items: center; margin-bottom: 3px; width: 100%; justify-content: space-between">
                                    <div style="width: 214px; display: flex; align-items: center; justify-content:space-between; margin-top: -4px">
                                        <span style="font-family: 'Roboto-bold'; font-size: 12px; color: #555555">Estadísticas {{getCompanyData.name}}</span>
                                        <div v-if="this.getCompanyData.solutions.filter(({ active }) => active).length > 4" style="display: flex; margin-left: 16px;">
                                            <v-icon @click="pageNumberStad == 0 ? false : prev()" center style="color: #999999; font-size: 12px; margin-right: 5px">fas fa-chevron-left</v-icon>
                                            <v-icon @click="pageNumberStad >= stadPageCount  ? false : next()" center style="color: #696969; font-size: 12px; margin-left: 5px">fas fa-chevron-right</v-icon>
                                            <!-- <span :style="`font-size: 16px; margin-right: 50px; cursor: pointer; color: ${pageNumber==0 ? '#999999' : 'black'}`" @click="pageNumber==0 ? false : prev()"><v-icon center style="color: #999999; font-size: 16px; margin-right: 10px">fas fa-chevron-left</v-icon>Anterior</span>
                                            <span :style="`font-size: 16px; cursor: pointer; color:  ${pageNumber >= pageCount -1 ? '#999999' : 'black'}`" @click="pageNumber >= pageCount -1 ? false : next()">Siguiente<v-icon center style="color: #999999; font-size: 16px; margin-left: 10px">fas fa-chevron-right</v-icon></span> -->
                                        </div>
                                    </div>
                                    <div style="margin-top: -10px;">
                                        <span v-if="getMostPopularOptions()[selectedOption].solutionName.length < 22" style="color: #0654ba; font-family: 'Roboto-regular'; font-size: 12px">
                                          {{getMostPopularOptions()[selectedOption].solutionName}}
                                        </span>
                                        <span v-if="getMostPopularOptions()[selectedOption].solutionName.length > 22" style="color: #0654ba; font-family: 'Roboto-regular'; font-size: 12px">
                                          {{getMostPopularOptions()[selectedOption].solutionName.substring(0, 18)}}...
                                        </span>
                                    </div>
                                </div>
                                
                                <div style="display: flex; align-items: center; width: 100%">
                                    <div style="display: flex; flex-direction: column; width: 200px; height: 118px;margin-left: -6px; padding-top: 7px">
                                      <div v-for="(item, index) in currentStads" :key="index" style="display: flex; align-items: center; height: 24px">
                                        <img src="/static/images/header/headerestadserv.png" alt="stadistic" style=""/>
                                        <span style="color: #333333; font-size: 13px; margin: 0 10px 0 10px; ">{{item.surveys.length}}</span>
                                        <span v-if="item.category.length > 19" style="font-family: 'Roboto-regular'; color: #777777; font-size: 13px;">{{transformString(item.category).substring(0, 18)}}...</span>
                                        <span v-if="item.category.length < 20" style="font-family: 'Roboto-regular'; color: #777777; font-size: 13px;">{{transformString(item.category)}}</span>
                                      </div>
                                    </div>

                                    <div style="width: 28px"></div>
                                    
                                    <div style="display: flex;margin-top: -12px;padding: 0 30px 0 30px;border-left: 1px solid #ececec;justify-content: center;align-items: center;flex-direction: column;border-right: 1px solid #ececec;">
                                        <div style="display: flex; align-items: center;">

                                            <div class="boxScale" v-tooltip.bottom="'Número total de estadísticas publicadas. Cada estadística se ha ocupado de la recolección, agrupación, presentación y análisis de datos. Estos datos tratan sobre la experiencia de clientes con los productos o servicios que contrato.'">
                                              <div style="display: flex; align-items: flex-start; flex-direction: column">
                                                  <div style="display: flex; flex-direction: row; align-items: center">
                                                      <img src="/static/images/header/headerestad.png" style="margin-right: 8px" alt="icon header stadistics">
                                                      <span style="font-family: 'Roboto-medium'; font-size: 14px; color: #777777">{{getAllStad()}}</span>
                                                  </div>
                                                  <span style="font-family: 'Roboto-regular'; font-size: 13px; color: #777777">Estadísticas</span>
                                              </div>
                                            </div>


                                            <div class="boxScale" v-tooltip.bottom="`La metodología seguida para la recolección de datos ha sido la encuesta. Un total de ${getAllClients()} clientes han dado su opinión validando opciones de respuesta o escribiendo la suya propia.`">
                                              <div style="display: flex; align-items: flex-start;flex-direction: column; margin-left: 30px; margin-right: 30px; width: 134px">
                                                  <div style="display: flex; flex-direction: row; align-items: center;">
                                                      <img src="/static/images/header/headerclient.png" style="margin-right: 8px" alt="icon header clients">
                                                      <span style="font-family: 'Roboto-medium'; font-size: 14px; color: #777777">{{getAllClients().length}}</span>
                                                  </div>
                                                  <span style="font-family: 'Roboto-regular'; font-size: 13px; color: #777777">Clientes encuestados</span>
                                              </div>                    
                                            </div>

                                            <div class="boxScale" v-tooltip.bottom="'Se ha solicitado a los clientes dar su opinión en forma de validación. Se busca así demostrar que las estadísticas son válidas para el propósito que buscan. Las validaciones se reparten de una manera no proporcional en todas las estadísticas publicadas.'" >
                                              <div style="display: flex; align-items: flex-start; flex-direction: column">
                                                  <div style="display: flex; flex-direction: row; align-items: center;">
                                                      <img src="/static/images/header/headervalid.png" style="margin-right: 8px" alt="icon header validations">
                                                      <span style="font-family: 'Roboto-medium'; font-size: 14px; color: #777777">{{getAllValidations()}}</span>
                                                  </div>
                                                  <span style="font-family: 'Roboto-regular'; font-size: 13px; color: #777777">Validaciones</span>
                                              </div>                    
                                            </div>

                                        </div>
                                        <div style="margin-top: 25px;">
                                            <span style="color: #767676; font-family: 'Roboto-regular'; font-size: 11px;">Datos de {{getCompanyData.name}}</span>
                                        </div>
                                    </div>


                                    <div style="display: flex; flex-direction: column; text-align: left; padding-left: 30px; margin-top: -8px">
                                        <div style="width: 198px; height: 45px;">
                                            <span v-if="getMostPopularOptions()[selectedOption].optionDescription.length < 70" style="color: #555555; font-size: 13px;">{{getMostPopularOptions()[selectedOption].optionDescription}}</span>
                                            <span v-if="getMostPopularOptions()[selectedOption].optionDescription.length > 70" style="color: #555555; font-size: 13px;">{{getMostPopularOptions()[selectedOption].optionDescription.substring(0,62)}}...</span>
                                        </div>
                                        <div>
                                            <span style="color: #777777; font-family: 'Roboto-regular'; font-size: 12px">Validaciones de clientes: {{getMostPopularOptions()[selectedOption].validations.length}}</span>
                                        </div>
                                        <div style="width: 100%; display: flex; cursor: pointer; margin-top: 22px; justify-content: center; align-items: center">
                                            <div v-for="(item, index) in getMostPopularOptions()" :key="index" @click="changeSelectedOption(index)" :style="`width: 9px; height: 9px; background: ${selectedOption == index ? '#3898e9' : 'gray'}; border-radius: 50%; margin: 0 5px 0 5px`"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
              <!-- <div style="width: 1258px; display: flex; margin-top: 2px; justify-content: flex-end;">
                <span style="font-size: 12px; font-family: 'Roboto-regular'; color: #333333; display: flex; align-items: center">
                  <span style="font-family: 'Roboto-medium'; margin-right: 4px;">{{getCompanyData.industry}}</span>  | <img src="/static/images/header/pin.png" style="margin: 0 3px 0 2px" alt="Pin Country" /> {{getCompanyData.country}}
                </span>
              </div> -->
            </v-layout>
        </v-flex>

        <!-- <span style="font-size: 50px; font-weight: bold">{{getStatus.loading}}</span> -->

        <div v-if="$vuetify.breakpoint.smAndDown && showContactView">
          <SurveyContactMobile
            :companyName="getCompanyData.name"
            :companyLogo="getCompanyData.logo"
            :solutions="getCategoriesAndLogo"
            :email="email"
            :getCompanyData="getCompanyData"
            @dispatchCloseContact="showContactView = false; showService = true; scrollTop(false)"
          />                          
        </div>

        <MobileSurveyCard
          v-if="isLoad && $vuetify.breakpoint.smAndDown && !showService && !showContactView && !mobileHome"
          :showClients="showClients"
          :getCompanyData="getCompanyData"
          :selectedSurvey="selectedSurveyToShow"
          :name="getCompanyData.name"
          :solution="_solution"
          :allClientsFilter="allClientsFilter"
          @dispatchSurvey='selectedSurveyToShow = $event'
          @dispatchContactBox="dispatchContactBox($event)"
          @goToPreview="showService = true"
          @goToService="changeRoute(_solution.category); clientsToShow = getCompanyData.solutions.slice(0,9); type = 0; showService = true; all = false; showClients = false;"
        />

        <v-flex ref="stad" xs12 v-if="$vuetify.breakpoint.smAndDown && mobileHome && !showContactView" style="margin-top: 10px;">
          <div style="display: flex; flex-direction: column; padding: 30px 15px 15px 15px;">
            <div>
              <div style="margin-top: 0px; text-align: left">
                <span style="color: #333333; font-size: 22px; font-family: 'Roboto-regular';">Estadisticas Validadas</span>
              </div>

              <div style="border: 0.7px solid #cecece; width: 90px; margin: 15px 0 20px 0"></div>

              <div style="width: 310px; margin-bottom: 15px; text-align: left">
                <span style="color: #636363; font-family: 'Roboto-regular'; font-size: 15px">
                  En los siguientes {{getCompanyData.solutions.filter(({active}) => active).length}} encontraras las {{getAllStad()}} estadisticas mas importantes sobre "{{getCompanyData.name}}"
                </span>
              </div>
            </div>

            <div style="width: 100%; height: 100%; background: white; margin-top: 15px; text-align: left; box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 4px; border: 1px solid rgb(230, 230, 230); border-radius: 5px; ">
                <!-- <span style="color: #333333; font-size: 14px; font-family: 'Helvetica-regular'">{{getCompanyData.name}}</span> -->
                <!-- <br />  -->
                <div style="margin-top: 5px; margin-bottom: 5px; border-bottom: 1px solid #ececec; padding: 10px 16px">
                    <span style="color: #333333; font-family: 'Roboto-bold'; font-size: 14px;">Estadisticas {{getCompanyData.name}}</span>
                </div>
                <div :class="getCompanyData.solutions.filter(({active}) => active).length > 5 ? 'divWithCustomScroll2' : ''" :style="`overflow-y: ${getCompanyData.solutions.filter(({active}) => active).length > 5 ? 'scroll' : 'hidden'}; height: ${getCompanyData.solutions.filter(({active}) => active).length > 5 ? '128px' : '100%'}; margin-bottom: 15px; margin-right: 5px; margin-top: 10px; width: 92%`">
                    <ul class="listTree" style="margin-left: 15px;">
                      <li 
                          v-for="(solution, index) in getCompanyData.solutions.filter(({ active }) => active)" 
                          :key="index"
                          class="tree"
                          @click="clickToActiveItem2(getCompanyData.identifier, solution.category)"
                          style="cursor: pointer; margin-bottom: 5px; display: flex; align-items: center; justify-content: space-between"
                      >
                        <span style="color: #5fb4f7; font-size: 14px; font-family: 'Roboto-regular'">{{transformString(solution.category)}}</span>
                        <div style="background: #f3f7fe; border: 1px solid #ececec;min-width: 25px; border-radius: 3px; display: flex; align-items: center; justify-content: center">
                          <span style="font-size: 15px; color: #0e2741">{{solution.surveys.length}}</span>
                        </div>
                      </li>   
                    </ul>
                </div>                
            </div>
          </div>
          <div v-if="isLoad && $vuetify.breakpoint.smAndDown && mobileHome" style="display: flex;flex-direction: column;justify-content: center;align-items: center; padding: 0px; border-bottom: 0.6px solid #ececec">
              <ServiceCardSelectedMobile
                v-for="(iSolution, index) in getCompanyData.solutions.filter(({ active, surveys }) => active && surveys.length > 0)"
                :key="index"
                :email="email"
                :index="index"
                :open="index == 0"
                :menuOptions="getCategoriesAndLogo"
                :solution="iSolution" 
                :activeSolution="activeSolution"
                :getCompanyData="getCompanyData"
                :isMobile="$vuetify.breakpoint.smAndDown"
                @distpachNavigateToSurvey="scrollTop(); selectSurvey($event); mobileHome = false;"
                @dispatchSolution="clientsToShow = getCompanyData.solutions.slice(0,9); showClients = false; clickToActiveItem(getCompanyData.identifier, $event.solution); scrollToSolutionMobile()"
              />
          </div>
          <div v-if="isLoad && $vuetify.breakpoint.smAndDown && mobileHome" style="background: white; display: flex;flex-direction: column;justify-content: center;align-items: center; padding: 30px 15px 15px 15px; background: #f5f8fb; border-bottom: 0.6px solid #ececec">   
            <div style="display: flex; flex-direction: column; padding: 30px 0 0 0;">
              <div ref="optionData">
                <div style="margin-top: 0px; text-align: left">
                  <span style="color: #333333; font-size: 22px; font-family: 'Roboto-regular';">Datos clave</span>
                </div>

                <div style="border: 0.7px solid #cecece; width: 90px; margin: 15px 0 20px 0"></div>

                <div style="width: 310px; margin-bottom: 15px; text-align: left">
                  <span style="color: #636363; font-family: 'Roboto-regular'; font-size: 15px">
                    Los datos clave ofrecen un resumen sobre las estadisticas de"{{getCompanyData.name}}" y enlazan con la pagina de la estadistica correspondiente
                  </span>
                </div>
              </div>

              <PreviewOptionsBox
                v-for="(solution, index) in getCompanyData.solutions.filter(({ active }) => active)" :key="index" 
                :solution="solution"
                @distpachNavigateToSurvey="scrollTop(); selectSurvey($event); mobileHome = false;"
              >
            </div>
              
              <!-- <div style="width: 100%; text-align: left; margin-bottom: 32px">
                  <span style="color: #333333; font-family: 'Roboto-bold'; font-size: 14px;">CLIENTES ENCUESTADOS</span>
              </div>
              <div style="height: 100%; width: 100%">
                <div v-for="(solution, index) in clientsToShow" @click="changeRoute(solution.category, 'clientes-encuestados'); scrollTop(); mobileHome = false; showClients = true; isLoad = true; all = false; _solution = solution;" :key="index" style="width: 100%;height:82px;box-shadow: 0 1px 4px rgba(0,0,0,.1);border: 1px solid #e6e6e6;border-radius: 3px;cursor: pointer;background: white;padding: 15px 15px 15px 24px;display: flex;align-items: center; margin: 0 27px 15px 0">
                  <div style="margin-right: 16px;"><img src="/static/images/jpg1/clientMob.png" alt="stadistic" style="width: 40px"/></div>
                  <div><span :style="`font-size: 15px; color: #333333; font-family: 'Roboto-regular'`">{{transformString(solution.category)}}</span></div>
                  <!-- ${solution.category.toLowerCase().trim() == _solution.category.toLowerCase().trim() ? '#0b85e5' : '#333333'} -->
                  <!-- <div style="margin-top: 4px"><span style="font-size: 20px; color: #0b85e5; font-family: 'Roboto-light'">{{solution.surveys.length}} Estadisticas</span></div>
                </div>
              </div> -->
          </div>  
        </v-flex>

        <div v-if="showService && $vuetify.breakpoint.smAndDown && !mobileHome" style="width: 100%;height: 100%;margin-bottom: 4px;display: flex;justify-content: flex-start; flex-direction: column;">
          <div style="width: 100%; text-align: left; display: flex; align-items: flex-start; justify-content: center;">

            <div style="text-align: left; display: flex; flex-direction: column">
                <div style="padding:15px;">
                  <span style="font-family: 'Roboto-regular'; font-size: 14px; width: 100%">
                    <span @click="changeRoute(); type = 0; showService = false; all = true; scrollTop(); clientsToShow = getCompanyData.solutions.slice(0,9); mobileHome = true" style="color: #5fb4f7; cursor: pointer">
                      <span style="text-decoration: underline">{{getCompanyData.name}}</span> <span style="color: #333333"> > </span> <span style="text-decoration: underline">Estadísticas Validadas por Clientes</span> <span style="color: #333333"> > </span> 
                    </span>  
                    <span  style="font-size: 14px; color: #455f7c;">{{transformString(_solution.category)}}</span></span> 
                  <div style="margin-top: 12px; width: 100%">
                    <span style="color: #0f2741; font-size: 27px; font-family: 'Roboto-light';">{{transformString(_solution.category)}} - Estadisticas Validadas por Clientes</span>
                  </div>
                </div>
                <div class="stickyPosition" style="display: flex; align-items: center; width: 100%; background: white; z-index: 9; border-bottom: 1px solid #ececec;">
                  <div @click="scrollTo(1)" :style="`width: 100%; height: 45px; font-family: 'Roboto-regular'; font-size: 14px; font-weight: 500; color: ${selectedMenu == 'desc' ? '#0b82e0' : 'black'}; margin: 5px; border-radius: 3px; display: flex; justify-content: center; align-items: center; background-color: ${selectedMenu === 'desc' ? '#e6f3fc' : 'white'};`">
                    <span>Descripcion</span>
                  </div>
                  <div @click="scrollTo(2)" :style="`width: 100%; height: 45px; font-family: 'Roboto-regular'; font-size: 14px; font-weight: 500; color: ${selectedMenu == 'stad' ? '#0b82e0' : 'black'}; margin: 5px; border-radius: 3px; display: flex; justify-content: center; align-items: center; background-color: ${selectedMenu === 'stad' ? '#e6f3fc' : 'white'};`">
                    <span>Estadisticas</span>
                  </div>
                  <div @click="scrollTo(3)" :style="`width: 100%; height: 45px; font-family: 'Roboto-regular'; font-size: 14px; font-weight: 500; color: ${selectedMenu == 'clients' ? '#0b82e0' : 'black'}; margin: 5px; border-radius: 3px; display: flex; justify-content: center; align-items: center; background-color: ${selectedMenu === 'clients' ? '#e6f3fc' : 'white'};`">
                    <span>Clientes</span>
                  </div>  
                </div>

                <!-- <div ref="surveysItemsWrapperScroll" style="width: 100%;" class="scrolling-wrapper">
                  <div style="display: flex; flex-direction: row; box-sizing: border-box; min-width: 100%; height: 100%; padding: 0px 5px 5px 5px; float: left;">
                                                                  
                  </div>
                </div>  -->
              <div style="padding:15px;">
                <div style="width: 100%; height: 100%; margin-bottom: 19px; display: flex; flex-direction: column; margin-top: 15px">
                  <span style="font-size: 17px; color: #455f7c">Descripción</span>
                  <div style="border: 0.5px solid #ccc; width: 70px; margin: 13px 0px 13px"></div>
                  <span style="font-size: 16px; color: #455f7c;font-family: 'Roboto-regular';">{{_solution.description}}</span>
                </div>
                
                <div style="display: flex; flex-direction: column;">
                  <div class="boxScale" v-tooltip.bottom="'Número total de estadísticas publicadas. Cada estadística se ha ocupado de la recolección, agrupación, presentación y análisis de datos. Estos datos tratan sobre la experiencia de clientes con los productos o servicios que contrato.'" style="margin-right: 50px; cursor: pointer; transition: all 0.2s; width: 100%;border-radius: 5px;height: 79px;background: #3b5898;padding: 25px 15px 15px 15px;display: flex;">
                    <div style="width: 100%; display: flex;flex-direction: column;align-items: flex-start;justify-content: center;text-align: left;">
                        <span style="cursor: pointer;font-size: 13px;color: white;font-weight: bold;font-family: Roboto-bold;">ESTADISTICAS</span>
                        <div style="display: flex; flex-direction: row; align-items: center; justify-content: flex-start">
                            <img src="/static/images/jpg1/white_stad.png" alt="stadistic" style="width: 22px; height: auto;"/>
                            <span style="font-family: 'Roboto-bold'; color: white; font-size: 24px; margin-left: 15px">{{_solution.surveys.filter(({active}) => active).length}}</span>
                        </div>
                    </div>
                  </div>
                  <div class="boxScale" v-tooltip.bottom="`La metodología seguida para la recolección de datos ha sido la encuesta. Un total de ${getClientsBySolution(_solution).length} clientes han dado su opinión validando opciones de respuesta o escribiendo la suya propia.`" style="margin-right: 50px; cursor: pointer; transition: all 0.2s; width: 100%;border-radius: 5px;height: 79px;background: #0076b5;padding: 25px 15px 15px 15px;display: flex; margin: 11px 0 11px 0">
                    <div style="width: 100%; display: flex;flex-direction: column;align-items: flex-start;justify-content: center;text-align: left;">
                        <span style="cursor: pointer;font-size: 13px;color: white;font-weight: bold;font-family: Roboto-bold;">CLIENTES ENCUESTADOS</span>
                        <div style="display: flex; flex-direction: row; align-items: center; justify-content: flex-start">
                            <img src="/static/images/jpg1/white_clients.png" alt="stadistic" style="width: 22px; height: auto;"/>
                            <span style="font-family: 'Roboto-bold'; color: white; font-size: 24px; margin-left: 15px">{{getClientsBySolution(_solution).length}}</span>
                        </div>                    
                    </div>
                  </div>
                  <div class="boxScale" v-tooltip.bottom="'Se ha solicitado a los clientes dar su opinión en forma de validación. Se busca así demostrar que las estadísticas son válidas para el propósito que buscan. Las validaciones se reparten de una manera no proporcional en todas las estadísticas publicadas.'" style="margin-right: 50px; cursor: pointer; transition: all 0.2s; width: 100%;border-radius: 5px;height: 79px;background: #f35225;padding: 25px 15px 15px 15px;display: flex;">
                    <div style="width: 100%; display: flex;flex-direction: column;align-items: flex-start;justify-content: center;text-align: left;">
                        <span style="cursor: pointer;font-size: 13px;color: white;font-weight: bold;font-family: Roboto-bold;">VALIDACIONES DE CLIENTES</span>
                        <div style="display: flex; flex-direction: row; align-items: center; justify-content: flex-start">
                            <img src="/static/images/jpg1/white_validations.png" alt="stadistic" style="width: 22px; height: auto;"/>
                            <span style="font-family: 'Roboto-bold'; color: white; font-size: 24px; margin-left: 15px">{{getValidationsBySolution(_solution)}}</span>
                        </div>   
                    </div>
                  </div>
                </div>

                <div style="width: 100%; height: 100%; margin-bottom: 19px; display: flex; flex-direction: column; margin-top: 50px">
                  <span style="font-size: 27px; font-family: 'Roboto-light'; color: #0f2741">Estadisticas Validadas</span>
                  <div style="border: 0.5px solid #ccc; width: 70px; margin: 13px 0px 13px"></div>
                </div>

                <div :style="`min-width: 100%; width: 100%; height: 100%; -webkit-box-shadow: 0 1px 4px rgba(0,0,0,.1); box-shadow: 0 1px 4px rgba(0,0,0,.1); display: flex; flex-direction: column; -webkit-box-sizing: border-box; box-sizing: border-box; padding: 22px 24px 24px 22px; background-color: #fff; border: 1px solid #e6e6e6; border-radius: 3px; -webkit-transition: .3s box-shadow; -o-transition: .3s box-shadow; transition: .3s box-shadow;`">
                  <div style="margin-bottom: 10px;">
                    <span style="color: #0f2741; font-family: 'Roboto-bold'; font-size: 14px; text-transform: uppercase;">ESTADISTICAS {{_solution.category}}</span>
                  </div>
                  <div :class="_solution.surveys.filter(({active}) => active).length > 8 ? 'divWithCustomScroll2' : ''" :style="`margin-left: -13px; overflow-y: ${_solution.surveys.filter(({active}) => active).length > 8 ? 'scroll' : 'hidden'}; height: ${_solution.surveys.filter(({active}) => active).length > 8 ? '228px' : '100%'}; margin-right: 5px`">
                      <ul class="listTree" style="margin-left: 15px;">
                              <li 
                                  v-for="(survey, index) in _solution.surveys.filter(({active}) => active)"
                                  :key="index"
                                  class="tree"
                                  style="cursor: pointer"
                                  @click="scrollToSurveys(survey._id)"
                              >
                                  <span style="color: #5fb4f7; font-size: 16px; font-family: 'Roboto-regular'">{{survey.description}}</span>
                              </li>   
                      </ul>
                  </div>  
                </div>

                <ul style="padding-left: 0px; list-style: none; margin-bottom: 48px; margin-top: 20px">
                  <li v-for="(survey, index) in _solution.surveys.filter(({active}) => active)" :ref="`${survey._id}`" :key="index" @click="scrollTop(); selectSurvey(survey);" style="display: flex; flex-direction: column; padding: 10px 0px 10px 5px; cursor: pointer; width: 100%; border-radius: 3px;">
                      <div style="margin-bottom: 10px;">
                        <span style="color: #333333; font-family: 'Roboto-bold'; font-size: 14px; text-transform: uppercase">{{survey.description}}</span>
                      </div>
                      <div style="display: flex; align-items: center;">
                          <img src="/static/images/jpg1/stad_box.png" alt="stadistic" style="width: 24px; height: auto;"/>
                          <span style="margin-left: 7px; color: #455f7c; font-family: 'Roboto-regular';font-size: 15px">{{survey.question}}</span>
                      </div>
                      <!-- <div v-if="_solution.surveys.filter(({active}) => active).length-1 !== index" style="border: 0.5px solid #ccc; width: 90px; margin: 22px 0px 0"></div> -->
                  </li>
                </ul>

                <div style="width: 100%; height: 100%; margin-bottom: 18px; display: flex; flex-direction: column; margin-top: 0px">
                  <span style="font-size: 27px; font-family: 'Roboto-light'; color: #0f2741">Clientes encuestados</span>
                  <div style="border: 0.5px solid #ccc; width: 70px; margin: 13px 0px 13px"></div>
                </div>

                <div style="height: 100%;">
                  <div  @click="changeRoute(_solution.category, 'clientes-encuestados'); scrollTop(); showClients = true; isLoad = true; all = false; _solution = solution;" style="width: 100%;height:82px;box-shadow: 0 1px 4px rgba(0,0,0,.1);border: 1px solid #e6e6e6;border-radius: 3px;cursor: pointer;background: white;padding: 15px 15px 15px 24px;display: flex;align-items: center; margin: 0 27px 6px 0">
                    <div style="margin-right: 16px;"><img src="/static/images/jpg1/iconocajaclien.png" alt="stadistic" style="width: 42px; height: auto;"/></div>
                    <div><span :style="`font-size: 15px; color: #333333; font-family: 'Roboto-regular'`">{{transformString(_solution.category)}}</span></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div v-if="$vuetify.breakpoint.smAndDown && !showContactView" style="padding: 15px; background: white; border-top: 1px solid #ececec">
          <div :style="`padding: ${!isMobile ? '50px 0px 6px 30px' : '15px'}`">
            <div style="margin-bottom: 10px"><span style="font-size: 25px; color: #333333; font-family: 'Roboto-regular'">¿Alguna pregunta?</span></div>
            <span style="font-family: 'Roboto-regular'; font-size: 22px; color: #666666;">Contacta con {{getCompanyData.name}}</span>
          </div>
          <div @click="showService = false; showContactView = true; scrollTop(false)" style="width: 100%;height: 46px;display: flex;justify-content: center;border-radius: 3px;background: rgb(5, 116, 209);align-items: center;;">
            <span style="font-family: 'Roboto-regular; font-size: 17px; color: white">Contacto</span>
          </div>
        </div> 

        <v-flex xs12 v-if="!$vuetify.breakpoint.smAndDown">
          <v-layout row fill-height justify-center align-top v-if="getStatus.loading" style="background-color: #fafafa; min-height: 500px; padding-top: 116px; height: 1500px">
            <v-flex xs6 pa-5>
              <v-progress-circular indeterminate size="64" color="button"></v-progress-circular>
            </v-flex>
          </v-layout>
          <v-layout justify-center align-center column :class="$vuetify.breakpoint.smAndDown ? 'px-3 pb-3' : ''">
            <div :style="`width: ${showService ? '100%' : '1258px'}; height: 100%; background: #fafafa; border-bottom: 1px solid #cecece; border-right: 1px solid #cecece; border-left: 1px solid #cecece; padding: 30px 20px ${all ? '20px' : '80px'} 20px`">
              <v-layout row align-start justify-start v-if="getStatus.loading ? false : (!getCompanyData ? false : (getCompanyData.published ? true : (currentUser.identifier === $route.params.identifier ? true : false) ) )">
                <div style="display: flex;width: 100%;align-items: flex-start;justify-content: space-between;text-align: left;">

                  <div v-if="isLoad && all" style="display: flex;width: 100%;align-items: flex-start;justify-content: space-between;text-align: left;">

                    <div style="display: flex;width: 100%;align-items: flex-start;justify-content: space-between;text-align: left;flex-direction: column">
                      <div style="display: flex;align-items: center;justify-content: space-between;width: 100%;margin-bottom: 29px;">
                        <span style="font-size: 26px; font-family: 'Roboto-bold'; color: #252530">Estadísticas de {{getCompanyData.name}}</span>

                        <button type="button" style="width: 158px; height: 34px; border-radius: 5px; background: rgb(38, 144, 206); font-family: 'Roboto-bold'; font-size: 15px; color: white; outline: none" >Validar</button>
                      </div>


                      <div style="width: 100%;height: 100%;margin-bottom: 18px;border:1px solid rgb(204, 204, 204);padding: 20px 25px 25px 24px; display: flex; flex-direction: column; background: white;border-radius: 3px">
                          <div>
                            <span style="font-size: 16px; color: #111111; font-family: 'Roboto-regular'">Filtra las estadisticas validadas de {{getCompanyData.name}}</span>
                          </div>
                          <div style="height: 100%; width: 100%;margin-top: 15px; display:flex; align-items: flex-start; flex-wrap: wrap">
                              <div style="margin-bottom: 15px;width: 370px;border-right: 1px solid #ececec; height: 212px; display: flex; flex-direction: column; justify-content: flex-start; border-bottom: 1px solid rgb(236, 236, 236)">
                                  <div style="padding: 10px 10px 4px 11px; border-bottom: 2px solid rgb(245, 245, 247); width: 100%; display: flex; align-items: center; justify-content: space-between">
                                      <span style="font-family: 'Roboto-bold'; color: #111111; font-size: 14px">Estadisticas agrupadas</span>
                                  </div>
                                  <div style="display: flex; align-items: center; justify-content: space-between; padding: 2px 0 0 10px">
                                    <span style="font-size: 12px; font-family: 'Roboto-regular'; color: #666666;">Tema</span>
                                    <span style="font-size: 12px; font-family: 'Roboto-regular'; color: 949494;margin-right: 142px">Validaciones</span>
                                  </div>
                                  <div class="filterDiv" style="display: flex; align-items: flex-start; flex-direction: column; margin-top: 5px; overflow-y: scroll; height: 100%; padding-left: 10px">
                                      <div v-for="(solution, i) in getCompanyData.solutions.filter(({active}) => active)" :key="i" style="margin: 4px 0 4px 0;display: flex; align-items: center" @click="topicArray.some(mySolution => mySolution._id == solution._id) ? removeItemFromTopicArray(solution._id) : addItemToTopicArray(solution)">
                                          <img v-if="topicArray.filter(({ _id }) => _id == solution._id).length == 0" src="/static/images/checkbox.png" style="margin-right: 8px; cursor: pointer; width: 16px" alt="icon header stadistics">
                                          <img v-if="topicArray.filter(({ _id }) => _id == solution._id).length > 0" src="/static/images/checkbox_selected.png" style="margin-right: 8px; cursor: pointer; width: 16px" alt="icon header stadistics">
                                          <div style="width: 115px;">
                                              <span v-if="solution.category.length < 12" :style="`color: ${topicArray.filter(({ _id }) => _id == solution._id).length == 0 ? '$65656f' : '#111111'}; font-size: 14px; font-family: 'Roboto-regular'`">{{transformString(solution.category)}}</span>
                                              <span v-if="solution.category.length > 12" :style="`color: ${topicArray.filter(({ _id }) => _id == solution._id).length > 0 ? '$65656f' : '#111111'}; font-size: 14px; font-family: 'Roboto-regular'`">{{transformString(solution.category).substring(0,12)}}...</span>
                                          </div>
                                          <div style="margin-left: 12px; margin-right: 0px; width: 110px; height: 18px; background-color: #eff3f5">
                                            <div :style="`height: 18px; width: ${filterBar(solution)-5}%;  max-width: 98px; background: #3367d6;`"></div>
                                          </div>
                                          <div style="color: #333333; margin-left: 18px"><span>{{getValidationsBySolution(solution)}}</span></div>
                                      </div>
                                  </div>
                              </div>
                              <div v-for="(solution, i) in getCompanyData.solutions.filter(({ active }) => active).slice(0, pageNumberSolution)" :key="i" style="margin-bottom: 15px;width: 370px;height: 212px;display: flex;flex-direction: column;justify-content: flex-start; border-right: 1px solid rgb(236, 236, 236);border-bottom: 1px solid rgb(236, 236, 236);marign-top: 0px">
                                <div style="padding: 10px 10px 4px 24px; border-bottom: 2px solid rgb(245, 245, 247)">
                                  <span style="font-family: 'Roboto-bold'; color: #333333; font-size: 14px">{{transformString(solution.category)}}</span>
                                </div>
                                <!-- <div style="padding: 0px 10px 0px 24px;"><span style="font-size: 12px; color: gray;">{{transformString(solution.category)}}</span></div> -->
                                <div class="filterDiv" style="height: 150px; width: 100%;overflow-y: scroll; padding: 0px 10px 0px 22px">
                                  <div v-for="(survey, i) in solution.surveys.filter(({active}) => active)" :key="i" style="display: flex; align-items: flex-start; flex-direction: column; margin-top: 5px; height: 22px;">
                                    <div @click="surveysArray.some(mySurvey => mySurvey._id == survey._id) ? removeSurveyFromArray(survey._id) : addSurveyToArray(survey)" style="display: flex; align-items: center; margin-top: 5px;">
                                      <img v-if="surveysArray.filter(({ _id }) => _id == survey._id).length == 0" src="/static/images/checkbox.png" style="margin-right: 8px; cursor: pointer; width: 16px" alt="icon header stadistics">
                                      <img v-if="surveysArray.filter(({ _id }) => _id == survey._id).length > 0" src="/static/images/checkbox_selected.png" style="margin-right: 8px; cursor: pointer; width: 16px" alt="icon header stadistics">
                                      <div style="color: #333333"><span v-if="survey.description.length < 28">{{transformString(survey.description)}} ({{survey.options.filter(({ active }) => active).length}})</span><span v-if="survey.description.length > 28">{{transformString(survey.description).substring(0,24)}}... ({{survey.options.filter(({ active }) => active).length}})</span></div>
                                    </div>
                                  </div>
                                  <div v-if="solution.surveys.filter(({active}) => active).length == 0"><span>No hay estadisticas activas</span></div>
                                </div>
                              </div>
                          </div>
                          
                          <div style="display: flex;width: 100%;align-items: flex-end;justify-content: flex-end; padding-right: 50px;">
                            <div v-if="pageNumberSolution >=2 && pageNumberSolution <= getCompanyData.solutions.filter(({ active }) => active).length" @click="pageNumberSolution = pageNumberSolution+3" style="cursor: pointer; display: flex; align-items: center; justify-content: center; background: #f5f5f7; width: 132px; height: 40px; border: 1px solid #c6c6cc; border-radius: 4px; color: #5f5f67; font-size: 15px; padding: 8px; margin: 0 5px 0 5px">
                              <span style="font-family: 'Roboto-medium'">Mas Filtros</span>
                            </div> 
                            <div v-if="pageNumberSolution >= getCompanyData.solutions.filter(({ active }) => active).length" @click="pageNumberSolution = 2" style="cursor: pointer; display: flex; align-items: center; justify-content: center; background: #f5f5f7; width: 132px; height: 42px; border: 1px solid #c6c6cc; border-radius: 4px; color: #5f5f67; font-size: 15px; padding: 8px; margin: 0 5px 0 5px">
                              <span style="font-family: 'Roboto-medium'">Menos Filtros</span>
                            </div> 
                          </div>

                          <hr style="border: 0.5px solid rgb(236, 236, 236); margin: 25px 56px 25px 0px"/>

                          <div style="display: flex;align-items: flex-start;justify-content: space-between;min-height: 40px;padding-right:  0px;">
                            <div style="width: 996px; display: flex; align-items: center;flex-wrap: wrap;">
                              <span style="font-size: 16px; font-family: 'Roboto-regular'; color: #333333">Filtrado por: <span v-if="surveysArray.length == 0 && topicArray.length == 0">Ninguno</span></span>
                              <div v-for="(item, i) in topicArray" :key="i" style="display: flex; align-items: center; justify-content: space-between; background: #f5f5f7; height: 38px; border: 1px solid #c6c6cc; border-radius: 4px; color: #5f5f67; font-size: 15px; padding: 8px; margin: 6px 6px">
                                <!-- <span>{{item}}</span> -->
                                <span v-if="surveysArray.filter(({ solutionId }) => solutionId == item._id).length == 0" style="font-size: 14px; color: #31313c; font-family: 'Roboto-medium'">{{transformString(getCompanyData.solutions.filter(({_id}) => _id == item._id)[0].category)}}</span>
                                <span v-if="surveysArray.filter(({ solutionId }) => solutionId == item._id).length > 0" style="font-size: 14px; color: #31313c; font-family: 'Roboto-medium'">{{transformString(getCompanyData.solutions.filter(({_id}) => _id == item._id)[0].category).substring(0,12)}}... •</span>
                                <span v-for="(survey, j) in surveysArray.filter(({ solutionId }) => solutionId == item._id)" :key="j" style="margin: 0 3px 0 3px; font-size: 14px; color: #31313c; font-family: 'Roboto-medium'"><span v-if="j > 0">, </span>{{survey.description.substring(0,10)}}...</span>
                                <span @click="removeItemFromTopicArray(item._id)" style="cursor: pointer; margin: 0 5px;">
                                  <v-icon style="cursor: pointer; color: #31313c; font-size: 14px; margin-left: 5px">fas fa-times</v-icon>
                                </span>
                              </div>                                
                            </div>

                            <div @click="clearFilter()" style="margin-right: 55px">
                              <span style="font-size: 16px; font-family: 'Roboto-medium'; color: #106bf2; cursor: pointer">Limpiar filtros</span>
                            </div>
                          </div>
                      </div>
                      
                      <div style="display: flex; align-items: flex-start;">

                        <div style="display: flex; flex-direction: column">
                          <ClientCarousel 
                            :clients="getAllClients().slice(0, 25)"
                            :totalClients="getAllClients().length"
                          />
                          <div v-if="topicArray.length == 0 && surveysArray.length == 0 || topicArray.length > 0 && surveysArray.length == 0" style="width: 840px; height: 100%; margin-bottom: 40px; margin-top: 5px">
                              <!-- <span style="font-size: 15px;">filterByIndustry: {{filterByIndustry}}</span> -->
                              <PreviewBox2
                                v-for="(survey, j) in allSurveysArray" 
                                @dispatchSurveyView="isLoad = false; isLoad = true; all = false; selectedSurveyToShow = survey; _solution = $event" 
                                :key="j"
                                :filteringIsActive="filteringIsActive"
                                :all="true"
                                :solution="getCompanyData.solutions.filter(item => item._id == survey.solutionId)[0]"
                                :survey="survey"
                                :solutions="getCompanyData.solutions"
                                :uniqueCompanies="uniqueCompanies"
                                :uniqueIndustries="uniqueIndustries"
                                @distpachNavigateToSurvey="_solution = solution; scrollTop(); selectSurvey($event);"
                                @distpachNavigateToClients="_solution = solution; changeRoute(solution.category, 'clientes-encuestados'); scrollTop(); showClients = true; isLoad = true; all = false;"
                                >
                              </PreviewBox2>
                          </div>
                          <div v-if="surveysArray.length > 0" style="width: 840px; height: 100%; margin-bottom: 40px; margin-top: 5px" >
                              <PreviewBox2
                              v-for="(survey, j) in surveysArray" 
                              @dispatchSurveyView="isLoad = false; isLoad = true; all = false; selectedSurveyToShow = survey; _solution = $event"
                              :key="j"
                              :filteringIsActive="filteringIsActive"
                              :all="true"
                              :solution="getCompanyData.solutions.filter(item => item._id == survey.solutionId)[0]"
                              :survey="survey"
                              :solutions="getCompanyData.solutions"
                              :uniqueCompanies="uniqueCompanies"
                              :uniqueIndustries="uniqueIndustries"
                              @distpachNavigateToSurvey="_solution = solution; scrollTop(); selectSurvey($event);"
                              @distpachNavigateToClients="_solution = solution; changeRoute(solution.category, 'clientes-encuestados'); scrollTop(); showClients = true; isLoad = true; all = false;"
                              >
                              </PreviewBox2>
                          </div>
                        </div>
                        <div style="margin-left: 30px;display: flex;flex-direction: column;width: 345px;border-radius: 2px;">
                          <div style="margin-top: 0px; text-align: left; width: 100%; background: #fafafa; padding: 0px; border-bottom: 1px solid #ececec; display: flex; flex-direction: column">
                            <div style="padding: 10px 0px 18px; display: flex; align-items: center; justify-content: space-between">
                              <span style="color: #111111; font-size: 18px; font-family: 'Roboto-regular';">Validaciones Totales</span>
                            </div>
                          </div>

                          <div style="display: flex; flex-direction: column; margin-bottom: 25px">
                            <div style="display: flex; align-items: center; cursor: pointer">
                              <span @click="showIndustry = true" v-if="!showIndustry" style="margin-right: 15px">►</span>
                              <span @click="showIndustry = false" v-if="showIndustry" style="margin-right: 15px">▼</span>
                              <span style="font-size: 16px">Industrias</span>
                            </div>
                            <div v-if="showIndustry" style="display: flex; flex-direction: column">
                              <div v-for="(item, index) in showIndustryCat ? getFilteredItems('industry') : getFilteredItems('industry').slice(0,10)" :key="index" style="margin: 6px 0; display: flex; align-items: center">
                                  <img  @click="filterAction(item);" src="/static/images/newCheck.png" style="margin-right: 14px; cursor: pointer; width: 16px" alt="icon header stadistics">
                                  <img  v-if="filterValidationsKey.some(value => value.toLowerCase().trim() == item)" @click="filterAction(item);" src="/static/images/checkbox_selected.png" style="border: 1px solid #ccc; border-radius: 2px; margin-right: 14px; cursor: pointer; width: 16px" alt="icon header stadistics">
                                  <span style="color: #777777">{{ item }}</span>
                              </div>
                              <div v-if="uniqueIndustries.length > 10" @click="showIndustryCat = !showIndustryCat" style="color: blue; cursor: pointer">Mostrar {{uniqueIndustries.length - 10}} mas</div>
                            </div>
                          </div>    

                          <div style="display: flex; flex-direction: column; margin-bottom: 25px">
                            <div style="display: flex; align-items: center; cursor: pointer">
                              <span @click="showSize = true" v-if="!showSize" style="margin-right: 15px">►</span>
                              <span @click="showSize = false" v-if="showSize" style="margin-right: 15px">▼</span>
                              <span style="font-size: 16px">Tamaño de la empresa</span>
                            </div>
                            <div v-if="showSize" style="display: flex; flex-direction: column">
                              <div style="margin: 6px 0; display: flex; align-items: center">
                                  <img v-if="!filterValidationsKey.some(value => value.toLowerCase().trim() == 'big')" @click="filterAction('big')" src="/static/images/newCheck.png" style="margin-right: 14px; cursor: pointer; width: 16px" alt="icon header stadistics">
                                  <img v-if="filterValidationsKey.some(value => value.toLowerCase().trim() == 'big')" @click="filterAction('big')" src="/static/images/checkbox_selected.png" style="border: 1px solid #ccc; border-radius: 2px; margin-right: 14px; cursor: pointer; width: 16px" alt="icon header stadistics">
                                  <span style="color: #777777">Grande</span>
                              </div>
                              <div style="margin: 6px 0; display: flex; align-items: center">
                                  <img v-if="!filterValidationsKey.some(value => value.toLowerCase().trim() == 'medium')" @click="filterAction('medium')" src="/static/images/newCheck.png" style="margin-right: 14px; cursor: pointer; width: 16px" alt="icon header stadistics">
                                  <img v-if="filterValidationsKey.some(value => value.toLowerCase().trim() == 'medium')" @click="filterAction('medium')" src="/static/images/checkbox_selected.png" style="border: 1px solid #ccc; border-radius: 2px; margin-right: 14px; cursor: pointer; width: 16px" alt="icon header stadistics">
                                  <span style="color: #777777">Mediana</span>
                              </div>
                              <div style="margin: 6px 0; display: flex; align-items: center">
                                  <img v-if="!filterValidationsKey.some(value => value.toLowerCase().trim() == 'big')" @click="filterAction('big')" src="/static/images/newCheck.png" style="margin-right: 14px; cursor: pointer; width: 16px" alt="icon header stadistics">
                                  <img v-if="filterValidationsKey.some(value => value.toLowerCase().trim() == 'big')" @click="filterAction('big')" src="/static/images/checkbox_selected.png" style="border: 1px solid #ccc; border-radius: 2px; margin-right: 14px; cursor: pointer; width: 16px" alt="icon header stadistics">
                                  <span style="color: #777777">Pequeño</span>
                              </div>
                            </div>
                          </div>
                          
                          <div style="display: flex; flex-direction: column; margin-bottom: 25px">
                            <div style="display: flex; align-items: center; cursor: pointer">
                              <span @click="showPostion = true" v-if="!showPostion" style="margin-right: 15px">►</span>
                              <span @click="showPostion = false" v-if="showPostion" style="margin-right: 15px">▼</span>
                              <span style="font-size: 16px">Titulo Puesto</span>
                            </div>
                            <div v-if="showPostion" style="display: flex; flex-direction: column">
                              <div v-for="(item, index) in showPostionCat ? getFilteredItems('title') : getFilteredItems('title').slice(0,10)" :key="index" style="margin: 6px 0; display: flex; align-items: center">
                                  <img v-if="!filterValidationsKey.some(value => value.toLowerCase().trim() == item.toLowerCase().trim())" @click="filterAction(item)" src="/static/images/newCheck.png" style="margin-right: 14px; cursor: pointer; width: 16px" alt="icon header stadistics">
                                  <img v-if="filterValidationsKey.some(value => value.toLowerCase().trim() == item.toLowerCase().trim())" @click="filterAction(item)" src="/static/images/checkbox_selected.png" style="border: 1px solid #ccc; border-radius: 2px; margin-right: 14px; cursor: pointer; width: 16px" alt="icon header stadistics">
                                  <span style="color: #777777">{{ item }}</span>
                              </div>
                              <div v-if="uniquePositions.length > 10" @click="showPostionCat = !showPostionCat" style="color: blue; cursor: pointer">Mostrar {{uniquePositions.length - 10}} mas</div>
                            </div>
                          </div>

                          <div style="display: flex; flex-direction: column; margin-bottom: 25px">
                            <div style="display: flex; align-items: center; cursor: pointer">
                              <span @click="typePostion = true" v-if="!typePostion" style="margin-right: 15px">►</span>
                              <span @click="typePostion = false" v-if="typePostion" style="margin-right: 15px">▼</span>
                              <span style="font-size: 16px">Tipo de puesto</span>
                            </div>
                            <div v-if="typePostion" style="display: flex; flex-direction: column">
                              <div v-for="(item, index) in typePostionCat ? getFilteredItems('position') : getFilteredItems('position').slice(0,10)" :key="index" style="margin: 6px 0; display: flex; align-items: center">
                                  <img v-if="!filterValidationsKey.some(value => value.toLowerCase().trim() == item.toLowerCase().trim())" @click="filterAction(item)" src="/static/images/newCheck.png" style="margin-right: 14px; cursor: pointer; width: 16px" alt="icon header stadistics">
                                  <img v-if="filterValidationsKey.some(value => value.toLowerCase().trim() == item.toLowerCase().trim())" @click="filterAction(item)" src="/static/images/checkbox_selected.png" style="border: 1px solid #ccc; border-radius: 2px; margin-right: 14px; cursor: pointer; width: 16px" alt="icon header stadistics">
                                  <span style="color: #777777">{{ item }}</span>
                              </div>
                              <div v-if="uniquePositionType.length > 10" @click="typePostion = !typePostion" style="color: blue; cursor: pointer">Mostrar {{uniquePositionType.length - 10}} mas</div>
                            </div>
                          </div>

                          <div style="display: flex; flex-direction: column; margin-bottom: 25px">
                            <div style="display: flex; align-items: center; cursor: pointer">
                              <span @click="showDepartment = true" v-if="!showDepartment" style="margin-right: 15px">►</span>
                              <span @click="showDepartment = false" v-if="showDepartment" style="margin-right: 15px">▼</span>
                              <span style="font-size: 16px">Departamento</span>
                            </div>
                            <div v-if="showDepartment" style="display: flex; flex-direction: column">
                              <div v-for="(item, index) in showDepartmentCat ? getFilteredItems('department') : getFilteredItems('department').slice(0,10)" :key="index" style="margin: 6px 0; display: flex; align-items: center">
                                  <img v-if="!filterValidationsKey.some(value => value.toLowerCase().trim() == item.toLowerCase().trim())" @click="filterAction(item)" src="/static/images/newCheck.png" style="margin-right: 14px; cursor: pointer; width: 16px" alt="icon header stadistics">
                                  <img v-if="filterValidationsKey.some(value => value.toLowerCase().trim() == item.toLowerCase().trim())" @click="filterAction(item)" src="/static/images/checkbox_selected.png" style="border: 1px solid #ccc; border-radius: 2px; margin-right: 14px; cursor: pointer; width: 16px" alt="icon header stadistics">
                                  <span style="color: #777777">{{ item }}</span>
                              </div>                                  
                            </div>
                            <div v-if="uniqueDepartment.length > 10" @click="showDepartment = !showDepartment" style="color: blue; cursor: pointer">Mostrar {{uniqueDepartment.length - 10}} mas</div>  

                          </div>

                          <div style="display: flex; flex-direction: column; margin-bottom: 25px">
                            <div style="display: flex; align-items: center; cursor: pointer">
                              <span @click="companyName = true" v-if="!companyName" style="margin-right: 15px">►</span>
                              <span @click="companyName = false" v-if="companyName" style="margin-right: 15px">▼</span>
                              <span style="font-size: 16px">Empresa</span>
                            </div>
                            <div v-if="companyName" style="display: flex; flex-direction: column">
                              <div v-for="(item, index) in companyNameCat ? getFilteredItems('company') : getFilteredItems('company').slice(0,10)" :key="index" style="margin: 6px 0; display: flex; align-items: center">
                                  <img v-if="!filterValidationsKey.some(value => value.toLowerCase().trim() == item.toLowerCase().trim())" @click="filterAction(item)" src="/static/images/newCheck.png" style="margin-right: 14px; cursor: pointer; width: 16px" alt="icon header stadistics">
                                  <img v-if="filterValidationsKey.some(value => value.toLowerCase().trim() == item.toLowerCase().trim())" @click="filterAction(item)" src="/static/images/checkbox_selected.png" style="border: 1px solid #ccc; border-radius: 2px; margin-right: 14px; cursor: pointer; width: 16px" alt="icon header stadistics">
                                  <span>{{ item }}</span>
                              </div>
                            </div>
                            <div v-if="uniqueCompanies.length > 10" @click="companyNameCat = !companyNameCat" style="color: blue; cursor: pointer">Mostrar {{uniqueCompanies.length - 10}} mas</div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                  <ServiceCardNew
                    v-if="isLoad && !all"
                    :showClients="showClients"
                    :getCompanyData="getCompanyData"
                    :selectedSurvey="selectedSurveyToShow"
                    :name="getCompanyData.name"
                    :solution="_solution"
                    @goToPreview="changeRoute(); clientsToShow = getCompanyData.solutions.slice(0,9); type = 0; showService = false; all = true; showClients = false;"
                  />
                  <!-- @goToService="changeRoute(_solution.category); clientsToShow = getCompanyData.solutions.slice(0,9); type = 0; showService = true; all = false; showClients = false;" -->
              </v-layout>
            </div>

            <div v-if="!showService" :style="`width: ${!all ? '1258px' : '100%'};border: ${all ? '' : '1px solid #cecece'};background: white;margin-top: 0px;border-top: 2px solid #cecece7a;`">
              <SurveyContact
                :companyName="getCompanyData.name"
                :companyLogo="getCompanyData.logo"
                :solutions="getCategoriesAndLogo"
                :email="email"
              />
            </div>

          </v-layout>
        </v-flex>

      </div>
    </v-layout>

    <v-dialog v-model="showValidationsClientsUs" lazy width="774px" style="z-index: 9999 !important;" :fullscreen="$vuetify.breakpoint.smAndDown">
        <v-card style="height: 100%">
            <v-card-title :style="ats('height: 30px; border-bottom: 4px solid #eeeeee;', '=', 'padding: 0px; height: 50px; border-bottom: 1px solid #e3e3e3')" :class="ats('text-xs-right', '=', 'pl-2 text-xs-right')">
                <div class="font-size-20 px-2 color-00306e">
                    {{selectedValidationsClientsList.length}} Clientes Validaron
                </div>
                <v-icon :color="$vuetify.breakpoint.smAndDown? 'black': 'grey darken-1'" style="cursor: pointer;font-size: 30px;font-weight: 400;color: rgba(102, 102, 102, 0.6);margin-left: 464px" @click="showValidationsClientsUs = false">close</v-icon>
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
      v-model="contact.dialog.show"
      persistent
      scrollable
      lazy
      max-width="720px"
      :style="`z-index: 9999 !important; margin-top: ${$vuetify.breakpoint.smAndDown ? '0' : '10%'}`"
      :fullscreen="$vuetify.breakpoint.smAndDown"
      :disabled="getStatus.loading"
      v-if="getCompanyData !== null"
    >
      <v-card style="height: 100%">
        <v-card-title :style="ats('height: 30px; border-bottom: 4px solid #eeeeee;', '=', 'border-bottom: 1px solid #e3e3e3')" :class="ats('text-xs-right', '=', 'pl-4 text-xs-right')">
          <v-icon :color="$vuetify.breakpoint.smAndDown? 'black': 'grey darken-1'" style="cursor: pointer;" @click="contact.dialog.show = false">close</v-icon>
          <div :class="ats('', '=', 'pl-2')">
              <v-avatar :size="$vuetify.breakpoint.smAndDown ? '64' : '64'" color="white">
                  <img
                      :src="'/static/images/uploads/' + getCompanyData.logo  + '#' + Date.now()"
                      style="border: 3px solid #e3e3e3"
                  />
              </v-avatar>
          </div>
          <div class="font-size-20 px-4 color-00306e">Contacta a
              <span class="font-weight-bold headline">{{getCompanyData.name}}</span>
          </div>              
        </v-card-title>
        <ContactComponent 
          @ready="showSnack($eventvent)"
          :companyName="getCompanyData.name" 
          :companyLogo="getCompanyData.logo"
          :email="email"
          :justLogin="false"
          :services="getOrderedSolutions">
        </ContactComponent>
      </v-card>
    </v-dialog>

    <v-snackbar bottom :color="snackbar.success? 'success' : 'error'" :timeout="10000" :multi-line="true" v-model="snackbar.show">
      {{ snackbar.message }}
      <v-btn flat color="white" @click.native.stop="snackbar.show = false">Close</v-btn>
    </v-snackbar>

    <!-- <v-layout row fill-height justify-center align-top v-if="getStatus.loading" style="background-color: #f0f3f5; min-height: 500px; padding-top: 116px; height: 1500px">
      <v-flex xs6 pa-5>
        <v-progress-circular indeterminate size="64" color="button"></v-progress-circular>
      </v-flex>
    </v-layout> -->

    <v-layout column v-if="getStatus.loading ? false : (!getCompanyData ? true : (getCompanyData.published ? false : (currentUser.identifier === $route.params.identifier ? false : true) ) )" style="min-height: 500px; background-color: #f0f3f5;">
      <v-flex xs6 pa-5>
        <v-card white class="headline font-weight-bold pa-5">
          We are sorry but there is no company by that name.<br>
          <v-icon large class="mt-3" color="grey darken-4">fas fa-frown</v-icon><br>
          <v-btn large color="button" class="white--text mt-5" to="/">Go back home</v-btn>
        </v-card>
    </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue';
import { mapGetters } from 'vuex'
import Tabs from '../components/Tabs'
import PreviewOptionsBox from  '../components/PreviewOptionsBox'
import ContactComponent from '../components/Contact'
import ServiceCard from '../components/ServiceCard'
import SurveyContact from '../components/SurveyContact';
import ClientCarousel from '../components/ClientCarousel'
import ServiceCardSelected from '../components/ServiceCardSelected'
import ServiceCardNew from '../components/ServiceCardNew'
import ServiceCardSelectedMobile from '../components/ServiceCardSelectedMobile'
import ClientsMenu from '../components/ClientsMenu'
import Background from '../components/Background'
import HeaderBox from '../components/HeaderBox'
import HeaderBoxMobile from '../components/HeaderBoxMobile'
import NavigationMenu from '../components/NavigationMenu'
import MobileSurveyCard from '../components/MobileSurveyCard'
import PreviewBox2 from '../components/PreviewBox2'
import SurveyContactMobile from '../components/SurveyContactMobile'
import _ from 'lodash'
import VueScrollTo from 'vue-scrollto'
import VTooltip from 'v-tooltip'

Vue.use(VTooltip)
Vue.use(VueScrollTo, {duration: 850})

export default {
    name: 'home',
    components: {
        ContactComponent, Tabs, SurveyContact, MobileSurveyCard,SurveyContactMobile, PreviewBox2, PreviewOptionsBox, ClientCarousel, 
        ServiceCard, HeaderBox, Background, NavigationMenu, ServiceCardNew, ServiceCardSelected, ClientsMenu, HeaderBoxMobile, ServiceCardSelectedMobile
    },
    watch: {
      '$route.params': function (id) {
        if (!this.$route.params.solution && !this.$route.params.stad && !this.$route.path.includes('clientes-encuestados')) {
              this.showService = false;
              this.all = true;
              this.clientsToShow = this.getCompanyData.solutions.slice(0,9); 
              this.type = 0;
              this.showClients = false;              
              this.activeSolution = this._solution.category;             
        }           
        if (this.$route.params.solution && !this.$route.params.stad && !this.$route.path.includes('clientes-encuestados')) {
            const selectedService = this.getOrderedSolutions.filter(solution => ((solution.category).replace(/\s/g, '')).replace(/%C3%B1/g, 'ñ') === this.$route.params.solution);
            this._solution = selectedService[0];
            this.showService = true
            // this.clickToActiveItem(1, this.getCompanyData.identifer, selectedService[0].category)
            this.getCategoriesAndLogo.forEach(({ category }, index) => {
              if(category.trim().toLowerCase() === this._solution.category.trim().toLowerCase()) {
                this.selectedMenuItem = index;
              }
            })
            this.totalValidations = this.getTotalValidations(this._solution);
        } 
        if (this.$route.params.solution && this.$route.params.stad && !this.$route.path.includes('clientes-encuestados')){
            const selectedService = this.getOrderedSolutions.filter(solution => (this.removeAccents(solution.category).replace(/\s/g, '')).replace(/%C3%B1/g, 'ñ') === this.removeAccents(this.$route.params.solution));
            this._solution = selectedService[0];
            this.showService = true
            // this.clickToActiveItem(1, this.getCompanyData.identifer, selectedService[0].category)
            this.getCategoriesAndLogo.forEach(({ category }, index) => {
              if(category.trim().toLowerCase() === this._solution.category.trim().toLowerCase()) {
                this.selectedMenuItem = index;
              }
            })
            this.totalValidations = this.getTotalValidations(this._solution);
            this.allClientsFilter = false;
            this.selectSurvey((this._solution.surveys.filter((survey) => this.removeAccents(survey.description).toLowerCase().trim().replace(/\s/g, '') == this.removeAccents(this.$route.params.stad).toLowerCase().trim().replace(/-/g, '')))[0])              
        }
        if (this.$route.params.solution && this.$route.params.stad && this.$route.path.includes('clientes-encuestados')){
              const selectedService = this.getOrderedSolutions.filter(solution => (this.removeAccents(solution.category).replace(/\s/g, '')).replace(/%C3%B1/g, 'ñ') === this.removeAccents(this.$route.params.solution));
              this._solution = selectedService[0];
              this.showService = true
              // this.clickToActiveItem(1, this.getCompanyData.identifer, selectedService[0].category)
              this.getCategoriesAndLogo.forEach(({ category }, index) => {
                if(category.trim().toLowerCase() === this._solution.category.trim().toLowerCase()) {
                  this.selectedMenuItem = index;
                }
              })
              this.totalValidations = this.getTotalValidations(this._solution);
              this.scrollTop(); 
              this.showClients = true; 
              this.isLoad = true; 
              this.all = false; 
              this.showService = false;
              this.allClientsFilter = true
              this.selectedSurveyToShow = this._solution
        }
        if(!this.$route.params.solution ) {
          if(this.$vuetify.breakpoint.smAndDown) {
            // const selectedService = this.getOrderedSolutions.filter(solution => (this.removeAccents(solution.category).replace(/\s/g, '')).replace(/%C3%B1/g, 'ñ') === this.removeAccents(this.$route.params.solution));
            this._solution = (this.getCompanyData.solutions.filter(({active}) => active))[0];
            this.showService = true
            // this.clickToActiveItem(1, this.getCompanyData.identifer, selectedService[0].category)
            this.getCategoriesAndLogo.forEach(({ category }, index) => {
              if(category.trim().toLowerCase() === this._solution.category.trim().toLowerCase()) {
                this.selectedMenuItem = index;
              }
            })
            this.totalValidations = this.getTotalValidations(this._solution);
            this.selectSurvey((this._solution.surveys.filter((survey) => this.removeAccents(survey.description).toLowerCase().trim().replace(/\s/g, '') == this.removeAccents(this.$route.params.stad).toLowerCase().trim().replace(/-/g, '')))[0])
          } 
        }
      }        
    },
    data() {
      return {
        showIndustryCat: false,
        showSizeCat: false,
        showPostionCat: false,
        typePostionCat: false,
        showDepartmentCat: false,
        companyNameCat: false,
        showIndustry: true,
        showSize: true,
        showPostion: true,
        typePostion: true,
        showDepartment: true,
        companyName: true,
        filteringIsActive: false,
        filters: 0,
        filterSelected: 'company',
        pageNumberSolution: 2,
        searchCompany: '',
        searchIndustry: '',
        filterValidationsKey: [],
        allSurveysArray: [],
        filterByIndustry: false,
        filterByCompany: false,
        surveysArray: [],
        topicArray: [],
        allCompanies: false,
        allIndustries: false,
        topSelectedMenu: 'home',
        showAllValidations: false,
        selectedOption: 0,
        pageNumberStad: 0,
        solutionSelectedId: 'home',
        uniqueIndustries: [],
        uniqueCompanies: [],
        uniquePositions: [],
        uniqueCompanySize: [],
        uniqueDepartment: [],
        uniquePositionType: [],
        allClientsFilter: false,
        mobileHome: true,
        showContactView: false,
        showContactBox: true,
        selectedValidationsClientsList: [],
        showValidationsClientsUs: false,
        clientsToShow: [],
        showClients: false,
        all: true,
        selectedSurveyToShow: '',
        byClientsMenu: false,
        clientsToHeader: null,
        activeSlideUpToDown: false,
        tab: 0,
        type: 0,
        selectedMenuItem: 0,
        totalValidations: 0,
        selectedMenu: 'desc',
        active: false,
        email: '',
        byUrl: 0,
        byMobile: 0,
        _solution: '',
        _validations: [],
        isLoad: false,
        locationUrl: '',
        isMobile: false,
        content: 'solutions',
        filter: '',
        specificRecomendations: [],
        selectedSolution: '',
        beingHovered: null,
        snackbar: {
            show: false,
            success: true,
            message: ''
        },
        showService: false,
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
    computed: {
      ...mapGetters('auth', ['isLoggedIn', 'currentUser', 'getToken']),
      ...mapGetters('company', ['getCompanyData', 'getStatus', 'getSolutions', 'getBenefits', 'getCategories', 'getCategoriesAndLogo', 'getExperiences']),

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
      stadPageCount() {
        let l = this.getCompanyData.solutions.filter(({ active }) => active).slice(0, 4).length,
          s = 4;
        return Math.ceil(l/s);
      },
      currentStads() {
        const start = this.pageNumberStad * 4,
          end = start + 4;
        const data = this.getCompanyData.solutions.filter(({ active }) => active).slice(start, end)
        return data
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
      uniqueIndustries() {
        if(this.searchIndustry) {
          let items = this.uniqueIndustries.filter(item => {
            return item.toLowerCase().trim().includes(this.searchIndustry.toLowerCase().trim())
          })
          return items 
        } else {
          return this.uniqueIndustries
        }
      },
      uniqueCompaniesFilter() {
        if(this.searchCompany) {
          let items =  this.uniqueCompanies.filter(item => {
            return item.toLowerCase().trim().includes(this.searchCompany.toLowerCase().trim()) 
          })
          return items
        } else {
          return this.uniqueCompanies
        }
      },
      getOrderedSolutions() {
        return this.getSolutions
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
      clickToGoToClients(e) {
        this.clientsBySolution = true;
      },
      getFilteredItems (item) {
        switch(item) {
          case 'company':
            return this.uniqueCompanies;
            break;
          case 'title':
            return this.uniquePositions;
            break;
          case 'industry':
            return this.uniqueIndustries;
            break;
          case 'size':
            return {size: true, items: this.uniqueCompanySize};
            break;
          case 'position':
            return this.uniquePositionType;
            break;
          case 'department':
            return this.uniqueDepartment;
            break;
          default: return []
        }
      },
      selectSurvey(survey) {
        this.selectedSurveyToShow = survey
        this.type = 5
        this.all = true
        this.all = false
        this.isLoad = false
        this.isLoad = true
        this.showService = false
        this.showService = true
        this.showService = false
        this.$router.push(`/${this.getCompanyData.identifier}/${this.removeAccents(this._solution.category).replace(/\s/g, '')}/${this.removeAccents(survey.description).trim().toLowerCase().replace(/\s/g, '-')}`);
      },
      removeAccents(_strAccents) {
        let strAccents = _strAccents.split('');
        let strAccentsOut = new Array();
        let strAccentsLen = strAccents.length;
        let accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
        let accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
        for (let y = 0; y < strAccentsLen; y++) {
          if (accents.indexOf(strAccents[y]) != -1) {
            strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
          } else
            strAccentsOut[y] = strAccents[y];
        }
        strAccentsOut = strAccentsOut.join('');
        return strAccentsOut;
      },
      async getEmail () {
          const identifier = this.$route.params.identifier;
          const { data } = await axios.post('/api/user/findByCompanyId', {name: identifier});
          this.email = data.data.email;
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
      onScroll(e) {
        if(window.scrollY >= 0 && window.scrollY < 650) {
          this.selectedMenu = 'desc'
        } else if (window.scrollY > 650 && window.scrollY < 900) {
          this.selectedMenu = 'stad'
        } else if(window.scrollY > 899) {
          this.selectedMenu = 'clients'
        }
      },
      getShortName(name) {
          const splittedName = name.split(' ');
          if (splittedName.length > 1) {
              return (splittedName.map(n => n.charAt(0).toUpperCase())).join("");
          } else {
              return (name.charAt(0)).toUpperCase();
          }
      },
      showOptionView(e) {
        this.selectedSurveyToShow = e.survey
        this._solution = e.solution
        this.type = 5
        this.isLoad = false
        this.isLoad = true
        this.all = false
        this.$router.push(`/${this.getCompanyData.identifier}/${this.removeAccents(e.solution.category).replace(/\s/g, '')}/${this.removeAccents(e.survey.description).trim().toLowerCase().replace(/\s/g, '-')}`);
      },
      getClients() {
        let clients = []
        this.getSolutions.map(solution => {
          solution.surveys.forEach(survey => {
            if (survey.active) {
              survey.options.forEach(option => {
                if(option.active) { 
                  option.validations.forEach(validation => clients.push(validation));
                }
              })
            }
          })
        });
        return clients;
      },
      next() {
        this.pageNumberStad++;
      },
      prev() {
        this.pageNumberStad--;
        // this.currentSurveys = this.prevStack
      },
      getClientsToHeader() {
          const clients = this.getClients();
          const companies = clients.map(client => client.company)
          this.clientsToHeader = { companies, clients: clients.slice(0,3), }
      } ,
      getClientsBySolution(solution) {
        let clients = [];
        (solution.surveys.filter(({ active }) => active)).forEach(survey => {
            (survey.options.filter(({ active }) => active)).forEach(option => {
                option.validations.forEach(validation => clients.push(validation))
            })
        });
        return (this.checkDuplicateInObject('id', clients));
      },
      getValidationsBySolution(solution) {
        let validations = 0;
        (solution.surveys.filter(({ active }) => active)).forEach(survey => {
          (survey.options.filter(({ active }) => active)).forEach(option => {
              validations = validations + option.validations.length
          })
        });
        return validations;
      },
      getValidationsBySurvey(survey) {
        let validations = 0;
        (survey.options.filter(({ active }) => active)).forEach(option => {
            validations = validations + option.validations.length
        });
        return validations;
      },
      getMostPopularOptions() {
        let array = [];
        this.getCompanyData.solutions.forEach(solution => {
          this.allOptions(solution.surveys, 2).forEach((option, i) => {
            option.solutionName = this.transformString(solution.category);
            array.push(option)
          })
        })
        return array.slice(0, 5);
      },
      filterClickAction(identifier, category, menu) {
        const selectedService = this.getOrderedSolutions.filter(solution => solution.category === category);
        this._solution = selectedService[0];
        this.totalValidations = this.getTotalValidations(this._solution);
        this.byClientsMenu = menu
        this.isLoad = false
        this.isLoad = true        
        const _category = category.replace(/\s/g, '');
        this.$router.push(`/${this.getCompanyData.identifier}/${this.removeAccents(_category)}`);
      },
      scrollTop(behavior = true) {
        if(behavior) {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
          window.scrollTo({ top: 0 })
        }
      },
      scrollToSurveys(id, surveys = true) {
        if(surveys) {
          window.scrollTo({ top: this.$refs[id][0].offsetTop, behavior: 'smooth' })
        } else {
          window.scrollTo({ top: this.$refs[id].offsetTop, behavior: 'smooth' })
        }
      },
      scrollToSolutionMobile() {
        window.scrollTo({ top: 360 })
      },
      scrollTo(type) {
        switch(type) {
          case 1:
            window.scroll({ top: 0, behavior: 'smooth' });
            break;
          case 2:
            window.scrollTo({ top: 710, behavior: 'smooth' });
            break;
          case 3:
            window.scrollTo({ top: 960, behavior: 'smooth' });
            break;
          default:
            return false;
        }
      },
      filterAction(item) {
        console.log('filter action', item)
        let existsItemInValidationsArray = this.filterValidationsKey.some(myItem => item == myItem);
        console.log('filterValidationsKey', this.filterValidationsKey)
        if(existsItemInValidationsArray) {
          console.log('filter action', item)
          // this.filterValidationsKey = this.filterValidationsKey.filter(value => value !== item);
          this.removeValidationsByKey(item)
        } else {
          console.log('filter action', item)
          // this.filterValidationsKey.push(item);
          this.filterValidations(item, this.filterSelected) 
         
        }
      },
      clickToActiveItem(identifier, category) {
        // if(typeof identifier === 'undefined') identifier = this.getCompanyData.identifier
        // category !== 'Inicio' ? this.filterClickAction(identifier, category) : this.filterClickAction('yt', null);
        // this.scrollTop()
        if(this.showService) this.showService = false;
        this.showService = true;
        if(this.all) this.all = false;
        if(this.type == 0) this.type = 5
        this.type = 5
        // this.$vuetify.breakpoint.smAndDown ? this.scrollToSolutionMobile() : this.scrollTop()
        const selectedService = this.getOrderedSolutions.filter(solution => solution.category === category);
        this._solution = selectedService[0];
        this.totalValidations = this.getTotalValidations(this._solution);
        const _category = category.replace(/\s/g, '');
      },
      clickToActiveItem2(identifier, category) {
        if(this.showService) this.showService = false;
        this.showService = true;
        if(this.all) this.all = false;
        if(this.type == 0) this.type = 5
        this.type = 5
        // this.$vuetify.breakpoint.smAndDown ? this.scrollToSolutionMobile() : this.scrollTop()
        const selectedService = this.getOrderedSolutions.filter(solution => solution.category === category);
        this._solution = selectedService[0];
        this.totalValidations = this.getTotalValidations(this._solution);
        const _category = category.replace(/\s/g, '');
        this.mobileHome = false
        this.$router.push(`/${this.getCompanyData.identifier}/${this.removeAccents(_category)}`);
      },
      changeSelectedOption(option) {
        this.selectedOption = option;
      },
      addItemToTopicArray(solution) {
        this.topicArray.push(solution)
      },
      removeItemFromTopicArray(solutionId) {
        this.topicArray = this.topicArray.filter(solution => solution._id !== solutionId);
        this.surveysArray = this.surveysArray.filter(survey => survey.solutionId !== solutionId)
      },
      clearFilter() {
        this.topicArray = [];
        this.surveysArray = []
      },
      addSurveyToArray(survey) {
        this.surveysArray.push(survey)
        // this.addItemToTopicArray(this.getCompanyData.solutions.filter(({ _id }) => _id == survey.solutionId)[0])
      },
      removeSurveyFromArray(surveyId) {
        this.surveysArray = this.surveysArray.filter(survey => survey._id !== surveyId);
      },
      filterBar(solution) {
        let items = []
        let final = 0
        this.getCompanyData.solutions.filter(({active}) => active).forEach(solution => {
          items.push(this.getValidationsBySolution(solution))
        })
        let items_sorted = items.sort((a,b) => b-a)
        if(items_sorted.length > 0) {
          final = 100*this.getValidationsBySolution(solution)/items_sorted[0]
        } else {
          final = 0
        }
        return final
      },
      allOptions(surveys, i = 5){
        let array = [];
        surveys.forEach(survey => {
          survey.options.forEach((option) => {
            option.surveyId = survey._id
            array.push(option)
          })
        })
        return array.filter(({active}) => active).sort((a, b) => b.validations.length - a.validations.length).slice(0, i)
      },
      async publish() {
          const response = await this.$store.dispatch('company/publish')
          if (response.success === true) {
              this.snackbar.show = true
              this.snackbar.success = true
              this.snackbar.message = 'Tu perfil Yes Them se ha publicado con éxito.'
              this.$store.dispatch('company/populate', this.$route.params.identifier)
          }
      },
      getUniquesItems() {
        let clients = this.getHappyClients()

        const industries = clients.map(client => client.industry)

        const companies = clients.map(client => client.company)

        const positions = clients.map(client => client.positions)

        const size = clients.map(client => {
          return client.company_size == 'big' ? {type: 'big', desc: 'Gran Empresa ( > 500 empleados)'} :  client.company_size == 'medium' ? {type: 'medium', desc: 'Mediana Empresa (50 - 500 empleados)'} : client.company_size == 'small' ? {type: 'small', desc: 'Pequeña Empresa (50 empleados o menos)'} : false
        })

        const department = clients.map(client => client.department)

        const position_type = clients.map(client => client.position_type)

        this.uniqueIndustries = [...new Set(industries.sort())];
        this.uniqueCompanies = [...new Set(companies.sort())];
        this.uniquePositions  = [...new Set(positions.sort())];
        this.uniqueCompanySize = this.checkDuplicateInObject('type', size);
        this.uniqueDepartment = [... new Set(department.sort())];
        this.uniquePositionType = [... new Set(position_type.sort())];
      },
      getHappyClients () {
        let validations = [];
        this.getCompanyData.solutions.forEach(solution => {
          solution.surveys.forEach(survey => {
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
      getTotalCountValidations() {
          let validations = 0;
          this.getCompanyData.solutions.forEach(solution => {
            solution.surveys.forEach(survey => {
              validations++
            })
          })
          return validations
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
      getAllStad() {
        let counter = 0;
        this.getCompanyData.solutions.forEach(solution => {
          solution.surveys.forEach(survey => {
            if(survey.active) counter++
          })
        })
        return counter
      },
      removeValidationsByKey(item) {
        console.log('item to be removed', item);
        this.filterValidationsKey = this.filterValidationsKey.filter(value => value !== item);
        if(this.filterValidationsKey.length == 0) {
          this.allSurveysArray = []
          this.getCompanyData.solutions.forEach(solution => {
            solution.surveys.forEach(survey => {
              (survey.options.forEach((option, index) => {
                  if(option.hasOwnProperty('perc')) {
                    option.validationsCount = []
                    if (isNaN(option.perc)) option.perc = 0
                    if(option.validations) {
                      if(option.validations.length !== 0) {
                          option.perc = index === 0 ? 100 : ((100*option.validations.length)/(survey.options.filter(({ active }) => active).length > 0 && survey.options.filter(({ active }) => active)[0].validations.length))
                      } else {
                          option.perc = 0;
                      }
                      // if (isNaN(option.perc)) option.perc = 0
                      (option.validations.forEach(item => option.validationsCount.push(item)))         
                    }               
                  }
              }));
              this.allSurveysArray.push(survey)
            })
          })
          this.filteringIsActive = false
        } else {
          let array = []
          let array2 = []
          this.allSurveysArray = []
          this.getCompanyData.solutions.forEach(solution => {
            solution.surveys.forEach(survey => {
              (survey.options.sort((a,b) => b.validations.length - a.validations.length).forEach((option, index) => {
                option.validationsCount.forEach((vc, i) => {
                  Object.values(vc).forEach(value => {
                    if(value == item) {
                      option.validationsCount.splice(i, 1);
                    }
                  })
                })
              }))
              this.allSurveysArray.push(survey)
            })
          })
          this.filteringIsActive = false;
          this.filteringIsActive = true;
        }
      },
      filterValidations(key = '', type = '') {
        switch(type) {
          case 'company':
            this.filterValidationsByKey(key, 'company')
            break;
          case 'title':
            this.filterValidationsByKey(key, 'positions')
            break;
          case 'industry':
            this.filterValidationsByKey(key, 'industry')
            break;
          case 'size':
            this.filterValidationsByKey(key, 'company_size')
            break;
          case 'position':
            this.filterValidationsByKey(key, 'position_type')
            break;
          case 'department':
            this.filterValidationsByKey(key, 'department')
            break;
          default: return []
        }
      },
      filterValidationsByKey(key = '', type = '') {
        let array = []
        let array2 = []
        this.filterValidationsKey.push(key);
        this.allSurveysArray = []
        this.getCompanyData.solutions.forEach(solution => {
          solution.surveys.forEach(survey => {
            (survey.options.sort((a,b) => b.validations.length - a.validations.length).forEach((option, index) => {
                if(option.hasOwnProperty('perc')) {
                  array = []
                  array2 = []
                  option.validationsCount = []
                  if (isNaN(option.perc)) option.perc = 0
                  if(option.validations.filter(validation => validation[type].toLowerCase() == key.toLowerCase())) {
                    this.filterValidationsKey.forEach(validKey => {
                      array.push(option.validations.filter(validation => validation[type].toLowerCase() == validKey.toLowerCase()))
                    })

                    this.filterValidationsKey.forEach(validKey => {
                      if (survey.options.filter(({ active }) => active).length > 0) {
                        array2.push(
                          survey.options.filter(({ active }) => active)[0].validations.filter(validation => validation[type].toLowerCase() == validKey.toLowerCase())
                        )                        
                      }
                    })
                  }
                  if (isNaN(option._perc)) option._perc = 0
                  array.forEach(item => item.forEach(subItem => {
                    option.validationsCount.push(subItem);
                  }))

                  option._perc = index === 0 ? 100 : ((100*option.validationsCount.length)/(survey.options.filter(({ active }) => active).length > 0 && survey.options.filter(({ active }) => active).sort((a,b) => b.validations.length - a.validations.length)[0].validationsCount.length))
                  // console.log('validationsCount', option.validationsCount)
                  // console.log('option._perc', survey.options.filter(({ active }) => active).sort((a,b) => b.validations.length - a.validations.length)[0])
                }
            }));
            // survey.options.sort((a,b) => b.validationsCount.length - a.validationsCount.length)
            this.allSurveysArray.push(survey)
          })
        })
        this.filteringIsActive = false;
        this.filteringIsActive = true;
      },
      allSurveys() {
        let surveys = [];
        this.allSurveysArray = []
        this.getCompanyData.solutions.forEach(solution => {
          solution.surveys.forEach(survey => {
            (survey.options.filter(({ active }) => active).sort((a,b) => b.validations.length-a.validations.length).forEach((option, index) => {
                  option.validationsCount = []
                  if (isNaN(option.perc)) option.perc = 0
                  if(option.validations && option.validations.length !== 0) {
                      if(survey.options.filter(({ active }) => active)[0]) {
                        option.perc = 0
                        option.perc = index === 0 ? 100 : ((100*option.validations.length)/(survey.options.filter(({ active }) => active).length > 0 && survey.options.filter(({ active }) => active).sort((a,b) => b.validations.length - a.validations.length)[0].validations.length))
                      } else {
                        option.perc = 0
                      }
                    (option.validations.forEach(item => option.validationsCount.push(item)))         
                  }
            }));
            this.allSurveysArray.push(survey)
          })
        })
      },
      getAllStadOptions(filtered = false) {
        if(!filtered) {
          let stads = [];
          this.getCompanyData.solutions.forEach(solution => {
            solution.surveys.forEach(survey => {
              if(survey.active) stads.push(survey)
            })
          })
          return stads          
        } else {
          let stads = [];
          (this.topicArray.map(solution => solution.surveys.filter(({ active }) => active))).forEach(item => {
            item.forEach(i => stads.push(i))
          });
          return stads
        }

      },
      dispatchContactBox(event) {
        this.showContactBox = event
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
        return (this.checkDuplicateInObject('id', clients));
      },
      validate() {
        localStorage.setItem('getCompanyData', JSON.stringify(this.getCompanyData));
        window.location.replace(`http://yesthem.com/${this.getCompanyData.identifier}/${this.removeAccents(this._solution.identifier).toLowerCase()}/validate`)
      },
      changeRoute(category = '', extra = '') {
        if(!category && !extra) {
          this.$router.push(`/${this.getCompanyData.identifier}`);
        } else if(category && !extra){
          this.$router.push(`/${this.getCompanyData.identifier}/${this.removeAccents(category).replace(/\s/g, '')}`);
        } else if (category && extra) {
          this.$router.push(`/${this.getCompanyData.identifier}/${this.removeAccents(category).replace(/\s/g, '')}/${extra}`);
        }
      },
      getTotalValidations(solution) {
        let validations = 0
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
        return validations
      },
      showAllClients() {
        this.clientsToShow = this.getCompanyData.solutions;
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
    beforeMount() {
        this.detectmob();
    },
    mounted() {
    },
    updated() {
      // if(this.getCompanyData) {
      //   this.byMobile++;
      //   if(this.byMobile === 1) {
      //     if(this.$route.params.solution == '' || typeof this.$route.params.solution === 'undefined') {
      //       this._solution = this.getOrderedSolutions[0];
      //       // this.totalValidations = this.getTotalValidations(this._solution);
      //     } else {
      //       this.filterClickAction(this.getCompanyData.identifier, this.$route.params.solution, false)
      //     }        
      //   }
      // } else {
      //   this.$router.push(`/search/${this.$route.params.identifier}`);
      // }
    },
    beforeUpdate() {
      if(this.getCompanyData) {
        this.getUniquesItems()
        this.byUrl == 0 && this.allSurveys()
        if(this.clientsToShow.length == 0) this.clientsToShow = this.getCompanyData.solutions.slice(0,9);
        this._solution ? this.totalValidations = this.getTotalValidations(this._solution) : false
        this.byUrl++;
        this.getEmail()
        this.isLoad = false
        this.isLoad = true
        this.getClientsToHeader()
        if(this.byUrl === 1 || this.byUrl === 2 || this.byUrl == 3) {
          this.locationUrl = window.location.href
          if (this.$route.params.solution && !this.$route.params.stad && !this.$route.path.includes('clientes-encuestados')) {
                const selectedService = this.getOrderedSolutions.filter(solution => ((solution.category).replace(/\s/g, '')).replace(/%C3%B1/g, 'ñ') === this.$route.params.solution);
                this._solution = selectedService[0];
                this.showService = true
                // this.clickToActiveItem(1, this.getCompanyData.identifer, selectedService[0].category)
                this.getCategoriesAndLogo.forEach(({ category }, index) => {
                  if(category.trim().toLowerCase() === this._solution.category.trim().toLowerCase()) {
                    this.selectedMenuItem = index;
                  }
                })
                this.totalValidations = this.getTotalValidations(this._solution);
                this.activeSolution = this._solution.category;
          } 
          if (this.$route.params.solution && this.$route.params.stad && !this.$route.path.includes('clientes-encuestados')){
                const selectedService = this.getOrderedSolutions.filter(solution => (this.removeAccents(solution.category).replace(/\s/g, '')).replace(/%C3%B1/g, 'ñ') === this.removeAccents(this.$route.params.solution));
                this._solution = selectedService[0];
                this.showService = true
                // this.clickToActiveItem(1, this.getCompanyData.identifer, selectedService[0].category)
                this.getCategoriesAndLogo.forEach(({ category }, index) => {
                  if(category.trim().toLowerCase() === this._solution.category.trim().toLowerCase()) {
                    this.selectedMenuItem = index;
                  }
                })
                this.totalValidations = this.getTotalValidations(this._solution);
                this.selectSurvey((this._solution.surveys.filter((survey) => this.removeAccents(survey.description).toLowerCase().trim().replace(/\s/g, '') == this.removeAccents(this.$route.params.stad).toLowerCase().trim().replace(/-/g, '')))[0])
                // if(this.$vuetify.breakpoint.smAndDown && this.showService && !this.showContactView) {
                  // this.scrollToSolutionMobile();
                // }
          }
          if (this.$route.params.solution && this.$route.params.stad && this.$route.path.includes('clientes-encuestados')){
              const selectedService = this.getOrderedSolutions.filter(solution => (this.removeAccents(solution.category).replace(/\s/g, '')).replace(/%C3%B1/g, 'ñ') === this.removeAccents(this.$route.params.solution));
              this._solution = selectedService[0];
              this.showService = true
              // this.clickToActiveItem(1, this.getCompanyData.identifer, selectedService[0].category)
              this.getCategoriesAndLogo.forEach(({ category }, index) => {
                if(category.trim().toLowerCase() === this._solution.category.trim().toLowerCase()) {
                  this.selectedMenuItem = index;
                }
              })
              this.totalValidations = this.getTotalValidations(this._solution);
              this.scrollTop(); 
              this.showClients = true; 
              this.isLoad = true; 
              this.all = false; 
              this.showService = false;
          }
          if(!this.$route.params.solution){
            if(this.$vuetify.breakpoint.smAndDown) {
              // const selectedService = this.getOrderedSolutions.filter(solution => (this.removeAccents(solution.category).replace(/\s/g, '')).replace(/%C3%B1/g, 'ñ') === this.removeAccents(this.$route.params.solution));
              this._solution = (this.getCompanyData.solutions.filter(({active}) => active))[0];
              this.showService = true
              // this.clickToActiveItem(1, this.getCompanyData.identifer, selectedService[0].category)
              this.getCategoriesAndLogo.forEach(({ category }, index) => {
                if(category.trim().toLowerCase() === this._solution.category.trim().toLowerCase()) {
                  this.selectedMenuItem = index;
                }
              })
              this.totalValidations = this.getTotalValidations(this._solution);
              this.selectSurvey((this._solution.surveys.filter((survey) => this.removeAccents(survey.description).toLowerCase().trim().replace(/\s/g, '') == this.removeAccents(this.$route.params.stad).toLowerCase().trim().replace(/-/g, '')))[0])
            } 
          }
          this.isLoad = true
        }        
      } else {
        this.$router.push(`/search/${this.$route.params.identifier}`);      
      }
      // if(this.byUrl%3 == 0) this.scrollToSolutionMobile();
    },

}
</script>

<style scoped>

/* width */
div.filterDiv::-webkit-scrollbar {
    width: 4px;
}

/* Track */
div.filterDiv::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #e4e4e8; 
    border-radius: 10px;
}

/* Handle */
div.filterDiv::-webkit-scrollbar-thumb {
    background: #dddde2;
    border-radius: 10px;
}

div.filterDiv::-webkit-scrollbar-thumb:hover {
    cursor: pointer;
}

.v-dialog {
  box-shadow: none !important;
  -webkit-box-shadow: none !important
}

.tabsContainer {
  margin-left: 0px;
  overflow: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
}

.v-tabs__container .v-tabs__container--overflow {
  padding: 0px 10px 0 10px !important
}

.tabsContainer::-webkit-scrollbar { 
  display: none; 
}

.v-tabs__item--active span{
  text-transform: none !important;
  color: rgb(231, 102, 45) !important
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
  -webkit-overflow-scrolling: touch;
}
  .card {
    display: inline-block;
    width: 50px; height: 50; background: red; margin: 15px
  }
.listItemHovered {
  transition: all 0.1s;
}

.listItemHovered:hover {
  background: #e8f1fa
}
.stickyPosition {
  position: -webkit-sticky;
  position: -moz-sticky;
  position: -ms-sticky;
  position: -o-sticky;
  position: sticky;
  top: 0px;
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

.boxScale:hover {
  -webkit-transform: translate(0,-5px);
  -ms-transform: translate(0,-5px);
  transform: translate(0,-5px);
  -webkit-transition: -webkit-box-shadow .2s ease-in-out,-webkit-transform .2s ease-in-out;
  transition: -webkit-box-shadow .2s ease-in-out,-webkit-transform .2s ease-in-out;
  -o-transition: box-shadow .2s ease-in-out,transform .2s ease-in-out;
  transition: box-shadow .2s ease-in-out,transform .2s ease-in-out;
  transition: box-shadow .2s ease-in-out,transform .2s ease-in-out,-webkit-box-shadow .2s ease-in-out,-webkit-transform .2s ease-in-out;
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

</style>
