// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// app.js

// 1. require the body-parser
const bodyParser = require('body-parser');
// 2. let know your app you will be using it
app.use(bodyParser.urlencoded({ extended: true }));


// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const capitalized = require("./utils/capitalized");
const projectName = "TravelApp";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;


app.use(express.static('public'))


// session configuration

const session = require('express-session')
const MongoStore = require('connect-mongo')

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		cookie: { maxAge: 1000 * 60 * 60 * 24 },
		resave: true,
		saveUninitialized: true,
		store: MongoStore.create({
			mongoUrl: process.env.MONGODB_URI
		})
	})
)
// end of session configuration



// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

const auth = require("./routes/auth");
app.use("/", auth);

const profile = require("./routes/profile");
app.use("/", profile);

const journey = require("./routes/travelDetails");
app.use("/", journey);

const buddy = require("./routes/FindYourBuddyPage");
app.use("/", buddy);

const buddyProfile = require("./routes/buddyProfile");
app.use("/", buddyProfile);

const myDescription = require("./routes/descriptionForProfile");
app.use("/", myDescription);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
