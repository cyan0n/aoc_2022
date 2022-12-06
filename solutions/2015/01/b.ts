// @deno-types="/types/types.d.ts"

const input = await Deno.readTextFile("./input.txt");
let floor = 0;
const pos = input.split("").findIndex((move) => {
  floor += move === "(" ? 1 : -1;
  if (floor < 0) {
    return true;
  }
});

console.log(pos + 1);
