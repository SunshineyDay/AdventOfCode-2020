const util = require('util');
const fs = require("fs");

const readFile = (filePath, splitNewLines = true, logDataToConsole = false) => {

    // Read the file
    let data;
    try {
        data = fs.readFileSync(filePath, "utf8");
    } catch (err) {
        console.log(`Error while reading ${filePath}: `, err);
        return;
    }

    // If required split the data at each CRLF
    if (splitNewLines) {
        const result = data.split("\r\n");
        console.log("");
        console.log(`Reading the file: ${filePath} - ${result.length} rows found`);
        console.log("");
        if (logDataToConsole) {
            console.log(util.inspect(result, false, null, true));
        }
        return result;
    }

    if (logDataToConsole) {
        console.log(util.inspect(data, false, null, true));
    }

    return data;
}

exports.readFile = readFile;