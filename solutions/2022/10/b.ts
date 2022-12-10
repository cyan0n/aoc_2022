// @deno-types="/types/types.d.ts"

const input = (await Deno.readTextFile("./input.txt"))
  .replaceAll("addx", "noop*\naddx")
  .split("\n");

let reg = 1;
let rowIdx = -40;
const crt: string[] = [];

input.forEach((line, idx) => {
  const mod = idx;
  if (mod % 40 === 0) {
    rowIdx += 40;
  }
  const modReg = reg + rowIdx;
  crt.push(idx >= modReg - 1 && idx <= modReg + 1 ? "#" : ".");

  if (!line.includes("noop")) {
    reg += parseInt(line.split(" ")[1]);
  }
});

const printLn: string[] = ["", "", "", "", "", ""];
crt.forEach((char, idx) => (printLn[Math.floor(idx / 40)] += char));
printLn.forEach((val) => console.log(val));
