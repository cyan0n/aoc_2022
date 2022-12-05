// @deno-types="/types/types.d.ts"
import mapFromArrays from "/utils/mapFromArrays.ts";

const input = await Deno.readTextFile("./input.txt");
const [initState, procedures] = input
  .split("\n\n")
  .map((a) => a.split("\n")) as [string[], string[]];

const stackCount = initState.pop()?.replace(/\s+/g, "")!;

const crates: Map<number, string[]> = mapFromArrays(
  stackCount.split("").map((a) => parseInt(a)),
  Array.from({ length: stackCount.length }, () => new Array<string>()),
);

initState
  .map((line) =>
    line
      .split("")
      .reduce((curr, char, i) => {
        if ((i - 1) % 4 === 0) {
          return curr + (char !== " " ? char : "0");
        }
        return curr;
      }, "")
      .padEnd(stackCount?.length, "0"),
  )
  .reverse()
  .forEach((line) =>
    line.split("").forEach((char, i) => {
      if (char !== "0") {
        crates.get(i + 1)?.push(char);
      }
    }),
  );

const procedureRx = /move (\d+) from (\d+) to (\d+)/g;
procedures.forEach((procedure) => {
  const [move, from, to] = [...procedure.matchAll(procedureRx)][0]
    .slice(-3)
    .map((a) => parseInt(a));
  const fromCol = crates.get(from)!;
  const toCol = crates.get(to)!;
  const fromIdx = fromCol.length - move;
  const selected = fromCol.splice(fromIdx < 0 ? 0 : fromIdx);
  toCol.push(...selected);
});

console.log(
  [...crates.values()]
    .map((line) => line.reverse()[0])
    .reduce((p, c) => p + c, ""),
);
