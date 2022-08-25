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


/***
 * Get /explore-latest
 * Explore Latest Page
 */
 exports.exploreLatest = async (req, res) => {
    try {
        const limitNumber = 20;
        const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
        
        res.render('explore-latest', { title: 'Explore Latest | Cooking Blog', recipe });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

/***
 * Get /explore-random
 * Explore Random Page
 */
 exports.exploreRandom = async (req, res) => {
    try {
        let count = await Recipe.find({}).countDocuments();
        let random = Math.floor(Math.random() * count);
        let recipe = await Recipe.findOne().skip(random).exec();
        
        res.render('explore-random', { title: 'Explore Random | Cooking Blog', recipe });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

/***
 * Get /submit-recipe
 * Submit Recipe Page
 */
 exports.submitRecipe = async (req, res) => {
    try {
        res.render('submit-recipe', { title: 'Submit Recipe | Cooking Blog' });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

/***
 * Post /submit-recipe
 * Submit Recipe
 */
 exports.submitRecipeOnPost = async (req, res) => {
    res.redirect('submit-recipe');
}

