<template>
    <div :style="ats('height: 100%; width: 100%; padding: 5px', '=', 'height: 100%; width: 100%; padding: 40px')">
        <div v-if="partComponent === 0">
            <v-layout align-center justify-center row fill-height>
                <v-flex style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center">
                    <span style="font-size: 35px">Bienvenido a Yes Them</span>
                    <br>
                    <span style="font-size: 35px">Adelante, crea tu primer servicio</span>
                    <br>
                    <v-btn flat @click="partComponent = 1" style="background-color: green; color: white; text-transform: none;">
                        <v-icon left dark style="margin-left: -10px">add</v-icon>
                        <span style="margin-left: -10px">Añadir Servicio</span>
                    </v-btn>
                </v-flex>
            </v-layout>
        </div>        
        <div v-if="partComponent === 1">
            <v-layout align-center justify-center fill-height :class="ats('column', '=', 'row')" style="margin-bottom: 30px;">
                <v-flex xs9 style="text-align: left">
                    <h1>Servicios</h1>
                </v-flex>
                <v-flex style="margin-right: -8px;">
                    <v-layout align-center justify-center row fill-height>
                        <v-flex>
                            <div style="display: flex; width: 100%;">
                                <v-icon dark style="background: white; color grey; border-top: 1px solid #cecece; border-bottom: 1px solid #cecece;border-left: 1px solid #cecece;">search</v-icon>
                                <input type="text" v-model="search" placeholder="Buscar Servicios..."
                                    style="background: white; outline: none; border-top: 1px solid #cecece; border-bottom: 1px solid #cecece;border-right: 1px solid #cecece;height: 35px; border-radius: 2px;"
                                >
                            </div>
                        </v-flex>
                        <v-flex>
                            <v-btn flat @click="showAddService = true; dispatchAnalysis(false)" style="background-color: green; color: white; text-transform: none;">
                                <v-icon left dark style="margin-left: -10px">add</v-icon>
                                <span style="margin-left: -10px">Crear Servicio</span>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
            <div style="height: 100%">
              <v-layout 
                v-for="(iSolution, i) in filteredList" 
                :key="i" 
                align-center justify-center row fill-height 
                style="cursor: pointer; background: white; margin-bottom: 20px; height: 100px; border-radius: 3px; border: 1px solid #cecece;-webkit-box-shadow: 0px 2px 5px -2px rgba(0,0,0,0.27); -moz-box-shadow: 0px 2px 5px -2px rgba(0,0,0,0.27); box-shadow: 0px 2px 5px -2px rgba(0,0,0,0.27);">
                <v-flex xs11>
                  <v-layout align-center justify-center row fill-height @click="selectSolutionToShow(iSolution); goToTop(); dispatchAnalysis(false)">
                    <v-flex :class="ats('xs3', '=', 'xs4')" :style="ats('text-align: left', '=', 'padding-left: 15px; text-align: left')">
                        <div :style="ats('display: none', '=', 'margin-bottom: 10px;')"><span style="">Encuestas Sobre</span></div>
                        <span v-if="!$vuetify.breakpoint.smAndDown" :style="ats('font-weight: bold; font-size: 16px;', '=', 'font-weight: bold; font-size: 22px;')">{{transformString(iSolution.category)}}</span>
                        <span v-if="$vuetify.breakpoint.smAndDown" :style="ats('font-weight: bold; font-size: 16px;', '=', 'font-weight: bold; font-size: 22px;')">
                          {{transformString(iSolution.category).split('').splice(0,16).join('')}}
                          <span v-if="transformString(iSolution.category).length > 16">...</span>
                        </span>
                    </v-flex>
                    <v-flex xs2  style="text-align: center">
                        <div v-if="iSolution.active" align="center" :style="ats('margin: auto; width: 50px; border: 2px solid green; color: green; border-radius: 50px; font-size: 10px', '=', 'margin: auto; width: 80px; border: 2px solid green; color: green; border-radius: 50px; font-size: 12px')">
                            ACTIVO
                        </div>
                        <div v-if="!iSolution.active" align="center" :style="ats('margin: auto; width: 50px; border: 2px solid green; color: green; border-radius: 50px; font-size: 10px', '=', 'margin: auto; width: 80px; border: 2px solid green; color: green; border-radius: 50px; font-size: 12px')">
                            INACTIVO
                        </div>                    
                        <span :style="ats('display: none', '=', '')">Estado</span>
                    </v-flex>            
                    <v-flex xs2  :style="ats('margin: 5px; text-align: center', '=', 'text-align: center')">
                        <span style="font-weight: bold; font-size: 18px">{{iSolution.surveys.length}}</span>
                        <br>
                        <span :style="ats('font-size: 12px', '=', '')">Encuestas</span>
                    </v-flex>
                    <v-flex xs2  :style="ats('margin: 5px; text-align: center', '=', 'text-align: center')">
                        <span style="font-weight: bold; font-size: 18px">{{getTotalOptions(iSolution.surveys).length+getTotalOtherValidations(iSolution.surveys)}}</span>
                        <br>
                        <span :style="ats('font-size: 12px', '=', '')">Validaciones</span>
                    </v-flex>
                    <v-flex xs2  :style="ats('margin: 5px; text-align: center', '=', 'text-align: center')">
                        <!-- <span style="font-weight: bold; font-size: 18px">8</span> -->
                        <span style="font-weight: bold; font-size: 18px">{{getHappyClients(iSolution.surveys).length+getTotalOtherValidations(iSolution.surveys)}}</span>
                        <br>
                        <span :style="ats('font-size: 12px', '=', '')">Clientes</span>
                    </v-flex> 
                  </v-layout>
                </v-flex>

                <v-flex v-if="$vuetify.breakpoint.smAndDown" xs1 :style="ats('margin-top: -62px; margin-left: -30px; position: relative; z-index: 1;', '=', 'margin-top: -50px; position: relative; z-index: 1')">
                  <v-btn 
                    @click="dialog = true; solutionToDelete = iSolution._id"
                    small flat icon color="blue-grey lighten-4">
                      <v-icon small>fas fa-ellipsis-h</v-icon>
                  </v-btn>
                </v-flex>                
                
                <v-flex v-if="!$vuetify.breakpoint.smAndDown" xs1 :style="ats('margin-top: -62px; margin-left: -30px; position: relative; z-index: 1;', '=', 'margin-top: -50px; position: relative; z-index: 1')">
                  <Dropdown :class-name="'my-class'">
                    <template slot="btn">
                      <v-btn small flat icon color="blue-grey lighten-4"><v-icon small>fas fa-ellipsis-h</v-icon></v-btn>  
                    </template>
                    <template slot="body">
                      <ul style="list-style: none; padding: 0">
                        <li>
                          <span @click="dialog = true; solutionToDelete = iSolution._id">
                            Eliminar
                          </span>
                        </li>
                      </ul>
                    </template>
                  </Dropdown>         
                </v-flex>
              </v-layout>
            </div>
        </div>

        <div v-if="partComponent === 2" :style="ats('margin-bottom: 0px; margin-top: -15px; overflow-x: hidden;', '=', 'margin-bottom: 150px; margin-top: -15px')">
          <div style="position: sticky; top: 0px; z-index: 4; background: rgb(249, 249, 249); padding-top: 15px;margin-left:-4px">
            <div style="text-align: left; background: rgb(249, 249, 249); margin-left: 4px">
              <div v-if="$vuetify.breakpoint.smAndDown" style="display: flex; flex-direction: column; justify-content: center; align-items: center">
                <div><span @click="backToServicesDashboard(); dispatchAnalysis(false)" style="font-size: 20px; cursor: pointer;">Servicios </span>  </div>
                  <div style="display: flex; width: 100%; justify-content: center; align-items: center">
                    <input v-if="!activeEditionOfCategory" disabled type="text" :style="activeEditionOfCategory ? `outline: none; border-bottom: 2px solid #445964; background: transparent; font-size: 20px; color: black; width: ${((category.length)*20)}px; ` : `width: ${((category.length)*20)}px; outline: none; border-bottom: none; background: transparent; font-size: 20px; color: black`" v-model="category"/>
                    <input v-if="solution.category && activeEditionOfCategory" :disabled="!activeEditionOfCategory" type="text" :style="activeEditionOfCategory ? `outline: none; border-bottom: 2px solid #445964; background: transparent; font-size: 20px; color: black; width: ${((solution.category.length)*20)}px; ` : `width: ${((solution.category.length)*20)}px; outline: none; border-bottom: none; background: transparent; font-size: 20px; color: black`" v-model="solution.category"/>
                    <input v-if="!solution.category && activeEditionOfCategory" :disabled="!activeEditionOfCategory" type="text" :style="activeEditionOfCategory ? `outline: none; border-bottom: 2px solid #445964; background: transparent; font-size: 20px; color: black; width: ${((selectedSolution.category.length)*20)}px; ` : `width: ${((selectedSolution.category.length)*20)}px; outline: none; border-bottom: none; background: transparent; font-size: 20px; color: black`" v-model="selectedSolution.category"/>
                    <v-icon v-if="!activeEditionOfCategory" dark large style="color: grey; cursor: pointer; font-size: 15px; margin-left: -80px" @click="activeEditionOfCategory = true">fas fa-pen</v-icon>
                  </div>
                  <div>
                    <v-btn round outline color="light" v-if="activeEditionOfCategory" depressed style="text-transform: none" @click="activeEditionOfCategory = false; selectedSolution ? selectedSolution.category = (categoryNew) : solution.category = (categoryNew)">Cancelar</v-btn>
                    <v-btn round outline color="teal" v-if="activeEditionOfCategory" depressed style="text-transform: none" @click="selectedSolution ? updateCategory() : activeEditionOfCategory = false; activeEditionOfCategory = false">Guardar</v-btn>                    
                  </div>
              </div>              
              <div v-if="!$vuetify.breakpoint.smAndDown"  style="display: flex">
                <div><span @click="backToServicesDashboard(); dispatchAnalysis(false)" style="font-size: 30px; cursor: pointer;">Servicios </span>  </div>
                  <div style="display: flex; width: 100%;">
                    <span style="font-size: 30px; margin-left: 3px; margin-right: 3px">–</span>
                    <input v-if="!activeEditionOfCategory" disabled type="text" :style="activeEditionOfCategory ? `outline: none; border-bottom: 2px solid #445964; background: transparent; font-size: 30px; color: black; width: ${((category.length)*20)}px; ` : `width: ${((category.length)*20)}px; outline: none; border-bottom: none; background: transparent; font-size: 30px; color: black`" v-model="category"/>
                    <input v-if="solution.category && activeEditionOfCategory" :disabled="!activeEditionOfCategory" type="text" :style="activeEditionOfCategory ? `outline: none; border-bottom: 2px solid #445964; background: transparent; font-size: 30px; color: black; width: ${((solution.category.length)*20)}px; ` : `width: ${((solution.category.length)*20)}px; outline: none; border-bottom: none; background: transparent; font-size: 30px; color: black`" v-model="solution.category"/>
                    <input v-if="!solution.category && activeEditionOfCategory" :disabled="!activeEditionOfCategory" type="text" :style="activeEditionOfCategory ? `outline: none; border-bottom: 2px solid #445964; background: transparent; font-size: 30px; color: black; width: ${((selectedSolution.category.length)*20)}px; ` : `width: ${((selectedSolution.category.length)*20)}px; outline: none; border-bottom: none; background: transparent; font-size: 30px; color: black`" v-model="selectedSolution.category"/>
                    <v-icon v-if="!activeEditionOfCategory" dark large style="color: grey; cursor: pointer; font-size: 20px" @click="activeEditionOfCategory = true">fas fa-pen</v-icon>
                    <v-btn round outline color="light" v-if="activeEditionOfCategory" depressed style="text-transform: none" @click="activeEditionOfCategory = false; selectedSolution ? selectedSolution.category = (categoryNew) : solution.category = (categoryNew)">Cancelar</v-btn>
                    <v-btn round outline color="teal" v-if="activeEditionOfCategory" depressed style="text-transform: none" @click="selectedSolution ? updateCategory() : activeEditionOfCategory = false; activeEditionOfCategory = false">Guardar</v-btn>
                  </div>
              </div>
            </div>
            <br>
            <div v-if="$vuetify.breakpoint.smAndDown" style="width: 100%; height: 50px; display: flex; justify-content: space-around; align-items: center; background: rgb(249, 249, 249);"> <!--z-index: 5-->
                <div style="text-align: center; width: 100%;">
                    <span :class="selectedServiceMenu === 'service' ? 'activateMenu' : selectedServiceMenu" @click="dispatchAnalysis(false); selectedServiceMenu = 'service'; goToTop(); subPartComponent = 0; notClick = [];" :style="`cursor: pointer; color: ${selectedServiceMenu === 'service' ? '#207ac0' : 'grey'}`">Servicio</span>
                </div>
                <div style="text-align: center; width: 100%;">
                    <span :class="selectedServiceMenu === 'survey' ? 'activateMenu' : selectedServiceMenu" @click="dispatchAnalysis(false); selectedServiceMenu = 'surveyService'; goToTop(); selectedSolution ? selectedSolution.surveys.length === 0 ? firstOne = true : firstOne = false : false;selectSolutionToShow(getCompanyData.solutions.find(solution => solution.category === selectedSolution.category), 1); selectedSolution.surveys.length === 0 ? isNew = true : isNew = false;" :style="`cursor: pointer; color: ${selectedServiceMenu === 'survey' ? '#207ac0' : 'grey'}`">Encuestas</span>
                </div>
                <!-- CHECK THIS selectedSolution.category ? selectedSolution.category : solution.category check this if work... -->
                <div style="text-align: center; width: 100%;"> <!--@click="selectedServiceMenu = 'distribution'; subPartComponent = 2">--> 
                    <span :class="selectedServiceMenu === 'distribution' ? 'activateMenu' : selectedServiceMenu"  @click=" dispatchAnalysis(false); selectedServiceMenu = 'distribution'; goToTop(); subPartComponent = 2; notClick = []; textToCopy = `yesthem.com/${getCompanyData.identifier}/${selectedSolution.category ? (selectedSolution.category.toLowerCase()).replace(/\s/g, '') : (solution.category.toLowerCase()).replace(/\s/g, '')}/validate`;" :style="`cursor: pointer; margin-left: 10px; color: ${selectedServiceMenu === 'distribution' ? '#207ac0' : 'grey'}`">Distribucion</span>
                </div>
                <div style="text-align: center; width: 100%;"> <!--@click="selectedServiceMenu = 'distribution'; subPartComponent = 2">--> 
                    <span :class="selectedServiceMenu === 'analysis' ? 'activateMenu' : selectedServiceMenu" @click="dispatchAnalysis(true); selectedServiceMenu = 'analysis'; goToTop(); subPartComponent = 3; notClick = []" :style="`cursor: pointer; margin-left: 10px; color: ${selectedServiceMenu === 'analysis' ? '#207ac0' : 'grey'}`">Análisis</span>
                </div>                
                <!-- <v-flex align="left">
                  <button type="button" class="v-btn v-btn--flat theme--light" style="background-color: rgb(46, 118, 117); color: white; text-transform: none; position: relative;"><div class="v-btn__content"><i aria-hidden="true" class="v-icon v-icon--left  fas fa-sign-out-alt theme--dark" style="font-size: 12px;"></i><span style="font-size: 12px;">Vista Previa</span></div></button>
                </v-flex> -->
            </div>            
            <v-layout v-if="!$vuetify.breakpoint.smAndDown" align-start justify-start row fill-height style="width: 1098px; margin-left: 4px; height: 50px; background: rgb(249, 249, 249); margin-top: 10px;"> <!--z-index: 5-->
                <v-flex xs1 style="text-align: left">
                    <span :class="selectedServiceMenu === 'service' ? 'activateMenu' : selectedServiceMenu" @click="dispatchAnalysis(false); selectedServiceMenu = 'service'; goToTop(); subPartComponent = 0; notClick = [];" :style="`cursor: pointer; color: ${selectedServiceMenu === 'service' ? '#207ac0' : 'grey'}`">Servicio</span>
                </v-flex>
                <v-flex xs2 style="text-align: left; margin-left: -7px">
                    <span :class="selectedServiceMenu === 'survey' ? 'activateMenu' : selectedServiceMenu" @click="dispatchAnalysis(false); selectedServiceMenu = 'surveyService'; goToTop(); selectedSolution ? selectedSolution.surveys.length === 0 ? firstOne = true : firstOne = false : false;selectSolutionToShow(getCompanyData.solutions.find(solution => solution.category === selectedSolution.category), 1); selectedSolution.surveys.length === 0 ? isNew = true : isNew = false;" :style="`cursor: pointer; color: ${selectedServiceMenu === 'survey' ? '#207ac0' : 'grey'}`">Encuestas sobre el Servicio</span>
                </v-flex>
                <!-- CHECK THIS selectedSolution.category ? selectedSolution.category : solution.category check this if work... -->
                <v-flex xs1 style="text-align: left; margin-left: 6px"> <!--@click="selectedServiceMenu = 'distribution'; subPartComponent = 2">--> 
                    <span :class="selectedServiceMenu === 'distribution' ? 'activateMenu' : selectedServiceMenu"  @click=" dispatchAnalysis(false); selectedServiceMenu = 'distribution'; goToTop(); subPartComponent = 2; notClick = []; textToCopy = `yesthem.com/${getCompanyData.identifier}/${selectedSolution.category ? (selectedSolution.category.toLowerCase()).replace(/\s/g, '') : (solution.category.toLowerCase()).replace(/\s/g, '')}/validate`;" :style="`cursor: pointer; margin-left: 10px; color: ${selectedServiceMenu === 'distribution' ? '#207ac0' : 'grey'}`">Distribucion</span>
                </v-flex>
                <v-flex xs2 style="text-align: left; margin-left: 15px;"> <!--@click="selectedServiceMenu = 'distribution'; subPartComponent = 2">--> 
                    <span :class="selectedServiceMenu === 'analysis' ? 'activateMenu' : selectedServiceMenu" @click="dispatchAnalysis(true); selectedServiceMenu = 'analysis'; goToTop(); subPartComponent = 3; notClick = []" :style="`cursor: pointer; margin-left: 10px; color: ${selectedServiceMenu === 'analysis' ? '#207ac0' : 'grey'}`">Analisis y Publicacion</span>
                </v-flex>                
                <!-- <v-flex align="left">
                  <button type="button" class="v-btn v-btn--flat theme--light" style="background-color: rgb(46, 118, 117); color: white; text-transform: none; position: relative;"><div class="v-btn__content"><i aria-hidden="true" class="v-icon v-icon--left  fas fa-sign-out-alt theme--dark" style="font-size: 12px;"></i><span style="font-size: 12px;">Vista Previa</span></div></button>
                </v-flex> -->
            </v-layout>
            <div v-if="$vuetify.breakpoint.smAndDown" :style="`border-bottom:1px solid #d4d4d4; width:${subPartComponent===2 ? '99%' : subPartComponent===3 ? '99%' : '99%'}; margin-left: ${subPartComponent===2?'4px':subPartComponent===3?'4px':'4px'} `"></div>
            <div v-if="!$vuetify.breakpoint.smAndDown" :style="`border-bottom:1px solid #d4d4d4; width:${subPartComponent===2 ? '1097px' : subPartComponent===3 ? '1097px' : '1098px'}; margin-left: ${subPartComponent===2?'5px':subPartComponent===3?'5px':'4px'} `"></div>
          </div>
            <!-- <div style="border-top: 1px solid black; width: 100%"></div> -->
            <!-- <br> -->
            <v-layout align-start justify-start row fill-height style="margin-top: -5px">
                <div v-if="subPartComponent === 0" 
                :style="ats('width: 100%; height: 100%; position: relative; z-index: 1; background-color: white; border-left: 1px solid #cecece;border-bottom: 1px solid #cecece;border-right: 1px solid #cecece; border-radius: 1px;-webkit-box-shadow: 0px 2px 8px -4px rgba(0,0,0,0.29); -moz-box-shadow: 0px 2px 8px -4px rgba(0,0,0,0.29); box-shadow: 0px 2px 8px -4px rgba(0,0,0,0.29);', '=', 'width: 1098px; height: 500px; position: relative; z-index: 1; background-color: white; border-left: 1px solid #cecece;border-bottom: 1px solid #cecece;border-right: 1px solid #cecece; border-radius: 1px;-webkit-box-shadow: 0px 2px 8px -4px rgba(0,0,0,0.29); -moz-box-shadow: 0px 2px 8px -4px rgba(0,0,0,0.29); box-shadow: 0px 2px 8px -4px rgba(0,0,0,0.29);')">
                  <div v-if="loadingSave" :style="ats('position: absolute; z-index: 3; width: 100%; height: 100%; background-color: #f2f2f2; opacity: 0.8; border-radius: 1px;', '=', 'position: absolute; z-index: 3; width: 100%; height: 500px; background-color: #f2f2f2; opacity: 0.8; border-radius: 1px;')">
                      <div style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);">
                        <div v-if="!showCheckSave"><span>Guardando Cambios</span></div>
                        <div v-if="showCheckSave"><span>Guardado con exito</span></div>
                        <v-icon v-if="showCheckSave" dark large style="color: #82c91e; font-size: 35px;">fas fa-check-circle</v-icon>
                        <v-progress-circular
                          v-if="!showCheckSave"
                          indeterminate
                          color="primary"
                        ></v-progress-circular>
                      </div>
                  </div>
                  <v-layout align-start justify-start column fill-height style="padding: 25px;">
                    <v-layout row wrap fill-height align-top :class="ats('', '=', 'mt-3')" @mouseover="mouseOverAction(2, false)" style="width: 100%;">
                      <v-flex xs12 md2 text-xs-left :class="ats('pb-2', '=', 'pt-0')">
                          <div class="blue-grey--text text--darken-2 font-weight-bold subheading">Servicio</div>
                          <div class="blue-grey--text text--darken-2 font-weight-bold caption">Breve descripción</div>
                      </v-flex>
                      <v-flex xs12 md6 :class="ats('', '=', 'pl-4')">
                        <v-textarea
                          v-if="create"
                          v-model="solution.description"
                          :rows="ats('4', '=', '3')"
                          placeholder="Escribe tu descripción"
                          :rules="descriptionRules"
                          :disabled="getStatus.loading"
                          outline
                          no-resize
                          style="background-color: white; font-size: 14px !important; color: #555555"
                          required
                          counter="350"
                          maxlength="350"
                          validate-on-blur
                          @mouseover="mouseOverAction(2, false)"
                        >
                        </v-textarea>
                        <v-textarea
                          v-if="!create"
                          v-model="selectedSolution.description"
                          :rows="ats('4', '=', '3')"
                          counter="350"
                          maxlength="350"
                          placeholder="Escribe tu descripción"
                          :rules="descriptionRules"
                          :disabled="getStatus.loading"
                          outline
                          no-resize
                          style="background-color: white; font-size: 14px !important; color: #555555"
                          required
                          validate-on-blur
                          @mouseover="mouseOverAction(2, false)"
                        >
                        </v-textarea>                        
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap fill-height align-top mt-3 pb-5 style="width: 100%" @mouseover="mouseOverAction(5, false)" @mouseleave="mouseOverAction(5, true)">
                      <v-flex xs12 md2 text-xs-left :class="ats('pt-5 pb-2', '=', 'pt-0')">
                          <div class="blue-grey--text text--darken-2 font-weight-bold subheading">Imagen</div>
                          <div class="blue-grey--text text--darken-2 caption">Añade tu imagen</div>
                      </v-flex>
                      <v-flex xs12 md8 :class="ats('text-xs-left mt-2', '=', 'pl-4 text-xs-left')">
                          <v-card flat :color="hover.logo ? 'black' : 'grey lighten-3'" style="cursor: pointer; width: 150px" @mouseover="hover.logo = true" @mouseleave="hover.logo = false">
                            <v-img class="contain" :src="!solution.logo.url ? '/static/images/uploads/' + selectedSolution.image : `${solution.logo.url}#159`" height="150">
                              <v-layout v-if="hover.logo" style="height: 150px; opacity: 0.75" class="black" column fill-height align-center justify-center @click="onFocusLogo(1)">
                                <v-icon dark large>add_a_photo</v-icon>
                                <span class="white--text subheading">Editar</span>
                              </v-layout>
                            </v-img>
                            <!-- {{solution.logo.url}} -->
                          </v-card>
                          <!-- <v-btn small depressed :disabled="getStatus.loading" color="blue-grey lighten-4" :class="ats('blue-grey--text text--darken-4 font-weight-bold mx-0', '=', 'blue-grey--text text--darken-4 font-weight-bold')" @click="onFocusLogo(i)">{{solution.logo.url ? 'Cambia' : 'Añade'}} tu imagen</v-btn> -->
                          <div v-if="solution.logo.status.error" class="v-messages error--text">{{solution.logo.status.message}}</div>
                          <!-- <div :class="ats('px-2 py-3', '', 'pa-3')" v-if="solution.logo.url">
                            <v-badge overlap>
                              <span slot="badge"><v-icon small color="white">edit</v-icon></span>
                              <v-avatar :disabled="getStatus.loading" ref="logo" size="64" style="cursor: pointer" :color="hover.logo ? 'black' : 'grey lighten-3'" @mouseover="hover.logo = !hover.logo" @mouseleave="hover.logo = !hover.logo" @click="onFocusLogo(i)">
                                <img v-if="!getStatus.loading" :src="solution.logo.url"/>
                              </v-avatar>
                            </v-badge>
                          </div> -->
                        <!--<input ref="fileInputLogo" type="file" name="logo" style="display: none !important" accept=".png, .jpg" @change="onFileChangeLogo">-->
                        <input ref="fileInputLogo" type="file" name="logo" style="display: none !important" accept="*" @change="onFileChangeLogo">
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap fill-height align-top @mouseleave="mouseOverAction(2, true)" style="width: 100%">
                      <v-flex xs12 md2 text-xs-left :class="ats('', '=', 'pt-4')">
                          <div class="blue-grey--text text--darken-2 font-weight-bold subheading">Servicio URL </div>
                      </v-flex>
                      <v-flex xs12 md7 :class="ats('', '=', 'pl-4')">
                        <v-text-field
                          v-if="!create"
                          v-model="solutionUrl"
                          single-line
                          disabled
                          readonly
                          style="text-transform: lowercase"
                        >
                        </v-text-field>
                        <v-text-field
                          v-if="create"
                          v-model="solutionUrl"
                          single-line
                          disabled
                          readonly
                          style="text-transform: lowercase"
                        >
                        </v-text-field>    
                      </v-flex>
                    </v-layout>                    
                    <div :style="ats('width: 100%; margin-top: 30px;', '=', 'width: 100%;display: flex;justify-content: flex-end;')">
                      <v-btn v-if="!create" :disabled="selectedSolution.description.length > 350" @click="selectedSolution ? selectedSolution.surveys.length === 0 ? firstOne = true : firstOne = false : false; updateSolution()" flat style="background-color: green; color: white; text-transform: none;">
                          <span>Guardar y Continuar</span>
                      </v-btn>                      
                      <v-btn v-if="create" :disabled="!solution.description || !solution.logo.url || !solutionUrl || solution.description.length > 350" @click="firstOne = true; updateSolution(1);" flat style="background-color: green; color: white; text-transform: none;">
                          <span>Guardar y Continuar</span>
                      </v-btn>
                    </div>
                  </v-layout>
                </div>
                <div v-if="subPartComponent === 1 && !isNew" xs8 style="height: 100%; width: 1098px">
                    <Accordion
                      v-for="(survey, index) in selectedSolution.surveys" v-bind:key="index"
                      :survey="survey"
                      @dispatchShowOptionsToCreateSurveys="dispatchShowOptionsToCreateSurveys($event)"
                      @dispatchEditSurvey="dispatchEditSurvey($event)"
                      :surveyDescription="survey.description ? survey.description : 'Haga clic para escribir el título de la encuesta'" 
                      :isFirst="index === 0"
                      :isLast="index === selectedSolution.surveys.length-1"
                      @cancelAccordion="cancelAccordion($event)"
                      :isNew='false'
                      @dispatchOpen="dispatchOpen($event)"
                      :index='index'
                      :isUnique="selectedSolution.surveys.length === 1"
                      @dispatchPreview="dispatchPreview($event)"
                      :showBoxes="false"
                      :justShow="false"
                      :notClick="false"
                      :buttonDisabled="notClick.every(item => !item.open)"
                      @populateBeforeSurveyRemove="populateBeforeSurveyRemove($e)"
                      :saveSurvey="saveSurvey"
                    />
                </div>
                <div v-if="subPartComponent === 1 && isNew" xs8 style="height: 100%; width: 1098px">
                    <Accordion
                      v-for="(survey, index) in selectedSolution.surveys" v-bind:key="index"
                      :index="index"
                      @dispatchEditSurvey="dispatchEditSurvey($event)"
                      :survey="survey"
                      @dispatchShowOptionsToCreateSurveys="changeLastAccordion = true; dispatchShowOptionsToCreateSurveys($event)"
                      :surveyDescription="survey.description ? survey.description : 'Haga clic para escribir el título de la encuesta'" 
                      :isFirst="index === 0"
                      :isLast="!changeLastAccordion ? index === selectedSolution.surveys.length-1 : false"
                      :isUnique="selectedSolution.surveys.length===1"
                      @populateBeforeSurveyRemove="populateBeforeSurveyRemove($e)"
                      :isNew='false'
                      :showBoxes="false"
                      :justShow='true'
                      :saveSurvey="saveSurvey"
                      :notClick="true"
                    />
                    <!-- <br/> -->
                    <Accordion
                      @dispatchShowCreateQuestionFromScratch="dispatchShowCreateQuestionFromScratch($event)"
                      @dispatchShowCreateFromAQuestion="dispatchShowCreateFromAQuestion($event)"
                      @dispatchSaveSurvey="dispatchSaveSurvey($event)"
                      @dispatchPreview="dispatchPreview($event)"
                      @cancelAccordion="cancelAccordion($event)"
                      v-if="showAccordion"
                      :isUnique="selectedSolution.surveys.length===0||!selectedSolution"
                      :firstOne="firstOne"
                      :isLast="true"
                      :surveyDescription="survey.description ? survey.description : 'Haga clic para escribir el título de la encuesta'"
                      :question="survey.question"
                      :category="solution.category"
                      :showBoxes="showBoxes"
                      :restartOptions="restartOptions"
                      @populateBeforeSurveyRemove="populateBeforeSurveyRemove($e)"
                      :saveSurvey="saveSurvey"
                      :isNew='true'
                    />      
                </div>
                <v-flex v-if="subPartComponent === 2" :class="ats('xs12', '=', 'xs10')" :style="ats('width: 100%', '=', 'width: 1098px')">
                    <div v-if="!acceptTerms" :style="`width: ${ats('100%', '=', '1098px')}; font-weight: bold; background: white; font-size: 16px; padding: 10px; text-align: left; border-bottom: 1px solid rgb(236, 236, 236); border-right: 1px solid rgb(206, 206, 206); border-left: 1px solid rgb(206, 206, 206); box-shadow: rgba(0, 0, 0, 0.29) 0px 2px 8px -4px`">
                      <span>Recuerda</span>
                    </div>                  
                    <div :style="`text-align: center; width: ${ats('100%', '=', '1098px')}; height: 100%; padding: ${acceptTerms ? '50px' : '20px'}; background: white; border-bottom: 1px solid #cecece;border-left: 1px solid #cecece;border-right: 1px solid #cecece; border-radius: 1px;-webkit-box-shadow: 0px 2px 8px -4px rgba(0,0,0,0.29); -moz-box-shadow: 0px 2px 8px -4px rgba(0,0,0,0.29); box-shadow: 0px 2px 8px -4px rgba(0,0,0,0.29);`">
                      <div v-if="!acceptTerms" style="width: 100%; height: 100%;">
                        <div style="text-align: left">
                          <div>
                            <span>Una vez empieces a recibir validaciones <span style="color: red">no podrás cambiar</span> lo siguiente:</span>
                          </div>

                          <br/>
                          
                          <div :style="ats('width: 100%; background: #f2f6f9; padding: 15px', '=', 'width: 650px; background: #f2f6f9; padding: 15px')">
                            <ul>
                              <li>Editar opciones de respuesta</li>
                              <li>Editar la pregunta de la encuesta</li>
                            </ul>

                            <br/>

                            <div>
                              <span style="font-style: italic">Revisa por favor las opciones de respuesta, titulo y pregunta para asegurarte que todo está correcto.</span>
                            </div>
                          </div>

                          <br/>

                          <div>
                            <span><span style="color: green">Si podrás cambiar </span>lo siguiente:</span>
                          </div>

                          <br/>

                          <div :style="ats('width: 100%; background: #f2f6f9; padding: 15px', '=', 'width: 500px; background: #f2f6f9; padding: 15px')">
                            <ul>
                              <li>Eliminar Opciones de Respuesta</li>
                              <li>Eliminar Clientes que han validado</li>
                            </ul>
                          </div>  

                          <div style="margin-top: 15px;">
                            <input type="checkbox" v-model="distTerms" name="terms" value="terms"> Leido y entendido<br>
                          </div>

                          <div style="margin-top: 15px; margin-left: -8px">
                            <v-btn depressed :disabled="!distTerms" @click="acceptTerms = true" style="background: #439854; text-transform: none; font-weight: bold; color: white">
                              Continuar
                            </v-btn>
                          </div>
                        </div> <!--recuerda-->
                      </div>
                      <div v-if="acceptTerms" style="width: 100%; height: 100%;">
                        <div @click="acceptTerms = false" align="right" style="margin-top: -29px; margin-right: -22px;">
                          <v-icon style="color: #ffae42; font-size: 18px; cursor: pointer">fas fa-exclamation-circle</v-icon>
                        </div>
                        <span style="font-size: 30px;">Distribuye tu Encuesta</span>
                        <div style="text-align: center;">
                          <v-icon center style="color: #2e7675; font-size: 40px; margin-top: 30px;">fas fa-envelope</v-icon>
                          <br>
                            <span style="font-weight: bold; color: #2e7675; font-size: 20px;">Correo electronico</span>
                          </div>
                        <br>
                        <input ref="linkToCopy" v-model="textToCopy" @click="copyLinkToClipBoard()" style="width: 100%; text-align: center; font-size: 20px; cursor: pointer; background: white; border: none; outline: none; font-weight: bold; color: grey;"/>
                      </div>
                    </div>
                </v-flex>
                <v-flex v-if="subPartComponent === 3" xs12 style="height: 100%">
                  <Analysis :solution="selectedSolution" @dispatchEditSurvey="dispatchEditSurvey($event, 1)"/>
                </v-flex>
            </v-layout>
        </div>

        <v-dialog v-model="showAddService"
            lazy
            width="865px"
            style="z-index: 9999 !important; margin-top: -10%;background:rgb(242, 243, 242)"
            :fullscreen="$vuetify.breakpoint.smAndDown"
            >
            <v-card :style="ats('background: rgb(242, 243, 242)', '=', 'height: 700px; background:rgb(242, 243, 242)')">
                <div v-if="!$vuetify.breakpoint.smAndDown" align="right" style="padding-top: 20px; padding-right: 68px;"><span style="font-family: Arial; color: #222222; font-weight: bold; font-size: 24px; text-align: right">{{solution.category === '' ? 'Servicio Vacio' : solution.category}}</span></div>
                <div v-if="$vuetify.breakpoint.smAndDown" align="left" style="padding: 15px"><span style="font-family: Arial; color: #222222; font-weight: bold; font-size: 24px; text-align: right">{{solution.category === '' ? 'Servicio Vacio' : solution.category}}</span></div>
                <div :style="ats('padding: 15px', '=', 'padding: 40px 68px 68px;')">
                    <hr style="border: 0.5px solid #cecece"/><br/>
                    <v-layout align-center justify-center row fill-height>
                        <v-flex xs3 :style="ats('margin-right: 10px', '=', '')">
                            <div :style="ats('width: 80px; height: 80px; background-color: black; text-align: center; display: flex; justify-content: center; align-items: center;', '=', 'width: 100px; height: 100px; background-color: black; text-align: center')">
                                <v-icon center :style="ats('white; font-size: 40px; margin-top: 0px;', '=', 'white; font-size: 40px; margin-top: 30px;')">add</v-icon>
                            </div>
                        </v-flex>
                        <v-flex>
                            <div style="margin-top: -12px; text-align: left; margin-left: 0">
                                <span style="font-size: 22px; color: #222222; font-weight: bold;  text-align: left">{{solution.category === '' ? 'Servicio Vacio' : solution.category}}</span>
                                <br>
                                <div style="padding-bottom: 10px">
                                    <input type="text" placeholder="Nombre de servicio" v-model="solution.category"
                                      :style="ats('width: 100%; font-size: 17px; color: #a7a5ab; background: white; outline: none; border: 1px solid rgb(206, 206, 206); height: 35px; border-radius: 2px;', '=', 'width: 60%; font-size: 17px; color: #a7a5ab; background: white; outline: none; border: 1px solid rgb(206, 206, 206); height: 35px; border-radius: 2px;')"
                                    >
                                </div>
                                <span style="ats('font-size: 12px; color: #a7a5ab', '=', 'font-size: 14px; color: #a7a5ab')">No te preocupes, siempre puedes cambiar esto despues</span>                                
                            </div>
                        </v-flex>
                    </v-layout>
                    <br/>
                    <hr style="border: 0.5px solid #cecece; margin-bottom: 5px;"/>
                    <br v-if="!$vuetify.breakpoint.smAndDown"/>
                    <br v-if="!$vuetify.breakpoint.smAndDown"/>
                    <v-layout fill-height :class="ats('column', '=', 'row align-end justify-end')" :style="ats('', '=', 'height: 200px')">
                        <v-flex xs8 style="margin-left: 20px;margin: auto; padding-left: 0px;">
                            <div style="text-align: left">
                                <span style="font-family: Arial; font-weight: bold; color: #222222; text-align: left; font-size: 18px">Nombra tu servicio</span>
                                <br/>
                                <div :style="ats('margin-top: 10px;', '=', 'margin-top: 10px; padding-right: 108px')">
                                  <span style=" font-size: 14px; color: #222222">1. ¿Tiene vuestra pagina web alguna de estas secciones?</span>
                                  <br>
                                  <ul style="margin-top: 10px; margin-bottom: 12px">
                                    <li style=" font-size: 14px; color: #222222">Servicios</li>
                                    <li style=" font-size: 14px; color: #222222">Soluciones</li>
                                    <li style=" font-size: 14px; color: #222222">Productos</li>
                                  </ul>
                                  <!-- <br> -->
                                  <span style=" font-size: 14px; color: #222222">2. Haz click en el menu donde hableis de servicios, soluciones o productos e igual nombra tu servicio</span>
                                  <br><br>
                                  <span style=" font-size: 14px; color: #222222">3. Podras mantener asi la estructura de todos los servicios que ofreces en Yes Them</span>
                                </div>
                            </div>
                        </v-flex>
                        <v-flex :style="ats('margin-top: 15px', '=', 'margin-right: 0px')">
                            <div :style="ats('padding: 12px 17px 14px;border: 1px solid rgb(206, 206, 206);text-align: left;border-radius: 2px;height: 100%;width: 100%;', '=', 'padding: 12px 17px 14px; border: 1px solid #cecece; text-align: left; border-radius: 2px; height: 205px; width: 267px;')">
                                <span style="font-family: Arial; font-weight: bold; font-size: 16px; color: #222222">El Compromiso Yes Them</span>
                                <div style="margin-bottom: 8px"><span style=" font-size: 14px; color: #666666"><span style="color: rgb(31, 119, 188); font-weight: bold; color: blue">//</span> Que mostreis la validacion de terceos a vuestros productos y servicios</span></div>
                                <div><span style=" font-size: 14px; color: #666666"><span style="color: rgb(31, 119, 188); font-weight: bold; color: blue">//</span> Esta validacion de terceros es lo que un cliente poencial necesita muchas veces para tomar una decision de compra</span></div>
                            </div>
                            <div :align="ats('right', '=', '')" :style="ats('margin-top: 20px', '=', 'position: absolute; bottom: 15px; right: 45px')">
                                <v-btn flat @click="showAddService = false; showBoxes = true; " style="text-transform: none">
                                    <span style="font-family: Arial; font-weight: bold; color: #222222; font-size; 16px">Cancelar</span>
                                </v-btn>
                                <v-btn flat :disabled="solution.category === ''" @click="showBoxes = true; showAddService = false; partComponent = 2; create = true; isNew = true; subPartComponent = 0; categoryNew = solution.category; selectedServiceMenu = 'service'; category = solution.category" style="width: 130px; background-color: rgb(66, 149, 84); color: white; text-transform: none;">
                                    <span style="font-family: Arial; color: white; font-weight: bold;">Crear Servicio</span>
                                </v-btn>
                            </div>
                        </v-flex>
                    </v-layout>
                </div>
            </v-card>
        </v-dialog>

        <v-dialog v-model="showCreateFromAQuestion"
            lazy
            width="856"
            style="z-index: 9999 !important; margin-top: -10%;"
            :fullscreen="$vuetify.breakpoint.smAndDown"
            >
            <v-card style="height: 695px; background-color: #f2f3f2">
              <div style="width: 100%; height: 75px; background: rgb(132, 85, 159); padding: 20px">
                <div align="left" style="margin-left: 30px">
                    <span style="font-weight: bold; font-size: 25px; color: white">{{solution.category || selectedSolution.category}} - Encuesta por Defecto</span>
                </div>
              </div>              
                <!-- <div align="right" style="padding-top: 10px; padding-right: 10px">
                    <span style="font-weight: bold; font-size: 20px;">{{solution.category}}</span>
                </div> -->
                <br>
                <div :style="ats('padding: 15px; text-align: left', '=', 'padding: 0px 50px 15px 50px; text-align: left')">
                  <div style="text-align: left">
                    <span :style="ats('font-weight: bold; font-size: 14px; color: #425056', '=', 'font-weight: bold; font-size: 16px; color: #425056')">
                      La primera encuesta es predeterminada sobre los beneficios para tus clientes del servicio que prestaste.
                    </span>
                    <br><br>
                    <span :style="ats('font-size: 14px; color: #404040', '=', 'font-size: 16px; color: #404040')">
                      El objetivo es que muestras de una manera visual y respaldada por tus clientes por que fue util vuestra ayuda
                    </span>
                  </div>
                  <div style="padding: 12px 0 12px 0px;"><hr style="border: 0.5 px solid #cecece"></div>
                  <div style="text-align: left">
                    <span style="font-family: Arial; text-align: left; font-weight: bold; font-size: 18px; color: #a7a5ab">Encuesta 1</span>
                  </div>
                  <br>
                  <v-layout align-start justify-start column fill-height style="">
                      <!-- <v-flex xs2 style="margin-top: -18px">
                          <div style="width: 100px; height: 100px; background-color: black; text-align: center">
                              <v-icon center style="color: white; font-size: 40px; margin-top: 30px;">fas fa-tools</v-icon>
                          </div>
                      </v-flex> -->
                      <v-flex>
                        <v-layout align-center justify-center :class="ats('column', '=', 'row')" fill-height>
                          <v-flex xs2><span style="font-family: Arial; font-size: 14px; font-weight: bold; color: #404040">Titulo</span></v-flex>
                          <div :style="ats('margin-left: 0px; width: 100%', '=', 'margin-left: 15px; width: 800px')">
                            <div style="padding-bottom: 10px">
                                <input disabled type="text" placeholder="Beneficios de Nuestra Ayuda"
                                    :style="`width: ${ats('100%', '=', '80%')};font-size: 17px; color: #a7a5ab;outline: none; border: 1px solid #cecece;height: 35px; border-radius: 2px;`"
                                >
                            </div>
                          </div>
                        </v-layout>
                      </v-flex>
                      <br/>
                      <v-flex>
                        <v-layout align-center justify-center :class="ats('column', '=', 'row')" fill-height>
                          <v-flex xs2><span style="font-family: Arial; font-size: 14px; font-weight: bold; color: #404040">Pregunta</span></v-flex>
                          <div :style="ats('margin-left: 0px; width: 100%', '=', 'margin-left: 15px; width: 800px')">
                            <div style="padding-bottom: 10px">
                                <input disabled type="text" placeholder="¿Cuales fueron los aspectos mas valiosos del servicio prestado?"
                                    :style="`width: ${ats('100%', '=', '80%')};font-size: 17px; color: #a7a5ab;outline: none; border: 1px solid #cecece;height: 35px; border-radius: 2px;`"
                                >
                            </div>
                          </div>
                        </v-layout>
                      </v-flex>
                      <br/>
                      <v-flex style="margin-bottom: 8px;">
                        <v-layout align-center justify-center row fill-height>
                          <v-flex :class="ats('xs5', '=', 'xs2')"><span style="font-family: Arial; font-size: 14px; font-weight: bold; color: #404040">Opciones de <br> Respuesta</span></v-flex>
                          <div style="margin-left: 15px; width: 100%">
                            <span style="font-family: Arial; font-size: 14px; color: #595959">Tendras la posibilidad de senalar los 7 aspectos mas beneficiosos de tu servicio</span>
                          </div>
                        </v-layout>
                      </v-flex>  
                      <br/>
                      <v-flex>
                        <v-layout align-center justify-center row fill-height>
                          <v-flex :class="ats('xs5', '=', 'xs2')"><span style="font-family: Arial; font-size: 14px; font-weight: bold; color: #404040">Encuestados</span></v-flex>
                          <div style="margin-left: 15px; width: 100%">
                            <span style="font-family: Arial; font-size: 14px; color: #595959">Cliente final que ya ha contratado vuestros productos o servicios</span>
                          </div>
                        </v-layout>
                      </v-flex>                              
                  </v-layout>                    
                </div>                 
                <div style="position: absolute; bottom: 15px; right: 15px">
                    <v-btn flat @click="showCreateFromAQuestion = false; subPartComponent = 1 ; isNew =true" style="text-transform: none">
                        <span style="font-family: Arial; font-size: 16px; font-weight: bold; color: #737373">Cancelar</span>
                    </v-btn>
                    <v-btn flat @click="survey.question = '¿Cuales fueron los aspectos mas valiosos del servicio prestado?'; firstOne = false; showCreateFromAQuestion = false; survey.description='Beneficios de Nuestra Ayuda'; subPartComponent = 1 ; isNew = true; showBoxes = false" style="background-color: green; color: white; text-transform: none;">
                        <span style="color: white; font-weight: bold; font-family: Arial; font-size: 16px;">Crear Encuesta</span>
                    </v-btn>
                </div>
            </v-card>
        </v-dialog>

        <v-dialog v-model="showCreateQuestionFromScratch"
            lazy
            width="856"
            style="z-index: 9999 !important; margin-top: -10%;"
            :fullscreen="$vuetify.breakpoint.smAndDown"
            >
            <v-card :style="`height: ${showCreateQuestionFromScratch?'710px' : '0'}; background-color: #f2f3f2`">
              <div style="padding: 10px 0px 10px 10px; text-align: left">
                <v-layout align-center justify-center row fill-height style="margin-left: 20px">
                  <v-flex xs8>
                    <span style="font-weight: bold; font-size: 18px;">Continua explicando aspectos de tu servicio a través de encuestas</span>
                  </v-flex>
                  <v-flex style="margin-bottom: 20px;">
                    <span style="font-weight: bold; font-size: 20px; margin-left: -20px;">{{selectedSolution.category}}</span>
                  </v-flex>
                </v-layout>
                  <v-layout align-center justify-center row fill-height style="margin-left: 20px">
                    <v-flex xs8>
                      <div style="padding-bottom: 10px">
                          <input type="text" placeholder="Titulo de la Encuesta" v-model="survey.description"
                              style="width: 80%;outline: none; border: 2px solid #cecece;height: 35px; border-radius: 2px;"
                          >
                      </div> 
                    </v-flex>
                    <v-flex>
                      <div style="margin-left: -20px;padding: 20px; padding-top: 50px;border: 2px solid #cecece; text-align: center; border-radius: 2px; height: 200px; width: 220px;">
                          <span>
                              ¿Tienes pàgina web?
                              <br/>Nombra tu primer servicio igual que en el menu que tengas ahi
                          </span>
                      </div>                        
                    </v-flex>
                  </v-layout>                    
                </div>             
                <div style="position: absolute; bottom: 15px; right: 15px">
                    <v-btn flat @click="showCreateQuestionFromScratch = false; survey.description = ''" style="text-transform: none">
                        Cancelar
                    </v-btn>
                    <v-btn flat :disabled="!survey.description" @click="addQuestionsFromScratch()" style="background-color: green; color: white; text-transform: none;">
                        <span>Añadir Preguntas</span>
                    </v-btn> 
                </div>                
            </v-card>
        </v-dialog>

        <v-dialog v-model="showOptionsToCreateSurveys"
            lazy
            width="856"
            :style="`height: ${showOptionsToCreateSurveys?'696px' : '0'}; overflow: hidden; z-index: 9999 !important; margin-top: -10%;`"
            :fullscreen="$vuetify.breakpoint.smAndDown"
            >
            <v-card style="background-color: #f2f3f2"> <!--height: 100px-->
              <div :style="ats('width: 100%; display: flex; height: 82px; background: rgb(132, 85, 159); justify-content: center; align-items: center;', '=', 'width: 100%; height: 82px; background: rgb(132, 85, 159); padding: 20px')">
                <div align="left" :style="ats('', '=', 'margin-left: 48px; margin-top: 5px;')">
                    <span style="font-weight: bold; font-size: 24px; color: white">{{selectedSolution.category}} - Encuesta</span>
                </div>
              </div>
              <div v-if="!activateInputByQuestionModal && !surveyIdeaActive" align="left" :style="`margin-top: 15px; padding-right: 10px; margin-left: ${ats('0px', '=', '50px')};`">
                  <span :style="`font-weight: bold; font-size: ${ats('14px', '=', '18px')}; margin-left: 15px; color: #222222`">Continua explicando aspectos de tu Servicio</span>
              </div>
              <div v-if="surveyIdeaActive">
                <v-layout align-start justify-start row fill-height :style="ats('padding: 15px', '=', 'padding: 20px 30px 0px 30px')">
                  <v-flex xs1 style="margin-right: 8px" @click="surveyIdeaActive = false; activateInputByQuestionModal = true; selectedSurveyIdea = [] ">
                      <v-icon center style="cursor: pointer; color: black; font-weight: bold; font-size: 30px;">fas fa-angle-left</v-icon>
                  </v-flex>
                  <v-flex :class="ats('xs5', '=', 'xs2')">
                    <div style="cursor: pointer; padding-bottom: 10px">
                      <div style="width: 100px; height: 100px; background-color: black; text-align: center">
                          <v-icon center style="color: white; font-size: 40px; margin-top: 30px;">add</v-icon>
                      </div>
                    </div> 
                  </v-flex>
                  <v-flex :class="ats('xs6', '=', 'xs5')" style="text-align: left;">
                    <div style="cursor: pointer; padding-bottom: 10px; margin-top: 15px; margin-left: -10px">
                      <span :style="ats('font-weight: bold; color: #404040; font-size: 14px;', '=', 'font-weight: bold; color: #404040; font-size: 16px;')">Lanza Encuesta Sobre:</span>
                      <br>
                      <span :style="ats('font-weight: bold; color: #404040; font-size: 14px;', '=', 'font-weight: bold; color: #404040; font-size: 16px;')">{{selectedSurveyIdea.description}}</span>
                    </div> 
                  </v-flex>                  
                </v-layout>
                <div :style="ats('padding: 15px', '=', 'padding: 20px 73px 20px 102px')"><hr style="border: 0.5px solid #cecece"></div>
                <div :style="ats('padding: 15px', '=', 'padding: 0px 70px 58px 102px')">
                  <v-layout align-start justify-center :class="ats('column', '=', 'row')" fill-height>

                    <div v-if="$vuetify.breakpoint.smAndDown" style="margin-bottom: 20px; width: 100%; overflow-x: scroll; overflow-y: hidden; white-space: nowrap;">
                      <div style="display: flex; flex-direction: row;">
                        <div v-for="(option, index) in selectedSurveyIdea.options" @click="ideaDescription = option.title; ideaClicked = index" :key="index" :style="`text-align: left; border: 1px solid #ececec; cursor: pointer; border-radius: 20px; margin: 8px 0px 15px; width: 100%; padding: 7px; background: ${ideaClicked === index ? '#e4f5fc' : 'white'}`">
                          <span style="font-family: Arial; text-align: left; font-size: 14px; font-weight: bold; color: #595959;">{{option.title}}</span>
                        </div>
                      </div>
                    </div>
                    <v-flex v-if="!$vuetify.breakpoint.smAndDown">
                      <div v-for="(option, index) in selectedSurveyIdea.options" @click="ideaDescription = option.title; ideaClicked = index" :key="index" :style="`text-align: left; cursor: pointer; width: 100%; padding: 7px; margin-bottom: 15px; background: ${ideaClicked === index ? '#e4f5fc' : 'white'}`">
                        <span style="font-family: Arial; text-align: left; font-size: 16px; font-weight: bold; color: #595959;">{{index+1}}. {{option.title}} ></span>
                      </div>                     
                    </v-flex>

                    <v-flex>
                      <div :style="ats('padding: 20px; text-align: left; border-radius: 2px; height: 227px; width: 100%; background: white', '=', 'margin-left: 50px; padding: 20px; text-align: left; border-radius: 2px; height: 227px; width: 300px; background: white')">
                        <span style="font-weight: bold; font-size: 16px; color: #595959">{{ideaDescription}}</span>
                        <br>
                        <span style="font-size: 16px; color: #595959">Pregunta sobre mejoras que se derivan de tu producto o servicio</span>
                        <br><br>
                        <div style="margin-bottom: 15px;"><span style="font-size: 16px; color: #595959">Posible Pregunta:</span></div>
                        
                        <div><span style="font-size: 16px; color: #595959">¿Como te ha ayudado <br> <span style="font-size: 12px; color: #595959">aspecto concreto de tu producto / servicio</span>?</span></div>
                      </div>                

                    </v-flex>                    
                  </v-layout>
                </div>
              </div>

              <!-- <br> -->
              <div :style="ats('padding: 15px', '=', 'padding: 20px 45px 44px 66px; text-align: left')">
                <v-layout v-if="activateInputByQuestionModal && !surveyIdeaActive" align-start justify-start column fill-height style="margin-top: 5px;">
                  <v-flex>
                    <div style="display: flex">
                      <div style="margin-right: 82px;"><span style="font-weight: bold; color: #404040; font-size: 16px;">Titulo</span></div>
                      <div style="padding-bottom: 10px; width: 400px">
                        <input type="text" placeholder="Escribe el titulo de la Encuesta" v-model="survey.description"
                            style="width: 100%; font-size: 17px; color: #a7a5ab; background: white; outline: none; border: 1px solid rgb(206, 206, 206); height: 35px; border-radius: 2px;"
                        >
                      </div>
                    </div>
                  </v-flex>
                  <v-flex style="margin-top: 15px;">
                    <div style="display: flex">
                      <div style="margin-right: 56px"><span style="font-weight: bold; color: #404040; font-size: 16px;">Pregunta</span></div>
                      <div style="padding-bottom: 10px; width: 400px">
                        <input type="text" placeholder="Escribe la Pregunta de la Encuesta" v-model="survey.question"
                            style="width: 100%; font-size: 17px; color: #a7a5ab; background: white; outline: none; border: 1px solid rgb(206, 206, 206); height: 35px; border-radius: 2px;"
                        >
                      </div>
                    </div>
                  </v-flex>
                  <v-flex style="margin-top: 12px;">
                    <div style="display: flex">
                      <div style="margin-right: 25px"><span style="font-weight: bold; color: #404040; font-size: 16px;">Opciones de <br> Respuesta</span></div>
                      <div style="padding-bottom: 10px">
                        <span style="color: #595959; font-size: 16px;">Tendras la posibilidad de senalar los aspectos mas beneficiosos de tu servicio</span>
                      </div>
                    </div>                      
                  </v-flex>
                  <v-flex style="margin-top: 17px;">
                    <div style="display: flex">
                      <div style="margin-right: 25px;"><span style="font-weight: bold; color: #404040; font-size: 16px;">Encuestados</span></div>
                      <div style="padding-bottom: 10px">
                        <span style="color: #595959; font-size: 16px;">Cliente final que ya ha contratado vuestros productos</span>
                      </div>
                    </div>                      
                  </v-flex>                    
                </v-layout>                                
                <v-layout v-if="!activateInputByQuestionModal && !surveyIdeaActive" align-start justify-start row fill-height style="padding: 0px; width: 100%">
                    <v-flex :class="ats('xs6', '=', 'xs3')" style="margin-right: -30px;">
                        <!-- @click="dispatchShowCreateQuestionFromScratch(true) -->
                        <div @click="activateInputByQuestionModal = true" style="width: 140px; height: 114px; border: 1px solid grey; background: #ececec;color: black; text-align: center; cursor: pointer">
                        <!--@click="showCreateQuestionFromScratch()"-->
                            <v-icon center style="color: black; font-weight: bold; font-size: 30px; margin-top: 20px;">add</v-icon>
                            <br>
                            <div style="text-align: left; margin-left: 5px; margin-top: 8px;"><span style="font-size: 14px; text-align: left">Crear una encuesta desde cero</span></div>
                        </div>
                    </v-flex>
                    <v-flex :class="ats('xs6', '=', 'xs3')" style="margin-left: 0px;">
                      <!-- @click="showCreateFromAQuestion()" -->
                        <div style="width: 140px; opacity: 0.6;  height: 114px; border: 1px solid grey; background: #ececec; color: black; text-align: center; cursor: pointer">
                            <v-icon center style="color: black; font-weight: bold; font-size: 30px; margin-top: 20px;">add</v-icon>
                            <br>
                            <div style="text-align: left; margin-left: 5px; margin-top: 8px"><span style="font-size: 14px; text-align: left">Crear a partir de pregunta existente</span></div>
                        </div>                                                                
                    </v-flex>
                </v-layout>                  
              </div>  
              <!-- <br v-if="!activateInputByQuestionModal">

              <br v-if="!activateInputByQuestionModal"> -->

              <div v-if="!surveyIdeaActive" :style="activateInputByQuestionModal ? `width: ${ats('100%', '=', '728px')}; margin-top: -18px; padding: ${ats('15px', '=', '0px 0px 25px 66px')}; text-align: left` : `width: ${ats('100%', '=', '728px')}; padding: ${ats('15px', '=', '32px 0px 25px 66px')}; text-align: left`"> <!-- BLACK BOXES -->
                <hr style="0.5px solid #cecece">
                <v-layout align-start justify-start row fill-height style="margin-top: 18px;">
                  <v-flex xs10>
                    <span style="font-weight: bold; font-size: 18px; color: #222222; font-family: Arial">Encuestas</span>
                    <br/><br/>
                    <span style="font-size: 14px;  color: #425056; margin-left: 0px;">Muestra la validacion de tus clientes a distintos aspectos de tu servicio</span>                      
                    <br/><br/>
                  </v-flex>
                </v-layout>
                  <v-layout align-start row fill-height :class="ats('', '=', 'justify-start')" style="margin-top: 5px">
                    <v-flex xs4 v-for="(idea, index) in $vuetify.breakpoint.smAndDown ? surveysIdeas.slice(0, 3) : surveysIdeas" :key="index" style="margin-right: 4px;">
                      <div style="cursor: pointer; padding-bottom: 7px" @click="selectedSurveyIdea = surveysIdeas[index]; activateInputByQuestionModal = false; surveyIdeaActive = true">
                        <div :style="ats('width: 88px; height: 88px; background-color: black; text-align: center', '=', 'width: 100px; height: 100px; background-color: black; text-align: center')">
                            <v-icon center style="color: white; font-size: 40px; margin-top: 30px;">add</v-icon>
                        </div>
                        <div :style="ats('padding: 4px; background: white; width: 88px; height: 76px', '=', 'padding: 4px; background: white; width: 100px; height: 76px')"><span style="font-family: Arial; font-size: 14px; color: #222222">{{idea.description}}</span></div>
                      </div> 
                    </v-flex>                                           
                  </v-layout>                    
              </div>  
              <br><br><br>
              <div style="position: absolute; bottom: 8px; right: 5px">
                  <v-btn flat @click="showOptionsToCreateSurveys = false; addQuestionsFromScratch()" style="background-color: green; color: white; text-transform: none;">
                      <span style="font-weight: bold; color: white; font-size: 16px; font-family: Arial">Crear encuesta desde cero</span>
                  </v-btn>
              </div>                                              
            </v-card>
        </v-dialog>    

        <v-dialog v-model="dialog" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">¿Borrar este servicio?</v-card-title>
            <v-card-text class="caption py-2" style="text-align:left">Se perderán todas las recomendaciones de los clientes.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" class="font-weight-bold" flat @click.native="dialog = false">Cancelar</v-btn>
              <v-btn color="primary" class="font-weight-bold" flat @click.native="remove(solutionToDelete); dialog = false">Confirmar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-snackbar  v-model="textCopyOk" color="success" multi-line :timeout="3000" >
          URL COPIADO CON EXITO
          <v-btn
            dark
            flat
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </v-snackbar>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AddBenefits from '@/components/AddBenefits.vue'
import Accordion from '@/components/Accordion.vue'
import Analysis from '@/components/Analysis.vue'
import _ from 'lodash'
import Dropdown from 'bp-vuejs-dropdown';

