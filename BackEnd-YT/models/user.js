var mongoose = require('mongoose')
var crypto = require('crypto')
var jwt = require('jsonwebtoken')
var Schema = mongoose.Schema

var User = new Schema({
  registered: Date,
  name: {
    type: String,
    unique: false,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  company: { type: Schema.Types.ObjectId, ref: 'Company' },
  companyIdentifier: {
    type: String,
    unique: true,
    required: true
  },
  /* verified: Boolean,
  linkedin: {
    firstName: String,
    lastName: String,
    headline: String,
    industry: String,
    pictureUrl: String,
    position: String
  },*/
  image: String,
  hash: String,
  salt: String,
  active: Boolean,
  role: { type: String, default: 'user' }
}, { emitIndexErrors: true })

var handleError = function(error, res, next) {
  if (error.code === 11000) {
    console.log(error.errmsg)
    next(new Error("E-mail or Company name already in use."))
  } else {
    next()
  }
}

User.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(
        password, this.salt, 1000, 64, 'sha1'
    ).toString('hex')
}

User.methods.generateHashPassword = function (password) {
  let salt = crypto.randomBytes(16).toString('hex')
  let hash = crypto.pbkdf2Sync(
      password, this.salt, 1000, 64, 'sha1'
  ).toString('hex')
  return hash;
}

User.methods.validPassword = function (password) {
    const hash = crypto.pbkdf2Sync(
        password, this.salt, 1000, 64, 'sha1'
    ).toString('hex')
    return this.hash === hash
}

User.methods.generateJwt = function () {
    var expiry = new Date()
    expiry.setDate(expiry.getDate() + 30)

    return jwt.sign({
        _id: this._id,
        email: this.email,
        // company: this.company,
        identifier: this.companyIdentifier,
        // verified: this.verified,
        role: this.role,
        exp: parseInt(expiry.getTime() / 1000)
    }, process.env.JWT_SECRET)
}

User.post('save', handleError)
User.post('update', handleError)
User.post('findOneAndUpdate', handleError)
User.post('insertMany', handleError)

module.exports = mongoose.model ('User', User)