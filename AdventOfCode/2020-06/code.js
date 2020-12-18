const { dynamicSortMultiple } = require("../Utils/objectSort");
const reader = require("../Utils/readFile");

// Load the dataset
const file = reader.readFile(`${__dirname}\\input.txt`, false);
