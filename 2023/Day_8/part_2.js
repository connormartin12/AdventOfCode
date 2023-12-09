const fs = require('fs');

function endsWith(word, letter) {
    if (word.slice(-1) === letter)
        return true;
    else
        return false;
}

fs.readFile('puzzle_input.txt', 'utf8', (error, result) => {
    if (error) {
        console.error(error);
        return;
    }

    const lines = result.split('\n');
    const instructions = lines.shift();
    lines.shift();
    let map = {};
    let startingNodes = [];
    lines.forEach(line => {
        const identifier = line.slice(0, 3);
        const left = line.slice(7, 10);
        const right = line.slice(12, 15);
        map[identifier] = {'L': left, 'R': right};

        if (endsWith(identifier, 'A'))
            startingNodes.push([identifier, 0]);
    });

    let steps = 0;
    let instructionIndex = 0;
    let allEndWithZ = false;
    while (!allEndWithZ) {
        if (instructionIndex === instructions.length)
        instructionIndex = 0;

        steps += 1;

        for (let i = 0; i < startingNodes.length; i++) {
            const destination = startingNodes[i][0];
            const instruction = instructions.slice(instructionIndex, instructionIndex + 1);
            startingNodes[i][0] = map[destination][instruction];
            if (endsWith(startingNodes[i][0], 'Z')) {
                if (startingNodes[i][1] === 0)
                    startingNodes[i][1] = steps;
            }
        }
    
        instructionIndex += 1;

        // Check all end with z
        allEndWithZ = startingNodes.every(node => {
            return node[1] > 0;
        });
    }
    
    console.log(startingNodes);
});
