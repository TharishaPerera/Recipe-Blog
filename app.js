// imports
const express = require('express');
const expressLayouts = require('express-ejs-layouts');

// require env
require('dotenv').config();

// initialize express application
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressLayouts);

// set layouts
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// use routes
const routes = require('./server/routes/recipeRoutes.js');
app.use('/', routes);

// listen to port
app.listen(port, () => console.log(`http://localhost:${port}`));