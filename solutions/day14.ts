interface Point {
  x: number;
  y: number;
}

interface Robot {
  p: Point;
  v: Point;
}

import fs from "fs";

const readData = () => {
  return fs.readFileSync("./data/day14.txt").toString().trim();
};

export const part1 = () => {
  const data = readData();

  const dimensions: Point = { x: 101, y: 103 };
  const seconds = 100;

  const robots: Robot[] = data.split("\n").map((line) => {
    const parsed = [...line.matchAll(/=(\d+|-\d+),(\d+|-\d+)/g)];
    return {
      p: { x: Number(parsed[0][1]), y: Number(parsed[0][2]) },
      v: { x: Number(parsed[1][1]), y: Number(parsed[1][2]) },
    };
  });

  robots.forEach((robot) => {
    if (robot.v.x < 0) {
      robot.v.x = dimensions.x + robot.v.x;
    }

    if (robot.v.y < 0) {
      robot.v.y = dimensions.y + robot.v.y;
    }

    robot.p.x = (robot.p.x + robot.v.x * seconds) % dimensions.x;
    robot.p.y = (robot.p.y + robot.v.y * seconds) % dimensions.y;
  });

  const pivot: Point = {
    x: Math.floor(dimensions.x / 2),
    y: Math.floor(dimensions.y / 2),
  };

  return robots
    .reduce(
      (acc, robot) => {
        if (robot.p.x < pivot.x && robot.p.y < pivot.y) {
          acc[0] = acc[0] + 1;
        } else if (robot.p.x > pivot.x && robot.p.y < pivot.y) {
          acc[1] = acc[1] + 1;
        } else if (robot.p.x < pivot.x && robot.p.y > pivot.y) {
          acc[2] = acc[2] + 1;
        } else if (robot.p.x > pivot.x && robot.p.y > pivot.y) {
          acc[3] = acc[3] + 1;
        }

        return acc;
      },
      [0, 0, 0, 0],
    )
    .reduce((acc, quad) => acc * quad, 1);
};

export const part2 = () => {
  const data = readData();

  const dimensions: Point = { x: 101, y: 103 };

  const robots: Robot[] = data.split("\n").map((line) => {
    const parsed = [...line.matchAll(/=(\d+|-\d+),(\d+|-\d+)/g)];
    return {
      p: { x: Number(parsed[0][1]), y: Number(parsed[0][2]) },
      v: { x: Number(parsed[1][1]), y: Number(parsed[1][2]) },
    };
  });

  const maps: string[] = new Array(dimensions.x * dimensions.y).fill("");

  for (let seconds = 1; seconds < dimensions.x * dimensions.y; seconds++) {
    robots.forEach((robot: Robot) => {
      if (robot.v.x < 0) {
        robot.v.x = dimensions.x + robot.v.x;
      }

      if (robot.v.y < 0) {
        robot.v.y = dimensions.y + robot.v.y;
      }

      robot.p.x = (robot.p.x + robot.v.x) % dimensions.x;
      robot.p.y = (robot.p.y + robot.v.y) % dimensions.y;
    });

    for (let y = 0; y < dimensions.y; y++) {
      maps[seconds] = maps[seconds].concat("\n");
      for (let x = 0; x < dimensions.x; x++) {
        const count = robots.filter(
          (robot) => robot.p.x == x && robot.p.y == y,
        ).length;

        if (!count) {
          maps[seconds] = maps[seconds].concat(".");
        } else {
          maps[seconds] = maps[seconds].concat(`${count}`);
        }
      }
    }
  }

  const index = maps.findIndex((map) => map.includes("1111111111"));

  return `Likely answer at ${index}\nMap: \n${maps[index]}`;
};
