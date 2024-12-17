import { part1 as day1part1, part2 as day1part2 } from "./solutions/day1";
import { part1 as day2part1, part2 as day2part2 } from "./solutions/day2";
import { part1 as day3part1, part2 as day3part2 } from "./solutions/day3";
import { part1 as day4part1, part2 as day4part2 } from "./solutions/day4";
import { part1 as day5part1, part2 as day5part2 } from "./solutions/day5";
import { part1 as day6part1, part2 as day6part2 } from "./solutions/day6";
import { part1 as day7part1, part2 as day7part2 } from "./solutions/day7";

interface Solution {
  part1: () => void;
  part2: () => void;
}

const solutions: Solution[] = [
  {
    part1: day1part1,
    part2: day1part2,
  },
  {
    part1: day2part1,
    part2: day2part2,
  },
  {
    part1: day3part1,
    part2: day3part2,
  },
  {
    part1: day4part1,
    part2: day4part2,
  },
  {
    part1: day5part1,
    part2: day5part2,
  },
  {
    part1: day6part1,
    part2: day6part2,
  },
  {
    part1: day7part1,
    part2: day7part2,
  },
];

if (process.argv.length >= 4) {
  console.error("Usage: npm run start -- <day>");
}

if (process.argv.length == 2) {
  solutions.forEach((solution, i) => {
    console.log(`Day ${i + 1} part 1: `, solution.part1());
    console.log(`Day ${i + 1} part 2: `, solution.part2());
  });
} else {
  const day = Number(process.argv[2]);
  const i = day - 1;
  console.log(`Day ${day} part1: `, solutions[i].part1());
  console.log(`Day ${day} part2: `, solutions[i].part2());
}
