// @deno-types="/types/types.d.ts"

const input = await Deno.readTextFile("./input.txt");

const lastFour: string[] = [];

const length = 14;

const pos = input.split("").findIndex((char) => {
  if (lastFour.length === length) {
    const set = new Set(lastFour);
    if (set.size === length) {
      return true;
    }
    lastFour.shift();
  }
  lastFour.push(char);
  return false;
});

console.log(pos);
