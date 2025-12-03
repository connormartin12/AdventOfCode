import { readFileSync } from "node:fs";

const input: string = readFileSync("2025/day-1/puzzle-input.txt", "utf8");
const lines: string[] = input.split("\n");

const updateDialPosition = (position: number, rotation: string): number => {
  const rotationDirection = rotation.charAt(0);
  const rotationValue = parseInt(rotation.slice(1));

  if (rotationDirection === "R") {
    position += rotationValue;
    if (position > 99) {
      position = updateDialPosition(-1, `${rotationDirection}${position - 99}`);
    }
  } else {
    if (position - rotationValue < 0) {
      position = updateDialPosition(
        99,
        `${rotationDirection}${Math.abs(position - rotationValue + 1)}`
      );
    } else {
      position -= rotationValue;
    }
  }

  return position;
};

let password: number = 0;
let dialPosition: number = 50;
for (let i = 0; i < lines.length; i++) {
  const rotation = lines[i];
  dialPosition = updateDialPosition(dialPosition, rotation);
  if (dialPosition === 0) {
    password += 1;
  }
}

console.log("Password -", password);
