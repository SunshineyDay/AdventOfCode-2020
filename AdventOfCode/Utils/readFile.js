const fs = require("fs");

const readFile = (filePath, splitNewLines = true) => {

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
        return result;
    }

    return data;
}

exports.readFile = readFile;