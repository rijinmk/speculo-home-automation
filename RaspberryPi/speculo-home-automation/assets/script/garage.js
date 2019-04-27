const IP_GARAGE_RASP = 'http://192.168.1.15';

// TURN ON AND OFF THE APPLIANCES (CHECKBOX)
$('.switch input[type=checkbox]').on('change', function() {
	var stat = $(this).is(':checked') ? 1 : 0;
	var link = $(this).attr('data-href');
	console.log(IP_GARAGE_RASP + link + stat);
	$.get(IP_GARAGE_RASP + link + stat);
	if (!stat) {
		$('.icon svg').attr('class', 'fa fa-door-closed');
	} else {
		$('.icon svg').attr('class', 'fa fa-door-open');
	}
});

$('#set_np').click(function() {
	let n1 = $('#n1').val().replace(/\s/g, '');
	let n2 = $('#n2').val().replace(/\s/g, '');
	let n3 = $('#n3').val().replace(/\s/g, '');
	let n123 = `${n1},${n2},${n3}`;
	$.get(IP_GARAGE_RASP + '/allowed_np?q=' + n123);

	$.get(`${IP_GARAGE_RASP}/get_nps`, function(data) {
		let nps = data.split(',');
		$('#garage ul').html('');
		for (var i = 0; i < nps.length; i++) {
			$('#garage ul').append(`<li>${nps[i]}</li>`);
		}
	});

	$('.np_inp').val('');
});

$(document).ready(function() {
	console.log(`${IP_GARAGE_RASP}/get_nps`);
	$.get(`${IP_GARAGE_RASP}/get_nps`, function(data) {
		let nps = data.split(',');
		console.log(nps);
		for (var i = 0; i < nps.length; i++) {
			$('#garage ul').append(`<li>${nps[i]}</li>`);
		}
	});
});
