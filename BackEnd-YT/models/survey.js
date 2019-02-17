const mongoose = require('mongoose')
const Schema = mongoose.Schema
const deepPopulate = require('mongoose-deep-populate')(mongoose)

const Linkedin = new Schema({
  firstName: String,
  headline: String,
  id: String,
  industry: String,
  lastName: String,
  pictureUrl: String,
  positions: Object || String,
  company: String,
  company_size: String,
  position_type: String,
  department: String,
})

const Options = new Schema({
  optionDescription: String,
  active: Boolean,
  validations: [Linkedin]
})

const Survey = new Schema({
  solution: Schema.Types.ObjectId, // The solution it belongs to
  question: String,
  description: String,
  showExtra: false,
  options: [Options],
  extraOptions: [Options],
  extraOptionTitle: String,
  active: Boolean
}, { emitIndexErrors: true })

const handleError = function(error, res, next) {
  if (error.code === 11000) {
    console.log(error.errmsg)
    next(new Error("Username or Email already taken"))
  } else {
    next()
  }
}

Survey.post('save', handleError)
Survey.post('update', handleError)
Survey.post('findOneAndUpdate', handleError)
Survey.post('insertMany', handleError)

module.exports = mongoose.model ('Survey', Survey)