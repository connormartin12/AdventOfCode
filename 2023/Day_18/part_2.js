const fs = require('fs');
const digInstructions = fs.readFileSync("calibration_input.txt", { encoding: 'utf8' }).split('\n');

let currentRow = 0;
let currentColumn = 0;
let polygonCoordinates = [[0, 0]];
let polygonPerimeter = 0

// Get polygon coordinates
digInstructions.forEach(row => {
    const [digDirection, digLength, hexCode] = row.split(' ');
    const digLengthInt = parseInt(hexCode.substring(2, 7), 16);
    const realDigDirection = hexCode.substring(7, 8);

    polygonPerimeter += digLengthInt;

    switch (realDigDirection) {
        case '3': // Up
            currentRow -= digLengthInt;
            break;
        case '1': // Down
            currentRow += digLengthInt;
            break;
        case '2': // Left
            currentColumn -= digLengthInt;
            break;
        case '0': // Right
            currentColumn += digLengthInt;
            break;
    }

    polygonCoordinates.push([currentRow, currentColumn]);
});

// Get S1 and S2
let S1 = 0;
let S2 = 0;
for (let i = 0; i < (polygonCoordinates.length - 1); i++) {
    S1 += (polygonCoordinates[i][0] * polygonCoordinates[i + 1][1]);
    S2 += (polygonCoordinates[i][1] * polygonCoordinates[i + 1][0]);
}

const area = (0.5 * Math.abs(S1 - S2)) + (0.5 * polygonPerimeter) + 1;

console.log(area);
