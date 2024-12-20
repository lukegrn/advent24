import fs from "fs";

const readData = () => {
  return fs.readFileSync("./data/day10.txt").toString().trim();
};

interface Point {
  x: number;
  y: number;
}

const directions: Record<"UP" | "DOWN" | "LEFT" | "RIGHT", Point> = {
  UP: { x: 0, y: -1 },
  RIGHT: { x: 1, y: 0 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
};

const scoreTrailhead = (matrix: string[][], startFrom: Point) => {
  if (matrix[startFrom.y][startFrom.x] == "9") {
    return [{ x: startFrom.x, y: startFrom.y }];
  } else {
    return Object.values(directions).reduce((acc, dir) => {
      const newX = startFrom.x + dir.x;
      const newY = startFrom.y + dir.y;
      if (
        Number(matrix[newY]?.[newX]) - 1 ==
        Number(matrix[startFrom.y][startFrom.x])
      ) {
        const score = scoreTrailhead(matrix, { x: newX, y: newY });
        if (score.length != 0) {
          score.forEach((score) => {
            if (
              acc.findIndex(
                (existing) => score.x == existing.x && score.y == existing.y,
              ) == -1
            ) {
              acc.push(score);
            }
          });
        }
      }

      return acc;
    }, []);
  }
};

export const part1 = () => {
  const data = readData();

  const matrix = data.split("\n").map((line) => line.split(""));
  let scoreTracker = 0;

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == "0") {
        scoreTracker += scoreTrailhead(matrix, { x, y }).length;
      }
    }
  }

  return scoreTracker;
};

const rateTrailhead = (matrix: string[][], startFrom: Point) => {
  if (matrix[startFrom.y][startFrom.x] == "9") {
    return 1;
  } else {
    return Object.values(directions).reduce((acc, dir) => {
      const newX = startFrom.x + dir.x;
      const newY = startFrom.y + dir.y;
      if (
        Number(matrix[newY]?.[newX]) - 1 ==
        Number(matrix[startFrom.y][startFrom.x])
      ) {
        return acc + rateTrailhead(matrix, { x: newX, y: newY });
      } else {
        return acc;
      }
    }, 0);
  }
};

export const part2 = () => {
  const data = readData();

  const matrix = data.split("\n").map((line) => line.split(""));
  let scoreTracker = 0;

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == "0") {
        scoreTracker += rateTrailhead(matrix, { x, y });
      }
    }
  }

  return scoreTracker;
};
