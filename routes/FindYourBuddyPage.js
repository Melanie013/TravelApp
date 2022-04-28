const express = require('express');
const router = express.Router();
const Journey = require('../models/Journey');
const User = require("../models/User");

// find all users with same travel destination and date and show them on a different page 





router.get('/findBuddy/:id', (req, res, next) => {
    const journeyId = req.params.id
   // console.log(`show me the freaking`,'Id', journeyId)
    Journey.findById(journeyId)
    .then(usersJourney => {
        const {destination, startDate, endDate, owner} = usersJourney
        console.log(usersJourney)
        //console.log('ziel', destination)
        
        Journey.find({destination: destination, startDate: startDate, endDate: endDate, owner: { $ne: owner } } )
            .populate('owner')
            .then(journeysFromDb => {

                console.log('Hallo', { journeysFromDb })
            //console.log('journey', journeysFromDb)
              res.render('buddyPage', {journeys : journeysFromDb });
           
        }) 
        })
        
        .catch(err => {
            next(err)
          })
    }) 


    // routes/book.routes.js
// ... no changes before the following block of code

// GET route to retrieve and display details of a specific book
router.get('/findBuddy/:UserId', (req, res) => {
    const { UserId } = req.params;
    console.log('The ID from the URL is: ', UserId);
  
    res.render('buddyPage.hbs');
  });  












module.exports = router;



