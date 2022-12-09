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
const head = [0, 0];
const tail = [0, 0];

movements.forEach(([direction, distance]) => {
  let steps = 0;
  // console.log(direction,distance)
  while (steps < distance) {
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
    if (head[0] !== tail[0] || head[1] !== tail[1]) {
      if (Math.abs(head[0] - tail[0]) > 1) {
        tail[0] = (head[0] + tail[0]) / 2;
        tail[1] = head[1];
      } else if (Math.abs(head[1] - tail[1]) > 1) {
        tail[1] = (head[1] + tail[1]) / 2;
        tail[0] = head[0];
      }
    }
    steps++;
    visited.add(tail.join());
  }
});
console.log(visited.size);
