<template>
    <div style="background: white; border: 1px solid #ccc; padding: 25px; margin-bottom: 20px">
        <div style="width: 100%; display: flex; align-items: center;justify-content: space-between; margin-bottom: 10px; display: flex">
            <span style="font-family: 'Roboto-regular'; font-size: 16px;">Validadas por {{totalClients}} clientes ({{clients.length > 0 ? `1 - ${clients.length-1}` : '0'}} of {{totalClients}})</span>
            <button v-if="showDetails" @click="showDetails = false" style="border none; background: none; color: blue;" type="buttonm">Ocultar detalles</button>
            <button v-if="!showDetails" @click="showDetails = true" style="border none; background: none; color: blue;" type="buttonm">Mostrar detalles</button>
        </div>
        <span v-if="clients.length == 0">Ningun cliente ha validado aun</span>
        <div v-if="clients.length > 0" class="card-carousel-wrapper">
            <div class="card-carousel--nav__left" @click="moveCarousel(-1)" :disabled="atHeadOfList"></div>
            <div class="card-carousel">
                <div class="card-carousel--overflow-container">
                    <div class="card-carousel-cards" :style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}">
                        <div @click="selectedUser = client" class="card-carousel--card" v-for="(client, index) in clients" :key="index" :style="`border-radius: 50%; border: ${selectedUser._id == client._id ? '2px solid orange' : 'none'}`">
                            <img :src="`${Number.isInteger(parseInt(client.pictureUrl.split('.')[0])) ? '/static/images/faces/' : client.pictureUrl.includes('http') ? '' : '/'}${client.pictureUrl}`" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-carousel--nav__right" @click="moveCarousel(1)" :disabled="atEndOfList"></div>
        </div>

        <div v-if="showDetails && clients.length > 0" style="width: 100%; display: flex; flex-direction: column">
            <span style="font-size: 22px; font-family: 'Roboto-bold'; color: #333333">Usuario Verficado</span>
            <span style="font-family: 'Roboto-regular'; font-ise: 15px">{{selectedUser.positions | ''}} en {{selectedUser.industry | ''}}</span>
            <span style="font-family: 'Roboto-regular'; font-ise: 15px">
                {{selectedUser.company | ''}} en 
                {{
                    selectedUser.company_size == 'big' ? ' mas de 500 empleados' :  
                    selectedUser.company_size == 'medium' ? '50 - 500 empleados' :
                    selectedUser.company_size == 'small' ? '50 empleados o menos' : '' 
                }}
            </span>
        </div>

    </div>
</template>

<script>
export default {
    props: ['clients', 'totalClients'],
    computed: {
        atEndOfList() {
            return this.currentOffset <= (this.paginationFactor * -1) * ((this.clients.length - 14) - this.windowSize);
        },
        atHeadOfList() {
            return this.currentOffset === 0;
        },
    },
    data() {
        return {
            selectedUser: {},
            showDetails: false,
            currentOffset: 0,
            windowSize: 3,
            paginationFactor: 220,
            items: [
            ]
        }
    },
    methods: {
        moveCarousel(direction) {
            // Find a more elegant way to express the :style. consider using props to make it truly generic
            if (direction === 1 && !this.atEndOfList) {
                console.log('aqui')
                this.currentOffset -= this.paginationFactor;
            } else if (direction === -1 && !this.atHeadOfList) {
                console.log('aqui2')
                this.currentOffset += this.paginationFactor;
            }
        },
    },
    mounted() {
        this.selectedUser = this.clients[0]
    }
}
</script>

<style>
 .card-carousel-wrapper {
	 display: flex;
	 align-items: center;
	 justify-content: flex-start;
	 margin: 20px 0 35px;
	 color: #666a73;
}
 .card-carousel {
	 display: flex;
	 justify-content: center;
	 width: 640px;
}
 .card-carousel--overflow-container {
	 overflow: hidden;
}
 .card-carousel--nav__left, .card-carousel--nav__right {
	 display: inline-block;
	 width: 15px;
	 height: 15px;
	 padding: 6px;
	 box-sizing: border-box;
	 border-top: 2px solid #42b883;
	 border-right: 2px solid #42b883;
	 cursor: pointer;
	 margin: 0 20px;
	 transition: transform 150ms linear;
}
 .card-carousel--nav__left[disabled], .card-carousel--nav__right[disabled] {
	 opacity: 0.2;
	 border-color: black;
}
 .card-carousel--nav__left {
	 transform: rotate(-135deg);
}
 .card-carousel--nav__left:active {
	 transform: rotate(-135deg) scale(0.9);
}
 .card-carousel--nav__right {
	 transform: rotate(45deg);
}
 .card-carousel--nav__right:active {
	 transform: rotate(45deg) scale(0.9);
}
 .card-carousel-cards {
	 display: flex;
	 transition: transform 150ms ease-out;
	 transform: translatex(0px);
}
 .card-carousel-cards .card-carousel--card {
	 margin: 0 10px;
	 cursor: pointer;
    border-radius: 4px;
	 z-index: 3;
	 margin-bottom: 2px;
}
 .card-carousel-cards .card-carousel--card:first-child {
	 margin-left: 0;
}
 .card-carousel-cards .card-carousel--card:last-child {
	 margin-right: 0;
}
 .card-carousel-cards .card-carousel--card img {
	 vertical-align: bottom;
	 border-radius: 50%;
	 transition: opacity 150ms linear;
	 user-select: none;
     width: 73px
}
 .card-carousel-cards .card-carousel--card img:hover {
	 opacity: 0.5;
}
 .card-carousel-cards .card-carousel--card--footer {
	 border-top: 0;
	 padding: 7px 15px;
}
 .card-carousel-cards .card-carousel--card--footer p {
	 padding: 3px 0;
	 margin: 0;
	 margin-bottom: 2px;
	 font-size: 19px;
	 font-weight: 500;
	 color: #2c3e50;
	 user-select: none;
}
 .card-carousel-cards .card-carousel--card--footer p:nth-of-type(2) {
	 font-size: 12px;
	 font-weight: 300;
	 padding: 6px;
	 background: rgba(40, 44, 53, .06);
	 display: inline-block;
	 position: relative;
	 margin-left: 4px;
	 color: #666a73;
}
 .card-carousel-cards .card-carousel--card--footer p:nth-of-type(2):before {
	 content: "";
	 float: left;
	 position: absolute;
	 top: 0;
	 left: -12px;
	 width: 0;
	 height: 0;
	 border-color: transparent rgba(40, 44, 53, .06) transparent transparent;
	 border-style: solid;
	 border-width: 12px 12px 12px 0;
}
 .card-carousel-cards .card-carousel--card--footer p:nth-of-type(2):after {
	 content: "";
	 position: absolute;
	 top: 10px;
	 left: -1px;
	 float: left;
	 width: 4px;
	 height: 4px;
	 border-radius: 2px;
	 box-shadow: 0px 0px 0px #004977;
}
 
</style>