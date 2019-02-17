<template>
    <div style="display: flex; flex-direction: column">
        <div style="width: 100%;height: 100%;margin-bottom: 30px; background: white;display: flex;flex-direction: column;border: 1px solid #cecece;border-radius: 3px;">
            <div @click="dispatchSurveyView()" style="width: 100%; display: flex; align-items: center; justify-content: space-between;border-bottom: 1px solid #ececec; margin-bottom: 16px;">
                <div style="display: flex;align-items: center;padding: 0px 15px; height: 44px">
                    <span style="font-family: 'Roboto-bold'; color: #555555; font-size: 15px">{{transformString(solutions.filter(({ _id }) => survey.solutionId)[0].category)}}</span>
                    <div style="margin: 0 15px; border: 0.5px solid #ccc; height: 31px;"></div>
                    <span>{{transformString(survey.description)}}</span>
                </div>
            </div>
            <div style="width: 100%; display: flex; align-items: center; padding: 0 24px">
                <span style="text-align: left; color: #555555; font-family: 'Roboto-bold'; font-size: 14px">{{survey.question}}</span>
            </div>
            <div style="width: 300px; margin-right: 335px; margin-left: 62px;">
                <dl>
                    <div v-for="(option, i) in survey.options.filter(({ active }) => active).sort((a, b) => b.validations.length - a.validations.length)" :key="i" style="height: 53px">
                        <div style="">
                            <span class="text" style="width: 290px;font-family: 'Roboto-regular'; margin-top: 10px;font-size: 15px;color: #111111;text-align: left">
                                {{option.optionDescription}}
                            </span>
                        </div>
                        <!-- <div>
                            <span class="text" style="width: 290px;font-family: 'Roboto-regular'; margin-top: 10px;font-size: 15px;color: #111111;">{{filteringIsActive ? option.validationsCount.length : 0}}</span>
                        </div> -->
                        <dd :ref="`secondBar${i}`" :style="`background: ${i%2 == 0 ? '' : ''}`" :class="`percentage percentage-${isNaN(option.perc) ? 0 : parseInt(option.perc)}`">
                            <span v-if="parseInt(option.perc) > 0" :style="`position: absolute;margin-top: 22px;width: 100%;margin-right: 0px;font-family: 'Roboto-regular'; font-size: 16px;margin-left: ${parseInt(option.perc)}%; color: #111111`">
                                {{parseInt(option.validations.length)}} 
                                <span v-if="filteringIsActive" style="margin-left: 5px;">({{option.validationsCount.length}})</span> 
                            </span>
                        </dd>
                    </div>
                    <!-- ${parseInt(option.perc)} -->
                    <!-- <div v-if="survey.showExtra" style="margin-top: -12px;">
                        <div><span class="text" style="display: flex; width: 290px; height: 62px; align-items: center;justify-content: space-between;">
                            <span>Otras validaciones de clientes</span>
                            <span style="color: #1d7591; cursor: pointer;" @click="showClientsExtraOptions = !showClientsExtraOptions"><v-icon v-if="showClientsExtraOptions" style="color:#1d7591; font-size: 18px; margin-left: 1px">keyboard_arrow_down</v-icon><v-icon v-if="!showClientsExtraOptions" style="color:#333333; font-size: 18px; margin-left: 1px">keyboard_arrow_up</v-icon></span>
                            </span></div><dd :class="`percentage percentage-${parseInt(survey.extraOptionPerc)}`"></dd>
                    </div> -->
                    <!-- <div style="width: 100%; margin-top: 10px; margin-left: 412px;">
                        <span style="font-size: 11px; color: #808080; font-family: 'Roboto-regular'">Validaciones de clientes</span>
                    </div> -->
                </dl>
            </div>
            <div style="margin-top: 42px;padding: 0px 14px 20px 22px;"><span style="font-size: 14px; font-family: 'Roboto-regular'; color: #555555">Otras validaciones de clientes</span></div>
            <hr style="border: 0.5px solid rgb(236, 236, 236); margin-top: 6px;">
            <div v-if="survey.extraOptions.length > 4" style="display: flex; justify-content: flex-end; align-items: center; background-color: white;">
                <div style="margin-right: 5px">
                    <button type="button" @click="pageNumberClient == 0 ? false : prev()" :style="`width: 101px; height: 41px; outline: none; color: ${pageNumberClient == 0 ? '#c0c0c0' : '#7b7b7b'}; font-family: 'Roboto-medium; font-size: 14px; border-radius: 5px;`"><span><v-icon center style="color: #999999; font-size: 16px; margin-right: 10px">fas fa-chevron-left</v-icon></span> Anterior </button>
                </div>
                <div>
                    <button type="button" @click="pageNumberClient >= pageCount  ? false : next()" :style="`width: 101px; height: 41px; outline: none; color: ${pageNumberClient >= pageCount  ? '#c0c0c0' : '#7b7b7b'}; font-family: 'Roboto-medium; font-size: 14px; border-radius: 5px;`">Siguiente <span><v-icon center style="color: #999999; font-size: 16px; margin-left: 10px">fas fa-chevron-right</v-icon></span></button>
                </div>
            </div> 
            <v-layout v-if="showClientsExtraOptions" align-start justify-start column fill-height :style="`width: 100%;`">
                <v-layout style="width: 100%;margin-top: -14px;position: relative;z-index: 10; " align-start justify-start column="" fill-height>
                    <v-flex style="width: 100%;">
                        <div v-if="survey.extraOptions.length > 0" :style="`width: 100%;height: 100%;display: flex;align-items: center;margin-top: ${survey.extraOptions.length > 4 ? '0px' : '20px'}`">
                            <div v-for="(option, j) in currentClients" :key="j" :style="`width: 100%; height: 100%; padding-top: 15px; justify-content: center; display: flex; align-items: center;`">
                                <div style="width: 100%; padding-bottom: 15px;">
                                    <div v-if="option.validations[0]" style="display: flex; flex-direction: column">
                                        <div style="margin-right: 10px">
                                            <v-avatar size="40" style="margin-left: 1px">
                                                <img
                                                    :src="`${Number.isInteger(parseInt(option.validations[0].pictureUrl.split('.')[0])) ? '/static/images/faces/' : option.validations[0].pictureUrl.includes('http') ? '' : '/'}${option.validations[0].pictureUrl}`"
                                                    style="border: 1px solid #e3e3e3; margin-bottom: 15px; margin-right: 3px"
                                                />
                                            </v-avatar>                                                            
                                        </div>
                                        <div style="width: 228px; height: 92px;">
                                            <span @click="optionSelected = option; getTotalValidationsInOption = 1; showResultModal = true" :style="`cursor: pointer; font-family: 'Roboto-regular'; color: #333333; font-size: 14px`">
                                                {{option.optionDescription}}
                                                <br />
                                                <span style="color: #111111; font-family: 'Roboto-regular'; font-size: 15px">{{option.validations[0].firstName}}</span> <span style="color: #111111; font-family: 'Roboto-regular'; font-size: 15px; margin-left: 5px;">{{option.validations[0].lastName}}</span>
                                                <br />
                                                <span style="color: #555555; font-family: 'Roboto-regular'; font-size: 14px">{{option.validations[0].company}}</span>
                                                <br />
                                                <span style="color: #555555; font-family: 'Roboto-regular'; font-size: 14px">{{option.validations[0].industry.slice(0,25)}} <span v-if="option.validations[0].industry.length > 25">...</span></span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-flex>
                </v-layout> 
            </v-layout>
            <!-- <hr style="border: 0.5px solid #ececec; width: 838px; margin-top: 25px; margin-left: -18px;"> -->
            <!-- <div style="width: 95%; height: 100%; justify-content: space-between; background: white;display: flex;padding: 10px">
                <div style="width: 150px; text-align: left; margin-left: 0px;">
                    <span style="font-family: 'Roboto-regular';color: #949494; font-size: 13px">© Yes Them 2019</span>
                </div>
                <div style="text-align: left; margin-left: 90px; width: 252px;">
                    <p style="color: #949494; font-size: 13px; font-family: 'Roboto-regular';">
                        <span style="color: #949494; font-size: 13px; font-family: 'Roboto-bold';">Clientes Encuestados: </span>
                        Empresas:<span v-for="(company, index) in uniqueCompanies.slice(0, 3)" :key="index">
                            {{company}}<span v-if="uniqueCompanies.length > 3 && index < 2">, </span><span v-if="uniqueCompanies.length < 3 && index < (uniqueCompanies.length-1)">, </span>                            
                        </span>
                        <span v-if="uniqueCompanies.length > 3"> y {{uniqueCompanies.length-3}} más</span>.
                        Industrias:<span v-for="(industry, index) in uniqueIndustries.slice(0, 3)" :key="index">
                            {{industry}}<span v-if="uniqueIndustries.length > 3 && index < 2">, </span><span v-if="uniqueIndustries.length < 3 && index < (uniqueIndustries.length-1)">, </span>
                        </span>
                        <span v-if="uniqueIndustries.length > 3"> y {{uniqueIndustries.length-3}} más</span>.
                    </p>
                </div>
                <div style="text-align: left; width: 182px">
                    <p style="color: #949494;font-size: 13px; font-family: 'Roboto-regular';">
                        <span style="color: #949494; font-size: 13px; font-family: 'Roboto-bold';">Fuentes:</span> {{getHappyClientsBySurvey().length}} clientes encuestados, {{getValidationsBySurvey(survey)}} validaciones de clientes.
                    </p>
                </div>
            </div>  -->
        </div>
    </div>
