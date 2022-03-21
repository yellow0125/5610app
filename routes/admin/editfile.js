const db = require('../../db')

module.exports = async (req, res) => {
  req.app.locals.currentLink = 'user';
  const validlog = req.session.username

  const title = req.query.id
  if (title) {
    const result = await db.findArticle(title)
    res.render('admin/modify', {
      validlog,
      result: result,
      link: '/admin/article-modify?id=' + title,
    
    })

  } else {
    res.render('admin/edit', {
      validlog,
    
    })

  }


}