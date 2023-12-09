const fs = require('fs');

fs.readFile('puzzle_input.txt', 'utf8', (error, result) => {
    if (error) {
        console.error(error);
        return;
    }

    const lines = result.split('\n');
    const instructions = lines.shift();
    lines.shift();
    let map = {};
    lines.forEach(line => {
        const identifier = line.slice(0, 3);
        const left = line.slice(7, 10);
        const right = line.slice(12, 15);
        map[identifier] = {'L': left, 'R': right};
    });

    //console.log(map);
    let steps = 0;
    let instructionIndex = 0;
    let destination = 'AAA';
    while (destination !== 'ZZZ') {
        if (instructionIndex === instructions.length)
        instructionIndex = 0;
    
        const instruction = instructions.slice(instructionIndex, instructionIndex + 1);
        
        destination = map[destination][instruction];

        instructionIndex += 1;
        steps += 1;
    }

    console.log(steps);
});
