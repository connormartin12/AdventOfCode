const fs = require('fs');

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
            if ((line.charCodeAt(i) >= 48) && (line.charCodeAt(i) <= 57)) {
                if (haveFirstNumber) {
                    lastNumber = line[i];
                } else {
                    firstNumber = line[i];
                    haveFirstNumber = true;
                }
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