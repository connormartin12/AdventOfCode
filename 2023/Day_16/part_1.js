const fs = require('fs');
const rows = fs.readFileSync("puzzle_input.txt", { encoding: 'utf8' }).split('\n');
rows.forEach((row, index) => rows[index] = row.split(''));

function changeDirection(currentChar, direction) {
    switch (currentChar) {
        case '.':
            return [direction];
        case '\\':
            switch (direction) {
                case 'north':
                    return ['west'];
                case 'south':
                    return ['east'];
                case 'east':
                    return ['south'];
                case 'west': 
                    return ['north'];
            }
            break;
        case '/':
            switch (direction) {
                case 'north':
                    return ['east'];
                case 'south':
                    return ['west'];
                case 'east':
                    return ['north'];
                case 'west': 
                    return ['south'];
            }
            return;
        case '-':
            switch (direction) {
                case 'north':
                    return ['east', 'west'];
                case 'south':
                    return ['east', 'west'];
                case 'east':
                    return ['east'];
                case 'west': 
                    return ['west'];
            }
            return;
        case '|':
            switch (direction) {
                case 'north':
                    return ['north'];
                case 'south':
                    return ['south'];
                case 'east':
                    return ['north', 'south'];
                case 'west': 
                    return ['north', 'south'];
            }
            return;
    }
};

function modifyRowColumn(row, column, direction) {
    switch (direction) {
        case 'north':
            row--;
            break;
        case 'south':
            row++;
            break;
        case 'east':
            column++;
            break;
        case 'west':
            column--;
            break;
    }
    return [row, column];
};

let energizedTiles = [];
let energizedTilesCount = 0;

function tileExists(row, column) {
    return energizedTiles.find(tile => {
        return tile === `${row}-${column}`;
    });
}

let energizedTilesAndDirections = [];
function tileAndDirectionExists(row, column, direction) {
    return energizedTilesAndDirections.find(tile => {
        return tile === `${row}-${column}-${direction}`;
    });
}

function checkNext(row, column, direction) {
    if ((row >= 0) && (column >= 0) && (row < rows.length) && (column < rows[0].length)) {
        // If tile location and direction entering already exists, it is a loop. Exit
        if (tileAndDirectionExists(row, column, direction)) {
            return;
        } else {     
            if (!tileExists(row, column)) {
                energizedTiles.push(`${row}-${column}`);
                energizedTilesCount++;
            } 
            energizedTilesAndDirections.push(`${row}-${column}-${direction}`);
    
            const newDirections = changeDirection(rows[row][column], direction);
            newDirections.forEach(newDirection => {
               let [newRow, newColumn] = modifyRowColumn(row, column, newDirection);
               checkNext(newRow, newColumn, newDirection);
            });
        }
    }
}

checkNext(0, 0, 'east');

console.log(energizedTilesCount);
