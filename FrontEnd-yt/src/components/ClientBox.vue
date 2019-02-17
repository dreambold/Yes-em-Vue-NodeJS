<template>
    <v-layout @mouseover="clientIsHovered = true"  @mouseleave="clientIsHovered = false" justify-start row fill-height class="clientsBox" style="border-radius: 3px; height: 108px; width: 222px; background: white; border: 1px solid #cecece; cursor: pointer">
        <v-flex xs1 style="margin-right: 15px; margin-top: 20px; margin-left: 10px">
            <v-avatar :size="54">
                <img
                    :src="`${Number.isInteger(parseInt(client.pictureUrl.split('.')[0])) ? '/static/images/faces/' : client.pictureUrl.includes('http') ? '' : '/'}${client.pictureUrl}`"
                    style="border: 1px solid #e3e3e3"
                />
            </v-avatar>
        </v-flex>
        <v-flex xs10 style="text-align: left; margin-left: 30px; margin-top: -7px">
            <div style="margin-top: 16px;">
                <div style="display: flex">
                    <div>
                        <span style="font-size: 15px;text-align: left">
                            <!-- Andrea Castillo -->
                            {{clientName.split('').splice(0,14).join('')}}<span v-if="clientName.length > 14">...</span>
                        </span>
                    </div>
                    <div style="position: absolute; margin-left: 114px; margin-top: -5px;">
                        <span style="margin-left: 10px;"  v-if="clientIsHovered"  @click="dispatchRemoveClient()">
                            <v-icon left dark style="font-size: 15px; color: rgb(44, 116, 122)">fas fa-times</v-icon>
                        </span>
                    </div>
                </div>
                <span style="display: block">
                    <span style="font-size: 14px; color: #696969; font-family: Calibri;text-align: left">{{client.positions.split('').splice(0,42).join('')}}<span v-if="client.positions.length > 42">...</span></span> 
                    <!-- <span style="font-size: 14px; color: #696969; font-family: Calibri;text-align: left">{{client.hasOwnProperty("positions") ? !client.positions.values ? '' : client.positions.values[0].company.name : client.company }} · {{client.headline}}</span>  -->
                </span>
                <!-- <br>
                <span>
                    <span style="font-size: 14px; color: #696969; font-family: Calibri;text-align: left">{{client.industry}}</span> 
                </span> -->
                <span>
                    <span style="font-size: 14px; color: #696969; font-family: Calibri;text-align: left">{{client.company.split('').splice(0, 20).join('')}}<span v-if="client.company.length > 20">...</span></span> 
                    <!-- <span style="font-size: 14px; color: #696969; font-family: Calibri;text-align: left">{{client.hasOwnProperty("positions") ? !client.positions.values ? '' : client.positions.values[0].company.name : client.company }} · {{client.headline}}</span>  -->
                </span>                                                                                                        
            </div>
        </v-flex>
    </v-layout>      
</template>
<script>
export default {
    props: ['client'],
    data() {
        return {
            clientIsHovered: false,
            clientName: ''
        }
    },
    methods: {
        dispatchRemoveClient () {
            this.$emit('dispatchRemoveClient', true);
        }
    },
    created() {
        this.clientName = `${this.client.firstName} ${this.client.lastName}`
    }
}
</script>
<style>
.clientsBox:hover {
    -webkit-box-shadow: -1px -1px 16px -9px rgba(0,0,0,0.75);
    -moz-box-shadow: -1px -1px 16px -9px rgba(0,0,0,0.75);
    box-shadow: -1px -1px 16px -9px rgba(0,0,0,0.75);
    transform: scale(1.02)
}
</style>


