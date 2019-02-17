const express = require('express')
const app = express()
const userRoutes = express.Router()
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Company = require('../models/company')
const atob = require('atob')
const moment = require('moment')
const multer = require('multer')
const nodemailer = require('nodemailer')
const axios = require('axios')

const sanitizeString = (str) => {
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"").toLowerCase()
    str = str.split('.').join("")
    str = str.split(',').join("")
    str = str.split(';').join("")
    str = str.split(':').join("")
    str = str.split('?').join("")
    str = str.split('!').join("")
    str = str.split('|').join("")
    str = str.split('¡').join("")
    str = str.split('¿').join("")
    str = str.split(" ").join("")
    return str.trim()
}

const getPayload = (token) => {
  const payload = token.split('.')[1]
  return JSON.parse(atob(payload))
}

const multerConfig = {
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/static/images/uploads/')
        },

        filename: function (req, file, cb) {
            const ext = file.mimetype.split('/')[1]
            cb(null, sanitizeString(req.body.companyName)+'-logo.'+ext)
        },

        fileFilter: function(req, file, next){
            if(!file){
                next();
            } else {
                if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/gif') {
                    cb(null, true)
                }else{
                    cb(new Error('Images should be either JPEG, JPG, GIF or PNG!'))
                }

                if ((file.size / 1024) < 1024) {
                    cb(null, true)
                }else{
                    console.log('multer error: error uploading image')
                    cb(new Error('Images should be less than 1Mb!'))
                }
            }
            return next();
        }
    })
}

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
})

const composeEmail = function (email, name) {
    const link = 'https://www.yesthem.com/password-change/token='+jwt.sign({ email: email, name: name }, process.env.JWT_SECRET)

    const mailOptions = {
      from: 'pruebaparapartnergood@gmail.com',
      to: email,
      subject: 'Reinicio de la contraseña de tu cuenta Yesthem',
      html: 'Hola '+name+',<br><br>Este correo se te envía porque solicitaste un cambio de la contraseña de tu cuente Yesthem. <br><br>Para cambiar tu contraseña sigue el link de la parte inferior. Si no hiciste esta solicitud, ignora este e-mail.<br><br>'+link+'<br><br>Yesthem Admin.'
    }

    return mailOptions
}

const askForAccessEmail = function (name, email, phone) {
    const mailOptions = {
      from: 'pruebaparapartnergood@gmail.com',
      to: 'lacalle.alvaro@gmail.com',
      subject: name + ' solicito acceso a Yes Them',
      html: 'Datos: <br><br> Nombre: ' + name + '.<br> E-mail: ' + email + '.<br> Teléfono: ' + phone + '.<br>'
    }

    return mailOptions
}

const sendWelcomeMessage = function (email) {
    const mailOptions = {
        from: 'pruebaparapartnergood@gmail.com',
        to: email,
        subject: 'Bienvenido a Yes Them !',
        html: `
        <div align="center" style="text-align: center;  border: 1px solid #cecece; background-color:#fcfcfc; width: 550px; height: auto;">
            <div align="center" style="background-color: #00bfa6; padding-top: 15px; padding-bottom: 15px;">
                <div style="background-color: white; margin-bottom: 10px; border-radius: 50%; width: 35px; padding: 10px 10px 10px 10px; border: 1px solid #cecece">
                    <img src="https://www.yesthem.com/static/images/mylogo.png" alt="logo yes them" style="width: 30px; height: 30px;">
                </div>
                <span style="font-weight: bold; color: white; font-size: 20px; font-family: Arial;">YES THEM</span>
            </div>
            
            <br>
            
            <hr style="border: 0.5px solid #cecece; margin-left: 20px; margin-right: 20px;"/>
        
            <div style="padding: 0px 15px 15px 15px">
                <h2 style="font-weight: bold; font-family: Arial; text-align: left">Bienvenido a YesThem!</h2>
    
                <div style="text-align: left; font-family: Arial">
                  <p align="center">
                      Hola, Yes Them y su equipo te da la bienvenida a nuestra plataforma!
                  </p>
        
                    <p>Gracias!</p>
  
                </div>
            </div>
        </div>
    `
      }
  
      return mailOptions
}

