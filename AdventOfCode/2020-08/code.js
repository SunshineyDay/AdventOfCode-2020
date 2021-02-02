const util = require('util');

// Load the file
const reader = require("../Utils/readFile");
const file = reader.readFile(`${__dirname}\\input.txt`);

// Shape the data
const data = file.map(row => {
    rowElements = row.split(' ');
    return ({
        operation: rowElements[0],
        value: +rowElements[1]
    });
});

//console.log(util.inspect(data, false, null, true));

// Set up the operations
const operations = {
    NOP: 'nop',
    ACC: 'acc',
    JMP: 'jmp'
};

// Array to hold the operations that we've processed
let processedOps = [];

// Tracking variables
let total = 0;
let currentIndex = 0;
let processComplete = false;

// Function to process a row given its index
const processOperation = (index, currentTotal) => {

    // Only process rows that we haven't already processed
    if (!processedOps.includes(index)) {

        processedOps.push(index);

        if (data[index].operation === operations.NOP) {
            return {
                newTotal: currentTotal,
                nextIndex: index + 1
            }
        }

        if (data[index].operation === operations.ACC) {
            return {
                newTotal: currentTotal + data[index].value,
                nextIndex: index + 1
            }
        }

        return {
            newTotal: currentTotal,
            nextIndex: index + data[index].value
        }
    }

    // Current row has already been processed - stop further processing
    processComplete = true;
};

// Process the dataset
while (!processComplete) {
    result = processOperation(currentIndex, total);
    if (!processComplete) {
        currentIndex = result.nextIndex;
        total = result.newTotal;
        //console.log(`currentIndex: ${currentIndex} - operation: ${util.inspect(data[currentIndex], false, null, true)} - result: ${util.inspect(data[currentIndex], false, null, true)} - total: ${total}`);
    }
}

console.log(`Part 1 answer: ${total}`);
console.log('');