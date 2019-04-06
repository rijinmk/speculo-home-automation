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

// MIRROR WIDGET
function mw_list_constructor(id) {
	let _id = $(`#${id}`);
	let i = _id.attr('data-icon');
	let name = $(`#${id} span`).text();
	let __id = _id.attr('data-id');
	let html = `
		<li id="${__id}">
			<div>
				<i class="${i}"></i>
				<span>${name}</span> 
			</div>

		</li>
	`;
	return html;
}

$('.mirror_feature_outer .mw_option_holder .mw_options').draggable({
	revert: true
});

$('.mirror_feature_outer .mw_display .mw_left #mw_left_list').droppable({
	drop: function(event, ui) {
		$('#mw_left_list').append(mw_list_constructor(ui.draggable[0].id));
		$(`#${ui.draggable[0].id}`).slideUp();
	}
});

$('.mirror_feature_outer .mw_display .mw_right #mw_right_list').droppable({
	drop: function(event, ui) {
		$('#mw_right_list').append(mw_list_constructor(ui.draggable[0].id));
		$(`#${ui.draggable[0].id}`).slideUp();
	}
});
