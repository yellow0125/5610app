const db = require('../../db')


module.exports = async (req, res) => {


  req.app.locals.currentLink = 'home'
  const user = req.app.locals.userInfo
  const validlog = req.session.username
 // console.log(user)

  const page = req.query.page || 1
  const pagesize = 4

  const count = await db.countAllArticle({})

  const total = Math.ceil(count / pagesize)
  const start = (page - 1) * pagesize
  //const start = 8
  // console.log(total)
  //res.send(count)

  const result = await db.findAllArticles(start, pagesize)
  //return res.send(result)

  res.render('home/default.art', {
    result: result,
    page: page,
    total: total,
    validlog
  })

}