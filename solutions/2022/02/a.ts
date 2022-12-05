// @deno-types="/types/types.d.ts"
import mapFromArrays from "utils/mapFromArrays.ts";

const input = await Deno.readTextFile("./input.txt");

// A X Rock 1
// B Y Paper 2
// C Z Scissors 3

// Lose 0
// Tie 3
// Won 6

const rounds = input.split("\n");
const elvish = ["A", "B", "C"] as const;
const meish = ["X", "Y", "Z"] as const;
const points = [1, 2, 3] as const;
const dictionary = mapFromArrays(elvish, meish);
const my_points = mapFromArrays(meish, points);
const elf_points = mapFromArrays(elvish, points);

const rules = ["C", "A", "B", "C", "A"];

const totalScore = rounds
  .map((round) => {
    const [elf, me] = round.split(" ") as MapEntity<typeof dictionary>;
    let score = my_points.get(me)!;
    if (me === dictionary.get(elf)) {
      score += 3;
    } else if (elf === rules[score - 1]) {
      score += 6;
    }
    return score;
  })
  .reduce((prev, curr) => prev + curr, 0);

console.log(totalScore);
