const express = require('express')
const app = express()
const companyRoutes = express.Router()
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Company = require('../models/company')
const Solution = require('../models/solution')
const Benefit = require('../models/benefit')
const Survey = require('../models/survey')
const atob = require('atob')
const moment = require('moment')
const nodemailer = require('nodemailer')
const multer = require('multer')

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

const multerConfig = {
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/static/images/uploads/')
        },

        filename: function (req, file, cb) {
            const ext = file.mimetype.split('/')[1]
            cb(null, req.body.id + '-' + file.fieldname + '.' + ext)
        },

        fileFilter: function(req, file, next){
            if(!file){
                next();
            } else {
                if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif' || file.mimetype === 'image/jpg') {
                    cb(null, true)
                }else{
                    cb(new Error('Images should be either JPEG GIF JPG or PNG!'))
                }

                // if ((file.size / 1024) < 1024) {
                //     cb(null, true)
                // }else{
                //     console.log('multer error: error uploading image')
                //     cb(new Error('Images should be less than 1Mb!'))
                // }
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

const composeEmailToCompany = function (company, companyEmail, user, email, phone, message) {
    const mailOptions = {
      from: 'pruebaparapartnergood@gmail.com',
      to: companyEmail,
      subject: 'Yes Them: ' + user + ' contacted you',
      html: 'Hello '+company+',<br><br>This email is being sent to you because a user from Yes Them contacted you. <br><br>Name: ' + user + '.<br><br>E-mail ' + email+ '.<br><br>Phone: ' + phone + '.<br><br>Message: ' + message+ '.<br><br>Yes Them.'
    }
    return mailOptions
}

const composeEmailToPartnerGoodEmail = function (user, email, message, option) {
    const mailOptions = {
      from: 'pruebaparapartnergood@gmail.com',
      to: 'lacalle.alvaro@gmail.com',
      subject: 'Partner Good: ' + user + ' contacted you',
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
                  <p align="justify" style="line-height: 25px;">Hola, mi nombre es <span style="font-weight: bold;">${user}</span> y te redacté el siguiente mensaje sobre: ${option}</p>
                  
                  <div style="padding: 10px 15px 10px 15px; border-radius: 10px; border: 1px solid rgb(221, 221, 221);">
                      <p align="justify"><span style="font-weight: bold">${message}
                  </div>

                  <p>Por favor, contáctame a:</p>

                  <ul style="list-style: none; text-align: left;">
                      <li><span style="font-weight: bold">E-mail:</span> ${email}</li>
                  </ul>
      
                  <p>Gracias!</p>
              </div>
          </div>
      </div>
      `
    //   html: 'Name: '+user + '.<br>E-mail: '+ email + '.<br>Message: ' + message + '<br>'
    }
    return mailOptions
}

const composeEmailToPartnerGoodCall = function (user, phone, hour) {
    const mailOptions = {
      from: 'pruebaparapartnergood@gmail.com',
      to: 'pruebaparapartnergood@gmail.com',
      subject: 'Partner Good: ' + user + ' contacted you',
      html: 'Name: '+user + '.<br>Phone: '+ phone + '.<br>Hour: ' + hour + '.<br>'
    }
    return mailOptions
}

const getPayload = (token) => {
  const payload = token.split('.')[1]
  return JSON.parse(atob(payload))
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
                        res.status(401).json({status: 401, info: "Unauthorized Access: "+err})
                    }
                })
            }else{
                res.status(401).json({status: 401, info: "Unauthorized Access: "+err})
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
    res.set('Cache-Control', 'public, max-age=0, must-revalidate')
    next()
}

app.use(headers_middleware)

companyRoutes.route('/:identifier').get(headers_middleware, async(req, res) => {
    // console.log( getPayload(req.get('Authorization').substring(7)).identifier, req.params.identifier )
    //if ( getPayload(req.get('Authorization').substring(7)).identifier === req.params.identifier ) {
        try {
            let company = await Company.findOne({ identifier: req.params.identifier, active: true }).deepPopulate('solutions solutions.benefits solutions.surveys', {
                populate: {
                    'solutions': {
                        match: {
                            active: true
                        }
                    }
                }
            }).exec()
            /* let company = await Company.findOne({ identifier: req.params.identifier })
                            .populate({
                                path: 'solutions',
                                populate: [
                                    {
                                        path: 'benefits',
                                        model: 'Benefit'
                                    }
                                ]
                            }).exec() */
            res.status(200).json({ company: company })
        } catch (error) {
            res.status(400).json({ message: 'There was an error fetching that information - '+error })
        }
    /* } else {
        res.status(400).json({ message: 'Unauthorized access.' })
    } */

})

companyRoutes.route('/contact/company').post((req, res) => {
    try {
        const userSchema = Joi.object().keys({
            name: Joi.string().min(3).max(30).required(),
            phone: Joi.string().alphanum().min(3).max(20).required(),
            message: Joi.string().min(10).max(100).required(),
            email: Joi.string().email().required()
        })

        Joi.validate({ name : req.body.user, phone: req.body.phone, email: req.body.email, message: req.body.message }, userSchema, {abortEarly: false, language: {
        any: {
            required: '!! {{label}} is required.'
        },
        string: {
            min: '!! {{label}} must be at least {{limit}} characters long.',
            regex: {
                base: "!! {{label}} must contain letters and numbers and can't contain special characters."
            }
        },
        number: {
            alphanum: '!! El teléfono solo debe contener numeros.'
        }
    }}, async function(joiErr, value ){
            if(joiErr == null) {
                let company = await Company.findOne({ _id: req.body.company }).select('name representative').populate({ path: 'representative', select: 'email' }).exec()
                // console.log(company)
                if (company) {
                    transporter.sendMail(composeEmailToCompany(company.name, company.representative.email, req.body.user, req.body.email, req.body.phone, req.body.message), function(error, info){
                      if (error) {
                        console.log(error)
                        res.status(400).json({status: 400, message: "Unable to send your message to this Company. Please try again later."})
                      } else {
                        res.status(200).json({status: 200})
                      }
                    })
                } else {
                    res.status(400).json({status: 400, message: "Unable to send your message to this Company. Please try again later."})
                }
            }else {
                let errors = []
                for (var err in joiErr.details){
                    //errors += joiErr.details[err].message + '.<br>'
                    errors.push(joiErr.details[err].message)
                }
                console.log(errors.toString())
                res.status(400).send({message: errors.toString()})
            }
        })
    } catch (error) {
        res.status(400).json({status: 400, message: "Unable to send your message to this Company. Please try again later."})
    }
})

companyRoutes.route('/contact/company/new').post((req, res) => {
    const { body } = req;
})

companyRoutes.route('/contact/email').post((req, res) => {
    console.log(req.body)
    try {
        const userSchema = Joi.object().keys({
            name: Joi.string().min(3).max(30).required(),
            message: Joi.string().min(10).max(300).required(),
            email: Joi.string().email().required()
        })

        Joi.validate({ name : req.body.user, email: req.body.email, message: req.body.message }, userSchema, {abortEarly: false, language: {
        any: {
            required: '!! {{label}} is required.'
        },
        string: {
            min: '!! {{label}} must be at least {{limit}} characters long.',
            regex: {
                base: "!! {{label}} must contain letters and numbers and can't contain special characters."
            }
        }
    }}, async function(joiErr, value ){
            if(joiErr == null) {
                transporter.sendMail(composeEmailToPartnerGoodEmail(req.body.user, req.body.email, req.body.message, req.body.option), function(error, info){
                  if (error) {
                    res.status(400).json({status: 400, message: "Unable to send your message to this Company. Please try again later."})
                  } else {
                    res.status(200).json({status: 200})
                  }
                })
            }else {
                let errors = []
                for (var err in joiErr.details){
                    errors.push(joiErr.details[err].message)
                }
                res.status(400).send({message: errors.toString()})
            }
        })
    } catch (error) {
        res.status(400).json({status: 400, message: "Unable to send your message to this Company. Please try again later."})
    }
})

companyRoutes.route('/contact/phone').post((req, res) => {
    try {
        const userSchema = Joi.object().keys({
            name: Joi.string().min(3).max(30).required(),
            phone: Joi.string().alphanum().min(3).max(20).required(),
            hour: Joi.string().required()
        })

        Joi.validate({ name : req.body.user, phone: req.body.phone, hour: req.body.hour }, userSchema, {abortEarly: false, language: {
        any: {
            required: '!! {{label}} is required.'
        },
        string: {
            min: '!! {{label}} must be at least {{limit}} characters long.',
            regex: {
                base: "!! {{label}} must contain letters and numbers and can't contain special characters."
            }
        }
    }}, async function(joiErr, value ){
            if(joiErr == null) {
                transporter.sendMail(composeEmailToPartnerGoodCall(req.body.user, req.body.phone, req.body.hour), function(error, info){
                  if (error) {
                    res.status(400).json({status: 400, message: "Unable to send your message to this Company. Please try again later."})
                  } else {
                    res.status(200).json({status: 200})
                  }
                })
            }else {
                let errors = []
                for (var err in joiErr.details){
                    errors.push(joiErr.details[err].message)
                }
                res.status(400).send({message: errors.toString()})
            }
        })
    } catch (error) {
        res.status(400).json({status: 400, message: "Unable to send your message to this Company. Please try again later."})
    }
})

app.use(auth_middleware)

companyRoutes.route('/edit/about').post(multer(multerConfig).fields([{ name: 'logo', maxCount: 1 }, { name: 'coverImage', maxCount: 1 }, {name: 'recomendationsImage', maxCount: 1}, {name: 'resultsImage', maxCount: 1}]), (req, res) => {

    const aboutSchema = Joi.object().keys({
        name: Joi.string().min(3).max(100).required(), // removed .regex(/^[^0-9]+$/)
        industry: Joi.string().required(),
        country: Joi.string().required(),
        city: Joi.string().required(),
        about: Joi.string().allow('').max(250).required(), // .regex(/^[^0-9]+$/)
        facebook: Joi.string().allow('').max(60),
        linkedin: Joi.string().allow('').max(60),
        twitter: Joi.string().allow('').max(60),
        instagram: Joi.string().allow('').max(60),
        identifier: Joi.string().min(3).max(30).required() // removed .regex(/^[^0-9]+$/)
    })

    const result = Joi.validate({
        name: req.body.commercialName,
        country: req.body.country,
        city: req.body.city,
        industry: req.body.specialization,
        about: req.body.aboutYou,
        facebook: req.body.facebook,
        linkedin: req.body.linkedin,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
        identifier: req.body.identifier

    }, aboutSchema, { abortEarly: false, language: {
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
                let user = await User.findOne({ company: req.body.id }).exec()
                    user.companyIdentifier = req.body.identifier
                await user.save()

                let company = await Company.findOne({ _id: req.body.id }).exec()
                    company.name = req.body.commercialName
                    company.industry = req.body.specialization
                    company.country = req.body.country
                    company.city = req.body.city
                    company.logo = req.files['logo'] ? req.body.id + '-' + req.files['logo'][0].fieldname + '.' + req.files['logo'][0].mimetype.split('/')[1] : company.logo
                    company.coverImage = req.files['coverImage'] ? req.body.id + '-' + req.files['coverImage'][0].fieldname + '.' + req.files['coverImage'][0].mimetype.split('/')[1] : company.coverImage
                    company.recomendationsImage = req.files['recomendationsImage'] ? req.body.id + '-' + req.files['recomendationsImage'][0].fieldname + '.' + req.files['recomendationsImage'][0].mimetype.split('/')[1] : company.recomendationsImage
                    company.resultsImage = req.files['resultsImage'] ? req.body.id + '-' + req.files['resultsImage'][0].fieldname + '.' + req.files['resultsImage'][0].mimetype.split('/')[1] : company.resultsImage
                    // console.log(company.logo, company.coverImage)
                    company.howToSay = req.body.howToSay
                    company.customHowToSay = req.body.customHowToSay
                    company.description = req.body.aboutYou
                    company.facebook = req.body.facebook
                    company.twitter = req.body.twitter
                    company.linkedin = req.body.linkedin
                    company.instagram = req.body.instagram
                    company.identifier = req.body.identifier
                await company.save()
                res.status(200).json({ success: true })
            } catch (error) {
                res.status(400).json({ message: 'There was an error updating that information - '+error })
            }
        }else {
            let errors = []
            for (var err in joiErr.details){
                errors.push(joiErr.details[err].message)
            }
            res.status(400).json({message: errors.toString()})
        }
    })
})

companyRoutes.route('/thanks').post((req, res) => {

    const aboutSchema = Joi.object().keys({
        thanks: Joi.string().allow('').max(100)
    })

    const result = Joi.validate({
        thanks: req.body.thanks

    }, aboutSchema, { abortEarly: false, language: {
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
                let company = await Company.findOne({ _id: req.body.company }).exec()
                    company.thanks = req.body.thanks
                await company.save()
                res.status(200).json({ success: true })
            } catch (error) {
                res.status(400).json({ message: 'There was an error updating that information - '+error })
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

companyRoutes.route('/publish').post(async(req, res) => {
    try {
        let company = await Company.findOne({ _id: req.body.company }).exec()
            company.published = !company.published
        await company.save()
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(400).json({ message: 'There was an error updating that information - '+error })
    }
})

// companyRoutes.route('/edit/:item').post(multer(multerConfig).fields([{ name: 'logo', maxCount: 1 }, { name: 'cover', maxCount: 1 }]), (req, res) => {

//     if (req.body.edit === 'about') {

//         const companySchema = Joi.object().keys({
//             companyDescription: Joi.string().min(10).max(256).required()
//         })

//         const aboutSchema = Joi.object().keys({
//             name: Joi.string().regex(/^[^0-9]+$/).min(3).max(60).required(),
//             email: Joi.string().email().required(),
//             password: Joi.string().regex(/^[a-zA-Z0-9\+\-\!\¡\%]+$/).required(),
//             companyName: Joi.string().min(3).max(30).required(),
//             specialization: Joi.string().required(),
//         })

//         const result = Joi.validate({
//             companyDescription: req.body.item

//         }, companySchema, { abortEarly: false, language: {
//             any: {
//                 required: '!! {{label}} is required.'
//             },
//             string: {
//                 min: '!! {{label}} must be at least {{limit}} characters long.',
//                 regex: {
//                     base: "!! {{label}} must contain letters and numbers and can't contain special characters."
//                 }
//             }
//         }}, async (joiErr, value ) => {
//             if(joiErr == null) {
//                 try {
//                     let company = await Company.findOne({ _id: req.body.company }).exec()
//                     company.description = req.body.item
//                     await company.save()
//                     res.status(200).json({ success: true })
//                 } catch (error) {
//                     res.status(400).json({ message: 'There was an error updating that information - '+error })
//                 }
//             }else {
//                 let errors = []
//                 for (var err in joiErr.details){
//                     errors.push(joiErr.details[err].message)
//                 }
//                 res.status(400).json(""+errors+"")
//             }
//         })
//     } else if (req.body.edit === 'name'){
//         const companySchema = Joi.object().keys({
//             companyName: Joi.string().min(3).max(30).required()
//         })

//         const result = Joi.validate({
//             companyName: req.body.item

//         }, companySchema, { abortEarly: false, language: {
//             any: {
//                 required: '!! {{label}} is required.'
//             },
//             string: {
//                 min: '!! {{label}} must be at least {{limit}} characters long.',
//                 regex: {
//                     base: "!! {{label}} must contain letters and numbers and can't contain special characters."
//                 }
//             }
//         }}, async (joiErr, value ) => {
//             if(joiErr == null) {
//                 try {
//                     let company = await Company.findOne({ _id: req.body.company }).exec()
//                     company.name = req.body.item
//                     await company.save()
//                     res.status(200).json({ success: true })
//                 } catch (error) {
//                     res.status(400).json({ message: 'There was an error updating that information - '+error })
//                 }
//             }else {
//                 let errors = []
//                 for (var err in joiErr.details){
//                     errors.push(joiErr.details[err].message)
//                 }
//                 res.status(400).json(""+errors+"")
//             }
//         })
//     } else {
//         const companySchema = Joi.object().keys({
//             companyLocation: Joi.string().min(3).max(30).required()
//         })

//         const result = Joi.validate({
//             companyLocation: req.body.item

//         }, companySchema, { abortEarly: false, language: {
//             any: {
//                 required: '!! {{label}} is required.'
//             },
//             string: {
//                 min: '!! {{label}} must be at least {{limit}} characters long.',
//                 regex: {
//                     base: "!! {{label}} must contain letters and numbers and can't contain special characters."
//                 }
//             }
//         }}, async (joiErr, value ) => {
//             if(joiErr == null) {
//                 try {
//                     let company = await Company.findOne({ _id: req.body.company }).exec()
//                     company.location = req.body.item
//                     await company.save()
//                     res.status(200).json({ success: true })
//                 } catch (error) {
//                     res.status(400).json({ message: 'There was an error updating that information - '+error })
//                 }
//             }else {
//                 let errors = []
//                 for (var err in joiErr.details){
//                     errors.push(joiErr.details[err].message)
//                 }
//                 res.status(400).json(""+errors+"")
//             }
//         })
//     }
// })

module.exports = companyRoutes;
