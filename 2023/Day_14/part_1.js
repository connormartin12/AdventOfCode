const fs = require('fs');
const lines = fs.readFileSync("puzzle_input.txt", { encoding: 'utf8' }).split('\n');

lines.forEach((line, i) => {
    lines[i] = line.split('');
})

let sum = 0;
// Skip first row since no rock can roll above the first row
for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
        if (lines[i][j] === 'O') {
            let moved = false;
            prevRow = (i - 1);
            while ((prevRow >= 0) && (lines[prevRow][j] === '.')) {
                moved = true;
                lines[prevRow + 1][j] = '.';
                lines[prevRow][j] = 'O';
                prevRow--;
            }
            moved ? (sum += (lines.length - (prevRow + 1))) : (sum += (lines.length - i)) 
        }
    }
}

console.log(sum);