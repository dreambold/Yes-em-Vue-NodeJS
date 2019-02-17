<template>
<div>
    <div v-if="!extraOptions" @click="validations.length > 0 ? dispatchShowValidationsModal() : false">
        <div>
            <span style="font-size: 16px; font-family: 'Roboto-medium'; color: #666666">
                <span :style="`font-size: 16px; font-family: 'Roboto-bold'; color: #333333`">{{optionDescription}} ·</span> 
                {{totalClients}}
            </span>
        </div> 
        <div style="display: flex; align-items: center; margin-top: 8px">
            <div v-if="validations.length > 0" :style="`background-size: cover; border: 1px solid #e3e3e3;border-radius: 50%; width: 34px; height: 34px; background-image: url(${Number.isInteger(parseInt(validations[0].pictureUrl.split('.')[0])) ? '/static/images/faces/' : validations[0].pictureUrl.includes('http') ? '' : '/'}${validations[0].pictureUrl})`">
            </div>
            <div :style="`width: ${validations.length == 0 ? '100%' : '85%'}; margin-left: 16px;`">
                <span v-if="validations.length > 0" style="font-size: 14px; color: #404040">
                    Validado por empleados de 
                    {{validations[0].company.split(' ')[0] }}<span v-if="validations.length>1">, </span>
                    <span v-if="validations.length>1" style="font-size: 14px">
                        {{validations[1].company.split(' ')[0] }}
                    </span>
                    <span v-if="validations.length>2" style="font-size: 14px">y {{totalClients-2}} más</span>
                </span>                
                <!-- <span v-if="validations.length > 0" style="font-size: 14px">Validado por {{totalClients}} clientes</span> -->
                <span v-if="validations.length == 0" style="font-size: 14px; color: rgb(64, 64, 64)">Ningun cliente ha validado aun</span>
            </div>
        </div>
    </div>
    <div v-if="extraOptions" style="color: black;">
            <div @click="dispatchShowValidationsModal()" style="display: flex; align-items: center; margin-top: 8px">
                <div v-if="validations.length > 0" :style="`background-size: cover; border: 1px solid #e3e3e3;border-radius: 50%; width: 39px; height: 39px; background-image: url(${Number.isInteger(parseInt(validations[0].pictureUrl.split('.')[0])) ? '/static/images/faces/' : validations[0].pictureUrl.includes('http') ? '' : '/'}${validations[0].pictureUrl})`">
                </div>
                <div v-if="validations.length > 0" style="width: 85%; margin-left: 15px; display: flex; flex-direction: column">
                    <span style="font-family: 'Roboto-regular'; color: #666666; font-size: 14px; font-weight: bold">{{validations[0].firstName}} {{validations[0].lastName}}</span>
                    <span style="font-family: 'Roboto-regular'; color: #404040; font-size: 14px;">{{optionDescription}}</span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ['optionDescription', 'totalClients', 'avatar', 'validations', 'extraOptions'],
    data() {
        return {
            showMoreClients: false
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
        dispatchShowValidationsModal() {
            this.$emit('dispatchShowValidationsModal');
        }
    }
}
</script>

<style scoped>
.v-dialog__content .v-dialog__content--active {
    z-index: 999999999 !important
}
.v-dialog__content--active {
    z-index: 999999999 !important
}
</style>
