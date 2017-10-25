const isEmpty = require('lodash/isEmpty');
const SHA256 = require("crypto-js/sha256");

module.exports = {
	add: function (params, callback, db) {
		db.collection('user').findOne({name: params.name}, function (err, db_res) {
			if (isEmpty(db_res)) {
				var errors = {};
				if (isEmpty(params.name)) {
					errors.name = 'Введите никнейм';
				}
				if (isEmpty(params.firstname)) {
					errors.firstname = 'Введите имя';
				}
				if (isEmpty(params.lastname)) {
					errors.lastname = 'Введите фамилию';
				}
				if (isEmpty(params.password)) {
					errors.password = 'Введите пароль';
				}
				
				if (isEmpty(errors)) {
					var user = {
						name: params.name,
						firstname: params.firstname,
						lastname: params.lastname,
						password: SHA256(params.password).toString(),
						profession: params.profession,
						remember_me: params.remember_me
					};
					db.collection('user').insert(user, function (err, db_res) {
						if (isEmpty(db_res)) {
							callback({status: 'error'});
						} else {
							callback({status: 'success', user: {
									name: user.name,
									firstname: user.firstname,
									lastname: user.lastname,
									profession: user.profession,
									remember_me: user.remember_me
								}
							});
						}
					});
				} else {
					callback({status: 'error', errors: errors});
				}
			} else {
				callback({status: 'error', errors: {name: 'Никнейм занят'}});
			}
		});
	},
	get: function (params, callback, db) {
		db.collection('user').findOne({
			name: params.name
		}, function (err, db_res) {
			if (!isEmpty(db_res)) {
				var user = {
					name: db_res.name,
					firstname: db_res.firstname,
					lastname: db_res.lastname,
					profession: db_res.profession,
					remember_me: db_res.remember_me,
				};
				callback({status: 'success', user: user});
			} else {
				callback({status: 'error'});
			}
		});
	},
	auth: function (params, callback, db) {
		db.collection('user').findOne({
			name: params.name,
			password: SHA256(params.password).toString()
		}, function (err, db_res) {
			if (!isEmpty(db_res)) {
				var user = {
					name: db_res.name,
					firstname: db_res.firstname,
					lastname: db_res.lastname,
					profession: db_res.profession,
					remember_me: db_res.remember_me,
				};
				callback({status: 'success', user: user});
			} else {
				callback({status: 'error'});
			}
		});
	}
}