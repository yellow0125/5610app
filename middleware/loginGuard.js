const guard = (req, res, next) => {
  if (req.url === '/') {
    res.redirect('/admin/login')
  }
  if (req.url === '/profile' && !req.session.username) {
    res.redirect('/admin/login')
  }
  if (req.url === '/article-add' && !req.session.username) {
    res.redirect('/admin/login')
  }
  if (req.url === '/article-edit' && !req.session.username) {
    res.redirect('/admin/login')
  }
  else {
    next()
  }
}

module.exports = guard;