const askForContactToCompany = function (data) {
    // console.log(data)
    let mailOptions = {};
    if (data.user.message=="") {
        // console.log('no with message')
        mailOptions = {
            from: 'pruebaparapartnergood@gmail.com',
            to: data.email,
            subject: data.user.firstName + ' solicito contacto con su empresa',
            html: `
                <div align="center" style="text-align: center;  border: 1px solid #cecece; background-color:#fcfcfc; width: 550px; height: auto;">
                    <div align="center" style="background-color: #00bfa6; padding-top: 15px; padding-bottom: 15px;">
                        <div style="background-color: white; margin-bottom: 10px; border-radius: 50%; width: 35px; padding: 10px 10px 10px 10px; border: 1px solid #cecece">
                            <img src="https://www.yesthem.com/static/images/mylogo.png" alt="logo yes them" style="width: 30px; height: 30px;">
                        </div>
                        <span style="font-weight: bold; color: white; font-size: 20px; font-family: Arial;">YES THEM</span>
                    </div>
                    
                    <br>
                    
                    <hr style="border: 0.5px solid #cecece; margin-left: 20px; margin-right: 20px;"/>
                
                    <div style="padding: 0px 15px 15px 15px">
                        <h2 style="font-weight: bold; font-family: Arial; text-align: left">Nuevo Mensaje!</h2>
            
                        <div style="text-align: left; font-family: Arial">
                            <p align="justify" style="line-height: 25px;">Hola, mi nombre es <span style="font-weight: bold;">${data.user.firstName} ${data.user.lastName}</span> de la empresa <span style="font-weight: bold; text-transform: uppercase;">${data.user.company}</span> y estoy interesado en el siguiente servicio:
                            <i><u>${data.service}</u></i> con los siguientes resultados: </p>
                            
                            <ul>
                                ${data.resultsData.map(result => {
                                    return `<li>${result} </li>`;
                                }).join('')}
                            </ul>
                
                            <p>Por favor, contáctame a:</p>
                            <ul style="list-style: none; text-align: left;">
                                <li><span style="font-weight: bold">E-mail:</span> ${data.user.email}</li>
                                <li><span style="font-weight: bold">Teléfono:</span> ${data.user.phone}</li>
                            </ul>
                
                            <p>Gracias!</p>

                        </div>
                    </div>
                </div>
            `
          }
    } else {
        // console.log('with message')
        // console.log(data)
        mailOptions = {
            from: 'pruebaparapartnergood@gmail.com',
            to: data.email,
            subject: data.user.firstName + ' solicito contacto con su empresa',
            html: `
            <div align="center" style="text-align: center;  border: 1px solid #cecece; background-color:#fcfcfc; width: 500px; height: auto;">
                <div align="center" style="background-color: #00bfa6; padding-top: 15px; padding-bottom: 15px;">
                    <div style="background-color: white; margin-bottom: 10px; border-radius: 50%; width: 35px; padding: 10px 10px 10px 10px; border: 1px solid #cecece">
                        <img src="https://www.yesthem.com/static/images/mylogo.png" alt="logo yes them" style="width: 30px; height: 30px;">
                    </div>
                    <span style="font-weight: bold; color: white; font-size: 20px; font-family: Arial;">YES THEM</span>
                </div>
                
                <br>
                
                <hr style="border: 0.5px solid #cecece; margin-left: 20px; margin-right: 20px;"/>
            
                <div style="padding: 0px 15px 15px 15px">
                    <h2 style="font-weight: bold; font-family: Arial; text-align: left">Nuevo Mensaje!</h2>
            
                    <div style="text-align: left; font-family: Arial">
                        <p align="justify" style="line-height: 25px;">Hola, mi nombre es <span style="font-weight: bold;">${data.user.firstName} ${data.user.lastName}</span> de la empresa <span style="font-weight: bold; text-transform: uppercase;">${data.user.company}</span> y te redacté el siguiente mensaje:</p>
                        
                        <div style="padding: 10px 15px 10px 15px; border-radius: 10px; border: 1px solid rgb(221, 221, 221);">
                            <p align="justify"><span style="font-weight: bold">${data.user.serviceFromContactForm}</span> - ${data.user.message}</p>
                        </div>

                        <p>Por favor, contáctame a:</p>

                        <ul style="list-style: none; text-align: left;">
                            <li><span style="font-weight: bold">E-mail:</span> ${data.user.email}</li>
                            <li><span style="font-weight: bold">Teléfono:</span> ${data.user.phone}</li>
                        </ul>
            
                        <p>Gracias!</p>
                    </div>
                </div>
            </div>
            `
          }
    }
    return mailOptions
}

