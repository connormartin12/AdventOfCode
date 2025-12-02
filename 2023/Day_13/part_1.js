const fs = require('fs');
const lines = fs.readFileSync("puzzle_input.txt", { encoding: 'utf8' }).split('\n');

const patterns = []
let startingIndex = 0;
lines.forEach((line, index) => {
    if (line.length < 1) {
        patterns.push(lines.slice(startingIndex, index));
        startingIndex = (index + 1);
    }
});

function findRowCenter(pattern) {
    // Find index of row just before mirror
    let mirrorRow = -1;
    for (let i = 0; i < (pattern.length - 1); i++) {
        if (pattern[i] === pattern[i + 1]) {
            mirrorRow = i;
            break;
        }
    }
    if (mirrorRow > -1) {
        let i = 0;
        while (((mirrorRow - i) > -1) && ((mirrorRow + 1 + i) < pattern.length)) {
            if ((pattern[mirrorRow - i] !== pattern[mirrorRow + 1 + i]))
                mirrorRow = -1;
            i++;
        }
    }
    return mirrorRow + 1;
}

function arraysEqual(a, b) {
    if (a === b) return true;
    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
}

function findColumnCenter(pattern) {
    const totalColumns = pattern[0].length;
    let mirrorColumn = -1;
    for (let i = 0; i <= (totalColumns - 2); i++) {
        let column = [];
        let mirroredColumn = [];
        for (j = 0; j < pattern.length; j++) {
            column.push(pattern[j][i]);
            mirroredColumn.push(pattern[j][i+1]);
        }
        if (arraysEqual(column, mirroredColumn)) {
            mirrorColumn = i;
            break;
        }

        // if (mirrorColumn> -1) {
        //     let  i = 0;
        //     while (((mirrorRow - i) > -1) && ((mirrorRow + 1 + i) < totalColumns)) {
        //         let column = [];
        //         let mirroredColumn = [];
        //         for (j = 0; j < pattern.length; j++) {
        //             column.push(pattern[j][i]);
        //             mirroredColumn.push(pattern[j][i+1]);
        //         }
        //         if (!arraysEqual(column, mirroredColumn))
        //             mirrorRow = -1;
        //         i++;
        //     }
        // }
    }

    return mirrorColumn + 1;
}

let sum = 0;
patterns.forEach(pattern => {
    // Check Rows
    const rowCenter = findRowCenter(pattern);
    if (rowCenter > 0) {
        console.log('rowcenter', rowCenter);
        sum += (rowCenter * 100); // Add one since index was returned and starts at 0
    } else {
        // Check Columns
        let columnCenter = findColumnCenter(pattern);
        console.log('columncenter', columnCenter);
        if (columnCenter > 0)
            sum += columnCenter;
        
        //console.log(columnCenter, sum);
    }
});

console.log(sum);
