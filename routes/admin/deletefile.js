const db = require('../../db')
module.exports = async (req, res) => {

  const title = req.query.id

  await db.deleteArticle(title)
  res.redirect('/admin/profile')

}