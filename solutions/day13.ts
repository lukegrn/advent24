import fs from "fs";

const readData = () => {
  return fs.readFileSync("./data/day13.txt").toString().trim();
};

interface Point {
  x: number;
  y: number;
}

interface Button extends Point {
  cost: number;
}

interface Map {
  a: Button;
  b: Button;
  prize: Point;
}

const parseData = (data: string) => {
  return data.split("\n\n").map((map) => {
    const lines = map.split("\n");
    const a: Button = {
      x: Number(lines[0].match(/X\+\d+/)[0].split("+")[1]),
      y: Number(lines[0].match(/Y\+\d+/)[0].split("+")[1]),
      cost: 3,
    };

    const b: Button = {
      x: Number(lines[1].match(/X\+\d+/)[0].split("+")[1]),
      y: Number(lines[1].match(/Y\+\d+/)[0].split("+")[1]),
      cost: 1,
    };

    const prize: Point = {
      x: Number(lines[2].match(/X\=\d+/)[0].split("=")[1]),
      y: Number(lines[2].match(/Y\=\d+/)[0].split("=")[1]),
    };

    return {
      a,
      b,
      prize,
    };
  }) as Map[];
};

const solvePath = (maps: Map[]) => {
  return maps.reduce((acc, map) => {
    const aPresses =
      (map.prize.x * map.b.y - map.b.x * map.prize.y) /
      (map.a.x * map.b.y - map.b.x * map.a.y);

    const bPresses = (map.prize.x - aPresses * map.a.x) / map.b.x;

    if (!Number.isInteger(aPresses) || !Number.isInteger(bPresses)) {
      return acc;
    }

    return acc + aPresses * map.a.cost + map.b.cost * bPresses;
  }, 0);
};

export const part1 = () => {
  const data = readData();
  const maps = parseData(data);

  return solvePath(maps);
};

export const part2 = () => {
  const data = readData();
  const maps = parseData(data).map((map) => ({
    ...map,
    prize: {
      x: map.prize.x + 10_000_000_000_000,
      y: map.prize.y + 10_000_000_000_000,
    },
  }));

  return solvePath(maps);
};
