const mongoose = require('mongoose')

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, 'please enter the title'],

  },
  tags:{
    type: String,
    default:null,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    require: [true, 'please enter the author'],
  },
  pubdate: {
    type: Date,
    default: Date.now,
    require: true,
  },
  cover: {
    type: String,
    default: null,
  },
  content: {
    type: String,
  }
})


const ArticleModel = mongoose.model('ArticleModel', ArticleSchema, 'articles')


module.exports = {
  ArticleModel,
}