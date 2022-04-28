const router = require("express").Router();
const express = require('express')
const hbs = require('hbs');
const Journey = require("../models/Journey");


const User = require('../models/User')

router.get('/buddyProfile', (req, res, next) => {
    const journeyId = req.params.id
    console.log(`show me the freaking`,'Id', journeyId)
    Journey.findById(journeyId)
    .then(travelBuddy => {
        const {destination, startDate, endDate, owner} = travelBuddy
        console.log('ziel', destination)
        Journey.find({destination: destination, startDate: startDate, endDate: endDate, owner: { $ne: owner } } )
           // .populate('owner')
            .then(journeysFromDb => {

               // console.log('Hallo', { journeysFromDb })
            console.log('journey', journeysFromDb)
              res.render('buddyProfile', {journeys : journeysFromDb });
           
        }) 
        })
        
        .catch(err => {
            next(err)
          })
    }) 



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
