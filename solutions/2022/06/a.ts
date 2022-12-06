// @deno-types="/types/types.d.ts"

const input = await Deno.readTextFile("./input.txt");

const lastFour: string[] = [];

const pos = input.split("").findIndex((char) => {
  if (lastFour.length === 4) {
    const set = new Set(lastFour);
    if (set.size === 4) {
      return true;
    }
    lastFour.shift();
  }
  lastFour.push(char);
  return false;
});

console.log(pos);
