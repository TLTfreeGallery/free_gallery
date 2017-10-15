const noteRoutes = require('./user_routes');
module.exports = function(app, db) {
	noteRoutes(app, db);
};