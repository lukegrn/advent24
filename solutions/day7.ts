import fs from "fs";

const readData = () => {
  return fs.readFileSync("./data/day7.txt").toString().trim();
};

interface Equation {
  equals: number;
  nums: number[];
}

const canOperateTo = (x: number, nums: number[]) => {
  if (nums.length == 1) {
    return x == nums[0];
  }

  return (
    canOperateTo(x, [nums[0] + nums[1], ...nums.slice(2)]) ||
    canOperateTo(x, [nums[0] * nums[1], ...nums.slice(2)])
  );
};

const parseEquations = (data: string): Equation[] =>
  data.split("\n").map((line) => {
    const [equals, nums] = line.split(":");
    return {
      equals: Number(equals),
      nums: nums
        .trim()
        .split(" ")
        .map((num) => Number(num)),
    };
  });

export const part1 = () => {
  const data = readData();
  const equations = parseEquations(data);

  return equations.reduce(
    (acc, equation) =>
      canOperateTo(equation.equals, equation.nums)
        ? acc + equation.equals
        : acc,
    0,
  );
};

const canConcatenateTo = (x: number, nums: number[]) => {
  if (nums.length == 1) {
    return x == nums[0];
  }

  return (
    canConcatenateTo(x, [nums[0] + nums[1], ...nums.slice(2)]) ||
    canConcatenateTo(x, [nums[0] * nums[1], ...nums.slice(2)]) ||
    canConcatenateTo(x, [Number(`${nums[0]}${nums[1]}`), ...nums.slice(2)])
  );
};

export const part2 = () => {
  const data = readData();
  const equations = parseEquations(data);

  return equations.reduce(
    (acc, equation) =>
      canConcatenateTo(equation.equals, equation.nums)
        ? acc + equation.equals
        : acc,
    0,
  );
};
