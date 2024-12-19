import fs from "fs";

const readData = () => {
  return fs.readFileSync("./data/day8.txt").toString().trim();
};

interface Node {
  x: number;
  y: number;
  frequency: string;
}

interface AntiNode {
  x: number;
  y: number;
}

export const part1 = () => {
  const data = readData();
  const matrix = data.split("\n").map((line) => line.split(""));
  const nodes: Node[] = [];
  const antiNodes: AntiNode[] = [];

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const currentNode = matrix[y][x];
      if (currentNode == ".") {
        continue;
      } else {
        nodes
          .filter((node) => node.frequency == currentNode)
          .forEach((node) => {
            [-2, 1].forEach((mod) => {
              const distance = {
                x: x - node.x,
                y: y - node.y,
              };

              const antiNode: AntiNode = {
                x: x + mod * distance.x,
                y: y + mod * distance.y,
              };

              if (
                !antiNodes.find(
                  (node) => node.x == antiNode.x && node.y == antiNode.y,
                )
              ) {
                antiNodes.push(antiNode);
              }
            });
          });
        nodes.push({ x, y, frequency: currentNode });
      }
    }
  }

  return antiNodes.filter(
    (node) =>
      node.x >= 0 &&
      node.y >= 0 &&
      node.x < matrix[0].length &&
      node.y < matrix.length,
  ).length;
};

export const part2 = () => {
  const data = readData();
  const matrix = data.split("\n").map((line) => line.split(""));
  const nodes: Node[] = [];
  const antiNodes: AntiNode[] = [];

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const currentNode = matrix[y][x];
      if (currentNode == ".") {
        continue;
      } else {
        nodes
          .filter((node) => node.frequency == currentNode)
          .forEach((node) => {
            [-1, 1].forEach((mod) => {
              const distance = {
                x: x - node.x,
                y: y - node.y,
              };

              let i = 0;

              while (true) {
                const antiNode: AntiNode = {
                  x: x + mod * i * distance.x,
                  y: y + mod * i * distance.y,
                };

                if (
                  antiNode.x < 0 ||
                  antiNode.y < 0 ||
                  antiNode.x >= matrix[0].length ||
                  antiNode.y >= matrix.length
                ) {
                  break;
                }

                if (
                  !antiNodes.find(
                    (node) => node.x == antiNode.x && node.y == antiNode.y,
                  )
                ) {
                  antiNodes.push(antiNode);
                }

                i++;
              }
            });
          });
        nodes.push({ x, y, frequency: currentNode });
      }
    }
  }

  return antiNodes.length;
};
