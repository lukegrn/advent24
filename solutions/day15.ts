import fs from "fs";

const readData = () => {
  return fs.readFileSync("./data/day15.txt").toString().trim();
};

interface Point {
  x: number;
  y: number;
}

type Direction = "<" | ">" | "^" | "v";

const directionMap: Record<Direction, Point> = {
  v: { x: 0, y: 1 },
  "^": { x: 0, y: -1 },
  "<": { x: -1, y: 0 },
  ">": { x: 1, y: 0 },
};

const handleMove = (map: string[][], at: Point[], dir: Direction) => {
  const dirMod = directionMap[dir];

  if (at.find((p) => map[p.y][p.x] == "#")) {
    return false;
  }

  if (at.reduce((acc, p) => map[p.y][p.x] == "." && acc, true)) {
    return true;
  }

  const to = at.reduce((acc, p) => {
    const dest = { x: p.x + dirMod.x, y: p.y + dirMod.y };
    if (dirMod.y == 0) {
      return [...acc, dest];
    }

    if (map[dest.y][dest.x] == ".") {
      return acc;
    }

    if (map[dest.y][dest.x] == "[") {
      return [...acc, dest, { ...dest, x: dest.x + 1 }];
    }

    if (map[dest.y][dest.x] == "]") {
      return [...acc, dest, { ...dest, x: dest.x - 1 }];
    }

    return [...acc, dest];
  }, []);

  if (handleMove(map, to, dir)) {
    at.filter(
      (p, i, arr) => arr.findIndex((a) => a.x == p.x && a.y == p.y) == i,
    ).forEach((p) => {
      const current = map[p.y][p.x];
      map[p.y][p.x] = map[p.y + dirMod.y][p.x + dirMod.x];
      map[p.y + dirMod.y][p.x + dirMod.x] = current;
    });

    return true;
  }
};

export const part1 = () => {
  const data = readData();

  const pieces = data.split("\n\n");
  const map = pieces[0].split("\n").map((line) => line.split(""));
  const directions = pieces[1].replaceAll("\n", "").split("") as Direction[];

  const robot: Point = map.reduce(
    (acc, line, i) => {
      const x = line.findIndex((n) => n == "@");
      if (x != -1) {
        return { x, y: i };
      }

      return acc;
    },
    { x: 0, y: 0 },
  );

  directions.forEach((dir) => {
    if (handleMove(map, [{ x: robot.x, y: robot.y }], dir)) {
      robot.x = robot.x + directionMap[dir].x;
      robot.y = robot.y + directionMap[dir].y;
    }
  });

  return map.reduce(
    (acc, line, y) =>
      acc +
      line.reduce((acc, point, x) => {
        if (point == "O") {
          return acc + y * 100 + x;
        }
        return acc;
      }, 0),
    0,
  );
};

export const part2 = () => {
  let data = readData();

  data = data.replaceAll("#", "##");
  data = data.replaceAll(".", "..");
  data = data.replaceAll("@", "@.");
  data = data.replaceAll("O", "[]");

  const pieces = data.split("\n\n");
  const map = pieces[0].split("\n").map((line) => line.split(""));
  const directions = pieces[1].replaceAll("\n", "").split("") as Direction[];

  const robot: Point = map.reduce(
    (acc, line, i) => {
      const x = line.findIndex((n) => n == "@");
      if (x != -1) {
        return { x, y: i };
      }

      return acc;
    },
    { x: 0, y: 0 },
  );

  directions.forEach((dir) => {
    if (handleMove(map, [{ x: robot.x, y: robot.y }], dir)) {
      robot.x = robot.x + directionMap[dir].x;
      robot.y = robot.y + directionMap[dir].y;
    }
  });

  return map.reduce(
    (acc, line, y) =>
      acc +
      line.reduce((acc, point, x) => {
        if (point == "[") {
          return acc + y * 100 + x;
        }
        return acc;
      }, 0),
    0,
  );
};
