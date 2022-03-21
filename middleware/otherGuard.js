const guard2 = (req, res, next) => {
  if (req.url === '/') {
    res.redirect('/home')
  }
  else {
    next()
  }
}

module.exports = guard2;