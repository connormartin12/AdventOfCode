const fs = require('fs');

fs.readFile('puzzle_input.txt', 'utf8', (error, result) => {
    if (error) {
        console.error(error);
        return;
    }

    lines = result.split('\n');

    let starPositions = [];

    lines.forEach((line, row) => {
        chars = line.split("");
        chars.forEach((char, column) => {
            if (char.charCodeAt(0) === 42) {
                position = [row, column, []];
                starPositions.push(position);
            }
        });
    });
    
    function checkAdjacentRows (number, row, column) {
        for (let i = -1; i < number.length + 1; i++) {
            if (column + i < 0) continue;
            if (column + i >= lines[row].length) continue;
            let char = lines[row][column + i];
            let charCode = char.charCodeAt(0);
            if (charCode === 42) {
                starPositions.forEach(position => {
                    if ((position[0] === row) && (position[1] === column + i)) {
                        position[2].push(parseInt(number));
                        return;
                    }
                });
            }
        }
    };

    for (let row = 0; row < lines.length; row++) {
        let currentRow = lines[row];
        for (let column = 0; column < currentRow.length; column++) {
            if ((currentRow.charCodeAt(column) >= 48) && (currentRow.charCodeAt(column) <= 57)) {
                let number = currentRow[column];
                let numCounter = 1;
                while ((currentRow.charCodeAt(column + numCounter) >= 48) && 
                    (currentRow.charCodeAt(column + numCounter) <= 57)) {
                    number += currentRow[column + numCounter];
                    numCounter++;
                }
                console.log(number);

                let validNumber = false;
                if (row - 1 >= 0) {
                    checkAdjacentRows(number, row - 1, column);
                    if (currentRow.charCodeAt(column - 1) === 42) {
                        starPositions.forEach(position => {
                            if ((position[0] === row) && (position[1] === column - 1)) {
                                position[2].push(parseInt(number));
                            }
                        });
                    }
                }
                if (((row + 1) < lines.length) && !validNumber) {
                    checkAdjacentRows(number, row + 1, column);
                    if (currentRow.charCodeAt(column + number.length) === 42) {
                        starPositions.forEach(position => {
                            if ((position[0] === row) && (position[1] === column + number.length)) {
                                position[2].push(parseInt(number));
                            }
                        });
                    } 
                }

                column += numCounter;
            }
        }
    }

    let sum = 0;
    starPositions.forEach(position => {
        let starNumbers = position[2];
        if (starNumbers.length === 2) {
            sum += starNumbers[0]*starNumbers[1];
        }
    })

    console.log(sum);
});