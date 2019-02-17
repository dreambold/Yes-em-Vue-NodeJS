const express = require('express')
const app = express()
const solutionRoutes = express.Router()
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Company = require('../models/company')
const Solution = require('../models/solution')
const Benefit = require('../models/benefit')
const Survey = require('../models/survey')
const Options = require('../models/survey')
const atob = require('atob')
const moment = require('moment')
const multer = require('multer')
const _ = require('lodash')

const sanitizeString = (str) => {
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "").toLowerCase()
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
            const ext = file ? file.mimetype.split('/')[1] : ''
            if (!req.body.solutionId && file) {
                cb(null, file.originalname.split('.')[0]+ '.' + ext)
            } else if (req.body.solutionId && !file) {
                cb(null, false)
            } else if (req.body.solutionId && file) {
                cb(null, file.originalname.split('.')[0]+ '.' + ext)
            } else {
                cb(null, false)
            }
            // cb(null, req.body.companyIdentifier + '-solution-' + req.body.solutionIndex + '.' +ext)
        },

        fileFilter: function (req, file, next) {
            if (!file) {
                next();
            } else {
                if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/gif') {
                    cb(null, true)
                } else {
                    cb(new Error('Images should be either JPEG, JPG, GIF or PNG!'))
                }

                if ((file.size / 1024) < 1024) {
                    cb(null, true)
                } else {
                    cb(new Error('Images should be less than 1Mb!'))
                }
            }
            return next();
        }
    })
}

const multerConfigLinkedin = {
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/static/images/faces/')
        },

        filename: function (req, file, cb) {
            const ext = file ? file.mimetype.split('/')[1] : ''
            if (file) {
                cb(null, sanitizeString(req.body.id) + '-picture.' + ext)
            } else {
                cb(null, false)
            }
        },

        fileFilter: function (req, file, next) {
            if (!file) {
                next();
            } else {
                if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/gif') {
                    cb(null, true)
                } else {
                    cb(new Error('Images should be either JPEG, JPG, GIF or PNG!'))
                }

                if ((file.size / 1024) < 1024) {
                    cb(null, true)
                } else {
                    cb(new Error('Images should be less than 1Mb!'))
                }
            }
            return next();
        }
    })
}

const auth_middleware = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.params.token || req.get('Authorization').substring(7)

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (!err) {
                User.findOne().where({
                    _id: getPayload(token)._id
                }).exec((error, result) => {
                    if (!error) {
                        next()
                    } else {
                        res.status(401).json({
                            status: 401,
                            info: "Unauthorized Access: " + err
                        })
                    }
                })
            } else {
                res.status(401).json({
                    status: 401,
                    info: "Unauthorized Access: " + err
                })
            }
        })
    } else {
        res.status(403).json({
            success: false,
            message: 'No token provided.'
        })
    }
}

const headers_middleware = function (req, res, next) {
    res.set('Cache-Control', 'public, max-age=0, must-revalidate, no-store')
    next()
}

app.use(headers_middleware)

solutionRoutes.route('/all').get(async (req, res) => {
    try {

        /*let company = await Company.findOne({ identifier: req.params.identifier }).deepPopulate('solutions solutions.benefits solutions.benefits.validations', {
                populate: {
                    'solutions.benefits.validations' : {
                        select: 'linkedin'
                    }
                }
            }).exec()*/

        let solutions = await Solution.find().where({
            active: true
        }).deepPopulate('company benefits benefits.validations', {
            populate: {
                'benefits.validations': {
                    select: 'linkedin'
                }
            }
        }).sort('-_id').exec()
        res.status(200).json({
            solutions: solutions
        })
    } catch (error) {
        res.status(400).json({
            message: 'There was an error fetching that information - ' + error
        })
    }
})

app.use(auth_middleware)

