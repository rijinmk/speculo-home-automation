let express = require('express');
let fs = require('fs');

let app = express();

app.listen(80, function() {
	console.log('Listening to at PORT 80');
});
