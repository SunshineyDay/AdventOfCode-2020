// Load the dataset
const reader = require("../Utils/readFile");
let file = reader.readFile(`${__dirname}\\input.txt`, false);

// Records are separated by blank rows in the file, so break them out
const data = file.split("\r\n\r\n");

// Fields within each record are delimited by spaces. Additionally, some fields
// may contain multiple fields delimited by a newline character. Split the fields
// and then return all fields in an object.
const records = data.map(d =>
    d.split(" ")
        .flatMap(v => v.split("\r\n"))
        .map(o => {
            let field = o.split(":");
            let rv = {};
            rv[field[0]] = field[1];
            return rv;
        })
).map(f => Object.assign({}, ...f));

console.log(`Total records: ${records.length}`);

// For part 1 each record is required to have at least the following fields
const requiredFields = ["ecl", "pid", "eyr", "hcl", "byr", "iyr", "hgt"];

// Count the records that have the required fields
const part1Count = records.reduce((validCount, record) => {
    if (requiredFields.every(f => record.hasOwnProperty(f))) {
        return validCount + 1;
    }
    return validCount;
}, 0);

console.log(`Part 1 record count: ${part1Count}`);

// For part 2 each field must also be validated - set up the validator collection
const yearValidator = (value, start, end) => !isNaN(value) && value.length === 4 && (+value >= start && +value <= end);
const byrValidator = value => yearValidator(value, 1920, 2002);
const iyrValidator = value => yearValidator(value, 2010, 2020);
const eyrValidator = value => yearValidator(value, 2020, 2030);
const hgtValidator = value => {
    const measurement = +value.substr(0, value.length - 2);
    const units = value.substr(value.length - 2);
    return (units === "cm" && measurement >= 150 && measurement <= 193) ||
        (units === "in" && measurement >= 59 && measurement <= 76)
}
const hclValidator = value => /^#[0-9a-f]{6}?$/i.test(value);
const eclValidator = value => ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].some(c => c === value);
const pidValidator = value => !isNaN(value) && value.length === 9;
const validators = {
    "byr": byrValidator,
    "iyr": iyrValidator,
    "eyr": eyrValidator,
    "hgt": hgtValidator,
    "hcl": hclValidator,
    "ecl": eclValidator,
    "pid": pidValidator
};

// Count the records that pass both required field validation and field value validation
const part2Count = records.reduce((validCount, record, index) => {
    if (requiredFields.every(f => record.hasOwnProperty(f)) && Object.keys(record)
        .filter(k => requiredFields.includes(k))
        .reduce((validationErrorCount, key) => {
            if (validators[key](record[key]) === false) {
                return validationErrorCount + 1;
            }
            return validationErrorCount;
        }, 0) === 0) {
        return validCount + 1;
    }
    return validCount;
}, 0);

console.log(`Part 2 record count: ${part2Count}`);