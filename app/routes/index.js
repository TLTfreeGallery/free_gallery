const userRoutes = require('./user');
module.exports = function(app, db) {
	userRoutes(app, db);
};
