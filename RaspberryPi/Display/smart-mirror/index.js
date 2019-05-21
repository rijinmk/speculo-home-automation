let express = require('express');
let app = express();
let PORT = process.env.PORT || 3001;

app.use(express.static('public'));

app.listen(PORT, function() {
	console.log(`Listening to PORT ${PORT}`);
});
