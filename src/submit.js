const fs = require('fs')

function submitList() {
    var userList = document.getElementById("UserForm").value;
    const saveList = document.querySelector('#saveList').checked;
    if (userList !== ""){
        userList.replace(";", "\n");
        userArray = userList.split("\n");
        if (saveList == true){
            saveList(userArray);
        }
        pickFromList(userArray);
    }
}

function pickFromList(userArray){
    var finalChoice = userArray[Math.floor(Math.random() * userArray.length)];
    document.getElementById("Choice").innerHTML = finalChoice;
    var element = document.getElementById("output");
    element.classList.remove("invisible");
}

function saveList(userArray){
    const fileName = userArray.shift();
    const userList = userArray.join("\n");
    fs.appendFile(`./savedList/${fileName}.txt`, userList, function (err) {
        if (err) throw err;
        if (err) {
            alert(`An error occured: \n${err}\nPlease submit a screenshot of this error as an issue on the github repo, along with a discription of what you were trying to do.`);
        }
    })
}