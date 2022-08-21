const express = require('express');
const Router = express.Router();
const recipeControler = require('../controllers/recipeController');

/***
 *  App Routes
 */

Router.get('/', recipeControler.homepage);
Router.get('/recipe/:id', recipeControler.exploreRecipe);
Router.get('/categories', recipeControler.exploreCategories);
Router.get('/categories/:id', recipeControler.exploreCategoriesById);
Router.post('/search', recipeControler.searchRecipe);


module.exports = Router;