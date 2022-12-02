const input = await Deno.readTextFile("./input.txt");
// A Rock
// B Paper
// C Scissors

// X 1
// Y 2
// Z 3

// 0 lost
// 3 tie
// 6 Won
const rounds = input.split("\n");

const rules = ["C", "A", "B", "C", "A"];

const points = {
  X: 1,
  Y: 2,
  Z: 3,
};
const convert = {
  X: "A",
  Y: "B",
  Z: "C",
};
type K = keyof typeof points;
type KK = keyof typeof convert;

const totalScore = rounds
  .map((round) => {
    const [elf, me] = round.split(" ") as [string, string];
    let score = points[me as K];
    if (elf === convert[me as KK]) {
      score += 3;
    } else if (elf === rules[score - 1]) {
      score += 6;
    }
    return score;
  })
  .reduce((prev, curr) => prev + curr, 0);

console.log(totalScore);
