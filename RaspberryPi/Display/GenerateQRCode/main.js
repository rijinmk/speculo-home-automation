var baseurl = 'https://speculo-home-automation.herokuapp.com/login';

var qrcode = new QRCode('qrcode', {
	width: 128,
	height: 128,
	colorDark: '#fff',
	colorLight: '#000',
	correctLevel: QRCode.CorrectLevel.H
});

qrcode.makeCode(baseurl);
