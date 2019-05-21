var list = document.getElementById('list');
var task = document.getElementById('task');
var firebaseList = firebase.database().ref();
//var allTasks = "";

function animateDown() {
	console.log(document.getElementById('list').scrollHeight);
	$('#list').animate({ scrollTop: document.getElementById('list').scrollHeight }, 5000, function() {
		animateUp();
	});
}

function animateUp() {
	console.log('scrolling up');
	$('#list').animate({ scrollTop: 0 }, 5000, function() {
		animateDown();
	});
}

firebaseList.on('value', function(datasnapshot) {
	// firebaseList.innerText = datasnapshot.val();
	//console.log(datasnapshot.val());
	$('#list').empty();
	datasnapshot.forEach(function(childSnapshot) {
		var childData = childSnapshot.val();
		console.log(childData);
		task.innerHTML = childData;

		var newTasks = `<div class="todo"> <span>` + childData + `</span> <p class="date"> May 24</p></div>`;

		// allTasks = allTasks + newTasks;
		$('#list').append(newTasks);
		animateDown();
	});

	//$('#list ').html(newTasks);
});
