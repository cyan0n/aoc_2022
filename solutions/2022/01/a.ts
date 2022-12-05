const input = await Deno.readTextFile("./input.txt");

const elves = input.split("\n\n");

let most = -1;

elves.forEach((elf) => {
  const food = elf.split("\n").map((s) => parseInt(s));
  const calories = food.reduce((prev, item) => {
    return prev + item;
  }, 0);
  if (most < calories) {
    most = calories;
  }
});
console.log(most);
