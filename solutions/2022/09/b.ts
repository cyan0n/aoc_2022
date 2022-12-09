// @deno-types="/types/types.d.ts"

type Direction = "U" | "D" | "R" | "L";
const input = await Deno.readTextFile("./input.txt");
const movements: Array<[Direction, number]> = input
  .split("\n")
  .map(
    (l) =>
      l.split(" ").map((v, i) => (i === 1 ? parseInt(v) : v)) as [
        Direction,
        number,
      ],
  );
const visited = new Set<string>(["0,0"]);
const rope: Array<[number, number]> = Array.from({ length: 10 }, () => [0, 0]);
const head = rope[0];

const follow = (leader: [number, number], follower: [number, number]) => {
  const dY = Math.abs(leader[0] - follower[0]) > 1;
  const dX = Math.abs(leader[1] - follower[1]) > 1;
  if (dY) {
    follower[0] = (leader[0] + follower[0]) / 2;
  } else if (dX) {
    follower[0] = leader[0];
  }
  if (dX) {
    follower[1] = (leader[1] + follower[1]) / 2;
  } else if (dY) {
    follower[1] = leader[1];
  }
};

movements.forEach(([direction, distance]) =>
  Array.from({ length: distance }).forEach(() => {
    if (direction === "D") {
      head[0]--;
    } else if (direction === "U") {
      head[0]++;
    } else if (direction === "L") {
      head[1]--;
    } else if (direction === "R") {
      head[1]++;
    }
    rope.forEach((t, i) => (i > 0 ? follow(rope[i - 1], t) : null));
    visited.add(rope[rope.length - 1].join());
  }),
);
console.log(visited.size);
