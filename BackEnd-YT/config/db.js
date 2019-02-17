require('dotenv').config()

module.exports = {
	 DB: 'mongodb://' + process.env.BASE_URI + ':27017/yesthem'
  	// DB: 'mongodb://Sergio:partnergood2018@ds055742.mlab.com:55742/partner-good'
  	//DB: 'mongodb://datosyesthem_admin:045e886f89c1@mongodb.guebs.net:27017/ch10024_datosyesthem'
}