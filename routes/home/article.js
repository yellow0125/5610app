const db = require('../../db')

module.exports = async (req, res) => {

  req.app.locals.currentLink = 'home';
  const validlog = req.session.username
  const id = req.query.id

  const result = await db.findArticle(id)
  // res.send(result)


  res.render('home/article.art', {
    result: result,
    validlog
  })

}