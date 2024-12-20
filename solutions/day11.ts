import fs from "fs";

const readData = () => {
  return fs.readFileSync("./data/day11.txt").toString().trim();
};

const cache = {};

const countStonesForBlinks = (stone: string, blinks: number) => {
  const k = `${stone}_${blinks}`;
  let count: number;
  if (blinks == 0) {
    return 1;
  } else if (cache[`${stone}_${blinks}`]) {
    return cache[k];
  } else if (stone == "0") {
    count = countStonesForBlinks("1", blinks - 1);
  } else if (stone.length % 2 == 0) {
    count =
      countStonesForBlinks(
        `${Number(stone.slice(0, stone.length / 2))}`,
        blinks - 1,
      ) +
      countStonesForBlinks(
        `${Number(stone.slice(stone.length / 2))}`,
        blinks - 1,
      );
  } else {
    count = countStonesForBlinks(`${Number(stone) * 2024}`, blinks - 1);
  }
  cache[k] = count;
  return count;
};

export const part1 = () => {
  const data = readData();
  let stones = data.split(" ");

  return stones.reduce((acc, stone) => {
    return acc + countStonesForBlinks(stone, 25);
  }, 0);
};

export const part2 = () => {
  const data = readData();
  let stones = data.split(" ");

  return stones.reduce((acc, stone) => {
    return acc + countStonesForBlinks(stone, 75);
  }, 0);
};
