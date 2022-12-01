const input = await Deno.readTextFile("./input.txt");

const elves = input.split("\n\n");

const totals = elves.map((elf) => {
  const food = elf.split("\n").map((s) => parseInt(s));
  const calories = food.reduce((prev, item) => {
    return prev + item;
  }, 0);

  return calories;
});

const order = totals.sort((a, b) => b - a);

console.log(order[0] + order[1] + order[2]);
