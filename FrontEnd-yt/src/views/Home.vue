<template>
	<v-layout column white v-scroll="onScroll">
		<v-layout v-if="!isMobile" align-center justify-center row fill-height style="padding: 0px 34px 0px 34px">
			<div style="width: 1150px; display: flex">
				<v-flex xs6 style="background-color: white !important;">
					<div align="center" style="height: 488px !important; width: 106%; position: relative; z-index: 2; display: flex; flex-direction: column; justify-content: center; align-items: center; border-left: 14px solid #57cdbc; border-right: 14px solid #57cdbc; padding: 0px 20px 20px 20px; margin-top: 26px;">
						<div style="text-align: center; margin-top: -22px"><span style="font-size: 60px; font-weight: bold; font-family: 'Roboto'; color: #012a54">Demuestra</span></div>
						<div style="text-align: center; margin-top: -22px"><span style="font-size: 34px; font-weight: bold; font-family: 'Roboto-regular'; color: #012a54">Como Ayudas a Tus Clientes</span></div>
						<div style="text-align: left">
							<div style="text-align: left; margin-top: 10px">
								<span style="font-size: 24px; font-family: 'Roboto-regular'; color: #5f6267">
									Demuestra que sois expertos en vuestra área
								</span>
							</div>
							<div style="text-align: left; margin-top: 20px">
								<span style="font-size: 24px; font-family: 'Roboto-regular'; color: #5f6267">
									Explica tu expertise en tu perfil Yes Them, <br />
									consigue la validación de tus clientes <br />
									y atrae nuevos clientes.
								</span>
							</div>
						</div>
					</div>
				</v-flex>
				<v-flex xs6>
					<div style="background-image: url(static/images/new-home/persons.png); background-repeat: no-repeat scroll; background-size: contain; background-position: center top; width: 580px; height: 620px !important"></div>
				</v-flex>
			</div>
		</v-layout>

		<v-flex v-if="isMobile" white>
			<v-layout row wrap>
				<v-flex xs12 :style="`margin-top: ${$vuetify.breakpoint.smAndDown ? '50px' : '0px'};`">
					<div style="background-image: url(static/images/new-home/persons.png); background-repeat: no-repeat scroll; background-size: cover; background-position: center top; width: 100%; height: 300px !important"></div>
				</v-flex>
				<!-- <v-flex xs0 md1 white :style="ats('', '', 'height: 750px')"></v-flex> -->
				<v-flex xs12 md5 :class="ats('pa-4', '=', 'py-5 pr-0')" text-xs-left transparent :style="'background-color: #00bfa6 !important'">
					<v-layout column fill-height justify-center align-center>
						<v-flex xs12 :class="ats('text-xs-left mx-2', '=', 'text-xs-left')">
							<div class="pb-4 white--text roboto" :style="ats('line-height: 40px !important; font-size: 30px !important; font-weight: bold; color: white', '=', 'line-height: 50px !important; font-size: 44px !important; padding-top: 15%;')">
								Tu experiencia <br>
								respaldada por tus <br>
								clientes
							</div>
							<div class="roboto white--text" :style="ats('line-height: 1.4 !important; font-size: 18px !important; color: white; font-weight: 500', '=', 'line-height: 1.4 !important; font-size: 28px !important')">
								Explica tus servicios en tu perfil 
								Yes Them, consigue el respaldo de tus 
								clientes y atrae nuevos clientes.
							</div>
							<div class="mt-2" style="width: 70% !important;">
								<v-btn :block="ats(true, true,false)" depressed class="white--text px-5 my-4 mx-0 font-weight-bold purple_button squared" :style="ats('height:50px', '=', 'height:50px')" to="/register">Activa tus clientes</v-btn>
							</div>
						</v-flex>
					</v-layout>
				</v-flex>
			</v-layout>
		</v-flex>


		<v-flex :class="ats('mt-0 pt-5 pl-2', '=', '')" style="background-color: white; padding: 80px 0 80px 0"> <!--mb-5 mb-4-->
			<div style="width: 100%">
				<div style="padding: 20px;">
					<h1 :style="`font-size: ${$vuetify.breakpoint.smAndDown ? '24px' : '42px'}; font-weight: bold; color: #012a54 !important; text-align: center; font-family: Roboto; line-height: ${$vuetify.breakpoint.smAndDown ? '' : '64px !important'}`">
						Una plataforma creada para que conviertas a tus clientes 
						<br />
						en tu herramienta de marketing más potente
					</h1>
					<div style="display: flex; justify-content: space-evenly; align-items: center; padding-top: 50px;">
						<div style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center">
							<img src="static/images/new-home/clients.png" alt="Influye en un cliente potencial" />
							<span :style="`font-size: ${$vuetify.breakpoint.smAndDown ? '15px' : '25px'}; font-family: 'Roboto-regular'`">
								Influye en un<br />
								cliente potencial
							</span>
						</div>
						<div style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center">
							<img src="static/images/new-home/consumers.png" alt="Influye en un cliente potencial" />
							<span :style="`font-size: ${$vuetify.breakpoint.smAndDown ? '15px' : '25px'}; font-family: 'Roboto-regular'`">
								Educa a tus<br />
								consumidores
							</span>
						</div>
						<div style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center">
							<img src="static/images/new-home/results.png" alt="Influye en un cliente potencial" />
							<span :style="`font-size: ${$vuetify.breakpoint.smAndDown ? '15px' : '25px'}; font-family: 'Roboto-regular'`">
								Demuestra<br />
								tus resultados
							</span>
						</div>												
					</div>
				</div>
			</div>
		</v-flex>

		<v-flex>
			<Slider :isMobile="isMobile"></Slider>
		</v-flex>
		
	</v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import Vue from 'vue'
