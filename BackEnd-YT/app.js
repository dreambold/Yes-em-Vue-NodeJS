const express = require('express')
const server = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const config = require('./config/db')
const userRoutes = require('./routes/user')
const companyRoutes = require('./routes/company')
const solutionRoutes = require('./routes/solution')
const adminRoutes = require('./routes/admin')
const compression = require('compression')

require('dotenv').config()

mongoose.Promise = global.Promise
mongoose.connect(config.DB).then(
	() => {
		console.log('Connection established')
	},
	err => {
		console.log('Connection failed to establish : ' + err)
	}
)

server.use(compression())
server.use(express.static(path.join(__dirname, 'public')))

server.use(bodyParser.json({limit: '50mb'}))
server.use(bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',	
	extended: true
}))
server.use('/api/user', userRoutes)
server.use('/api/company', companyRoutes)
server.use('/api/solution', solutionRoutes)
server.use('/api/admin', adminRoutes)

server.route('/robots.txt').get(function (req, res) {
	res.type('text/plain');
	res.send("User-agent: *\nDisallow: /static/img/");
})

server.route('/sitemap.xml').get(function (req, res) {
	return res.sendFile(path.join(__dirname, 'public/sitemap.xml'))
})

server.route('/*').get(function (req, res) {
	return res.sendFile(path.join(__dirname, 'public/index.html'))
	//return res.sendFile('E:/Servidor/sv1/index.html')
})

var port = process.env.PORT || 8081

var app = server.listen(port, function () {
	console.log('Listening on port ' + port)
})