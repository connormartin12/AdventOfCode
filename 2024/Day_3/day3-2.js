// Get txt input
const fs = require("fs");
const puzzleInput = fs.readFileSync("input.txt", "utf8");

// No using g at end. We only want the next match
const mulMatch = /mul\(\d{1,3},\d{1,3}\)/;

function evalMul(mulExpression) {
  numMatch = mulExpression.match(/\d{1,3},\d{1,3}/);
  let nums = numMatch[0].split(",");
  return parseInt(nums[0]) * parseInt(nums[1]);
}

let sum = 0;
for (let i = 0; i < puzzleInput.length; i++) {
  // console.log("index: ", i);
  let nextMul = puzzleInput.slice(i).match(mulMatch);

  // If no more mul instructions exist, quit loop
  if (!nextMul) break;

  let nextMulIndex = nextMul.index;
  let nextDontIndex = puzzleInput.indexOf("don't()", i);
  // console.log("next mul index: ", nextMulIndex);
  // console.log("next dont index: ", nextDontIndex);

  let nextDoIndex = puzzleInput.indexOf("do()", i);
  if (nextDontIndex < nextMulIndex && nextDontIndex !== -1) {
    i = nextDoIndex;
  } else {
    sum += evalMul(nextMul[0]);
    i += nextMulIndex;
  }
  if (nextDoIndex === -1) break;
}

console.log("Sum: ", sum);
