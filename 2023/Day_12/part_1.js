const fs = require('fs');
const lines = fs.readFileSync("calibration_input.txt", { encoding: 'utf8' }).split('\n');

let totalOptions = 0;

function findOptions (springs, springsIndex, groupSizes) {
    console.log(springs, springsIndex, groupSizes)

    // If no more groups, check if there are any # left.
    if (groupSizes.length < 1) {
        if (springs.indexOf('#', springsIndex) < 0) { // No more # left = valid option 
            totalOptions++;
            console.log("valid");
        }
        return;
    }
    // If end of string is reached, and groupSizes are left
    if (springsIndex > (springs.length - 1))
        return;

    let firstChar = springs[springsIndex];
    switch (firstChar) {
        case '.':
            findOptions(springs, (springsIndex + 1), groupSizes);
            break;
        case '?':
            // Consider the ? to be a #
            springsArray = springs.split('');
            springsArray.splice(springsIndex, 1);
            springsArray.splice(springsIndex, 0, '#');
            springs = springsArray.join('');
            findOptions(springs, springsIndex, groupSizes);

            // Consider the ? to be a .
            springsArray = springs.split('');
            springsArray.splice(springsIndex, 1);
            springsArray.splice(springsIndex, 0, '.');
            springs = springsArray.join('');
            findOptions(springs, (springsIndex + 1), groupSizes);
            break;
        case '#':
            //Get length of #/? section
            let sectionLength = 0;
            let tempIndex = springsIndex;
            while ((springs[tempIndex] === '#') || (springs[tempIndex] === '?')) {
                sectionLength++;
                tempIndex++;
            }

            // If section length >= groupSize, then the group can go here.
            if (sectionLength >= groupSizes[0]) {
                console.log(sectionLength)
                if ((springs[groupSizes[0] + 1] === '.') || (springs[groupSizes[0] + 1] === '?')) {
                    springsIndex += (groupSizes[0] + 1);
                    groupSizes.shift();
                } else {
                    springsIndex++;
                }
            } else {
                springsIndex = tempIndex;
            }
            findOptions(springs, springsIndex, groupSizes);
            break;
    }

}

lines.forEach((line, index) => {
    let [springs, groups] = line.split(' ');
    let groupSizes = groups.split(',').map(num => parseInt(num));
    
    if (index === 1) 
        findOptions(springs, 0, groupSizes);
});

console.log(totalOptions);
