var express = require('express');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var request = require('request');
var passport = require('passport');
var User = require('./models/users');
var fs = require('fs');

const PORT = process.env.PORT || 3011;
const IP_OF_NODEMCU = 'http://172.17.96.65';
var app = express();

// Firebase for WAN
let firebase = require('firebase');
let firebaseAdmin = require('firebase-admin');
let url = require('url');
// Initialize Firebase
let config = {
	apiKey: 'AIzaSyDBwvxDTX5rrC-hc9U5SmJ_mpR42dIFrg8',
	authDomain: 'speculo-home-automation.firebaseapp.com',
	databaseURL: 'https://speculo-home-automation.firebaseio.com',
	projectId: 'speculo-home-automation',
	storageBucket: 'speculo-home-automation.appspot.com',
	messagingSenderId: '923086343168'
};
firebase.initializeApp(config);
if (process.env.WAN) {
	console.log('WAN MODE');
	let database = firebase.database().ref('/WANCommand');
	database.on('value', function(data) {
		let currCommand = data.val().command;
		request(`${IP_OF_NODEMCU + currCommand}`, { json: false }, (err, res, body) => {
			if (err) {
				return console.log(err);
			}
		});
	});
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('assets'));
app.set('view engine', 'ejs');

// DE/SE Useer
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	done(null, id);
});

// Cookie Session
app.use(
	cookieSession({
		name: 'session',
		keys: [ 'key1', 'key2' ]
	})
);

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Routing
// Index Page
app.get('/', function(req, res) {
	res.redirect('/login');
});

// Login Page - GET
app.get('/login', function(req, res) {
	if (req.user) {
		res.redirect(req.user + '/home/');
	} else {
		res.render('login');
	}
});

// Login Page - POST
app.post('/login', function(req, res) {
	console.log(req.body);
	User.findOne({ username: req.body.username }, function(err, data) {
		if (!err) {
			if (data) {
				if (req.body.password === data.password) {
					req.login(data, function(_err) {
						console.log('REQ USER-->' + req.user);
						res.redirect(data.username + '/home/');
					});
				} else {
					res.render('login', { error: 'Password is not right.' });
				}
			} else {
				res.render('login', { error: "Username doesn't exist." });
			}
		}
	});
});

// Scan Page
app.get('/scan', function(req, res) {
	res.render('scan');
});

// Register Page - GET
app.get('/register', function(req, res) {
	if (req.user) {
		res.redirect('/home');
	} else {
		res.render('register');
	}
});

// Register Page - POST
app.post('/register', function(req, res) {
	console.log(req.body);
	User.create(req.body, (err, data) => {
		if (!err) {
			console.log(data);
			res.redirect(data.username + '/home/');
		} else {
			res.send(err);
		}
	});
});

// Home Page
app.get('/:usermame/home', function(req, res) {
	if (req.user) {
		User.findById(req.user, function(err, data) {
			console.log(data);
			res.render('home', data);
		});
	} else {
		res.redirect('/login');
	}
});

// Inner Room
app.get('/:usermame/home/:room', function(req, res) {
	if (req.user) {
		User.findById(req.user, function(err, data) {
			data.room = req.params.room;
			res.render(req.params.room, data);
		});
	} else {
		res.redirect('/login');
	}
});

// Logout
app.get('/logout', function(req, res) {
	req.logout();
	firebase.database().ref('mirror').set({ login: 0 });
	res.redirect('/login');
});

// Only Mobile
app.get('/onlyMobile', function(req, res) {
	res.render('onlyMobile');
});

// Get temprature data and add it to the db.json
function handleTempData() {
	request(`${IP_OF_NODEMCU}/getTemprature`, { json: true }, (err, res, body) => {
		if (err) {
			return console.log(err);
		}
		let tempObj = {
			temprature: body,
			time: new Date().getTime()
		};
		console.log(tempObj);
		fs.readFile('./datastore/db.json', 'utf8', function(err, data) {
			let obj = JSON.parse(data);
			obj['rijinmk']['rooms']['bedroom']['temperature'].push(tempObj);
			fs.writeFileSync('./datastore/db.json', JSON.stringify(obj));
		});
	});
}

setInterval(handleTempData, 1000 * 60 * 30);

// Getting sensor data, test
// app.get('/get_sensor_data', function(req, res) {
// 	req.query.date = new Date().getTime();
// 	var data = req.query;
// 	var json = JSON.stringify(data);
// 	fs.writeFile('temp.json', json, 'utf8', function() {});
// 	res.send('Got the data!');
// });

// app.get('/read_sensor_data', function(req, res) {
// 	fs.readFile('temp.json', 'utf8', function(err, data) {
// 		var obj = JSON.parse(data);
// 		res.send(obj);
// 	});
// });

// ------------------

app.listen(PORT, function() {
	console.log(`Listening to port ${PORT}`);
});
