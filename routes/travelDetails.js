const router = require("express").Router();
const Journey = require('../models/Journey')




router.get("/journey", (req, res, next) => {
    res.render("journey/info.hbs");
  });

 
  

  router.post('/journey/info', (req, res, next) => {
    const {destination, startDate, endDate } = req.body
    console.log(req.body)
  
              Journey.create({destination, startDate,endDate})
              .then((createdJourney) => {
                  res.redirect('/profile')
                  console.log(`New profile info created: ${createdJourney}.`)
              })
              .catch(error => next(error));
              
  });
  

  module.exports = router;
