const router = require("express").Router();
const bcrypt = require('bcrypt');
const User = require('../models/User')




router.get('/signup', (req, res, next) => {
	res.render('signup', {
		style: "signup.css"
	})
});

router.post('/signup', (req, res, next) => {
	const { username, password } = req.body
	// is the password 4+ characters
	if (password.length < 4) {
		res.render('signup', { 	style: "signup.css",
		message: 'Ups, your password has to be 4 characters min!' })
		return
	}

	if (username.length === 0) {
		res.render('signup', { style: "signup.css",
		message: 'Your username cannot be empty' })
		return
	}

	User.findOne({ username: username })
		.then(userFromDB => {

			if (userFromDB !== null) {
				res.render('signup', { style: "signup.css", message: 'Sorry, your username is already taken' })
				return
			} else {

				const salt = bcrypt.genSaltSync()
				const hash = bcrypt.hashSync(password, salt)

				User.create({
					username: username,
					password: hash
				})
					.then(createdUser => {
						//console.log(createdUser)
						res.redirect('/')
					})
					.catch(err => {
						next(err)
					})
			}
		})
});




router.get('/login', (req, res, next) => {
	res.render('login', {
		style: "login.css"

	} )
});

router.post('/login', (req, res, next) => {
	const { username, password } = req.body;

    User.findOne({ username: username })
		.then(userFromDB => {
			if (userFromDB === null) {

                res.render('login', {style: "login.css", message: 'Invalid Credentials' })
				return
			}

			if (bcrypt.compareSync(password, userFromDB.password)) {

                req.session.user = userFromDB
				res.redirect('/profile')
			} else {
				res.render('login', {style: "login.css", message: 'Invalid Crentials' })
			}
		})
});

router.post('/logout', (req, res, next) => {
	req.session.destroy((err => {
		if (err) {
			next(err)
		} else {

			res.redirect('/')
		}
	}))
});





module.exports = router;