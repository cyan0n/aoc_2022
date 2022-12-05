const input = await Deno.readTextFile("./input.txt");

const elves = input.split("\n\n");

const totals = elves.map((elf) => {
  const food = elf.split("\n").map((s) => parseInt(s));
  return food.reduce((prev, item) => prev + item, 0);
});

const sorted = totals.sort((a, b) => b - a);

const topThree = sorted.slice(0, 3).reduce((prev, curr) => prev + curr, 0);

console.log(topThree);

console.log(
  input
    .split("\n\n")
    .map((e) =>
      e
        .split("\n")
        .map((s) => parseInt(s))
        .reduce((a, b) => a + b, 0),
    )
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a + b),
);
