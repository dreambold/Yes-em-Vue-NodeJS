var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Linkedin = new Schema({
  firstName: String,
  headline: String,
  id: String,
  industry: String,
  lastName: String,
  pictureUrl: String,
  positions: Object,
  company: String
})
 
var Google = new Schema({
  firstName: String,
  id: String,
  industry: String,
  lastName: String,
  pictureUrl: String,
  positions: Object   
});

var Benefit = new Schema({
  solution: Schema.Types.ObjectId, // The solution it belongs to
  description: String,
  options: Array,
  validations: [Linkedin],
  active: Boolean
}, { emitIndexErrors: true })

var handleError = function(error, res, next) {
  if (error.code === 11000) {
    console.log(error.errmsg)
    next(new Error("Username or Email already taken"))
  } else {
    next()
  }
}

Benefit.post('save', handleError)
Benefit.post('update', handleError)
Benefit.post('findOneAndUpdate', handleError)
Benefit.post('insertMany', handleError)

module.exports = mongoose.model ('Benefit', Benefit)