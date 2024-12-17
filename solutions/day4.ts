import fs from "fs";

const readData = () => {
  return fs.readFileSync("./data/day4.txt").toString().trim();
};

const findWordInDirectionFromPoint = (
  graph: string[],
  point: { x: number; y: number },
  direction: { x: number; y: number },
  word: string,
) => {
  if (graph[point.y]?.[point.x] == word[0]) {
    if (word.length == 1) {
      return true;
    }

    return findWordInDirectionFromPoint(
      graph,
      { x: point.x + direction.x, y: point.y + direction.y },
      direction,
      word.substring(1),
    );
  }

  return false;
};

export const part1 = () => {
  const data = readData();

  const graph = data.split("\n");
  let count = 0;

  for (let y = 0; y < graph.length; y++) {
    for (let x = 0; x < graph[y].length; x++) {
      for (let xMod = -1; xMod <= 1; xMod++) {
        for (let yMod = -1; yMod <= 1; yMod++) {
          if (
            findWordInDirectionFromPoint(
              graph,
              { x, y },
              { x: xMod, y: yMod },
              "XMAS",
            )
          ) {
            count++;
          }
        }
      }
    }
  }

  return count;
};

export const part2 = () => {
  const data = readData();

  const graph = data.split("\n");
  let count = 0;

  for (let y = 1; y < graph.length - 1; y++) {
    for (let x = 1; x < graph[y].length - 1; x++) {
      // potential X-Mases are centered on an 'A'. If we only look for As then we don't have to worry about double-counting an X-Mas
      if (graph[y][x] == "A") {
        const pair1 = `${graph[y - 1][x - 1]}${graph[y + 1][x + 1]}`;
        const pair2 = `${graph[y - 1][x + 1]}${graph[y + 1][x - 1]}`;

        if (["MS", "SM"].includes(pair1) && ["MS", "SM"].includes(pair2)) {
          count++;
        }
      }
    }
  }

  return count;
};
