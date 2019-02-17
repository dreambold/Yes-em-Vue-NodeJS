<template>
    <v-layout column fill-height white style="margin-left: auto; margin-right: auto; width: 80%">
        <v-flex :class="ats('font-weight-bold font-size-13 color-00306e py-4 px-3 white text-xs-left pl-4', '=', 'font-size-13 color-00306e font-weight-bold py-3 px-3 white text-xs-left')" style="border-bottom: 1px solid #d9e1e4 !important">AJUSTES DE PERFIL</v-flex>
        <div class="flex">
            <v-form
                class="white"
                enctype="multipart/form-data"
            >
                <v-layout row wrap pt-5 pb-4 px-4>
                    <v-flex xs12 style="margin-left: 5%">
                        <v-expansion-panel v-model="panel" expand>
                            <v-expansion-panel-content>
                                <div slot="header" :class="ats('font-weight-bold font-size-13 color-00306e', '=', 'font-size-13 color-00306e font-weight-bold')">E-MAIL</div>
                                <v-container fluid>
                                <v-text-field   
                                    v-model="user.data.email"
                                    append-icon="fas fa-pencil-alt"
                                    :rules="emailRules"
                                    name="input-10-2"
                                    hint="Requerido"
                                    label="Email"
                                    value=""
                                    @change="showButton = true"
                                ></v-text-field> 
                                <div class="px-3 text-xs-right pt-4" style="border-top: 1px solid #e3e3e3">
                                    <v-btn
                                    depressed
                                    color="red_button"
                                    :class="ats('white--text px-0 font-weight-bold squared font-size-11', '=', 'white--text px-4 mx-3 font-weight-bold squared')"
                                    :style="ats('height:36px; padding: 5px 5px 5px 5px', '=', 'height:40px; padding: 5px 5px 5px 5px')"
                                    @click="updateEmail"
                                    :disabled="!showButton"
                                    >ACTUALIZAR E-MAIL</v-btn>
                                </div>                                 
                                </v-container>
                            </v-expansion-panel-content>

                            <v-expansion-panel-content>
                            <!--<v-text-field
                                v-model="user.data.password.oldPassword"
                                :append-icon="show1 ? 'visibility_off' : 'visibility'"
                                :rules="[rules.generalRules, rules.lengthRule]"
                                :type="show1 ? 'text' : 'password'"
                                name="input-10-2"
                                hint="Requerido"
                                label="Contraseña Antigua"
                                value=""
                                @click:append="show1 = !show1"
                            ></v-text-field>-->       
                                <div slot="header" :class="ats('font-weight-bold font-size-13 color-00306e', '=', 'font-size-13 color-00306e font-weight-bold')">CONTRASEÑA</div>
                                <v-container fluid>
                                <v-text-field
                                    v-model="user.data.password.newPassword"
                                    :append-icon="show2 ? 'visibility_off' : 'visibility'"
                                    :rules="[rules.generalRules, rules.lengthRule]"
                                    :type="show2 ? 'text' : 'password'"
                                    name="input-10-2"
                                    hint="Requerido"
                                    label="Nueva Contraseña"
                                    value=""
                                    @click:append="show2 = !show2"
                                ></v-text-field>

                                <v-text-field
                                    v-model="user.data.password.confirmPassword"
                                    :append-icon="show3 ? 'visibility_off' : 'visibility'"
                                    :rules="[rules.generalRules, rules.lengthRule]"
                                    :type="show3 ? 'text' : 'password'"
                                    name="input-10-2"
                                    hint="Requerido"
                                    @keyup="matchPassword()"
                                    label="Confirmar Contraseña"
                                    @click:append="show3 = !show3"
                                ></v-text-field>
                                <div class="px-3 text-xs-right pt-4" style="border-top: 1px solid #e3e3e3">
                                    <v-btn
                                    depressed
                                    color="red_button"
                                    :class="ats('white--text px-0 font-weight-bold squared font-size-11', '=', 'white--text px-4 mx-3 font-weight-bold squared')"
                                    :style="ats('height:36px; padding: 5px 5px 5px 5px', '=', 'height:40px; padding: 5px 5px 5px 5px')"
                                    @click="updatePasswordAccount"
                                    :disabled="!showButton"
                                    >ACTUALIZAR CONTRASEÑA</v-btn>
                                </div> 
                                </v-container>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-flex>
                </v-layout>
            </v-form>
            <v-alert
                v-if="showError"
                :value="true"
                type="error"
                transition="scale-transition"
                style="width: 40%"
            >
            Contraseñas no coinciden
            </v-alert>            
            <br/>
        </div>
        <v-snackbar bottom :color="snackbar.success ? 'success' : 'error'" :timeout="5000" :multi-line="true" v-model="snackbar.show">
            {{ snackbar.message }}
            <v-btn flat color="white" @click.stop="snackbar.show = false">Close</v-btn>
        </v-snackbar>        
    </v-layout>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            show1: false,
            show2: false,
            show3: false,   
            showError: false,     
            showButton: false,   
            panel: [true, false], 
            userId: '',
            user: {
                data: {
                    email: '',
                    password: {
                        oldPassword: '',
                        newPassword:'',
                        confirmPassword: ''
                    }
                }
            },
            snackbar: {
                show: false,
                success: true,
                message: ''
            },
            rules: {
                required:
                    v => !!v || "Este campo es requerido!",
                lengthRule:
                    v =>
                    (v && v.length >= 3 && v.length <= 100) ||
                    "Este campo debe tener entre 3 y 30 caracteres."
            },
            emailRules: [
                (v) => !!v || 'El e-mail debe ser válido.',
                (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid.'
            ],            
        }
    },
    computed: {
        ...mapGetters('company', ['getCompanyData', 'getStatus', 'setStatus', 'getSolutions', 'getBenefits', 'getExperiences', 'getTotalValidations']),
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

        matchPassword () {
            const {oldPassword, newPassword, confirmPassword} = this.user.data.password;
            if (newPassword !== confirmPassword) {
                this.showError = true;
            } else {
                this.showError = false;
                this.showButton = true;
                //oldPassword === '' ? false : this.showButton = true;
            }
        },

        async updatePasswordAccount () {
            const {newPassword, confirmPassword} = this.user.data.password;
            if (newPassword !== confirmPassword) {
                this.showError = true;
            } else {
                let finalJson = {
                    userId: this.userId,
                    newPassword: newPassword
                }
                 try {
                    let data = await axios.post('/api/user/recovery/password', finalJson)
                    if(data.status === 200) {
                        this.snackbar.success = true;
                        this.snackbar.message = data.data.message;
                        this.snackbar.show = true;
                    } else {
                        this.snackbar.success = false;
                        this.snackbar.message = data.data.message;
                        this.snackbar.show = true;                
                    }
                    
                } catch (error) {
                    this.snackbar.success = false;
                    this.snackbar.message = 'An error ocurred. Please, try later.';
                    this.snackbar.show = true;                       
                }
            }
        },

        async updateEmail() {
            let identifier = this.$route.params.identifier;
            try {
                let data = await axios.post('/api/user/updateEmail', {userId: this.userId, email: this.user.data.email});
                if(data.status === 200) {
                    this.snackbar.success = true;
                    this.snackbar.message = data.data.message;
                    this.snackbar.show = true;
                } else {
                    this.snackbar.success = false;
                    this.snackbar.message = data.data.message;
                    this.snackbar.show = true;                
                }                
            } catch (e) {
                    this.snackbar.success = false;
                    this.snackbar.message = 'An error ocurred. Please, try later.';
                    this.snackbar.show = true;                  
            }

        },

        async getEmail () {
            let identifier = this.$route.params.identifier;
            let { data } = await axios.post('/api/user/findByCompanyId', {name: identifier});
            this.user.data.email = data.data.email;
            this.userId = data.data._id
        },        
    },


        beforeMount() {
            this.getEmail()
        }
}
</script>