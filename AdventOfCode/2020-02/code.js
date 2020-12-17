// Load the dataset
const reader = require("../Utils/readFile");
const data = reader.readFile(`${__dirname}\\input.txt`);

// Process
const partOne = data => {
    let validPasswords = 0;

    data.forEach(row => {
        const char = row.split(" ")[1].substr(0, 1);
        const min = +row.split(" ")[0].split("-")[0];
        const max = +row.split(" ")[0].split("-")[1];
        const password = row.split(" ")[2];
        const strippedPW = Array.from(password).filter(x => x === char)
        if (strippedPW.length >= min && strippedPW.length <= max) {
            validPasswords++;
        }
    });

    console.log(`Valid password count: ${validPasswords} of ${data.length}`);
}

const partTwo = data => {
    validPasswords = 0;

    data.forEach(row => {
        const char = row.split(" ")[1].substr(0, 1);
        const password = row.split(" ")[2];
        const pos1 = +row.split(" ")[0].split("-")[0];
        const pos1Char = password.substr(pos1 - 1, 1);
        const pos2 = +row.split(" ")[0].split("-")[1];
        const pos2Char = password.substr(pos2 - 1, 1);
        const isValid = ((pos1Char !== pos2Char) && ((pos1Char === char) || (pos2Char === char)));
        console.log(`${row} - Password "${password}" - pos1 char(${pos1}): ${pos1Char}, pos2 char(${pos2}): ${pos2Char} - ${isValid ? 'Valid' : 'Invalid'}`);
        if (isValid) {
            validPasswords++;
        }
    });

    console.log(`Valid password count: ${validPasswords} of ${data.length}`);
}

//partOne(data);
partTwo(data);