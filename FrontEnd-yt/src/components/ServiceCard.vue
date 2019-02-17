<template>
    <v-layout column :style="
                            ats('', '=', 'background-color: white; width: 907px; padding: 0px 0 0px 0; text-align: left; margin-bottom: 20px; height: 366px; border: 1px solid #d6e4ee;')"> <!--5px in padding top-->
        <div style="width: 907px; height: 366px;">
            <v-layout align-start justify-start row fill-height>
                <v-flex style="padding: 15px; height: 100%; border-right: 1px solid #ececec;">
                     <div :style="ats('background-image: url(/static/images/uploads/'+solution.image+'#'+Date.now()+'); background-size: cover; background-position: center; background-repeat: no-repeat; width: 100% !important; height: 100% !important;', '=','background-image: url(/static/images/uploads/'+solution.image+'); margin-bottom: 0px; background-size: cover; background-position: center; background-repeat: no-repeat; width: 100% !important; height: 326px !important;')"/>
                </v-flex>
                <v-flex xs7>
                    <v-layout align-start justify-start column>
                        <v-flex style="height: 122px;">
                            <div style="padding: 15px 10px 20px 15px;">
                                <span style="font-size: 16px">{{solution.description}}</span>
                            </div>
                        </v-flex>
                        <v-flex style="background-color: #f6f7fb; width: 527px; height: 65px">
                            <div style="padding: 15px 10px 20px 15px; background-color:#f6f7fb">
                                <span style="font-size: 23px; font-weight: bold;">{{transformString(solution.category)}}</span>
                            </div>
                        </v-flex>
                        <v-flex style="width: 100%; padding: 18px 0px 18px 16px;">
                            <div style="display: flex;">
                                <v-layout align-start justify-start row fill-height>
                                    <v-flex xs4>
                                        <v-layout style="border-right: 1px solid #cecece">
                                            <v-flex xs1 style="margin-right: 14px;">
                                                <div :style="`background-image: url(/static/images/clients.png); background-size: cover; background-position: center; background-repeat: no-repeat; width: 25px !important; height: 25px !important;`"/>
                                            </v-flex>
                                            <v-flex style="margin-top: -4px;">
                                                <span style="font-size: 22px">
                                                    <span style="font-family: 'Poppins-regular'; color: #f59828; font-weight: bold;">{{total.clients}}</span> Clientes
                                                </span>
                                            </v-flex>
                                        </v-layout>
                                    </v-flex>
                                    <v-flex xs4 style="margin-left: 68px">
                                        <v-layout>
                                            <v-flex xs1 style="margin-right: 14px;">
                                                <div :style="`background-image: url(/static/images/uploads/${getCompanyData.recomendationsImage}#${Date.now()}); background-size: cover; background-position: center; background-repeat: no-repeat; width: 25px !important; height: 25px !important;`"/>
                                            </v-flex>
                                            <v-flex style="margin-top: -4px;">
                                                <span style="font-size: 22px; white-space: nowrap;">
                                                    <span style="font-family: 'Poppins-regular'; color: #f59828; font-weight: bold;">{{total.validations}}</span> Validaciones
                                                </span>
                                            </v-flex>                                            
                                        </v-layout>
                                    </v-flex>
                                </v-layout>
                            </div>
                        </v-flex>
                        <v-flex style="width: 527px; background: #f6f7fb;">
                            <div style="padding: 15px 10px 20px 15px; display: flex;">
                                <div style="cursor: pointer; background-color: white; padding: 8px; border: 1px solid #ececec; color: black; margin-right: 25px">
                                    <span>Beneficios de Nuestra Ayuda</span>
                                </div>
                                <div style="cursor: pointer; background-color: white; padding: 8px; border: 1px solid #ececec; color: black">
                                    <span>Clientes</span>
                                </div>
                            </div>
                        </v-flex>                        
                    </v-layout>
                </v-flex>
            </v-layout>
            
            
        </div>
    </v-layout>
</template>

