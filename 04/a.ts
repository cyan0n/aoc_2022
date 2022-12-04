const input = await Deno.readTextFile("./input.txt");

type Elf = [number, number];
type Shift = [Elf, Elf];
type Shifts = Shift[];

const shifts: Shifts = input.split("\n").map(
  (shift) =>
    shift
      .split(",")
      .map((elf) => elf.split("-").map((sector) => parseInt(sector)) as Elf)
      .sort((a, b) => a[1] - a[0] - (b[1] - b[0])) as Shift,
);

const overlapCounter = shifts.reduce((counter, [elf1, elf2]) => {
  if (elf1[0] >= elf2[0] && elf1[1] <= elf2[1]) {
    return counter + 1;
  }
  return counter;
}, 0);

console.log(overlapCounter);