const auth_middleware = function(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.params.token || req.get('Authorization').substring(7)

    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if(!err){
                User.findOne().where({ _id : getPayload(token)._id }).exec( (error, result) => {
                    if(!error){
                        next()
                    }else{
                        res.status(401).json({status: 401, info: "Acceso no autorizado: "+err})
                    }
                })
            }else{
                res.status(401).json({status: 401, info: "Acceso no autorizado: "+err})
            }
        })
    }else{
        res.status(403).json({ 
            success: false, 
            message: 'No token provided.'
        })
    }
}

const headers_middleware = function(req, res, next) {
    res.set('Cache-Control', 'public, max-age=0, must-revalidate, no-store')
    next()
}

userRoutes.route('/register').post((req, res) => {
    const userSchema = Joi.object().keys({
        name: Joi.string().regex(/^[^0-9]+$/).min(3).max(60).required(),
        email: Joi.string().email().required(),
        country: Joi.string(),
        city: Joi.string(),
        password: Joi.string().regex(/^[a-zA-Z0-9\+\-\!\¡\%]+$/).required(),
        companyName: Joi.string().min(3).max(30).required(),
        industry: Joi.string().required(),
        description: Joi.string().min(3).max(100).required()
    })

    const result = Joi.validate({
        name : req.body.name, 
        email: req.body.email, 
        password: req.body.password,
        companyName: req.body.commercialName,
        industry: req.body.specialization,
        description: req.body.description,
        country: req.body.country,
        city: req.body.city

    }, userSchema, { abortEarly: false, language: {
        any: {
            required: '!! {{label}} is required.'
        },
        string: {
            min: '!! {{label}} must be at least {{limit}} characters long.',
            regex: {
                base: "!! {{label}} must contain letters and numbers and can't contain special characters."
            }
        }
    }}, async (joiErr, value ) => {
        if(joiErr == null) {

            try {

                let checkCompany = await Company.findOne({name: req.body.commercialName}).exec()

                if (!checkCompany) {
                    let user = new User ()
                        user.registered = moment().utc()
                        user.name  = req.body.name
                        user.email = req.body.email
                        user.setPassword(req.body.password)
                        user.active = true
                        user.role = 'admin'
                        user.companyIdentifier = sanitizeString(req.body.commercialName)
                    await user.save()

                    let company = new Company ()
                        company.representative = user._id
                        company.name = req.body.commercialName
                        company.description = req.body.description
                        company.industry = req.body.specialization
                        company.country = req.body.country
                        company.city = req.body.city
                        company.location = ''
                        company.logo = null
                        // company.coverImage = '8867392e-cc29-4ca2-97ff-485b8d9f52dc-coverImage.png'
                        // company.recomendationsImage = ''
                        // company.resultsImage = ''                        
                        company.howToSay = '1'
                        company.customHowToSay = ''
                        company.facebook = ''
                        company.linkedin = ''
                        company.twitter = ''
                        company.instagram = ''
                        company.thanks = ''
                        company.active = true
                        company.published = false
                        company.solutions = []
                        company.identifier = user.companyIdentifier
                    await company.save()

                    user.company = company._id
                    await user.save()

                    const token = user.generateJwt()
                    transporter.sendMail(sendWelcomeMessage(req.body.email), (error, info) => {
                      })
                    res.status(200).json({ token: token, message: 'Your account was successfully created.' })
                } else {
                    res.status(400).json({ message: 'Esa Compañia ya está registrada en nuestro sistema.'})
                }
            } catch (error) {
                res.status(400).json({ message: 'There was an error registering your information - '+error})
            }
        }else {
            let errors = []
            for (var err in joiErr.details){
                errors.push(joiErr.details[err].message)
            }
            res.status(400).json({ message: errors.toString() })
        }
    })
})