<script>
import Vue from 'vue';
import AvatarList from './AvatarList';
import VueScrollTo from 'vue-scrollto';
import checkView from 'vue-check-view'

Vue.use(checkView)
Vue.use(VueScrollTo, {duration: 850})

export default {
    props: ['solution', 'getCompanyData'],
    components: {
      AvatarList
    },
    data () {
        return {
            total: {
                clients: 0,
                validations: 0
            },
            selectedClientFilter: '',
            uniqueIndustries: [],
            uniqueCompanies: [],
            isMobile: false,
            filter: '',
            isLoaded: false,
            colorsMdArray: [
                ["#ffebee","#fce4ec","#f3e5f5","#ede7f6","#e8eaf6","#e3f2fd","#e1f5fe","#e0f7fa","#e0f2f1","#e8f5e9","#f1f8e9","#f9fbe7","#fffde7","#fff8e1","#fff3e0","#fbe9e7","#efebe9","#fafafa","#eceff1"],
                ["#ffcdd2","#f8bbd0","#e1bee7","#d1c4e9","#c5cae9","#bbdefb","#b3e5fc","#b2ebf2","#b2dfdb","#c8e6c9","#dcedc8","#f0f4c3","#fff9c4","#ffecb3","#ffe0b2","#ffccbc","#d7ccc8","#f5f5f5","#cfd8dc"],
                ["#ef9a9a","#f48fb1","#ce93d8","#b39ddb","#9fa8da","#90caf9","#81d4fa","#80deea","#80cbc4","#a5d6a7","#c5e1a5","#e6ee9c","#fff59d","#ffe082","#ffcc80","#ffab91","#bcaaa4","#eeeeee","#b0bec5"],
                ["#e57373","#f06292","#ba68c8","#9575cd","#7986cb","#64b5f6","#4fc3f7","#4dd0e1","#4db6ac","#81c784","#aed581","#dce775","#fff176","#ffd54f","#ffb74d","#ff8a65","#a1887f","#e0e0e0","#90a4ae"],
                ["#ef5350", "#ec407a", "#ab47bc", "#7e57c2", "#5c6bc0", "#42a5f5", "#29b6f6", "#26c6da", "#26a69a", "#66bb6a", "#9ccc65", "#d4e157", "#ffee58", "#ffca28", "#ffa726", "#ff7043", "#8d6e63", "#bdbdbd", "#78909c"],
                ["#f44336","#e91e63","#9c27b0","#673ab7","#3f51b5","#2196f3","#03a9f4","#00bcd4","#009688","#4caf50","#8bc34a","#cddc39","#ffeb3b","#ffc107","#ff9800","#ff5722","#795548","#9e9e9e","#607d8b"],
                ["#e53935","#d81b60","#8e24aa","#5e35b1","#3949ab","#1e88e5","#039be5","#00acc1","#00897b","#43a047","#7cb342","#c0ca33","#fdd835","#ffb300","#fb8c00","#f4511e","#6d4c41","#757575","#546e7a"],
                ["#d32f2f","#c2185b","#7b1fa2","#512da8","#303f9f","#1976d2","#0288d1","#0097a7","#00796b","#388e3c","#689f38","#afb42b","#fbc02d","#ffa000","#f57c00","#e64a19","#5d4037","#616161","#455a64"],
                ["#c62828","#ad1457","#6a1b9a","#4527a0","#283593","#1565c0","#0277bd","#00838f","#00695c","#2e7d32","#558b2f","#9e9d24","#f9a825","#ff8f00","#ef6c00","#d84315","#4e342e","#424242","#37474f"],
                ["#b71c1c","#880e4f","#4a148c","#311b92","#1a237e","#0d47a1","#01579b","#006064","#004d40","#1b5e20","#33691e","#827717","#f57f17","#ff6f00","#e65100","#bf360c","#3e2723"],
                ["#ff8a80","#ff80ab","#ea80fc","#b388ff","#8c9eff","#82b1ff","#80d8ff","#84ffff","#a7ffeb","#b9f6ca","#ccff90","#f4ff81","#ffff8d","#ffe57f","#ffd180","#ff9e80"],
                ["#ff5252","#ff4081","#e040fb","#7c4dff","#536dfe","#448aff","#40c4ff","#18ffff","#64ffda","#69f0ae","#b2ff59","#eeff41","#ffff00","#ffd740","#ffab40","#ff6e40"],
                ["#ff1744","#f50057","#d500f9","#651fff","#3d5afe","#2979ff","#00b0ff","#00e5ff","#1de9b6","#00e676","#76ff03","#c6ff00","#ffea00","#ffc400","#ff9100","#ff3d00"],
                ["#d50000","#c51162","#aa00ff","#6200ea","#304ffe","#2962ff","#0091ea","#00b8d4","#00bfa5","#00c853","#64dd17","#aeea00","#ffd600","#ffab00","#ff6d00","#dd2c00"]
            ],
        }
    },
    methods: {
        validate() {
            localStorage.setItem('getCompanyData', JSON.stringify(this.getCompanyData));
            window.location.replace(`http://yesthem.com/${this.getCompanyData.identifier}/${(this.solution.identifier).toLowerCase()}/validate`)
        },
      ats(xs, sm, mdAndUp) { // According to Size
          if (this.$vuetify.breakpoint.xs) {
              return xs
          } else if (this.$vuetify.breakpoint.sm) {
              return sm === '=' ? xs : sm
          }
          if (this.$vuetify.breakpoint.mdAndUp) {
              return mdAndUp
          }
      },  
      transformString(s) {
          let splitted = s.split(' ');
          let final = '';
          if (splitted.length > 1) {
              final = (splitted.map(word => word.charAt(0).toUpperCase() + (word.slice(1)).toLowerCase())).join(' ');
          } else {
              final = splitted[0].charAt(0).toUpperCase() + (splitted[0].slice(1)).toLowerCase();
          }
          return final
      },
      getTotalCountValidations() {
        let clients = [];
        (this.solution.surveys.filter(({ active }) => active)).forEach(survey => {
            (survey.options.filter(({ active }) => active)).forEach(option => {
                option.validations.forEach(validation => clients.push(validation))
            })
        });
        this.total.clients = (this.checkDuplicateInObject('id', clients)).length;
        (this.solution.surveys.filter(({ active }) => active)).forEach(survey => {
            (survey.extraOptions.filter(({ active }) => active)).forEach(eo => {
                // console.log(eo)
                if(eo.validations.length > 0) {
                    clients.push(eo.validations[0]);
                    this.total.clients = this.total.clients + 1
                }
            })
        })
        this.total.validations = clients.length;
      },
      checkDeviceType() {
          let check = false;
          (function(a) {
              if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
          })(navigator.userAgent || navigator.vendor || window.opera);
          return check;
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
    },
    beforeMount() {
        this.isMobile = this.checkDeviceType();
    },
    mounted() {
        this.getTotalCountValidations()
    },
    destroyed() {
        this.isLoaded = false
    }
}
</script>

<style>
  
    .selected {
        color: #3a44b1 !important;
    }

    .sectionSelected {
        border-bottom: 3px solid #00c1a6;
        text-transform: none;
        color: gray;
        transform: all 0.1s
    }

    .ul-list:hover {
        cursor: pointer !important
    }

    .v-chip .v-chip__:hover {


        background-color: rgb(233, 233, 233);
        cursor: pointer !important;
    }

    /* width */
    div.divWithCustomScroll::-webkit-scrollbar {
        width: 4px;
    }

    /* Track */
    div.divWithCustomScroll::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px #cecece; 
        border-radius: 10px;
    }
    
    /* Handle */
    div.divWithCustomScroll::-webkit-scrollbar-thumb {
        background: rgb(0, 0, 167); 
        border-radius: 10px;
    }

    div.divWithCustomScroll::-webkit-scrollbar-thumb:hover {
        cursor: pointer;
    }

</style>
