const fs = require('fs');

function parseInput(input) {
    const split = input.split('\n')
    const cardData = split.map(card => {
      const [cardNumber, cardData] = card.split(':').map(str => str.trim())
      const id = parseInt(cardNumber.replace('Card ', ''))
      const [winners, owned] = cardData.split('|').map(str => str.trim())
      const winnerNumbers = new Set(winners.split(' ').map(num => parseInt(num)).filter(num => !isNaN(num)))
      const ownedNumbers = owned.split(' ').map(num => parseInt(num)).filter(num => !isNaN(num))
      const wins = ownedNumbers.filter(num => winnerNumbers.has(num)).length || 0
      return {id, winnerNumbers, ownedNumbers, wins}
    })
    return cardData
}

fs.readFile('puzzle_input.txt', 'utf8', (error, result) => {
    if (error) {
        console.error(error);
        return;
    }

    const input = parseInput(result);
    const cards = [...input];
    for (let i = 0; i < cards.length; i++) {
        for (let j = 0; j < cards[i].wins; j++) {
            cards.push(input[cards[i].id + j]);
        }
    }

    console.log(cards.length);
});