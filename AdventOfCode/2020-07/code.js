const util = require('util');

// Load the file
const reader = require("../Utils/readFile");
const file = reader.readFile(`${__dirname}\\input.txt`);

// Function to split out a contents string to an array of objects
// in the form {quantity: x, description: 'yyyyyy yyyyyy'}
const splitContents = contents => {
    if (contents === 'no other bags.') {
        return [];
    }
    return contents
        .split(", ")
        .map(c => {
            const qty = +c.split(" ")[0];
            const desc = `${c.split(" ")[1]} ${c.split(" ")[2]}`
            return ({
                quantity: !isNaN(qty) ? qty : 0,
                description: desc
            })
        });
}


// Shape the data
const data = file.map(rule => {
    const bagTypeDelim = rule.search(" bags");
    const contents = rule.substr(bagTypeDelim + ' bags contain '.length);
    return ({
        bagType: rule.substr(0, bagTypeDelim),
        contents: splitContents(contents)
    });
});

const directContainers = data
    .filter(b => b.contents.some(c => c.description === "shiny gold"))
    .map(b => b.bagType);

const indirectContainers = data
    .filter(b => b.contents.some(c => directContainers.includes(c.description)))
    .map(b => b.bagType);

// console.log("")
// console.log("Direct containers")
// console.log(util.inspect(directContainers.sort(), false, null, true));
// console.log("")
// console.log("Indirect containers")
// console.log(util.inspect(indirectContainers, false, null, true));
// console.log("")
// console.log(`Part 1 answer: ${directContainers.length + indirectContainers.length}`);

let permutations = [];

const getContents = (bagName, path) => {
    const bag = data.find(b => b.bagType === bagName);
    path.push(bagName);
    if (bag.contents.length === 0) {
        permutations = [...permutations, path];
    }
    else {
        bag.contents.forEach(child => getContents(child.description, [...path]));
    }
}

const getRootObjects = () => {
    const rootObjects = [];
    data.forEach(x => {
        const match = data.find(bag => bag.contents.find(bagContent => bagContent.description === x.bagType));
        if (!match) {
            rootObjects.push(x.bagType);
        }
    });
    return rootObjects; // [ "light red" , "dark orange" ]
}
const rootObjects = getRootObjects();
//console.log("root objects = " + util.inspect(rootObjects, false, null, true));

rootObjects.forEach(o => getContents(o, []));


//console.log(util.inspect(permutations, false, null, true));

let part1PreResults = [];
permutations.reduce((color, path) => {
    let foundMatch = false;
    const path2 = []
    path.forEach(x => {
        if (x === color) {
            foundMatch = true;
        }
        else if (!foundMatch) {
            path2.push(x);
        }
    });
    if (foundMatch) {
        part1PreResults = [...part1PreResults, ...path2];
    }
    return color;
}, "shiny gold");
const part1Result = new Set(part1PreResults);
console.log(util.inspect(part1Result, false, null, true));
console.log(part1Result.size);



//lr -> bw -> sg -> do -> fb  [lr, bw, sg, ]
//lr -> bw -> fb
//lr -> bw -> sg -> vb -> fb
//do ...
//do ...


//['light red', 'bright white', 'shiny gold', 'dark olive', 'faded blue', 'dotted black', 'vibrant plum', 'muted yellow', 'shiny gold', 'faded blue']

/*
  (LR) - BW
     - MY
  (DO) - BW
     - MY
  BW - SG
  MY - SG
       FB
  SG - DOL
     - VP
  DOL - FB
      - DB
  VP - FB
     - DB
  FB
  DB

  LR BW SG(?) DOL(?) FB(1)
  LR BW SG DOL DB
  LR BW SG VP  FB
  LR BW SG VP  DB
  LR B2 VP DB
  DO .. SG ....
  ...
  DO.... VP ... SG ...

  const finalResult = [LR, BW, LR, DO, DO, VP ]


  { key: LR, contents: { BW x2, MY 1x }}

   [ 'light red',
    'bright white',
    'shiny gold',
    'dark olive',
    'faded blue' ],
  [ 'light red',
    'bright white',
    'shiny gold',
    'dark olive',
    'dotted black' ]

 STEP 1.  const rootObjects = data.filter(x=> [not present in any object] )
 STEP 2.  rootObjects.forEach( x=> x.contents.forEach(c => [find any object in data that has a key of c]) )
              LR                               BW             SG
                                               MY             SG
                                                              FB

*/



// [
//     { type: 'light red', children: ['bright white', 'muted yellow', 'shiny gold', 'faded blue', 'dark olive', 'vibrant plum'] },
//     { type: 'dark orange', children: ['bright white', 'muted yellow', 'shiny gold', 'faded blue'] },
//     { type: 'bright white', children: ['shiny gold', 'dark olive', 'vibrant plum'] },

// ]