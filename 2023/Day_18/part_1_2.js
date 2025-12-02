const fs = require('fs');
const digInstructions = fs.readFileSync("puzzle_input.txt", { encoding: 'utf8' }).split('\n');

let currentRow = 0;
let currentColumn = 0;
let polygonCoordinates = [[0, 0]];
let polygonPerimeter = 0

// Get polygon coordinates
digInstructions.forEach(row => {
    const [digDirection, digLength, hexCode] = row.split(' ');
    const digLengthInt = parseInt(digLength);

    polygonPerimeter += digLengthInt;

    switch (digDirection) {
        case 'U':
            currentRow -= digLengthInt;
            break;
        case 'D':
            currentRow += digLengthInt;
            break;
        case 'L':
            currentColumn -= digLengthInt;
            break;
        case 'R':
            currentColumn += digLengthInt;
            break;
    }

    polygonCoordinates.push([currentRow, currentColumn]);
});

console.log(polygonCoordinates);

// Get S1 and S2
let S1 = 0;
let S2 = 0;
for (let i = 0; i < (polygonCoordinates.length - 1); i++) {
    // console.log(polygonCoordinates[i][0], polygonCoordinates[i + 1][1]);
    S1 += (polygonCoordinates[i][0] * polygonCoordinates[(i + 1)][1]);
    S2 += (polygonCoordinates[i][1] * polygonCoordinates[i + 1][0]);

    console.log(S1, S2);
}

const area = (0.5 * Math.abs(S1 - S2)) + (0.5 * polygonPerimeter) + 1;

console.log(area);
