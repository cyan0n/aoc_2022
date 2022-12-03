const input = await Deno.readTextFile("./input.txt");

const getValue = (str: string) =>
  str.charCodeAt(0) - (str.toLowerCase() === str ? 96 : 38);

const rucksack_list = input
  .split("\n")
  .map((rucksack) => {
    const half = rucksack.length / 2;
    return [
      new Set(rucksack.slice(0, half).split("").map(getValue)),
      new Set(rucksack.slice(half).split("").map(getValue)),
    ] as const;
  })
  .map(([a, b]) => {
    return [...a.values()].find((i) => b.has(i))!;
  });

console.log(rucksack_list.reduce((a, b) => a + b, 0));
