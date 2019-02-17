const express = require('express')
const app = express()
const adminRoutes = express.Router()
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Company = require('../models/company')
const Solution = require('../models/solution')
const Benefit = require('../models/benefit')
const atob = require('atob')
const moment = require('moment')

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

app.use(auth_middleware)

adminRoutes.route('/user/list').get(auth_middleware, (req, res) => {
    User.find().select('firstName lastName email registered company active').populate({ path: 'company', select: '-_id name industry' }).exec( (err, list) => {
        if(!err) {
            res.status(200).json({status: 200, list:list})
        }else {
            res.status(400).json({status: 400, message: "There was an error retrieving the data: "+err})
        }
    })
})

adminRoutes.route('/company/list').get(auth_middleware, (req, res) => {
    Company.find().select('_id name industry location solutions active').populate({ 
        path: 'solutions', 
        select: 'description subIndustry validations active',
        populate: {
            path: 'benefits',
            select: '_id'
        }
    }).exec( (err, list) => {
        if(!err) {
            res.status(200).json({status: 200, list: list})
        }else {
            res.status(400).json({status: 400, message: "There was an error retrieving the data: "+err})
        }
    })
})

adminRoutes.route('/user/active').post(auth_middleware, async(req, res) => {
    try {
        let user = await User.findOne({ _id: req.body.user }).exec()
            user.active = !user.active
            await user.save()
        res.status(200).json({status: 200})
    } catch (error) {
        res.status(400).json({status: 400, message: "There was an error retrieving the data: "+error})
    }
})

adminRoutes.route('/company/active').post(auth_middleware, async(req, res) => {
    try {
        let company = await Company.findOne({ _id: req.body.company }).exec()
            company.active = !company.active
            await company.save()
        res.status(200).json({status: 200})
    } catch (error) {
        res.status(400).json({status: 400, message: "There was an error retrieving the data: "+error})
    }
})

adminRoutes.route('/solution/active').post(auth_middleware, async(req, res) => {
    try {
        let solution = await Solution.findOne({ _id: req.body.solution }).exec()
            solution.active = !solution.active
            await solution.save()
        res.status(200).json({status: 200})
    } catch (error) {
        res.status(400).json({status: 400, message: "There was an error retrieving the data: "+error})
    }
})

module.exports = adminRoutes;