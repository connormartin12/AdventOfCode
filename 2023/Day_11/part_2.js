const fs = require('fs');
const { get } = require('https');
const lines = fs.readFileSync("puzzle_input.txt", { encoding: 'utf8' }).split('\n');

// Create and expand universe
let emptyRows = [];
let emptyColumns = [];
let universe = [];
lines.forEach((line, i) => {
    if (!line.includes('#'))
        emptyRows.push(i);
    universe.push(line.split(''));
})

for (let column = 0; column < universe[0].length; column++) {
    let columnArray = [];
    for (let row = 0; row < universe.length; row++) {
        columnArray.push(universe[row][column]);
    }

    let hasGalaxy = columnArray.findIndex(element => { return element === '#'; });
    if (hasGalaxy < 0)
            emptyColumns.push(column);
}

// Find and store coordinates of all galaxies
galaxyPositions = [];
universe.forEach((row, i) => {
    row.forEach((column, j) => {
        if (universe[i][j] === '#')
            galaxyPositions.push([i, j]);
    })
});

function getEmptySpace(start, end, row) {
    let emptySpaces = 0;
    if (end > start) {
        for (let i = (start + 1); i < end; i++) {
            if (row) {
                if (emptyRows.find(row => { return row === i }))
                    emptySpaces++;
            } else {
                if (emptyColumns.find(column => { return column === i }))
                    emptySpaces++;
            }
        }
    } else if (end < start) {
        for (let i = (start - 1); i > end; i--) {
            if (row) {
                if (emptyRows.find(row => { return row === i }))
                    emptySpaces++;
            } else {
                if (emptyColumns.find(column => { return column === i }))
                    emptySpaces++;
            }
        }
    }

    return emptySpaces;
};

// Add all minimum paths
const expansionFactor = 1000000;
let sumPaths = 0;
for (let i = 0; i < galaxyPositions.length; i++) {
    let position = galaxyPositions[i];
    for (let j = (i + 1); j < galaxyPositions.length; j++) {
        let nextPosition = galaxyPositions[j];

        // Get # of rows/columns between galaxies
        let emptyRowCount = getEmptySpace(position[0], nextPosition[0], true);
        let emptyColumnCount = getEmptySpace(position[1], nextPosition[1], false);

        let minPathLength = Math.abs(nextPosition[0] - position[0]) - emptyRowCount + 
            Math.abs(nextPosition[1] - position[1]) - emptyColumnCount
            + (emptyRowCount * expansionFactor) + (emptyColumnCount * expansionFactor);
        sumPaths += minPathLength;
    }
}

console.log(sumPaths);
