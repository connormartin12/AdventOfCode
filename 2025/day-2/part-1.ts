import { readFileSync } from "node:fs";

const input: string = readFileSync("2025/day-2/puzzle-input.txt", "utf8");
const idRanges: string[] = input.split(",");

let sumInvalidIds: number = 0;
for (let i = 0; i < idRanges.length; i++) {
  const [lower, upper] = idRanges[i].split("-").map((x) => parseInt(x));

  for (let j = lower; j <= upper; j++) {
    const idAsString: string = j.toString();
    if (idAsString.length % 2 === 0) {
      const firstHalf: string = idAsString.slice(0, idAsString.length / 2);
      const secondHalf: string = idAsString.slice(
        idAsString.length / 2,
        idAsString.length
      );
      if (firstHalf === secondHalf) {
        sumInvalidIds += j;
      }
    }
  }
}

console.log("Sum of invalid IDs:", sumInvalidIds);
