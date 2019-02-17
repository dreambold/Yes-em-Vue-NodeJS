<template>
    <div style="width: 100%; background: white;-webkit-box-shadow: rgba(0, 0, 0, 0.02) 1px 0px 3px 6px; box-shadow: rgba(0, 0, 0, 0.02) 1px 0px 3px 6px; border-radius: 3px; margin-bottom: 18px;">
        <div style="margin-bottom: 10px; text-align: left; border-bottom: 1px solid #ececec; padding: 12px 23px"><span style="color: #172c45; font-family: 'Roboto-bold'; font-size: 14px; text-transform: uppercase">{{transformString(solution.category)}}</span></div>
        <div style="height: 100%;border-radius: 2px;width: 100%;">
            <!-- .filter(({active}) => active).sort((a, b) => a.validations.length - b.validations.length) -->
            <div v-for="(option, j) in (showAllOptions ? allOptions(solution.surveys) : allOptions(solution.surveys).slice(0,3))" :key="j" @click="distpachNavigateToSurvey(solution.surveys.filter(({ _id }) => _id == option.surveyId)[0]);">
            <div :style="`cursor: pointer;width: 100;display: flex;height: 110px;padding: 0px 23px 0px;border-bottom: 1px solid #ececec;background: white;text-align: left;align-items: flex-start;flex-direction: column;justify-content: center;`">
                <div><span :style="`font-size: 15px; color: #333333; font-family: 'Roboto-regular'`">{{option.optionDescription}}</span></div>
                <div style="margin-top: 4px"><span style="font-size: 14px; color: #909090; font-family: 'Roboto-light'">{{option.validations.length}} Validaciones</span></div>
            </div>
            </div>
        </div>
        <div v-if="solution.surveys.filter(({active}) => active).length > 3" @click="showAllOptions = !showAllOptions" style="height: 50px; display: flex; align-items: center; justify-content: center">
            <span v-if="!showAllOptions" style="color: #2591e8; font-size: 15px">Ver mas datos</span>
            <span v-if="showAllOptions" style="color: #2591e8; font-size: 15px">Ver menos datos</span>
        </div>
        <div v-if="solution.surveys.filter(({ active }) => active).length == 0" style="height: 30px;">
            <span style="font-size: 15px; color: #333333; font-family: 'Roboto-regular'">No hay servicios para mostrar</span>
        </div>

    </div>
</template>

<script>
export default {
    props: ['solution', 'all'],
    data() {
        return {
            showAllOptions: false,
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
                      validations.push(option.validations[0])
                  })                    
              }    
              return (this.checkDuplicateInObject('id', validations))                
          } else {
              return []
          }
        },
        allOptions(surveys, i = 5){
            let array = [];
            surveys.forEach(survey => {
            survey.options.forEach((option) => {
                option.surveyId = survey._id
                array.push(option)
            })
            })
            return array.filter(({active}) => active).sort((a, b) => b.validations.length - a.validations.length).slice(0, i)
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
            this.$emit('distpachNavigateToClients', item)
        }
    }
}
</script>