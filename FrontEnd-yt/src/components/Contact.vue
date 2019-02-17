<template>
    <div>
        <div v-if="justLogin">
            <v-flex xs12>
                <div :class="ats('px-3' ,'=', '')" >
                    <span class="font-weight-bold mr-2 font-size-16" align-center justify-center row fill-height>¡Ahorra Tiempo!</span>
                    <br/>
                    <div v-if="!isGoogleOk && !isFacebookOk" align-center justify-center row fill-height>
                        <span
                        class="blue--text text--accent-4 font-size-16"
                        style="cursor: pointer; text-decoration: underline"
                        >Inicia sesión con tu red social de preferencia</span>
                        <v-tooltip right max-width="200px">
                        <v-icon slot="activator" color="grey darken-4">help</v-icon>
                        <!--<span>Usamos Linkedin para facilitarte el inicio de sesión y asegurarnos que las recomendaciones en Yes Them sean de usuarios reales. Tu cuenta Linkedin será únicamente para iniciar sesión. Yes Them no tiene acceso a tus contactos ni puede publicar nada en tu cuenta de Linkedin.</span>-->
                        <span>Usamos Linkedin, Facebook y Google para facilitarte el inicio de sesión y asegurarnos que las recomendaciones en Yes Them sean de usuarios reales. Tu cuenta Linkedin, Facebook y Google serán únicamente para iniciar sesión. Yes Them no tiene acceso a tus contactos ni puede publicar nada en tus cuentas</span>
                        </v-tooltip>
                    </div>

                    <v-layout
                        align-center
                        justify-center
                        row
                        fill-height
                        v-if="!isGoogleOk && !isFacebookOk">

                        <v-btn
                            fab
                            dark
                            small
                            color="blue accent-4"
                            :disabled="status.loading"
                            @click.prevent.stop="Login(true)"
                        >
                        <v-icon dark>fab fa-linkedin</v-icon>
                        </v-btn>

                        <g-signin-button
                            :params="googleSignInParams"
                            @success="onSignInSuccess"
                            @error="onSignInError"
                        >
                            <v-btn fab dark small color="red_button" ref="signInGoogleBtn">
                                <v-icon dark>fab fa-google</v-icon>
                            </v-btn>
                        </g-signin-button>

                        <fb-signin-button
                            :params="fbSignInParams"
                            @success="facebookOk"
                            @error="facebookNotOk"
                        >
                            <v-btn fab dark small color="blue accent-4">
                                <v-icon dark>fab fa-facebook</v-icon>
                            </v-btn>
                        </fb-signin-button>

                    </v-layout>
                </div>
                <div class="mt-2" v-if="!isGoogleOk && !isFacebookOk">
                    <span
                        class="font-size-12 font-weight-bold grey--text text--darken-1"
                    >o date de alta manualmente</span>
                </div>

                <v-flex xs12>
                    <v-form
                    class="white"
                    ref="formNoLinkedin"
                    v-model="valid"
                    v-if="isGoogleOk === false && isFacebookOk === false && isLinkedinOk === false"
                    enctype="multipart/form-data"
                    >
                        <v-layout row wrap pt-4 pb-4 px-4>
                            <v-flex xs12 style="margin-left: 5%">
                                <v-text-field
                                v-model="user.data.firstName"
                                label="Nombre"
                                :rules="nameRules"
                                maxlength="60"
                                required
                                :flat="ats(true, true, false)"
                                :solo="ats(true, true, false)"
                                :placeholder="ats('Nombre', 'Nombre', '')"
                                :style="ats('border: 1px solid #e3e3e3', '=', '')"
                                color="blue accent-4"
                                
                                :hide-details="ats(true, true, false)"
                                append-icon="fas fa-pencil-alt"
                                ></v-text-field>
                                <!-- :disabled="status.loading" -->

                                <v-text-field
                                v-model="user.data.lastName"
                                label="Apellidos"
                                :rules="nameRules"
                                maxlength="30"
                                required
                                :flat="ats(true, true, false)"
                                :solo="ats(true, true, false)"
                                :placeholder="ats('Apellidos', 'Apellidos', '')"
                                :style="ats('border: 1px solid #e3e3e3', '=', '')"
                                color="blue accent-4"
                                
                                :hide-details="ats(true, true, false)"
                                append-icon="fas fa-pencil-alt"
                                ></v-text-field>

                                <v-text-field
                                v-model="user.data.email"
                                label="Email"
                                :rules="nameRules"
                                maxlength="30"
                                required
                                :flat="ats(true, true, false)"
                                :solo="ats(true, true, false)"
                                :placeholder="ats('E-mail', 'E-mail', '')"
                                :style="ats('border: 1px solid #e3e3e3', '=', '')"
                                color="blue accent-4"

                                :hide-details="ats(true, true, false)"
                                append-icon="fas fa-pencil-alt"
                                ></v-text-field>

                                <v-text-field
                                v-model="user.data.phone"
                                label="Phone"
                                :rules="nameRules"
                                maxlength="30"
                                required
                                :flat="ats(true, true, false)"
                                :solo="ats(true, true, false)"
                                :placeholder="ats('Phone', 'Phone', '')"
                                :style="ats('border: 1px solid #e3e3e3', '=', '')"
                                color="blue accent-4"

                                :hide-details="ats(true, true, false)"
                                append-icon="fas fa-pencil-alt"
                                ></v-text-field>   
                                
                                <v-text-field
                                v-model="user.data.company"
                                label="Empresa u Organización"
                                :rules="nameRules"
                                maxlength="30"
                                required
                                :flat="ats(true, true, false)"
                                :solo="ats(true, true, false)"
                                :placeholder="ats('Empresa u Organización', 'Empresa u Organización', '')"
                                :style="ats('border: 1px solid #e3e3e3', '=', '')"
                                color="blue accent-4"

                                :hide-details="ats(true, true, false)"
                                append-icon="fas fa-pencil-alt"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-form>

                    <!-- FACEBOOK Y GOOGLE -->
                    <v-form
                        class="white"
                        ref="formNoLinkedin"
                        v-model="valid"
                        v-if="(isGoogleOk === false && isFacebookOk === true && isLinkedinOk === false) || (isGoogleOk === true && isFacebookOk === false && isLinkedinOk === false) || (isGoogleOk === false && isFacebookOk === false && isLinkedinOk === true) "
                        enctype="multipart/form-data"
                    >
                        <v-layout row wrap pt-5 pb-4 px-4>
                            <v-flex xs12 style="margin-left: 5%">
                                <v-text-field
                                v-model="user.data.firstName"
                                label="Nombre"
                                :rules="nameRules"
                                maxlength="60"
                                required
                                :flat="ats(true, true, false)"
                                :solo="ats(true, true, false)"
                                :placeholder="ats('Nombre', 'Nombre', '')"
                                :style="ats('border: 1px solid #e3e3e3', '=', '')"
                                color="blue accent-4"

                                :hide-details="ats(true, true, false)"
                                append-icon="fas fa-pencil-alt"
                                ></v-text-field>

                                <v-text-field
                                v-model="user.data.lastName"
                                label="Apellidos"
                                :rules="nameRules"
                                maxlength="30"
                                required
                                :flat="ats(true, true, false)"
                                :solo="ats(true, true, false)"
                                :placeholder="ats('Apellidos', 'Apellidos', '')"
                                :style="ats('border: 1px solid #e3e3e3', '=', '')"
                                color="blue accent-4"

                                :hide-details="ats(true, true, false)"
                                append-icon="fas fa-pencil-alt"
                                ></v-text-field>

                                <v-text-field
                                v-model="user.data.email"
                                label="Email"
                                :rules="nameRules"
                                maxlength="30"
                                required
                                :flat="ats(true, true, false)"
                                :solo="ats(true, true, false)"
                                :placeholder="ats('E-mail', 'E-mail', '')"
                                :style="ats('border: 1px solid #e3e3e3', '=', '')"
                                color="blue accent-4"

                                :hide-details="ats(true, true, false)"
                                append-icon="fas fa-pencil-alt"
                                ></v-text-field>

                                <v-text-field
                                v-model="user.data.phone"
                                label="Phone"
                                :rules="nameRules"
                                maxlength="30"
                                required
                                :flat="ats(true, true, false)"
                                :solo="ats(true, true, false)"
                                :placeholder="ats('Phone', 'Phone', '')"
                                :style="ats('border: 1px solid #e3e3e3', '=', '')"
                                color="blue accent-4"

                                :hide-details="ats(true, true, false)"
                                append-icon="fas fa-pencil-alt"
                                ></v-text-field>                    
                                
                                <v-text-field
                                v-model="user.data.positions.values[0].company.name"
                                v-if="isLinkedinOk"
                                label="Empresa u Organización"
                                :rules="nameRules"
                                maxlength="30"
                                required
                                :flat="ats(true, true, false)"
                                :solo="ats(true, true, false)"
                                :placeholder="ats('Empresa u Organización', 'Empresa u Organización', '')"
                                :style="ats('border: 1px solid #e3e3e3', '=', '')"
                                color="blue accent-4"
                                :disabled="status.loading"
                                :hide-details="ats(true, true, false)"
                                append-icon="fas fa-pencil-alt"
                                ></v-text-field>

                                <v-text-field
                                v-model="user.data.company"
                                label="Empresa u Organización"
                                v-if="!isLinkedinOk"
                                :rules="nameRules"
                                maxlength="30"
                                required
                                :flat="ats(true, true, false)"
                                :solo="ats(true, true, false)"
                                :placeholder="ats('Empresa u Organización', 'Empresa u Organización', '')"
                                :style="ats('border: 1px solid #e3e3e3', '=', '')"
                                color="blue accent-4"
                                :disabled="status.loading"
                                :hide-details="ats(true, true, false)"
                                append-icon="fas fa-pencil-alt"
                                ></v-text-field>

                            </v-flex>
                        </v-layout>
                    </v-form>

                    <div class="px-3 text-xs-center pt-4" style="border-top: 1px solid #e3e3e3">
                        <v-btn
                        depressed
                        :class="ats('white--text px-0 font-weight-bold button--green squared font-size-11', '=', 'white--text px-4 mx-3 font-weight-bold button--green squared')"
                        :style="ats('height:36px', '=', 'height:40px')"
                        @click="validate"
                        >Enviar</v-btn>
                    </div> 

                </v-flex>

            </v-flex>
        </div>

        <div v-if="!justLogin">
            <v-layout row wrap fill-height :justify-left="ats(false, false, true)" :justify-center="ats(true, true, false)" align-center class="" :style="isMobile ? 'margin-top: 10%' : 'margin-top: 0%'">
            
                    <div
                    class=""
                    style="cursor: pointer; text-align: center; overflow: hidden"
                    v-if="e1<=2"
                    
                    >
                    <v-btn flat @click="sendMessage = false; e1 = 1">
                        <span
                        v-if="!isMobile"
                        >S<span style="text-transform: lowercase;">elecciona en un click el servicio y resultados que te interesan</span>                    </span>
                        <span
                        v-if="isMobile"
                        >S<span style="text-transform: lowercase;">elecciona en un click el servicio y resultados<br/> que te interesan</span>                    </span>                    
                    </v-btn>
                    <br v-if="isMobile"><br v-if="isMobile">
                    <v-btn flat @click="sendMessage = true" style="height: 100%">
                        <span
                            style="border-top: 3px dashed grey; padding-top: 20px;"
                        >N<span style="text-transform: lowercase;">o gracias, prefiero enviar un mensaje.</span></span>
                        <!-- No gracias, validare sin linkedin -->
                    </v-btn>
                    </div>
            </v-layout>
            <br/>

            <v-stepper v-model="e1" v-if="!isMobile"> <!-- alt-labels -->
                <v-layout row wrap>
                    <v-flex xs12 md12>
                        <v-stepper-header v-if="!sendMessage">
                            <v-stepper-step :complete="e1 > 1" step="1" color="blue darken-3" editable @click="e1=1">
                                <span class="font-size-14 px-4 color-3f46ae" style="font-weight: 500 !important">Servicios</span>
                            </v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step :complete="e1 > 2" step="2" color="blue darken-3" editable @click="e1=2">
                                <span class="font-size-14 px-4 color-3f46ae" style="font-weight: 500 !important">Encuestas</span>
                            </v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step step="3" color="blue darken-3" editable @click="e1=3">
                                <span class="font-size-14 px-4 color-3f46ae" style="font-weight: 500 !important">Enviar</span>
                            </v-stepper-step>
                            
                        </v-stepper-header>
                    </v-flex>
                </v-layout>

                <v-stepper-header v-if="sendMessage">
                    <v-stepper-step :complete="e1 > 1" step="1" :complete-icon="'edit'" :edit-icon="'check'" editable @click="e1=3">
                        <span class="font-size-14 px-4 color-3f46ae" style="font-weight: 500 !important">Escribe un mensaje</span>
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <!--<v-stepper-step :complete="e1 > 2" step="2" :complete-icon="'edit'" :edit-icon="'check'" editable @click="e1=2">
                        <span class="font-size-14 px-4 color-3f46ae" style="font-weight: 500 !important">Encuestas</span>
                    </v-stepper-step>

                    <v-divider></v-divider>-->

                    <v-stepper-step step="3" :complete-icon="'edit'" :edit-icon="'check'" editable @click="e1=3">
                        <span class="font-size-14 px-4 color-3f46ae" style="font-weight: 500 !important">Enviar</span>
                    </v-stepper-step>
                </v-stepper-header>        

                <v-stepper-items>
                <v-stepper-content step="1">
                    <!--<div class="font-size-20 px-4 color-3f46ae">
                        <span>Servicios</span>
                    </div>-->
                    <v-container fluid v-if="!sendMessage">
                        <v-radio-group v-model="serviceSelected" :mandatory="true" >
                            <div
                                class="color-00306e"
                                v-for="(service, index) in services"
                                v-bind:key="index">
                                    <v-radio 
                                        @change="onChangeService()"
                                        :value="service">
                                        <div slot="label" class="color-00306e">{{(service.category).toUpperCase()}}</div>
                                    </v-radio>
                                    <!-- <p style="font-weight: bold; font-size: 12px; margin-left: 5%" class="color-00306e">{{service.totalClients}} Clientes Contentos</p> -->
                            </div>
                        </v-radio-group>
                    </v-container>

                    <v-container v-if="sendMessage">
                    <v-form ref="contactForm">
                        <v-layout row wrap :class="$vuetify.breakpoint.smAndDown ? 'pa-0': 'pa-3'">
                        <v-flex xs12>
                            <v-textarea
                            v-model="user.data.message"
                            label="Escribe tu mensaje para la empresa"
                            maxlength="200"
                            outline
                            required
                            >
                            </v-textarea>
                        </v-flex>
                        </v-layout>
                    </v-form>                
                    </v-container>

                    <v-btn
                    @click="sendMessage ? e1 = 3 : e1 = 2"
                    depressed 
                    color="red_button"
                    style="color: white"
                    >
                    Siguiente
                    </v-btn>

                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-layout xs12>
                        <v-list subheader two-line>
                            <!--<div class="font-size-20 px-4 color-3f46ae">
                                <span>Encuestas</span>
                            </div>-->
                            <v-flex xs12 class="font-size-14 px-4 text-xs-center" justify-center align-center>
                                <div v-if="JSON.stringify(serviceSelected) === '{}'">
                                    Selecciona un servicio
                                </div>
                            </v-flex>
                            <v-list-tile v-for="(survey, index) in serviceSelected.surveys" v-bind:key="index">
                                <v-list-tile-action>
                                <v-checkbox v-model="selectedSurveys" :value="survey.description"></v-checkbox>
                                </v-list-tile-action>

                                <v-list-tile-content>
                                <v-list-tile-title class="color-00306e">{{survey.description}}</v-list-tile-title>
                                <!-- <v-list-tile-sub-title class="color-00306e" style="font-weight: bold; font-size: 12px;">{{result.validations.length}} Recomendaciones</v-list-tile-sub-title> -->
                                </v-list-tile-content>
                                <br/>
                                <!--<hr style="border-top: 1px solid rgb(204, 204, 204); width: 80%; margin-left:auto; margin-right: auto; margin-top: 2%"/>-->
                            </v-list-tile>
                            <br/>
                            <v-flex v-if="JSON.stringify(serviceSelected) !== '{}'" order-xs1 order-sm1 order-md2 pb-3 text-xs-center :class="$vuetify.breakpoint.smAndDown ? 'xs12' : ''">
                                <v-layout row wrap>
                                    <v-flex v-for="(number, index) in Math.ceil(serviceSelected.benefits.length / ats(10, 10, 25))" v-bind:key="index">
                                        <!--<span :style="page === (number - 1) ? 'border-bottom: 4px solid #494FB1; padding-bottom: 5px; padding-right: 5px; padding-left: 5px' : ''">{{number}}</span>-->
                                        <span :style="page === (number - 1) ? 'border-bottom: 4px solid #494FB1; padding-bottom: 5px; padding-right: 5px; padding-left: 5px' : ''">{{number}}</span>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-list>
                    </v-layout>

                    <v-btn
                    depressed 
                    color="red_button"
                    @click="e1 = 3"
                    style="color: white"
                    >
                    Siguiente
                    </v-btn>

                </v-stepper-content>

                <v-stepper-content step="3">
                    <v-flex xs12>
                        <!--HEADER-->
                        <v-flex xs12>
                            <div :class="ats('px-3' ,'=', '')" >
                                <span class="font-weight-bold mr-2 font-size-16" align-center justify-center row fill-height>¡Ahorra Tiempo!</span>
                                <br/>
                                <div v-if="!isGoogleOk && !isFacebookOk" align-center justify-center row fill-height>
                                    <span
                                    class="blue--text text--accent-4 font-size-16"
                                    style="cursor: pointer; text-decoration: underline"
                                    >Inicia sesión con tu red social de preferencia</span>
                                    <v-tooltip right max-width="200px">
                                    <v-icon slot="activator" color="grey darken-4">help</v-icon>
                                    <!--<span>Usamos Linkedin para facilitarte el inicio de sesión y asegurarnos que las recomendaciones en Yes Them sean de usuarios reales. Tu cuenta Linkedin será únicamente para iniciar sesión. Yes Them no tiene acceso a tus contactos ni puede publicar nada en tu cuenta de Linkedin.</span>-->
                                    <span>Usamos Linkedin, Facebook y Google para facilitarte el inicio de sesión y asegurarnos que las recomendaciones en Yes Them sean de usuarios reales. Tu cuenta Linkedin, Facebook y Google serán únicamente para iniciar sesión. Yes Them no tiene acceso a tus contactos ni puede publicar nada en tus cuentas</span>
                                    </v-tooltip>
                                </div>

                                <v-layout
                                    align-center
                                    justify-center
                                    row
                                    fill-height
                                    v-if="!isGoogleOk && !isFacebookOk">

                                    <v-btn
                                        fab
                                        dark
                                        small
                                        color="blue accent-4"
                                        :disabled="status.loading"
                                        @click.prevent.stop="Login(true)"
                                    >
                                    <v-icon dark>fab fa-linkedin</v-icon>
                                    </v-btn>

                                    <g-signin-button
                                        :params="googleSignInParams"
                                        @success="onSignInSuccess"
                                        @error="onSignInError"
                                    >
                                        <v-btn fab dark small color="red_button" ref="signInGoogleBtn">
                                            <v-icon dark>fab fa-google</v-icon>
                                        </v-btn>
                                    </g-signin-button>

                                    <fb-signin-button
                                        :params="fbSignInParams"
                                        @success="facebookOk"
                                        @error="facebookNotOk"
                                    >
                                        <v-btn fab dark small color="blue accent-4">
                                            <v-icon dark>fab fa-facebook</v-icon>
                                        </v-btn>
                                    </fb-signin-button>

                                </v-layout>
                            </div>
                            <div class="mt-2" v-if="!isGoogleOk && !isFacebookOk">
                                <span
                                    class="font-size-12 font-weight-bold grey--text text--darken-1"
                                >o date de alta manualmente</span>
                            </div>

                            <v-flex xs12>
                                <v-form
                                class="white"
                                ref="formNoLinkedin"
                                v-model="valid"
                                v-if="isGoogleOk === false && isFacebookOk === false && isLinkedinOk === false"
                                enctype="multipart/form-data"
                                >
                                    <v-layout row wrap pt-5 pb-4 px-4>
                                        <v-flex xs12 style="margin-left: 5%">
                                            <v-text-field
                                            v-model="user.data.firstName"
                                            label="Nombre"
                                            :rules="nameRules"
                                            maxlength="60"
                                            required
                                            :flat="ats(true, true, false)"
                                            :solo="ats(true, true, false)"
                                            :placeholder="ats('Nombre', 'Nombre', '')"
                                            :style="ats('border: 1px solid #e3e3e3', '=', '')"
                                            color="blue accent-4"
                                            :disabled="status.loading"
                                            :hide-details="ats(true, true, false)"
                                            append-icon="fas fa-pencil-alt"
                                            ></v-text-field>

                                            <v-text-field
                                            v-model="user.data.lastName"
                                            label="Apellidos"
                                            :rules="nameRules"
                                            maxlength="30"
                                            required
                                            :flat="ats(true, true, false)"
                                            :solo="ats(true, true, false)"
                                            :placeholder="ats('Apellidos', 'Apellidos', '')"
                                            :style="ats('border: 1px solid #e3e3e3', '=', '')"
                                            color="blue accent-4"
                                            :disabled="status.loading"
                                            :hide-details="ats(true, true, false)"
                                            append-icon="fas fa-pencil-alt"
                                            ></v-text-field>

                                            <v-text-field
                                            v-model="user.data.email"
                                            label="Email"
                                            :rules="nameRules"
                                            maxlength="30"
                                            required
                                            :flat="ats(true, true, false)"
                                            :solo="ats(true, true, false)"
                                            :placeholder="ats('Apellidos', 'Apellidos', '')"
                                            :style="ats('border: 1px solid #e3e3e3', '=', '')"
                                            color="blue accent-4"
                                            :disabled="status.loading"
                                            :hide-details="ats(true, true, false)"
                                            append-icon="fas fa-pencil-alt"
                                            ></v-text-field>

                                            <v-text-field
                                            v-model="user.data.phone"
                                            label="Phone"
                                            :rules="nameRules"
                                            maxlength="30"
                                            required
                                            :flat="ats(true, true, false)"
                                            :solo="ats(true, true, false)"
                                            :placeholder="ats('Apellidos', 'Apellidos', '')"
                                            :style="ats('border: 1px solid #e3e3e3', '=', '')"
                                            color="blue accent-4"
                                            :disabled="status.loading"
                                            :hide-details="ats(true, true, false)"
                                            append-icon="fas fa-pencil-alt"
                                            ></v-text-field>   
                                            
                                            <v-text-field
                                            v-model="user.data.company"
                                            label="Empresa u Organización"
                                            :rules="nameRules"
                                            maxlength="30"
                                            required
                                            :flat="ats(true, true, false)"
                                            :solo="ats(true, true, false)"
                                            :placeholder="ats('Empresa u Organización', 'Empresa u Organización', '')"
                                            :style="ats('border: 1px solid #e3e3e3', '=', '')"
                                            color="blue accent-4"
                                            :disabled="status.loading"
                                            :hide-details="ats(true, true, false)"
                                            append-icon="fas fa-pencil-alt"
                                            ></v-text-field>

                                        </v-flex>
                                    </v-layout>
                                </v-form>

                                <!-- FACEBOOK Y GOOGLE -->
                                <v-form
                                    class="white"
                                    ref="formNoLinkedin"
                                    v-model="valid"
                                    v-if="(isGoogleOk === false && isFacebookOk === true && isLinkedinOk === false) || (isGoogleOk === true && isFacebookOk === false && isLinkedinOk === false) || (isGoogleOk === false && isFacebookOk === false && isLinkedinOk === true) "
                                    enctype="multipart/form-data"
                                >
                                    <v-layout row wrap pt-5 pb-4 px-4>
                                        <v-flex xs12 style="margin-left: 5%">
                                            <v-text-field
                                            v-model="user.data.firstName"
                                            label="Nombre"
                                            :rules="nameRules"
                                            maxlength="60"
                                            required
                                            :flat="ats(true, true, false)"
                                            :solo="ats(true, true, false)"
                                            :placeholder="ats('Nombre', 'Nombre', '')"
                                            :style="ats('border: 1px solid #e3e3e3', '=', '')"
                                            color="blue accent-4"
                                            :disabled="status.loading"
                                            :hide-details="ats(true, true, false)"
                                            append-icon="fas fa-pencil-alt"
                                            ></v-text-field>

                                            <v-text-field
                                            v-model="user.data.lastName"
                                            label="Apellidos"
                                            :rules="nameRules"
                                            maxlength="30"
                                            required
                                            :flat="ats(true, true, false)"
                                            :solo="ats(true, true, false)"
                                            :placeholder="ats('Apellidos', 'Apellidos', '')"
                                            :style="ats('border: 1px solid #e3e3e3', '=', '')"
                                            color="blue accent-4"
                                            :disabled="status.loading"
                                            :hide-details="ats(true, true, false)"
                                            append-icon="fas fa-pencil-alt"
                                            ></v-text-field>

                                            <v-text-field
                                            v-model="user.data.email"
                                            label="Email"
                                            :rules="nameRules"
                                            maxlength="30"
                                            required
                                            :flat="ats(true, true, false)"
                                            :solo="ats(true, true, false)"
                                            :placeholder="ats('Apellidos', 'Apellidos', '')"
                                            :style="ats('border: 1px solid #e3e3e3', '=', '')"
                                            color="blue accent-4"
                                            :disabled="status.loading"
                                            :hide-details="ats(true, true, false)"
                                            append-icon="fas fa-pencil-alt"
                                            ></v-text-field>

                                            <v-text-field
                                            v-model="user.data.phone"
                                            label="Phone"
                                            :rules="nameRules"
                                            maxlength="30"
                                            required
                                            :flat="ats(true, true, false)"
                                            :solo="ats(true, true, false)"
                                            :placeholder="ats('Apellidos', 'Apellidos', '')"
                                            :style="ats('border: 1px solid #e3e3e3', '=', '')"
                                            color="blue accent-4"
                                            :disabled="status.loading"
                                            :hide-details="ats(true, true, false)"
                                            append-icon="fas fa-pencil-alt"
                                            ></v-text-field>                    
                                            
                                                            <v-text-field
                                            v-model="user.data.positions.values[0].company.name"
                                            v-if="isLinkedinOk"
                                            label="Empresa u Organización"
                                            :rules="nameRules"
                                            maxlength="30"
                                            required
                                            :flat="ats(true, true, false)"
                                            :solo="ats(true, true, false)"
                                            :placeholder="ats('Empresa u Organización', 'Empresa u Organización', '')"
                                            :style="ats('border: 1px solid #e3e3e3', '=', '')"
                                            color="blue accent-4"
                                            :disabled="status.loading"
                                            :hide-details="ats(true, true, false)"
                                            append-icon="fas fa-pencil-alt"
                                            ></v-text-field>

                                            <v-text-field
                                            v-model="user.data.company"
                                            label="Empresa u Organización"
                                            v-if="!isLinkedinOk"
                                            :rules="nameRules"
                                            maxlength="30"
                                            required
                                            :flat="ats(true, true, false)"
                                            :solo="ats(true, true, false)"
                                            :placeholder="ats('Empresa u Organización', 'Empresa u Organización', '')"
                                            :style="ats('border: 1px solid #e3e3e3', '=', '')"
                                            color="blue accent-4"
                                            :disabled="status.loading"
                                            :hide-details="ats(true, true, false)"
                                            append-icon="fas fa-pencil-alt"
                                            ></v-text-field>

                                        </v-flex>
                                    </v-layout>
                                </v-form>

                                <div class="px-3 text-xs-center pt-4" style="border-top: 1px solid #e3e3e3">
                                    <v-btn
                                    depressed
                                    :class="ats('white--text px-0 font-weight-bold button--green squared font-size-11', '=', 'white--text px-4 mx-3 font-weight-bold button--green squared')"
                                    :style="ats('height:36px', '=', 'height:40px')"
                                    @click="validate"
                                    >Enviar</v-btn>
                                </div> 

                            </v-flex>

                        </v-flex>

                    </v-flex>

                    <!--<v-btn
                    depressed 
                    color="red_button"
                    @click="e1 = 1"
                    style="color: white"
                    :disabled="true"
                    >
                    Enviar
                    </v-btn>-->

                </v-stepper-content>
                </v-stepper-items>
            </v-stepper>

            <v-stepper v-model="e1" v-if="isMobile">
                <v-stepper-step :complete="e1 > 1" step="1" v-if="!sendMessage" color="blue darken-3" >
                    Servicio
                </v-stepper-step>
                <v-stepper-content step="1" v-if="!sendMessage">
                    <v-container fluid>
                        <v-radio-group v-model="serviceSelected" :mandatory="true" >
                            <div
                                class="color-00306e"
                                v-for="(service, index) in services"
                                v-bind:key="index">
                                    <v-radio 
                                        @change="onChangeService()"
                                        :value="service">
                                        <div slot="label" class="color-00306e">{{(service.description).toUpperCase()}}</div>
                                    </v-radio>
                                    <p style="font-weight: bold; font-size: 12px; margin-left: 5%" class="color-00306e">{{service.totalClients}} Clientes Contentos</p>
                            </div>
                        </v-radio-group>
                    </v-container>

                    <v-btn
                    @click="sendMessage ? e1 = 3 : e1 = 2"
                    depressed 
                    color="red_button"
                    style="color: white"
                    >
                    Siguiente
                    </v-btn>


                </v-stepper-content>

                <v-stepper-step :complete="e1 > 2" step="2" v-if="!sendMessage" color="blue darken-3" >
                    Encuestas
                </v-stepper-step>
                <v-stepper-content step="2" v-if="!sendMessage">
                    <v-layout xs12>
                        <v-list subheader two-line>
                            <!--<div class="font-size-20 px-4 color-3f46ae">
                                <span>Encuestas</span>
                            </div>-->
                            <v-flex xs12 class="font-size-14 px-4 text-xs-center" justify-center align-center>
                                <div v-if="JSON.stringify(serviceSelected) === '{}'">
                                    Selecciona un servicio
                                </div>
                            </v-flex>
                            <v-list-tile v-for="(survey, index) in serviceSelected.surveys" v-bind:key="index">
                                <v-list-tile-action>
                                <v-checkbox v-model="selectedSurveys" :value="survey.description"></v-checkbox>
                                </v-list-tile-action>

                                <v-list-tile-content>
                                <v-list-tile-title class="color-00306e">{{survey.description}}</v-list-tile-title>
                                <!-- <v-list-tile-sub-title class="color-00306e" style="font-weight: bold; font-size: 12px;">{{result.validations.length}} Recomendaciones</v-list-tile-sub-title> -->
                                </v-list-tile-content>
                                <br/>
                                <!--<hr style="border-top: 1px solid rgb(204, 204, 204); width: 80%; margin-left:auto; margin-right: auto; margin-top: 2%"/>-->
                            </v-list-tile>
                            <br/>
                            <v-flex v-if="JSON.stringify(serviceSelected) !== '{}'" order-xs1 order-sm1 order-md2 pb-3 text-xs-center :class="$vuetify.breakpoint.smAndDown ? 'xs12' : ''">
                                <v-layout row wrap>
                                    <v-flex v-for="(number, index) in Math.ceil(serviceSelected.benefits.length / ats(10, 10, 25))" v-bind:key="index">
                                        <!--<span :style="page === (number - 1) ? 'border-bottom: 4px solid #494FB1; padding-bottom: 5px; padding-right: 5px; padding-left: 5px' : ''">{{number}}</span>-->
                                        <span :style="page === (number - 1) ? 'border-bottom: 4px solid #494FB1; padding-bottom: 5px; padding-right: 5px; padding-left: 5px' : ''">{{number}}</span>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-list>
                    </v-layout>

                    <v-btn
                    depressed 
                    color="red_button"
                    @click="e1 = 3"
                    style="color: white"
                    >
                    Siguiente
                    </v-btn>            

                </v-stepper-content>

                <v-stepper-step v-if="sendMessage" :complete="e1 > 1" step="1"  color="blue darken-3" editable @click="e1=3">
                    <span class="font-size-14 px-4 color-3f46ae" style="font-weight: 500 !important">Escribe un mensaje</span>
                </v-stepper-step>
                <v-stepper-content v-if="sendMessage">
                    <v-form ref="contactForm">
                        <v-layout row wrap :class="$vuetify.breakpoint.smAndDown ? 'pa-0': 'pa-3'">
                        <v-flex xs12>
                            <v-textarea
                            v-model="user.data.message"
                            label="Escribe tu mensaje para la empresa"
                            maxlength="200"
                            outline
                            required
                            >
                            </v-textarea>
                        </v-flex>
                        </v-layout>
                    </v-form>              
                </v-stepper-content>

                <v-stepper-step :complete="e1 > 3" step="3" color="blue darken-3" >
                    Enviar
                </v-stepper-step>
                <v-stepper-content step="3">

                    <v-flex xs12>
                        <!--HEADER-->
                        <v-flex xs12>
                            <div :class="ats('px-3' ,'=', '')" >
                                <span class="font-weight-bold mr-2 font-size-16" align-center justify-center row fill-height>¡Ahorra Tiempo!</span>
                                <br/>
                                <div v-if="!isGoogleOk && !isFacebookOk" align-center justify-center row fill-height>
                                    <span
                                    class="blue--text text--accent-4 font-size-16"
                                    style="cursor: pointer; text-decoration: underline"
                                    >Inicia sesión con tu red social de preferencia</span>
                                    <v-tooltip right max-width="200px">
                                    <v-icon slot="activator" color="grey darken-4">help</v-icon>
                                    <!--<span>Usamos Linkedin para facilitarte el inicio de sesión y asegurarnos que las recomendaciones en Yes Them sean de usuarios reales. Tu cuenta Linkedin será únicamente para iniciar sesión. Yes Them no tiene acceso a tus contactos ni puede publicar nada en tu cuenta de Linkedin.</span>-->
                                    <span>Usamos Linkedin, Facebook y Google para facilitarte el inicio de sesión y asegurarnos que las recomendaciones en Yes Them sean de usuarios reales. Tu cuenta Linkedin, Facebook y Google serán únicamente para iniciar sesión. Yes Them no tiene acceso a tus contactos ni puede publicar nada en tus cuentas</span>
                                    </v-tooltip>
                                </div>

                                <v-layout
                                    align-center
                                    justify-center
                                    row
                                    fill-height
                                    v-if="!isGoogleOk && !isFacebookOk">

                                    <v-btn
                                        fab
                                        dark
                                        small
                                        color="blue accent-4"
                                        :disabled="status.loading"
                                        @click.prevent.stop="Login(true)"
                                    >
                                    <v-icon dark>fab fa-linkedin</v-icon>
                                    </v-btn>

                                    <g-signin-button
                                        :params="googleSignInParams"
                                        @success="onSignInSuccess"
                                        @error="onSignInError"
                                    >
                                        <v-btn fab dark small color="red_button" ref="signInGoogleBtn">
                                            <v-icon dark>fab fa-google</v-icon>
                                        </v-btn>
                                    </g-signin-button>

                                    <fb-signin-button
                                        :params="fbSignInParams"
                                        @success="facebookOk"
                                        @error="facebookNotOk"
                                    >
                                        <v-btn fab dark small color="blue accent-4">
                                            <v-icon dark>fab fa-facebook</v-icon>
                                        </v-btn>
                                    </fb-signin-button>

                                </v-layout>
                            </div>
                            <div class="mt-2" v-if="!isGoogleOk && !isFacebookOk">
                                <span
                                    class="font-size-12 font-weight-bold grey--text text--darken-1"
                                >o date de alta manualmente</span>
                            </div>

                            <v-flex xs12>
                                <v-form
                                class="white"
                                ref="formNoLinkedin"
                                v-model="valid"
                                v-if="isGoogleOk === false && isFacebookOk === false && isLinkedinOk === false"
                                enctype="multipart/form-data"
                                >
                                    <v-layout row wrap pt-5 pb-4 px-4>
                                        <v-flex xs12 style="margin-left: 5%">
                                            <v-text-field
                                            v-model="user.data.firstName"
                                            label="Nombre"
                                            :rules="nameRules"
                                            maxlength="60"
                                            required
                                            :flat="ats(true, true, false)"
                                            :solo="ats(true, true, false)"
                                            :placeholder="ats('Nombre', 'Nombre', '')"
                                            :style="ats('border: 1px solid #e3e3e3', '=', '')"
                                            color="blue accent-4"
                                            :disabled="status.loading"
                                            :hide-details="ats(true, true, false)"
                                            append-icon="fas fa-pencil-alt"
                                            ></v-text-field>

                                            <v-text-field
                                            v-model="user.data.lastName"
                                            label="Apellidos"
                                            :rules="nameRules"
                                            maxlength="30"
                                            required
                                            :flat="ats(true, true, false)"
                                            :solo="ats(true, true, false)"
                                            :placeholder="ats('Apellidos', 'Apellidos', '')"
                                            :style="ats('border: 1px solid #e3e3e3', '=', '')"
                                            color="blue accent-4"
                                            :disabled="status.loading"
                                            :hide-details="ats(true, true, false)"
                                            append-icon="fas fa-pencil-alt"
                                            ></v-text-field>

                                            <v-text-field
                                            v-model="user.data.email"
                                            label="Email"
                                            :rules="nameRules"
                                            maxlength="30"
                                            required
                                            :flat="ats(true, true, false)"
                                            :solo="ats(true, true, false)"
                                            :placeholder="ats('Apellidos', 'Apellidos', '')"
                                            :style="ats('border: 1px solid #e3e3e3', '=', '')"
                                            color="blue accent-4"
                                            :disabled="status.loading"
                                            :hide-details="ats(true, true, false)"
                                            append-icon="fas fa-pencil-alt"
                                            ></v-text-field>

                                            <v-text-field
                                            v-model="user.data.phone"
                                            label="Phone"
                                            :rules="nameRules"
                                            maxlength="30"
                                            required
                                            :flat="ats(true, true, false)"
                                            :solo="ats(true, true, false)"
                                            :placeholder="ats('Apellidos', 'Apellidos', '')"
                                            :style="ats('border: 1px solid #e3e3e3', '=', '')"
                                            color="blue accent-4"
                                            :disabled="status.loading"
                                            :hide-details="ats(true, true, false)"
                                            append-icon="fas fa-pencil-alt"
                                            ></v-text-field>   
                                            
                                            <v-text-field
                                            v-model="user.data.company"
                                            label="Empresa u Organización"
                                            :rules="nameRules"
                                            maxlength="30"
                                            required
                                            :flat="ats(true, true, false)"
                                            :solo="ats(true, true, false)"
                                            :placeholder="ats('Empresa u Organización', 'Empresa u Organización', '')"
                                            :style="ats('border: 1px solid #e3e3e3', '=', '')"
                                            color="blue accent-4"
                                            :disabled="status.loading"
                                            :hide-details="ats(true, true, false)"
                                            append-icon="fas fa-pencil-alt"
                                            ></v-text-field>

                                        </v-flex>
                                    </v-layout>
                                </v-form>

                                <!-- FACEBOOK Y GOOGLE -->
                                <v-form
                                    class="white"
                                    ref="formNoLinkedin"
                                    v-model="valid"
                                    v-if="(isGoogleOk === false && isFacebookOk === true && isLinkedinOk === false) || (isGoogleOk === true && isFacebookOk === false && isLinkedinOk === false) || (isGoogleOk === false && isFacebookOk === false && isLinkedinOk === true) "
                                    enctype="multipart/form-data"
                                >
                                    <v-layout row wrap pt-5 pb-4 px-4>
                                        <v-flex xs12 style="margin-left: 5%">
                                            <v-text-field
                                            v-model="user.data.firstName"
                                            label="Nombre"
                                            :rules="nameRules"
                                            maxlength="60"
                                            required
                                            :flat="ats(true, true, false)"
                                            :solo="ats(true, true, false)"
                                            :placeholder="ats('Nombre', 'Nombre', '')"
                                            :style="ats('border: 1px solid #e3e3e3', '=', '')"
                                            color="blue accent-4"
                                            :disabled="status.loading"
                                            :hide-details="ats(true, true, false)"
                                            append-icon="fas fa-pencil-alt"
                                            ></v-text-field>

                                            <v-text-field
                                            v-model="user.data.lastName"
                                            label="Apellidos"
                                            :rules="nameRules"
                                            maxlength="30"
                                            required
                                            :flat="ats(true, true, false)"
                                            :solo="ats(true, true, false)"
                                            :placeholder="ats('Apellidos', 'Apellidos', '')"
                                            :style="ats('border: 1px solid #e3e3e3', '=', '')"
                                            color="blue accent-4"
                                            :disabled="status.loading"
                                            :hide-details="ats(true, true, false)"
                                            append-icon="fas fa-pencil-alt"
                                            ></v-text-field>

                                            <v-text-field
                                            v-model="user.data.email"
                                            label="Email"
                                            :rules="nameRules"
                                            maxlength="30"
                                            required
                                            :flat="ats(true, true, false)"
                                            :solo="ats(true, true, false)"
                                            :placeholder="ats('Apellidos', 'Apellidos', '')"
                                            :style="ats('border: 1px solid #e3e3e3', '=', '')"
                                            color="blue accent-4"
                                            :disabled="status.loading"
                                            :hide-details="ats(true, true, false)"
                                            append-icon="fas fa-pencil-alt"
                                            ></v-text-field>

                                            <v-text-field
                                            v-model="user.data.phone"
                                            label="Phone"
                                            :rules="nameRules"
                                            maxlength="30"
                                            required
                                            :flat="ats(true, true, false)"
                                            :solo="ats(true, true, false)"
                                            :placeholder="ats('Apellidos', 'Apellidos', '')"
                                            :style="ats('border: 1px solid #e3e3e3', '=', '')"
                                            color="blue accent-4"
                                            :disabled="status.loading"
                                            :hide-details="ats(true, true, false)"
                                            append-icon="fas fa-pencil-alt"
                                            ></v-text-field>                    
                                            
                                                            <v-text-field
                                            v-model="user.data.positions.values[0].company.name"
                                            v-if="isLinkedinOk"
                                            label="Empresa u Organización"
                                            :rules="nameRules"
                                            maxlength="30"
                                            required
                                            :flat="ats(true, true, false)"
                                            :solo="ats(true, true, false)"
                                            :placeholder="ats('Empresa u Organización', 'Empresa u Organización', '')"
                                            :style="ats('border: 1px solid #e3e3e3', '=', '')"
                                            color="blue accent-4"
                                            :disabled="status.loading"
                                            :hide-details="ats(true, true, false)"
                                            append-icon="fas fa-pencil-alt"
                                            ></v-text-field>

                                            <v-text-field
                                            v-model="user.data.company"
                                            label="Empresa u Organización"
                                            v-if="!isLinkedinOk"
                                            :rules="nameRules"
                                            maxlength="30"
                                            required
                                            :flat="ats(true, true, false)"
                                            :solo="ats(true, true, false)"
                                            :placeholder="ats('Empresa u Organización', 'Empresa u Organización', '')"
                                            :style="ats('border: 1px solid #e3e3e3', '=', '')"
                                            color="blue accent-4"
                                            :disabled="status.loading"
                                            :hide-details="ats(true, true, false)"
                                            append-icon="fas fa-pencil-alt"
                                            ></v-text-field>

                                        </v-flex>
                                    </v-layout>
                                </v-form>

                                <div class="px-3 text-xs-center pt-4" style="border-top: 1px solid #e3e3e3">
                                    <v-btn
                                    depressed
                                    :class="ats('white--text px-0 font-weight-bold button--green squared font-size-11', '=', 'white--text px-4 mx-3 font-weight-bold button--green squared')"
                                    :style="ats('height:36px', '=', 'height:40px')"
                                    @click="validate"
                                    >Enviar</v-btn>
                                </div> 

                            </v-flex>

                        </v-flex>

                    </v-flex>

                </v-stepper-content>        




            </v-stepper>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue';
