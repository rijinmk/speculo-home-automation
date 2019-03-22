var mongoose = require('mongoose');
mongoose.connect('mongodb://rijinmk:password123@ds121636.mlab.com:21636/speculo-home-automation');

var Schema = mongoose.Schema({
	hname: String,
	yname: String,
	username: String,
	password: String,
	mnumber: String
});

var User = mongoose.model('user', Schema);

module.exports = User;
