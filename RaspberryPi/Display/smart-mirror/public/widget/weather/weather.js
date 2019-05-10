function weather() {
	var location = document.getElementById('location');
	navigator.geolocation.getCurrentPosition(success, error);
	console.log(error);
	function success(position) {
		console.log('Sucess');
		latitude = position.coords.latitude.toFixed(3);
		longitude = position.coords.longitude.toFixed(3);

		location.innerHTML = 'Latitude is ' + latitude + '° Longitude is ' + longitude + '°';
		api_url =
			'http://api.openweathermap.org/data/2.5/weather?lat=' +
			latitude +
			'&lon=' +
			longitude +
			'&units=metric&appid=e3dc6a578ff685b6f637f658476c492b';

		console.log(api_url);
		$.getJSON(api_url, function(data) {
			console.dir(data);
			$('#status').html('Description : ' + data.weather[0].description);
			$('#city').html(data.name);
			$('#temp').html('Temperature:' + data.main.temp + '° C');
			$('#icon').html(data.weather.icon);

			$('#visibility').html('Visibility: ' + data.visibility);
			$('#temp_min').html('Minimum Temperature: ' + data.main.temp_min + '° C');
			$('#temp_max').html('Maximum  Temperature: ' + data.main.temp_max + '° C');
			$('#humidity').html('Humidity: ' + data.main.humidity);
			$('#windspeed').html('Wind: ' + data.wind.speed);

			// RENDERING DATA
			$('.rtr-weather-location').text(`${data.name}, ${data.sys.country}`);
			$('.rtr-weather-desc').text(`${data.weather[0].description}`);
			$('.rtr-temp').html(`${parseInt(data.main.temp)} <span>°C</span> `);
			let icon_ = data.weather[0].description.split(' ');
			$('.rtr-weather-desc-icon').attr('src', `icons_edit/${icon_.join('_')}.svg`);
			$('.rtr-l').text(`${data.main.temp_min}`);
			$('.rtr-h').text(`${data.main.temp_max}`);
			$('.rtr-hum').text(`${data.main.humidity}`);
			$('.rtr-wind').text(`${data.wind.speed}`);
		});
	}

	function error() {
		location.innerHTML = 'Unable to retrieve your location';
	}

	location.innerHTML = 'Locating...';
}

weather();
