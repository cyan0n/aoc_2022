const input = await Deno.readTextFile("./input.txt");
// A Rock 1
// B Paper 2
// C Scissors 3

// X lose
// Y win
// Z draw

// 0 lost
// 3 tie
// 6 Won
const rounds = input.split("\n");

const rules = ["C", "A", "B", "C", "A"] as const;

const points = {
  A: 1,
  B: 2,
  C: 3,
} as const;
const convert = {
  X: "A",
  Y: "B",
  Z: "C",
};
type K = keyof typeof points;
type KK = keyof typeof convert;

const totalScore = rounds
  .map((round) => {
    const [elf, result] = round.split(" ") as [K, KK];

    const me: K =
      result === "X"
        ? rules[points[elf] - 1]
        : result === "Z"
        ? rules[points[elf] + 1]
        : elf;

    let score = points[me as K];
    console.log(elf, result, me, score);

    if (result === "Y") {
      score += 3;
    } else if (result === "Z") {
      score += 6;
    }

    return score;
  })
  .reduce((prev, curr) => prev + curr, 0);

console.log(totalScore);
