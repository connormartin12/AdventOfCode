const fs = require('fs');

fs.readFile('puzzle_input.txt', 'utf8', (error, result) => {
    if (error) {
        console.error(error);
        return;
    }

    let sum = 0;
    lines = result.split('\n');
    lines.forEach(line => {
        numbers = line.split(": ")[1].split(" | ");
        winningNumbersString = numbers[0]
        winningNumbers = [];
        for (let i = 0; i < winningNumbersString.length; i++) {
            winningNumbers.push(parseInt(winningNumbersString.slice(i, i + 2)));
            i += 2; 
        }

        haveNumbersString = numbers[1];
        haveNumbers = [];
        for (let i = 0; i < haveNumbersString.length; i++) {
            haveNumbers.push(parseInt(haveNumbersString.slice(i, i + 2)));
            i += 2; 
        }
        let gamePoints = 0;
        haveNumbers.forEach((number) => {
            if (winningNumbers.includes(number)) {
                if (gamePoints === 0) {
                    gamePoints++;
                } else {
                    gamePoints *= 2;
                }
            }
        });
        sum += gamePoints;
    });

    console.log(sum);
});