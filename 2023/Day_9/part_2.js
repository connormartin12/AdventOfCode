const fs = require('fs');

const lines = fs.readFileSync("puzzle_input.txt", { encoding: 'utf8' }).split('\n');

function checkZeros(array) {
    return array.every(element => { return element === 0 });
};

let sum = 0;
lines.forEach(line => {
    let matrix = [line.split(' ').map(num => parseInt(num))];
    while (!checkZeros(matrix[matrix.length - 1])) {
        let matrixLine = [];
        let lastArray = matrix[matrix.length - 1];
        for (let i = 1; i < lastArray.length; i++) {
            const diff = lastArray[i] - lastArray[i-1];
            matrixLine.push(diff);
        } 

        matrix.push(matrixLine);
    }

    matrix[matrix.length - 1].unshift(0);
    for (let i = (matrix.length - 2); i >= 0; i--) {
        const newNumber = matrix[i][0] - matrix[i + 1][0];
        matrix[i].unshift(newNumber);
    }

    // console.log(matrix);

    sum += matrix[0][0];
});

console.log(sum);
