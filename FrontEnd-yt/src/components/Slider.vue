<template>
<div>
    <v-layout v-if="!isMobile" align-center justify-center row fill-height style="padding: 0px 34px 0px 34px; margin-bottom: 110px !important">
        <div style="width: 100%; display: flex; justify-content: center; align-items: center;">
            <v-flex xs5 style="background-color: #00bfa6 !important;">
                <div align="right" style="height: 520px !important; padding: 38px 0px 0px 38px">
                    <div style="background-color: white; width: 470px !important; height: 500px; text-align: center !important; padding: 50px 72px 83px 72px !important">
                        <div>
                            <span style="font-size: 34px; font-family: Roboto; font-weight: bold; color: #1d2d35 !important">{{data[actualItem].box.header}}</span>
                        </div>
                        <div style="margin-top: 33px !important;">
                            <img :src="data[actualItem].box.img" alt="">
                        </div>
                        <div style=" margin-top: 28px !important">
                            <span style="font-size: 28px; font-family: Roboto; font-weight: 400; color: #1d2d35 !important">{{data[actualItem].box.subheading}}</span>
                        </div>
                    </div>
                </div>
            </v-flex>
            <v-flex xs5>
                <div v-show="actualItem==0" :style="'background-image: url('+data[0].img+'); overflow: auto; background-repeat: no-repeat scroll; background-size: cover; background-position: center top; width: 100%; height: 520px !important; transition: all 0.2s'">
                    <div align="right">
                        <v-layout align-center justify-center column fill-height style="margin-top: 180px">
                            <v-flex>
                                <div @click="nextItem(actualItem)" class="navButtons" :style="'position: absolute; margin-left: -50px; background-image: url('+data[calculateNextItem(actualItem)].img+'); overflow: auto; background-repeat: no-repeat scroll; background-position: center bottom; width: 90px !important; height: 90px !important; text-align: center !important;'">
                                    <v-icon style="color: white; font-size: 80px">fas fa-angle-right</v-icon>     
                                </div>
                            </v-flex>
                            <br/>
                            <v-flex>
                                <div @click="nextItem(actualItem)" class="navButtons" :style="'position: absolute; margin-left: -50px; margin-top: 90px; background-image: url('+data[calculatePrevItem(actualItem)].img+'); overflow: auto; background-repeat: no-repeat scroll; background-position: center bottom; width: 90px !important; height: 90px !important; text-align: center !important;'">
                                    <v-icon style="color: white; font-size: 80px">fas fa-angle-left</v-icon>     
                                </div>
                            </v-flex>                            
                        </v-layout>
                    </div>                    
                </div>
                <div v-show="actualItem==1" :style="'background-image: url('+data[1].img+'); overflow: auto; background-repeat: no-repeat scroll; background-size: cover; background-position: center top; width: 100%; height: 520px !important; transition: all 0.2s'">
                    <div align="right">
                        <v-layout align-center justify-center column fill-height style="margin-top: 180px">
                            <v-flex>
                                <div @click="nextItem(actualItem)" class="navButtons" :style="'position: absolute; margin-left: -50px; background-image: url('+data[calculateNextItem(actualItem)].img+'); overflow: auto; background-repeat: no-repeat scroll; background-position: center bottom; width: 90px !important; height: 90px !important; text-align: center !important;'">
                                    <v-icon style="color: white; font-size: 80px">fas fa-angle-right</v-icon>     
                                </div>
                            </v-flex>
                            <br/>
                            <v-flex>
                                <div @click="nextItem(actualItem)" class="navButtons" :style="'position: absolute; margin-left: -50px; margin-top: 90px; background-image: url('+data[calculatePrevItem(actualItem)].img+'); overflow: auto; background-repeat: no-repeat scroll; background-position: center bottom; width: 90px !important; height: 90px !important; text-align: center !important;'">
                                    <v-icon style="color: white; font-size: 80px">fas fa-angle-left</v-icon>     
                                </div>
                            </v-flex>                            
                        </v-layout>
                    </div>                    
                </div>
                <div v-show="actualItem==2" :style="'background-image: url('+data[2].img+'); overflow: auto; background-repeat: no-repeat scroll; background-size: cover; background-position: center top; width: 100%; height: 520px !important; transition: all 0.2s'">
                    <div align="right">
                        <v-layout align-center justify-center column fill-height style="margin-top: 180px">
                            <v-flex>
                                <div @click="nextItem(actualItem)" class="navButtons" :style="'position: absolute; margin-left: -50px; background-image: url('+data[calculateNextItem(actualItem)].img+'); overflow: auto; background-repeat: no-repeat scroll; background-position: center bottom; width: 90px !important; height: 90px !important; text-align: center !important;'">
                                    <v-icon style="color: white; font-size: 80px">fas fa-angle-right</v-icon>     
                                </div>
                            </v-flex>
                            <br/>
                            <v-flex>
                                <div @click="nextItem(actualItem)" class="navButtons" :style="'position: absolute; margin-left: -50px; margin-top: 90px; background-image: url('+data[calculatePrevItem(actualItem)].img+'); overflow: auto; background-repeat: no-repeat scroll; background-position: center bottom; width: 90px !important; height: 90px !important; text-align: center !important;'">
                                    <v-icon style="color: white; font-size: 80px">fas fa-angle-left</v-icon>     
                                </div>
                            </v-flex>                            
                        </v-layout>
                    </div>    
                </div>        
            </v-flex>
        </div>
    </v-layout>   
    <v-layout v-if="isMobile" row wrap style="width: 100% !important; margin-bottom: 50px">
        <v-flex xs12 style="width: 100%; height: auto !important;">
            <div :style="'background-image: url('+data[calculateNextItem(actualItem)].img+'); background-repeat: no-repeat scroll; background-size: cover; background-position: center top; width: 100%; height: 250px !important; transition: all 0.2s'">
                <v-btn flat depressed @click="nextItem(actualItem)" small style="postion: absolute; top: 110px; left: -90px; background-color: transparent; height: 50px">
                    <v-icon :style="item === 1 ? 'color: black; font-size: 50px;': 'color: white; font-size: 50px;'">fas fa-angle-left</v-icon> 
                </v-btn>
                <v-btn flat depressed @click="prevItem(actualItem)" small style="postion: absolute; top: 110px; left: 90px; background-color: transparent; height: 50px">
                    <v-icon :style="item === 1 ? 'color: black; font-size: 50px;': 'color: white; font-size: 50px;'">fas fa-angle-right</v-icon> 
                </v-btn>
            </div>
        </v-flex>
        <v-flex style="margin-top: -50px">
            <div align="right" style="height: auto !important; padding: 0px 30px 0px 30px">
                <div style="background-color: white; width: 100% !important; height: 245px; text-align: center !important; padding: 25px 50px 83px 50px !important">
                    <div>
                        <span style="font-size: 20px; font-family: Roboto; font-weight: bold; transition: all 0.2s">{{data[actualItem].box.header}}</span>
                    </div>
                    <div style="margin-top: 5px !important;">
                        <img :src="data[actualItem].box.img" alt="logo of slider" style="width: 65px; height: 65px; transition: all 0.2s">
                    </div>
                    <div style="margin-top: 5px !important">
                        <span style="font-size: 18px; font-family: Roboto; font-weight: 400; transition: all 0.2s">{{data[actualItem].box.subheading}}</span>
                    </div>
                </div>
            </div>                
        </v-flex>
    </v-layout>     