userRoutes.route('/verify').post( async(req, res) => {
    try {
        let user = await User.findOne({ _id: req.body.user }).exec()
            user.linkedin.firstName = req.body.linkedin.firstName
            user.linkedin.lastName = req.body.linkedin.lastName
            user.linkedin.headline = req.body.linkedin.headline
            user.linkedin.industry = req.body.linkedin.industry
            user.linkedin.pictureUrl = req.body.linkedin.pictureUrl
            user.linkedin.position = req.body.linkedin.positions.values[0].company.name
            user.verified = true
        await user.save()

        const token = user.generateJwt()

        res.status(200).json({ token: token, message: 'Your account was successfully verified.' })
    } catch (error) {
        res.status(400).json({ message: 'There was an error verifying your account - '+error})
    }
})


userRoutes.route('/linkedin/state').post( async(req, res) => {
    try {
        let state = jwt.sign({ identifier: req.body.data.identifier, service: req.body.data.service }, process.env.JWT_SECRET, { expiresIn: '1 day'})
        res.status(200).json({ state: state })
    } catch (error) {
        res.status(400).json({ message: 'Información inválida.'})
    }
})

userRoutes.route('/linkedin/oAuth').post( async(req, res) => {
    try {
        let accessToken = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', "grant_type=authorization_code&code=" + req.body.code + "&redirect_uri=https%3A%2F%2Fwww.yesthem.com%2Fauth%2Flinkedin%2Fsuccess&client_id=77a6bd5zeu6cl0&client_secret=TSObbmEhWu7UZ1lT" , { headers: { 'Content-Type':'application/x-www-form-urlencoded' } })
        let accessTokenFinal = jwt.sign({ accessToken: accessToken.data.access_token, exp: accessToken.data.expires_in }, process.env.JWT_SECRET)
        res.status(200).json({ accessToken: accessTokenFinal })
    } catch (error) {
        // console.log('error ouauth')
        // console.log(error)
        res.status(400).json({error: error, message: 'Acceso no autorizado'})
    }
})

userRoutes.route('/linkedin/token/verify').post( async(req, res) => {
    try {
        jwt.verify(req.body.state, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                // console.log('verify error')
                // console.log(error)
                res.status(403).json({status: 403, message: "Acceso no autorizado.", error: err})
            } else {
                res.status(200).json({ success: true, identifier: decoded.identifier, service: decoded.service })
            }
        })
    } catch (error) {
        res.status(400).json({ message: 'Acceso no autorizado.'})
    }
})

userRoutes.route('/linkedin/getUser').post( async(req, res) => {
    try {
        // let user = await axios.get('https://api.linkedin.com/v1/people/~:(id,first-name,last-name,headline,industry,positions,picture-url)?format=json', { headers: { 'Authorization' : 'Bearer ' + req.body.accessToken } })
        let user = await axios.get('https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))', { headers: { 'Authorization' : 'Bearer ' + req.body.accessToken } })
        // console.log(user)
        res.json({ user: user.data, status: 200, head: req.body.accessToken })
    } catch (error) {
        // console.log(error)
        // res.json({ message: 'Acceso no autorizado', error: error, head: req.body.accessToken})
    }
})

