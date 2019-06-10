var onScreen = database.ref('onScreen');

// ALL WIDGETS
function mw_time___GEN() {
	let html = `
	<div class="mw_time mws">
		<iframe src="/widget/time/clock.html">
	</div>`;
	return html;
}

function mw_weather___GEN() {
	let html = `
	<div class="mw_weather mws">
		<iframe src="/widget/weather/weather.html">
	</div>`;
	return html;
}

function mw_date___GEN() {
	let html = `
		<div class="mw_date mws">
			<iframe src="/widget/traffic/traffic.html">
		</div>`;
	return html;
}

function mw_cal___GEN() {
	let html = `
	<div class="mw_cal mws">
		<iframe src="/widget/quote/quote.html">
	</div>`;
	return html;
}

function mw_todo___GEN() {
	let html = `
	<div class="mw_todo mws">
		<iframe src="/widget/todo/todo.html">
	</div>`;
	return html;
}

function mw_news___GEN() {
	let html = `<div class="mw_news mws">mw_news</div>`;
	return html;
}
// ---------
onScreen.on('value', function(data) {
	var v = data.val();
	let mw_left = v.mw_left;
	let mw_right = v.mw_right;
	$('.mw_shell').html('');
	for (var i in mw_left) {
		if (mw_left[i]) {
			console.log(`${i}___GEN()`);
			$('.mw_left').append(eval(`${i}___GEN()`));
		}
	}
	for (var i in mw_right) {
		if (mw_right[i]) {
			console.log(`${i}___GEN()`);
			$('.mw_right').append(eval(`${i}___GEN()`));
		}
	}
});
