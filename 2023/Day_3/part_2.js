const fs = require('fs');

fs.readFile('puzzle_input.txt', 'utf8', (error, result) => {
    if (error) {
        console.error(error);
        return;
    }

    let sum = 0;
    lines = result.split('\n');

    function checkAdjacentRows (numberLength, row, column) {
        if (column - 1 >= 0) column -= 1;
        for (let i = 0; i <= numberLength + 1; i++) {
            if (column + i >= lines[row].length) continue;
            let char = lines[row][column + i];
            let charCode = char.charCodeAt(0);
            if ((charCode < 46) || (charCode >= 57) || (charCode === 47))    
                return true;
        }
        return false;
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

                let validNumber = false;
                if (row - 1 >= 0) {
                    let symbol = checkAdjacentRows(number.length, row - 1, column);
                    if ((currentRow.charCodeAt(column - 1) < 46) || currentRow.charCodeAt(column - 1) >= 57 || 
                        currentRow.charCodeAt(column - 1) == 47)
                        symbol = true;
                    if (symbol) validNumber = true;
                }
                if (((row + 1) < lines.length) && !validNumber) {
                    let symbol = checkAdjacentRows(number.length, row + 1, column);
                    if ((currentRow.charCodeAt(column + number.length) < 46) || currentRow.charCodeAt(column + number.length) >= 57 || 
                        currentRow.charCodeAt(column + number.length) == 47)
                        symbol = true;
                    if (symbol) validNumber = true;
                }

                if (validNumber) {
                    console.log(number);
                    sum += parseInt(number);
                }
                column += numCounter;
            }
        }
    }
    
    console.log(sum);
});