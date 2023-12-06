const fs = require('fs');


const result = fs.readFile('puzzle_input.txt', 'utf8', (error, result) => {
    if (error) {
        console.error(error);
        return;
    }

    // Parse Input
    const lines = result.split('\n');
    const seedNums = lines.shift().split(': ')[1].split(' ').map(num => parseInt(num)).filter(num => !isNaN(num));
    const seedPairs = [];
    for (let i = 0; i < seedNums.length; i+=2) {
        seedPairs.push([seedNums[i], seedNums[i + 1]]);
    }
    // console.log(seedPairs);
    lines.shift();
    const maps = [];
    for (let i = 0; i < lines.length; i++) {
        let map = [];
        let counter = 0;
        while (lines[i + counter].length > 0) {
            map.push(lines[i + counter]);
            counter++
            if (lines[i + counter + 1] == undefined) break;
        }
        maps.push(map);
        i += counter;
    }

    for (let i = 0; i < maps.length; i++) {
        seedNums.forEach((seed, index)  => {
            for (let j = 1; j < maps[i].length; j++) {
                const nums = maps[i][j].split(' ').map(num => parseInt(num)).filter(num => !isNaN(num));
                const transformation = nums[0] - nums[1];
                if ((nums[1] <= seed) && (seed <= (nums[1] + nums[2]))) {
                    seedNums[index] = seed + transformation;
                    break;
                }
            }
        });
    }

    console.log(Math.min(...seedNums));
});
