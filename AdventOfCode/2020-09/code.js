const logger = require("../Utils/consoleLog");

// Load the file
const reader = require("../Utils/readFile");
const file = reader.readFile(`${__dirname}\\input.txt`, true, false);
const data = file.map(Number);

const findPair = (targetValue, values, logData = false) => {

    // Within the passed array of values, find at least one pair
    // that adds up to the target value

    let result = [];

    let sumPermutations = (components = [], start = 0, sum = 0) => {
        if (sum === targetValue) result.push(components);
        for (let i = start; i < values.length; i++) {
            let n = values[i];
            if (sum + n > targetValue) continue;
            sumPermutations(components.concat(n), i, sum + n);
        }
    }
    sumPermutations([], 0, 0);

    if (logData) {
        console.log(`Target value: ${targetValue}`);
        logger.consoleLog(values);
        console.log('Pairs that sum to target: ');
        logger.consoleLog(result);
        console.log('----');
    }

    return result.length > 0;
}

const processFile = (rangeLength, startIndex, allValues, logData = false) => {

    // Work through the file until we find a number that doesn't
    // have a preceding pair that adds up to the number

    const answer = allValues.reduce((valueWithoutAPair, currentValue, index) => {

        if (valueWithoutAPair === null && index >= startIndex) {

            // Extract the range to process
            let values = allValues.slice(index - rangeLength, index);

            // Process the range
            if (!findPair(currentValue, values, logData)) {
                return allValues[index];
            }
        }
        return valueWithoutAPair;
    }, null);

    console.log(`Value with no pairs that sum to it: ${answer}`);
}

// Part One
console.log('---------------------------------------------------------');
console.log('Part 1 answer:');
processFile(25, 25, data, false);
console.log('---------------------------------------------------------');

