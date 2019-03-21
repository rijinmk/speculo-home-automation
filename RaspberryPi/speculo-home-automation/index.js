var express = require('express');
var bodyParser = require('body-parser');

const PORT = process.env.PORT || 3010;
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('assets'));
app.set('view engine', 'ejs');

// Routing
// Index Page
app.get('/', function(req, res) {
	res.render('index');
});

// Index Page
app.get('/scan', function(req, res) {
	res.render('scan');
});

// Login Page
app.get('/login', function(req, res) {
	res.render('login');
});

// Register Page
app.get('/register', function(req, res) {
	res.render('register');
});

// Home Page
app.get('/home', function(req, res) {
	res.render('home');
});
// ------------------

app.listen(PORT, function() {
	console.log(`Listening to port ${PORT}`);
});