userRoutes.route('/askForAccess').post( async(req, res) => {
    try {
        if (req.body.askForAccess.name === 'YesThemdell') {
            res.status(200).json({ pending: false })
        } else {
            transporter.sendMail(askForAccessEmail(req.body.askForAccess.name, req.body.askForAccess.email, req.body.askForAccess.phone), (error, info) => {
              if (error) {
                res.status(400).json({message: "No se pudo enviar el e-mail para solicitar acceso. Por favor intentelo de nuevo más tarde."})
              } else {
                res.status(200).json({message: "Se envió un correo con tu solicitud al administrador de Yes Them. Gracias.", pending: true})
              }
            })
        }
    } catch (error) {
        res.status(400).json({ message: 'Hubo un error solicitando acceso. Por favor intentalo más tarde.'})
    }
})

userRoutes.route('/company-user/contact').post( async(req, res) => {
    const { body } = req;
    try {
            transporter.sendMail(askForContactToCompany(body), (error, info) => {
              if (error) {
                  console.log('ERROR', error)
                res.status(405).json({message: "No se pudo enviar el e-mail. Por favor intentelo de nuevo más tarde.", error: error})
              } else {
                res.status(200).json({message: "Se envió un correo con tu solicitud al administrador de Yes Them. Gracias.", pending: true})
              }
            })
    } catch (error) {
        res.status(400).json({ message: 'Hubo un error. Por favor intentalo más tarde.', error: error})
    }
})

userRoutes.route('/recovery/password').post( async(req, res) => {
    const { body } = req;
    try {
        let user = await User.findOne({_id: body.userId}).exec()
        if (user) {
            user.setPassword(body.newPassword)
            await user.save()
            res.status(200).json({message: "Contraseña cambiada con éxito."})
        } else {
            res.status(403).json({message: "Hubo un error reseteando tu contraseña. Por favor intentalo de nuevo más tarde."})
        }
    } catch (error) {
        res.status(400).json({message: "Hubo un error cambiando tu contraseña. Por favor intentalo de nuevo más tarde."})
    }
})

userRoutes.route('/updateEmail').post( async(req, res) => {
    const { body } = req;
    try {
        let user = await User.update({_id: body.userId}, {
            email: body.email
        })
        if (user) {
            //user.setPassword(req.body.items.password)
            //await user.save()
            res.status(200).json({message: "E-mail cambiado con éxito."})
        } else {
            res.status(403).json({message: "Hubo un error reseteando tu e-mail. Por favor intentalo de nuevo más tarde."})
        }
    } catch (error) {
        res.status(400).json({message: "Hubo un error cambiando tu e-mail. Por favor intentalo de nuevo más tarde."})
    }
})

userRoutes.route('/findByCompanyId').post( async(req, res) => {
    const { body } = req;
    try {
        let user = await User.findOne({companyIdentifier: body.name}).exec()
        if (user) {
            res.status(200).json({data: user})
        } else {
            res.status(403).json({message: "Hubo un error reseteando tu contraseña. Por favor intentalo de nuevo más tarde."})
        }
    } catch (error) {
        res.status(400).json({message: "Hubo un error cambiando tu contraseña. Por favor intentalo de nuevo más tarde."})
    }
    
})

userRoutes.route('/login').post( (req, res) => {
    const userSchema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9\+\-\!\¡\%]+$/).required()
    })

    Joi.validate({
        email: req.body.email, 
        password: req.body.password

    }, userSchema, { abortEarly: false, language: {
        any: {
            required: '!! {{label}} is required.'
        },
        string: {
            min: '!! {{label}} must be at least {{limit}} characters long.',
            regex: {
                base: "!! {{label}} must contain letters and numbers and can't contain special characters."
            }
        }
    }}, async (joiErr, value ) => {
        if(joiErr == null) {
            try {
                let user = await User.findOne({ email: req.body.email, active: true }).exec()

                if (!user) {
                    res.status(400).json({ message: 'There is no account registered with that e-mail.'})
                } else {
                    if(user.validPassword (req.body.password)) {
                        const token = user.generateJwt()
                        res.status(200).json({ message: 'Login successful.', token: token })
                    } else {
                        res.status(400).json({ message: 'Invalid password.'})
                    }
                }

            } catch (error) {
                res.status(400).json({ message: 'There was an error logging you in - '+error})
            }
        }else {
            let errors = []
            for (var err in joiErr.details){
                errors.push(joiErr.details[err].message)
            }
            res.status(400).json({ message: 'Incorrect credentials.'})
        }
    })
})

