<template>
	<v-layout column style="background-color: #F3F4F6" v-scroll="onScroll">
		<v-layout v-if="!isMobile" align-center justify-center row fill-height style="padding: 0px 34px 0px 34px">
			<v-flex xs6 style="background-color: #00bfa6 !important;">
				<div align="center" style="height: 556px !important; padding: 135px 0px 0px 0px; z-index: 9990">
					<div>
						<span style="font-size: 52px; font-weight: bold; color: white; font-family: 'Roboto'; line-height: 60px">
							Empresas con <br/>
							Experiencia Probada
						</span>
						<br/><br/>
						<span style="font-size: 18px; color: white; font-family: 'Roboto'">
							Descubre empresas respaldadas por clientes como tú
						</span>
						<br/><br/>
						<div>
						<v-layout row style="padding: 0px 65px 0px 65px">
							<v-flex grow>
								<v-text-field
									flat
									solo
									prepend-inner-icon="search"
									v-model="search"
									label="Busca una empresa..."
									maxlength="30"
									required
								></v-text-field>
							</v-flex>
							<v-flex shrink>
								<v-btn
									class="purple_button"
									depressed
									flat
									style="height: 48px; text-transform: none !important; font-weight: 400; color: white !important; margin-top: 0px; margin-left: -2px"
								>Buscar</v-btn>
							</v-flex>
						</v-layout>
						</div>
					</div>
				</div>
			</v-flex>
			<v-flex xs6>
				<div style="background-image: url(static/images/indice/person.jpg); background-repeat: no-repeat scroll; background-size: cover; background-position: center top; width: 100%; height: 556px !important"></div>
			</v-flex>
		</v-layout>	

		<v-flex v-if="isMobile" white style="margin-top: 60px">
			<v-layout row wrap>
				<v-flex xs12>
					<div style="background-image: url(static/images/indice/person.jpg); background-repeat: no-repeat scroll; background-size: cover; background-position: center top; width: 100%; height: 240px !important"></div>
				</v-flex>
				<!-- <v-flex xs0 md1 white :style="ats('', '', 'height: 750px')"></v-flex> -->
				<v-flex xs12 md5 :class="ats('pa-3', '=', 'py-5 pr-0')" text-xs-left transparent :style="'background-color: #00bfa6 !important'">
					<v-layout column fill-height justify-center align-center>
						<div align="center" style="height: 300px !important; z-index: 9990; padding: 0px 0px 0px 0px">
							<div>
								<span style="font-size: 28px; font-weight: bold; color: white; font-family: 'Roboto'; line-height: 40px">
									Empresas con <br/>
									Experiencia Probada
								</span>
								<br/><br/>
								<span style="font-size: 13px; font-weight: bold; color: white; font-family: 'Roboto'">
									Descubre empresas respaldadas por clientes como tú
								</span>
								<br/><br/>
								<div>
								<v-layout row style="">
									<v-flex grow>
										<v-text-field
											flat
											solo
											prepend-inner-icon="search"
											v-model="search"
											label="Busca una empresa..."
											maxlength="20"
											height="55"
											required
										></v-text-field>
									</v-flex>
									<v-flex shrink>
										<v-btn
											class="purple_button"
											depressed
											flat
											style="height: 55px; text-transform: none !important; color: white !important; margin-top: 0px; margin-left: -60px"
										>
										<v-icon style="font-size: 18px;">fas fa-search</v-icon>
										</v-btn>
									</v-flex>
								</v-layout>
								</div>
							</div>
						</div>
					</v-layout>
				</v-flex>
			</v-layout> 
		</v-flex>			
		<v-flex :style="ats('background-color: white; margin-top: -40px !important; z-index: 30','=','background-color: transparent; margin-top: -164px !important; z-index: 30')">
			<v-layout row wrap :style="ats('overflow: hidden; margin-top: -120px','=','overflow: hidden; margin-top: -40px')">
				<v-flex xs12 :class="ats('px-1 pb-1 pt-4 text-xs-center', '=', 'pa-5 text-xs-left')">
					<div :style="ats('min-height: 700px; min-width: 3780px; position: relative !important;', '=', 'min-height: 650px; min-width: 3300px; position: relative !important;')"> <!--715-->
						<v-layout row wrap fill-height :class="isMobile? 'mobileGallery' : 'gallery'" style="min-height: 735px; min-width: 3300px; position: absolute !important; top: 0px; left: 0px; padding-top: 48px !important">
							<v-flex xs12 :style="!isMobile ? 'min-height: 735px; max-width: 1100px; position: absolute; left: 0px; top: -35px;' : 'min-height: 735px; max-width: 1100px; position: absolute; left: 0px; top: 0px;'">
								<v-layout row fill-height>
									<v-flex xs4 v-for="index in 8" :class="index % 2 === 0 ? ats('py-3', '=', 'py-5') : 'py-3'" @mouseover="beingHovered = index" @mouseout="beingHovered = null" v-bind:key="index" :style="ats('', '=', index % 2 === 0 ? 'margin-top: -80px' : 'margin-top: -0px')"><!--@mouseover="beingHovered = index" @mouseout="beingHovered = null"-->
										<img :key="index" :class="beingHovered === index ? 'zoomable zoomed': 'zoomable'" :src="'static/images/indice/' + (index) + '.png'"/>
									</v-flex>
									<v-flex xs4 v-for="index in 16" :class="index % 2 === 0 ? ats('py-3', '=', 'py-5') : 'py-3'" @mouseover="beingHovered = (index + 8)" @mouseout="beingHovered = null" v-bind:key="index" :style="ats('', '=', index % 2 === 0 ? 'margin-top: -80px' : 'margin-top: -0px')"><!--@mouseover="beingHovered = index" @mouseout="beingHovered = null"-->
										<img :key="index" :class="beingHovered === index + 8 ? 'zoomable zoomed': 'zoomable'" :src="'static/images/indice/' + (index+8) + '.png'"/>
									</v-flex>
								</v-layout>
								<v-layout align-left justify-left row fill-height style="margin-top: -100px">
									<v-flex xs4 v-for="index in 8" :class="index % 2 === 0 ? ats('py-3', '=', 'py-5') : 'py-3'" @mouseover="beingHovered = (index + 24)" @mouseout="beingHovered = null" v-bind:key="index" :style="ats('', '=', index % 2 === 0 ? 'margin-top: -80px;' : 'margin-top: -0px;')"><!--@mouseover="beingHovered = index" @mouseout="beingHovered = null"-->
										<img :key="index + 24" :class="beingHovered === (index + 24) ? 'zoomable zoomed': 'zoomable'" :src="'static/images/indice/' + (index + 8) + '.png'"/>
									</v-flex>
									<v-flex xs4 v-for="index in 8" :class="index % 2 === 0 ? ats('py-3', '=', 'py-5') : 'py-3'" @mouseover="beingHovered = index + 8" @mouseout="beingHovered = null" v-bind:key="index" :style="ats('', '=', index % 2 === 0 ? 'margin-top: -80px;' : 'margin-top: -0px;')"><!--@mouseover="beingHovered = index" @mouseout="beingHovered = null"-->
										<img :key="index + 32" :class="beingHovered === (index + 32) ? 'zoomable zoomed': 'zoomable'" :src="'static/images/indice/' + (index) + '.png'"/>
									</v-flex>									
								</v-layout>	
							</v-flex>
						</v-layout>
					</div>
				</v-flex>
			</v-layout>
		</v-flex>
		<br v-if="!isMobile"/>
		<v-flex style="width: auto; margin: 0 auto;">
			<v-layout row wrap justify-center align-center :style="ats('margin-top: 20px','=','padding: 0px 45px 0px 45px')">
				<v-flex xs12 :class="ats('font-weight-bold font-size-16 mb-2 text-xs-center','=','font-weight-bold font-size-20 mb-2 text-xs-center')" style="color: #9192a7 !important">Piensa en ti</v-flex>
				<v-flex xs12 class="font-weight-bold text-xs-center mb-3" :style="ats('font-size: 18px; font-family: Roboto; color: #1d2d35', '=', 'font-size: 40px; font-weight: bold; font-family: Roboto; color: #1d2d35 !important')">Una empresa con perfil Yes Them te está diciendo mucho de ella</v-flex>
				<v-flex>
					<Slider :isMobile="isMobile"></Slider>
				</v-flex>
			</v-layout>
		</v-flex>
		<!-- <br/><br/> -->
		<v-flex :class="ats('mb-4 mt-0 pt-5 mb-5 pl-2', '=', 'py-5')" :style="ats('background-color: #00b3ce !important; height: 220px !important','=','background-color: #00b3ce !important; height: 270px !important')">
			<h1 v-if="isMobile" :style="ats('font-size: 30px; font-weight: bold; color: white !important; text-align: center; font-family: Roboto !important', '=', 'font-size: 50px; font-weight: bold; color: white !important; text-align: center; font-family: Roboto; line-height: 62px !important')">
				Descubre empresas <br> que ya han ayudado <br>
				a clientes como tu
			</h1>
			<br v-if="!isMobile">
			<h1 v-if="!isMobile" :style="ats('font-size: 30px; font-weight: bold; color: white !important; text-align: center; font-family: Roboto !important', '=', 'font-size: 50px; font-weight: bold; color: white !important; text-align: center; font-family: Roboto; line-height: 62px !important')">
				Descubre empresas que ya han ayudado <br>
				a clientes como tu
			</h1>
		</v-flex>

	</v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import Slider from '../components/Slider';
