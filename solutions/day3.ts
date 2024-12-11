import fs from "fs";

const readData = () => {
  return fs.readFileSync("./data/day3.txt").toString();
};

export const part1 = () => {
  const data = readData();

  const mults = [...data.matchAll(/mul\(\d+,\d+\)/g)].map((arr) => arr[0]);

  return mults.reduce((acc, mult) => {
    return (
      acc +
      [...mult.matchAll(/\d+/g)]
        .map((arr) => Number(arr[0]))
        .reduce((acc, num) => acc * num)
    );
  }, 0);
};

export const part2 = () => {
  const data = readData();

  const mults = [...data.matchAll(/(mul\(\d+,\d+\)|don\'t\(\)|do\(\))/g)].map(
    (arr) => arr[0],
  );

  return mults.reduce(
    (acc, cmd) => {
      if (cmd == "do()") {
        return { total: acc.total, do: true };
      }

      if (cmd == "don't()") {
        return { total: acc.total, do: false };
      }

      if (cmd.includes("mul") && acc.do) {
        return {
          total:
            acc.total +
            [...cmd.matchAll(/\d+/g)]
              .map((arr) => Number(arr[0]))
              .reduce((acc, num) => acc * num),
          do: acc.do,
        };
      }

      return acc;
    },
    { total: 0, do: true },
  ).total;
};
