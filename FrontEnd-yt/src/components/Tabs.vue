<template>
    <div ref="servicesScrollWrapper" class="tabWrapperWithCustomScroll">
        <div style="display: flex;" ref="servicesScrollWrapperInner">
            <div 
                v-for="(service, index) in services" 
                :id="`index${index}`"
                :key="index"
                @click="dispatchSelectedTab(index, service)"
                style="padding: 13px 15px 7px 15px; margin-right: 24px"
                :class="selectedService === index ? 'selected' : 'notSelected'">
                <span style="font-family: 'Roboto-bold'; font-size: 18px;">{{transformString(service)}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['services'],
    data() {
        return {
            selectedService: 0
        }
    },
    methods: {
        dispatchSelectedTab(index, service) {
            this.selectedService = index; 
            this.$emit('dispatchSelectedTab', service);
        },
        transformString(s) {
            let splitted = s.split(' ');
            if (splitted.length > 1) {
                return (splitted.map(word => word.charAt(0).toUpperCase() + (word.slice(1)).toLowerCase())).join(' ');
            } else {
                return  splitted[0].charAt(0).toUpperCase() + (splitted[0].slice(1)).toLowerCase();
            }
        },        
    }
}
</script>

<style scoped>
.tabWrapperWithCustomScroll {
    width: 100%;
    height: 50px;
    background: white;
    overflow-x: scroll;
    white-space: nowrap;
    overflow-y: hidden;
    transition: all .4s ease-in;
}
/* 
.tabWrapperWithCustomScroll::-webkit-scrollbar {
    -webkit-appearance: none;
} */

.tabWrapperWithCustomScroll::-webkit-scrollbar-thumb {
    background-color: transparent;
}

.tabWrapperWithCustomScroll::-webkit-scrollbar:horizontal {
    height: 0.5px;
}

.selected {
    padding-bottom: 5px;
    border-bottom: 3px solid #2675a0;
    color: #2675a0 !important;
}


.notSelected {
    border-bottom: 3px solid white;
    color: #a6a6a6
}
</style>


