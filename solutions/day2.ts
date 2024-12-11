import fs from "fs";

const readData = () => {
  const rawData = fs.readFileSync("./data/day2.txt").toString();
  const lines = rawData.trim().split("\n");
  const levels = lines.map((line) =>
    line.split(" ").map((level) => Number(level)),
  );

  return levels;
};

const checkLevels = (levels: number[]) => {
  return levels.reduce(
    (acc, level, i) => {
      if (i == 0) {
        return { ok: true, prev: levels[i + 1] - level };
      }

      const diff = level - levels[i - 1];

      if (acc.prev * diff > 0 && Math.abs(diff) < 4) {
        return { ok: acc.ok && true, prev: diff };
      }

      return { ok: false, prev: diff };
    },
    { ok: true, prev: 0 },
  ).ok;
};

export const part1 = () => {
  const dataset = readData();

  return dataset.filter((levels) => {
    return checkLevels(levels);
  }).length;
};

export const part2 = () => {
  const dataset = readData();

  return dataset.filter((levels) => {
    if (checkLevels(levels)) {
      return true;
    }

    for (let i = 0; i < levels.length; i++) {
      if (checkLevels(levels.toSpliced(i, 1))) {
        return true;
      }
    }

    return false;
  }).length;
};
