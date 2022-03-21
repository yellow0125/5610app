const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,

  },
  email: {
    type: String,
    unique: true,
    require: true,

  },
  password: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const UserModel = mongoose.model('UserModel', UserSchema, 'users')


module.exports = {
  UserModel,
}