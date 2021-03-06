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

    // Return value indicates success/failure of the search
    return result.length > 0;
}

const findContiguousRange = (targetValue, values) => {

    // Within the passed array of values, find a contiguous sequence
    // of values that add up to the target value

    let result = [];
    let currentIndex = 0;
    let targetValueFound = false;
    let startIndex = 0;
    let endIndex = 0;

    for (let i = currentIndex; i < values.length; i++) {
        startIndex = i;
        let currentTotal = values[i];
        for (let n = i + 1; n < values.length; n++) {
            currentTotal += values[n];
            if (currentTotal === targetValue) {
                targetValueFound = true;
                endIndex = n;
                break;
            }
        }
        if (targetValueFound) {
            break;
        }
    }

    if (targetValueFound) {
        return values
            .slice(startIndex, endIndex + 1)
            .sort();
    }

    return [];
};

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

    return answer;
}

// Part One
const answer1 = processFile(25, 25, data, false);
console.log('---------------------------------------------------------');
console.log('Part 1 answer:');
console.log(`Value with no pairs that sum to it:`);
console.log(answer1);
console.log('---------------------------------------------------------');

// Part Two
const range = findContiguousRange(answer1, data);
const smallestPlusLargest = range[0] + range[range.length - 1];
console.log('---------------------------------------------------------');
console.log('Part 2 answer:');
console.log(smallestPlusLargest);
console.log('---------------------------------------------------------');
