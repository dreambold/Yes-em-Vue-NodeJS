<template>
    <div style="width: 1186px;text-align: left;margin-bottom: 175px;margin-top: 8px;">
        <span>{{getCompanyData.name}} > Estadisticas Validadas por Clientes</span>
        <div :style="`width: 1186px; height: 275px; margin-top: 10px; display: flex; justify-content: center; align-items: flex-start; background-image: url(/static/images/uploads/${getCompanyData.coverImage}?${getCompanyData.coverImage.toString(36).substr(2, 9)}; background-size: cover; background-position: center; background-repeat: no-repeat; padding: 0;`">
            <div style="width: 950px; height: 314px; background: transparent; margin-top: 122px; display: flex; flex-direction: column;">
                <div style="width: 100%; height: 168px; background-color: #e4eef1e6; padding: 16px 27px 0px 27px;border-top-right-radius: 5px; border-top-left-radius: 5px; display: flex; flex-direction: row; align-items: flex-start; ">
                    <div style="display: flex; flex-direction: row; align-items: flex-start; width: 415px">
                        <div>
                            <div v-if="!isMobile && getCompanyData.logo" :style="`background-image: url(/static/images/uploads/${getCompanyData.logo}##${Math.random().toString(36).substring(7)}); margin-top: 0px; background-size: cover; border-radius: 0px; background-position: center; background-repeat: no-repeat; width: 130px !important; height: 130px !important;`"></div>
                        </div>
                        <div style="display: flex; flex-direction: column; margin-left: 12px; text-align: left; margin-top: -8px;">
                            <span style="font-size: 26px; color: #333333; font-family: 'Roboto-bold'">
                                {{getCompanyData.name}} <span style="font-size: 20px; font-family: 'Roboto-regular'">(<span style="color: #225bbc;">{{allValidations}} <img src="/static/images/header/header3.png" style="width: 14px; height: 14px; margin-left: 3px" alt="icon header validations"> </span>)</span>
                            </span>
                            <span style="font-size: 16px; color: #999999; font-family: 'Roboto-regular'">Estadísticas Validadas por Clientes</span>
                            <div style="display: flex; align-items: center; margin-top: 12px;">
                                <div v-if="clients.clients.length > 0" style="margin-left: 15px; display: flex; margin-left: 15px; color: #333333">
                                    <v-avatar :size="30" v-for="(client, index) in clients.clients" :key="index" style="margin-left: -15px !important">
                                        <img
                                            :src="`${Number.isInteger(parseInt(client.pictureUrl.split('.')[0])) ? '/static/images/faces/' : client.pictureUrl.includes('http') ? '' : '/'}${client.pictureUrl}`"
                                            :style="`border: 1px solid #e3e3e3;`"
                                        />
                                    </v-avatar>
                                </div>
                                <div style="width: 500px; color: #333333;">
                                    <span style="font-family: 'Roboto-regular'; font-size: 15px; color: #6c7481">
                                        Estadísticas validadas {{getAllClients}} clientes
                                    </span>
                                    <!-- <span style="font-family: 'Roboto-regular'; font-size: 14px; color: #333333">Empleados de <span v-if="companies.length > 0">{{companies[0]}}</span><span v-if="companies.length > 1">, {{companies[1]}}</span> <span v-if="companies.length>2"> y {{getAllClients-2}} empresas <br/>más</span> han validado estadísticas de {{getCompanyData.name}}</span> -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="width: 60px"></div>
                    <div style="text-align: left; margin-top: 57px; width: 370px;">
                        <span style="width: 100%; font-size: 15px;font-family:'Roboto-regular'; color: #333333; margin-bottom: 12px;">
                            Estadisticas validadas por clientes sobre la actividad de {{getCompanyData.description.substring(0,35)}} desarrollada por {{getCompanyData.name}}
                        </span>
                    </div>
                    <div style="width: 70px; cursor: pointer">
                        <span style="color: #0754ba; display: flex; align-items: center">
                            <v-icon dark large style="font-size: 18px;margin-right: 6px;color: rgb(7, 84, 186);">email</v-icon> Contacto
                        </span>
                    </div>
                </div>
                <div style="width: 100%;height: 175px;background: white;display: flex;flex-direction: column;padding: 5px 27px 30px;align-items: center;border: 1px solid rgb(206, 206, 206);border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;">
                    <div style="display: flex;align-items: center; margin-bottom: 6px; width: 100%; justify-content: space-between">
                        <div style="width: 214px; display: flex; align-items: center; justify-content:space-between">
                            <span>Estadísticas {{getCompanyData.name}}</span>
                            <div style="display: flex; margin-left: 10px;">
                                <v-icon center style="color: #999999; font-size: 12px; margin-right: 5px">fas fa-chevron-left</v-icon>
                                <v-icon center style="color: #696969; font-size: 12px; margin-left: 5px">fas fa-chevron-right</v-icon>
                                <!-- <span :style="`font-size: 16px; margin-right: 50px; cursor: pointer; color: ${pageNumber==0 ? '#999999' : 'black'}`" @click="pageNumber==0 ? false : prev()"><v-icon center style="color: #999999; font-size: 16px; margin-right: 10px">fas fa-chevron-left</v-icon>Anterior</span>
                                <span :style="`font-size: 16px; cursor: pointer; color:  ${pageNumber >= pageCount -1 ? '#999999' : 'black'}`" @click="pageNumber >= pageCount -1 ? false : next()">Siguiente<v-icon center style="color: #999999; font-size: 16px; margin-left: 10px">fas fa-chevron-right</v-icon></span> -->
                            </div>
                        </div>
                        <div>
                            <span style="color: rgb(7, 84, 186); font-size: 13px">Marketing de contenido</span>
                        </div>
                    </div>
                    
                    <div style="display: flex; align-items: center; width: 100%">
                        <div style="display: flex; flex-direction: column; width: 200px;">
                            <div v-for="(item, index) in getCompanyData.solutions.slice(0, 4)" :key="index" style="display: flex; align-items: center">
                                <img src="/static/images/header/header1.png" alt="stadistic" style="margin-right: 10px;width: 18px;height: auto;"/>
                                <span style="color: #333333; margin: 0 10px 0 10px; ">{{item.surveys.length}}</span>
                                <span style="color: #808080; font-size: 14px;">{{transformString(item.category)}}</span>
                            </div>
                        </div>

                        <div style="width: 28px"></div>
                        
                        <div style="display: flex;padding: 0 30px 0 30px;border-left: 1px solid #ececec;justify-content: center;align-items: center;flex-direction: column;border-right: 1px solid #ececec;">
                            <div style="display: flex; align-items: center;">
                                <div style="display: flex; align-items: flex-start; flex-direction: column">
                                    <div style="display: flex; flex-direction: row; align-items: flex-start">
                                        <img src="/static/images/header/headerestad.png" style="width: 18px; height: 18px; margin-right: 8px" alt="icon header stadistics">
                                        <span style="font-size: 14px; color: #6c7481">{{allStad}}</span>
                                    </div>
                                    <span style="font-size: 14px; color: #333333">Estadísticas</span>
                                </div>
                                <div style="display: flex; align-items: flex-start;flex-direction: column; margin-left: 30px; margin-right: 30px; width: 134px">
                                    <div style="display: flex; flex-direction: row; align-items: flex-start;">
                                        <img src="/static/images/header/header2.png" style="width: 18px; height: 18px; margin-right: 8px" alt="icon header clients">
                                        <span style="font-size: 14px; color: #6c7481">{{getAllClients}}</span>
                                    </div>
                                    <span style="font-size: 14px; color: #333333">Clientes encuestados</span>
                                </div>
                                <div style="display: flex; align-items: flex-start; flex-direction: column">
                                    <div style="display: flex; flex-direction: row; align-items: flex-start;">
                                        <img src="/static/images/header/header3.png" style="width: 18px; height: 18px; margin-right: 8px" alt="icon header validations">
                                        <span style="font-size: 14px; color: #6c7481">{{allValidations}}</span>
                                    </div>
                                    <span style="font-size: 14px; color: #333333">Validaciones</span>
                                </div>
                            </div>
                            <div style="margin-top: 22px;">
                                <span style="color: #888888; font-size: 15px;">Datos de {{getCompanyData.name}}</span>
                            </div>
                        </div>


                        <div style="display: flex; flex-direction: column; text-align: left; padding-left: 30px">
                            <div>
                                <span style="color: #333333; font-size: 14px">Increase of potential clients number</span>
                            </div>
                            <div>
                                <span style="color: gray; font-size: 14px">Validaciones de clientes: 75</span>
                            </div>
                            <div style="width: 100%; display: flex; cursor: pointer; margin-top: 18px; justify-content: center; align-items: center">
                                <div style="width: 7px; height: 7px; background: #3898e9; border-radius: 50%; margin: 0 5px 0 5px"></div>
                                <div style="width: 7px; height: 7px; background: #b7b7b7; border-radius: 50%; margin: 0 5px 0 5px"></div>
                                <div style="width: 7px; height: 7px; background: #b7b7b7; border-radius: 50%; margin: 0 5px 0 5px"></div>
                                <div style="width: 7px; height: 7px; background: #b7b7b7; border-radius: 50%; margin: 0 5px 0 5px"></div>
                                <div style="width: 7px; height: 7px; background: #b7b7b7; border-radius: 50%; margin: 0 5px 0 5px"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['getCompanyData', 'isMobile', 'clients', 'allStad', 'allValidations', 'getAllClients', 'uniqueCompanies', 'uniqueIndustries'],
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
            companies: []
        }
    },   
    methods: {
        dispatchContactClick() {
            this.$emit('dispatchContactClick', '');
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
        },
        transformString(s) {
            let splitted = s.split(' ');
            if (splitted.length > 1) {
                return (splitted.map(word => word.charAt(0).toUpperCase() + (word.slice(1)).toLowerCase())).join(' ');
            } else {
                return  splitted[0].charAt(0).toUpperCase() + (splitted[0].slice(1)).toLowerCase();
            }
        },
        
        clickToActiveItem(index, identifier, category, solution) {
            this.$emit('goToService', {index, identifier, solution, category: category});
        },        
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
        this.allClients = clients;
        // console.log('all client', this.allClients)
        // console.log('clients header', this.allClients)
        let c = []
        this.allClients.forEach(({ company }) => c.push(company));
        this.companies = [...new Set(c.sort())];
        setTimeout(()=> this.isLoad = true, 0.1)
        // console.log(this.isLoad)
        // this.$emit('headerRef', this.$refs.principalHeader)
    } 
}
</script>

