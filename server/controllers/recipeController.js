/***
 * Get /
 * Home Page
 */
exports.homepage = async (req, res) => {
    res.render('index', { title: 'Home | Cooking Blog' });
}