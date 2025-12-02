// Get txt input
const fs = require("fs");
const puzzleInput = fs.readFileSync("input.txt", "utf8");

// Parse input into two lists of numbers
let leftList = [];
let rightList = [];
const lines = puzzleInput.split("\n");
lines.forEach((line) => {
  let [left, right] = line.split("   ");
  leftList.push(parseInt(left));
  rightList.push(parseInt(right));
});

// Sort both lists from least to greatest
function sortList(list) {
  return list.sort((a, b) => a - b);
}
leftList = sortList(leftList);
rightList = sortList(rightList);

// Calculate differences and sum them up
let sum = 0;
leftList.forEach((num, index) => {
  sum += Math.abs(num - rightList[index]);
});

console.log("Sum: ", sum);
