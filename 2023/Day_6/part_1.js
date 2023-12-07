const fs = require('fs');


const result = fs.readFile('puzzle_input.txt', 'utf8', (error, result) => {
    if (error) {
        console.error(error);
        return;
    }

    const [time, distance] = result.split('\n');
    const times = time.split(' ').map(num => parseInt(num)).filter(num => !isNaN(num));
    const distances = distance.split(' ').map(num => parseInt(num)).filter(num => !isNaN(num));
    
    let product = 0;
    for (let i = 0; i < times.length; i++) {
        let waysToWin = 0;
        const seconds = times[i];
        const record = distances[i];
        for (let timePressed = 0; timePressed <= seconds; timePressed++) {
            const distance = timePressed * (seconds - timePressed);
            if (distance > record) waysToWin++
        }
        if (product === 0)
            product += waysToWin;
        else
            product *= waysToWin;
    }

    console.log(product);
});