userRoutes.route('/password/reset').post((req, res) => {
    const emailSchema = Joi.object().keys({
        email: Joi.string().email().required()
    })

    Joi.validate({ email : req.body.email }, emailSchema, { abortEarly: false, language: {
        any: {
            required: '!! {{label}} es requerido.'
        },
        string: {
            min: '!! {{label}} must be at least {{limit}} characters long.',
            regex: {
                base: "!! {{label}} must contain letters and numbers and can't contain special characters."
            }
        }
    }},  async (joiErr, value ) => {
            if(joiErr === null) {
                try {
                    let user = await User.findOne({email : req.body.email}).exec()
                    if (user) {
                        transporter.sendMail(composeEmail(user.email, user.name), (error, info) => {
                          if (error) {
                            res.status(400).json({message: "No se pudo enviar el e-mail para cambiar la contraseña. Por favor intentelo de nuevo más tarde."})
                          } else {
                            res.status(200).json({message: "Se envió un e-mail a la dirección que proporcionaste. Por favor sigue las instrucciones allí para cambiar tu contraseña. Ahora puedes cerrar esta pestaña."})
                          }
                        })
                    } else {
                        res.status(400).json({message: "No hay cuenta registrada con ese e-mail."})
                    }
                } catch (error) {
                    res.status(400).json({message: "Hubo un error cambiando tu contraseña. Por favor intentalo de nuevo más tarde."})
                }
            }else {
                let errors = []
                for (var err in joiErr.details){
                    errors.push(joiErr.details[err].message)
                }
                res.status(400).send({message: errors.toString()})
            }
    })
})

userRoutes.route('/password/change').post((req, res) => {
    const passwordSchema = Joi.object().keys({
        password: Joi.string().regex(/^[a-zA-Z0-9\+\-\!\¡\%]+$/).required()
    })

    jwt.verify(req.body.items.token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            res.status(403).json({status: 403, message: "Acceso no autorizado."})
        }else{
            Joi.validate({ password : req.body.items.password }, passwordSchema,{ abortEarly: false, language: {
                any: {
                    required: '!! {{label}} es requerido.'
                },
                string: {
                    min: '!! {{label}} must be at least {{limit}} characters long.',
                    regex: {
                        base: "!! {{label}} debe contener letras y numeros y no puede contener caracteres especiales."
                    }
                }
            }}, async (joiErr, value ) => {
                if(joiErr == null) {
                    try {
                        let user = await User.findOne({name: decoded.name, email : decoded.email}).exec()
                        if (user) {
                            user.setPassword(req.body.items.password)
                            await user.save()
                            res.status(200).json({message: "Contraseña cambiada con éxito."})
                        } else {
                            res.status(403).json({message: "Hubo un error reseteando tu contraseña. Por favor intentalo de nuevo más tarde."})
                        }
                    } catch (error) {
                        res.status(400).json({message: "Hubo un error cambiando tu contraseña. Por favor intentalo de nuevo más tarde."})
                    }
                }else {
                    let errors = []
                    for (var err in joiErr.details){
                        errors.push(joiErr.details[err].message)
                    }
                    res.status(400).send({message: errors.toString()})
                }
            })
        }
    })
})

app.use(headers_middleware)

userRoutes.route('/reload').post( async(req, res) => {
    try {
        let user = await User.findOne({ _id: req.body._id }).exec()

        if (!user) {
            res.status(400).json({ message: 'Use doesn\'t exist.'})
        } else {
            const token = user.generateJwt()
            res.status(200).json({ message: 'Reload successful.', token: token })
        }
    } catch (error) {
        res.status(400).json({ message: 'There was an error when reloading the user - '+error})
    }
})

module.exports = userRoutes;