<style>
    .headerBox {
        background-color: white;
        width: 240px;
        height: 335px;
        padding: 12px 25px 12px 25px;
        /* -webkit-box-shadow: -1px -4px 5px -4px rgba(0,0,0,0.19);
        -moz-box-shadow: -1px -4px 5px -4px rgba(0,0,0,0.19);
        box-shadow: -1px -4px 5px -4px rgba(0,0,0,0.19); */
    }
    .headerBox2 {
        background-color: white;
        width: 240px;
        height: 335px;
        padding: 12px 25px 12px 25px;  
        /* -webkit-box-shadow: -1px -4px 5px -4px rgba(0,0,0,0.19);
        -moz-box-shadow: -1px -4px 5px -4px rgba(0,0,0,0.19);
        box-shadow: -1px -4px 5px -4px rgba(0,0,0,0.19); */
        position: relative;     
    }
    .headerBox3 {
        background-color: #e7e7e7;
        width: 100%;
        height: 70px;
    }
    .headerBox4 {
        background-color: #d6d6d6;
        width: 100%;
        height: 55px;
    }
    .listTree {
        position: relative;
        list-style-type: none
    }
    .listTree::before {
        content: "";
        display: block;
        width: 0;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        border-left: 1px dotted gray;
    }
    .tree {
        transition: all 0.1s
    }
    .tree::before {
        content: "";
        display: block;
        width: 10px;
        height: 0;
        border-top: 1px dotted gray;
        margin-top: 10px;
        position: absolute;
        /* top: 1em; */
        left: 1px;
    }
    .tree:hover {
        text-decoration: underline;
        text-decoration-color: #5fb4f7
    }



 /* width */
    div.divWithCustomScroll2::-webkit-scrollbar {
        width: 6px;
    }

    /* Track */
    div.divWithCustomScroll2::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px #cecece; 
        border-radius: 10px;
    }
    
    /* Handle */
    div.divWithCustomScroll2::-webkit-scrollbar-thumb {
        background: #cbe0f0;
        border: 0px solid #ecf0f3;
        border-radius: 10px;
    }

    div.divWithCustomScroll2::-webkit-scrollbar-thumb:hover {
        cursor: pointer;
    }


    /* width */
    div.divWithCustomScroll2::-webkit-scrollbar {
        width: 6px;
    }

    /* Track */
    div.divWithCustomScroll2::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px #cecece; 
        border-radius: 10px;
    }
    
    /* Handle */
    div.divWithCustomScroll2::-webkit-scrollbar-thumb {
        background: #cbe0f0; 
        border-radius: 10px;
    }

    div.divWithCustomScroll2::-webkit-scrollbar-thumb:hover {
        cursor: pointer;
    }    
</style>