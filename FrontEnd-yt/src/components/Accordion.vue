<template>
<div>
    <div v-if="isNew" style="margin-top: -5px;background-color: white"> <!-- -50px-->
        <div v-if="!$vuetify.breakpoint.smAndDown" align="right" style="position: absolute; top: 180px; left: 992px; height: 100%; background: transparent;">
            <button @click.prevent="goToPreview()" style="position: sticky; top: 85px; z-index: 200; background-color: #207bc1; height: 35px; width: 144px; color: white; text-transform: none;">
                <v-icon left dark style="font-size: 16px; font-weight: bold;">fas fa-sign-out-alt</v-icon>
                <span style="font-size: 16px; font-weight: bold; margin-left: 15px">Vista Previa</span>
            </button>
        </div>
        <div :style="isUnique ? 'width: 100%; height: 100%; background: white ;border-bottom: 1px solid #d4d4d4;border-right: 1px solid #d4d4d4; border-left: 1px solid #d4d4d4; margin-top: 5px; border-radius: 3px;' : 'margin-bottom: 0px; width: 100%; height: 100%  background: white; border-bottom: 1px solid #d4d4d4;border-left: 1px solid #d4d4d4;border-right: 1px solid #d4d4d4; border-bottom-left-radius: 3px;border-bottom-right-radius: 3px;'">
            <v-layout align-start justify-start row :style="`border-bottom: ${newSubPartComponentAccordionOpen ? '1px solid #ececec' : 'none'}; background: ${isNew?'#F8F9FA' : ''}; padding-bottom: 10px`">
                <v-flex style="user-select: none; cursor: pointer; text-align: left; height: 40px;">
                    <v-icon  @click="newSubPartComponentAccordionOpen = true" v-if="!newSubPartComponentAccordionOpen" center style="color: black; font-size: 15px; padding-top: 12px; padding-left: 15px; padding-right: 15px;">fas fa-angle-right</v-icon>
                    <v-icon  @click="newSubPartComponentAccordionOpen = false" v-if="newSubPartComponentAccordionOpen" center style="color: black; font-size: 15px; padding-top: 12px; padding-left: 15px; padding-right: 15px;">fas fa-angle-down</v-icon>
                    <!-- <span style="font-size: 16px">{{surveyDescription === '' ? 'Encuesta por defecto' : surveyDescription}}</span> -->
                        <input 
                            @focus="optionFocused = true; isTitleOnly = true"
                            @blur="optionFocused = false; isTitleOnly = false"
                            :disabled="surveyDescription.trim() === 'Beneficios de Nuestra Ayuda'"
                            @mouseover="titleOver = true"
                            @mouseleave="titleOver = false"
                            type="text" 
                            v-model="surveyDescription"
                            :style="`width: ${$vuetify.breakpoint.smAndDown ? '70%' : '45%'}; margin-top: 14px;
                                    cursor: ${optionFocused && isTitleOnly ? 'text' : 'pointer'};
                                    border-bottom: ${optionFocused && isTitleOnly && isNew ? '1px solid blue' : 'none'}; 
                                    background: ${titleOver && !isTitleOnly && !mouseOverInput && isNew ? '#D1E1ED' : 'transparent'};
                                    outline: none; 
                                    color: #425056;
                                    
                                    font-size: ${ats('14px', '=', '16px')}`"
                        />
                    <!-- <input type="text" v-model="surveyDescription" class="surveyTitle" :style="`width: 70%; outline: none; background: transparent; font-size: 16px`"/> -->
                    <!-- <input type="text" v-model="surveyDescription" style="background: transparent; border: none; font-size: 16px"/> -->
                </v-flex>
            </v-layout>
            <v-layout align-start justify-start row fill-height v-if="newSubPartComponentAccordionOpen && showBoxes && surveyDescription.trim() === 'Haga clic para escribir el título de la encuesta'" :style="`padding: 20px; width: 100%;background: ${isNew?'#F8F9FA' : ''};`">
                <v-flex :class="ats('xs5', '=', 'xs2')">
                    <div @click="survey ? showCreateQuestionFromScratch() : false" :style="survey ? 'width: 120px; height: 120px; background: #ececec; color: black; text-align: center; cursor: pointer;' : 'width: 120px; height: 120px; background: #ececec; opacity: 0.6; color: black; text-align: center; cursor: pointer'">
                    <!--@click="showCreateQuestionFromScratch()"-->
                        <v-icon center style="color: black; font-weight: bold; font-size: 30px; margin-top: 30px;">add</v-icon>
                        <br>
                        <div style="text-align: left; margin-left: 5px;"><span style="font-size: 12px; text-align: left">Crear una encuesta desde cero</span></div>
                    </div>
                </v-flex>
                <v-flex :class="ats('xs5', '=', 'xs2')" style="margin-left: 15px;">
                    <div @click="!survey ? showCreateFromAQuestion() : false" :style="!survey ? 'width: 120px; height: 120px; background: #ececec; color: black; text-align: center; cursor: pointer;' : 'width: 120px; height: 120px; background: #ececec; opacity: 0.6; color: black; text-align: center; cursor: pointer'">
                        <v-icon center style="color: black; font-weight: bold; font-size: 30px; margin-top: 30px;">add</v-icon>
                        <br>
                        <div style="text-align: left; margin-left: 5px;"><span style="font-size: 12px; text-align: left">Crear a partir de pregunta existente</span></div>
                    </div>                                                                
                </v-flex>
            </v-layout>

            <v-layout :style="`height: 100%;background: ${isNew?'#F8F9FA' : ''};`" v-if="newSubPartComponentAccordionOpen && surveyDescription != '' && !showBoxes" align-start="" justify-start="" :class="ats('column', '=', 'row')" fill-height>
                <v-flex xs9 :style="ats('', '=', 'margin-left: 18px')">
                    <div v-if="newSubPartComponentAccordionOpen" style="text-align: left; margin-left: 20px; margin-top: 12px; margin-bottom: 10px;">
                        <!-- <span style="font-weight: bold; font-size: 14px;">
                            Crear tu primera encuesta
                        </span> -->
                        <input
                            @focus="optionFocused = true; isQuestionOnly = true"
                            @blur="optionFocused = false; isQuestionOnly = false"
                            @mouseover="questionIsOver = true"
                            @mouseleave="questionIsOver = false"                       
                            type="text" 
                            :disabled="question.trim() === '¿Cuales fueron los aspectos más útiles del servicio?' || question.trim() === '¿Cuales fueron los aspectos mas valiosos del servicio prestado?'"
                            :placeholder="`Haga clic para escribir el texto de la pregunta`" 
                            v-model="question"
                            :style="`border-bottom: ${optionFocused && isQuestionOnly && isNew? '1px solid blue' : 'none'}; 
                            cursor: ${optionFocused && isQuestionOnly ? 'text' : 'pointer'};
                            background: ${questionIsOver && !isQuestionOnly && !mouseOverInput  && isNew ? '#D1E1ED' : 'transparent'};
                            font-weight: bold; color: #425056;  width: ${ats('100%', '=', '88%')}; outline: none; height: 35px;`"
                        />                         
                        <!-- <input
                            type="text" 
                            maxlength="83"
                            :placeholder="`Haga clic para escribir el texto de la pregunta`" 
                            v-model="question"
                            style="font-weight: bold; font-size: 15px; width: 68%; outline: none; height: 35px; border-radius: 2px;"
                        > -->
                        <!-- <br/> -->
                        <!-- <div v-if="optionFocused" align="right" style="margin-right: 55px"><span style="text-align: right; font-size: 10px">{{!options[index] ? 0 : getCharCounte}}/55</span></div>                         -->
                    </div>
                    <div v-for="index in optionsQuantity" v-bind:key="index" align="left" style="display: flex; padding: 0px 0px 0px 20px">
                        <div style="margin-top: 10px; margin-right: 20px;"><input type="radio" value=""><br></div>
                        <div style="width: 100%; margin-left: 10px">
                            <input
                                :key="index"
                                @focus="optionFocused = true; activateInputIndexx = index"
                                @blur="optionFocused = false; activateInputIndexx = null"
                                @mouseover="mouseOverInput = true; overInputActivatex=index"
                                @mouseleave="mouseOverInput = false; overInputActivatex=null"
                                :class="activateInputIndexx !== index ? 'optionsInput' : ''"
                                type="text" 
                                maxlength="83"
                                :placeholder="`Haga clic para escribir nueva opciòn`" 
                                v-model="options[index]"
                                :style="`cursor: ${optionFocused && activateInputIndexx === index ? 'text' : 'pointer'};
                                border-bottom: ${optionFocused && activateInputIndexx === index && isNew ? '1px solid blue' : 'none'};
                                color: #425056; font-size: ${ats('13px', '=', '16px')};
                                background: ${mouseOverInput && overInputActivate === index && !optionFocused && isNew ? '#D1E1ED' : 'transparent'}; width: ${ats('90%', '=', '68%')}; outline: none; height: 35px; margin-bottom: 10px`"
                            />                            
                            <!-- <input
                                @focus="optionFocused = true;"
                                @blur="optionFocused = false;"
                                @mouseover="activateInputIndex = index;mouseOverInput=true"
                                @mouseleave="optionFocused = false;activateInputIndex = null; mouseOverInput=false;"
                                class="optionsInput" 
                                type="text" 
                                maxlength="83"
                                :placeholder="`Haga clic para escribir Opción ${index}`" 
                                v-model="options[index]"
                                :style="`border-bottom: ${optionFocused && activateInputIndex === index ? '1px solid blue' : 'none'}; cursor: ${optionFocused ? 'text' : 'pointer'}; background: ${mouseOverInput && activateInputIndex === index ? '#D1E1ED' : 'transparent'}; width: 75%; outline: none; height: 35px; border-radius: 2px;`"
                            > -->
                            <br/>
                            <div align="right" :style="`opacity: ${optionFocused && activateInputIndexx === index ? 1 : 0}; margin-right: 225px`"><span style="text-align: right; font-size: 12px">{{getCharCounter(index)}}/83<v-tooltip right max-width="200px"><v-icon slot="activator" left dark style="font-family: 'Roboto-regular'; color: #949494; font-size: 14px; margin-left: 2px">fas fa-info-circle</v-icon><span>Maximo 55 caracteres para la opcion de tu encuesta</span></v-tooltip></span></div>
                            <!-- <div v-if="optionFocused && activateInputIndexx === index" align="right" style="margin-right: 130px"><span style="text-align: right; font-size: 12px">{{!options[index] ? 0 : getCharCounter(index)}}/55<v-tooltip right max-width="200px"><v-icon slot="activator" left dark style="color: black; font-size: 12px; margin-left: 2px">fas fa-info-circle</v-icon><span>Maximo 55 caracteres para la opcion de tu encuesta</span></v-tooltip></span></div> -->
                        </div>
                        <!-- v-autowidth="{maxWidth: '960px', minWidth: '20px', comfortZone: 0}" -->
                    </div>
                    <div v-if="byClient" align="left" style="padding: 10px 20px 20px 20px; display: flex">
                        <div style="margin-top: 10px; margin-right: 20px;"><input type="radio" value=""><br></div>
                        <div style="margin-top: 7px; margin-right: 20px; font-size: 14px">Otras Opciones</div>
                        <div v-if="!$vuetify.breakpoint.smAndDown" style="width: 100%">
                            <input
                                type="text" 
                                maxlength="83"
                                disabled
                                v-model="extraOptionTitle"
                                :style="`font-size: 13px; color: #425056; border: 1px solid #cecece; background: #f5f4f2; width: 70%; outline: none; height: 41px; border-radius: 2px;`"
                            >
                        </div>
                        <br/>
                        <!-- <div v-if="optionFocused && activateInputIndex === index" align="right" style="margin-right: 170px"><span style="text-align: right; font-size: 12px">{{!options[index] ? 0 : getCharCounter(index)}}/55<v-tooltip right max-width="200px"><v-icon slot="activator" left dark style="color: black; font-size: 12px; margin-left: 2px">fas fa-info-circle</v-icon><span>Maximo 55 caracteres para la opcion de tu encuesta</span></v-tooltip></span></div> -->
                        <!-- v-autowidth="{maxWidth: '960px', minWidth: '20px', comfortZone: 0}" -->
                    </div>                    
                </v-flex>
                <v-flex :style="ats(`width: 100%; background: #f2f6f9; height: 100%; text-align: left`, '=', `background: #f2f6f9; height: ${optionsQuantity === 3 ? 374 : 55*optionsQuantity+5}px; text-align: left`)">
                    <v-layout align-start justify-start column style="margin-top: 12px; margin-left: 20px;">
                        <v-flex style="user-select: none; height: 100%;">
                            <div style="margin-bottom: 10px;"><span :style="ats('font-weight: bold; font-size: 12px; color: #425056', '=', 'font-weight: bold; font-size: 16px; color: #425056')">Opciones</span></div>
                            <div>
                                <!-- <span @click="optionsQuantity === 3 ? '' : optionsQuantity--; options.pop()" style="padding-left: 4px; padding-right: 4px; padding-top: 1px; border-radius: 50%; border: 0.5px solid grey; color: grey; cursor: pointer">–</span>  -->
                                <span @click="optionsQuantity > 3 ? removeOptions() : false" style="padding-left: 4px; padding-right: 4px; padding-top: 1px; border-radius: 50%; border: 0.5px solid grey; color: grey; cursor: pointer">–</span> 
                                {{optionsQuantity+(byClient ? 1 : 0)}}
                                <span @click="optionsQuantity === 8 ? '' : optionsQuantity++" style="position:relative; padding-left: 5px; padding-right: 5px; padding-top: 1px; border-radius: 50%; border: 0.5px solid grey; color: grey; cursor: pointer">+</span>
                            </div>
                            <div style="user-select: none; margin-top: 10px">
                                <label class="container" :style="ats('color: #425056; font-size: 12px', '=', 'color: #425056; font-size: 16px')">Respuesta única
                                    <input type="radio" checked="checked" name="radio">
                                    <span class="checkmark"></span>
                                </label>
                                <label class="container" :style="ats('color: #425056; font-size: 12px', '=', 'color: #425056; font-size: 16px')">Respuesta multiple
                                    <input type="radio" checked="checked" name="radio">
                                    <span class="checkmark"></span>
                                </label>                                   
                            </div>
                        </v-flex>
                        <v-flex style="user-select: none;">
                            <div style="margin-bottom: 12px;"><span :style="ats('font-weight: bold; font-size: 12px; color: #425056', '=', 'font-weight: bold; font-size: 16px; color: #425056')">Añadir Otras Opciones</span></div>
                            <label class="container">Permitir que los clientes respondan <br> con su propia validación
                                <input type="checkbox" checked="checked" v-model="byClient" name="radio">
                                <span class="checkmark"></span>
                            </label>
                        </v-flex>                        
                        <!-- <v-flex style="user-select: none;">
                            <div style="margin-bottom: 12px;"><span style="font-weight: bold;">Respuestas</span></div>
                            <label class="container">Respuesta inicia
                                <input type="radio" checked="checked" name="radio">
                                <span class="checkmark"></span>
                            </label>
                            <label class="container">Respuesta multiple
                                <input type="radio" checked="checked" name="radio">
                                <span class="checkmark"></span>
                            </label>                            
                        </v-flex> -->
                    </v-layout>
                </v-flex>
            </v-layout>
        
            <div v-if="!showBoxes && surveyDescription !== ''" style="width: 100%; border-top: 1px solid #ececec; border-bottom: 1px solid #ececec; padding: 10px">
                <div align="left">
                    <v-btn
                        :loading="loading"
                        :disabled="options.length < 3 || surveyDescription === '' || question === '' "
                        depressed
                        @click="dispatchSaveSurvey()"
                        :style="`background: #419453; font-weight: bold; font-size: 18px border-radius: 0px; color: white; text-transform: none;`">
                        Guardar
                    </v-btn>
                    <v-btn
                        depressed
                        v-if="!survey"
                        @click="cancelAccordion()"
                        :style="`background: #cbf6e3; color: #019352; font-weight: bold;  font-size: 18px; border-radius: 0px; text-transform: none;`">
                        Cancelar
                    </v-btn>                    
                    <!-- <v-btn flat :disabled="options.length < 3" @click="dispatchSaveSurvey()" :style="`background: #2e7675; color: white; border-radius: 10px; color: white; text-transform: none;`">
                        <v-icon v-if="!saveSurvey" left dark style="margin-left: -10px">save</v-icon>
                        <span v-if="!saveSurvey" style="margin-left: -10px">Guardar Encuesta</span>
                        <v-progress-circular
                            v-if="saveSurvey"
                            size="20"
                            indeterminate
                            color="white"
                            ></v-progress-circular>   
                    </v-btn> -->
                    <!-- <v-btn flat v-if="!survey" @click="cancelAccordion()" :style="`background: rgb(201, 201, 201); color: grey; border-radius: 10px; color: white; text-transform: none;`">
                        <span style="color: black">Cancelar</span>
                    </v-btn>                 -->
                    <v-btn flat v-if="survey" :disabled="newSubPartComponentAccordionOpen || subPartComponentAccordionOpened" @click="showOptionsToCreateSurveys()" :style="`background: ${newSubPartComponentAccordionOpen || subPartComponentAccordionOpened ? 'rgb(201, 201, 201)' : '#2e7675'}; font-size: 16px; color: grey; border-radius: 10px; color: white; text-transform: none;`">
                        <v-icon left dark style="margin-left: -10px">add</v-icon>
                        <span style="margin-left: -10px; font-weight: bold">Crear una nueva encuesta</span>
                    </v-btn>
                </div>                
            </div>
            <div v-if="!firstOne" style="width: 100%; border-top: 1px solid transparent; padding: 10px">
                <div align="center">
                    <v-btn flat @click="showOptionsToCreateSurveys()" :disabled="newSubPartComponentAccordionOpen || subPartComponentAccordionOpened" :style="`background: ${newSubPartComponentAccordionOpen || subPartComponentAccordionOpened? 'rgb(201, 201, 201)' : '#2e7675'}; font-size: 16px; border-radius: 10px; color: white; text-transform: none;`">
                        <v-icon left dark style="margin-left: -10px">add</v-icon>
                        <span style="margin-left: -10px; font-weight: bold">Crear una nueva encuesta</span>
                    </v-btn>
                </div>                
            </div>
        </div>  
    </div>    
    <div v-if="!isNew" :style="`background-color: white; border-bottom: ${subPartComponentAccordionOpen ? '' : '1px solid #ececec'}`">
        <div v-if="index===0 && !$vuetify.breakpoint.smAndDown" align="right" style="position: absolute; top: 180px; left: 992px; height: 100%; background: transparent;">
            <button @click.prevent="goToPreview()" style="position: sticky; top: 85px; z-index: 200; background-color: #207bc1; height: 35px; width: 144px; color: white; text-transform: none;">
                <v-icon left dark style="font-size: 16px; font-weight: bold;">fas fa-sign-out-alt</v-icon>
                <span style="font-size: 16px; font-weight: bold; margin-left: 15px">Vista Previa</span>
            </button>
        </div>
        <div :style="isUnique 
                    ? 'width: 100%; height: 100%;  background: white; border-bottom: 1px solid #d4d4d4;border-right: 1px solid #d4d4d4; border-left: 1px solid #d4d4d4; border-radius: 1px;' 
                    : isLast ? 
                    'margin-bottom: 0px; width: 100%; height: 100%  background: white; border-bottom: 1px solid #d4d4d4;border-left: 1px solid #d4d4d4;border-right: 1px solid #d4d4d4; border-bottom-left-radius: 1px; border-bottom-right-radius: 1px;' : 
                    isFirst ? 'margin-bottom: 0px; width: 100%; height: 100%  background: white;border-left: 1px solid #d4d4d4;border-right: 1px solid #d4d4d4;' : 
                    'margin-bottom: 0px; width: 100%; height: 100%  background: white;border-left: 1px solid #d4d4d4;border-right: 1px solid #d4d4d4;'">
            <v-layout align-start justify-start row :style="`background: ${editing?'#F8F9FA' : ''}; border-bottom: ${subPartComponentAccordionOpen ? '1px solid #ececec' : 'none'}; padding-bottom: 10px`" @click="notClick ? null : subPartComponentAccordionOpen ? editing ? subPartComponentAccordionOpen : subPartComponentAccordionOpen = false: subPartComponentAccordionOpen = true; dispatchOpen()">
                <v-flex style="user-select: none; cursor: pointer; text-align: left; height:40px">
                    <div style="display: flex">
                        <div>
                            <v-icon v-if="!subPartComponentAccordionOpen" center style="color: black; font-size: 15px; padding-top: 17px; padding-left: 15px; padding-right: 15px;">fas fa-angle-right</v-icon>
                        </div>
                        <div><v-icon v-if="subPartComponentAccordionOpen" center style="color: black; font-size: 15px; padding-top: 17px; padding-left: 15px; padding-right: 15px;">fas fa-angle-down</v-icon></div>
                        <div style="margin-top: 14px; flex-grow: 7" v-if="!editing"><span style="font-size: 16px; color: #425056; font-family: Arial">{{survey.description}}</span></div>
                        <input 
                            @focus="optionFocused = true; isTitleOnly = true"
                            @blur="optionFocused = false; isTitleOnly = false"
                            @mouseover="titleOver = true"
                            @mouseleave="titleOver = false"
                            :disabled="survey.description.trim() === 'Beneficios de Nuestra Ayuda'"
                            v-if="editing"
                            type="text" 
                            v-model="survey.description" 
                            :style="`width: ${$vuetify.breakpoint.smAndDown ? '100%' : '45%'}; margin-top: 14px;
                                    cursor: ${optionFocused && isTitleOnly ? 'text' : 'pointer'};
                                    border-bottom: ${editing && optionFocused && isTitleOnly? '1px solid blue' : 'none'}; 
                                    background: ${titleOver && !isTitleOnly && !mouseOverInput ? '#D1E1ED' : 'transparent'};
                                    outline: none; 
                                    color: #425056; 
                                    font-size: 16px`"
                        />
                        <!-- <div><v-icon @click="editing = true; subPartComponentAccordionOpen = true;" center style="color: gray; font-size: 15px; padding-top: 12px; padding-right: 15px;">fas fa-pen</v-icon></div>
                        <div><v-icon @click="dialog = true" center style="color: gray; font-size: 15px; padding-top: 12px; padding-right: 35px;">fas fa-trash-alt</v-icon></div> -->
                    </div>
                </v-flex>
            </v-layout>
            <v-layout :style="`height: 100%; background: ${editing?'#F8F9FA' : ''};`" v-if="subPartComponentAccordionOpen" align-start="" justify-start="" :class="editing ? ats('column', '=', 'row') : 'row'" fill-height>
                    <v-flex :class="ats('xs12', '=', 'xs9')" :style="ats(`width: 100%; height: 100%; background: ${editing?'#F8F9FA' : ''};`, '=', `height: 100%; background: ${editing?'#F8F9FA' : ''}; margin-left: 18px`)">
                        <div v-if="subPartComponentAccordionOpen" style="text-align: left; margin-left: 20px; margin-top: 7px; margin-bottom: 10px;">
                            <span v-if="!editing" style="font-weight: bold; font-size: 16px;">
                                {{survey.question ? survey.question : '¿Cuales fueron los aspectos mas valiosos del servicio prestado?'}}
                            </span>
                            <input
                                @focus="optionFocused = true; isQuestionOnly = true"
                                @blur="optionFocused = false; isQuestionOnly = false"
                                @mouseover="questionIsOver = true"
                                @mouseleave="questionIsOver = false"                            
                                v-if="editing"
                                type="text" 
                                :placeholder="`${survey.question}`" 
                                v-model="survey.question"
                                :disabled="survey.question.trim() === '¿Cuales fueron los aspectos más útiles del servicio?' || survey.question.trim() === '¿Cuales fueron los aspectos mas valiosos del servicio prestado?'"                                
                                :style="`border-bottom: ${editing && optionFocused && isQuestionOnly ? '1px solid blue' : 'none'}; 
                                cursor: ${optionFocused  && isQuestionOnly ? 'text' : 'pointer'};
                                background: ${questionIsOver && !isQuestionOnly && !mouseOverInput ? '#D1E1ED' : 'transparent'};
                                color: #425056; 
                                font-size: font-size: ${ats('13px', '=', '16px')};
                                font-weight: bold; width: 88%; outline: none; height: 35px;`"
                            />                        
                        </div>
                        <div v-for="(option, index) in survey.options" v-bind:key="index" align="left" style="padding: 0px 20px 38px 20px">
                            <div v-if="!editing" style="display: flex">
                                <div style="margin-top: 3px; margin-right: 20px;"><input type="radio" value=""><br></div>
                                <!-- <div :style="`width: ${(option.optionDescription.length*8)}px`"> -->
                                <div style="margin-right: 10px;">
                                    <span style="font-size: 16px; color: #425056; font-family: 'Arial'; background: transparent; outline: none; height: 35px;">{{option.optionDescription}}</span>
                                    <!-- <input disabled type="text" :placeholder="`${option.optionDescription}`"
                                        :style="`width: 100%; font-size: 15px; background: transparent; outline: none; height: 35px; border-radius: 2px;`"
                                    >  -->
                                </div>
                                <!-- <div v-if="option.validations.length !== 0" style="width: 60%; padding-top: 7px;  margin-left: -0 "> -->
                                <div v-if="option.validations.length !== 0" style="margin-left: -0 ">
                                    <span :style="ats('font-size: 12px', '=', '')">• {{option.validations.length}} Validaciones</span>
                                </div>
                            </div>                          

                            <div v-if="editing" :style="`display: flex; margin-top: ${index>0 ? '-20px' : ''};`">
                                <div :style="`margin-top: ${option.validations.length !== 0 ? '3px' : index>0 ? '0px' : '10px'}; margin-right: 20px`"><input type="radio" value=""><br></div>
                                <div v-if="editing && option.validations.length === 0" :style="`width: ${option.validations.length !== 0 ? `${(option.optionDescription.length*8)}px`: '100%'}`">
                                    <input 
                                        v-if="editing"
                                        @focus="optionFocused = true; activateInputIndex=index"
                                        @blur="optionFocused = false; activateInputIndex=null"
                                        @mouseover="mouseOverInput = true; overInputActivate=index"
                                        @mouseleave="mouseOverInput = false; overInputActivate=null"
                                        :class="activateInputIndex !== index ? 'optionsInput' : ''"
                                        type="text" 
                                        maxlength="83"
                                        :placeholder="`${option.optionDescription}`"                                     
                                        v-model="option.optionDescription"
                                        :style="`width: ${option.validations.length !== 0 ? '100%' : '68%'}; 
                                                margin-top: ${index>0 ? '-20px' : ''};
                                                cursor: ${optionFocused && activateInputIndex===index ? 'text' : 'pointer'};
                                                border-bottom: ${editing && optionFocused && activateInputIndex === index ? '1px solid blue' : 'none'}; 
                                                background: ${mouseOverInput && overInputActivate === index && !optionFocused ? '#D1E1ED' : 'transparent'};
                                                outline: none; 
                                                color: #425056;
                                                font-size: font-size: ${ats('13px', '=', '16px')};
                                                height: 35px; 
                                                `"
                                    />                                                
                                    <div align="right" :style="`opacity: ${optionFocused && activateInputIndex === index ? 1 : 0}; margin-right: 225px`"><span style="text-align: right; font-size: 12px">{{option.optionDescription.length}}/83<v-tooltip right max-width="200px"><v-icon slot="activator" left dark style="color: #949494; font-size: 14px; margin-left: 2px">fas fa-info-circle</v-icon><span>Maximo 55 caracteres para la opcion de tu encuesta</span></v-tooltip></span></div>
                                </div>
                                <div v-if="editing && option.validations.length !== 0" style="display: flex">
                                    <!-- <div style="margin-top: 10px; margin-right: 20px;"><input type="radio" value=""><br></div> -->
                                    <!-- <div :style="`width: ${(option.optionDescription.length*8)}px`"> -->
                                    <div style="margin-right: 10px;">
                                        <span style="font-family: Arial; cursor: pointer; font-size: 16px; color: #425056; background: transparent; outline: none; height: 35px;">{{option.optionDescription}}</span>
                                        <!-- <input disabled type="text" :placeholder="`${option.optionDescription}`"
                                            :style="`width: 100%; font-size: 15px; background: transparent; outline: none; height: 35px; border-radius: 2px;`"
                                        >  -->
                                    </div>
                                    <!-- <div v-if="option.validations.length !== 0" style="width: 60%; padding-top: 7px;  margin-left: -0 "> -->
                                    <div v-if="option.validations.length !== 0" style="margin-left: -0 ">
                                        <span :style="ats('font-size: 12px', '=', '')">• {{option.validations.length}} Validaciones</span>
                                    </div>
                                </div>                                  
                                <!-- <div v-if="option.validations.length !== 0" :style="`width: 60%; padding-top: ${index === 0 ? '7px' : '0px'}; margin-left: 0`">
                                    <span>• {{option.validations.length}} Validaciones</span>
                                </div> -->
                            </div>
                            <!-- <br v-if="!editing"/>                             -->
                            <!-- <div v-if="optionFocused" align="right" style="margin-right: 55px">
                                <span style="text-align: right; font-size: 10px">{{!survey.options[index] ? 0 : getCharCounter(index, 1)}}/55</span>
                            </div>                             -->
                        </div>
                        <div v-if="optionsQuantity>0 && editing" align="left" style="width: 100%; padding: 0 20px 32px 20px; margin-top: -28px">
                            <div v-for="index in optionsQuantity" :key="index" style="display: flex;">
                                <div style="margin-top: 10px; margin-right: 20px;"><input type="radio" value=""><br></div>
                                <div style="width: 100%">
                                    <input
                                        :key="index"
                                        @focus="optionFocused = true; activateInputIndexx = index+0.3"
                                        @blur="optionFocused = false; activateInputIndexx = null"
                                        @mouseover="mouseOverInput = true; overInputActivatex=index"
                                        @mouseleave="mouseOverInput = false; overInputActivatex=null"
                                        :class="activateInputIndexx !== index+0.3 ? 'optionsInput' : ''"
                                        type="text" 
                                        maxlength="83"
                                        :placeholder="`Haga clic para escribir nueva opciòn`" 
                                        v-model="options[index]"
                                        :style="`cursor: ${optionFocused && activateInputIndexx === index+0.3 ? 'text' : 'pointer'};
                                        border-bottom: ${optionFocused && activateInputIndexx === index+0.3 ? '1px solid blue' : 'none'};
                                        color: #425056; font-size: font-size: ${ats('13px', '=', '16px')}; font-family: 'Arial';
                                        background: ${mouseOverInput && overInputActivate === index+0.3 && !optionFocused ? '#D1E1ED' : 'transparent'}; width: 68%; outline: none; height: 35px; margin-bottom: 12px`"
                                    />
                                    <div align="right" :style="`margin-top: -4px; opacity: ${optionFocused && activateInputIndexx === index+0.3 ? 1 : 0}; margin-right: 225px`"><span style="text-align: right; font-size: 12px">{{!options[index] ? 0 : getCharCounter(index)}}/83<v-tooltip right max-width="200px"><v-icon slot="activator" left dark style="color: #949494; font-size: 14px; margin-left: 2px">fas fa-info-circle</v-icon><span>Maximo 55 caracteres para la opcion de tu encuesta</span></v-tooltip></span></div>                                    
                                    <!-- <div v-if="optionFocused && activateInputIndexx === index+0.3" align="right" style="margin-right: 170px"><span style="text-align: right; font-size: 12px">{{!options[index] ? 0 : getCharCounter(index)}}/55<v-tooltip right max-width="200px"><v-icon slot="activator" left dark style="color: black; font-size: 12px; margin-left: 2px">fas fa-info-circle</v-icon><span>Maximo 55 caracteres para la opcion de tu encuesta</span></v-tooltip></span></div> -->
                                </div>
                            </div>
                        </div> 
                        <div v-if="survey.showExtra" align="left" :style="`margin-top: ${editing ? '-28px' : '0'}; padding: 0px 20px 20px 20px; display: flex`">
                            <div style="margin-top: 10px; margin-right: 20px;"><input type="radio" value=""><br></div>
                            <div :style="ats('margin-top: 7px; margin-right: 20px; font-size: 12px', '=', 'margin-top: 7px; margin-right: 20px; font-size: 16px')">Otras Opciones</div>
                            <div v-if="!$vuetify.breakpoint.smAndDown" style="width: 52%">
                                <input
                                    v-if="!survey.extraOptionTitle"
                                    disabled
                                    type="text" 
                                    maxlength="83"
                                    placeholder="Escribe tu respuesta"
                                    :style="`font-size: 13px; border:1px solid #cecece;background: #f5f4f2; width: 100%; outline: none; height: 41px; border-radius: 2px; color: #425056`"
                                >                                
                                <input
                                    v-if="survey.extraOptionTitle"
                                    disabled
                                    type="text" 
                                    maxlength="83"
                                    v-model="survey.extraOptionTitle"
                                    :style="`font-size: 13px; border:1px solid #cecece;background: #f5f4f2; width: 100%; outline: none; height: 41px; border-radius: 2px; color: #425056`"
                                >
                            </div>
                            <br/>
                            <div v-if="survey.extraOptions.length !== 0" style="margin-left: 2%; padding-top: 7px">
                                <span :style="ats('font-size: 12px', '=', '')">• {{getTotalOtherValidations(survey)}} Validaciones</span>
                            </div>
                            <!-- <div v-if="optionFocused && activateInputIndex === index" align="right" style="margin-right: 170px"><span style="text-align: right; font-size: 12px">{{!options[index] ? 0 : getCharCounter(index)}}/55<v-tooltip right max-width="200px"><v-icon slot="activator" left dark style="color: black; font-size: 12px; margin-left: 2px">fas fa-info-circle</v-icon><span>Maximo 55 caracteres para la opcion de tu encuesta</span></v-tooltip></span></div> -->
                            <!-- v-autowidth="{maxWidth: '960px', minWidth: '20px', comfortZone: 0}" -->
                        </div>   
                    </v-flex>
                    <v-flex v-if="!editing" :style="`background: #f2f6f9; height: ${survey.options.length === 3 ? 376 : 65*survey.options.length+186}px; text-align: left`">
                        <v-layout align-start justify-start column style="margin-top: 12px; margin-left: 20px;">
                            <v-flex style="user-select: none; height: 60px">
                                <div><span :style="ats('font-weight: bold; color: #425056; font-family: Arial; font-size: 12px', '=', 'font-weight: bold; color: #425056; font-family: Arial; font-size: 16px')">Opciones</span></div> <!-- cuadro azul con data para ver-->
                                <div><span>{{survey.options.length+(survey.showExtra ? 1 : 0)}}</span></div>
                            </v-flex>
                            <v-flex style="user-select: none; height: 60px">
                                <div><span :style="ats('font-weight: bold; color: #425056; font-family: Arial; font-size: 12px', '=', 'font-weight: bold; color: #425056; font-family: Arial; font-size: 16px')">Validaciones</span></div>                          
                                <div><span>{{getHappyClients(survey).length+getTotalOtherValidations(survey)}}</span></div>
                            </v-flex>
                            <v-flex style="user-select: none; height: 60px">
                                <div><span :style="ats('font-weight: bold; color: #425056; font-family: Arial; font-size: 12px', '=', 'font-weight: bold; color: #425056; font-family: Arial; font-size: 16px')">Clientes</span></div>
                                <div><span>{{getHappyClients(survey).length}}</span></div>
                            </v-flex>                              
                        </v-layout>                      
                    </v-flex>
                    <v-flex v-if="editing" :style="`${ats('width: 100%;', '=', '')}background: #f2f6f9; height: ${ats('100%', '=', `${survey.options.length === 3 ? 376+(optionsQuantity>0?optionsQuantity*60:0) : 65*survey.options.length+230}px`)}; text-align: left`">
                        <v-layout align-start justify-start column style="margin-top: 12px; margin-left: 20px;">
                            <v-flex style="user-select: none; height: 100%;">
                                <div style="margin-bottom: 10px;"><span :style="ats('font-weight: bold; color: #425056; font-family: Arial; font-size: 12px', '=', 'font-weight: bold; color: #425056; font-family: Arial; font-size: 16px')">Opciones</span></div>
                                <div>
                                    <span @click="removeOptions()" style="padding-left: 4px; padding-right: 4px; padding-top: 1px; border-radius: 50%; border: 0.5px solid grey; color: grey; cursor: pointer">–</span> 
                                    {{survey.options.length + optionsQuantity+(survey.showExtra ? 1 : 0)}}
                                    <span @click="survey.options.length + optionsQuantity === 8 ? '' : optionsQuantity++" style="position: relative; index: 201; padding-left: 5px; padding-right: 5px; padding-top: 1px; border-radius: 50%; border: 0.5px solid grey; color: grey; cursor: pointer">+</span>
                                </div>
                                <div style="margin-top: 10px">
                                    <label class="container" :style="ats('color: #425056; font-family: Arial; font-size: 12px', '=', 'color: #425056; font-family: Arial; font-size: 16px')">Respuesta única
                                        <input type="radio" checked="checked" name="radio">
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="container" :style="ats('color: #425056; font-family: Arial; font-size: 12px', '=', 'color: #425056; font-family: Arial; font-size: 16px')">Respuesta multiple
                                        <input type="radio" checked="checked" name="radio">
                                        <span class="checkmark"></span>
                                    </label>                                       
                                </div>
                            </v-flex>
                            <v-flex style="user-select: none;">
                                <div style="margin-bottom: 12px;"><span :style="ats('font-weight: bold; font-size: 12px; color: #425056', '=', 'font-weight: bold; font-size: 16px; color: #425056')">Añadir Otras Opciones</span></div>
                                <label class="container">Permitir que los clientes respondan <br> con su propia validación
                                    <input type="checkbox" :checked="survey.showExtra" v-model="survey.showExtra" name="radio">
                                    <span class="checkmark"></span>
                                </label>
                            </v-flex>                              
                            <!-- <v-flex style="user-select: none;">
                                <div style="margin-bottom: 12px;"><span style="font-weight: bold;">Respuestas</span></div>
                                <label class="container">Respuesta inicia
                                    <input type="radio" checked="checked" name="radio">
                                    <span class="checkmark"></span>
                                </label>
                                <label class="container">Respuesta multiple
                                    <input type="radio" checked="checked" name="radio">
                                    <span class="checkmark"></span>
                                </label>                            
                            </v-flex> -->
                        </v-layout>
                    </v-flex>                    
            </v-layout>
            <div v-if="!justShow && editing" style="width: 100%; border-top: 1px solid #ececec; border-bottom: 1px solid #ececec; padding: 10px">
                <div align="left">
                    <v-btn
                        :loading="loading"
                        depressed
                        @click="dispatchEditSurvey()"
                        :style="`background: #419453; color: white; border-radius: 0px; color: white; text-transform: none; font-weight: bold; font-size: 18px`">
                        Guardar
                    </v-btn>
                    <v-btn
                        depressed
                        @click="cancelAccordion(1)"
                        :style="`background: #cbf6e3; color: #019352; font-weight: bold; border-radius: 0px; text-transform: none; font-size: 18px`">
                        Cancelar
                    </v-btn>                      
                    <!-- <v-btn flat @click="dispatchEditSurvey()" :style="`background: #2e7675; color: white; border-radius: 10px; color: white; text-transform: none;`">
                        <v-icon v-if="!saveSurvey" left dark style="margin-left: -10px">save</v-icon>
                        <span v-if="!saveSurvey" style="margin-left: -10px">Guardar Encuesta</span>
                        <v-progress-circular
                            v-if="saveSurvey"
                            indeterminate
                            size="20"
                            color="white"
                            ></v-progress-circular>                        
                    </v-btn> -->
                    <!-- <v-btn flat @click="cancelAccordion(1)" :style="`background: rgb(201, 201, 201); color: grey; border-radius: 10px; color: white; text-transform: none;`">
                        <span style="color: black">Cancelar</span>
                    </v-btn> -->
                </div>                
            </div> 
            <v-layout align-center justify-center row fill-height v-if="subPartComponentAccordionOpen && !editing" style="padding: 20px; border-top: 1px solid #ececec; border-bottom: 1px solid #ececec;">
                <v-flex xs9>
                    <div>
                        <div @click="editing = true; subPartComponentAccordionOpen = true;" style="cursor: pointer; text-align: left;"><span :style="ats('text-decoration: underline; color: #429554; font-size: 12px; margin-left: 20px', '=', 'text-decoration: underline; color: #429554; font-size: 15px; margin-left: 20px')">EDITAR ENCUESTA</span></div>
                    </div>
                </v-flex>
                <v-flex xs3 style="position: relative; z-index: 3">
                    <div>
                        <div @click="dialog = true" :style="ats('text-decoration: underline; font-size: 12px;cursor: pointer', '=', 'text-decoration: underline; font-size: 15px;cursor: pointer')">ELIMINAR<v-icon center :style="ats('color: gray; font-size: 12px; padding-top: 12px; padding-right: 35px; margin-left: 10px', '=', 'color: gray; font-size: 15px; padding-top: 12px; padding-right: 35px; margin-left: 10px')">fas fa-trash-alt</v-icon></div>
                    </div>
                </v-flex>

            </v-layout>
            <div v-if="!justShow && isLast" style="width: 100%; border-top: 1px solid #ececec; padding: 10px">
                <div align="center">
                    <v-btn flat :disabled="subPartComponentAccordionOpen || subPartComponentAccordionOpened || !buttonDisabled" @click="showOptionsToCreateSurveys()" :style="`background: ${subPartComponentAccordionOpen || subPartComponentAccordionOpened || !buttonDisabled? 'rgb(201, 201, 201)' : '#2e7675'}; border-radius: 10px; color: ${subPartComponentAccordionOpen ? 'grey' : 'white'}; text-transform: none;`">
                        <v-icon left dark style="margin-left: -10px">add</v-icon>
                        <span style="margin-left: -10px; font-weight: bold;">Crear una nueva encuesta</span>
                    </v-btn>
                </div>                
            </div>                       
        </div>  
    </div>     

    <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
            <v-card-title class="headline">¿Borrar esta encuesta?</v-card-title>
            <v-card-text class="caption py-2" style="text-align:left">Se perderán todas las validaciones y opciones de esta encuesta permanentemente.</v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="font-weight-bold" flat @click.native="dialog = false">Cancelar</v-btn>
            <v-btn color="primary" class="font-weight-bold" flat @click.native="removeSurvey(); dialog = false">Confirmar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>      
