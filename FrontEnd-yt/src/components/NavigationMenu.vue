<template>
    <div class="menuWrapper" style="border-bottom: 1px dotted #cecece; padding-bottom: 15px; margin-bottom: 15px;">
      <div style="width: 194px; text-align: left">
        <span style="font-size: 16px;font-weight: bold;color: #333333;">Estadísticas y Validaciones</span>
      </div>
      
      <div v-for="(option, index) in menuOptions" :key="index" @click="selectedMenuOption = index; clickToActiveItem(option, identifier, option.category)" :style="selectedMenuOption === index ? 'margin-top: 10px; display: flex; background: #e8e8e8; cursor: pointer; height: 34px; width: 214px; border-top-right-radius: 44px; border-bottom-right-radius: 44px; flex-direction: row; justify-content: flex-start; align-items: center; border-left: 5px solid #e57e35;' : 'height: 34px; cursor: pointer; margin-top: 10px; display: flex; flex-direction: row; justify-content: flex-start; align-items: center;'">
        <!-- <div style="cursor: pointer;"> -->
          <!-- <img v-show="selectedMenuOption !== index" style="width: 20px; height: 20px" @click="selectedMenuOption = index; clickToActiveItem(option, identifier, option.category)" :src="`/static/images/_checkbox.png`" alt="">
          <img v-show="selectedMenuOption === index" style="width: 20px; height: 20px" :src="`/static/images/_checkbox_selected.png`" alt=""> -->
        <!-- </div> -->
        <div :style="`margin-left: ${selectedMenuOption === index ? '8px' : '13px'}; margin-top: 0px`">
          <span style="font-size: 15px; font-weight: 500">{{transformString(option.category)}}</span> <!--({{getTotalValidations(option.category)}})-->
        </div>
      </div>
        <!-- <div 
          v-for="(option, index) in menuOptions"
          :class="selectedMenuOption === index ? 'selectedMenuOptionContainer' : 'menuOptionContainer'"
          @click="selectedMenuOption === index ? selectedMenuOption = 0 : selectedMenuOption = index; clickToActiveItem(option, identifier, option.category)"
          :key="index"
        >
          <div :style="`background-image: url(/static/images/uploads/${option.image}); background-size: cover; background-position: center center; background-repeat: no-repeat; width: 41px !important; height: 41px !important; border-radius: 5px; margin-right: 15px`"></div>
          <div style="margin-top: 10px">
            <span :style="selectedMenuOption === index ? 'font-size: 15px; color: #2e7677' : ''">{{transformString(option.category)}}</span>
          </div>
        </div> -->
    </div>
</template>
<script>
export default {
    props: ['menuOptions', 'identifier', 'solutions', 'selectedMenuItem', 'byClientsMenu'],
    watch: {
      byClientsMenu: function(val) {
        if(val) {
          this.selectedMenuOption = null
        }
      }
    },
    data() {
        return {
          checkbox: true,
          selectedMenuOption: null,
            data: [
              {name: 'Inicio', img: 'https://atgbcentral.com/data/out/196/5725042-random-picture.jpg'},
              {name: 'Posicionamiento Web', img: 'https://pm1.narvii.com/6803/a5bac0be133c8ec985716ef97c437101da50c5ddv2_hq.jpg'},
              {name: 'Marketing de Contenido', img: 'https://pbs.twimg.com/profile_images/653700295395016708/WjGTnKGQ_400x400.png'},
              {name: 'Community manager', img: 'https://atgbcentral.com/data/out/196/5725042-random-picture.jpg'},
            ]
        }
    },
    methods: {
        clickToActiveItem(index, identifier, category) {
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
        getTotalValidations(_category) {
          let validations = 0
          const selectedSolution = this.solutions.filter(({ category }) => category.trim().toLowerCase() === _category.trim().toLowerCase());
          selectedSolution[0].surveys.filter(({ active }) => active).forEach(survey => {
              survey.options.filter(({ active }) => active).forEach(option => {
                  validations = validations + option.validations.length;                
              });
              survey.extraOptions.filter(({active}) => active ? validations = validations + 1 : false)
          });
          return validations
        }
    },
    mounted() {
      if(!this.selectedMenuOption) {
        this.selectedMenuOption = this.selectedMenuItem;
      } else {
        this.selectedMenuOption = 0
      }
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