import Vue2TouchEvents from 'vue2-touch-events'
import VueScrollTo from 'vue-scrollto';
import Slider from '../components/Slider';

Vue.use(VueScrollTo)
Vue.use(Vue2TouchEvents);

export default {
	components: {Slider},
  data () {
  	return {
  		thirdElementPos: 0,
  		isHovered: false,
		isMobile: false,
		autoplay: true,
		loop: true,
		autoplaytimeout: 8000,
  		swipe: 1,
  		swipeOffset: 0,
  		sticky: false,
  		beingHovered: null,
  		google: false,
  		gsearch: '',
  		devAssets: '/static/images/',
  		style: {
	        'background-image' : this.ats('url(/static/images/new-home/persons.png)', '=', 'url(/static/images/new-home/persons.png)'),
	        // 'background-image' : this.getStatus.loading ? 'linear-gradient(to bottom, rgba(0,0,0,0.10) 0%,rgba(0,0,0,0.5) 100%)' : (this.getCompanyData.coverImage ? 'url("/static/images/uploads/' + this.getCompanyData.coverImage + '#' + Date.now() + '")' : 'linear-gradient(to bottom, rgba(0,0,0,0.10) 0%,rgba(0,0,0,0.5) 100%)'),
	        // 'background-image' : 'linear-gradient(to bottom, rgba(0,0,0,0.10) 0%,rgba(0,0,0,0.85) 100%)',
	        'background-repeat': 'no-repeat scroll',
	        'background-position': 'center',
	        'background-size' : this.ats('cover' ,'=', 'contain'),
	        'background-color': '#494FB1 !important',
	        'height' : this.ats('auto' ,'=', ''),
	        'width' : '100%',
	        'padding-bottom': this.ats('', '=', '')
	    },
	    G5: {
	    	'background-image' : 'url(/static/images/G-5.png)',
	        'background-repeat': 'no-repeat scroll',
	        'background-position': '100% 100%',
	        'background-size' : this.ats('contain' ,'=', 'contain'),
	        'background-color': '#D5E3E4',
	        'height' : this.ats('338px' ,'507px', '675px'),
	        'width' : '100%'	
	    }
  		// buildAssets: require('../assets/images/G-1.png')
  	}
  },
  watch: {
  	'thirdElementPos' (to, from) {
  		console.log(to, from)
  	}
  },
  computed: {
  	swipable () {
  		if (this.swipe === 1) {
  			this.swipeOffset = -8.75
  		} else if (this.swipe === 2) {
  			this.swipeOffset = -5 * 7.50
  		} else {
  			this.swipeOffset = -8 * 8.23
  		}
  		console.log(this.swipeOffset)
  		// this.swipeOffset = this.swipe * 4.165
  		return this.ats('position: absolute; left: ' + (this.swipeOffset)+ '%; top: 0', '=', 'position: absolute; left: 0px; top: 0')
  	}
  },
  methods: {
  	ats (xs, sm, mdAndUp) { // According to Size
      if (this.$vuetify.breakpoint.xs) {
        return xs
      }
      else if (this.$vuetify.breakpoint.sm) {
        return sm === '=' ? xs : sm
      }
      if (this.$vuetify.breakpoint.mdAndUp) {
        return mdAndUp
      }
	},

    swipeFn (direction) {
    	if (this.swipe >= 1 && this.swipe <= 3) {
    		this.swipe = direction === 'Left' ? (this.swipe < 3 ? (this.swipe + 1) : 1) : (this.swipe > 1 ? (this.swipe - 1) : this.swipe)
    	} else {
    		console.log('nothing')
    	}
	},

	computedDiv (image, type) {
    	return {
			'height': this.ats('280px', '=', 'auto'),
			'max-height': this.ats('280px', '=', '456px'),
			'min-width': this.ats('300px', '=', '300px'),
			'max-width': this.ats('300px', '=', '397px')
    	}
	},

    computedImage (image, type) {
    	return {
    		'background-image': 'url(' + image + ')',
			'background-repeat': 'no-repeat scroll',
			'background-size': 'contain',
			'background-position': this.ats( type === 1 ? 'center right' : type === 2 ? 'center top' : 'center left', '=', type === 1 ? 'center right' : type === 2 ? 'center top' : 'center left'),
			'height': this.ats('330px', '=', '350px'),
			'max-width': this.ats('320px', '=', '100%')
    	}

	},
    onScroll (e) {
      let offsetTop = window.pageYOffset || document.documentElement.scrollTop
      let headerOffset = 56
      if(offsetTop > headerOffset) {
        this.$emit('sticky', true)
      } else {
        this.$emit('sticky', false)
      }
    },

    googleSearch () {
    	window.open('https://www.google.com/search?q=' + this.gsearch, '_blank')
    },

	detectmob() { 
		if( navigator.userAgent.match(/Android/i)
		//|| navigator.userAgent.match(/webOS/i)
		|| navigator.userAgent.match(/iPhone/i)
		|| navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
		|| navigator.userAgent.match(/BlackBerry/i)
		|| navigator.userAgent.match(/Windows Phone/i)
		){
			console.log(navigator.userAgent)
			this.isMobile = true;
		}else {
			this.isMobile = false;
		}
	},
	
	detectTouch () {

		console.warn('touch detected');
		this.autoplaytimeout = 7500;
		
	},
	detectUnTouch() {
		console.warn('untouch detected')
		this.loop = true;
		this.autoplay = true;
		this.autoplaytimeout = 3000;
	}
  },
  created: function () {
  	this.$nextTick( () => {
		/*console.log(this.$refs.thirdElement)
  		this.thirdElementPos = window.getComputedStyle(this.$refs.thirdElement)
  		console.log(this.thirdElementPos)*/
  	})
  },
  beforeMount () {
	  this.detectmob();
  }
}
</script>