solutionRoutes.route('/benefits/validate').post(multer(multerConfigLinkedin).single('pictureUrl'), async (req, res) => {
    // console.log(req.body)
    if (typeof req.body.user.data.pictureUrl !== 'string') req.body.user.data.pictureUrl = 'static/images/faces/default.png'
    try {
        for(const survey of req.body.surveys) {
          let _survey = await Survey.findOne(({_id: survey.surveyId}));
          if(_survey) {
              try {
                // console.log(survey)
                if(survey.option.length > 0) {
                    _survey.options.forEach(option => {
                        req.body.optionsToValidate.forEach(op => {
                            if(option.optionDescription.toLowerCase().trim() === op.optionDescription.toLowerCase().trim()) {
                                option.validations.push(req.body.user.data)
                            }
                        })
                    })
                }

                // console.log('extraOpts', survey.extraOptions)

                if (survey.extraOptions.length > 0) {
                    survey.extraOptions.forEach(extra => {
                        // console.log(extra)
                        extra.validations.push(req.body.user.data);
                        _survey.extraOptions.push(extra)
                    });
                    console.log(_survey.extraOptions)
                    /**check this. old developer logic */
                }

                try {
                    await _survey.save()
                    res.status(200).json({
                        status: 200,
                        message: 'Validations saved!',
                    })  
                } catch(e) {
                    res.status(500).json({
                        status: 500,
                        message: 'Error while saving!',
                    })
                }
              } catch (e) {
                  console.log('error CATCH')
                  console.log(e)
                  res.status(500).json({
                    status: 500,
                    message: 'Error while saving!',
                })                  
              }
          }
        }
    } catch(e) {
        res.status(400).json({
            message: 'There was an error validating your changes - ' + e
        })
    }
})

solutionRoutes.route('/benefits/validate/self').post(multer(multerConfigLinkedin).single('pictureUrl'), async (req, res) => {
    let surveysToCheck = JSON.parse(req.body.surveys)
    let user = JSON.parse(req.body.user)
    let optionsToValidate = JSON.parse(req.body.optionsToValidate)
    if (typeof user.pictureUrl !== 'string') {
        user.pictureUrl = 'static/images/faces/' + sanitizeString(req.body.id.toString()) + '-picture.' + req.file.mimetype.split('/')[1]        
    } else {
        user.pictureUrl = 'static/images/faces/default.png'
    }
    try {
        for(const survey of surveysToCheck) {
          let _survey = await Survey.findOne(({_id: survey.surveyId}));
          if(_survey) {
              try {
                // console.log(survey)
                if(survey.option.length > 0) {
                    _survey.options.forEach(option => {
                        optionsToValidate.forEach(op => {
                            if(option.optionDescription.toLowerCase().trim() === op.optionDescription.toLowerCase().trim()) {
                                option.validations.push(user)
                            }
                        })
                    })
                }

                // console.log('extraOpts', survey.extraOptions)

                if (survey.extraOptions.length > 0) {
                    survey.extraOptions.forEach(extra => {
                        // console.log(extra)
                        extra.validations.push(user);
                        _survey.extraOptions.push(extra)
                    });
                    console.log(_survey.extraOptions)
                    /**check this. old developer logic */
                }

                try {
                    await _survey.save()
                    res.status(200).json({
                        status: 200,
                        message: 'Validations saved!',
                    })  
                } catch(e) {
                    res.status(500).json({
                        status: 500,
                        message: 'Error while saving!',
                    })
                }
              } catch (e) {
                  console.log('Catch error.')
                  console.log(e)
                  res.status(500).json({
                    status: 500,
                    message: 'Error while saving!',
                })                  
              }
          }
        }
    } catch(e) {
        console.log('Catch error.')
        res.status(400).json({
            message: 'There was an error validating your changes - ' + e
        })
    }

    // try {
    //     for(const survey of (JSON.parse(req.body.solutions).surveys)) {
    //         let edit = await Survey.findOne({
    //             _id: survey._id,
    //             // solution: solution._id
    //         }).exec()
    //         if(edit) {
    //             try {
    //                 survey.options.forEach(option => {
    //                     option.validations.forEach(validation => {
    //                         validation.pictureUrl = 'static/images/faces/' + sanitizeString(req.body.id.toString()) + '-picture.' + req.file.mimetype.split('/')[1]
    //                     })
    //                 })
    //                 console.log(survey.extraOptions.length)
    //                 if(survey.extraOptions.length>0) {
    //                     survey.extraOptions.forEach(option => {
    //                         option.validations.forEach(validation => {
    //                             validation.pictureUrl = 'static/images/faces/' + sanitizeString(req.body.id.toString()) + '-picture.' + req.file.mimetype.split('/')[1]
    //                         })
    //                     })
    //                 }
    //                 edit.options = survey.options
    //                 edit.extraOptions = survey.extraOptions
    //                 try {
    //                     await edit.save((a,b) => {console.log(b)})
    //                     res.status(200).json({
    //                         status: 200,
    //                         message: 'Validations saved!',
    //                     })  
    //                 } catch(e) {
    //                     res.status(500).json({
    //                         status: 500,
    //                         message: 'Error while saving!',
    //                     })
    //                 }
    //             } catch (e) {
    //                 res.status(500).json({
    //                     status: 500,
    //                     message: 'Error while finding items to save!',
    //                 })
    //             }
    //         } else {
    //             res.status(500).json({
    //                 message: 'Theres not items with this description',
    //                 data: req.body
    //             })
    //         }  
    //     }
    //     // res.status(200).json({
    //     //     message: 'Validations saved!',
    //     // })  
    // } catch(e) {
    //     res.status(400).json({
    //         message: 'There was an error validating your changes - ' + e
    //     })
    // }    
})

