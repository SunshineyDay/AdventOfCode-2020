// Load the dataset
const reader = require("../Utils/readFile");
const data = reader.readFile(`${__dirname}\\input.txt`);

// Process
const findPair = (data, totalToFind) => {
    let result = [];
    let resultFound = false;
    for (let x = 0; x < data.length; x++) {
        if (resultFound) {
            break;
        }
        for (let y = 0; y < data.length; y++) {
            if (y !== x && +data[x] + +data[y] === totalToFind) {
                result.push(+data[x], +data[y]);
                resultFound = true;
                break;
            }
        }
    }
    return result;
};

const findTriple = (data, totalToFind) => {
    console.log(`Looking for total: ${totalToFind}`);
    console.log(`Data length: ${data.length}`);
    let result = [];
    let resultFound = false;
    for (let x = 0; x < data.length - 2; x++) {
        if (resultFound) {
            break;
        }
        for (let y = x + 1; y < data.length - 1; y++) {
            if (resultFound) {
                break;
            }
            for (let z = y + 1; z < data.length; z++) {
                if ((y !== x) && (x !== z) && (+data[x] + +data[y] + +data[z] === totalToFind)) {
                    result.push(+data[x], +data[y], +data[z]);
                    resultFound = true;
                    break;
                }
            }
        }
    }
    return result;
};

let result1 = findPair(data, 2020);
console.log("Result: ", result1);
console.log("Answer: ", result1[0] * result1[1]);

let result2 = findTriple(data, 2020);
console.log("Result: ", result2);
console.log("Answer: ", result2[0] * result2[1] * result2[2]);