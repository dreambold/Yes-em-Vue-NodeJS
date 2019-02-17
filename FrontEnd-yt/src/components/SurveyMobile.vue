<template>
    <div :key="index" style="width: 100%; height: 100%; padding: 20px 10px 10px 10px; margin-bottom: 10px; background: white; text-align: left;">
        <div style="text-align: left;">
            <span style="font-family: 'Roboto-bold'; color: #e85f2e; font-size: 16px; font-weight: bold">{{survey.question}}</span>
        </div>
        <div style="width: 100%; display: flex; flex-direction: column; margin-top: 12px; color: black;">
            <div v-for="(option, index) in survey.options.filter(({ active }) => active)" :key="index" style="display: flex; flex-direction: column; align-items: flex-start; text-align: left">
                <SurveyItemMobile
                    :extraOptions="false"
                    :optionDescription="option.optionDescription"
                    :totalClients="getHappyClientsByOption(option)"
                    :validations="option.validations"
                    @dispatchShowValidationsModal="dispatchShowValidationsModal(option)"
                />
                <hr style="margin-top: 10px; margin-bottom: 16px; border: 1px solid #ececec; width: 100%;" />
            </div>
        </div>
        <div v-if="survey.showExtra">
            <span v-if="survey.extraOptions.filter(({ active }) => active).length === 0" style="user-select: none; color: #191919; cursor: pointer;  font-family: 'Roboto-bold'; font-size: 16px; margin-left: 0px;">Otras Validaciones · <span style="font-family: 'Roboto-medium'; color: #666666">0 </span> <v-icon style="margin-right: 4px; font-size: 18px; color: black">fas fa-caret-right<v-icon></span>
            <span 
                @click="showClientsExtraOptions = !showClientsExtraOptions" 
                v-if="survey.extraOptions.filter(({ active }) => active).length > 0"
                style=" font-size: 16px; user-select: none; color: #191919; cursor: pointer; font-family: 'Roboto-bold'; margin-left: 0px;">
                Otras Validaciones · <span style="font-family: 'Roboto-medium'; color: #666666">{{survey.extraOptions.length}} </span>
                <v-icon v-if="showClientsExtraOptions" style="font-size: 16px; color: black">fas fa-caret-down</v-icon>
                <v-icon v-if="!showClientsExtraOptions" style="margin-right: 4px; font-size: 16px; color: black">fas fa-caret-right</v-icon>                        
                <!-- <span v-if="showClientsExtraOptions" style="font-size: 12px">▼</span>
                <span v-if="!showClientsExtraOptions" style="margin-right: 4px; font-size: 12px">⯈</span> -->
            </span>
        </div>
        <div v-if="showClientsExtraOptions" style="color: black;">
            <div v-for="(option, index) in survey.extraOptions.length > 4 ? currentClients.filter(({ active }) => active) : survey.extraOptions.filter(({active}) => active).slice(0,4)" :key="index" style="display: flex; flex-direction: column; align-items: flex-start; text-align: left">
                <SurveyItemMobile
                    :extraOptions="true"
                    :optionDescription="option.optionDescription"
                    :validations="option.validations"
                    @dispatchShowValidationsModal="dispatchShowValidationsModal(option)"
                />
                <hr style="margin-top: 10px; border: 1px solid #ececec; width: 100%;" />
            </div>
            <div v-if="survey.extraOptions.length > 4" style="margin: 20px">
                <button :disabled="pageNumberClient >= clientsPageCount" type="button" @click="next()" :style="`width: 100%; height: 41px; outline: none; background: #f5f6f8; color: black; border-radius: 5px; border: 1px solid #cecece;`">Mostrar más</button>
            </div>            
        </div>
        <div style="width: 100%; height: 50px; display: flex; justify-content: space-between; align-items: center; font-family: 'Segoe'">
            <div>
                <span style="font-family: 'Roboto-regular'; font-weight: bold; color: #9fb1c1;"><v-icon style="color: #9fb1c1; cursor: pointer; font-size: 15px; margin-right: 6px;">fas fa-info-circle</v-icon>Opciones · {{(survey.options.filter(({ active }) => active)).length+(survey.showExtra ? 1 : 0)}}</span>
            </div>
            <div>
                <span style="font-family: 'Roboto-regular'; font-weight: bold; color: #9fb1c1;">Clientes · {{happyClients}}</span>                                            
            </div>
            <div>
                <span style="font-family: 'Roboto-regular'; font-weight: bold; color: #9fb1c1;">Validaciones · {{totalOptions+totalOther}}</span>
            </div>
        </div>
    </div> 
</template>

<script>
import SurveyItemMobile from './SurveyItemMobile'

export default {
    props: ['survey', 'happyClients', 'totalOther', 'totalOptions'],
    components: {
        SurveyItemMobile
    },
    computed: {
        clientsPageCount() {
            let l = this.totalOther,
                s = 4;
            return Math.ceil(l/s);
        },
        currentClients() {
            const start = this.pageNumberClient * 4,
                end = start + 4;
            const data = (this.survey.extraOptions.map(option => option)).filter(({ active }) => active).slice(start, end)
            data.forEach(item => this.moreClients.push(item))
            return this.moreClients
        }
    },
    data() {
        return {
            showClientsExtraOptions: true,
            pageNumberClient: 0,
            selectedValidationsClientsList: [],
            moreClients: []
        }
    },
    methods: {
        next() {
            this.pageNumberClient++;
            // this.stack = this.currentSurveys.map(item => item)
            // this.prevStack = this.currentSurveys.map(item => item)
            // this.currentSurveys = this.solution.surveys.splice(0,3)
            // console.log('current', this.currentSurveys)
        },
        prev() {
            this.pageNumberClient--;
            // this.currentSurveys = this.prevStack
        },
        transformString(s) {
            let splitted = s.split(' ');
            if (splitted.length > 1) {
                return (splitted.map(word => word.charAt(0).toUpperCase() + (word.slice(1)).toLowerCase())).join(' ');
            } else {
                return  splitted[0].charAt(0).toUpperCase() + (splitted[0].slice(1)).toLowerCase();
            }
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
        dispatchShowValidationsModal(option) {
            this.$emit('dispatchShowValidationsModal', option)
        },
        getHappyClientsByOption(option) {
            return this.checkDuplicateInObject('id', option.validations).length
        },                
        dispatchShowModal(type) {
            this.$emit('dispatchShowModal', {data: this.selectedValidationsClientsList, type: type})
        }
    },
    beforeDestroy() {
        console.log('destroying selected card surbey')
    },
    
}
</script>

<style>

</style>


