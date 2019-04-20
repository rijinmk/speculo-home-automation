const IP_OF_NODEMCU = 'http://192.168.1.9';

// GET CURRENT STATUS OF ALL THE APPLIANCES
// LIGHT 1
$.get(IP_OF_NODEMCU + '/light/1/status', function(data) {
	var data = parseInt(data) ? true : false;
	$('#light_1').prop('checked', data);
});

// LIGHT 2
$.get(IP_OF_NODEMCU + '/light/2/status', function(data) {
	var data = parseInt(data) ? true : false;
	$('#light_2').prop('checked', data);
});

// AC
$.get(IP_OF_NODEMCU + '/ac/1/status', function(data) {
	var data = parseInt(data) ? true : false;
	$('#ac_1').prop('checked', data);
});

// TURN ON AND OFF THE APPLIANCES (CHECKBOX)
$('.switch input[type=checkbox]').on('change', function() {
	var stat = $(this).is(':checked') ? 'on' : 'off';
	var link = $(this).attr('data-href');
	$.get(IP_OF_NODEMCU + link + stat);
	database.ref('/WANCommand').set({ command: link + stat });
	console.log(IP_OF_NODEMCU + link + stat);
});

// TURN ON AND OFF THE APPLIANCES (LINK)
$('.icon-controller input[type=checkbox]').on('click', function() {
	var stat = $(this).is(':checked') ? 'on' : 'off';
	var link = $(this).attr('data-href');
	$(this).parent().toggleClass('on');
	$.get(IP_OF_NODEMCU + link + stat);
	database.ref('/WANCommand').set({ command: link + stat });
	console.log(IP_OF_NODEMCU + link + stat);
});

// SET AC TIME
$('#set_ac_time').click(function() {
	var startTime = $('#start_time').val();
	var endTime = $('#end_time').val();
	var URL = IP_OF_NODEMCU + '/ac/1/sch?time=' + startTime + '-' + endTime;
	database.ref('/WANCommand').set({ command: '/ac/1/sch?time=' + startTime + '-' + endTime });
	console.log(URL);
	$.get(URL);
});

// GET THE TEMPRATURE DATA FROM SENSOR
function showTemprature() {
	$.get(IP_OF_NODEMCU + '/getTemprature', function(data) {
		// console.log(data);
		$('#room_temp').text(data);
	});
}
setInterval(showTemprature, 1000);
