let express = require('express');
let fs = require('fs');
let cors = require('cors');

let app = express();

app.use(cors({origin: true}));

// ROUTE - /allowed_np?q=123,123
app.get('/allowed_np', function(req, res) {
	// Open file /garage_info/allowed_np.txt and re-write file with q
	let q = req.query.q;
	fs.writeFile(__dirname + '/garage_info/allowed_np.txt', req.query.q, function(err) {
		if (err) {
			res.send(err);
		}
		res.send('The file was saved!');
	});
});

// ROUTE - /get_nps
app.get('/get_nps', function(req, res) {
	// Send a response with the allowed np
	const content = fs.readFileSync(__dirname + '/garage_info/allowed_np.txt', 'utf8');
	res.send(content);
});

// ROUTE - /garage_door_state?q=0
app.get('/garage_door_state', function(req, res) {
	// Open file garage_info/garage_door_state.txt and re-write file with q
	let q = req.query.q;
	fs.writeFile(__dirname + '/garage_info/garage_door_state.txt', req.query.q, function(err) {
		if (err) {
			res.send(err);
		}
		res.send('The file was saved!');
	});
});

// ROUTE - /get_last_image
app.get('/get_last_image', function(req, res) {
	// Send a response file: number_plate.jpg
	res.send('NO IMAGE');
});

app.listen(80, function() {
	console.log('Listening to at PORT 80');
});
