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
  const cElf1 = complete(elf1);
  const cElf2 = complete(elf2);

  if (cElf1.some((sector) => cElf2.includes(sector))) {
    return counter + 1;
  }

  return counter;
}, 0);

function complete(elf: Elf): number[] {
  const length = elf[1] - elf[0] + 1;
  return Array.from({ length }, (_, i) => i + elf[0]);
}

console.log(overlapCounter);
