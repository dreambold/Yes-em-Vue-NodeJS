<template>
  <v-layout row wrap fill-height justify-center class="py-0" style="background-color: #ececec;">
    <!-- Better to have it here for ease of use -->
    <!-- <v-toolbar
      fixed
      height="88"
      extension-height="58"
      class="white elevation-1 no-padding"
      style="z-index: 9998"
    >
      <v-layout row wrap fill-height justify-center align-center>
        <v-flex xs12 md8 white>
          <v-layout row wrap>
            <div>
              <router-link
                to="/"
                class="subheading font-weight-bold black--text"
                style="text-decoration: none;"
              >
                <img
                  src="/static/images/logo.png"
                  alt="logo"
                  class="mt-3"
                  style="width: 90px !important; height: 37px !important"
                >
              </router-link>
            </div>
            <v-spacer></v-spacer>
            <div
              v-if="isAuthorized === true && user.loaded === true && isGoogleOk === false && isFacebookOk === false"
            >
              <v-layout column fill-height justify-center align-end>
                <v-flex text-xs-left class="font-weight-bold font-size-12 pt-1">
                  <span class="pr-4">Hi, {{user.data.firstName}}</span>
                  <v-avatar
                    v-if="isGoogleOk === false && isFacebookOk === false"
                    :tile="true"
                    size="36"
                    color="white"
                    style="cursor: pointer"
                    @click="showLogout = !showLogout"
                  >
                    <img
                      :src="
                      (!isGoogleOk && !isFacebookOk) ? user.data.pictureUrl : 
                      (isGoogleOk || !isFacebookOk ) ? usar.data.pictureUrl.url :
                      (isFacebookOk || !isGoogleOk)  ? user.data.pictureUrl.url : 
                      // console.log('there is not avatar')"
                      style="border: 1px solid #e3e3e3"
                    >
                  </v-avatar>

                </v-flex>
                <v-flex text-xs-right style="min-height: 40px !important">
                  <v-btn
                    v-if="showLogout"
                    color="blue accent-4"
                    depressed
                    small
                    class="white--text font-size-12 font-weight-bold text-capitalize squared px-4 mx-0"
                    :disabled="status.loading"
                    @click="Logout"
                  >Cerrar sesión</v-btn>
                </v-flex>
              </v-layout>
            </div>

            <div
              v-if="(isAuth === true && user.loaded === true && isGoogleOk === true && isFacebookOk === false) || (isAuth === true && user.loaded === true && isGoogleOk === false && isFacebookOk === true)"
            >
              <v-layout column fill-height justify-center align-end>
                <v-flex text-xs-left class="font-weight-bold font-size-12 pt-1">
                  <span class="pr-4">Hi, {{user.data.firstName}}</span>
                  <v-avatar
                    :tile="true"
                    size="36"
                    color="white"
                    style="cursor: pointer"
                    @click="showLogout = !showLogout"
                  >
                    <img
                      v-if="isGoogleOk === false && isFacebookOk === false"
                      :src="user.data.pictureUrl"
                      style="border: 1px solid #e3e3e3"
                    >
                    <img
                      v-if="isGoogleOk === true || isFacebookOk === true"
                      :src="user.data.pictureUrl.url"
                      style="border: 1px solid #e3e3e3"
                    >
                  </v-avatar>
                </v-flex>
                <v-flex text-xs-right style="min-height: 40px !important">
                  <v-btn
                    v-if="showLogout"
                    color="blue accent-4"
                    depressed
                    small
                    class="white--text font-size-12 font-weight-bold text-capitalize squared px-4 mx-0"
                    :disabled="status.loading"
                    @click="Logout"
                  >Cerrar sesión</v-btn>
                </v-flex>
              </v-layout>
            </div>

            <div v-if="isAuthorized === false && isAuth === false">
              <v-layout column fill-height justify-center align-end>
                <v-btn
                  color="blue accent-4"
                  depressed
                  small
                  flat
                  outline
                  class="font-size-12 font-weight-bold text-capitalize squared px-4 mx-0"
                  :disabled="status.loading"
                  @click.prevent.stop="Login"
                >Iniciar sesión</v-btn>
              </v-layout>
            </div>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-toolbar> -->
  
    <v-flex xs12> 
      <button @click="Logout()" style="opacity: 0; color: black; background: red; padding: 20px;" type="button">LOG OUT HERE</button>
      <!-- v-if="getCompanyData === null ? false : (getCompanyData.published ? true : (currentUser.identifier === $route.params.identifier ? true : false))" -->
      <v-layout column :style="`padding: ${$vuetify.breakpoint.smAndDown ? '0 20px 0 20px' : '0 50px 0 50px'}`">

        <div align="left" style="margin-top: 50px; text-align: left;" v-if="part === 11 || part === 0">
          <span :style="`font-size: ${$vuetify.breakpoint.smAndDown ? '20px' : '33px'}; text-align: left;`">
            Valida aspectos del Servicio que te presto <span style="color: #2b8bcb">{{ getCompanyData.name }}</span>
          </span>
        </div>
        <div v-if="part === 11" align="center" style="padding-top: 50px">
            <v-layout align-center justify-center row fill-height>
              <v-flex :class="$vuetify.breakpoint.smAndDown ? 'xs12' : 'xs9'">
                <v-layout align-left justify-left column fill-height :style="`width: ${$vuetify.breakpoint.smAndDown ? '100%' : '700px'}; height: 250px; background: #f4f4f4; padding: 25px;`">
                  <v-flex>
                      <div style="text-align: left">
                          <span style="font-size: 25px; font-weight: bold; color: grey"> 
                              {{transformString(getSolution.category)}}
                          </span>
                      </div>
                  </v-flex>
                  <v-flex style="border-top: 1px solid black; border-bottom: 1px solid black; padding: 15px">
                    <div align="left" style="display: flex">
                      <div>
                        <v-btn flat depressed @click="part = 0" style="margin-top: 8px; background: #42944d; color: white; width: 200px; margin-left: -20px;">
                          <span style="font-size: 20px; color: white;">VALIDAR</span>
                        </v-btn>
                      </div>
                      <div style="display: flex" v-if="returnClients().length > 0">
                        <div v-for="(client, i) in returnClients().slice(0,3)" :key="i">
                          <img :src="`${Number.isInteger(parseInt(client.pictureUrl.split('.')[0])) ? '/static/images/faces/' : client.pictureUrl.includes('http') ? '' : '/'}${client.pictureUrl}`" :style="`margin-left: ${i>0 ? '-15px' : ''}; margin-top: 5px; width: 40px; height: 40px; border-radius: 50%; border: 1px solid white;`">
                        </div>
                      </div>
                    </div>
                  </v-flex>
                  <v-flex>
                    <div style="text-align: left; border-top: 1px solid #cecece; padding-top: 15px; padding-bottom: 10px">
                        <span style="text-align: left; font-size: 16px;">
                            {{getSolution.description}}
                        </span>
                    </div>
                  </v-flex>                  
                </v-layout>
              </v-flex>
              <v-flex v-if="!$vuetify.breakpoint.smAndDown">
                <div style="text-align: left; margin-top: -115px">
                  <span style="color: #004d98; font-size: 20px">¿Que es Yes Them?</span>
                  <br>
                  <span>La plataforma para validar servicios</span>
                </div>
              </v-flex>
            </v-layout>
        </div>          

        <div v-if="part === 0">
          <div v-scroll="onScroll">
            <v-layout column>
            <v-layout align-start justify-start row fill-height>
                <v-flex>
                    <div v-for="(survey, index) in getSolution.surveys.filter(({ active }) => active)" v-bind:key="index" :style="`width: ${$vuetify.breakpoint.smAndDown ? '100%' : '810px'}; text-align: left; margin-top: 25px;border-top: 2px solid #e8e8ea; padding-top: 20px; padding-bottom: 20px;`">
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
                                <input type="checkbox" name="rGroup" :value="`${index}${i}`" :id="`i${index}${i}`" @click="isSelected(option) ? remove(option) : select(option)" />
                                <label class="whatever" :for="`i${index}${i}`">{{ option.optionDescription }}</label>                                
                              </div>
                            </div>
                        </div>
                        <div v-if="survey.showExtra" style="text-align: left;">
                            <div :style="`width: ${$vuetify.breakpoint.smAndDown ? '100%' : '800px'}; height: 42px; text-align: left; border: 1px solid rgb(214, 228, 238); background: #f2f2f2;`">
                              <div style="display: flex; justify-content: flex-start; align-items: center; padding: 2px 10px 0px 10px">
                                <div style="margin-right: 10px">
                                  <span style="font-size: 15px">
                                      Otros
                                  </span>                                    
                                </div>
                                <div style="width: 100%">
                                  <input v-if="typeof survey.extraOptions[survey.extraOptions.length-1] !== 'string'" @focus="survey.extraOptions.push('')" type="text" :style="`background: white; height: 35px; width: ${$vuetify.breakpoint.smAndDown ? '100%' : '100%'}`" placeholder="Escribe tu respuesta"  max-length="55">
                                  <input v-if="typeof survey.extraOptions[survey.extraOptions.length-1] == 'string'" @focus="typeof survey.extraOptions[survey.extraOptions.length-1] === 'string' ? survey.extraOptions[survey.extraOptions.length-1] =  survey.extraOptions[survey.extraOptions.length-1]: survey.extraOptions.push('')" type="text" v-model="survey.extraOptions[survey.extraOptions.length-1]" :style="`background: white; height: 35px; width: ${$vuetify.breakpoint.smAndDown ? '100%' : '100%'}`" placeholder="Escribe tu respuesta"  max-length="55">
                                </div>
                              </div>
                            </div>
                        </div>                        
                    </div>
                </v-flex>
                <!-- <v-flex style="padding: 50px">
                    <div style="text-align: left; margin-left: -140px;">
                        <span style="font-size: 20px; color: blue">¿Que es Yes Them?</span>
                        <br>
                        <span>La plataforma para validar servicios</span>
                    </div>
                </v-flex> -->
            </v-layout>

            <!-- <v-layout column v-if="getStatus.loading ? false : (!getCompanyData ? true : (getCompanyData.published ? false : (currentUser.identifier === $route.params.identifier ? false : true) ) )" style="min-height: 500px; background-color: #D5E3E4;">
            <!-- <v-layout align-center justify-center row fill-height v-if="getStatus.loading ? false : (getCompanyData ? false : true)">
              <v-flex xs6 pa-5>
                <v-card white class="headline font-weight-bold pa-5">
                  We are sorry but there is no company by that name.<br>
                  <v-icon large class="mt-3" color="grey darken-4">fas fa-frown</v-icon><br>
                  <v-btn large color="button" class="white--text mt-5" to="/">Go back home</v-btn>
                </v-card>
            </v-flex>
            </v-layout> -->
          </div>
        </div>

        <div v-if="part === 1 && thanks === false" style="border-top: 1px solid #e3e3e3">
          <v-flex
            xs12
            text-xs-left
            :class="ats('py-4 px-0', '=', 'py-4 px-5')"
            style="border-bottom: 1px solid #e3e3e3"
          >
            <div class="px-4" align="center" style="margin-top: 50px;">
              <div :style="`padding: ${$vuetify.breakpoint.smAndDown ? '25px' : '50px'}; width: ${$vuetify.breakpoint.smAndDown ? '100%' : '60%'}; border: 1px solid #d8e3ee; background: #f6f7fb;`">
              <div class="font-size-18">¡Ya casi hemos acabado!
                <!-- <button @click="Logout()" type="button">(i)</button> -->
                <v-tooltip right max-width="200px">
                  <v-icon slot="activator" color="grey darken-4">help</v-icon>
                  <!--<span>Usamos Linkedin para facilitarte el inicio de sesión y asegurarnos que las recomendaciones en Yes Them sean de usuarios reales. Tu cuenta Linkedin será únicamente para iniciar sesión. Yes Them no tiene acceso a tus contactos ni puede publicar nada en tu cuenta de Linkedin.</span>-->
                  
                  <span>Usamos Linkedin, Facebook y Google para facilitarte el inicio de sesión y asegurarnos que las recomendaciones en Yes Them sean de usuarios reales. Tu cuenta Linkedin, Facebook y Google serán únicamente para iniciar sesión. Yes Them no tiene acceso a tus contactos ni puede publicar nada en tus cuentas</span>
                </v-tooltip>
              </div>
              <div class="caption">
                Inicia sesión con tu red social de preferencia.
                <br/>
                Una manera rápida y fácil de verificar tu identidad.
              </div>
              <div v-if="isAuthorized === false">
                <v-layout
                  align-center
                  justify-center
                  row
                  fill-height
                  v-if="!isGoogleOk && !isFacebookOk"
                >
                  <v-btn
                    fab
                    dark
                    small
                    color="blue accent-4"
                    :disabled="status.loading"
                    @click.prevent.stop="Login(false)"
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
                      @error="facebookNotOk">
                        <v-btn fab dark small color="blue accent-4">
                            <v-icon dark>fab fa-facebook</v-icon>
                        </v-btn>
                    </fb-signin-button>
                </v-layout>
                <div
                  class="pt-4 pb-2"
                  :style="`cursor: pointer; ${$vuetify.breakpoint.smAndDown ? 'border-top: 3px dashed grey' : ''}`"
                  :disabled="status.loading"
                  @click="noLoginSN = true; isGoogleOk = false; isFacebookOk = false; isLinkedinOk = false; part = 3"
                >
                  <span
                    v-if="!isGoogleOk && !isFacebookOk"
                    class="pt-3"
                    :style="`${$vuetify.breakpoint.smAndDown ? '3px dashed grey;' : ''}`"
                  >No gracias, me registraré más adelante.</span>
                  <!-- No gracias, validare sin linkedin -->
                </div>
              </div>
              <!-- <div
                v-if="isAuthorized === true || isAuth === true || isGoogleOk === true || isFacebookOk===true"
              >
                <v-flex
                  text-xs-center
                  class="pt-2 blue accent-4 squared my-4 mx-0 white--text font-weight-bold py-2"
                  :style="ats('width: 80% !important', '=', 'width: 60% !important')"
                >Inicio de sesión correcto</v-flex>
              </div> -->
              <!-- <v-btn
                    color="blue accent-4"
                    depressed
                    small
                    class="white--text font-size-12 font-weight-bold text-capitalize squared px-4 mx-0"
                    :disabled="status.loading"
                    @click="Logout"
                  >Cerrar sesión</v-btn>
                <v-btn
                    color="blue accent-4"
                    depressed
                    small
                    class="white--text font-size-12 font-weight-bold text-capitalize squared px-4 mx-0"
                    :disabled="status.loading"
                    @click="part == 2"
                  >Next</v-btn> -->
              </div>
            </div>
          </v-flex>
        </div>

        <div v-if="part === 2 && thanks === false" :style="`padding: ${$vuetify.breakpoint.smAndDown ? '0px' : '0 200px 0 200px'}; border-top: 1px solid rgb(227, 227, 227);`">
            <v-flex
              v-if="isAuthorized"
              xs12
              :class="ats('pt-3 px-4 caption', '=', 'pt-3 px-4')"
              style="text-align: justify"
            >
              Al enviar esta recomendación, yo confirmo a Yes Them que: 1) No soy un empleado,
              consultor, revendedor, competidor directo o no estoy asociado de alguna manera con
              el vendedor que estoy reseñando; 2) mi recomendación es basada totalmente en mi
              experiencia propia con el producto de este vendedor; 3) yo soy la persona que
              declaro ser; 4) Yes Them puede copiar, exhibir o usar de cualquier forma el
              contenido de mi reseña, en todo o en parte, en el curso ordinario de su negocio.
              Confirmo que he leido y estoy de acuerdo a ser obligado por los
              <router-link to="/terms">Terminos de Uso y Política de Privacidad</router-link>.
            </v-flex>
        </div>

        <div v-if="part === 3 && thanks === false" :style="`padding: ${$vuetify.breakpoint.smAndDown ? '0px' : '0 200px 0 200px'}; border-top: 1px solid #e3e3e3;`">
              <div v-if="(isGoogleOk === true && isFacebookOk===false && isLinkedinOk === false) || (isGoogleOk === false && isFacebookOk === true && isLinkedinOk === false) || (isGoogleOk === false && isFacebookOk === false && isLinkedinOk === true)" style="margin-left: 32%">
                <!-- <div>
                  <v-flex
                    xs12
                    text-xs-center
                    class="pt-2 blue accent-4 squared my-4 mx-0 white--text font-weight-bold py-2"
                    :style="ats('width: 80% !important', '=', 'width: 60% !important')"
                  >Inicio de sesión correcto</v-flex>
                </div> -->
              </div>
          <v-layout column py-4>
            <v-flex xs12>
              <!-- <div v-if="isAuthorized === false && isGoogleOk === false && isFacebookOk === false">
                <div :class="ats('px-3' ,'=', '')">
                  <v-layout
                    align-center
                    justify-center
                    row
                    fill-height
                    v-if="!isGoogleOk && !isFacebookOk"
                  >
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
                      @error="facebookNotOk">
                        <v-btn fab dark small color="blue accent-4">
                            <v-icon dark>fab fa-facebook</v-icon>
                        </v-btn>
                    </fb-signin-button>

                  </v-layout>

                </div>
                <div class="mt-2" v-if="!isGoogleOk && !isFacebookOk && noLoginSN === false">
                  <span
                    class="font-size-12 font-weight-bold grey--text text--darken-1"
                  >o date de alta manualmente</span>
                </div> -->
              <!-- </div> -->
            <!-- FACEBOOK GOOGLE -->
              <v-form
                class="white"
                ref="formNoLinkedin"
                v-model="valid"
                v-if="(isGoogleOk === false && isFacebookOk === true && isLinkedinOk === false) || (isGoogleOk === true && isFacebookOk === false && isLinkedinOk === false) || (isGoogleOk === false && isFacebookOk === false && isLinkedinOk === true) "
                enctype="multipart/form-data"
              >
                <v-layout row wrap pt-5 pb-4 px-4>
                  <v-flex xs2>
                    <img
                      :src="user.data.pictureUrl"
                      v-if="isGoogleOk === true && isFacebookOk === false && isLinkedinOk === false"
                      style="border: 1px solid #e3e3e3; border-radius: 50%"
                    >
                    <img
                      :src="user.data.pictureUrl"
                      v-if="isGoogleOk === false && isFacebookOk === true && isLinkedinOk === false"
                      style="border: 1px solid #e3e3e3; border-radius: 50%; width: 95%"
                    >
                    <img
                      :src="user.data.pictureUrl"
                      v-if="isGoogleOk === false && isFacebookOk === false && isLinkedinOk === true"
                      style="border: 1px solid #e3e3e3; border-radius: 50%; width: 95%"
                    >                    
                  </v-flex>
                  <v-flex xs8 style="margin-left: 5%">
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
                      v-model="user.data.positions"
                      label="Puesto de trabajo"
                      maxlength="30"
                      required
                      :rules="nameRules"
                      :flat="ats(true, true, false)"
                      :solo="ats(true, true, false)"
                      :placeholder="ats('Puesto de trabajo', 'Puesto de trabajo', '')"
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

                    <v-text-field
                      v-model="user.data.industry"
                      label="Industria"
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

              <v-btn
                :block="ats(true, true, false)"
                depressed
                :class="ats('white--text px-0 font-weight-bold button--green squared font-size-11', '=', 'white--text px-4 mx-3 font-weight-bold button--green squared')"
                :style="ats('height:36px', '=', 'height:40px')"
                @click="validate"
              >Enviar recomendación de servicio y resultado</v-btn>  

              </v-form>

            

              <!--NO SOCIAL NETWORK -->
              <v-form
                class="white"
                ref="formNoLinkedin"
                v-model="valid"
                v-if="isGoogleOk === false && isFacebookOk === false && isLinkedinOk === false && noLoginSN === true"
                enctype="multipart/form-data"
              >
                <v-layout row wrap pt-5 pb-4 px-4>
                  <v-flex xs2>
                    <div>
                      <!--<v-icon
                        v-if="!user.data.pictureUrl.file"
                        color="blue accent-4"
                        size="32"
                        :disabled="status.loading"
                        @click="onFocus"
                      >add_a_photo</v-icon>-->
                      <img src="http://simpleicon.com/wp-content/uploads/camera.png" 
                        class="camera-img-form-companyvalidation"
                        v-if="!user.data.pictureUrl.file" 
                        :disabled="status.loading"
                        @click="onFocus" 
                        style="width: 40%">
                      <div v-if="user.data.pictureUrl.file">
                        <v-avatar
                          :tile="true"
                          size="80"
                          color="white"
                          style="vertical-align: baseline !important; cursor: pointer"
                          class="mr-1"
                          @click="onFocus"
                        >
                          <img :src="user.data.pictureUrl.url" style="border: 1px solid #e3e3e3;">
                        </v-avatar>
                        <!-- {{user.data.pictureUrl.filename}} -->
                      </div>

                    </div>
                    <input
                      ref="fileInput"
                      type="file"
                      name="pictureUrl"
                      style="display: none !important"
                      accept="*"
                      @change="onFileChange"
                    >
                  </v-flex>
                  <v-flex xs8 style="margin-left: 5%">
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
                      v-model="user.data.positions"
                      label="Puesto de trabajo"
                      maxlength="30"
                      required
                      :rules="nameRules"
                      :flat="ats(true, true, false)"
                      :solo="ats(true, true, false)"
                      :placeholder="ats('Puesto de trabajo', 'Puesto de trabajo', '')"
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

                    <v-text-field
                      v-model="user.data.industry"
                      label="Industria"
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
                <v-btn
                  :block="ats(true, true, false)"
                  depressed
                  :class="ats('white--text px-0 font-weight-bold button--green squared font-size-11', '=', 'white--text px-4 mx-3 font-weight-bold button--green squared')"
                  :style="ats('height:36px', '=', 'height:40px')"
                  @click="validate"
                >Enviar recomendación de servicio y resultado</v-btn>                  
              </v-form>

              <!-- <div class="px-3 text-xs-center pt-4" style="border-top: 1px solid #e3e3e3; background: white" v-if="isAuthorizedLinkedin">
                <v-btn
                  v-if="part === maxPages"
                  :block="ats(true, true, false)"
                  depressed
                  :class="ats('white--text px-0 font-weight-bold button--green squared font-size-11', '=', 'white--text px-4 mx-3 font-weight-bold button--green squared')"
                  :style="ats('height:36px', '=', 'height:40px')"
                  :disabled="!isAuthorizedLinkedin"
                  :loading="status.loading"
                  @click="validate"
                >Enviar recomendación de servicio y resultado</v-btn>
              </div>               -->
              <div
                :class="ats('px-4 pt-4 pb-3 caption', '=', 'px-5 pt-4 pb-3')"
                style="text-align: justify; background: white"
              >
                Al enviar esta recomendación, yo confirmo a Yes Them que: 1) No soy un empleado,
                consultor, revendedor, competidor directo o no estoy asociado de alguna manera con
                el vendedor que estoy reseñando; 2) mi recomendación es basada totalmente en mi
                experiencia propia con el producto de este vendedor; 3) yo soy la persona que
                declaro ser; 4) Yes Them puede copiar, exhibir o usar de cualquier forma el
                contenido de mi reseña, en todo o en parte, en el curso ordinario de su negocio.
                Confirmo que he leido y estoy de acuerdo a ser obligado por los
                <router-link to="/terms">Terminos de Uso y Política de Privacidad</router-link>.
              </div>
            </v-flex>
          </v-layout>
        </div>

        <div v-if="thanks === true">
          <v-layout
            row
            wrap
            justify-center
            align-top
            class="pb-5"
            style="min-height: 400px !important"
          >
            <v-flex xs12 :class="ats('py-4 text-xs-center', '=', 'py-4 text-xs-center')">
              <v-layout
                row
                wrap
                fill-height
                justify-center
                align-center
                class="py-2"
              >
                <div :class="ats('flex xs12', '=', 'pl-5')">
                  <v-avatar :size="$vuetify.breakpoint.smAndDown ? '64' : '84'" color="white">
                    <img
                      :src="'/static/images/uploads/' + getCompanyData.logo"
                      style="border: 3px solid #e3e3e3"
                    >
                  </v-avatar>
                </div>
                <div
                  :class="ats('flex xs12 font-size-20 px-4', '=', 'font-size-20 px-4')"
                >Gracias en nombre de
                  <br>
                  <span class="font-weight-bold headline">{{getCompanyData.name}}</span>
                </div>
                <!-- <div v-show="status.loading" class="pr-5 hidden-sm-and-down">
                  <v-progress-circular indeterminate color="primary" :size="48"></v-progress-circular>
                </div> -->
              </v-layout>
            </v-flex>
            <v-flex
              v-if="getCompanyData.thanks !== ''"
              xs12
              class="font-size-16 px-4 py-3"
            >{{getCompanyData.thanks}}</v-flex>
            <v-flex xs12 class="py-4" text-xs-center>
              <v-layout row wrap align-center justify-center>
                <v-flex xs12 class="font-weight-bold font-size-16">¡Mantengamos el Momentum!</v-flex>
                <v-flex
                  xs12
                  class="font-size-12 font-weight-bold grey--text text--darken-1 mt-3"
                >¿Te gustaría ver alguna empresa en Yes Them?</v-flex>
                <v-flex xs7 class="mt-5">
                  <v-layout row wrap fill-height justify-top align-center>
                    <v-text-field
                      v-model="search"
                      :flat="ats(true, true, false)"
                      :style="ats('border: 1px solid #e3e3e3', '=', 'border: 1px solid #e3e3e3; padding: 0px !important;')"
                      color="blue accent-4"
                      class="mx-0"
                      :disabled="status.loading"
                      height="38"
                      placeholder="Dinos su nombre"
                      solo
                      hide-details
                    ></v-text-field>
                    <v-btn
                      depressed
                      color="blue accent-4"
                      :class="ats('font-weight-bold mx-0 white--text squared px-5 ml-3', '=', 'font-weight-bold mx-0 white--text squared px-5')"
                      style="height:50px !important;"
                      @click="$router.push(`/`)"
                    >Enviar</v-btn>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 style="min-height: 200px"></v-flex>
          </v-layout>
        </div>
        <v-flex
          v-if="part !== 3 && thanks === false"
          xs12
          :class="ats('py-4 px-0', '=', 'py-4 px-2')"
        >
          <v-layout row wrap child-flex>
            <v-flex text-xs-right :class="ats('px-3', '=', '')" :style="part===0 ? 'width: 816px;' : ''">
                <v-btn v-if="part === 0" @click="part = 1; thanks = false" depressed style="background-color: red; color: white">
                  <span>Inicia Sesion y Enviar</span>
                </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>

    <v-flex
      xs12
      v-if="getStatus.loading ? false : (getSolution ? (getCompanyData.published ? false : (currentUser.identifier === $route.params.identifier ? false : true) ): false)"
    >
      <v-layout
        align-top
        justify-center
        row
        fill-height
        style="background-color: #D5E3E4; min-height: 500px"
      >
        <v-flex xs6 pa-5>
          <v-card
            white
            class="headline font-weight-bold pa-5"
          >We are sorry but that service doesn't exist.
            <br>
            <v-icon large class="mt-3" color="grey darken-4">fas fa-frown</v-icon>
            <br>
            <v-btn large color="button" class="white--text mt-5" to="/">Go back home</v-btn>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import { mapGetters } from "vuex";
