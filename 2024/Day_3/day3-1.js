// Get txt input
const fs = require("fs");
const puzzleInput = fs.readFileSync("input.txt", "utf8");

const mulMatch = /mul\(\d{1,3},\d{1,3}\)/g;

let mulExpressions = puzzleInput.match(mulMatch); // Returns array of all matched mul expressions

sum = 0;
mulExpressions.forEach((mulExpression) => {
  numMatch = mulExpression.match(/\d{1,3},\d{1,3}/);
  let nums = numMatch[0].split(",");
  sum += parseInt(nums[0]) * parseInt(nums[1]);
});

console.log("Sum: ", sum);
