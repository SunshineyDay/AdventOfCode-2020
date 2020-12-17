// Load the dataset
const reader = require("../Utils/readFile");
const data = reader.readFile(`${__dirname}\\input.txt`);

// Calculate the x position in the current row. The grid pattern repeats horizontally, so
// on reaching the right edge of the data roll over to the beginning of the row
const getXPos = (maxX, currentX, moveX) => {
    return (currentX + moveX) < maxX ? (currentX + moveX) : (currentX + moveX) - maxX;
};

const getTreeCount = (data, moveX, moveY = 1) => {

    // Starting position
    let currentX = 0;

    // Count the trees
    const totalTreeCount = data
        .filter((row, index) => index >= moveY)
        .reduce((treeCount, row, index) => {

            // Move to the required position in the current row
            currentX = getXPos(data[0].length, currentX, moveX);

            //console.log(`${index}: ${row} - ${currentX} - ${row[currentX]}`);

            // Check that this is a row that we want to read
            if (index % moveY === 0) {

                // Check for a tree
                if (row[currentX] === "#") {
                    return treeCount + 1;
                }
            }

            // Return the previous accumulated total either because no trees
            // were encountered, or because we're skipping this row
            return treeCount;

        }, 0);

    console.log(`   Tree count: ${totalTreeCount}`);
    return totalTreeCount;

}

const part1Result = getTreeCount(data, 3);
console.log(`Part 1 result: ${part1Result}\n`)

const part2result =
    getTreeCount(data, 1)
    * getTreeCount(data, 3)
    * getTreeCount(data, 5)
    * getTreeCount(data, 7)
    * getTreeCount(data, 1, 2);
console.log(`Part 2 result: ${part2result}`)