solutionRoutes.route('/benefits/validate/google').post(async (req, res) => {
    if (typeof req.body.user.data.pictureUrl !== 'string') req.body.user.data.pictureUrl = 'static/images/faces/default.png'
    try {
        for(const survey of req.body.surveys) {
          let _survey = await Survey.findOne(({_id: survey.surveyId}));
          if(_survey) {
              try {
                // console.log(survey)
                if(survey.option.length > 0) {
                    _survey.options.forEach(option => {
                        req.body.optionsToValidate.forEach(op => {
                            if(option.optionDescription.toLowerCase().trim() === op.optionDescription.toLowerCase().trim()) {
                                option.validations.push(req.body.user.data)
                            }
                        })
                    })
                }

                // console.log('extraOpts', survey.extraOptions)

                if (survey.extraOptions.length > 0) {
                    survey.extraOptions.forEach(extra => {
                        // console.log(extra)
                        extra.validations.push(req.body.user.data);
                        _survey.extraOptions.push(extra)
                    });
                    console.log(_survey.extraOptions)
                    /**check this. old developer logic */
                }

                try {
                    await _survey.save()
                    res.status(200).json({
                        status: 200,
                        message: 'Validations saved!',
                    })  
                } catch(e) {
                    res.status(500).json({
                        status: 500,
                        message: 'Error while saving!',
                    })
                }
              } catch (e) {
                  console.log('error CATCH')
                  console.log(e)
                  res.status(500).json({
                    status: 500,
                    message: 'Error while saving!',
                })                  
              }
          }
        }
    } catch(e) {
        res.status(400).json({
            message: 'There was an error validating your changes - ' + e
        })
    }    
})

solutionRoutes.route('/benefits/register').post(async (req, res) => {
    try {
        let company = await Company.findOne({
            _id: req.body.company
        }).exec()

        if (!company) {
            res.status(400).json({
                message: 'Unable to save data. Reason: Company doesn\'t exist'
            })
        } else {
            let solution = await Solution.findOne().where({
                _id: req.body.solution,
                company: req.body.company
            }).exec()
            if (!solution) {
                res.status(400).json({
                    message: 'Unable to save data. Reason: Solution doesn\'t exist'
                })
            } else {
                let iBenefits = req.body.benefits
                for (let i = 0, len = iBenefits.length; i < len; i++) {
                    if (iBenefits[i]._id) {
                        let benefit = await Benefit.findOne({
                            _id: iBenefits[i]._id,
                            solution: solution._id
                        }).exec()
                        benefit.description = iBenefits[i].description
                        await benefit.save()
                    } else {
                        let benefit = new Benefit()
                        benefit.solution = req.body.solution
                        benefit.description = iBenefits[i].description
                        benefit.validations = []
                        benefit.active = true
                        await benefit.save()

                        solution.benefits.push(benefit._id)
                        await solution.save()
                    }
                }
                res.status(200).json({
                    message: 'Benefits saved successfully.'
                })
            }
        }
    } catch (error) {
        res.status(400).json({
            message: 'There was an error registering your information - ' + error
        })
    }
})

solutionRoutes.route('/remove').post(async (req, res) => {
    try {
        await Solution.findOneAndRemove({
            _id: req.body._id,
            company: req.body.company
        }).exec()
        res.status(200).json({
            message: 'Solution removed successfully.'
        })
    } catch (error) {
        res.status(400).json({
            message: 'There was an error removing this solution - ' + error
        })
    }
})

solutionRoutes.route('/remove/client').post(async (req, res) => {
    try {
        await Solution.findOneAndRemove({
            _id: req.body.id
        }).exec()
        res.status(200).json({
            message: 'Client removed successfully.'
        })
    } catch (error) {
        res.status(400).json({
            message: 'There was an error removing this client - ' + error
        })
    }
})

