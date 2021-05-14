const fs = require('fs')
const path = require('path')
const electron = require('electron');
const userDataPath = (electron.app || electron.remote.app).getPath('userData');


function setCurrentList(arg){
    console.log(arg)
    var text = document.getElementById('text')
    try {
        const data = fs.readFileSync(userDataPath + `/list/${arg}`, 'utf-8')
        console.log(data)
        const userArray = data.split('\n')
        text.innerHTML = data;
        pickFromList(userArray)
    } catch (err) {
        alert(`An error occured: \n${err}\nPlease submit a screenshot of this error as an issue on the github repo, along with a discription of what you were trying to do.`);
    }
}

const saveListToFile = (userArray) => {
    var fileName = userArray.shift();
    var newArray = userArray.filter(e => e); // cleans up the empty strings
    const userList = newArray.join("\n");
    fs.writeFile(userDataPath + `/list/${fileName}.txt`, userList, function (err) {
        if (err) {
            alert(`An error occured: \n${err}\nPlease submit a screenshot of this error as an issue on the github repo, along with a discription of what you were trying to do.`);
        }
    })
    pickFromList(userArray);
}

function submitList() {
    var userList = document.getElementById("text").value;
    const saveList = document.querySelector('#saveList').checked;
    if (userList !== ""){
        userList.replace(/;/g, "\n");
        userArray = userList.split("\n");
        if (saveList == true){
            saveListToFile(userArray);
        }
        pickFromList(userArray);
    }
}

function pickFromList(userArray){
    var newArray = userArray.filter(e => e); // cleans up the empty strings
    var finalChoice = newArray[Math.floor(Math.random() * newArray.length)];
    document.getElementById("Choice").value = finalChoice;
    var element = document.getElementById("output");
    element.classList.remove("invisible");
}

function copyPass(){
    var output = document.getElementById("Choice");
    output.select();
    document.execCommand("copy");
    var copyTag = document.getElementById('copyTag');
    copyTag.classList.remove("invisible");
    setTimeout(() => {
        copyTag.classList.add("invisible")
    }, 2500);
}