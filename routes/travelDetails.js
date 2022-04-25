const router = require("express").Router();



router.get("/journey", (req, res, next) => {
    res.render("journey/info.hbs");
  });
  

  router.post('/journey/info', (req, res, next) => {
    const {destination, date} = req.body
    console.log(req.body)
  
              Journey.create({destination, date})
              .then((createdJourney) => {
                  res.redirect('/profile')
                  console.log(`New profile info created: ${createdJourney}.`)
              })
              .catch(error => next(error));
              
  });
  

  module.exports = router;
