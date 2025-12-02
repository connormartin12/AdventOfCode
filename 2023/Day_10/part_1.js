const fs = require('fs');
const lines = fs.readFileSync("calibration1_input.txt", { encoding: 'utf8' }).split('\n');

function findStart () {
    let row, column;
    lines.forEach((line, i) => {
        j = line.indexOf("S");
        if (j > -1) {
            row = i;
            column = j;
            return;
        }
    });
    return [row, column];
}

const [startRow, startColumn] = findStart();
let startingDirections;

if (startRow === 0) {
    if (startColumn === 0) {
        startingDirections = [
            {'pipes' : ['-', 'J', '7'], 'directions': [0, 1], 'direction': 'east'},
            {'pipes' : ['|', 'L', 'J'], 'directions': [1, 0], 'direction': 'south'},
        ];
    } else if (startColumn === (lines[0].length - 1)) {
        startingDirections = [
            {'pipes' : ['|', 'L', 'J'], 'directions': [1, 0], 'direction': 'south'},
            {'pipes' : ['-', 'L', 'F'], 'directions': [0, -1], 'direction': 'west'}
        ];
    } else {
        startingDirections = [
            {'pipes' : ['-', 'J', '7'], 'directions': [0, 1], 'direction': 'east'},
            {'pipes' : ['|', 'L', 'J'], 'directions': [1, 0], 'direction': 'south'},
            {'pipes' : ['-', 'L', 'F'], 'directions': [0, -1], 'direction': 'west'}
        ];
    }
} else if (startRow === (lines.length - 1)) {
    if (startColumn === 0) {
        startingDirections = [
            {'pipes' : ['|', '7', 'F'], 'directions': [-1, 0], 'direction': 'north'}, 
            {'pipes' : ['-', 'J', '7'], 'directions': [0, 1], 'direction': 'east'},
        ];
    } else if (startColumn === (lines[0].length - 1)) {
        startingDirections = [
            {'pipes' : ['|', '7', 'F'], 'directions': [-1, 0], 'direction': 'north'}, 
            {'pipes' : ['-', 'L', 'F'], 'directions': [0, -1], 'direction': 'west'}
        ];
    } else {
        startingDirections = [
            {'pipes' : ['|', '7', 'F'], 'directions': [-1, 0], 'direction': 'north'}, 
            {'pipes' : ['-', 'J', '7'], 'directions': [0, 1], 'direction': 'east'},
            {'pipes' : ['-', 'L', 'F'], 'directions': [0, -1], 'direction': 'west'}
        ];
    }
} else if (startColumn === 0) {
    startingDirections = [
        {'pipes' : ['|', '7', 'F'], 'directions': [-1, 0], 'direction': 'north'}, 
        {'pipes' : ['-', 'J', '7'], 'directions': [0, 1], 'direction': 'east'},
        {'pipes' : ['|', 'L', 'J'], 'directions': [1, 0], 'direction': 'south'},
    ];
} else if (startColumn === (lines[0].length - 1)) {
    startingDirections = [
        {'pipes' : ['|', '7', 'F'], 'directions': [-1, 0], 'direction': 'north'}, 
        {'pipes' : ['|', 'L', 'J'], 'directions': [1, 0], 'direction': 'south'},
        {'pipes' : ['-', 'L', 'F'], 'directions': [0, -1], 'direction': 'west'}
    ];
} else {
    startingDirections = [
        {'pipes' : ['|', '7', 'F'], 'directions': [-1, 0], 'direction': 'north'}, 
        {'pipes' : ['-', 'J', '7'], 'directions': [0, 1], 'direction': 'east'},
        {'pipes' : ['|', 'L', 'J'], 'directions': [1, 0], 'direction': 'south'},
        {'pipes' : ['-', 'L', 'F'], 'directions': [0, -1], 'direction': 'west'}
    ];
}


const pipes = {
    '|': { // Vertical pipe connecting north and south
        'north': { 'pipes': ['|', '7', 'F'], 'directions': [-1, 0] }, 
        'south': { 'pipes': ['|', 'L', 'J'], 'directions': [1, 0] } 
    },
    '-': { // Horizontal pipe connecting east and west
        'east': { 'pipes': ['-', 'J', '7'], 'directions': [0, 1] },
        'west': { 'pipes': ['-', 'L', 'F'], 'directions': [0, -1] }
    },
    'L': { // 90-degree bend connecting north and east
        'north': { 'pipes': ['|', '7', 'F'], 'directions': [-1, -1] },
        'east': { 'pipes': ['-', 'J', '7'], 'directions': [1, 1] }
    },
    'J': { // 90-degree bend connecting north and west
        'north': { 'pipes': ['|', '7', 'F'], 'directions': [-1, 1] },
        'west': { 'pipes': ['-', 'L', 'F'], 'directions': [1, -1] }
    },
    '7': { // 90-degree bend connecting south and west
        'south': { 'pipes': ['|', 'L', 'J'], 'directions': [1, 1] },
        'west': { 'pipes': ['-', 'F', 'L'], 'directions': [-1, -1] }
    },
    'F': { // 90-degree bend connecting south and east
        'south': { 'pipes': ['|', 'L', 'J'], 'directions': [1, -1] },
        'east': { 'pipes': ['-', '7', 'L'], 'directions': [-1, 1] }
    },
    '.': 8, // Ground -> no pipe here
    'S': 9, // Starting position. Unkown pipe: Assume S works for any scenario
}


let moves;
startingDirections.forEach(direction => {
    let [row, column] = [startRow, startColumn];
    moves = 1;
    row += direction['directions'][0];
    column += direction['directions'][1];

    let nextPipe = lines[row][column];
    let going = direction['direction'];
    // console.log(going);
    if (direction['pipes'].indexOf(nextPipe) > -1) {
        let validPipe = true;
        while (validPipe) {
            let comingFrom;
            switch (going) {
                case 'north':
                    comingFrom = 'south';
                    break;
                case 'south':
                    comingFrom = 'north';
                    break;
                case 'east':
                    comingFrom = 'west';
                    break;
                case 'west':
                    comingFrom = 'east';
                    break;
            }


            going = Object.keys(pipes[nextPipe]).find(elem => {
                return elem === going; 
            });
            console.log(going);
            break;
        }
    }
});