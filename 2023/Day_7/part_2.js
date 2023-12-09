const fs = require('fs');

const cards = {
    'T': 10,
    'J': 1, // Now becomes weakest card
    'Q': 12,
    'K': 13,
    'A': 14,
}

const result = fs.readFile('puzzle_input.txt', 'utf8', (error, result) => {
    if (error) {
        console.error(error);
        return;
    }

    let ranks = [];

    // Parse data into numbered hands
    lines = result.split('\n');
    lines.forEach(line => {
        [hand, bid] = line.split(' ');
        let handArray = hand.split('')
        handArray.forEach((card, index) => {
            if (card.charCodeAt(0) >= 65 && card.charCodeAt(0) <= 90)
                handArray[index] = cards[card];
            else
                handArray[index] = parseInt(card);
        });
        const bidNum = parseInt(bid);

        let counter = {};
        handArray.forEach(card => {
            if (counter[card]) {
                counter[card] += 1;
            } else {
                counter[card] = 1;
            }
        });
        counter = Object.keys(counter).map(key => [parseInt(key), counter[key]]);

        // 5 of a kind      7 points
        // 4 of a kind      6 points
        // Full house       5 points
        // 3 of a kind      4 points
        // 2 Pair           3 points
        // 1 Pair           2 points     
        // High card:       1 point
        // Give each hand a score, lowest to highest. Score = Hand strength 1-7
        let score = 0;
        let jokers = 0;
        counter.forEach(card => {
            if (card[0] === 1)
            jokers = card[1];
        });
        const uniqueCards = counter.length;

        switch (uniqueCards) {
            case 1: // 1 Unique card = 5 of a kind
                score = 7;
                break;
            case 2: // 2 unique cards = 4 of a kind or full house
                let fourKind = counter.some(card => {
                    return card[1] === 4;
                });
                if (fourKind)
                    score = 6;
                else
                    score = 5;
                break;
            case 3: // 3 unique cards = 3 of a kind or two pair
                let threeKind = counter.some(card => {
                    return card[1] === 3;
                });
                if (threeKind)
                    score = 4;
                else
                    score = 3;
                break;
            case 4: // 4 unique cards = 1 pair
                score = 2;
                break;
            case 5: // 5 unique cards = high card
                score = 1;
                break;
        }
        // 5 of a kind      7 points
        // 4 of a kind      6 points
        // Full house       5 points
        // 3 of a kind      4 points
        // 2 Pair           3 points
        // 1 Pair           2 points     
        // High card:       1 point
        switch (score) {
            case 1: // 5 unique cards. Joker => 1 pair
                if (jokers > 0)
                score = 2;
                break;
            case 2: // 1 pair. Joker => 3 of a kind
                if (jokers > 0)
                    score = 4;
                break;
            case 3: // 2 pair
                if (jokers === 1) // 1 Joker => full house
                    score = 5;
                else if (jokers === 2) // 2 Jokers => 4 of a kind
                    score = 6;
                break;
            case 4: // 3 of a kind
                if (jokers > 0)
                    score = 6;
                break;
            case 5: // Full house
                if (jokers > 0) // If jokers exist => 5 of a kind
                    score = 7;
                    break;
            case 6: // 4 of a kind
                if (jokers > 0)
                    score = 7;
                break;
        }

        ranks.push({ 'hand': handArray, 'bid': bidNum, 'score': score });
    });

    // console.log(ranks);
    
    // Sort ranks by score. If scores are equal, sort by highest card
    ranks.sort((a, b) => {
        if (a['score'] === b['score']) {
            for (let i = 0; i < a['hand'].length; i++) {
                if (a['hand'][i] !== b['hand'][i])
                    return a['hand'][i] - b['hand'][i];
            }
        }
        else
            return a['score'] - b['score'];
    });
    
    // console.log(ranks);

    let winnings = 0;
    ranks.forEach((rank, i) => {
        winnings += (rank['bid'] * (i + 1));
    });

    console.log(winnings);
});
