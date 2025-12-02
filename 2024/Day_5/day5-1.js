// Get txt input
const fs = require("fs");
const puzzleInput = fs.readFileSync("testInput.txt", "utf8");

let [rules, updates] = puzzleInput.split("\n\n");
rules = rules.split("\n");
rules = rules.map((rule) => {
  return rule.split("|");
});
updates = updates.split("\n");

updates.forEach((update) => {
  const updatePages = update.split(",");
  for (let i = 0; i < updatePages.length; i++) {
    const page = updatePages[i];
    rules.forEach((rule) => {
      const [pageA, pageB] = rule;
      if (page === pageA) {
        updatePages.find();
      }
    });
  }
});
