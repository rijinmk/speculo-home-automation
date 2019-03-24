var express = require('express');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var passport = require('passport');
var User = require('./models/users');

const PORT = process.env.PORT || 3010;
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('assets'));
app.set('view engine', 'ejs');

// DE/SE Useer
passport.serializeUser(function(user, done) {
	console.log('--SER--');
	console.log(user.id);
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	console.log('--DESER--');
	console.log(id);
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
	res.render('index');
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
			console.log(req.params);
			data.room = req.params.room;
			res.render('room', data);
		});
	} else {
		res.redirect('/login');
	}
});

// Logout
app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/login');
});

// Only Mobile
app.get('/onlyMobile', function(req, res) {
	res.render('onlyMobile');
});

// Getting sensor data, test
app.get('/get_sensor_data', function(req, res) {
	req.query.date = new Date().getTime();
	console.log(req.query);
	res.json(req.query);
});

// ------------------

app.listen(PORT, function() {
	console.log(`Listening to port ${PORT}`);
});
