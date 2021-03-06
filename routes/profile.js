const router = require("express").Router();
const express = require('express')
const hbs = require('hbs');
const Journey = require("../models/Journey");


const User = require('../models/User')

const loginCheck = () => {
    return (req, res, next) => {
  
      if (req.session.user) {
  
        next()
      } else {
        res.redirect('/login')
      }
    }
 } 



  router.get("/profile", loginCheck(), (req, res, next) => {

    const loggedInUser = req.session.user.username
    const userId = req.session.user._id
    //const userDesctiption = req.session.user.description

    Journey.find({owner: userId})
    .then(allJourneysByUser => {
        //console.log(allJourneysByUser)
        res.render("profile/show.hbs", {loggedInUser, allJourneysByUser, style: "profile.css" });
        

    })
 
  // console.log(`this is the`,loggedInUser)
  });



  router.post('/journey/:journeyId/delete', (req, res, next) => {
    const {journeyId}= req.params
   // console.log(journeyId);
  //const journeyIdInfo=  req.params.journeyId
  //console.log(`this is the`,journeyId)
   Journey.findByIdAndDelete(journeyId)
        .then(() => {
            res.redirect('/profile');
        })
        .catch(err => {
            next(err);
        })
        
     //  console.log(`test`);
});




/*
router.get('/journey/:journeyId/edit', (req, res, next) => {
  const { journeyId } = req.params;
 
  Journey.findById(journeyId)
    .then(bookToEdit => {
      console.log(journeyToEdit);
    })
    .catch(error => next(error));
});
*/

/*




  router.get('/', (req, res) => {
    res.render('show')
})
*/

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



/*
let accessCount = 0

function counter() {
    // the middleware always returns a request handler
    return (req, res, next) => {
        // 
        accessCount++
        console.log(accessCount)
        // now we proceed as intended
        next();
    }
}


// this registers a middleware globally (for all the routes)
router.use(counter())
*/

// this is how you add a middleware to one route

/*

router.post('/login', (req, res) => {
    // access the request body
    // const username = req.body.username
    // const password = req.body.password
    const { username } = req.body
    console.log(req.body)
    res.render('profile', { username: username })
})

*/
module.exports = router;
