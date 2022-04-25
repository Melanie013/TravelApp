const router = require("express").Router();



router.get("/profile", (req, res, next) => {
    res.render("profile/show.hbs");
  });
  
  

  module.exports = router;
