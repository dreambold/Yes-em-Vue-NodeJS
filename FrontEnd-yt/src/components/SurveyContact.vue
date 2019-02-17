<template>
    <div style="margin-bottom: 0px; margin-top: -3px">
        <div v-if="isMobile" style="width: 100%">
            <div style="display:flex; flex-direction: column; text-align: left">
                <div style="padding: 5px 10px 15px 10px; background: rgb(237, 238, 242)"><span style="font-family: 'Roboto-regular'; color: #333333; font-size: 18px;">Contacta en 1-Paso</span></div>
                <div style="width: 100%; height: 290px; background: white; padding: 10px">
                    <div style="text-align: left;">
                        <span style="font-family: 'Roboto-regular'; font-size: 17px; color: #333333">Servicio:</span>
                        <br />
                        <span style="font-family: 'Roboto-regular'; font-size: 17px; color: #333333">{{serviceActive}}</span>
                    </div>

                    <hr style="border: 0.5px solid #cecece; margin: 15px 0 15px 0;" />

                    <div style="text-align: left; padding-bottom: 60px;">
                        <span style="font-family: 'Roboto-regular'; font-size: 16px; color: #333333">
                            Hola, estoy interesado en este servicio.
                            <br />
                            Me gustaría recibir mas información.
                            <br />
                            Gracias
                        </span>
                    </div>

                    <div>
                        <button type="button" @click="message='Hola, estoy interesado en este servicio. Me gustaria recibir mas informacion. Gracias'; 
                                serviceSelected=serviceActive; 
                                contact.dialog.show = true" 
                                :style="`width: 100%; background-color: rgb(231, 103, 45); outline: none`">
                            <span style="color: white; font-size: 17px;">Enviar</span>
                        </button>
                    </div>

                    <hr style="border: 1px solid #ececec; margin: 15px 0 15px 0;" />                    

                    <div style="display: flex; align-items: center" @click="showModalContact = !showModalContact">
                        <v-icon :style="`color: ${showModalContact ? 'rgb(231, 103, 45)' : '#cecece'}; font-size: 20px;`">fas fa-check-circle</v-icon>
                        <span style="font-family: 'Roboto-regular'; font-size: 13px; margin-left: 8px; color: #333333">Acepto compartir mis datos de contacto con la empresa</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!isMobile" :style="`width: ${!isMobile ? '100%' : '100%'}; height: ${!isMobile ? '430px' : '100%'}; border: ${!isMobile ? 'none' : 'none'}; margin-bottom: ${!isMobile ? '0px' : '0px'};`">
            <div :style="`padding: ${!isMobile ? '50px 0px 6px 30px' : '15px'}`">
                <span style="font-size: 30px; color: #333333; font-family: 'Roboto-regular'">¿Alguna pregunta?</span>
                <br />
                <span style="font-family: 'Roboto-regular'; font-size: 30px; color: #666666;">Contacta con {{companyName}}</span>
            </div>
            <div :style="`display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding-left: ${!isMobile ? '0px' : '10px'};`">
                <div style="width: 564px; display: flex; flex-direction: row; margin-bottom: 15px;">
                    <div style="font-family: 'Roboto-regular'; margin-right: 16px; color: #333333"><span>Para: </span></div>
                    <div style="font-family: 'Roboto-regular'; width: 535px; text-align: left; color: #333333"><span>{{companyName}}</span></div>
                </div>
                <div style="display: flex; flex-direction: row; margin-bottom: 5px;">
                    <div style="font-family: 'Roboto-regular'; margin-right: 15px; color: #333333"><span>Mensaje: </span></div>
                    <div v-if="!isMobile">
                        <textarea v-model="message" cols="40" rows="10" style="width: 540px; height: 160px; padding: 10px; border: 1px solid grey" placeholder="Escribe tu mensaje indicando en que servicio o aspectos del servicio estas interesado"></textarea>
                    </div>
                    <div v-if="isMobile" style="width: 100%; padding-right: 10px;">
                        <textarea v-model="message" cols="10" rows="10" style="width: 100%; height: 160px; padding: 10px; border: 1px solid grey" placeholder="Escribe tu mensaje indicando en que servicio o aspectos del servicio estas interesado"></textarea>
                    </div>                
                </div>
                <div style="display: flex; flex-direction: row; width: 606px">
                    <div style="margin-right: 15px; margin-left: -25px; color: #333333"><span style="font-family: 'Roboto-regular';">O selecciona:</span></div>
                    <div style="text-align: left">
                        <select style="cursor: pointer; height: 34px; width: fit-content; border: 1px solid grey" v-model="serviceSelected">
                            <option v-for="(solution, index) in solutions" :key="index" :value="solution.category.toUpperCase()">{{solution.category.toUpperCase()}}</option>
                        </select>
                    </div>
                </div>
                <!-- <br> -->
                <div :style="`margin-left: ${!isMobile ? '-116px' : '0px'}; margin-top: 5px;`">
                <input type="checkbox" :checked="showModalContact" v-model="showModalContact" style="cursor: pointer"><span style="font-family: 'Roboto-regular'; color: #333333;">Acepto compartir mi datos de contaco con la empresa</span><br>
                </div>
                <div :style="`margin-top: 5px; margin-left: ${!isMobile ? '-388px' : '0px'};`">
                    <button type="button" :disabled="!showModalContact || !showModalContact && !serviceSelected" @click="contact.dialog.show = true" :style="`width: 84px; height: 41px; outline: none; background: ${!showModalContact || !showModalContact && !serviceSelected ? 'rgb(169, 169, 169)' : '#94cc33'}; color: white; font-size: 15px; border-radius: 10px;`">Enviar</button>
                </div>
            </div>
        </div>
        <v-dialog
            v-model="contact.dialog.show"
            persistent
            scrollable
            lazy
            max-width="720px"
            :style="`z-index: 9999 !important; margin-top: 10%; height: ${contact.dialog.show ? '100%' : '0px'}`"
            :fullscreen="isMobile"
            >
            <v-card style="height: 100%">
                <v-card-title v-if="!isMobile"  :style="ats('height: 30px; border-bottom: 4px solid #eeeeee;', '=', 'border-bottom: 1px solid #e3e3e3')" :class="ats('text-xs-right', '=', 'pl-4 text-xs-right')">
                    <v-icon :color="isMobile ? 'black': 'grey darken-1'" style="cursor: pointer; margin-top: -12px" @click="contact.dialog.show = false">close</v-icon>
                    <div :class="ats('', '=', 'pl-2')">
                        <v-avatar :size="isMobile ? '64' : '64'" color="white">
                            <img
                                :src="'/static/images/uploads/' + companyLogo  + '#' + Date.now()"
                                style="border: 3px solid #e3e3e3"
                            />
                        </v-avatar>
                    </div>
                    <div v-if="!isMobile" class="px-4 color-00306e" style="font-size: 20px">Contacta a
                        <span class="font-weight-bold">{{companyName}}</span>
                    </div>              
                </v-card-title>
                <div v-if="isMobile"  style="display: flex; justify-content: flex-end; align-items: center; margin-bottom: 30px;">
                    <div :style="ats('width: 100%; height: 40px; padding: 5px; border-bottom: 4px solid #eeeeee;', '=', 'border-bottom: 1px solid #e3e3e3')" :class="ats('text-xs-right', '=', 'pl-4 text-xs-right')" >
                        <v-icon :color="isMobile ? 'black': 'grey darken-1'" style="cursor: pointer;" @click="contact.dialog.show = false">close</v-icon>
                    </div>
                </div>
                <ContactComponent 
                    @ready="closeDialog()"
                    :companyName="companyName" 
                    :companyLogo="companyLogo"
                    :email="email"
                    :message="message"
                    :serviceFromContactForm="serviceSelected"
                    :justLogin="true"  
                >
                </ContactComponent>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog" width="600">
            <v-card>

                <v-card-text style="height: 140px; display: flex; align-items: center; justify-content: center;">
                    <span style="font-size: 20px">¡Gracias! Tu mensaje se ha enviado con éxito</span>
                </v-card-text>

                <v-divider></v-divider>
                
                <div style="width: 100%; display: flex; align-items: center; justify-content: flex-end">
                    <button @click="dialog = false" type="button" style="outline: none; cursor: pointer; border-radius: 5px; padding: 10px;">OK</button>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import ContactComponent from './Contact';

export default {
    props: ['companyName', 'solutions','email', 'companyLogo', 'isMobile', 'serviceActive'],
    components: {
        ContactComponent
    },
    watch: {
        serviceActive: function(val) {
            this.showModalContact = false
            this.message = ''
        }
    },
    data: () => ({
        dialog: false,
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
            },
        },
        message: '',
        serviceSelected: '',
        showModalContact: false         
    }),
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
        closeDialog() {
            this.message = '';
            this.serviceSelected = '';
            this.showModalContact = false;
            this.contact.dialog.show = false;
            this.dialog = true;
        }
    },
    mounted() {
        this.serviceSelected = this.solutions[0].category.toUpperCase()
    }
}
</script>


<style scoped>
    select {
        -moz-appearance: menulist;
        -webkit-appearance: menulist;
    }
</style>