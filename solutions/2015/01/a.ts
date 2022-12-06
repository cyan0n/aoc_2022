// @deno-types="/types/types.d.ts"

const input = await Deno.readTextFile("./input.txt");
const up = input.replaceAll(")", "");

const down = input.replaceAll("(", "");

console.log(up.length - down.length);
