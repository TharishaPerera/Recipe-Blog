require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');

/***
 * Get /
 * Home Page
 */
exports.homepage = async (req, res) => {
    try {
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
        const thai = await Recipe.find({ 'category': 'Thai' }).limit(limitNumber);
        const american = await Recipe.find({ 'category': 'American' }).limit(limitNumber);
        const chinese = await Recipe.find({ 'category': 'Chinese' }).limit(limitNumber);

        const food = { latest, thai, american, chinese };

        res.render('index', { title: 'Home | Cooking Blog', categories, food });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

/***
 * Get /recipe/:id
 * Recipe Page
 */
exports.exploreRecipe = async (req, res) => {
    try {
        let recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);

        res.render('recipe', { title: 'Recipe | Cooking Blog', recipe });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

/***
 * Get /categories
 * Categories Page
 */
exports.exploreCategories = async (req, res) => {
    try {
        const limitNumber = 20;
        const categories = await Category.find({}).limit(limitNumber);

        res.render('categories', { title: 'Categories | Cooking Blog', categories });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

/***
 * Get /categories/:id
 * Categories By ID Page
 */
exports.exploreCategoriesById = async (req, res) => {
    try {
        let categoryId = req.params.id;

        const limitNumber = 20;
        const categoryById = await Recipe.find({ 'category': categoryId }).limit(limitNumber);

        res.render('categories', { title: 'Categories | Cooking Blog', categoryById });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

/***
 * Post /search
 * Search By Name
 */
exports.searchRecipe = async (req, res) => {
    try {
        // Search term
        let searchTerm = req.body.searchTerm;
        let recipe = await Recipe.find({ $text: { $search: searchTerm, $diacriticSensitive: true } });
        
        res.render('search', { title: 'Search | Cooking Blog', recipe });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}
