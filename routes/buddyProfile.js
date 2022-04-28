const router = require("express").Router();
const express = require('express')
const hbs = require('hbs');
const { populate } = require("../models/Journey");
const Journey = require("../models/Journey");


const User = require('../models/User')

router.get('/buddyProfile/:id', (req, res) => {
    const buddyId = req.params.id
    Journey.findOne({_id: buddyId})
    .populate('owner')
    .then(theBuddy => res.render('buddyProfile.hbs',{details: theBuddy } ));
   
});



  module.exports = router;
  
/*
router.get('/buddyProfile', (req, res, next) => {
    User.findOne({username:username})
    .then(allTheBooksFromDB => {
      // -> allTheBooksFromDB is a placeholder, it can be any word
      console.log('Retrieved books from DB:', allTheBooksFromDB);
 
      res.render('buddyProfile');
    })
    .catch(error => {
      console.log('Error while getting the books from the DB: ', error);
 
      // Call the error-middleware to display the error page to the user
      next(error);
    });
});
*/
/*

router.get('/findBuddy/:id', (req, res, next) => {
    const journeyId = req.params.id
    console.log(`show me the freaking`,'Id', journeyId)
    Journey.findById(journeyId)
    .then(usersJourney => {
        const {destination, startDate, endDate, owner} = usersJourney
        console.log('ziel', destination)
        Journey.find({destination: destination, startDate: startDate, endDate: endDate, owner: { $ne: owner } } )
            .populate('owner')
            .then(journeysFromDb => {

               // console.log('Hallo', { journeysFromDb })
            console.log('journey', journeysFromDb)
              res.render('buddyPage', {journeys : journeysFromDb });
           
        }) 
        })
        
        .catch(err => {
            next(err)
          })
    }) 
*/


module.exports = router;