import FBSignInButton from 'vue-facebook-signin-button'
Vue.use(FBSignInButton)
export default {
    props: ['companyName', 'companyLogo', 'services', 'email', 'justLogin', 'message', 'serviceFromContactForm', 'getCompanyData'],

    data () {
        return {
            isMobile: false,
            serviceSelected: {},
            serviceSelectedResults: [],
            selectedSurveys: [],
            sendMessage: false,
		    page: 0,
            part: 1,
            e1: 0,            
            fbSignInParams: {
                return_scopes: true
            },
            isGoogleOk: false,
            totalYes: 0,
            isFacebookOk: false,
            isLinkedinOk: false,
            isAuthorizedLinkedin: false,
            isFinalLink: false,
            firstTime: false,
            showLogout: false,
            search: "",
            formData: new FormData(),
            thanks: false,
            isAuth: false,
            limit: 5,
            valid: false,
            noLinkedin: false,
            linkedin: null,
            googleSignInParams: {
                client_id:
                "651702093761-8ji77eacr493g1uk3oe80v3db7e40hqj.apps.googleusercontent.com"
            },
            user: {
                data: {
                    id: "",
                    phone: '',
                    email: "",
                    company: "",
                    message: "",
                    firstName: "",
                    lastName: "",
                    headline: "",
                    industry: "",
                    positions: "",
                    serviceFromContactForm: "",
                    pictureUrl: {
                        file: null,
                        filename: null,
                        url: null,
                        status: {
                        error: false,
                        message: ""
                        }
                    }
                },
                loaded: false,
                isLoggedIn: false
            },
            status: {
                loading: false,
                error: false,
                message: ""
            },
            solution: {
                checked: false,
                benefits: []
            },
            // facebook down here
            isConnected: false,
            name: "",
            personalID: "",
            FB: undefined,
            selectedBenefits: [],
            nameRules: [
                v => !!v || "Este campo es requerido!",
                v =>
                (v && v.length >= 3 && v.length <= 100) ||
                "Este campo debe tener entre 3 y 100 caracteres."
            ],
            emailRules: [
                v => !!v || "El e-mail debe ser válido.",
                v =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                "E-mail must be valid."
            ]
            };
        },

    methods: {
        ats(xs, sm, mdAndUp) {
        if (this.$vuetify.breakpoint.xs) {
            return xs;
        } else if (this.$vuetify.breakpoint.sm) {
            return sm === "=" ? xs : sm;
        }
        if (this.$vuetify.breakpoint.mdAndUp) {
            return mdAndUp;
        }
        },

      	detectmob() { 
            if( navigator.userAgent.match(/Android/i)
            //|| navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
            ){
                this.isMobile = true;
            }else {
                this.isMobile = false;
            }
        },

        onChangeService () {
        },

        select(benefit) {
        this.selectedBenefits.push(benefit);
        },

        remove(benefit) {
        this.selectedBenefits = this.selectedBenefits.filter(
            iBenefit => iBenefit._id !== benefit._id
        );
        },

        isSolutionSelected() {
        let selected = false;
        for (let i = 0, len = this.getSolution.benefits.length; i < len; i++) {
            selected = _.find(this.getSolution.benefits[i].validations, {
            id: this.user.data.id
            })
            ? true
            : false;
            if (selected === true) {
            break;
            }
        }
        return selected;
        },

        isSelected(benefit) {
        return _.find(this.selectedBenefits, { _id: benefit._id }) ? true : false;
        },

        setStatus(loading, error, message) {
        this.status = {
            loading: loading,
            error: error,
            message: message
        };
        },

        getTotalYes(benefits) {
        let yes = 0;
        for (let i = 0, len = benefits.length; i < len; i++) {
            yes += benefits[i].validations.length;
        }
        return yes;
        },

        async Logout() { 
        localStorage.removeItem('linkedin');
        localStorage.removeItem('finalLink');
        this.isLinkedinOk = false;
        if (
            (this.isAuth === true && this.isGoogleOk === true) ||
            (this.isFacebookOk === true && this.isAuth === true)
        ) {
            this.googleLogOut();
        }
        if (this.isAuthorized === true) {
            this.setStatus(true, false, "");
            await this.$store.dispatch("linkedin/logout");
            this.user.loaded = false;
            this.user.data = {
            id: "",
            firstName: "",
            lastName: "",
            headline: "",
            industry: "",
            pictureUrl: {
                file: null,
                filename: null,
                url: null,
                status: { error: false, message: "" }
            },
            positions: "",
            company: ""
            };
            this.selectedBenefits = [];
            this.part = 1;
            this.setStatus(false, false, "");
        } else {
            this.user.loaded = false;
            this.user.data = {
            id: "",
            firstName: "",
            lastName: "",
            headline: "",
            industry: "",
            pictureUrl: {
                file: null,
                filename: null,
                url: null,
                status: { error: false, message: "" }
            },
            positions: ""
            };
            this.selectedBenefits = [];
            this.part = 1;
        }
        },

        googleLogOut() {
        this.showLogout = false;
        this.setStatus(true, false, "");
        this.user.loaded = false;
        this.user.data = {
            id: "",
            firstName: "",
            lastName: "",
            headline: "",
            industry: "",
            pictureUrl: {
            file: null,
            filename: null,
            url: null,
            status: { error: false, message: "" }
            },
            positions: ""
        };
        this.isFacebookOk = false;
        this.isGoogleOk = false;
        this.isAuthorized = false;
        this.isAuth = false;
        this.user.loaded = false;
        this.noLinkedin = false;
        this.status.loading = false;
        },

        Login(isfinal) {
            // this.$store.dispatch("linkedin/authorize", {
            // identifier: this.getCompanyData.identifier,
            // service: this.$route.params.solution
            // }, isfinal);
            // localStorage.setItem('linkedin', true);
        },

        googleLogin() {},

        initLogin() {
        if (this.isAuthorized) {
            this.noLinkedin = false;
            this.isLinkedinOk = true;
            this.getLinkedinUser();
        } else {
            this.setStatus(false, false, "");
            "You chose not to validate your account so you can't validate this solution's benefits."
        }
        },

        reloadToken() {
        this.linkedin.User.refresh();
        setTimeout(() => {
            this.getLinkedinUser();
        }, 3000);
        },

        async getLinkedinUser() {
        this.setStatus(true, false, "");
        if (this.isAuthorized) {
            try {
            let data = await this.$store.dispatch("linkedin/getLinkedinUser");
            let user = data.user;
            this.user.data = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                headline: user.headline,
                industry: user.industry,
                pictureUrl: user.pictureUrl,
                positions: user.positions
            };

            let selected = [];
            for (
                let i = 0, len = this.getSolution.benefits.length;
                i < len;
                i++
            ) {
                if (
                this.getSolution.benefits[i].validations.some(
                    user => user.id.toString() === this.user.data.id.toString()
                )
                ) {
                selected.push(this.getSolution.benefits[i]);
                }
            }
            this.solution.checked = this.isSolutionSelected();
            this.selectedBenefits = selected;

            this.user.loaded = true;
            this.setStatus(false, false, "");
            } catch (error) {
            this.setStatus(
                false,
                true,
                "No estás autorizado para validar este servicio (" + error + ")."
            );
            }

            // this.linkedin.API.Raw('people/~:(id,first-name,last-name,headline,industry,positions,picture-url)?format=json').method('GET').result(async function (response) {
            // this.user.data = {
            //   id: response.id,
            //   firstName: response.firstName,
            //   lastName: response.lastName,
            //   headline: response.headline,
            //   industry: response.industry,
            //   pictureUrl: response.pictureUrl,
            //   positions: response.positions
            // }

            // let selected = []
            // for (let i = 0, len = this.getSolution.benefits.length; i < len; i++) {
            //   if (this.getSolution.benefits[i].validations.some(user => user.id.toString() === response.id.toString())) {
            //     selected.push(this.getSolution.benefits[i])
            //   }
            // }
            // this.solution.checked = this.isSolutionSelected()
            // this.selectedBenefits = selected

            // this.user.loaded = true
            // this.setStatus(false, false, '')

            // }, this).error( function (error) {
            //   if(response.errorCode === 0) {
            //     this.reloadToken()
            //   } else {
            //     this.setStatus(false, true, 'There was an error processing your validations. Please try again later.')
            //   }
            // }, this)
        } else {
            this.setStatus(
            false,
            true,
            "No estás autorizado para validar este servicio."
            );
        }
        },

        onFocus() {
        this.$refs.fileInput.click();
        },

        onFileChange($event) {
        let file = $event.target.files || $event.dataTransfer.files;
        file = file[0];
        this.formData.set("id", this.user.data.email);
        this.formData.set("firstName", this.user.data.firstName);
        this.formData.set("lastName", this.user.data.lastName);
        this.formData.set("headline", this.user.data.headline);
        this.formData.set("industry", this.user.data.industry);
        this.formData.set("positions", this.user.data.positions);
        this.formData.set("pictureUrl", null);
        this.formData.set("isLoggedIn", this.isAuthorized);
        this.formData.set("solutionId", this.getSolution._id);
        this.formData.set("benefits", JSON.stringify(this.selectedBenefits));

        if (file) {
            if (
            file.type === "image/jpeg" ||
            file.type === "image/png" ||
            file.type === "image/gif" ||
            file.type === "image/jpg"
            ) {
            this.user.data.pictureUrl.file = file;
            this.user.data.pictureUrl.filename = file.name;
            this.formData.set(
                "pictureUrl",
                this.user.data.pictureUrl.file,
                this.user.data.pictureUrl.filename
            );
            this.user.data.pictureUrl.status.error = false;
            this.user.data.pictureUrl.status.messages = [];
            this.user.data.pictureUrl.url = window.URL.createObjectURL(
                this.user.data.pictureUrl.file
            );
            } else {
            this.formData.set("pictureUrl", null);
            this.user.data.pictureUrl.status.error = true;
            this.user.data.pictureUrl.status.messages = [
                "Solo se permiten imagenes JPEG y PNG."
            ];
            this.user.data.pictureUrl.url = "";
            }
        } else {
            this.formData.set("pictureUrl", null);
            this.user.data.pictureUrl.status.error = false;
            this.user.data.pictureUrl.status.messages = [];
            this.user.data.pictureUrl.url = "";
        }
        },

        async validate() {
            this.setStatus(true, false, "");
            let finalJson = {};
            if(this.justLogin) {this.sendMessage = true; this.user.data.message = this.message ? this.message : `Hola, estoy interesado en el servicio ${this.serviceFromContactForm}`; this.user.data.serviceFromContactForm = this.serviceFromContactForm}
            if(!this.sendMessage) {
                finalJson.resultsData = this.selectedSurveys;
                finalJson.service = this.serviceSelected.category;
            }
            finalJson.user = this.user.data
            finalJson.email = this.email;
            console.log('message will be sended to =>', finalJson)
            try {
            const response = await axios.post('/api/user/company-user/contact', finalJson)
            console.log(response)
            this.$emit('ready', true);
            } catch (error) {
                console.log('error al enviar', error)
                this.$emit('ready', false);
            }
            this.user.data.message = '';
            this.serviceSelected = [];
            this.user = {
                data: {
                    id: "",
                    phone: '',
                    email: "",
                    company: "",
                    message: "",
                    firstName: "",
                    lastName: "",
                    headline: "",
                    industry: "",
                    positions: "",
                    pictureUrl: {
                        file: null,
                        filename: null,
                        url: null,
                        status: {
                        error: false,
                        message: ""
                        }
                    }
                },
                loaded: false,
                isLoggedIn: false
            }            
        },

        facebookNotOk (error) {
        },
        facebookOk (response) {
        FB.api('/me', 'GET', { fields: "id,name,email,picture" }, userInformation => {
            const { name } = userInformation;
            let _name = name.split(" ");
            this.user.data = {
            id: userInformation.id,
            firstName: _name[0],
            lastName: _name.length > 0 ? _name[1] : "",
            pictureUrl: {
                url: `https://graph.facebook.com/${
                userInformation.id
                }/picture?width=250`
            }
            };
            this.isFacebookOk = true;
            this.isAuthorized = true;
            this.isAuth = true;
            this.user.loaded = true;
            this.noLinkedin = true;
            this.status.loading = false;
        })
        },
        /* OTHERS API */

        googleInitLogin() {
        const auth2 = gapi.auth2.init({
            client_id: this.googleSignInParams.client_id
        });
        auth2.attachClickHandler(
            this.$refs.signInGoogleBtn,
            {},
            googleUser => {
            this.onSignInSuccess(googleUser);
            },
            error => this.onSignInError(error)
        );
        },

        onSignInSuccess(googleUser) {
        // `googleUser` is the GoogleUser object that represents the just-signed-in user.
        // See https://developers.google.com/identity/sign-in/web/reference#users
        const user = googleUser.getBasicProfile(); // etc etc
        this.isGoogleOk = true;
        this.isAuthorized = true;
        this.isAuth = true;
        this.user.data = {
            id: user.Eea,
            firstName: user.ofa,
            lastName: user.wea,
            pictureUrl: {
            url: user.Paa
            }
        };
        this.user.loaded = true;
        this.noLinkedin = true;
        this.status.loading = false;
        },

        onSignInError(error) {
        // `error` contains any error occurred.
        },

        getUserData() {
        this.FB.api("/me","GET", { fields: "id,name,email,picture" }, userInformation => {
            const { name } = userInformation;
            let _name = name.split(" ");
            this.user.data = {
                id: userInformation.id,
                firstName: _name[0],
                lastName: _name.length > 0 ? _name[1] : "",
                pictureUrl: {
                    url: `https://graph.facebook.com/${userInformation.id}/picture?width=250`
                }
            };
            this.isFacebookOk = true;
            this.isAuthorized = true;
            this.isAuth = true;
            this.user.loaded = true;
            this.noLinkedin = true;
            this.status.loading = false;
            }
        );
        },
        sdkLoaded(payload) {
        this.isConnected = payload.isConnected;
        this.FB = payload.FB;
        if (this.isConnected) this.onLogout()
        },
        onLogin() {
        this.isConnected = true;
        this.getUserData();
        },
        onLogout() {
        this.isConnected = false;
        this.isFacebookOk = false;
        this.showLogout = false;
        this.setStatus(true, false, "");
        this.user.loaded = false;
        this.user.data = {
            id: "",
            firstName: "",
            lastName: "",
            headline: "",
            industry: "",
            pictureUrl: {
            file: null,
            filename: null,
            url: null,
            status: { error: false, message: "" }
            },
            positions: ""
        };
        this.isGoogleOk = false;
        this.isAuthorized = false;
        this.isAuth = false;
        this.user.loaded = false;
        this.noLinkedin = false;
        this.status.loading = false;
        },

        _getSolutionsSelected() {
        }
    },

    beforeMount() {
        this.e1 = 1
        this.detectmob();
        let total = 0;
        this.services.forEach(service => {
            total = 0;
            service.benefits.forEach(benefit => {
                total += benefit.validations.length;
            })
            service.totalClients = total;
        });
    },

    beforeDestroy() {
        this.e1 = 1
        this.isConnected = false;
        this.isFacebookOk = false;
        this.showLogout = false;
        this.setStatus(true, false, "");
        this.user.loaded = false;
        this.user = {
                data: {
                id: "",
                phone: '',
                email: "",
                company: "",
                firstName: "",
                lastName: "",
                headline: "",
                industry: "",
                positions: "",
                pictureUrl: {
                    file: null,
                    filename: null,
                    url: null,
                    status: {
                    error: false,
                    message: ""
                    }
                }
                },
                loaded: false,
                isLoggedIn: false
            }
        this.isGoogleOk = false;
        this.isAuthorized = false;
        this.isAuth = false;
        this.user.loaded = false;
        this.noLinkedin = false;
        this.status.loading = false;
    },

    destroyed() {
        this.el = 1
        this.Logout();
        this.user.data.message = '';
        this.serviceSelected = [];
        this.user = {
            data: {
                id: "",
                phone: '',
                email: "",
                company: "",
                message: "",
                firstName: "",
                lastName: "",
                headline: "",
                industry: "",
                positions: "",
                pictureUrl: {
                    file: null,
                    filename: null,
                    url: null,
                    status: {
                    error: false,
                    message: ""
                    }
                }
            },
            loaded: false,
            isLoggedIn: false
        }           
    }

}
</script>

<style scoped>
.v-btn:before {
    opacity: 0
}
/*.v-stepper__step__step {
  color: white !important;
  background-color: #ff2929 !important;
  font-size: 12px !important;
  padding: 14px 14px 14px 14px !important
}

.v-stepper .theme--light {
  box-shadow: none !important;
}
.v-stepper__step__step.primary {
color: white !important
}
.v-stepper__step__step.primary{
  background-color: #ff2929 !important;
  border-color: #ff2929 !important;
  color: white !important;
  font-size: 12px !important;
  padding: 14px 14px 14px 14px !important
}
.v-stepper__step--active {
  color: white !important
}

.v-stepper__label {
  color: white !important;
}

.v-stepper--is-booted {
  box-shadow: none !important
}

.v-stepper__header {
  box-shadow: none !important;
  border: 1px solid rgb(236, 236, 236) !important
}*/

</style>