solutionRoutes.route('/register').post(multer(multerConfig).single('logo'), (req, res) => {
    const solutionSchema = Joi.object().keys({
        description: Joi.string().required(),
        specialization: Joi.string().required(),
        category: Joi.string().required(),
        happyNumber: Joi.string().allow('')
    })

    const result = Joi.validate({
        specialization: req.body.specialization,
        category: req.body.category,
        description: req.body.description,
        happyNumber: req.body.happyNumber
    }, solutionSchema, {
        abortEarly: false,
        language: {
            any: {
                required: '!! {{label}} is required.'
            },
            string: {
                min: '!! {{label}} must be at least {{limit}} characters long.',
                regex: {
                    base: "!! {{label}} must contain letters and numbers and can't contain special characters."
                }
            }
        }
    }, async (joiErr, value) => {
        if (joiErr == null) {
            try {
                let company = await Company.findOne({
                    _id: req.body.company
                }).exec()

                if (!company) {
                    res.status(400).json({
                        message: 'Unable to save data. Reason: Company doesn\'t exist'
                    })
                } else {
                    let solution = null
                    let isNew = false

                    if (req.body.solution !== '') { // req.body.solution is the id
                        solution = await Solution.findOne({
                            _id: req.body.solution
                        }).exec()
                        if (!solution) {
                            res.status(400).json({
                                message: 'Unable to save data. Reason: Trying to edit a solution that doesn\'t exist'
                            })
                        } else {
                            isNew = false
                        }
                    } else {
                        solution = new Solution()
                        isNew = true
                    }

                    const ext = req.file ? req.file.mimetype.split('/')[1] : ''
                    solution.index = req.body.index // isNew? company.solutions.length + 1 : solution.index
                    solution.company = company._id
                    solution.industry = req.body.specialization
                    solution.category = req.body.category
                    solution.description = req.body.description
                    solution.identifier = sanitizeString(req.body.category)
                    solution.happyNumber = req.body.happyNumber
                    // solution.title = req.body.title
                    if (isNew && req.file) {
                        solution.image = req.file.originalname.split('.')[0] + '.' + ext
                    } else if (!isNew && !req.file) {
                        solution.image = solution.image
                    } else if (!isNew && req.file) {
                        solution.image = req.file.originalname.split('.')[0] + '.' + ext
                    } else {
                        throw ("Missing picture.")
                    }
                    // solution.image = isNew? company.identifier + '-solution-' + (company.solutions.length + 1) + '.' +ext : solution.image
                    // solution.benefits = solution.benefits? solution.benefits : []
                    solution.active = true
                    solution.validations = solution.validations ? solution.validations : []
                    await solution.save()

                    // After you save the solution, you save the benefits, this way wether it's a new or an old solution, you always have a solution id to look for.

                    if(JSON.parse(req.body.surveys).length > 0) {
                        let surveys = await Survey.find({
                            solution: solution._id
                        }).exec()
                        let iSurveys = JSON.parse(req.body.surveys) // req.body.results

                        for (let i = 0, len = iSurveys.length; i < len; i++) { // edit and add new ones
                            if (surveys.some(benefit => benefit._id == iSurveys[i]._id)) {
                                let edit = await Survey.findOne({
                                    _id: iSurveys[i]._id,
                                    solution: solution._id
                                }).exec()
                                edit.question = iSurveys[i].question
                                edit.description = iSurveys[i].description
                                edit.options = iSurveys[i].options
                                await edit.save()
                            } else {
                                let survey = new Survey()
                                survey.question = iSurveys[i].question
                                survey.solution = solution._id
                                survey.description = iSurveys[i].description
                                survey.options = iSurveys[i].options
                                survey.active = true
                                await survey.save()
                                solution.surveys.push(survey._id)
                            }
                        }      
                    }              


                    // benefits
                    let benefits = await Benefit.find({
                        solution: solution._id
                    }).exec()
                    // let iBenefits = JSON.parse(req.body.results) // req.body.results

                    // for (let i = 0, len = iBenefits.length; i < len; i++) { // edit and add new ones
                    //     if (benefits.some(benefit => benefit._id == iBenefits[i]._id)) {
                    //         let edit = await Benefit.findOne({
                    //             _id: iBenefits[i]._id,
                    //             solution: solution._id
                    //         }).exec()
                    //         edit.description = iBenefits[i].description
                    //         await edit.save()
                    //     } else {
                    //         let benefit = new Benefit()
                    //         benefit.solution = solution._id
                    //         benefit.description = iBenefits[i].description
                    //         benefit.validations = []
                    //         benefit.active = true
                    //         await benefit.save()

                    //         solution.benefits.push(benefit._id)
                    //     }
                    // }

                    // for (let i = 0, len = benefits.length; i < len; i++) { // delete the ones not received
                    //     if (iBenefits.some(benefit => benefit._id == benefits[i]._id) == false) {
                    //         await Benefit.findOneAndRemove({
                    //             _id: benefits[i]._id,
                    //             solution: solution._id
                    //         }).exec()
                    //         solution.benefits.splice(i, 1)
                    //     }
                    // }

                    await solution.save()



                    /*

                    for (let i = 0, len = benefits.length; i < len; i++) {

                        if ( req.body.benefits.some( benefit => benefit._id == benefits[i]._id) ) {

                            if ( !_.find(benefits[i].validations, function (o) { return o.id.toString() === req.body.linkedin.id.toString() })) {
                                benefits[i].validations.push(req.body.linkedin)
                                await benefits[i].save()
                            }
                        } else {
                            benefits[i].validations = benefits[i].validations.filter( validation => validation.id.toString() !== req.body.linkedin.id.toString() )
                            await benefits[i].save()
                        }
                    }
                      

                    */

                    /*for (let i = 0, len = iBenefits.length; i < len; i++) {
                        if (iBenefits[i]._id) {
                            let benefit = await Benefit.findOne({ _id: iBenefits[i]._id, solution: solution._id }).exec()
                                benefit.description = iBenefits[i].description
                                await benefit.save()
                        } else {
                            let benefit = new Benefit()
                                benefit.solution = solution._id
                                benefit.description = iBenefits[i].description
                                benefit.validations = []
                                benefit.active = true
                                await benefit.save()

                                solution.benefits.push(benefit._id)
                        }
                    }
                    await solution.save()*/

                    if (isNew) {
                        company.solutions.push(solution)
                    }
                    await company.save()

                    res.status(200).json({
                        message: 'Solution saved successfully.',
                        solution
                    })
                }
            } catch (error) {
                res.status(400).json({
                    message: 'There was an error registering your information - ' + error
                })
            }
        } else {
            let errors = []
            for (var err in joiErr.details) {
                errors.push(joiErr.details[err].message)
            }
            res.status(400).json({
                message: errors.toString()
            })
        }
    })
})


