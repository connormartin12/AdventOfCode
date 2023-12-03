const fs = require('fs');

fs.readFile('puzzle_input.txt', 'utf8', (error, result) => {
    if (error) {
        console.error(error);
        return;
    }
    
    let sum = 0;
    
    const lines = result.split('\n');
    lines.forEach(line => {
        let answers = line.split(': ')[1].split('; ');
        console.log(answers);
        let bagContents = {
            red: 0,
            green: 0,
            blue: 0,
        };
        answers.forEach(answer => {
            pulls = answer.split(', ');
            pulls.forEach(pull => {
                number_color = pull.split(' ');
                let number = parseInt(number_color);
                let color = number_color[1];
                if (number > bagContents[color]) 
                    bagContents[color] = number;
            });
        });

        sum += bagContents['red'] * bagContents['green'] * bagContents['blue'];
    });

    console.log(`\nSum: ${sum}`);
});