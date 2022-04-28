const router = require("express").Router();
const Journey = require('../models/Journey');
const User = require("../models/User");




router.get("/journey/add", (req, res, next) => {
    res.render("journey/add.hbs");
  });

  router.get('/profile/:id', (req, res, next) => {
    // console.log('books id')
    const id = req.params.id
    //console.log(`this is a test`, req.params.id)
    //console.log(id);
    Journey.findById(id)
    //console.log(`this is a test`,User.findById(id))
      .then(TravelDataFromDB => {
       // console.log(`This nice little Data `, TravelDataFromDB)
        res.render('profile/show', { travel: movieDataFromDB })
      })
      .catch(err => {
        next(err)
      })
  });

 
  

  router.post('/journey/add', (req, res, next) => {
    const loggedInUser = req.session.user._id
    //console.log(req.session.user);
    const {destination, startDate, endDate, description} = req.body
console.log(req.body);
   // const {description} = req.body
   // console.log(`bla `,req.body)
      Journey.create({destination, startDate,endDate,description, owner: loggedInUser})
              .then((createdJourney) => {
                 // User.findByIdAndUpdate(loggedInUser,{description}).then(() => 
                  res.redirect('/profile')
                //  console.log(`New profile info created: ${destination}.`)
  })
              .catch(error => next(error));
    //console.log(req.body)
  
              
              
  });

/*
  router.post('/:travelId', (req, res, next) => {
    const { travelId } = req.params.id;
    console.log(`this is the `, req.params.id);
   
    Journey.findByIdAndRemove(travelId)
      .then(() => res.redirect('/profile'))
      .catch(error => next(error));
  });

*/
  
  

  module.exports = router;
