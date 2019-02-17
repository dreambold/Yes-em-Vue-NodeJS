<template>
    <div style="height: 650px; padding: 0 25px">
        <div style="text-align: left; padding: 15px 0 15px 0; width: 100%;">
            <span style="font-size: 22px; padding: 10px 0 10px 0;">{{result.optionDescription}}</span>
            <br/>
            <div style="display: flex; color: rgb(100, 100, 100); align-items: center">
                <div style="margin-right: 8px;"><span>{{validations}} Validaciones de Clientes • </span></div>
                <v-layout align-start justify-start row :style="``">
                        <div  align="left" class="" style="margin-left: 0px" v-for="(client, index) in result.validations.slice(0,5)" v-bind:key="index">
                            <div :style="`background-size: cover; border: 1px solid #e3e3e3;border-radius: 50%; width: 32px; height: 32px; background-image: url(${Number.isInteger(parseInt(client.pictureUrl.split('.')[0])) ? '/static/images/faces/' : client.pictureUrl.includes('http') ? '' : '/'}${client.pictureUrl})`">
                            </div>
                        </div>
                        <div align="left" class="" style="margin-left: 0px" v-if="result.validations.length>5" :style="`display: flex; justify-content: center; align-items: center; cursor: pointer;background-size: cover; border: 1px solid #e3e3e3;border-radius: 50%; width: 32px; height: 32px; background-image: linear-gradient( rgba(0, 0, 0, 0.5) 100%, rgba(0, 0, 0, 0.5)100%),url(${Number.isInteger(parseInt(result.validations[5].pictureUrl.split('.')[0])) ? '/static/images/faces/' : result.validations[5].pictureUrl.includes('http') ? '' : '/'}${result.validations[5].pictureUrl})`">
                            <span style="font-weight: bold; margin-left: 0px; font-size: 12px; color: white;">+{{result.validations.length-5}}</span>
                        </div>
                </v-layout>   
            </div>
        </div>
        <hr style="border: 0.5px solid #ececec">

        <div style="width: 100%; display: flex; flex-direction: column">
            <div style="width: 100%; display: flex; justify-content: space-between; margin-top: 15px">
                <span style="font-size: 20px; color: black">Empresas</span>
                <div style="padding: 20px 20px 20px 92px;">
                    <span :style="`font-size: 16px;  margin-right: 10px; cursor: pointer; color: ${pageNumberCompany==0 ? '#999999' : 'black'}`" @click="pageNumberCompany==0 ? false : prev(2)"><v-icon center style="color: #999999; font-size: 16px; margin-right: 10px">fas fa-chevron-left</v-icon> </span>
                    <span :style="`font-size: 16px; cursor: pointer; color:  ${pageNumberCompany >= companiesPageCount -1 ? '#999999' : 'black'}`" @click="pageNumberCompany >= companiesPageCount -1 ? false : next(2)"> <v-icon center style="color: #999999; font-size: 16px; margin-left: 10px">fas fa-chevron-right</v-icon></span>
                </div>
            </div>
            <div v-if="uniqueCompanies.length > 0" style="width: 100%; display: flex; flex-wrap: wrap;">
                <div v-for="(item, index) in currentCompanies" :key="index" style="width: 125px; height: 50px; flex-direction: column; background: #f5f6f8; margin: 0px; border-right: 1px solid #ececec; display: flex; align-items: center; justify-content: center">
                    <div v-if="item.company">
                        <span>{{item.company.substring(0,10)}}<span v-if="item.company.length > 10">...</span></span>
                        <span style="color: #999999; font-weight: bold;">{{item.quantity}}</span>
                    </div>
                </div>
            </div>
            <div v-if="uniqueCompanies.length == 0" style="width: 100%; display: flex; flex-wrap: wrap;">
                <span>No hay registros</span>
            </div>            
        </div>

        <div style="width: 100%; display: flex; flex-direction: column">
            <div style="width: 100%; display: flex; justify-content: space-between; margin-top: 15px">
                <span style="font-size: 20px; color: black">Industrias</span>
                <div style="padding: 20px 20px 20px 92px;">
                    <span :style="`font-size: 16px;  margin-right: 10px; cursor: pointer; color: ${pageNumberIndustry==0 ? '#999999' : 'black'}`" @click="pageNumberIndustry==0 ? false : prev(1)"><v-icon center style="color: #999999; font-size: 16px; margin-right: 10px">fas fa-chevron-left</v-icon> </span>
                    <span :style="`font-size: 16px; cursor: pointer; color:  ${pageNumberIndustry >= industriesPageCount -1 ? '#999999' : 'black'}`" @click="pageNumberIndustry >= industriesPageCount -1 ? false : next(1)"> <v-icon center style="color: #999999; font-size: 16px; margin-left: 10px">fas fa-chevron-right</v-icon></span>
                </div>
            </div>
            <div v-if="uniqueIndustries.length > 0" style="width: 100%; display: flex; flex-wrap: wrap;">
                <div v-for="(item, index) in currentIndustries" :key="index" style="width: 125px; height: 50px; flex-direction: column; background: #f5f6f8; margin: 0px; border-right: 1px solid #ececec; display: flex; align-items: center; justify-content: center">
                    <div v-if="item.industry">
                        <span>{{item.industry.substring(0,10)}}<span v-if="item.industry.length > 10">...</span></span>
                        <span style="color: #999999; font-weight: bold;">{{item.quantity}}</span>
                    </div>
                </div>
            </div>
            <div v-if="uniqueIndustries.length == 0" style="width: 100%; display: flex; flex-wrap: wrap;">
                <span>No hay registros</span>
            </div>                
        </div>

        <div style="width: 100%; display: flex; flex-direction: column">
            <div style="width: 100%; display: flex; justify-content: space-between; margin-top: 15px">
                <span style="font-size: 20px; color: black">Puestos de Trabajo</span>
                <div style="padding: 20px 20px 20px 92px;">
                    <span :style="`font-size: 16px;  margin-right: 10px; cursor: pointer; color: ${pageNumberPosition==0 ? '#999999' : 'black'}`" @click="pageNumberPosition==0 ? false : prev(3)"><v-icon center style="color: #999999; font-size: 16px; margin-right: 10px">fas fa-chevron-left</v-icon> </span>
                    <span :style="`font-size: 16px; cursor: pointer; color:  ${pageNumberPosition >= positionsPageCount -1 ? '#999999' : 'black'}`" @click="pageNumberPosition >= positionsPageCount -1 ? false : next(3)"> <v-icon center style="color: #999999; font-size: 16px; margin-left: 10px">fas fa-chevron-right</v-icon></span>
                </div>
            </div>
            <div v-if="uniquePositions.length > 0" style="width: 100%; display: flex; flex-wrap: wrap;">
                <div v-for="(item, index) in currentPositions" :key="index" style="width: 125px; height: 50px; flex-direction: column; background: #f5f6f8; margin: 0px; border-right: 1px solid #ececec; display: flex; align-items: center; justify-content: center">
                    <div v-if="item.positions">
                        <span>{{item.positions.substring(0,10)}}<span v-if="item.positions.length > 10">...</span></span>
                        <span style="color: #999999; font-weight: bold;">{{item.quantity}}</span>
                    </div>
                </div>
            </div>
            <div v-if="uniquePositions.length == 0" style="width: 100%; display: flex; flex-wrap: wrap;">
                <span>No hay registros</span>
            </div>                
        </div>                
    </div>
