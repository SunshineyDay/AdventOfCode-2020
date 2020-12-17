const { dynamicSortMultiple } = require("../Utils/objectSort");
const reader = require("../Utils/readFile");

// Load the dataset
const file = reader.readFile(`${__dirname}\\input.txt`, false);
let data = file.split("\r\n").map(d => ({
    boardingPass: d,
    row: null,
    col: null,
    seatId: null
}));

// Function to calculate a boarding pass location given a start + end row and
// indicators to interpret the boarding pass codes
const getLocation = (boardingPass, lowerIndicator, upperIndicator, start, end) => {
    return Array.from(boardingPass).reduce((rowNo, indicator) => {
        const rangeMidPoint = Math.ceil((end - start) / 2);
        if (indicator === lowerIndicator) {
            end -= rangeMidPoint;
        }
        if (indicator === upperIndicator) {
            start += rangeMidPoint;
        }
        //console.log(`start: ${start}, end: ${end}, midPoint: ${rangeMidPoint}, indicator: ${indicator}`)
        return end;
    }, 0);
};

// Function to derive the seat ID given the col, row and a multiplier
const getSeatId = (row, rowMultiplier, col) => (row * rowMultiplier) + col;

// Process the dataset
data.map(d => {
    d.row = getLocation(d.boardingPass.substr(0, 7), 'F', 'B', 0, 127);
    d.col = getLocation(d.boardingPass.substr(7, 3), 'L', 'R', 0, 7);
    d.seatId = getSeatId(d.row, 8, d.col);
});

// Part 1 Answer - Calculate the highest seat ID
const maxBySeatId = data.reduce((prev, current) => (prev.seatId > current.seatId) ? prev : current, 0);

console.log(`Max seat id: ${maxBySeatId.seatId}`);

// Part 2 Answer - Locate the missing seat

// Find the min and max row numbers - eliminate them from the dataset
const minRow = data.reduce((prev, current) => (prev.row < current.row) ? prev : current, 0).row;
const maxRow = data.reduce((prev, current) => (prev.row > current.row) ? prev : current, 0).row;

// Filtering out the first and last rows, group the data by row
var counts = data
    .filter(p => p.row > minRow && p.row < maxRow)
    .reduce((p, c) => {
        if (!p.hasOwnProperty(c.row)) {
            p[c.row] = 0;
        }
        p[c.row]++;
        return p;
    }, {});

// Find the row that has an empty seat
const rowNumber = Object.keys(counts).find(key => counts[key] === 7);
const rowSeats = data.filter(d => d.row === +rowNumber);
console.log(`Row with an empty seat: ${rowNumber}`);
const vacantSeat = [0, 1, 2, 3, 4, 5, 6, 7]
    .filter(seat => !rowSeats.map(rs => rs.col).includes(seat))[0];
console.log(`Vacant seat: ${vacantSeat} - seat ID: ${getSeatId(rowNumber, 8, vacantSeat)}`);
