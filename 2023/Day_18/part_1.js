const fs = require('fs');
const digInstructions = fs.readFileSync("puzzle_input.txt", { encoding: 'utf8' }).split('\n');

let trenchLoop = [['.']];
let currentRow = 0;
let currentColumn = 0;
let lavaVolume = 0;

// Create Trench Loop
digInstructions.forEach(row => {
    const [digDirection, digLength, colorCode] = row.split(' ');

    lavaVolume += parseInt(digLength);
    switch (digDirection) {
        case 'R':
            for (let i = 0; i < digLength; i++) {
                currentColumn++;
                if (!trenchLoop[currentRow][currentColumn])
                    trenchLoop[currentRow].push('#');
                else
                    trenchLoop[currentRow][currentColumn] = '#';
            }
            break;
        case 'L':
            for (let i = 0; i < digLength; i++) {
                currentColumn--;
                if (!trenchLoop[currentRow][currentColumn]) {
                    columnAddition = [];
                    for (let j = 0; j < currentRow; j++) {
                        
                    }
                } else {
                    trenchLoop[currentRow][currentColumn] = '#';
                }
            }
            break;
        case 'D':
            for (let i = 0; i < digLength; i++) {
                currentRow++;
                if (!trenchLoop[currentRow]) {
                    rowAddition = [];
                    for (let j = 0; j < currentColumn; j++) {
                        rowAddition.push('.');
                    }
                    rowAddition.push('#');
                    trenchLoop.push(rowAddition);
                } else {
                    trenchLoop[currentRow][currentColumn] = '#';
                }
            }
            break;
        case 'U':
            for (let i = 0; i < digLength; i++) {
                currentRow--;
                trenchLoop[currentRow][currentColumn] = '#';
            }
            break;
    }

});

// Fill in trench loop
trenchLoop.forEach((row, rowIndex) => {
    for (let i = 0; i < row.length; i++) {
        if (row[i] === '#') {
            let currentIndex = i + 1;
            while (row[currentIndex] === '.') {
                lavaVolume++;
                // trenchLoop[rowIndex][currentIndex] = '#';
            }
        }
    }
});

console.log(lavaVolume);