import Vue from 'vue';
import FBSignInButton from 'vue-facebook-signin-button'
Vue.use(FBSignInButton)

export default {
  name: "validation",
  components: {},
  data() {
    return {
      companies: require('@/misc/companies').default.companies,
      completeData: {},
      counter: 0,
      extraOptions: [],
      noLoginSN: null,
      optionsToValidate: [],
      selectedSolution: '',
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
      part: 11,
      noLinkedin: false,
      linkedin: null,
      googleSignInParams: {
        client_id:
          "651702093761-8ji77eacr493g1uk3oe80v3db7e40hqj.apps.googleusercontent.com"
      },
      user: {
        data: {
          id: "",
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
      email: "",
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
  computed: {
    ...mapGetters("linkedin", ["isAuthorized", "authorize", "getToken"]),
    ...mapGetters("auth", ["isLoggedIn", "currentUser", "getToken"]),
    ...mapGetters("company", [
      "getCompanyData",
      "getStatus",
      "getSolutions",
      "getBenefits",
      "getCategories",
      "getExperiences",
      "getTotalValidations"
    ]),
    getSolution() {
      if (
        _.find(this.getSolutions, { identifier: this.$route.params.solution })
      ) {
        return _.find(this.getSolutions, {
          identifier: this.$route.params.solution
        });
      } else {
        return false;
      }
    },

    maxPages() {
      return 3;
    }
  },
  watch: {
    "getStatus.loading": function(to, from) {
      // console.log("here not yet");
      // console.log(to, from, this.firstTime);
      if (to === false && from === true && this.firstTime === false) {
        // console.log("first time");
        this.firstTime = true;
        this.initLogin();
      }
    },
    "part": function(to, from) {
      if(to === 3 && this.isLinkedinOk === false) {
        // console.log('PART T3 HEREEE');
        // console.log(this.selectedBenefits)
        localStorage.setItem("selectedBenefits", JSON.stringify(this.selectedBenefits));
        localStorage.setItem('finalLink', true);
        // console.log(localStorage.getItem("selectedBenefits"))
      } else if (to ===3 && this.isLinkedinOk === true ){
        // console.log('not 3')
        // console.warn(this.user)
        // console.log(localStorage.getItem("selectedBenefits"))
      }
    }
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
    transformString(s) {
      // console.log(s)
        let splitted = s.split(' ');
        // console.log(splitted)
        if (splitted.length > 1) {
            return (splitted.map(word => word.charAt(0).toUpperCase() + (word.slice(1)).toLowerCase())).join(' ');
        } else {
            return  splitted[0].charAt(0).toUpperCase() + (splitted[0].slice(1)).toLowerCase();
        }
    },    
    validateSurvey() {
      // console.log('surveys', this.optionsToValidate)
    },

    select(option) {
      this.optionsToValidate.push(option);
      // console.log(this.optionsToValidate)
    },

    remove(option) {
      // console.log(option)
      this.optionsToValidate = this.optionsToValidate.filter(
        op => op.optionDescription !== option.optionDescription
      );
      // console.log(this.optionsToValidate)
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
      // console.log("isSolutionSelected", selected);
      return selected;
    },

    isSelected(option) {
      return _.find(this.optionsToValidate, { optionDescription: option.optionDescription }) ? true : false;
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
      console.log('async Logout()')
      localStorage.removeItem('linkedin');
      localStorage.removeItem('finalLink');
      this.isLinkedinOk = false;
      if (
        (this.isGoogleOk === true) ||
        (this.isAuth === true)
      ) {
        this.googleLogOut();
      }
      if (this.isAuthorized || this.isAuthorizedLinkedin) {
        console.log('LINKEDIN LOGOUT')
        localStorage.removeItem('selectedOptions')
        localStorage.removeItem('currentSurveys')
        this.setStatus(true, false, "");
        await this.$store.dispatch("linkedin/logout");
        console.log('logout successfull')
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
        // this.selectedBenefits = [];
        // this.part = 0;
        // this.setStatus(false, false, "");
      } else {
        // console.log("You are already logged out.");
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
      // console.log("google log out!");
      // this.isFacebookOk ? this.onLogout() : console.log("its google");
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
      if (this.isAuthorized === false) {
        this.$store.dispatch("linkedin/authorize", {
          identifier: this.getCompanyData.identifier,
          service: this.$route.params.solution
        }, isfinal);
        localStorage.setItem('linkedin', true);
        localStorage.setItem('selectedOptions', JSON.stringify(this.optionsToValidate))
        localStorage.setItem('currentSurveys', JSON.stringify(this.getSolution.surveys))
      } else {
        // console.log("You are already logged in.");
      }
    },

    googleLogin() {},

    initLogin() {
      if (this.isAuthorized) {
        this.noLinkedin = false;
        this.isLinkedinOk = true;
        this.getLinkedinUser();
        // console.log("You are now logged in.");
      } else {
        this.setStatus(false, false, "");
        // // console.log(
        //   "You choose not to validate your account so you can't validate this solution's benefits."
        // );
      }
    },

    reloadToken() {
      this.linkedin.User.refresh();
      setTimeout(() => {
        this.getLinkedinUser();
      }, 3000);
    },

    returnClients() {
      let clients = [];
      this.getSolution.surveys.forEach(survey => {
        survey.extraOptions.forEach(extra => clients = [...clients, ...extra.validations])
        survey.options.forEach(option => clients = [...clients, ...option.validations])
      })
      // console.log(clients)
      return clients;
    },

    async getLinkedinUser() {
      this.setStatus(true, false, "");
      try {
        let data = await this.$store.dispatch("linkedin/getLinkedinUser");
        const user = data.user
        console.log(this.user.data.company)
        this.user.data = {
          company: '',
          firstName: user.firstName.localized.en_US,                    
          id: user.id,
          industry: '',          
          lastName: user.lastName.localized.en_US,
          positions: '',          
          pictureUrl: user.profilePicture['displayImage~'].elements[0].identifiers[0].identifier,
        };
        this.part === 3
        this.thanks === false      
        this.isGoogleOk === false 
        this.isFacebookOk === false
        this.isLinkedinOk === true;
        if(this.part === 3) {

      }
      } catch (e) {
        console.log(e)
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
      // console.log(this.user.data)
      this.setStatus(true, false, "");
      if (!this.isGoogleOk && !this.isFacebookOk && !this.isAuthorizedLinkedin && this.noLoginSN) {
        // by self
        console.log('No social network selected')
        const endpoint = "/api/solution/benefits/validate/self";
        this.formData.set("id", this.user.data.email);
        this.formData.set("firstName", this.user.data.firstName);
        this.formData.set("lastName", this.user.data.lastName);
        this.formData.set("headline", this.user.data.headline);
        this.formData.set("industry", this.user.data.industry);
        this.formData.set("positions", this.user.data.positions);
        this.formData.set("google", false);
        this.formData.set("facebook", false);
        this.formData.set("isLoggedIn", this.isAuthorized);
        this.formData.set("solutionId", this.getSolution._id);
        this.formData.set("user", JSON.stringify(this.user.data))
        this.formData.set("benefits", JSON.stringify(this.selectedBenefits));
        console.log(this.user.data.pictureUrl)
        //this.formData.set("benefits", localStorage.getItem("selectedBenefits"));
        // for (const  pair of this.formData.entries()) {
        //   console.log(pair[0] + ", " + pair[1]);
        // }
        // let data = null;
        // this.getSolution.surveys.forEach(survey => {
        //   survey.options.forEach(option => {
        //     this.optionsToValidate.forEach(op => {
        //       option.optionDescription.toLowerCase().trim() === op.optionDescription.toLowerCase().trim() ? option.validations.push(this.user.data) : null
        //     })
        //   })
        // })
        // this.getSolution.surveys.forEach(survey => {
        //   if (survey.extraOptions.length > 0) {
        //     survey.extraOptions.forEach(option => {
        //       if(typeof option === 'string') {
        //         survey.extraOptions.push({
        //           optionDescription: option,
        //           validations: [this.user.data],
        //           active: false
        //         })
        //         survey.extraOptions.splice(survey.extraOptions.indexOf(option), 1);
        //       }
        //     })
        //   }
        // })
        let surveysToValidate = [];
        this.getSolution.surveys.forEach(survey => {
          survey.options.forEach(option => {
            this.optionsToValidate.forEach(op => {
              if(option.optionDescription.toLowerCase().trim() === op.optionDescription.toLowerCase().trim()) {
                surveysToValidate.some(item => item.surveyId === survey._id) ?
                surveysToValidate.forEach(item => item.surveyId === survey._id ? item.option.push(option) : false)
                :
                surveysToValidate.push({surveyId: survey._id, option: [option], extraOptions: []})
              }
            })
          })
        })
        this.getSolution.surveys.forEach(survey => {
          if (survey.extraOptions.length > 0) {
            survey.extraOptions.forEach(option => {
              if(typeof option === 'string') {              
                let opt = {
                  surveyId: survey._id,
                  optionDescription: option,
                  validations: [],
                  active: false
                }

                surveysToValidate.some(item => item.surveyId === survey._id) ?
                surveysToValidate.forEach(item => item.surveyId === survey._id ? item.extraOptions.push(opt) : false):
                surveysToValidate.push({surveyId: survey._id, option: [], extraOptions: [opt]})             

                // survey.extraOptions.splice(survey.extraOptions.indexOf(option), 1);
              }
            })
          }
        })        
        this.formData.set("optionsToValidate", JSON.stringify(this.optionsToValidate))
        this.formData.set("surveys", JSON.stringify(surveysToValidate))
        console.log('solution to validate', this.getSolution);  
        console.log('user validates', this.user)
        const { data } = await axios.post(endpoint, this.formData);
        console.log(data);
        if (data.status === 200) {
          this.thanks = true;
          this.setStatus(false, false, "");
          this.$vuetify.goTo(0, { duration: "0", easing: "linear" });
        } else {
          console.log(data)
          this.setStatus(false, false, "");
          this.$emit("snackbar", {
            error: true,
            message:
              "Unfortunately we couldn't process your validations properly. Please try again later."
          });
        }              
      } else if (this.isGoogleOk || this.isFacebookOk) {
        console.log("Validating with: Google | Facebbok");
        const endpoint = "/api/solution/benefits/validate/google";
        
        
        let surveysToValidate = [];

        this.user.id = this.user.data.id;
        this.user.solutionId = this.getSolution._id;
        this.user.benefits = JSON.stringify(this.selectedBenefits);
        this.user.isLoggedIn = true;
        if (this.isGoogleOk && !this.isFacebookOk) {
          this.user.google = true;
          this.user.facebook = false;
        } else {
          this.user.google = false;
          this.user.facebook = true;
        }
        this.getSolution.surveys.forEach(survey => {
          survey.options.forEach(option => {
            this.optionsToValidate.forEach(op => {
              if(option.optionDescription.toLowerCase().trim() === op.optionDescription.toLowerCase().trim()) {
                surveysToValidate.some(item => item.surveyId === survey._id) ?
                surveysToValidate.forEach(item => item.surveyId === survey._id ? item.option.push(option) : false)
                :
                surveysToValidate.push({surveyId: survey._id, option: [option], extraOptions: []})
              }
            })
          })
        })
        console.log('SURVEYS TO VALIDATE', surveysToValidate)
        this.getSolution.surveys.forEach(survey => {
          if (survey.extraOptions.length > 0) {
            survey.extraOptions.forEach(option => {
              if(typeof option === 'string') {              
                let opt = {
                  surveyId: survey._id,
                  optionDescription: option,
                  validations: [],
                  active: false
                }

                surveysToValidate.some(item => item.surveyId === survey._id) ?
                surveysToValidate.forEach(item => item.surveyId === survey._id ? item.extraOptions.push(opt) : false):
                surveysToValidate.push({surveyId: survey._id, option: [], extraOptions: [opt]})             

                // survey.extraOptions.splice(survey.extraOptions.indexOf(option), 1);
              }
            })
          }
        })
        const { data } = await axios.post(endpoint, {surveys: surveysToValidate, user: this.user, optionsToValidate: this.optionsToValidate});
        console.log(data);
        // console.log(data.status);
        if (data.status === 200) {
          this.thanks = true;
          this.setStatus(false, false, "");
          this.$vuetify.goTo(0, { duration: "0", easing: "linear" });
        } else {
          this.setStatus(false, false, "");
          this.$emit("snackbar", {
            error: true,
            message:
              "Unfortunately we couldn't process your validations properly. Please try again later."
          });
        }
      } else if (this.isAuthorizedLinkedin || this.isLinkedinOk){
        console.log('Validating with LinkedIn');
        const endpoint = "/api/solution/benefits/validate";        
        let surveys = JSON.parse(localStorage.getItem('currentSurveys'));
        let selectedOptions = JSON.parse(localStorage.getItem('selectedOptions'));
        console.log(surveys, selectedOptions)
          let surveysToValidate = [];
          surveys.forEach(survey => {
          survey.options.forEach(option => {
              selectedOptions.forEach(op => {
                if(option.optionDescription.toLowerCase().trim() === op.optionDescription.toLowerCase().trim()) {
                  surveysToValidate.some(item => item.surveyId === survey._id) ?
                  surveysToValidate.forEach(item => item.surveyId === survey._id ? item.option.push(option) : false)
                  :
                  surveysToValidate.push({surveyId: survey._id, option: [option], extraOptions: []})
                }
              })
            })
          })
          console.log('SURVEYS TO VALIDATE', surveysToValidate)
          surveys.forEach(survey => {
            if (survey.extraOptions.length > 0) {
              survey.extraOptions.forEach(option => {
                if(typeof option === 'string') {              
                  let opt = {
                    surveyId: survey._id,
                    optionDescription: option,
                    validations: [],
                    active: false
                  }

                  surveysToValidate.some(item => item.surveyId === survey._id) ?
                  surveysToValidate.forEach(item => item.surveyId === survey._id ? item.extraOptions.push(opt) : false):
                  surveysToValidate.push({surveyId: survey._id, option: [], extraOptions: [opt]})             

                  // survey.extraOptions.splice(survey.extraOptions.indexOf(option), 1);
                }
              })
            }
          }) 
          
        console.log('USER', this.user.data)
        const { data } = await axios.post(endpoint, {surveys: surveysToValidate, user: this.user, optionsToValidate: selectedOptions});
        console.log(data);
        // console.log(data.status);
        if (data.status === 200) {
          this.thanks = true;
          this.setStatus(false, false, "");
          this.$vuetify.goTo(0, { duration: "0", easing: "linear" });
          console.log('LOGOUTT')
          this.Logout()
        } else {
          this.Logout()
          this.setStatus(false, false, "");
          this.$emit("snackbar", {
            error: true,
            message:
              "Unfortunately we couldn't process your validations properly. Please try again later."
          });
        }
      }

      this.Logout();
    },

    facebookNotOk (error) {
      // console.log('OH NOES', error);
    },
    facebookOk (response) {
      FB.api('/me', 'GET', { fields: "id,name,email,picture" }, userInformation => {
      // console.log(userInformation);
      // console.log(`Good to see you!!!, ${userInformation.name}.`);
        // console.warn(userInformation);
        const { name } = userInformation;
        let _name = name.split(" ");
        this.user.data = {
          id: userInformation.id,
          firstName: _name[0],
          lastName: _name.length > 0 ? _name[1] : "",
          pictureUrl: `https://graph.facebook.com/${userInformation.id}/picture?width=250`
        };
        this.isFacebookOk = true;
        this.isAuthorized = true;
        this.isAuth = true;
        this.user.loaded = true;
        this.noLinkedin = true;
        this.status.loading = false;
        this.part = 3
        this.noLoginSN = false
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
      // console.log(user);
      this.isGoogleOk = true;
      this.isAuthorized = true;
      this.isAuth = true;
      this.user.data = {
        id: user.Eea,
        firstName: user.ofa,
        lastName: user.wea,
        pictureUrl: user.Paa
      };
      this.user.loaded = true;
      this.noLinkedin = true;
      this.status.loading = false;
      this.part = 3
      this.noLoginSN = false
    },

    onSignInError(error) {
      // `error` contains any error occurred.
      // console.log("OH NOES", error);
    },

    getUserData() {
      this.FB.api(
        "/me",
        "GET",
        { fields: "id,name,email,picture" },
        userInformation => {
          // console.warn(userInformation);
          const { name } = userInformation;
          let _name = name.split(" ");
          this.user.data = {
            id: userInformation.id,
            firstName: _name[0],
            lastName: _name.length > 0 ? _name[1] : "",
            pictureUrl: `https://graph.facebook.com/${userInformation.id}/picture?width=250`
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
      // console.log(payload)
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
      // console.log(this.user)
      // console.log(this.solution)
      // console.log(this.selectedBenefits)
    }
  },
  beforeCreate() {
    
  },
  created: function () {
    // console.warn(localStorage.getItem('linkedin'));
    // console.warn(localStorage.getItem('finalLink'))
    if(localStorage.getItem('linkedin')) {
      console.log('here my bro :) with linkedin user')
      this.getLinkedinUser()
      this.isLinkedinOk = true;
      this.noLoginSN = false; this.isGoogleOk = false; this.isFacebookOk = false;
      this.isAuthorizedLinkedin = true;
      this.part = 3;
    } else {
      console.log('nothing interesting here');
    }
    // console.log(this.getCompanyData)
    // const data = JSON.parse(localStorage.getItem('getCompanyData'));
    // // console.log(data)
    // data.solutions.forEach(solution => {
    //   solution.category.replace(/\s/g, '').toLowerCase().trim() === this.$route.params.solution.toLowerCase().trim() ? this.selectedSolution = solution : null;
    // })
    // console.log(this.selectedSolution)
    // this.part = 11
    // console.warn(this.getCompanyData)
  },
  beforeMount() {
    
  },
  mounted() {
    
  }
};
</script>

<style>

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

.surveyOption2{
  width: 800px; padding: 10px; text-align: left; margin-bottom: 20px; background: red; color: white;
}
.surveyOption{
  width: 800px; padding: 10px; text-align: left; margin-bottom: 20px; background: #f6f7fb;
}
.surveyOption:hover{
  background-color: red;
  color: white
}
.v-toolbar__content {
  padding: 0px !important;
}
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: transparent;
  color: #fff;
}
.v-input__icon--append .v-icon {
  font-size: 10px;
}
</style>
