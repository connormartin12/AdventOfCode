import { readFileSync } from "node:fs";

const input: string = readFileSync("2025/day-1/puzzle-input.txt", "utf8");
const lines: string[] = input.split("\n");

let password: number = 0;

const updateDialPosition = (position: number, rotation: string): number => {
  const rotationDirection = rotation.charAt(0);
  const rotationValue = parseInt(rotation.slice(1));

  if (rotationDirection === "R") {
    position += rotationValue;
    if (position > 99) {
      if (position > 100) {
        position = updateDialPosition(
          -1,
          `${rotationDirection}${position - 99}`
        );
      } else {
        position = 0;
      }
      password++;
    }
  } else {
    if (position - rotationValue < 0) {
      if (position !== 0) {
        password++;
      }
      position = updateDialPosition(
        99,
        `${rotationDirection}${Math.abs(position - rotationValue + 1)}`
      );
    } else {
      position -= rotationValue;
      if (position === 0) {
        password++;
      }
    }
  }

  return position;
};

let dialPosition: number = 50;
for (let i = 0; i < lines.length; i++) {
  const rotation = lines[i];
  dialPosition = updateDialPosition(dialPosition, rotation);
}

console.log("Password:", password);