</template>

<script>
export default {
    props: ['solution', 'all', 'survey', 'uniqueCompanies', 'uniqueIndustries', 'solutions', 'filteringIsActive'],
    watch: {
        'survey': {
            handler (value) {
            // console.log('you can do anything here with the new value or old/previous value')
        },
        deep: true
        },
        'filteringIsActive': {
            handler (value) {
                // console.log('value', value)
                // if(value) {
                //     let perc = 0;
                //     this.survey.options.filter(({ active }) => active).forEach((option, i) => {
                //         if (isNaN(option._perc)) option._perc = 0
                //         perc = this.numbers.forEach((num, j) => {
                //             // console.log(' Object.keys(num)',  Object.keys(num))
                //             const index = Object.keys(this.numbers).filter(key => key == parseInt(option._perc))[0]
                //             // console.log(`returning (${this.numbers[j][index]})`, Object.values(this.numbers[j][index])[0])
                //                 // console.log('returning', Object.values(this.numbers[j])[0])
                //             return Object.values(this.numbers[j])[0]
                //         })
                //         console.log('perc', perc)
                //         // console.log(`${option.validationsCount.length}/${option.validations.length}`)
                //         this.$refs[`secondBar${i}`][0].pseudoStyle("after","border-left",`${parseInt(perc)}px solid black`);
                //     })
                // }
            }, deep: true
        }
    },
    data() {
        return {
            showClientsExtraOptions: true,
            showAllValidations: false,
            showAllDescription: false,
            pageNumberClient: 0,
            numbers: [ 
                {0: 0},
                {1: 3},  
                {2: 4},
                {3: 5}  ,
                {4: 6},
                {5: 7},  
                {6: 8} , 
                {7: 9}  ,
                {8: 10} ,
                {9: 12 },
                {10: 14} ,
               { 11: 16} ,
                {12: 18} ,
                {13: 20} ,
                {14: 23} ,
                {15: 26} ,
                {16: 29 },
                {17: 31} ,
                {18: 34} ,
                {19: 37} ,
                {20: 40} ,
                {21: 43} ,
                {22: 46} ,
                {23: 49} ,
                {24: 51} ,
                {25: 54} ,
                {26: 57 },
                {27: 60} ,
                {28: 63} ,
                {29: 66} ,
                {30: 69} ,
                {31: 71} ,
                {32: 74} ,
                {33: 77} ,
                {34: 80} , 
                {35: 82} ,
                {36: 83 },
                {37: 85} ,
                {38: 87}  ,  
                {39: 89} ,
                {40: 91} ,
                {41: 93} ,
                {42: 95} ,
                {43: 97} ,
                {44: 99} ,
                {45: 101} , 
               { 46: 104 } ,
                {47: 107}  ,
                {48: 110 } ,
                {49: 113}  ,
               { 50: 116}  ,
                {51: 119}  ,
                {52: 121 } ,
                {53: 124}  ,
                {54: 127}  ,
                {55: 130}  ,
                {56: 133}  ,
                {57: 136}  ,
                {58: 139 } ,
                {59: 141}  ,
                {60: 144 } ,
                {61: 147}  ,
                {62: 150}  ,
                {63: 153}  ,
                {64: 156}  ,
                {65: 159}  ,
                {66: 161}  ,
                {67: 164}  ,
                {68: 167}  ,
                {69: 170}  ,
                {70: 173}  ,
                {71: 176 } ,
                {72: 179}  ,
                {73: 181}  ,
               { 74: 184}  ,
                {75: 187}  ,
                {76: 190}  ,
                {77: 193}  ,
                {78: 196}  ,
                {79: 199}  ,
                {80: 202}  ,
                {81: 205}  ,
                {82: 207  },
                {83: 210 } ,
               { 84: 213 } ,
                {85: 216 } ,
                {86: 219}  ,
                {87: 222}  ,
               { 88: 225}  ,
                {89: 227}  ,
                {90: 230}  ,
                {91: 233}  ,
                {92: 236}  ,
                {93: 239 } ,
                {94: 241 } ,
                {95: 244}  ,
                {96: 247 } ,
                {97: 249  },
                {98: 251}  ,
                {99: 255 } ,
                {100: 258}  ,
            ]
        }
    },
    computed: {
        clientsPageCount() {
            let l = this.totalOther,
                s = 3;
            return Math.ceil(l/s);
        },
        currentClients() {
            const start = this.pageNumberClient * 3,
                end = start + 3;
            const data = (this.survey.extraOptions.map(option => option)).filter(({ active }) => active).slice(start, end)
            return data
        }
    },
    methods: {
        getClientsBySolution(solution) {
            let clients = [];
            (solution.surveys.filter(({ active }) => active)).forEach(survey => {
                (survey.options.filter(({ active }) => active)).forEach(option => {
                    option.validations.forEach(validation => clients.push(validation))
                })
            });
            return (this.checkDuplicateInObject('id', clients));
        },
        getValidationsBySurvey(survey) {
            let validations = 0;
            (this.survey.options.filter(({ active }) => active)).forEach(option => {
                validations = validations + option.validations.length
            });
            if(this.survey.showExtra) {
                validations = validations + survey.extraOptions.length
            }
            return validations;
        },
        getHappyClientsBySurvey(survey = '') {
          if(survey != '') {
              let validations = [];
              survey.options.filter(({ active }) => active).forEach(option => {
                  option.validations.forEach(validation => {
                      validations.push(validation)
                  })
              })
              if(survey.extraOptions) {
                  survey.extraOptions.filter(({ active }) => active).forEach(option => {
                      // console.log('EXTRAS', option.validations[0])
                      validations.push(option.validations[0])
                  })                    
              }    
              return (this.checkDuplicateInObject('id', validations))                
          } else {
              return []
          }
        },
        next() {
            this.pageNumberClient++;
        },
        prev() {
            this.pageNumberClient--;
        },
        checkDuplicateInObject(propertyName, inputArray) {
          let seenDuplicate = false,
              testObject = {};
          inputArray.map(item => {
              const itemPropertyName = item[propertyName];
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
        dispatchSurveyView() {
            this.$emit('dispatchSurveyView', this.solution)
        },
        transformString(s) {
            let splitted = s.split(' ');
            if (splitted.length > 1) {
                return (splitted.map(word => word.charAt(0).toUpperCase() + (word.slice(1)).toLowerCase())).join(' ');
            } else {
                return  splitted[0].charAt(0).toUpperCase() + (splitted[0].slice(1)).toLowerCase();
            }
        },
        distpachNavigateToSurvey(item) {
            this.$emit('distpachNavigateToSurvey', item)
        },
        distpachNavigateToClients(item) {
            console.log('distpachNavigateToClients', item)
            this.$emit('distpachNavigateToClients', item)
        }
    },
    beforeUpdate() {
                if(this.filteringIsActive) {
                    let perc = 0;
                    this.survey.options.filter(({ active }) => active).forEach((option, i) => {
                        if (isNaN(option._perc)) option._perc = 0
                        this.numbers.forEach((num, j) => {
                            // console.log(' Object.keys(num)',  Object.keys(num))
                            const index = Object.keys(this.numbers).filter(key => key == parseInt(option._perc))[0]
                            // console.log(`returning (${this.numbers[j][index]})`, Object.values(this.numbers[j][index])[0])
                                // console.log('returning', Object.values(this.numbers[j])[0])
                            perc = Object.values(this.numbers[j])[0]
                        })
                        console.log('perc', perc)
                        // console.log(this.$refs[`secondBar${i}`])
                        // console.log(`${option.validationsCount.length}/${option.validations.length}`)
                        this.$refs[`secondBar${i}`][0].pseudoStyle("after","border-left",`${parseInt(option.validationsCount.length)}px solid black`);
                    })
                }
    }
}
</script>

<style scoped>
    dl {
        display: flex;
        background-color: white;
        flex-direction: column;
        width: 100%;
        max-width: 700px;
        position: relative;
        padding: 20px 20px 2px 20px;
    }
    dt {
        align-self: flex-start;
        width: 100%;
        font-weight: 700;
        display: block;
        text-align: center;
        font-size: 1.2em;
        font-weight: 700;
        margin-bottom: 20px;
        margin-left: 130px;
    }
    .text {
        font-family: 'Roboto-regular';
        display: flex;
        align-items: center;
        height: 40px;
        width: 320px;
        background-color: white;
        position: absolute;
        left: -4px;
        justify-content: flex-end;
        color: #666666;
        font-size: 14px;
        text-align: right
    }
    .percentage {
        /* border-left: 2px solid #2b2d49; */
        font-size: 0.8em;
        line-height: 1;
        text-transform: uppercase;
        width: 100%;
        height: 53px;
        margin-left: 276px;
        /* background: repeating-linear-gradient(to right, #ddd, #ddd 1px, #fff 1px, #fff 20%); */
    }
    .percentage:after {
        border-radius: 4px;
        content: "";
        display: block;
        background: #3367d6;
        /* width: 50px; */
        margin-bottom: 10px;
        height: 19px;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        transition: background-color 0.3s ease;
        cursor: pointer;
    }
    /* .percentage:hover:after, .percentage:focus:after {
        background-color: #aaa;
    } */
    .percentage-0:after {
        width: 0px;
    }
    .percentage-1:after {
        width: 3px;
    }
    .percentage-2:after {
        width: 4px;
    }
    .percentage-3:after {
        width: 5px;
    }
    .percentage-4:after {
        width: 6px;
    }
    .percentage-5:after {
        width: 7px;
    }
    .percentage-6:after {
        width: 8px;
    }
    .percentage-7:after {
        width: 9px;
    }
    .percentage-8:after {
        width: 10px;
    }
    .percentage-9:after {
        width: 12px;
    }
    .percentage-10:after {
        width: 14px;
    }
    .percentage-11:after {
        width: 16px;
    }
    .percentage-12:after {
        width: 18px;
    }
    .percentage-13:after {
        width: 20px;
    }
    .percentage-14:after {
        width: 23px;
    }
    .percentage-15:after {
        width: 26px;
    }
    .percentage-16:after {
        width: 29px;
    }
    .percentage-17:after {
        width: 31px;
    }
    .percentage-18:after {
        width: 34px;
    }
    .percentage-19:after {
        width: 37px;
    }
    .percentage-20:after {
        width: 40px;
    }
    .percentage-21:after {
        width: 43px;
    }
    .percentage-22:after {
        width: 46px;
    }
    .percentage-23:after {
        width: 49px;
    }
    .percentage-24:after {
        width: 51px;
    }
    .percentage-25:after {
        width: 54px;
    }
    .percentage-26:after {
        width: 57px;
    }
    .percentage-27:after {
        width: 60px;
    }
    .percentage-28:after {
        width: 63px;
    }
    .percentage-29:after {
        width: 66px;
    }
    .percentage-30:after {
        width: 69px;
    }
    .percentage-31:after {
        width: 71px;
    }
    .percentage-32:after {
        width: 74px;
    }
    .percentage-33:after {
        width: 77px;
    }
    .percentage-34:after {
        width: 80px;
    }
    .percentage-35:after {
        width: 82px;
    }
    .percentage-36:after {
        width: 83px;
    }
    .percentage-37:after {
        width: 85px;
    }
    .percentage-38:after {
        width: 87x;
    }
    .percentage-39:after {
        width: 89px;
    }
    .percentage-40:after {
        width: 91px;
    }
    .percentage-41:after {
        width: 93px;
    }
    .percentage-42:after {
        width: 95px;
    }
    .percentage-43:after {
        width: 97px;
    }
    .percentage-44:after {
        width: 99px;
    }
    .percentage-45:after {
        width: 101px;
    }
    .percentage-46:after {
        width: 104px;
    }
    .percentage-47:after {
        width: 107px;
    }
    .percentage-48:after {
        width: 110px;
    }
    .percentage-49:after {
        width: 113px;
    }
    .percentage-50:after {
        width: 116px;
    }
    .percentage-51:after {
        width: 119px;
    }
    .percentage-52:after {
        width: 121px;
    }
    .percentage-53:after {
        width: 124px;
    }
    .percentage-54:after {
        width: 127px;
    }
    .percentage-55:after {
        width: 130px;
    }
    .percentage-56:after {
        width: 133px;
    }
    .percentage-57:after {
        width: 136px;
    }
    .percentage-58:after {
        width: 139px;
    }
    .percentage-59:after {
        width: 141px;
    }
    .percentage-60:after {
        width: 144px;
    }
    .percentage-61:after {
        width: 147px;
    }
    .percentage-62:after {
        width: 150px;
    }
    .percentage-63:after {
        width: 153px;
    }
    .percentage-64:after {
        width: 156px;
    }
    .percentage-65:after {
        width: 159px;
    }
    .percentage-66:after {
        width: 161px;
    }
    .percentage-67:after {
        width: 164px;
    }
    .percentage-68:after {
        width: 167px;
    }
    .percentage-69:after {
        width: 170px;
    }
    .percentage-70:after {
        width: 173px;
    }
    .percentage-71:after {
        width: 176px;
    }
    .percentage-72:after {
        width: 179px;
    }
    .percentage-73:after {
        width: 181px;
    }
    .percentage-74:after {
        width: 184px;
    }
    .percentage-75:after {
        width: 187px;
    }
    .percentage-76:after {
        width: 190px;
    }
    .percentage-77:after {
        width: 193px;
    }
    .percentage-78:after {
        width: 196px;
    }
    .percentage-79:after {
        width: 199px;
    }
    .percentage-80:after {
        width: 202px;
    }
    .percentage-81:after {
        width: 205px;
    }
    .percentage-82:after {
        width: 207px;
    }
    .percentage-83:after {
        width: 210px;
    }
    .percentage-84:after {
        width: 213px;
    }
    .percentage-85:after {
        width: 216px;
    }
    .percentage-86:after {
        width: 219px;
    }
    .percentage-87:after {
        width: 222px;
    }
    .percentage-88:after {
        width: 225px;
    }
    .percentage-89:after {
        width: 227px;
    }
    .percentage-90:after {
        width: 230px;
    }
    .percentage-91:after {
        width: 233px;
    }
    .percentage-92:after {
        width: 236px;
    }
    .percentage-93:after {
        width: 239px;
    }
    .percentage-94:after {
        width: 241px;
    }
    .percentage-95:after {
        width: 244px;
    }
    .percentage-96:after {
        width: 247px;
    }
    .percentage-97:after {
        width: 249px;
    }
    .percentage-98:after {
        width: 251px;
    }
    .percentage-99:after {
        width: 255px;
    }
    .percentage-100:after {
        width: 258px;
    }
</style>