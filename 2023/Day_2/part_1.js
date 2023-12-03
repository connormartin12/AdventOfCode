const fs = require('fs');

const bagContents = {
    red: 12,
    green: 13,
    blue: 14,
};

fs.readFile('puzzle_input.txt', 'utf8', (error, result) => {
    if (error) {
        console.error(error);
        return;
    }

    let sum = 0;

    const lines = result.split('\n');
    lines.forEach((line, gameID) => {
        let answers = line.split(': ')[1].split('; ');
        let validAnswer = true;
        answers.forEach(answer => {
            pulls = answer.split(', ');
            let validPull = true;
            pulls.forEach(pull => {
                number_color = pull.split(' ');
                let number = parseInt(number_color);
                let color = number_color[1];
                if (number > bagContents[color]) validAnswer = false;
            });
        });

        if (validAnswer) sum += gameID + 1;
    });

    console.log(`\nSum: ${sum}`);
});