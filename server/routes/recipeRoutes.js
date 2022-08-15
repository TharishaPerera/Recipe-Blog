const express = require('express');
const Router = express.Router();
const recipeControler = require('../controllers/recipeController');

/***
 *  App Routes
 */

Router.get('/', recipeControler.homepage);
Router.get('/categories', recipeControler.exploreCategories);
Router.get('/recipe/:id', recipeControler.exploreRecipe);




module.exports = Router;