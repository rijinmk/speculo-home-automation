var submitbtn = document.getElementById('submitbtn');
var list = document.getElementById('list');
var task = document.getElementById('task');
var firebaseList = firebase.database().ref();
//var allTasks = "";
var childKey = '';
function submit() {
	var newTask = document.getElementById('newTask');
	var taskText = newTask.value;
	var firebaseRef = firebase.database().ref();

	firebaseRef.push().set(taskText);
}

firebaseList.on('value', function(datasnapshot) {
	// firebaseList.innerText = datasnapshot.val();
	//console.log(datasnapshot.val());
	$('#list').empty();
	datasnapshot.forEach(function(childSnapshot) {
		var childData = childSnapshot.val();
		console.log(childSnapshot.key);
		console.log(childData);
		// task.innerHTML = childData;

		var newTasks =
			`<div class='list'>
						<li> ` +
			childData +
			` <button id="done" onclick="remove('` +
			childSnapshot.key +
			`')"> <span>X</span></button><br></li></div>`;

		// allTasks = allTasks + newTasks;

		$('#list').append(newTasks);
	});

	//$('#list ').html(allTasks);
});

function remove(childKey) {
	var personRef = firebase.database().ref(childKey);
	console.log(personRef);
	personRef.remove();
	// personRef.once('value', function (snapshot) {
	//     if (snapshot.key === childKey) {

	//         personRef.remove(childKey);
	//     }

	// });
	// $('#done').on('click', function () {
	//     var id = $('#list').val();
	//     remove(id);
	// });
}
