// reference express frame
const express = require('express')
const db = require('./db')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

const session = require('express-session')
app.use(session({ secret: 'secret key' }))

const compression = require('compression');
const helmet = require('helmet');
app.use(helmet());

const template = require('art-template')
const moment = require('moment')

app.use(express.static(__dirname + '/public'))
//frame location and .pug

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'art')
app.engine('art', require('express-art-template'))

template.defaults.imports.moment = moment;

//Check whether the user is logged in
app.use('/admin', require('./middleware/loginGuard'));
app.use('/', require('./middleware/otherGuard.js'));

// if (process.env.NODE_ENV === 'development') {
// 	console.log('development')
// } else {
// 	console.log('production')
// }

//link to routes
const home = require('./routes/home')
const admin = require('./routes/admin')
const { nextTick } = require('process')
app.use('/home', home)
app.use('/admin', admin)


app.use((err, req, res, next) => {
	const result = JSON.parse(err);
	let params = [];
	for (let attr in result) {
		if (attr != 'path') {
			params.push(attr + '=' + result[attr]);
		}
	}
	res.redirect(`${result.path}?${params.join('&')}`);
})

db.dbConnect().then(() => app.listen(process.env.PORT||3000, () => {
	console.log('server is running on port 3000')
}))
