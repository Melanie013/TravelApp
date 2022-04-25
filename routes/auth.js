const router = require("express").Router();
// const bcrypt = require('bcryptjs');
const User = require('../models/User.model')





// sign up missing 











router.get('/login', (req, res, next) => {
	res.render('login')
});

router.post('/login', (req, res, next) => {
	const { username, password } = req.body;

    User.findOne({ username: username })
		.then(userFromDB => {
			if (userFromDB === null) {

                res.render('login', { message: 'Invalid Credentials' })
				return
			}

			if (bcrypt.compareSync(password, userFromDB.password)) {

                req.session.user = userFromDB
				res.redirect('/profile')
			} else {
				res.render('login', { message: 'Invalid Crentials' })
			}
		})
});

router.get('/logout', (req, res, next) => {
	req.session.destroy((err => {
		if (err) {
			next(err)
		} else {
			// success - we don't have an error
			res.redirect('/')
		}
	}))
});


module.exports = router;