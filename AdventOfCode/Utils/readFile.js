const fs = require("fs");
const logger = require("./consoleLog");

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
            logger.consoleLog(result);
        }
        return result;
    }

    if (logDataToConsole) {
        logger.consoleLog(data);
    }

    return data;
}

exports.readFile = readFile;