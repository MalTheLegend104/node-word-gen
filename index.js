const fs = require('fs'); //includes built in file management system used to read and write to the file.
const prompt = require('prompt-sync')({sigint: true}); //includes user prompts to get input, sigint: true allows for ctrl + c


start();
function start(){
    generateAnotherWord = true; //creates an infinite loop so it can stop itself without you having to ctrl+c
    while (generateAnotherWord === true){
        var doMore = checkWriteMore(); //checks if you want to write more to the file, default is false
        while (doMore === true){ 
            writeToFile(); //if you selected yes to writing more to the file, run this function
            var doMore = checkWriteMore(); //asks if there is anything else to add to the file, if yes, iterate through the loop again, else break and randomly generate word from file.
        }
        const finalArray = readFileContents(); //reads the file contents and adds them to an array.
        pickRandom(finalArray); //picks a random word from the array generated in the last line.
        generateAnotherWord = generateAnother(); //ask if you want to use the program again.
    }
    
}

//Checks of you want to add more to the file, if yes return true, else return false.
function checkWriteMore(){
    console.log('\nWould you like to write more to the file?');
    writeMore = prompt('>');
    var doMore =  String(writeMore).toLowerCase(); //converts user input to a string, then makes it lowercase to easily compare
    if (doMore === 'y' || 'yes'){
        return true;
    } else {
        return false;
    }
}

//takes user input and adds it to the file.
function writeToFile(){
    var content = '\n'; //adds a blank space before the new addition
    console.log('\nWhat would you like to add? If you want to add several phrases, put a semicolon with no spaces between the phrases. Ex. "Cheese;Bacon" ');
    var userAddition = prompt('>');
    content += String(userAddition); //adds the user input to the string after the \n
    content = content.replace(/;/g, '\n'); //replaces semicolons with a line break, so more than one phrase can be added at a time
    //try to append the new words / phrases to the file, catch the error if the file isn't present    
    try {
      const data = fs.appendFileSync('./test.txt', content);
    } catch (err) {
      console.error(err);
    }
}

//reads the file contents and addes them to an array.
function readFileContents(){
    try {
        //adds the file to an array, making a new element at every line break
        var fileArray = fs.readFileSync('./storedList.txt', 'utf8').split('\n'); 
    } catch (err) {
        console.error(err);
    }
    return fileArray;
}

// takes in an array, and chooses random element from it.
function pickRandom(finalArray){
    //allows you to pass in any array and have it return random element from that array
    const randomValue = (array) => {
        return array[Math.floor(Math.random() * array.length)];
    };
    //takes the array made from the file and filters out any falsy statements(like ''/null/undefined)
    const finalWord = finalArray.filter(e => e);
    console.log( "The random word is: \n" + randomValue(finalWord) + "\n\n\n"); //passes through the array, and prints the returned value
}

//ask if you want to generate another word
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
