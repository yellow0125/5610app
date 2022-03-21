const express = require('express')
const home = express.Router()

//get the defalut html
home.get('/', require('./home/index'))
home.get('/article-detail', require('./home/article'))

//  /:id display the article details html 根据ID 找到文章并展示
module.exports = home