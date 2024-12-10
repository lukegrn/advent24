import fs from "fs";

const readData = () => {
  const rawData = fs.readFileSync("./data/day1.txt").toString();
  const lines = rawData.trim().split("\n");
  const list1: number[] = [];
  const list2: number[] = [];

  lines.forEach((line) => {
    const items = line.split("   ");
    list1.push(Number(items[0]));
    list2.push(Number(items[1]));
  });

  return [list1, list2];
};

export const part1 = () => {
  let [list1, list2] = readData();
  list1 = list1.sort();
  list2 = list2.sort();

  return list1.reduce((sum, n, i) => {
    return sum + Math.abs(n - list2[i]);
  }, 0);
};

export const part2 = () => {
  const [list1, list2] = readData();

  return list1.reduce(
    (acc, n) => acc + n * list2.filter((m) => m == n).length,
    0,
  );
};
