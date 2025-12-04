import { readFileSync } from "node:fs";

const input: string = readFileSync("2025/day-2/puzzle-input.txt", "utf8");
const idRanges: string[] = input.split(",");

let sumInvalidIds: number = 0;
for (let i = 0; i < idRanges.length; i++) {
  const [lower, upper] = idRanges[i].split("-").map((x) => parseInt(x));

  // Go through id in the given range
  for (let j = lower; j <= upper; j++) {
    const idAsString: string = j.toString();

    // Check if the lenght of the id is divisible by any number between 2 and it's length
    for (let k = 1; k < idAsString.length; k++) {
      if (idAsString.length % k === 0) {
        const arrayOfParts: string[] = [];
        for (let l = 0; l < idAsString.length; l += k) {
          arrayOfParts.push(idAsString.slice(l, l + k));
        }

        if (arrayOfParts.every((part) => part === arrayOfParts[0])) {
          sumInvalidIds += j;
          break;
        }
      }
    }
  }
}

console.log("Sum of invalid IDs:", sumInvalidIds);
