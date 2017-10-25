const userModel = require('../models/user');

module.exports = function (app, db) {
	app.get('/user/add', (req, res) => {
		userModel.add(req.query, (result) => { res.send(result); }, db);
	});
	
	app.get('/user/get', (req, res) => {
		userModel.get(req.query, (result) => { res.send(result); }, db);
	});
	
	app.get('/user/auth', (req, res) => {
		userModel.auth(req.query, (result) => { res.send(result); }, db);
	});
}
