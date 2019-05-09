var list = document.getElementById("list");
var task = document.getElementById("task");
var firebaseList = firebase.database().ref();
//var allTasks = "";


firebaseList.on('value', function (datasnapshot) {
    // firebaseList.innerText = datasnapshot.val();
    //console.log(datasnapshot.val());
    $('#list').empty();
    datasnapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val();
        console.log(childData);
        task.innerHTML = childData;

        var newTasks = `
        											<div class="todo"> `+ childData + ` <p class="date"> MAY 12 19</p></div>`



        // allTasks = allTasks + newTasks;
        $('#list').append(newTasks);
    });

    //$('#list ').html(newTasks);


});