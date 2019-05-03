var submitbtn = document.getElementById("submitbtn");
var list = document.getElementById("list");
var task = document.getElementById("task");
var firebaseList = firebase.database().ref();
//var allTasks = "";

function submit() {
    var newTask = document.getElementById("newTask");
    var taskText = newTask.value;
    var firebaseRef = firebase.database().ref();

    firebaseRef.push().set(taskText);
}

firebaseList.on('value', function (datasnapshot) {
    // firebaseList.innerText = datasnapshot.val();
    //console.log(datasnapshot.val());
    datasnapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val();
        console.log(childData);
        // task.innerHTML = childData;

        var newTasks = `<div class='list'>
						<li> `+ childData + ` <button id="done" onclick="remove()">Done</button></li>          					</div>`;




        // allTasks = allTasks + newTasks;

        $('#list').append(newTasks);
    });


    //$('#list ').html(allTasks);
});

function remove(childData) {
    var personRef = firebase.database().ref().val(childData);
    personRef.once('value', function (snapshot) {

        if (snapshot.val() === null) {
            /* does not exist */
            alert('does not exist');
        } else {
            personRef.remove(childData);
        }

    });
    $('#done').on('click', function () {
        var id = $('#list').val();
        remove(id);
    });
}