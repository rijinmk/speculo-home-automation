var express = require('express');
var bodyParser = require('body-parser');

const PORT = 3000;
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('assets'));

// Index Page
app.use('/', function(req, res) {
	res.render('index');
});

app.listen(PORT, function() {
	console.log(`Listening to port ${PORT}`);
});
