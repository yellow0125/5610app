module.exports = (req, res) => {

	req.app.locals.currentLink = 'register';

	const { message } = req.query
	res.render('admin/register', {
		message: message
	});
}