<template>
    <div style="margin-bottom: 0px; display: flex; flex-direction: column; background: rgb(245, 249, 252)">
        <div style="display: flex; flex-align: center; text-align: left; padding: 15px 15px 8px 15px">
            <div style="margin-right: 150px;">
                <span @click="dispatchCloseContact()" style="font-size: 18px; color: #333333; margin-right: 20px">X</span>
                <span style="font-size: 20px; color: #333333">Contacta</span>
            </div>
        </div>
        <div style="width: 100%; text-align: left; padding: 0 15px 15px 15px">
            <span style="font-size: 18px; color: #333333">Para: {{companyName}}</span>
        </div>
        <div style="padding: 15px;width: 100%;height: 100%;background: white;display: flex;flex-direction: column;border-radius: 10px;border: 1px solid #ececec; -webkit-box-shadow: -1px 3px 14px 0px rgba(209,209,209,1); -moz-box-shadow: -1px 3px 14px 0px rgba(209,209,209,1); box-shadow: -1px 3px 14px 0px rgba(209,209,209,1);">
            <div style="text-align: left; margin-bottom: 15px">
                <span>Selecciona un servicio</span>
                <br>
                <select style="cursor: pointer; height: 34px; width: 205px; border: 1px solid grey" v-model="serviceSelected">
                    <option v-for="(solution, index) in solutions" :key="index" :value="solution.category.toUpperCase()">{{solution.category.toUpperCase()}}</option>
                </select>
            </div>            
            <div>
                <textarea v-model="message" cols="40" rows="10" style="width: 100%; height: 192px; padding: 10px; border: 1px solid #ececec" placeholder="Escribe tu mensaje indicando en que servicio o aspectos del servicio estas interesado"></textarea>
            </div>
            <div :style="`margin-top: 15px; padding: 5px`">
                <button type="button" :disabled="!showModalContact || !showModalContact && !serviceSelected"  @click="contact.dialog.show = true" :style="`width: 100%; height: 34px; outline: none; background: ${!showModalContact || !showModalContact && !serviceSelected ? 'rgb(169, 169, 169)' : '#f46827'}; color: white; font-size: 15px; border-radius: 10px;`">Enviar</button>
            </div> 
            <div style="padding: 15px; display: flex; align-items: center; justify-content: center">
                <hr style="width: 100%; border: 0.5px solid #ececec" />
            </div>
            <div :style="`margin-top: 15px;`">
                <input type="checkbox" :checked="showModalContact" v-model="showModalContact" style="cursor: pointer"><span style="font-family: 'Roboto-regular';">Acepto compartir mi datos de contaco con la empresa</span><br>
            </div>           
        </div>
        <v-dialog
            v-model="contact.dialog.show"
            persistent
            scrollable
            lazy
            max-width="720px"
            :style="`z-index: 9999 !important; margin-top: 10%; height: ${contact.dialog.show ? '100%' : '0px'}`"
            fullscreen
            >
            <v-card style="height: 100%">
                <div style="display: flex; justify-content: flex-end; align-items: center; margin-bottom: 30px;">
                    <div :style="ats('width: 100%; height: 40px; padding: 5px; border-bottom: 4px solid #eeeeee;', '=', 'border-bottom: 1px solid #e3e3e3')" :class="ats('text-xs-right', '=', 'pl-4 text-xs-right')" >
                        <v-icon color="black" style="cursor: pointer;" @click="contact.dialog.show = false">close</v-icon>
                    </div>
                </div>
                <ContactComponent 
                    @ready="closeDialog()"
                    :companyName="companyName" 
                    :companyLogo="companyLogo"
                    :email="email"
                    :message="message"
                    :serviceFromContactForm="serviceSelected"
                    :getCompanyData="getCompanyData"
                    :justLogin="true"  
                >
                </ContactComponent>
            </v-card>
            </v-dialog>        
    </div>
</template>

<script>
import ContactComponent from './Contact';

export default {
    props: ['companyName', 'solutions','email', 'companyLogo', 'isMobile', 'serviceActive', 'getCompanyData'],
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
            this.dispatchCloseContact()
            
        },
        dispatchCloseContact() {
            this.$emit('dispatchCloseContact')
        }
    },
    mounted() {
        this.serviceSelected = this.solutions[0].category.toUpperCase()
    }
}
</script>


