<template>
    <div style="width: 100%; text-align: left; padding: 10px 16px 10px 16px; display: flex; flex-direction: column; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid #ececec">
        <!-- <div style="width: 100%;">
            <span style="font-family: 'Roboto-regular'; font-size: 14px; color: #333333">
                {{getCompanyData.name}}  >  Estadísticas Validadas por Clientes
            </span>
        </div> -->
        <div style="margin-top: 15px; text-align: center; display: flex; justify-content: center; align-items: center; flex-direction: column">
            <div style=" text-align: center; display: flex; justify-content: center; align-items: center;">
                <div>
                    <div v-if="getCompanyData.logo" :style="`background-image: url(/static/images/uploads/${getCompanyData.logo}?${Math.random().toString(36).substring(7)}); margin-top: 0px; background-size: cover; border-radius: 0px; background-position: center; background-repeat: no-repeat; width: 80px !important; height: 80px !important;`"></div>
                </div>
                <div style="width: 100%; text-align: left; margin-left: 20px;">
                    <span style="font-size: 24px; font-family: 'Roboto-medium'; color: #333333">{{getCompanyData.name}}</span>
                    <br/>
                    <span style="font-size: 16px; font-family: 'Roboto-regular'; color: #767676">Estadisticas Validadas por Clientes sobre {{getCompanyData.name}}</span>
                </div>
            </div>
            <div style="text-align: left; margin: 12px 0 4px 0">
                <span style="width: 100%; font-size: 15px;font-family:'Roboto-regular'; color: #333333; margin-bottom: 12px;">
                    Estadisticas validadas por clientes sobre la actividad de {{getCompanyData.description.substring(0,35)}} desarrollada por {{getCompanyData.name}}
                </span>
            </div>
            <div style="width: 100%; text-align: left; margin: 13px; padding: 10px 0 10px 0; border-top: 1px solid #f9f9f9; border-bottom: 1px solid #f9f9f9">
                <span style="font-family: 'Roboto-regular'; color: black;">DATOS {{getCompanyData.name.toUpperCase()}}</span>
            </div>
            <div style="width: 100%; padding: 0 15px; display: flex; flex-direction: column; margin-bottom: 4px">
                <div style="display: flex; align-items: center">
                    <span style="color: #333333; font-size: 16px">Estadisticas: {{allStad}}</span>
                </div>
                <div style="display: flex; align-items: center">
                    <span style="color: #333333; font-size: 16px">Clientes encuestados: {{allClients.length}}</span>
                </div>
                <div style="display: flex; align-items: center">
                    <span style="color: #333333; font-size: 16px">Validaciones de clientes: {{allValidations}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['getCompanyData', 'isMobile', 'solutionIdentifier', 'clients', 'service', 'getAllClients', 'allStad', 'allValidations'],
    data() {
        return {
            isLoad: false,
            allClients: [],
            total: {
                clients: 0,
                validations: 0,
                surveys: 0
            },
            showCompanyDescription: false,
        }
    },   
    methods: {
        dispatchContactClick() {
            this.$emit('dispatchContactClick', '');
        },
        dispatchActiveSlideUpToDown() {
            this.$emit('dispatchActiveSlideUpToDown');
        },
        checkDuplicateInObject(propertyName, inputArray) {
            let seenDuplicate = false,
                testObject = {};
            inputArray.map(item => {
                var itemPropertyName = item[propertyName];
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
        }        
    },
    mounted() {
        // console.log(this.getCompanyData)
        let clients = [];
        this.getCompanyData.solutions.forEach(item => {
            item.surveys.forEach(survey => {
                if(survey.active) this.total.surveys = this.total.surveys + 1;
                survey.options.forEach(option => {
                    if(option.active) {
                        option.validations.forEach(validation => clients.push(validation))
                    }
                })
            })
        });
        this.total.clients = (this.checkDuplicateInObject('id', clients)).length;
        this.getCompanyData.solutions.forEach(item => {
            item.surveys.forEach(survey => {
                if(survey.active) {
                    survey.extraOptions.forEach(eo => {
                        if(eo.active) {
                            if(eo.validations.length > 0) {
                                clients.push(eo.validations[0]);
                                this.total.clients = this.total.clients + 1;
                            }
                        }
                    })
                }
 
            })
        })
        this.total.validations = clients.length;
        this.allClients = clients.slice(0,3);
        console.log('all client', this.allClients)
        setTimeout(()=> this.isLoad = true, 0.1)
        // console.log(this.isLoad)
        // this.$emit('headerRef', this.$refs.principalHeader)
    } 
}
</script>

<style>
</style>