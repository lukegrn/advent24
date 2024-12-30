import fs from "fs";

const readData = () => {
  return fs.readFileSync("./data/day12.txt").toString().trim();
};

interface Point {
  x: number;
  y: number;
}

interface Region {
  plots: Point[];
  perimeter: number;
  corners: number;
  key: string;
}

const directions: Point[] = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
];

const buildRegion = (
  matrix: string[][],
  at: Point,
  visited: Point[],
  region: Region = undefined,
) => {
  if (visited.find((point) => point.x == at.x && point.y == at.y)) {
    return region;
  }

  if (region?.key && region.key != matrix[at.y][at.x]) {
    return region;
  }

  if (region == undefined) {
    region = {
      key: matrix[at.y][at.x],
      plots: [],
      perimeter: 0,
      corners: 0,
    };
  }

  visited.push(at);
  region.plots.push(at);

  directions.forEach((dir, i) => {
    const clockwise = directions[(i + 1) % 4];
    // outside corner
    if (
      matrix[at.y + clockwise.y]?.[at.x + clockwise.x] != region.key &&
      matrix[at.y + dir.y]?.[at.x + dir.x] != region.key
    ) {
      region.corners++;
    }

    // inside corner
    if (
      matrix[at.y + clockwise.y]?.[at.x + clockwise.x] == region.key &&
      matrix[at.y + dir.y]?.[at.x + dir.x] == region.key &&
      matrix[at.y + dir.y + clockwise.y]?.[at.x + dir.x + clockwise.x] !=
        region.key
    ) {
      region.corners++;
    }

    if (matrix[at.y + dir.y]?.[at.x + dir.x] != region.key) {
      region.perimeter++;
    } else {
      buildRegion(
        matrix,
        { x: at.x + dir.x, y: at.y + dir.y },
        visited,
        region,
      );
    }
  });

  return region;
};

export const part1 = () => {
  const data = readData();
  const matrix = data.split("\n").map((line) => line.split(""));
  const regions: Region[] = [];
  const visited: Point[] = [];

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (!visited.find((point) => point.x == x && point.y == y)) {
        const region = buildRegion(matrix, { x, y }, visited);
        if (region != undefined) {
          regions.push(region);
        }
      }
    }
  }

  return regions.reduce(
    (acc, region) => acc + region.perimeter * region.plots.length,
    0,
  );
};

export const part2 = () => {
  const data = readData();
  const matrix = data.split("\n").map((line) => line.split(""));
  const regions: Region[] = [];
  const visited: Point[] = [];

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (!visited.find((point) => point.x == x && point.y == y)) {
        // console.log(matrix[y][x]);
        const region = buildRegion(matrix, { x, y }, visited);
        if (region != undefined) {
          regions.push(region);
        }
      }
    }
  }

  return regions.reduce(
    (acc, region) => acc + region.corners * region.plots.length,
    0,
  );
};
