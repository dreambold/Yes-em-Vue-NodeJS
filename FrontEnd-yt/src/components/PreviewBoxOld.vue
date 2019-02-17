<template>
    <div>
        <div v-if="all">
            <div v-for="(item, index) in solution.surveys.filter(({ active }) => active).sort((a, b) => getValidationsBySurvey(b) - getValidationsBySurvey(a))" :key="index" style="width: 605px;height: 100%;margin-bottom: 12px;padding: 24px 18px 20px 18px;background: white;display: flex;flex-direction: column;border: 1px solid #efefef;border-radius: 3px;">
                <div @click="distpachNavigateToSurvey(item);" style="cursor: pointer; margin-bottom: 3px;"><span style="color: #949494; font-family: 'Roboto-regular'; font-size: 13px">Estadistica validada por clientes ܁ {{transformString(solution.category)}}</span></div>
                <div @click="distpachNavigateToSurvey(item);" style="cursor: pointer; width: 556px; margin-bottom: 12px"><span style="font-family: 'Roboto-bold'; font-size: 18px; color: #333333">{{item.question}}</span></div>
                <div v-if="getHappyClientsBySurvey(item).length > 0" style="display: flex; align-items: center; padding-left: 17px">
                    <div align="left" class="" style="padding-left: 15px; display: flex; align-items: center" v-for="(client, index) in getHappyClientsBySurvey(item).slice(0,3)" v-bind:key="index">
                        <div v-if="client.pictureUrl" :style="`padding-top: 7px; margin-left: -30px; background-size: cover; border: 1px solid #e3e3e3;border-radius: 50%; width: 20px; height: 20px; background-image: url(${Number.isInteger(parseInt(client.pictureUrl.split('.')[0])) ? '/static/images/faces/' : client.pictureUrl.includes('http') ? '' : '/'}${client.pictureUrl})`">
                        </div> 
                    </div>
                    <div @click="distpachNavigateToSurvey(item);">
                        <span style="cursor: pointer; color: #949494; font-family: 'Roboto-regular'; font-size: 13px; margin-left: -3px">• {{getHappyClientsBySurvey(item).length}} clientes han validado, una o varias, opciones de la estadistica</span>
                    </div>
                </div>
                <div v-if="getHappyClientsBySurvey(item).length == 0" style="display: flex; align-items: center;">
                    <span style="color: #949494; font-family: 'Roboto-regular'; font-size: 13px; margin-left: 10px">No hay clientes que hayan validado</span>
                </div>
                <div style="display: flex; align-items: center; margin-top: 7px">
                    <div @click="distpachNavigateToSurvey(item)" style="cursor: pointer;display: flex; align-items: center">
                        <img src="/static/images/cajaestad.png" style="margin-right: 10px;" alt="icon header clients">
                        <span style="font-family: 'Roboto-medium'; font-size: 14px; color: #666666">{{item.description}}</span>
                    </div>
                    <div @click="distpachNavigateToSurvey(item);" style="cursor: pointer;display: flex; align-items: center; margin-left: 30px;">
                        <img src="/static/images/cajavalid.png" style="margin-right: 10px" alt="icon header clients">
                        <span style="font-family: 'Roboto-medium'; font-size: 14px; color: #666666">Validaciones <span style="margin: 0 7px 0 5px">•</span> <span style="font-family: 'Roboto-regular';">{{getValidationsBySurvey(item)}}</span></span>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!all" style="width: 100%; height: 100%; border: 1px solid #efefef; background: white; border-radius: 3px;">
            <div style="height: 100%;width: 100%;border-bottom: 1px solid #efefef;margin-bottom: 10px;">
                <div style="width:100%; height: 50px; padding: 24px 15px 0px 18px; display: flex; align-items: center;">
                    <span style="font-family: 'Roboto-regular'; font-size: 20px; color: #333333">{{transformString(solution.category)}}</span>
                </div>
                <div style="text-align: left;width: 100%;height: 100%;padding: 16px 14px 26px 18px;">
                    <span v-if="solution.description.length < 150" style="font-family: 'Roboto-regular'; font-size: 14px; color: #333333">{{solution.description}}</span>
                    <span v-if="solution.description.length > 150 && !showAllDescription" style="font-family: 'Roboto-regular'; font-size: 14px; color: #333333">{{solution.description.substring(0,150)}} ...</span>
                    <span v-if="showAllDescription" style="font-family: 'Roboto-regular'; font-size: 14px; color: #333333">{{solution.description}}</span>
                    <br />
                    <div style="margin-top: 5px" v-if="solution.description.length > 150">
                        <span v-if="!showAllDescription" style="font-family: 'Roboto-regular'; font-size: 14px; color: #666666; cursor: pointer;" @click="showAllDescription = true">... Ver mas</span>
                        <span v-if="showAllDescription && solution.description.length > 150" style="font-family: 'Roboto-regular'; font-size: 14px; color: #666666; cursor: pointer;" @click="showAllDescription = false">Ver menos</span>
                    </div>
                </div>
            </div>
            <div v-for="(item, j) in (showAllValidations ? solution.surveys.filter(({ active }) => active) : solution.surveys.filter(({ active }) => active))" :key="j" style="width: 100%;height: 100%;padding: 14px 18px;display: flex;align-items: flex-start; flex-direction: column; border-bottom: 1px solid #efefef">
                <div @click="distpachNavigateToSurvey(item);" style="cursor: pointer;width: 556px; margin-bottom: 12px"><span style="font-family: 'Roboto-bold'; font-size: 18px; color: #333333">{{item.question}}</span></div>
                <div style="display: flex; align-items: center;">
                    <div v-if="getHappyClientsBySurvey(item).length > 0" style="display: flex; align-items: center; padding-left: 17px">
                        <div align="left" class="" style="padding-left: 15px; display: flex; align-items: center" v-for="(client, index) in getHappyClientsBySurvey(item).slice(0,3)" v-bind:key="index">
                            <div v-if="client.pictureUrl" :style="`padding-top: 7px; margin-left: -30px; background-size: cover; border: 1px solid #e3e3e3;border-radius: 50%; width: 20px; height: 20px; background-image: url(${Number.isInteger(parseInt(client.pictureUrl.split('.')[0])) ? '/static/images/faces/' : client.pictureUrl.includes('http') ? '' : '/'}${client.pictureUrl})`">
                            </div> 
                        </div> 
                        <div @click="distpachNavigateToSurvey(item);">
                            <span style="cursor: pointer;color: #949494; font-family: 'Roboto-regular'; font-size: 13px; margin-left: -3px">• {{getHappyClientsBySurvey(item).length}} clientes han validado, una o varias, opciones de la estadistica</span>
                        </div>
                    </div>
                    <div v-if="getHappyClientsBySurvey(item).length == 0" style="display: flex; align-items: center;">
                        <span style="color: #949494; font-family: 'Roboto-regular'; font-size: 13px; margin-left: 10px">No hay clientes que hayan validado</span>
                    </div>
                </div>
                <div style="display: flex; align-items: center; margin-top: 7px">
                    <div @click="distpachNavigateToSurvey(item)" style="cursor: pointer;display: flex; align-items: center">
                        <img src="/static/images/cajaestad.png" style="margin-right: 10px;" alt="icon header clients">
                        <span style="font-family: 'Roboto-medium'; font-size: 14px; color: #666666">{{item.description}}</span>
                    </div>
                    <div @click="distpachNavigateToSurvey(item);" style="cursor: pointer;display: flex; align-items: center; margin-left: 30px;">
                        <img src="/static/images/cajavalid.png" style="margin-right: 10px" alt="icon header clients">
                        <span style="font-family: 'Roboto-medium'; font-size: 14px; color: #666666">Validaciones <span style="margin: 0 7px 0 5px">•</span> <span style="font-family: 'Roboto-regular';">{{getValidationsBySurvey(item)}}</span></span>
                    </div>
                </div>
            </div>
            <!-- <div style="width: 100%;height: 146px;padding: 0 30px 0 30px;display: flex;align-items: center;">
                <div>
                    <img @click="distpachNavigateToClients(item)" src="/static/images/cajaservicio2.png" alt="stadistic" style="cursor: pointer; margin-right: 2px;"/>
                </div>
                <div style="width: 460px; display: flex;flex-direction: column;text-align: left;margin-left: 20px;justify-content: space-evenly;">
                    <div>
                    <span @click="distpachNavigateToClients(item)" style="width: 395px; height: 52px; font-family: 'Roboto-bold'; cursor: pointer; color: #333333;font-size: 18px;">
                        Clientes Encuestados
                    </span>
                    </div>
                    <div style="display: flex; align-items: center; margin-top: 15px;">
                    <div @click="distpachNavigateToClients(item)" style="cursor: pointer; display: flex; align-items: center">
                        <img src="/static/images/cajaservicio2.png" style="margin-right: 10px;cursor: pointer; width: 22px" alt="icon header clients">
                        <span style="font-family: 'Roboto-medium'; font-size: 14px; color: #333333">{{getClientsBySolution(solution).length}}</span>
                    </div>
                    </div>
                </div>
            </div>
            <div v-if="solution.surveys.length > 3" style="width: 100%; display: flex; justify-content: center; align-items: center; height: 54px; border-top: 1px solid #efefef">
                <span v-if="showAllValidations" @click="showAllValidations = false" style="color: gray; font-size: 14px; cursor: pointer;">
                    Ver menos estadísticas <v-icon  style="color: #696969; font-size: 16px; margin-left: 5px">keyboard_arrow_up</v-icon>
                </span>
                <span v-if="!showAllValidations" @click="showAllValidations = true" style="color: gray; font-size: 14px; cursor: pointer;">
                    Ver todas las estadísticas <v-icon  style="color: #696969; font-size: 16px; margin-left: 5px">keyboard_arrow_down</v-icon>
                </span>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    props: ['solution', 'all'],
    data() {
        return {
            showAllValidations: false,
            showAllDescription: false,
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
            (survey.options.filter(({ active }) => active)).forEach(option => {
                validations = validations + option.validations.length
            });
            if(survey.showExtra) {
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
    }
}
</script>