export default {
	components: {
		Slider
	},
  data () {
  	return {
		search: '',
		recommendedCompany: '',
  		beingHovered: null,
		page: 0,
		visibleIndustries: false,
		visibleContactForm: false,
		indiceLoaded: false,
		isMobile: false,
		sticky: false,
  		industries: require('@/misc/industries').default.industries,
  		style: {
	        'background-image' : 'url(/static/images/indice.png)',
	        'background-repeat': 'no-repeat scroll',
	        'background-position': '98% 50%',
	        'background-size' : this.ats('contain' ,'=', 'contain'),
	        'background-color': '#494FB1 !important',
	        'height' : '475px',
	        'width' : '100%'
	    },
		G5: {},
		contact: {
			valid: false,
			name: '',
			email: '',
			message: ''
		},
		status: {
			loading: false,
			error: false,
			message: ''
		},
		snackbar: {
			show: false,
			success: true,
			message: ''
		},
		requiredRules: [
			(v) => !!v || 'This field is required.'
		]
  	}
  },
  	methods: {
		ats (xs, sm, mdAndUp) { // According to Size
			if (this.$vuetify.breakpoint.xs) {
				return xs
			} else if (this.$vuetify.breakpoint.sm) {
				return sm === '=' ? xs : sm
			}
			if (this.$vuetify.breakpoint.mdAndUp) {
				return mdAndUp
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
		showIndustries () {
			if(this.visibleIndustries) {
				this.visibleIndustries = false
			} else {
				this.visibleIndustries = true;
			}
		},
		
		

		showContactForm () {
			if (this.visibleContactForm) {
				this.visibleContactForm = false;
			} else {
				this.visibleContactForm = true;
			}
		},

		detectmob() { 
			if( navigator.userAgent.match(/Android/i)
			|| navigator.userAgent.match(/webOS/i)
			|| navigator.userAgent.match(/iPhone/i)
			|| navigator.userAgent.match(/iPad/i)
			|| navigator.userAgent.match(/iPod/i)
			|| navigator.userAgent.match(/BlackBerry/i)
			|| navigator.userAgent.match(/Windows Phone/i)
			){
					this.isMobile = true;
				}
			else {
					this.isMobile = false;
				}
		},

		async sendRecomendation ()	 {
			if (this.recommendedCompany === '') {
				this.status.loading = false
				this.status.error = true
				this.status.message = 'All the fields are required.'
				this.snackbar.show = true
				this.snackbar.success = !this.status.error
				this.snackbar.message = this.status.message
			} else {
				const endpoint = '/api/company/recommend/'+this.recommendedCompany;
				const { data } = await axios.get(endpoint);
				if (data.pending) {
					this.status.error = false
					this.status.message = 'An e-mail with your recommendation was sent. Thank you.'
					this.snackbar.show = true
					this.snackbar.success = !this.status.error
					this.snackbar.message = this.status.message
				} else {
					this.status.loading = false
					this.status.error = true
					this.status.message = 'An error ocurred. Please try later.'
					this.snackbar.show = true
					this.snackbar.success = !this.status.error
					this.snackbar.message = this.status.message
				}
				console.log(data);
			}
			this.visibleContactForm = false;
		},
		
		sendEmail () {
		console.log('sendEmail' + this.email);
		
		},
	},
	created () {
		this.detectmob();
	},
	mounted() {
		setTimeout(() => this.indiceLoaded = true, 9000);
	}
}
</script>

<style>
.underline-hover:hover {
	text-decoration: underline;
}

.zoomable {
  transition: all .5s;
}

.zoomed {
  transform: scale(1.075);
  transition: all .5s;
}

.gallery {
	transform: translate3d(1050px, 0, 0);
	animation: infiniteGallery 120s linear infinite;
}

.mobileGallery {
	transform: translate3d(0, 0, 0);
	animation: infiniteGallery 120s linear infinite;
}

@keyframes infiniteGallery {
	100% {
		-webkit-transform: translateX(-2000px);
		transform: translateX(-2000px);
	}
}
</style>
