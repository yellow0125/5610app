const db = require('../../db')
module.exports = async (req, res) => {

	req.app.locals.currentLink = 'user'
	const validlog = req.session.username


	const user = req.app.locals.userInfo

	const name = user.name
	const id = user._id
	const count = await db.countArticle(id)
	const page = req.query.page || 1
	const pagesize = 5

	const total = Math.ceil(count / pagesize)
	const start = (page - 1) * pagesize

	const result = await db.findArticles(name, start, pagesize)

	res.render('admin/profile', {
		result: result,
		count: count,
		page: page,
		total: total,
		validlog
	});




	//	res.send(result)



}