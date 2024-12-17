import fs, { Dir } from "fs";
import { addListener } from "process";

const readData = () => {
  return fs.readFileSync("./data/day6.txt").toString().trim();
};

interface Point {
  x: number;
  y: number;
}

interface Direction {
  x: -1 | 0 | 1;
  y: -1 | 0 | 1;
  char: "^" | ">" | "<" | "v";
}

interface PointWithDirection extends Point {
  direction: Direction;
}

const UP: Direction = { x: 0, y: -1, char: "^" };
const RIGHT: Direction = { x: 1, y: 0, char: ">" };
const DOWN: Direction = { x: 0, y: 1, char: "v" };
const LEFT: Direction = { x: -1, y: 0, char: "<" };

const ORDER = [UP, RIGHT, DOWN, LEFT];

const findStartingPosition = (matrix: string[][]): Point => {
  const point = {
    x: 0,
    y: matrix.findIndex(
      (lines) =>
        lines.findIndex(
          (point) => ORDER.findIndex((dir) => dir.char == point) != -1,
        ) != -1,
    ),
  };

  point.x = matrix[point.y].findIndex(
    (point) => ORDER.findIndex((dir) => dir.char == point) != -1,
  );

  return point;
};

export const part1 = () => {
  const data = readData();

  const matrix = data.split("\n").map((line) => line.split(""));
  const dimensions: Point = { x: matrix[0].length, y: matrix.length };
  const at = findStartingPosition(matrix);
  const traveledTo: Point[] = [];
  let curr = ORDER.find((dir) => dir.char == matrix[at.y][at.x]);

  while (
    at.x + curr.x >= 0 &&
    at.x + curr.x < dimensions.x &&
    at.y + curr.y >= 0 &&
    at.y + curr.y < dimensions.y
  ) {
    if (
      traveledTo.findIndex((point) => point.x == at.x && point.y == at.y) == -1
    ) {
      traveledTo.push({ x: at.x, y: at.y });
    }

    if (matrix[at.y + curr.y][at.x + curr.x] == "#") {
      curr =
        ORDER[
          (ORDER.findIndex((dir) => dir.char == curr.char) + 1) % ORDER.length
        ];
    }

    at.x += curr.x;
    at.y += curr.y;
  }

  return traveledTo.length + 1;
};

export const part2 = () => {
  const data = readData();
  const matrix = data.split("\n").map((line) => line.split(""));
  const dimensions: Point = { x: matrix[0].length, y: matrix.length };
  let count = 0;

  for (let y = 0; y < dimensions.y; y++) {
    for (let x = 0; x < dimensions.x; x++) {
      const testMatrix = matrix.map((line) => line.map((item) => item));
      // already an obstacle
      if (testMatrix[y][x] == "#") {
        continue;
      }
      // don't consider starting position
      if (testMatrix[y][x] == "^") {
        continue;
      }

      const at = findStartingPosition(testMatrix);
      let curr = ORDER.find((dir) => dir.char == testMatrix[at.y][at.x]);
      const pointLog: PointWithDirection[] = [];

      testMatrix[y][x] = "#";

      while (
        at.x + curr.x >= 0 &&
        at.x + curr.x < dimensions.x &&
        at.y + curr.y >= 0 &&
        at.y + curr.y < dimensions.y
      ) {
        if (testMatrix[at.y + curr.y][at.x + curr.x] == "#") {
          curr =
            ORDER[
              (ORDER.findIndex((dir) => dir.char == curr.char) + 1) %
                ORDER.length
            ];
          // double turns are possible
          if (testMatrix[at.y + curr.y][at.x + curr.x] == "#") {
            curr =
              ORDER[
                (ORDER.findIndex((dir) => dir.char == curr.char) + 1) %
                  ORDER.length
              ];
          }
        }

        at.x += curr.x;
        at.y += curr.y;

        // We have already been here, in this direction. Loop found
        if (
          pointLog.find(
            (point) =>
              at.x == point.x &&
              at.y == point.y &&
              curr.char == point.direction.char,
          )
        ) {
          count++;
          break;
        }

        pointLog.push({ ...at, direction: curr });
      }
    }
  }

  return count;
};
