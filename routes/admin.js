const express = require('express')
const admin = express.Router()

//for register
const db = require('../db.js')
const bcrypt = require('bcrypt');
const { UserModel } = require('../models/User')
const { check, validationResult } = require('express-validator');

//register
admin.get('/register', require('./admin/registerPage'))
//admin.post('/register', require('./admin/register'))

//login
admin.get('/login', require('./admin/loginPage'))
admin.post('/login', require('./admin/login'))

//logout
admin.get('/logout', require('./admin/logout'))


//user profile
admin.get('/profile', require('./admin/profile'));

//article
admin.get('/article-edit', require('./admin/editfile'))
admin.post('/article-add', require('./admin/addfile'))

admin.post('/article-modify', require('./admin/modifyfile'))

admin.get('/delete', require('./admin/deletefile'))



admin.post('/register', [
  check('email')
    .isEmail()
    .withMessage('Email format is not valid'),
  check('name')
    .isLength({ min: 2, man: 12 })
    .withMessage('Username be at least 2 chars and at most 12 long'),
  check('password')
    .isStrongPassword()
    .withMessage('Password must be at least 8 Characters with 1 UPPERCASE, 1 Lowercase, 1 Number and 1 Symbols')
], async function (req, res, next) {

  req.app.locals.currentLink = 'register';
  //duplicate checking
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array()[0].msg
    return next(JSON.stringify({ path: '/admin/register', message: message }))
  }
  //res.json({ msg: 'success' });
  const email = req.body.email;
  const user = await db.findUser({ "email": email })
  if (user) {
    //  return res.send('The email address has been occupied')
    return next(JSON.stringify({ path: '/admin/register', message: 'Email has been Occupied!' }))
  }
  //duplicate checking
  const name = req.body.name;
  const u = await db.findUser({ "name": name })
  if (u) {
    //  return res.send('The email address has been occupied')
    return next(JSON.stringify({ path: '/admin/register', message: 'Username has been Occupied!' }))
  }

  try {

    const hashpsw = await bcrypt.hash(req.body.password, 10)
    req.body.password = hashpsw
    //const data = req.body
    const data = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: hashpsw
    })
    console.log(data)
    await db.saveUser(data)

    //  return next(JSON.stringify({ path: '/admin/login', message: 'Create success!'' }))
    res.render('admin/error', { msg: 'Create success!' })
  } catch (err) {
    console.log(err)
  }

}
)

module.exports = admin

