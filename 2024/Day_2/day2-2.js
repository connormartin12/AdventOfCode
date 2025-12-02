// Get txt input
const fs = require("fs");
const puzzleInput = fs.readFileSync("input.txt", "utf8");
const lists = puzzleInput.split("\n"); // Parse input into lists

let safeLists = 0;

function evaluateList(list) {
  // let sameNumber = false;
  // let increasingCount = 0;
  // let decreasingCount = 0;
  // let maxDifference = 0;
  // list = list.split(" ");
  // let lastLevel;
  // list.forEach((level, index) => {
  //   if (index > 0) {
  //     let difference = parseInt(level) - parseInt(lastLevel);
  //     if (difference > 0) {
  //       increasingCount++;
  //       maxDifference = Math.max(maxDifference, difference);
  //     } else if (difference < 0) {
  //       decreasingCount++;
  //       maxDifference = Math.max(maxDifference, Math.abs(difference));
  //     } else if (difference === 0) {
  //       sameNumber = true;
  //     }
  //   }
  //   lastLevel = level;
  // });
  // if (increasingCount > 0 && decreasingCount > 0) return;
  // if (maxDifference > 3) return;
  // if (sameNumber) return;
  // safeLists++;
}

// Evaluate each list
lists.forEach((list) => evaluateList(list));

console.log("Safe Lists: ", safeLists);