// Surveys endpoints

solutionRoutes.route('/addSurvey').post( async (req, res) => {
    let company = await Company.findOne({
        _id: req.body.company
    }).exec()    
    if (!company) {
        res.status(400).json({
            message: 'Unable to save data. Reason: Company doesn\'t exist'
        })
    } else {
        solution = await Solution.findOne({
            _id: req.body._id
        }).exec()
        if (!solution) {
            res.status(400).json({
                message: 'Unable to save data. Reason: Trying to edit a solution that doesn\'t exist'
            })
        } else {
            let surveys = await Survey.find({
                solution: solution._id
            }).exec()
            let survey = new Survey()
            survey.solution = solution._id
            survey.question = req.body.newSurvey.question
            survey.description = req.body.newSurvey.description
            survey.extraOptionTitle = req.body.newSurvey.extraOptionTitle
            survey.showExtra = req.body.newSurvey.showExtra
            survey.options = req.body.newSurvey.options
            survey.active = false
            await survey.save()
            solution.surveys.push(survey._id)
            await solution.save()
            res.status(200).json({
                status: 200,
                message: 'Survey added to solution'
            })              
        } 
    }    
})

solutionRoutes.route('/editSurvey').post(async (req, res) => {
    try {
        let edit = await Survey.findOne({
            _id: req.body._id,
            // solution: solution._id
        }).exec()
        edit.question = req.body.question
        edit.description = req.body.description
        edit.extraOptionTitle = req.body.extraOptionTitle
        edit.extraOptions = req.body.extraOptions
        edit.showExtra = req.body.showExtra
        edit.options = req.body.options
        edit.active = req.body.active
        await edit.save()
        res.status(200).json({
            message: 'Updating succesful.'
        })
    } catch (e) {
        res.status(400).json({
            log: e,
            message: 'Updating failed.'
        })
    }
})

solutionRoutes.route('/remove/survey').post(async (req, res) => {
    try {
        await Survey.findOneAndRemove({
            description: req.body.description
        }, async (err, ok) => {
            await Survey.findByIdAndDelete(ok._id, (err, ok) => {
            })
        })
        res.status(200).json({
            message: 'Solution removed successfully.'
        })
    } catch (error) {
        res.status(400).json({
            message: 'There was an error removing this solution - ' + error
        })
    }
})


module.exports = solutionRoutes;