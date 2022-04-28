
const router = require("express").Router();
const express = require('express')
const hbs = require('hbs');
const Journey = require("../models/Journey");


const User = require('../models/User')


router.get("/myDescription", (req, res, next) => {
	console.log(`wanna know it this route works`);
    res.render("profile/myDescription.hbs");
  });


module.exports = router;
