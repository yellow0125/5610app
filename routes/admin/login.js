const db = require('../../db.js')
const bcrypt = require('bcrypt');


module.exports = async (req, res, next) => {
  
  //tag
  req.app.locals.currentLink = 'login';

  const { email, password } = req.body;
  if (email.trim().length == 0 || password.trim().length == 0) {
    return next(JSON.stringify({ path: '/admin/login', message: 'Email or Password can not be empty' }))
    // return res.status(400).render('admin/error', { msg: 'Email or Password can not be empty' });

  }
  const user = await db.findUser({ "email": email })
  if (user == null) {
    return next(JSON.stringify({ path: '/admin/login', message: 'User does not exist' }))
    // return res.status(400).render('admin/error', { msg: 'User does not exist' });
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      req.session.username = user.name;
      req.app.locals.userInfo = user;
      res.redirect('/admin/profile');
      //res.send('login success')
    } else {
      next(JSON.stringify({ path: '/admin/login', message: 'Email or Password Incorrect' }))
      // res.status(400).render('admin/error', { msg: 'email or password incorrect' })
    }
  } catch {
    res.status(400).render('admin/error', { msg: 'Server error' })
  }
}