export default {
  components: { 
    AddBenefits, Accordion, Dropdown, Analysis
  },
  data () {
    return {
      category: '',
      distTerms: false,
      acceptTerms: false,
      ideaClicked: 0,
      notClick: [],
      accordionOpenIndex: 0,
      accordionOpenIndexState: false,
      saveSurvey: false,
      accordionOpen: false,      
      loadingSave: false,
      showCheckSave: false,
      ideaDescription: '',
      surveysIdeas: [
        {
          description: 'Vuestro Producto o Servicio', 
          options: [{
            title: 'Problemas Resueltos',
            description: ``
          }, {
            title: 'Soluciones en materias concretas',
            description: ''
          }, {
            title: 'Aspectos de tu Producto/Servicio',
            description: ''
          }, {
            title: 'Complementariedad o Compatibilidad',
            description: ''
          }, {
            title: 'Asuntos de Actualidad',
            description: ''
          }]
        }, {description: 'Vuestra Competencia', options: []}, {description: 'Vuestros Clientes', options: []}, {description: 'Otra Cuestions', options: []}
      ],
      categoryNew: '',
      showBoxes: true,
      surveyIdeaActive: false,
      selectedSurveyIdea: [],
      activateInputByQuestionModal: false,
      firstOne: false,
      showAccordion: true,
      isAccordion: false,
      changeLastAccordion: false,
      activeEditionOfCategory: false,
      textToCopy: '',
      textCopyOk: false,
      restartOptions: false,
      selectedSolution: '',
      isNew: false,
      survey: {
          question: '',
          description: '',
          options: []
      },
      subPartComponentAccordionOpen: false,
      showCreateQuestionFromScratch: false,
      showOptionsToCreateSurveys: false,
      showCreateFromAQuestion: false,      
      search: '',
      partComponent: 1,
      subPartComponent: 0,
      showAddService: false,
      selectedServiceMenu: 'service',
      serviceName: '',
      part: 1,
      happyClients: ['Entre 5 y 30', 'Entre 30 y 60', 'Entre 60 y 100', 'Entre 100 y 200', 'Mas de 200'],
      happyCantRemember: false,
      dialog: false,
      solutionToDelete: null,
      version: 0,
      hover: {
        logo: false
      },
      show: false,
      create: false,
      tab: 1,
      open: null,
      editing: false,
      version: 0,
      hover: {
        logo: false,
      },      
      formData: new FormData(),
      industries: require('@/misc/industries').default.industries,
      solution: {
        _id: '',
        index: '',
        specialization: 'Ingenieria',
        category: '',
        description: '',
        results: [],
        happyNumber: '',
        logo: {
          file: null,
          filename: null,
          url: null,
          status: {
            error: false,
            message: ''
          }
        },
        url: ''
      },
      validation: {
        description: false,
        category: false,
        happyNumber: false,
        results: false,
        image: false
      },
      valid: false,
      valid1: false,
      validNew: false,
      categoryRules: [
        (v) => !!v || 'La categoría es obligatoria!',
        (v) => (v && v.length >= 3 && v.length <= 50) || 'La categoría debe tener entre 3 y 50 caracteres!'
      ],
      descriptionRules: [
        (v) => !!v || 'Este campo es obligatorio!',
      ],
      industryRules: [
        (v) => !!v || 'Debe seleccionar una categoría.'
      ],
      identifierRules: [
        (v) => !!v || 'Este campo es obligatorio!',
        (v) => (v && v.length >= 3 && v.length <= 30) || 'El nombre debe tener entre 3 y 30 caracteres!'
      ],
      benefitsToAdd: [],
      benefitRules: [
        (v) => !!v || 'Este campo no puede estar vacío!',
        (v) => (v && v.length >= 1 && v.length <= 72) || 'La descripción debe tener menos de 72 caracteres!'
      ]
    }
  },
  watch: {
    'create' (to, from) {
      this.$emit('create', this.create)
    },
    'open' (to, from) {
      this.$emit('open', this.open !== null)
    },
    'part' (to, from) {
      this.$emit('part', this.part)
    },
    showOptionsToCreateSurveys(val) {
      if(!val) {
        this.surveyIdeaActive = false
        this.activateInputByQuestionModal = false        
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn', 'currentUser']),
    ...mapGetters('company', ['getCompanyData', 'getStatus', 'setStatus', 'getSolutions', 'getExperiences', 'getTotalValidations']),
    showBox () {
      if (this.getStatus.loading) {
        if (this.create === true || this.open !== null) {
          return true
        } else if (this.create === false && this.open === null) { // that means this is reloading
          return false
        } else {
          return false
        }
      } else {
        if (this.getSolutions.length === 0) {
          return false
        } else {
          return true
        }
      }
      // (getStatus.loading && (create === false || open !== null)) || (getStatus.loading && create === false && open === null)
    },

    solutionUrl () {
      if(!this.create) 
      return `yesthem.com/${this.getCompanyData.identifier}/${(this.selectedSolution.category.toLowerCase()).replace(/\s/g, "")}`
      else
      return 'yesthem.com/' + this.getCompanyData.identifier + '/' + this.sanitizeString((this.solution.category.toLowerCase()).replace(/\s/g, ""))
    },

    filteredList() {
      return this.getSolutions.filter(solution => {
        return solution.category.toLowerCase().includes(this.search.toLowerCase())
      })
    }    
  },
  methods: {
    goToTop() {
      if(!this.$vuetify.breakpoint.smAndDown) {
        window.scrollTo({ top: 105 })
      }
    },
    dispatchOpen(e) {
      let p = [];
      if (this.notClick.length>0) {
        this.notClick.forEach(item => {
          if(item.index===e.index) {
            item.open = e.open 
          } else {
            this.notClick.forEach(i => p.push(i.index))
            p.every(key => key != e.index) ?
            this.notClick.push({open: e.open, index: e.index}) :
            null    
          }
        })
      } else {
        this.notClick.push({open: e.open, index: e.index})
      }
    },
    getTotalOtherValidations(surveys) {
        let total = 0;
        surveys.forEach(survey => survey.showExtra && survey.extraOptions.length > 0 ? 
                                    survey.extraOptions.forEach(option => total = total + option.validations.length ) :
                                    false
                        )
        return total;

    },    
    ats (xs, sm, mdAndUp) { // According to Size
      if (this.$vuetify.breakpoint.xs) {
        return xs
      }
      else if (this.$vuetify.breakpoint.sm) {
        return sm === '=' ? xs : sm
      }
      if (this.$vuetify.breakpoint.mdAndUp) {
        return mdAndUp
      }
    },
    dispatchShowCreateQuestionFromScratch(e) {
        this.showOptionsToCreateSurveys = false
        this.showCreateQuestionFromScratch = e
    },
    addQuestionsFromScratch() {
      this.showCreateQuestionFromScratch = false;
      this.subPartComponent = 1 ; 
      this.isNew = true; 
      this.showBoxes = false;
      this.showAccordion = true;
      // window.scrollTo(100,0);
    },
    dispatchShowCreateFromAQuestion(e) {
        this.showCreateFromAQuestion = e
    },
    dispatchShowOptionsToCreateSurveys(e) {
      this.showOptionsToCreateSurveys = e
    },
    dispatchAnalysis(status) {
      this.$emit('dispatchAnalysis', status)
    },
    async dispatchEditSurvey(obj, type = 0) {
      if(obj.survey.options.every(({ active }) => !active) && obj.survey.extraOptions.every(({ active }) => !active)) {
        obj.survey.active = false;
      } 
      if(obj.survey.options.some(({ active }) => active) || obj.survey.extraOptions.some(({ active }) => active)) {
        obj.survey.active = true;
      }
      const response = await this.$store.dispatch('company/editSurvey', obj.survey)
      console.log(response)
      if(response.success) {
        await this.$store.dispatch('company/populate', this.currentUser.identifier)
        if(type === 0) {
          this.selectSolutionToShow(this.getCompanyData.solutions.find(solution => solution.category === this.selectedSolution.category), 1);
          this.survey.description = ''    
          this.showAccordion = true    
          this.saveSurvey = false
          this.notClick = []
        }
      }
    },
    async populateBeforeSurveyRemove() {
      await this.$store.dispatch('company/populate', this.currentUser.identifier)
      this.selectSolutionToShow(this.getCompanyData.solutions.find(solution => solution.category === this.selectedSolution.category), 1);
      this.survey.description = ''
      this.notClick = []
      this.showAccordion = true    
      this.saveSurvey = false      
    },
    dispatchPreview(surveyOptions) {
      localStorage.removeItem('preview')
      let json;
      this.survey.options = surveyOptions.map(option => {
        return { 
          optionDescription: option,
          validations: []
        }
      });
      if(this.selectedSolution) {
        if(this.selectedSolution.surveys.length>0) {
          json = {
            survey: [...this.selectedSolution.surveys, this.survey],
          }
        } else {
          json = {
            survey: [this.survey],
          }
        }        
      } else {
        json = {
          survey: [this.survey],
        }
      } 
      localStorage.setItem('preview', btoa(JSON.stringify(json)))
      window.open('http://yesthem.com/'+this.getCompanyData.identifier+'/E0NTc4NmQ0MTA1MzkiLCJvcHRpb25EZXNjcmlwdGlvbiI6IlNJIn0seyJ2YWxpZGF0aW9ucyI6W10sIl9pZCI6IjVjYzkyM2NmNzA5MTQ1Nzg2ZDQxMDUzOC/preview', '_blank')
    },
    async updateCategory(type = 0) {
      this.formData.set('company', this.getCompanyData._id)
      this.formData.set('index', this.create ? this.getSolutions.length + 1 : 2)
      this.formData.set('solution', this.create ? '' : this.selectedSolution._id)
      this.formData.set('specialization', type === 0 ? this.selectedSolution.specialization : this.solution.specialization)
      this.formData.set('category', (type === 0 ? this.selectedSolution.category : this.solution.category).toLowerCase())
      this.formData.set('description', type === 0 ? this.selectedSolution.description : this.solution.description)
      this.formData.set('results', type === 0 ? JSON.stringify(this.selectedSolution.results) : JSON.stringify(this.solution.results))
      this.formData.set('happyNumber', type === 0 ? this.selectedSolution.happyNumber : this.solution.happyNumber)
      this.formData.set('editing', 'solutions')
      this.formData.set('surveys', JSON.stringify([]));      
      const response = await this.$store.dispatch('company/edit', this.formData)
        if (response.success === true) {
        this.activeEditionOfCategory = false
        this.isAccordion = false
        this.showAccordion = true
        this.category = this.transformString(this.selectedSolution.category)
        this.$emit('reload', {reload: true, redirect: false})
      }
    },
    async updateSolution(type=0, stay = false) {
      window.URL.revokeObjectURL(this.solution.logo.file)
      if(!this.loadingSave) {
          this.formData.set('company', this.getCompanyData._id)
          this.formData.set('index', this.create ? this.getSolutions.length + 1 : 2)
          this.formData.set('solution', !this.selectedSolution ? '' : this.selectedSolution._id)
          this.formData.set('specialization', type === 0 ? this.selectedSolution.specialization : this.solution.specialization)
          this.formData.set('category', (type === 0 ? this.selectedSolution.category : this.solution.category).toLowerCase())
          this.formData.set('description', type === 0 ? this.selectedSolution.description : this.solution.description)
          this.formData.set('results', type === 0 ? JSON.stringify(this.selectedSolution.results) : JSON.stringify(this.solution.results))
          this.formData.set('happyNumber', type === 0 ? this.selectedSolution.happyNumber : this.solution.happyNumber)
          this.formData.set('editing', 'solutions')
          this.formData.set('surveys', JSON.stringify([]));      
          this.loadingSave = true;
          const response = await this.$store.dispatch('company/edit', this.formData)
            if (response.success === true) {
            this.solution.logo.status.error = false
            this.solution.logo.status.message = ''
            this.version += 1
            this.open = null
            this.part = 1
            this.selectedSolution = response.solution
            if(this.selectedSolution.surveys.length === 0) {
              console.log('No surveys')
              this.isNew = true
            } else {
              console.log('We have surveys!')
              this.isNew = false
            }
            // console.log('selected solution',this.selectedSolution)
            this.showCheckSave = true;
            this.isAccordion = false
            this.showAccordion = true
            window.URL.revokeObjectURL(this.solution.logo.file)
            window.URL.revokeObjectURL(this.solution.logo.url)
            this.$emit('reload', {reload: true, redirect: false})
          }
      } else {
        this.loadingSave = false
        this.showCheckSave = false
        if (type === 0){
            this.isNew = true; this.subPartComponent = 1; this.selectedServiceMenu = 'survey'
            this.selectSolutionToShow(this.getCompanyData.solutions.find(solution => solution.category === this.selectedSolution.category), 1);
        } else { 
          this.isNew = true; this.subPartComponent = 1; this.selectedServiceMenu = 'survey'
        }
        window.URL.revokeObjectURL(this.solution.logo.file)
        window.URL.revokeObjectURL(this.solution.logo.url)
      }
     
    },
    async dispatchSaveSurvey(surveyOptions) {
      window.URL.revokeObjectURL(this.solution.logo.file)
      window.URL.revokeObjectURL(this.solution.logo.url)
      this.showBoxes = true
      this.survey.options = surveyOptions.p.map(option => {
        return {
          optionDescription: option,
          validations: []
        }
      });
      this.survey.question = surveyOptions.question
      this.survey.description = surveyOptions.surveyDescription
      this.selectedSolution.newSurvey = this.survey
      this.selectedSolution.newSurvey.extraOptionTitle = surveyOptions.extraOptionTitle
      this.selectedSolution.newSurvey.showExtra = surveyOptions.showExtra
      this.selectedSolution.newSurvey.active = false
      const response = await this.$store.dispatch('company/addSurvey', this.selectedSolution)
      if(response.success) {
          await this.$store.dispatch('company/populate', this.currentUser.identifier)
          this.selectSolutionToShow(this.getCompanyData.solutions.find(solution => solution.category === this.selectedSolution.category), 1);
          this.survey.description = ''  
          this.survey.question = ''  
          this.showAccordion = true    
          this.saveSurvey = false
          this.notClick = []
          this.surveyIdeaActive = false
          this.activateInputByQuestionModal = false
      } else {
        this.errorAddingSurvey = true;
      }
    },
    async cancelAccordion(event) {
      this.notClick = []
      this.survey.question = ''
      this.survey.description = ''
      this.showAccordion = false
      this.saveSurvey = false 
      this.surveyIdeaActive = false
      this.activateInputByQuestionModal = false
      await this.$store.dispatch('company/populate', this.currentUser.identifier)
      this.isNew = false; this.subPartComponent = 0; this.selectedServiceMenu = 'service'
      this.isNew = false; this.subPartComponent = 1; this.selectedServiceMenu = 'survey'
      this.$forceUpdate();  // Notice we have to use a $ here
    },
    selectSolutionToShow(iSolution, type=0) {
      this.isAccordion = true;
      if(this.selectedSolution === '') {
        this.selectedSolution = iSolution; 
        this.categoryNew =  iSolution.category
        this.category = this.transformString(iSolution.category)
        this.partComponent = 2; 
        this.subPartComponent = type === 0 ? 0 : 1
        this.selectedServiceMenu = type === 0 ? 'service' : 'survey'
        this.create = false
      } else {
        this.selectedSolution = iSolution; 
        this.categoryNew =  iSolution.category
        this.partComponent = 2; 
        this.category = this.transformString(iSolution.category)
        this.subPartComponent = type === 0 ? 0 : 1
        this.selectedServiceMenu = type === 0 ? 'service' : 'survey'
        this.create = false        
      }
      if(this.selectedSolution.surveys.length === 0) {
        console.log('Empty Surveys')
        this.isNew = true
      } else {
        console.log('Yes, we have surveys!')
        this.isNew = false
      }      
    },
    backToServicesDashboard() {
      // window.location.reload(true)
      this.activeEditionOfCategory = false;
      this.loadingSave = false;
      this.showCheckSave = false;
      this.isAccordion = false;
      this.create = false;
      this.partComponent = 1;
      this.solution.description = ''
      this.survey.description = ''
      this.solution.category = ''
      this.solution.logo.url = ''
      this.restartOptions = true
      this.selectedSolution = '' //check this because when click then click again it off
      this.dispatchAnalysis(false)
    },
    copyLinkToClipBoard() {
      let txt = this.$refs.linkToCopy
      txt.select()
      document.execCommand("copy")
      this.textCopyOk = true;
      setTimeout(() => this.textCopyOk = false, 1000)
    },
    mouseOverAction (key, isLeave) {
      if(!isLeave) {
        this.$emit('mouseOverActionKey', key)
      } else {
        this.$emit('mouseLeaveActionKey', key)
      }
    
    },

    next () {
      if (this.part === 1) {
        if (this.solution.description && this.solution.description.split(' ').length > 1 && this.solution.description.split(' ').length <= 14) {
          this.part++
        }
      }
      else if (this.part === 2) {
        if (this.solution.happyNumber !== '' || this.happyCantRemember) {
          this.part++
        } else {
          this.validation.happyNumber = true
        }
      }
      else if (this.part === 3) {
        if (!_.find(this.solution.results, function (o) {return o.description === ''})) {
          this.part++
        } else {
          this.validation.results = true
        }
      }
      else if (this.part === 4) {
        if (this.solution.logo !== null) {
          this.save()
        } else {
          this.solution.logo.status.error = true
          this.solution.logo.status.message = 'La imagen del servicio es requerida.'
        }
      }
    },

    sanitizeString (str) {
        str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"").toLowerCase()
        str = str.split('.').join("")
        str = str.split(',').join("")
        str = str.split(';').join("")
        str = str.split(':').join("")
        str = str.split('?').join("")
        str = str.split('!').join("")
        str = str.split('|').join("")
        str = str.split('¡').join("")
        str = str.split('¿').join("")
        str = str.split(" ").join("")
        return str.trim()
    },


    newSolution () {
      this.solution._id = ''
      this.solution.index = this.getSolutions.length + 1
      this.solution.specialization = this.getCompanyData.industry
      this.solution.category = ''
      this.solution.description = ''
      this.solution.results = [{description: ''}]
      this.solution.happyNumber = ''
      this.happyCantRemember = false
      this.solution.logo = {
        file: null,
        filename: null,
        url: null,
        status: {
          error: false,
          message: ''
        }
      }
      this.solution.url = 'yesthem.com/' + this.getCompanyData.identifier + '/' + (this.getSolutions.length + 1)
      this.create = true
    },

    setData (solution) {
      this.solution.index = solution.index
      this.solution._id = solution._id,
      this.solution.specialization = solution.industry,
      this.solution.category = (solution.category).toLowerCase(),
      this.solution.description = solution.description,
      this.solution.results = solution.benefits.length > 0 ? solution.benefits : [{description: ''}],
      this.solution.happyNumber = solution.happyNumber ? solution.happyNumber : ''
      this.solution.logo = {
        file: null,
        filename: null,
        url: solution.image ? '/static/images/uploads/' + solution.image : null,
        status: {
          error: false,
          message: '' 
        }
      },
      this.solution.url = 'yesthem.com/' + this.getCompanyData.identifier + '/' + solution.identifier // solution.index
    },

    onFocusLogo (i) {
      this.$refs.fileInputLogo.click()
    },

    onFocusLogoNew () {
      this.$refs.fileInputLogoNew.click()
    },

    onFileChangeLogo ($event) {
      let file = $event.target.files || $event.dataTransfer.files
      file = file[0]

      if (file) {
        if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg') {
          this.solution.logo.file = file
          this.solution.logo.filename = file.name
          this.formData.set('logo', this.solution.logo.file, this.solution.logo.filename)
          console.log('adding logo')
          console.log(this.solution.logo)
          this.solution.logo.status.error = false
          this.solution.logo.status.messages = []
          this.solution.logo.url = window.URL.createObjectURL(this.solution.logo.file)
        } else {
          this.formData.set('logo', null)
          this.solution.logo.status.error = true
          this.solution.logo.status.messages = ['Solo se permiten imagenes JPEG y PNG.']
          this.solution.logo.url = ''
        }
      } else {
        this.formData.set('logo', null)
        this.solution.logo.status.error = false
        this.solution.logo.status.messages = []
        this.solution.logo.url = ''
      }
    },

    addBenefit () {
      if (this.solution.results.length <= 10) {
        this.solution.results.push({ description: '' })
      } else {
      }
    },

    getTotalOptions(surveys) {
      let validations = []
      surveys.forEach(survey => {
        survey.options.forEach(option => {
          option.validations.forEach(validation => {
            validations.push(validation)
          })
      })})
      return validations
    },

    async save () {
      window.URL.revokeObjectURL(this.solution.logo.file)
      this.formData.set('company', this.getCompanyData._id)
      this.formData.set('index', this.create ? this.getSolutions.length + 1 : this.solution.index)
      this.formData.set('solution', this.create ? '' : this.solution._id)
      this.formData.set('specialization', this.solution.specialization)
      this.formData.set('category', (this.solution.category).toLowerCase())
      this.formData.set('description', this.solution.description)
      this.formData.set('results', JSON.stringify(this.solution.results))
      this.formData.set('happyNumber', this.solution.happyNumber)
      this.formData.set('editing', 'solutions')
      this.formData.set('surveys', JSON.stringify([this.survey]));
      this.solution.logo.status.error = false
      this.solution.logo.status.message = ''

      if (this.create) {
        if (this.solution.logo.url) {
          const response = await this.$store.dispatch('company/edit', this.formData)
          if (response.success === true) {
            await this.$store.dispatch('company/populate', this.currentUser.identifier)
            this.selectSolutionToShow(this.getCompanyData.solutions[this.getCompanyData.solutions.length-1], 1);
            console.log('akiii')
            this.survey.description = ''
            this.showAccordion = true
            this.solution.logo.status.error = false
            this.solution.logo.status.message = ''
            this.version += 1
            this.create = false
            this.part = 1
          }
        } else {
          if (this.solution.logo.url === null) {
            this.solution.logo.status.error = true
            this.solution.logo.status.message = 'La imagen del servicio es requerida.'
          }
          await this.$store.dispatch('company/setStatus', { loading: false, error: true, message: 'Please make sure to fill all the necessary information.' })
        }
      } else {
        if (this.solution.logo.url) {
          const response = await this.$store.dispatch('company/edit', this.formData)
          console.log('akiii')
          if (response.success === true) {
            await this.$store.dispatch('company/populate', this.currentUser.identifier)
            this.selectSolutionToShow(this.getCompanyData.solutions[this.getCompanyData.solutions.length-1], 1);
            this.survey.description = ''
            this.showAccordion = true
            this.solution.logo.status.error = false
            this.solution.logo.status.message = ''
            this.version += 1
            this.open = null
            this.part = 1
          }
        } else {
          if (this.solution.logo.url === null) { 
            this.solution.logo.status.error = true
            this.solution.logo.status.message = 'La imagen de la solución es requerida.'
          }
          await this.$store.dispatch('company/setStatus', { loading: false, error: true, message: 'Please make sure to fill all the necessary information.' })
        }
      }
    },

    async remove (solution) {
      const response = await this.$store.dispatch('company/remove', { _id: solution, company: this.getCompanyData._id })
      if (response.success === true) {
        this.open = null
        this.solutionToDelete = null
        await this.$store.dispatch('company/populate', this.currentUser.identifier)
        this.partComponent = 1;
      }
    },

    transformString(s) {
        let splitted = s.split(' ');
        if (splitted.length > 1) {
            return (splitted.map(word => word.charAt(0).toUpperCase() + (word.slice(1)).toLowerCase())).join(' ');
        } else {
            return  splitted[0].charAt(0).toUpperCase() + (splitted[0].slice(1)).toLowerCase();
        }
    },    

    getResults (benefits) { // I'm guessing this is the  number of benefits with at least 1 validation.
      let results = []
      for (let i = 0, len = benefits.length; i < len; i++) {
        if (benefits[i].validations.length > 0) {
          if (!results.some(result => result === i)) {
            results.push(i)
          }
        }
      }
      return results.length
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

    getHappyClients (surveys) {
      let validations = []
      surveys.forEach(survey => {
        survey.options.forEach(option => {
          option.validations.forEach(validation => {
            validations.push(validation)
          })
        })
      });
      return this.checkDuplicateInObject('id', validations);
    },

    getTotalYes (benefits) {
      let yes = 0
      for (let i = 0, len = benefits.length; i < len; i++) {
        yes += benefits[i].validations.length
      }
      return yes
    }
  },
  mounted() {
    this.getCompanyData.solutions.length > 0 ? this.partComponent = 1 : this.partComponent = 0
    localStorage.setItem('companyId', this.getCompanyData._id)
  },
  beforeMount() {
    this.ideaDescription = this.surveysIdeas[0].options[0].title
  },
}
</script>

<style>
.v-expansion-panel__header {
  height: auto !important;
}

.v-expansion-panel__header__icon {
  display: none !important;
}

.cCheckbox .v-label {
  font-size: 12px !important;
}

.selected-tab-1 {
  color: #2979ff  !important;
}

.selectedServiceMenu {
  cursor: pointer
}

.my-class {
  margin-top: -50px;
  margin-left: 35px;
}

.my-class-bp__btn {
  background: transparent;
  border: none
}

.my-class-bp__btn--active {
  background: transparent;
}

.my-class-bp__body {
  cursor: pointer;
  width: 100px; 
  /* padding: 2rem;  */
  font-size: 16px;
}

.bp-dropdown__icon {
  color: white
}

.bp-dropdown__icon--bottom {
  color: white
}

.arrow_box {
  margin-top: 20px;
	position: relative;
  width: 100px;
	background: transparent;
	/* border: 2px solid #282f33; */
}
.arrow_box .box1 {
  margin-top: 20px;
	position: relative;
  width: 100px;
	background: transparent;
  margin-left: -25px
	/* border: 2px solid #282f33; */
}
.arrow_box .box2 {
  margin-top: 20px;
	position: relative;
  width: 100px;
	background: transparent;
  margin-left: 35px
	/* border: 2px solid #282f33; */
}
.arrow_box:after, .arrow_box:before {
	bottom: 100%;
	left: 50%;
	border: solid transparent;
	content: " ";
	height: 0;
	width: 0;
	position: absolute;
	pointer-events: none;
}

.arrow_box:after {
	border-color: rgba(213, 213, 213, 0);
	border-bottom-color: transparent;
	border-width: 8px;
	margin-left: -8px;
}
.arrow_box:before {
	border-color: rgba(40, 47, 51, 0);
	border-bottom-color: #282f33;
	border-width: 11px;
	margin-left: -11px;
}

.activateMenu {
  border-bottom: 3px solid #207ac0;
  color: #207ac0;
  padding-bottom: 10px;
}
</style>
