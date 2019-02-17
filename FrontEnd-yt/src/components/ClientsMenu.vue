<template>
    <div class="menuWrapper">
      <div style="width: 194px; text-align: left">
        <span style="font-size: 16px;font-weight: bold;color: #333333;">Clientes Encuestados</span>
      </div>
      
      <div 
        v-for="(option, index) in menuOptions" 
        :key="index" 
        @click="clickToActiveItem(option, identifier, option.category, index)" 
        :style="selectedMenuOption === index ? 
        'height: 34px; cursor: pointer; margin-top: 10px; display: flex; flex-direction: row; justify-content: flex-start; align-items: center; background: rgb(232, 232, 232); width: 214px; border-left: 5px solid rgb(229, 126, 53); border-top-right-radius: 44px; border-bottom-right-radius: 44px;' : 
        'height: 34px; cursor: pointer; margin-top: 10px; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;'">
        <div :style="`margin-left: ${selectedMenuOption === index ? '8px' : '13px'}; margin-top: 0px`">
          <span style="font-size: 15px; font-weight: 500">{{transformString(option.category)}}</span> <!--({{getTotalValidations(option.category)}})-->
        </div>
      </div>
    </div>
</template>
<script>
export default {
    props: ['menuOptions', 'clientsBySolution', 'byClientsMenu'],
    watch: {
      solution: function(val) {
        console.log('watch this solution oupdate', val)
        this.solution = val;
        this.getUniquesItems()
      },
      byClientsMenu: function(val) {
        if(!val) {
          this.selectedMenuOption = null
        }
      }
    },
    data() {
        return {
            uniqueIndustries: [],
            uniqueCompanies: [],
            selectedMenuOption: null,
        }
    },
    methods: {
        clickToActiveItem(index, identifier, category, _index) {
          console.log('index', _index)
          this.selectedMenuOption = _index;
            this.$emit('clickToActiveItem', {index, identifier, category});
        },
        transformString(s) {
            let splitted = s.split(' ');
            if (splitted.length > 1) {
                return (splitted.map(word => word.charAt(0).toUpperCase() + (word.slice(1)).toLowerCase())).join(' ');
            } else {
                return splitted[0].charAt(0).toUpperCase() + (splitted[0].slice(1)).toLowerCase();
            }
        },
        dispatchClickToGoToClients(type, name) {
          // console.log('dispatchClickToGoToClients', {type, name})
          this.$emit('dispatchClickToGoToClients', {type, name})
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
        getUniquesItems() {
            let clients = this.getHappyClients();
            // console.log('clients', clients)
            const industries = clients.map(client => client.industry)
            // console.log('industries', industries)
            const companies = clients.map(client => client.company)
            // console.log('comapanies', companies)
            this.uniqueIndustries = [...new Set(industries.sort())];
            this.uniqueCompanies = [...new Set(companies.sort())];
        },
        getHappyClients () {
            let clients = [];
            this.solution.surveys.filter(({ active }) => active).forEach(survey => {
                (survey.options.filter(({ active }) => active)).forEach(option => {
                    option.validations.forEach(validation => clients.push(validation))
                });
                (survey.extraOptions.filter(({ active, validations}) => active && validations.length > 0)).forEach(eo => {
                    clients.push(eo.validations[0]);
                });
            });
            return (this.checkDuplicateInObject('id', clients))
        }
    },
    mounted() {
        this.getUniquesItems();
    }
}
</script>

<style scoped>

* {
  font-family: 'Roboto-regular'
}

.v-input__slot {
  box-shadow: none !important
}

.menuWrapper {
  margin-left: 0px;
  display: flex;
  flex-direction: column;
  user-select: none; 
  /* height: 100%; 
  background: white; 
  padding: 15px 18px 0 0; 
  border: 1px solid rgb(218, 226, 239); */
}

.selectedMenuOptionContainer {
  display: flex; 
  cursor: pointer; 
  color: #2e7677; 
  margin-left: -1px;
  padding: 8px 14px 14px 15px; 
  border-left: 2px solid #2e7677; 
  margin-bottom: 8px;
}

.menuOptionContainer {
  display: flex; 
  cursor: pointer; 
  padding: 10px 16px 14px 16px;
  font-size: 15px;
}
</style>

