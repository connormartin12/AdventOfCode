const fs = require('fs');
const steps = fs.readFileSync("puzzle_input.txt", { encoding: 'utf8' }).split(',');

let boxes = {};

steps.forEach(step => {
    stepChars = step.split('');
    let box = 0;
    let label = '';
    let lens;
    let labelFinished = false;
    stepChars.forEach((char, index) => {
        if (char === '-') {
            // Remove label
            labelFinished = true;
            if (boxes[box])
                delete boxes[box][label];
        } else if (char === '=') {
            // Add label w/ lens
            lens = step[index  + 1];
            labelFinished = true;
            if (!boxes[box]) {
                boxes[box] = {};
            }
            boxes[box][label] = lens;
        } else {
            if (!labelFinished) {
                // Perform hash algorithm
                box += char.charCodeAt(0);
                box *= 17;
                box %= 256;
                label += char;
            }
        }
    });
});

let focusingPower = 0;
for (let i = 0; i <= 255; i++) {
    if (boxes[i]) {
        currentBox = boxes[i];
        lenses = Object.keys(currentBox);
        for (let j = 0; j < lenses.length; j++) {
            if (lenses[j] !== undefined) {
                focusingPower += ((i + 1) * (j + 1) * currentBox[lenses[j]]);
            }
        }
    }
}

console.log(focusingPower);
