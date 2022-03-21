const db = require('../../db.js')
const bcrypt = require('bcrypt');
const { UserModel } = require('../../models/User')
const { check, validationResult } = require('express-validator');

module.exports = async (req, res, next) => {

  req.app.locals.currentLink = 'register';
  //duplicate checking
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
  check(name).isLength({ min: 2, max: 12 }),
    check(email).isEmail(),
    check('password').isLength({ min: 3 })

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
