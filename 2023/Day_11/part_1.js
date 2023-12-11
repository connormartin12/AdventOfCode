const fs = require('fs');
const lines = fs.readFileSync("puzzle_input.txt", { encoding: 'utf8' }).split('\n');

// Create and expand universe
let universe = [];
lines.forEach(line => {
    if (!line.includes('#'))
        universe.push(line.split(''));
    universe.push(line.split(''));
})

for (let column = 0; column < universe[0].length; column++) {
    let columnArray = [];
    for (let row = 0; row < universe.length; row++) {
        columnArray.push(universe[row][column]);
    }
    // console.log(columnArray);

    let hasGalaxy = columnArray.findIndex(element => { return element === '#'; });
    if (hasGalaxy < 0) {
        for (let row = 0; row < universe.length; row++) {
            universe[row].splice((column), 0, universe[row][column]);
        }
        column++;
    }

}

// Find and store coordinates of all galaxies
galaxyPositions = [];
universe.forEach((row, i) => {
    row.forEach((column, j) => {
        if (universe[i][j] === '#')
            galaxyPositions.push([i, j]);
    })
});

// Add all minimum paths
let sumPaths = 0;
for (let i = 0; i < galaxyPositions.length; i++) {
    let position = galaxyPositions[i];
    for (let j = (i + 1); j < galaxyPositions.length; j++) {
        let nextPosition = galaxyPositions[j];
        let minPathLength = Math.abs(nextPosition[0] - position[0]) + Math.abs(nextPosition[1] - position[1]);
        sumPaths += minPathLength;
    }
}

console.log(sumPaths);
