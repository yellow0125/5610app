const db = require('../../db')
const formidable = require('formidable')
const path = require('path')
const { ArticleModel } = require('../../models/Article')
const console = require('console')

module.exports = async (req, res) => {

  req.app.locals.currentLink = 'user'

  const title = req.query.id.split('?')[0] //title of article
  const cover = req.query.id.split('?')[1]// original cover

  //const result = await db.findArticle(title)
  //res.send(result)//get  then replace and modify. save
  const form = formidable({
    multiples: true,
    uploadDir: path.join(__dirname, '../', '../', 'public', 'uploads'), keepExtensions: true
  })

  form.parse(req, async (err, fields, files) => {
    if (files.cover.size === 0) {

      const newArticle = new ArticleModel({
        title: fields.title,
        tags: fields.tags,
        author: fields.author,
        publishDate: fields.pubdate,
        cover: cover,
        content: fields.content,
      })
      //  console.log(newArticle) √
      //  console.log(title)  √
    //  await db.updateArticle(title, newArticle)
      await db.update(title, newArticle)
      // db.saveArticle(title, newArticle)
      //  console.log(result)
    } else {
      const newArticle = new ArticleModel({
        title: fields.title,
        tags: fields.tags,
        author: fields.author,
        publishDate: fields.pubdate,
        cover: files.cover.filepath.split('public')[1],
        content: fields.content,
      })
      // console.log(newArticle)
      //  console.log(title)
    //  await db.updateArticle(title, newArticle)
      await db.update(title, newArticle)
    }
    res.redirect('/admin/profile')
  })
}
