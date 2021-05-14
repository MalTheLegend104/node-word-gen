const fs = require('fs')
const electron = require('electron');
const userDataPath = (electron.app || electron.remote.app).getPath('userData');
function onPageLoad(){
    readDirectory();
    console.log(userDataPath)
}

function loadList(fileList){
    var form = document.createElement("select")
    fileList.forEach((value) => {
        var option = document.createElement("option");
        option.value = value;
        textValue = value.charAt(0).toUpperCase() + value.slice(1)
        option.text = textValue.slice(0, -4);
        form.appendChild(option);
    })
    form.id = "currentList";
    document.getElementById("container").appendChild(form);
}

function readDirectory(){
    fs.readdir(userDataPath + '/list', function (err, files) {
        if (err) {
            alert(`An error occured: \n${err}\nPlease submit a screenshot of this error as an issue on the github repo, along with a discription of what you were trying to do.`);
        } else if (files.length !== null){
            loadList(files)
        }
    });
}

function selectCurrentList(){
    var currentList = document.getElementById("currentList").value;
    
    if (currentList){
        let Data = {
            selectedList: `${currentList}`
        };

        // Trigger the event listener action to this event in the renderer process and send the data
        electron.ipcRenderer.send('request-update-label-in-main-window', Data);
    }
}



function delCurrentList(){
    var currentList = document.getElementById("currentList").value;
    if (currentList){
        try{
            fs.unlink(userDataPath + `/list/${currentList}`, (err)=>{
                if (err){
                    alert(`An error occured: \n${err}\nPlease submit a screenshot of this error as an issue on the github repo, along with a discription of what you were trying to do.`);
                }
            })
        } catch (err) {
            alert(`An error occured: \n${err}\nPlease submit a screenshot of this error as an issue on the github repo, along with a discription of what you were trying to do.`);
        }
    }
    document.location.reload();
}