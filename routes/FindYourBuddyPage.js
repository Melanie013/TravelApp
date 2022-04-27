const express = require('express');
const router = express.Router();
const Journey = require('../models/Journey');
const User = require("../models/User.model");

// find all users with same travel destination and date and show them on a different page 



router.get('/findBuddy/:id', (req, res, next) => {
    const journeyId = req.params.id
    console.log(`show me the freaking`,'Id', journeyId)
    Journey.findById(journeyId)
    .then(usersJourney => {
        const {destination, startDate, endDate, owner} = usersJourney
        console.log('ziel', destination)
        Journey.find({destination: destination, startDate: startDate, endDate: endDate, owner: { $ne: owner } } )
            .then(journeysFromDb => {
            //console.log('journey', journeysFromDb)
            //console.log('journey', journeysFromDb)
              res.render('buddyPage', {journeys : journeysFromDb });
                console.log('Hallo', { journeysFromDb })
           
        }) 
        })
        
        .catch(err => {
            next(err)
          })
    }) 














module.exports = router;



