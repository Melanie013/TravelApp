const router = require("express").Router();
const express = require('express')
const hbs = require('hbs')


const User = require('../models/User.model')

const loginCheck = () => {
    return (req, res, next) => {
  
      if (req.session.user) {
  
        next()
      } else {
        res.redirect('/login')
      }
    }
  } 

/*
router.get("/profile", isLoggedIn (req, res, next) => {
    User.find()
            
            .then(userDataFromDB => {
                console.log(userDataFromDB);
                        res.render("profile/show", { data: userDataFromDB });
  
            
                    })
                    .catch(err => {
                        next(err)
                    })

})
*/
router.get("/profile", loginCheck(), (req, res, next) => {
    loggedInUser = req.session.user.username
    console.log(`this is the ${loggedInUser}`)
    res.render("profile/show.hbs", {loggedInUser});
  });
  
  
  /*
  router.get('/profile/:id', (req, res, next) => {
	// console.log('books id')
	const id = req.params.id
	console.log(`This is the ${id}`)
	User.findById(id)
		.then(UserdataFromDB => {
			console.log(`This is the ${UserdataFromDB}`)
			res.render('profile/show', { data: UserdataFromDB })
		})
		.catch(err => {
			next(err)
		})
});
*/

  module.exports = router;
