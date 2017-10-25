const express = require('express');
const MongoClient = require('mongodb').MongoClient;
//const bodyParser = require('body-parser');
const db = require('./config/db');
const session = require('express-session');
const app = express();
const port = 8000;

//app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
	secret: 'verysecurecode',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true }
}));

MongoClient.connect(db.url, (err, database) => {
	if (err) return console.log(err);
	require('./app/routes')(app, database);
	app.listen(port, () => {
		console.log('We are live on ' + port);
	});               
});
