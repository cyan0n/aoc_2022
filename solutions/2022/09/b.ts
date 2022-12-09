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
const head: [number, number] = [0, 0];
const trail: Array<[number, number]> = Array.from({ length: 9 }, () => [0, 0]);

const follow = (leader: [number, number], follower: [number, number]) => {
  if (leader[0] !== follower[0] || leader[1] !== follower[1]) {
    const yDiff = Math.abs(leader[0] - follower[0]) > 1;
    const xDiff = Math.abs(leader[1] - follower[1]) > 1;
    if (yDiff) {
      follower[0] = (leader[0] + follower[0]) / 2;
    } else if (xDiff) {
      follower[0] = leader[0];
    }
    if (xDiff) {
      follower[1] = (leader[1] + follower[1]) / 2;
    } else if (yDiff) {
      follower[1] = leader[1];
    }
  }
};

movements.forEach(([direction, distance]) => {
  let steps = 0;
  // console.log(direction,distance)
  while (steps < distance) {
    const clone = [...trail.map((a) => [...a])];
    const headC = [...head];
    //move head
    switch (direction) {
      case "D":
        head[0]--;
        break;
      case "U":
        head[0]++;
        break;
      case "R":
        head[1]++;
        break;
      case "L":
        head[1]--;
        break;
    }
    // console.log(head);
    // tail

    follow(head, trail[0]);
    trail.forEach((t, i) => {
      if (i > 0) {
        follow(trail[i - 1], t);
      }
    });
    steps++;

    if (trail.join().split("").includes(".")) {
      console.log("Before", headC, clone);
      console.log(direction);
      console.log(head, trail);
      Deno.exit();
    }

    visited.add(trail[trail.length - 1].join());
  }
});
console.log(visited);
console.log(visited.size);
