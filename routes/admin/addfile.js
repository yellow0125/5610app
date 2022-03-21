const formidable = require('formidable')
const path = require('path')
const db = require('../../db')
const { ArticleModel } = require('../../models/Article')

module.exports = (req, res, next) => {

	req.app.locals.currentLink = 'user'

	const form = formidable({
		multiples: true,
		uploadDir: path.join(__dirname, '../', '../', 'public', 'uploads'), keepExtensions: true
	})

	form.parse(req, async (err, fields, files) => {

		const newArticle = new ArticleModel({
			title: fields.title,
			tags: fields.tags,
			author: fields.author,
			publishDate: fields.pubdate,
			cover: files.cover.filepath.split('public')[1],
			content: fields.content,
		})
		//res.send(fields)
		//res.send(files)
		//	res.send(newArticle)
		//	console.log(newArticle)
		db.saveArticle(newArticle)
		res.redirect('/admin/profile');
	})

	//res.render('admin/edit')
}

