const fs = require('fs');
const lines = fs.readFileSync("puzzle_input.txt", { encoding: 'utf8' }).split('\n');

lines.forEach((line, i) => {
    lines[i] = line.split('');
})

function tiltNorth() {
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[0].length; j++) {
            if (lines[i][j] === 'O') {
                prevRow = (i - 1);
                while ((prevRow >= 0) && (lines[prevRow][j] === '.')) {
                    lines[prevRow + 1][j] = '.';
                    lines[prevRow][j] = 'O';
                    prevRow--;
                }
            }
        }
    }
}

function tiltWest() {
    for (let i = 0; i < lines[0].length; i++) {
        for (let j = 0; j < lines.length; j++) {
            if (lines[j][i] === 'O') {
                prevColumn = (i - 1);
                while ((prevColumn >= 0) && (lines[j][prevColumn] === '.')) {
                    lines[j][prevColumn + 1] = '.';
                    lines[j][prevColumn] = 'O';
                    prevColumn--;
                }
            }
        }
    }
}

function tiltSouth() {
    for (let i = (lines.length - 1); i >= 0; i--) {
        for (let j = 0; j < lines[0].length; j++) {
            if (lines[i][j] === 'O') {
                nextRow = (i + 1);
                while ((nextRow < lines.length) && (lines[nextRow][j] === '.')) {
                    lines[nextRow - 1][j] = '.';
                    lines[nextRow][j] = 'O';
                    nextRow++;
                }
            }
        }
    }
}

function tiltEast(cycles) {
    let sum = 0;
    for (let i = (lines[0].length - 1); i >=0; i--) {
        for (let j = 0; j < lines.length; j++) {
            if (lines[j][i] === 'O') {
                nextColumn = (i + 1);
                while ((nextColumn < lines[0].length) && (lines[j][nextColumn] === '.')) {
                    lines[j][nextColumn - 1] = '.';
                    lines[j][nextColumn] = 'O';
                    nextColumn++;
                }
                sum += (lines.length - j);
            }
        }
    }
    if (((cycles % 1) === 0) && (cycles !== 0))
        console.log(cycles, '-', sum);
}

cycles = 1000000000;
for (let i = 0; i < cycles; i++) {
    tiltNorth();
    tiltWest();
    tiltSouth();
    tiltEast(i);
}
