$('#tabs_header > .tab_button').click(function() {
	$('#tabs_header > .tab_button').removeClass('active');
	$(this).addClass('active');

	$('._content_container').slideUp();
	var _id = $(this).attr('id');
	_id = _id.split('_');
	_id = '#' + _id[0] + '_' + _id[1] + '_container';
	$(_id).slideDown();
});

$('#home_tab_container > #selection > .option').click(function() {
	$('#home_tab_container > #selection > .option').removeClass('active');
	$(this).addClass('active');

	$('.inner_container').slideUp();
	var _id = $(this).attr('id');
	_id = _id.split('_');
	_id = '#' + _id[0] + '_inner_container';
	$(_id).slideDown();
});
