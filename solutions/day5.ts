import fs from "fs";

const readData = () => {
  return fs.readFileSync("./data/day5.txt").toString().trim();
};

export const part1 = () => {
  const data = readData();

  const [rules, updates] = data
    .trim()
    .split("\n\n")
    .map((chunk) => chunk.split("\n"));

  const rulePairs = rules.map((rule) => rule.split("|"));
  const updatesList = updates.map((update) => update.split(","));

  const correctlyOrdered = updatesList.filter((pages) => {
    const stack = [];
    for (let i = 0; i < pages.length; i++) {
      const applicableRules = rulePairs.filter((rule) => rule[0] == pages[i]);
      if (
        stack.filter((stackEntry) =>
          applicableRules.map((rule) => rule[1]).includes(stackEntry),
        ).length != 0
      ) {
        return false;
      }
      stack.push(pages[i]);
    }
    return true;
  });

  return correctlyOrdered.reduce(
    (acc, pages) => acc + Number(pages[Math.floor(pages.length / 2)]),
    0,
  );
};

export const part2 = () => {
  const data = readData();

  const [rules, updates] = data
    .trim()
    .split("\n\n")
    .map((chunk) => chunk.split("\n"));

  const rulePairs = rules.map((rule) => rule.split("|"));
  const updatesList = updates.map((update) => update.split(","));

  const reOrdered = [];

  updatesList.forEach((pages) => {
    const newArr = [];
    let foundError = false;
    pages.forEach((page) => {
      if (newArr.length == 0) {
        newArr.push(page);
      } else {
        let i = 0;
        const applicableRules = rulePairs.filter((rule) => rule[0] == page);
        newArr.forEach((item) => {
          if (
            applicableRules.findIndex(
              (rule) => rule[0] == page && rule[1] == item,
            ) == -1
          ) {
            i += 1;
          }
        });

        if (i < newArr.length) {
          foundError = true;
        }

        newArr.splice(i, 0, page);
      }
    });

    if (foundError) {
      reOrdered.push(newArr);
    }
  });

  return reOrdered.reduce(
    (acc, pages) => acc + Number(pages[Math.floor(pages.length / 2)]),
    0,
  );
};
