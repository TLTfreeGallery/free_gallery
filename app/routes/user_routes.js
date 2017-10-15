module.exports = function(app, db) {
	app.get('/user/add', (req, res) => {
		var req;
		db.collection('user').findOne({name: req.query.name}, function (err, db_res) {
			if (!db_res) {
				var errors = {};
				if (!req.query.name) {
					errors.name = 'Введите логин';
				}
				if (!req.query.firstname) {
					errors.firstname = 'Введите имя';
				}
				if (!req.query.lastname) {
					errors.lastname = 'Введите фамилию';
				}
				if (!req.query.password) {
					errors.password = 'Введите пароль';
				}
				if (!req.query.confirm_password) {
					errors.confirm_password = 'Введите подтверждение пароля';
				}
				if (req.query.password != req.query.confirm_password) {
					errors.password = 'Пароли не совпадают';
				}
				
				if (!errors) {
					db.collection('user').insert({
						name: req.query.name,
						firstname: req.query.firstname,
						lastname: req.query.lastname,
						password: req.query.password,
						profession: req.query.profession,
						rememver_me: req.query.remember_me
					}, function (err, db_res) {
						
						res.send({status: 'success'});
					});
				} else {
					res.send({status: 'error', errors: errors});
				}
			} else {
				res.send({status: 'error', errors: {name: 'Никнейм занят'}});
			}
		});
		
	});
}