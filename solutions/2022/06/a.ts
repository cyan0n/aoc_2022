// @deno-types="/types/types.d.ts"

const input = (await Deno.readTextFile("./test.txt")).split("");

const uniqueLength = 4;

const position =
  input.findIndex(
    (_, i) => new Set([...input].splice(i, uniqueLength)).size === uniqueLength,
  ) + uniqueLength;

console.log(position);