</template>

<style>

</style>

<script>
export default {
    props: ['result', 'validations'],
    watch: {
        result: function(val) {
         //   console.log('watching val')
            this.getUniquesItems()
        }
    },
    computed: {
        industriesPageCount() {
            let l = this.uniqueIndustries,
                s = 10;
            return Math.ceil(l/s);
        },
        currentIndustries() {
            const start = this.pageNumberIndustry * 10,
                end = start + 10;
            const data = this.uniqueIndustries.map(option => option).slice(start, end)
            return data
        },
        companiesPageCount() {
            let l = this.uniqueCompanies,
                s = 10;
            return Math.ceil(l/s);
        },
        currentCompanies() {
            const start = this.pageNumberCompany * 10,
                end = start + 10;
            const data = this.uniqueCompanies.map(option => option).slice(start, end)
            return data
        },
        positionsPageCount() {
            let l = this.uniquePositions,
                s = 10;
            return Math.ceil(l/s);
        },
        currentPositions() {
            const start = this.pageNumberPosition * 10,
                end = start + 10;
            const data = this.uniquePositions.map(option => option).slice(start, end)
            return data
        }        
    },
    data() {
        return {
            uniqueIndustries: [],
            uniqueCompanies: [],
            uniquePositions: [],
            types: ['industry', 'company', 'positions'],
            pageNumberIndustry: 0,
            pageNumberCompany: 0,
            pageNumberPosition: 0,
        }
    },
    methods: {
        getUniquesItems() {
            let clients = this.result.validations
            //// console.log('clients', clients)
            const industries = clients.map(client => {
                return {industry: client.industry, quantity: this.getTotal(client.industry, clients, 0)}
            })
            //// console.log('industries', industries)
         //   console.log(clients)
            const companies = clients.map(client => {
                return {company: client.company, quantity: this.getTotal(client.company, clients, 1)}
            })
            const positions = clients.map(client => {
                return {positions: client.positions, quantity: this.getTotal(client.positions, clients, 2)}
            })
            //// console.log('comapanies', companies)
            this.uniqueIndustries = (this.checkDuplicateInObject('industry', industries)).sort((a, b) => b.quantity - a.quantity)
            this.uniqueCompanies  = (this.checkDuplicateInObject('company', companies)).sort((a, b) => b.quantity - a.quantity)
            this.uniquePositions  = (this.checkDuplicateInObject('positions', positions)).sort((a, b) => b.quantity - a.quantity)
        },
        getTotal(name, array, typeToCompare) {
            let count = 0
            const type = this.types[typeToCompare]
         //   console.log(type, name)
            array.forEach(item => {
                if(item[type] == name) {
                    count++
                }
            })
            return count
        },
        checkDuplicateInObject(propertyName, inputArray) {
            let seenDuplicate = false,
                testObject = {};
            inputArray.map(item => {
                const  itemPropertyName = item[propertyName];
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

        next(type) {
            if(type == 1) {
                this.pageNumberIndustry++
            } else if (type == 2) {
                this.pageNumberCompany++
            } else if (type == 3) {
                this.pageNumberPosition++
            }
        },
        prev(type) {
            if(type == 1) {
                this.pageNumberIndustry--
            } else if (type == 2) {
                this.pageNumberCompany--
            } else if (type == 3) {
                this.pageNumberPosition--
            }
        },           
    },
    created() {
     //   console.log('create')
        this.getUniquesItems()
    }
}
</script>
