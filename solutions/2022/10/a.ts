// @deno-types="/types/types.d.ts"

const input = (await Deno.readTextFile("./input.txt"))
  .replaceAll("addx", "noop*\naddx")
  .split("\n");

let reg = 1;
const sig_str: number[] = [];

input.forEach((line, idx) => {
  const mod = idx + 1;
  if ((mod % 40) - 20 === 0) {
    sig_str.push(reg * mod);
  }
  if (!line.includes("noop")) {
    reg += parseInt(line.split(" ")[1]);
  }
});

console.log(sig_str.reduce((a, b) => a + b));
