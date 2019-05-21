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
	bind_these();
	let html = `
		<li class="selected_widget" data-name="${name}" data-icon="${i}" id="${__id}">
			<div>
				<i class="${i}"></i>
				<span>${name}</span> 
			</div>
		</li>
	`;
	return html;
}

function mw_option_constructor(id) {
	$(`#${id}`).slideUp();
	let i = $(`#${id}`).attr('data-icon');
	let name = $(`#${id}`).attr('data-name');
	let html = `
		<div id="mw_${id}" data-id="${id}" data-icon="fa fa-list" class="mw_options">
			<i class="${i}"></i>
			<span>${name}</span> 
		</div>
	`;
	return html;
}

function bind_draggable_widget() {
	$('.mirror_feature_outer .mw_option_holder .mw_options').draggable({
		revert: true,
		distance: 0
	});
}

$('.mw_options').hover(function() {
	$('.mw_options').css('z-index', '0');
	$(this).css('z-index', '999');
});

bind_draggable_widget();

// DRAG AND DROP WITH FIREBASE

function objectify_widget() {
	return {
		mw_time: false,
		mw_weather: false,
		mw_date: false,
		mw_cal: false,
		mw_todo: false,
		mw_news: false
	};
}

let onScreen = database.ref('onScreen');
let mw_left = objectify_widget();
let mw_right = objectify_widget();
$('.mirror_feature_outer .mw_display .mw_left #mw_left_list').droppable({
	drop: function(event, ui) {
		console.log(ui.draggable[0].id);
		$('#mw_left_list').append(mw_list_constructor(ui.draggable[0].id));
		$(`#${ui.draggable[0].id}`).slideUp();
		mw_left[ui.draggable[0].id] = true;
		onScreen.child('mw_left').set(mw_left);
	}
});

$('.mirror_feature_outer .mw_display .mw_right #mw_right_list').droppable({
	drop: function(event, ui) {
		console.log(ui.draggable[0].id);
		$('#mw_right_list').append(mw_list_constructor(ui.draggable[0].id));
		$(`#${ui.draggable[0].id}`).slideUp();
		mw_right[ui.draggable[0].id] = true;
		onScreen.child('mw_right').set(mw_right);
	}
});

$('#reset_widgets').click(function() {
	let mw_left = objectify_widget();
	let mw_right = objectify_widget();
	onScreen.child('mw_left').set(mw_left);
	onScreen.child('mw_right').set(mw_right);
});

$(document).ready(function() {
	onScreen.once('value', function(data) {
		var _o = data.val();
		console.log(_o);
		var mw_left = _o.mw_left;
		var mw_right = _o.mw_right;

		for (var i in mw_right) {
			if (mw_right[i]) {
				$(`#${i}`).hide();
				$('#mw_right_list').append(mw_list_constructor(i));
			}
		}
		for (var i in mw_left) {
			if (mw_left[i]) {
				$(`#${i}`).hide();
				$('#mw_left_list').append(mw_list_constructor(i));
			}
		}
	});
});

let c = 0;
function bind_these() {
	// TODO Edit functionality
	$('#todo').click(function() {
		if (c === 0) {
			$('#todo_edit_outer').fadeIn();
			c++;
		}
		console.log('c==>' + c);
	});
}

$('.close_todo_edit_outer').click(function() {
	$('#todo_edit_outer').fadeOut();
	c = 0;
});
