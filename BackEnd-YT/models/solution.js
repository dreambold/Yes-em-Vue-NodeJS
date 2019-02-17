const mongoose = require('mongoose')
const deepPopulate = require('mongoose-deep-populate')(mongoose)
const Schema = mongoose.Schema

const Solution = new Schema({
  index: Number,
  company: { type: Schema.Types.ObjectId, ref: 'Company' }, // The company it belongs to
  industry: String,
  category: String,
  customCategory: String,
  title: String,
  identifier: String,
  description: String,
  image: String,
  surveys: [{type: Schema.Types.ObjectId, ref: 'Survey'}],
  benefits: [{type: Schema.Types.ObjectId, ref: 'Benefit'}],
  active: Boolean,
  happyNumber: String
  // validations: [Schema.Types.ObjectId] // user IDs

}, { emitIndexErrors: true })

Solution.plugin(deepPopulate)

const handleError = function(error, res, next) {
  if (error.code === 11000) {
    console.log(error.errmsg)
    next(new Error("Username or Email already taken"))
  } else {
    next()
  }
}

Solution.post('save', handleError)
Solution.post('update', handleError)
Solution.post('findOneAndUpdate', handleError)
Solution.post('insertMany', handleError)

module.exports = mongoose.model ('Solution', Solution)