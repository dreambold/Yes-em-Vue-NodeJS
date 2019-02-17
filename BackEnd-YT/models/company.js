const mongoose = require('mongoose')
const deepPopulate = require('mongoose-deep-populate')(mongoose)
const Schema = mongoose.Schema

const Company = new Schema({
  representative: { type: Schema.Types.ObjectId, ref: 'User' }, // The user that registered this company
  name: {
    type: String,
    unique: true,
    required: true
  },
  identifier: {
    type: String,
    unique: true,
    required: true
  },
  description: String,
  industry: String,
  country: String,
  city: String,
  location: String,
  logo: String,
  coverImage: String,
  recomendationsImage: String,
  resultsImage: String,
  active: Boolean,
  published: Boolean,
  facebook: String,
  linkedin: String,
  twitter: String,
  instagram: String,
  howToSay: String,
  customHowToSay: String,
  thanks: String,
  solutions: [{ type: Schema.Types.ObjectId, ref: 'Solution' }] //Array of solutions
}, { emitIndexErrors: true })

Company.plugin(deepPopulate)

const handleError = function(error, res, next) {
  if (error.code === 11000) {
    console.log(error.errmsg)
    next(new Error("Username or Email already taken"))
  } else {
    next()
  }
}

Company.post('save', handleError)
Company.post('update', handleError)
Company.post('findOneAndUpdate', handleError)
Company.post('insertMany', handleError)

module.exports = mongoose.model ('Company', Company)