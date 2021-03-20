const fs = require('fs'); //includes built in file management system to use later
const prompt = require('prompt-sync')({sigint: true}); //includes user prompts to get input, sigint: true allows for ctrl + c


start();
function start(){
    generateAnotherWord = true; z
    while (generateAnotherWord === true){
        var doMore = checkWriteMore();
        while (doMore === true){
            writeToFile();
            var doMore = checkWriteMore();
        }
        const finalArray = readFileContents();
        pickRandom(finalArray);
        generateAnotherWord = generateAnother();
    }
    
}


function checkWriteMore(){
    console.log('\nWould you like to write more to the file?');
    writeMore = prompt('>');
    var doMore =  String(writeMore).toLowerCase();
    if (doMore === 'y'){
        return true;
    } else {
        return false;
    }
}


function writeToFile(){
    var content = '\n';
    console.log('\nWhat would you like to add? If you want to add several phrases, put a semicolon with no spaces between the phrases. Ex. "Cheese;Bacon" ');
    var userAddition = prompt('>');
    content += String(userAddition);
    content = content.replace(/;/g, '\n');
    try {
      const data = fs.appendFileSync('./test.txt', content);
    } catch (err) {
      console.error(err);
    }
}


function readFileContents(){
    try {
        var fileArray = fs.readFileSync('./storedList.txt', 'utf8').split('\n');
    } catch (err) {
        console.error(err);
    }
    return fileArray;
}


function pickRandom(finalArray){
    const randomValue = (list) => {
        return list[Math.floor(Math.random() * list.length)];
    };
    const finalWord = finalArray.filter(e => e);
    console.log(finalWord); 
    console.log( "The random word is: \n" + randomValue(finalWord) + "\n\n\n");
}


function generateAnother(){
    console.log('\nWould you like to generate another? (Y / N) ');
    writeMore = prompt('>');
    var doMore =  String(writeMore).toLowerCase();
    if (doMore === 'y'){
        return true;
    } else {
        return false;
    }
}
