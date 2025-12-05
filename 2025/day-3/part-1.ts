import { readFileSync } from "node:fs";

const input: string = readFileSync("2025/day-3/puzzle-input.txt", "utf8");

let totalOutputJoltage: number = 0;
function main() {
  const banks: string[] = input.split("\n");
  banks.forEach((bank) => {
    const digits: string[] = bank.split("");

    let firstDigit: string;
    let secondDigit: string;
    let highestDigitIndex: number;

    const sortedDigits: string[] = [...digits].sort(
      (a, b) => parseInt(b) - parseInt(a)
    );

    highestDigitIndex = digits.indexOf(sortedDigits[0]);

    // If highest digit is at the end of the array, then the second highest digit is the first digit
    if (highestDigitIndex === digits.length - 1) {
      firstDigit = sortedDigits[1];
      secondDigit = sortedDigits[0];
    } else {
      firstDigit = sortedDigits[0];
      const sortedTruncatedDigits = [...digits]
        .slice(highestDigitIndex + 1)
        .sort((a, b) => parseInt(b) - parseInt(a));
      secondDigit = sortedTruncatedDigits[0];
    }

    totalOutputJoltage += parseInt(firstDigit + secondDigit);
  });
}

console.time("Execution time");
main();
console.timeEnd("Execution time");

console.log("Answer: ", totalOutputJoltage);
