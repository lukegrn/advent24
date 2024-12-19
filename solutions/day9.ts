import fs from "fs";

const readData = () => {
  return fs.readFileSync("./data/day9.txt").toString().trim();
};

const buildIdMap = (data: string): string[] => {
  const map: string[] = [];

  data.split("").forEach((bytes, i) => {
    for (let j = 0; j < Number(bytes); j++) {
      if (i % 2 == 0) {
        map.push(`${Math.floor(i / 2)}`);
      } else {
        map.push(".");
      }
    }
  });

  return map;
};

export const part1 = () => {
  const data = readData();
  const map = buildIdMap(data);
  const totalLength = map.length;
  const newMap = [];
  let checkSum = 0;

  for (let i = 0; i < totalLength; i++) {
    if (!map[i]) {
      newMap.push(".");
    } else if (map[i] != ".") {
      newMap.push(map[i]);
    } else {
      let toAdd = map.pop();
      while (toAdd == ".") {
        toAdd = map.pop();
      }
      newMap.push(toAdd);
    }
  }

  newMap.forEach((id, i) => {
    if (id == ".") return;
    checkSum += Number(id) * i;
  });

  return checkSum;
};

export const part2 = () => {
  const data = readData();
  const map = buildIdMap(data);
  let highestId = 0;
  let checkSum = 0;

  for (let i = map.length - 1; i >= 0; i--) {
    if (map[i] != ".") {
      highestId = Number(map[i]);
      break;
    }
  }

  while (highestId != 0) {
    const highestStart = map.findIndex((id) => id == `${highestId}`);
    const highestEnd = map.findLastIndex((id) => id == `${highestId}`);

    for (let i = 0; i < highestStart; i++) {
      if (map[i] == ".") {
        let willFit = true;
        for (let j = 0; j <= highestEnd - highestStart; j++) {
          if (map[j + i] != ".") {
            willFit = false;
            break;
          }
        }

        if (willFit) {
          //swap
          for (let j = 0; j < highestEnd - highestStart + 1; j++) {
            map[j + i] = `${highestId}`;
            map[highestStart + j] = ".";
          }
          break;
        }
      }
    }

    highestId--;
  }

  map.forEach((id, i) => {
    if (id == ".") return;
    checkSum += Number(id) * i;
  });

  return checkSum;
};
