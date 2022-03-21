module.exports = (req, res) => {

	req.app.locals.currentLink = 'login';

	const { message } = req.query
	res.render('admin/login', {
		message: message
	});
}