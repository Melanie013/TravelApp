const router = require("express").Router();


const loginCheck = () => {
  return (req, res, next) => {

    if (req.session.user) {

      next()
    } else {
      res.redirect('/login')
    }
  }
}


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index", {
    style: "index.css"
  });
});


/*
router.get('/profile', loginCheck(), (req, res, next) => {

  res.cookie('myCookie', 'hello server')
  console.log('this is my cookie: ', req.cookies)

  const loggedInUser = req.session.user
  console.log(loggedInUser)
  res.render('profile/show.hbs', { user: loggedInUser })
});

*/



module.exports = router;