</div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import VueInputAutowidth from 'vue-input-autowidth'
Vue.use(VueInputAutowidth)

export default {
    props: ['buttonDisabled', 'notClick', 'isFirst','isUnique','saveSurvey', 'subPartComponentAccordionOpened', 'surveyDescription','question' ,'index', 'isNew', 'survey', 'showBoxes', 'category', 'restartOptions', 'isLast', 'url', 'justShow', 'firstOne'],
    computed: {
        ...mapGetters('auth', ['isLoggedIn', 'currentUser']),
    },
    watch: {
        restartOptions: (prev, current) => {
            current ? this.options = [] : false
        },
        saveSurvey: {
            handler: function(current, prev) {
                if(current) {
                    this.saveSurvey = false
                    // this.subPartComponentAccordionOpen = false;
                    // this.newSubPartComponentAccordionOpen = false;
                    // this.editing = false;   
                }
            },
            deep: true
        }
    },
    data() {
        return {
            isQuestionOnly: false,
            questionIsOver: false,      
            overInputActivatex:null,
            overInputActivate: null,
            isTitleOnly: false,
            titleOver: null,
            byClient: true,
            extraOptionTitle: 'Escribe tu Respuesta',
            loading: false,
            mouseOverInput: false,
            activateInputIndex: null,
            activateInputIndexx: null,
            editing: false,
            optionFocused: false,
            dialog: false,
            options: [],
            // question: '',
            optionsQuantity: 3,
            subPartComponentAccordionOpen: false,
            newSubPartComponentAccordionOpen: true,
        }
    }    ,
    methods: {
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
        getTotalOtherValidations(survey) {
            let total = 0;
            survey.extraOptions.forEach(option => {
                total = total + option.validations.length
            })
            // console.log('total others validations', total);
            return total;
        },
        dispatchOpen() {
            let p = {open: this.subPartComponentAccordionOpen, index: this.index};
            this.$emit('dispatchOpen', p)
        },
        getCharCounter(index, type = 0) {
            const w = (' ' +  this.options[index]).slice(1);
            // console.log(w)
            // const y = (' ' +  this.survey.options[index]).slice(1);
            // return type === 0 ? w.length : y.length
            return w.length
        },
        showCreateQuestionFromScratch() {
            this.$emit('dispatchShowCreateQuestionFromScratch', true)
        },
        showCreateFromAQuestion() {
            this.$emit('dispatchShowCreateFromAQuestion', true)
        },
        showOptionsToCreateSurveys() {
            this.$emit('dispatchShowOptionsToCreateSurveys', true)
        },
        getHappyClients (survey) {
            let validations = []
            survey.options.forEach(option => {
                option.validations.forEach(validation => {
                    validations.push(validation)
                })
            })
            return validations
        },        
        goToPreview() {
            this.$emit('dispatchPreview', this.options.length === 0 ? 
                                        [null, 'Haga clic para escribir Opción 1', 'Haga clic para escribir Opción 2', 'Haga clic para escribir Opción 3'] : 
                                        this.options)
        },
        removeOptions() {
            if(this.options[this.optionsQuantity]) {
                this.options.splice(this.optionsQuantity, 1);
                this.optionsQuantity--;
            } else {
                if(this.optionsQuantity !== 0) {
                    this.options.splice(this.optionsQuantity, 1);
                    this.optionsQuantity--;
                }
            }
            // options[optionsQuantity] ? options.splice(optionsQuantity, 1) : optionsQuantity === 0 ? '' : optionsQuantity--;
        },
        dispatchSaveSurvey() {
            this.saveSurvey = true
            // let p = [...this.options, this.question];
            let p = [...this.options];
            p.shift()
            this.optionsQuantity = 3
            this.$emit('dispatchSaveSurvey', {p, extraOptionTitle: this.extraOptionTitle, showExtra: this.byClient, surveyDescription: this.surveyDescription, question: this.question});
            // this.buttonDisabled = true
            //this.$emit('question', this.question)
        },
        dispatchEditSurvey() {
            this.saveSurvey = true
            // console.log(this.options)
            this.options.shift()
            let newOptions = this.options.map(option => {
                return {
                    optionDescription: option,
                    validations: []
                }
            });
            // console.log(newOptions)            
            this.survey.options = [...this.survey.options, ...newOptions]
            // this.survey.extraOptionTitle = this.extraOptionTitle
            console.log('EDITING:', this.survey)
            // console.log(this.survey)
            this.$emit('dispatchEditSurvey', {index: this.index, survey: this.survey})         
            this.subPartComponentAccordionOpen = false;
            this.newSubPartComponentAccordionOpen = false;
            this.options = []
            this.optionsQuantity = 0
            this.editing = false;               
        },
        async removeSurvey () {
            const response = await this.$store.dispatch('company/removeSurvey', { description: this.survey.description })
            if (response.success === true) {
            this.$emit('populateBeforeSurveyRemove', response)
            } else {
                console.log('Something went wrong :(')
            }
        },
        cancelAccordion(type = 0) {
            // options = []; newSubPartComponentAccordionOpen = false;
            if(type === 0) {
                this.$emit('cancelAccordion', true);
                this.optionsQuantity = 0
                this.buttonDisabled = true
            } else {
                this.optionsQuantity = 0
                this.subPartComponentAccordionOpen = false;
                this.newSubPartComponentAccordionOpen = false;
                this.editing = false;
                this.options = []
                this.$emit('cancelAccordion', false);
                // this.buttonDisabled = true
            }
            
        }
    },
    created() {
        if (!this.isNew) this.optionsQuantity = 0
    },
    updated() {
        // console.log(this.survey)
    }
}
</script>

<style>

.optionsInput:hover {
    background-color: #D1E1ED !important;
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
  border-radius: 50%;
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
    background: #F8F9FA;
    cursor: pointer;
}

/* Style the indicator (dot/circle) */
.container .checkmark:after {
 	top: 3px;
	left: 3px;
	width: 6px;
	height: 6px;
	border-radius: 50%;
	background: #2e7675;
}

</style>