<style scoped>

.VueCarousel-navigation-button .VueCarousel-navigation-next {
	color: #1ebea7 !important;

}

.VueCarousel-navigation-button .VueCarousel-navigation-prev {
	color: #1ebea7 !important;

}

.underline-hover:hover {
	text-decoration: underline;
}

.swipable {
  transition: all 1s;
}

.zoomable {
  transition: all .5s;
}

.zoomed {
  transform: scale(1.075);
  transition: all .5s;
}

.gallery {
	transform: translate3d(0, 0, 0);
	animation: infiniteGallery 60s linear infinite;
}

@keyframes infiniteGallery {
	100% {
		-webkit-transform: translateX(-66.666%);
		transform: translateX(-66.6666%);
	}
}

.swipable-gallery {
	transform: translate3d(0, 0, 0);
	animation: infiniteGallerySwipable 21s linear infinite;
}

@keyframes infiniteGallerySwipable {
	100% {
		-webkit-transform: translateX(-66.6667%);
		transform: translateX(-66.6667%);
	}
}

.swipe-right {
	transform: translate3d(0, 0, 0);
	animation: swipe_right 1s linear;
}

.howItWorks {
	transition: 0.2s ease-in-out
}

.img-mobile-group {
	background: linear-gradient(to bottom, white 50%, #ebf0f4 50%);
}

.howItWorks:hover {
	cursor: pointer;
	transform: scale(1.03);
}

@keyframes swipe_right {
	100% {
		-webkit-transform: translateX(10%);
		transform: translateX(10%);
	}	
}
</style>
