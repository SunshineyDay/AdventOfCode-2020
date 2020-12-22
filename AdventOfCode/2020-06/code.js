// Load the dataset
const reader = require("../Utils/readFile");
const file = reader.readFile(`${__dirname}\\input.txt`, false);

// Function to get unique characters in a string
const getUniqueChars = str => String.prototype.concat(...new Set(str));

// Data groups are separated by blank rows in the file, and people within
// groups are in consecutive rows in the group, so break them out
// to give us an array containing an array per group.
// Lastly, within each group pick up the unique characters that represent
// questions answered by the group.
const data = file.split("\r\n\r\n")
    .map(d => getUniqueChars(d.split("\r\n").join(""))
    );

// Sum the questions answered across all groups
const part1Answer = data.reduce((questionCount, row) => {
    return questionCount + row.length;
}, 0);

console.log(`Part 1 answer: ${part1Answer}`);

// --- Part two: find the questions that everyone in the group answered

// We need all of the data for each row
const dataPart2 = file.split("\r\n\r\n")
    .map(d => d.split("\r\n").join("")
    );

const peoplePerGroup = file.split("\r\n\r\n")
    .map(d => d.split("\r\n").length);

// Group the data by questions answered
const groupByQuestions = dataPart2.map((value, index) => {
    let result = {};
    Array.from(value).map(char => {
        result[char] = (result[char] || 0) + 1;
    })
    result.groupMemberCount = peoplePerGroup[index];
    return result;
});

// Sum the number of questions answered by all members within each group
const part2Answer = groupByQuestions.reduce((totalQuestionCount, group) => {
    totalQuestionCount += Object.keys(group)
        .filter(k => k !== 'groupMemberCount')
        .reduce((groupQuestionCount, question) => {
            if (group[question] === group.groupMemberCount) {
                return groupQuestionCount + 1;
            }
            return groupQuestionCount;
        }, 0)
    return totalQuestionCount;
}, 0);

console.log(`Part 2 answer: ${part2Answer}`);
