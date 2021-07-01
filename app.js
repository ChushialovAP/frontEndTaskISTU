const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const user = require("./routes/user");
const film = require("./routes/film");
const InitiateMongoServer = require("./config/db");

const ejs = require('ejs');

// Initiate Mongo Server
InitiateMongoServer();

// PORT
const PORT = process.env.PORT || 4000;

// Initialise Express
var app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Render static files
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Router Middleware
 * Router - /u*
 * Method - *
 */
app.use("/", user);

app.use("/film", film);

// Set the view engine to ejs
app.set('view engine', 'ejs');
// Port website will run on
app.listen(PORT, (req, res) => {
    console.log(`Server Started at PORT ${PORT}`);
});

// *** GET Routes - display pages ***
// Root Route
app.get('/', function(req, res) {
    res.render('pages/index');
});