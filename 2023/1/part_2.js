const fs = require('fs');

const numbers = [
    {
        letters: 'one',
        number: '1'
    },
    {
        letters: 'two',
        number: '2'
    },
    {
        letters: 'three',
        number: '3'
    },
    {
        letters: 'four',
        number: '4'
    },
    {
        letters: 'five',
        number: '5'
    },
    {
        letters: 'six',
        number: '6'
    },
    {
        letters: 'seven',
        number: '7'
    },
    {
        letters: 'eight',
        number: '8'
    },
    {
        letters: 'nine',
        number: '9'
    },
];

fs.readFile('puzzle_input.txt', 'utf8', (error, result) => {
    if (error) {
        console.error(error);
        return;
    }
    
    let sum = 0;

    const lines = result.split('\n');
    lines.forEach(line => {
        let firstNumber;
        let lastNumber = undefined;
        let haveFirstNumber = false;
        for (i = 0; i < line.length; i++) {
            let currentNumber = undefined;
            if ((line.charCodeAt(i) >= 48) && (line.charCodeAt(i) <= 57)) {
                currentNumber = line[i];
            } else {
                numbers.forEach((number) => {
                    index = line.indexOf(number.letters, i);
                    if (index === i) {
                        currentNumber = number.number;
                        return;
                    }
                });
                
            }

            if (currentNumber === undefined) continue;
            if (haveFirstNumber) {
                lastNumber = currentNumber;
            } else {
                firstNumber = currentNumber;
                haveFirstNumber = true;
            }
        }
        if (lastNumber === undefined) {
            lastNumber = firstNumber;
        }
        const finalNumber = parseInt(`${firstNumber}${lastNumber}`);
        sum += finalNumber;
    });
    console.log(sum);
});