</div>

</template>

<script>
export default {
    props: ['isMobile'],
    data() {
        return {
            item: 0,
            actualItem: 0,
            data: [
                {box: {
                    header: 'Experiencia Probada',
                    subheading: 'Servicios y Resultados respaldados por clientes como tu',
                    img: 'static/images/indice/slider/i1.png'
                }, img: 'static/images/indice/slider/person.jpg'},
                {box: {
                    header: 'Rápido y Directo',
                    subheading: 'Entiende como te puede ayudar una empresa de un vistazo',
                    img: 'static/images/indice/slider/i2.png'
                }, img: 'static/images/indice/slider/girl.jpg'},
                {box: {
                    header: 'Resultados Reales',
                    subheading: 'Resultados que ya han funcionado respaldados por clientes como tu',
                    img: 'static/images/indice/slider/i3.png'
                }, img: 'static/images/indice/slider/handshake.jpg'}
            ]
        }
    },
    methods: {
        nextItem(actualItem) {
            if(actualItem === 0) {
                this.actualItem = 1
            } else if (actualItem === 1) {
                this.actualItem = 2;
            } else if (actualItem === 2) {
                this.actualItem = 0;
            }
        },
        prevItem(actualItem) {
            if(actualItem === 0) {
                this.actualItem = 2
            } else if (actualItem === 1) {
                this.actualItem = 0;
            } else if (actualItem === 2) {
                this.actualItem = 1;
            }
        },
        calculateNextItem(actualItem) {
            if(actualItem === 0) {
                return 1
            } else if (actualItem === 1) {
                return 2;
            } else if (actualItem === 2) {
                return 0;
            }            
        },
        calculatePrevItem(actualItem) {
            if(actualItem === 0) {
                return 2
            } else if (actualItem === 1) {
                return 0;
            } else if (actualItem === 2) {
                return 1;
            }            
        }        
    }
}
</script>

<style>
    .navButtons:hover {
        cursor: pointer;
    }
</style>
