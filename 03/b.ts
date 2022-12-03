const input = await Deno.readTextFile("./input.txt");

const getValue = (str: string) =>
  str.charCodeAt(0) - (str.toLowerCase() === str ? 96 : 38);
type Triplet = [Set<string>, Set<string>, Set<string>];

const rucksack_list = input.split("\n").map((i) => new Set(i));
const groups: Triplet[] = [];
for (let i = 0; i < rucksack_list.length; i += 3) {
  groups.push(Array.from(rucksack_list.slice(i, i + 3)) as Triplet);
}
const result = groups
  .map(([a, b, c]) => {
    return [...a.values()].find((i) => b.has(i) && c.has(i))!;
  })
  .map(getValue)
  .reduce((a, b) => a + b);

console.log(result);
