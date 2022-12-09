// @deno-types="/types/types.d.ts"

const input = await Deno.readTextFile("./input.txt");

const forest = input
  .split("\n")
  .map((r) => r.split("").map((t) => parseInt(t)));

let maxScore = -1;
const rowLimit = forest.length;
const colLimit = forest[0].length;
forest.forEach((row, rowCoord) => {
  row.forEach((tree, colCoord) => {
    const log = rowCoord == 3 && colCoord == 2;
    const score = [0, 0, 0, 0];
    let rowIdx = rowCoord;
    let colIdx = colCoord;
    //south
    do {
      rowIdx++;
      if (forest[rowIdx]) {
        score[0]++;
      }
    } while (rowIdx < rowLimit && forest[rowIdx][colIdx] < tree);
    rowIdx = rowCoord;
    //north
    do {
      rowIdx--;
      if (forest[rowIdx]) {
        score[1]++;
      }
    } while (rowIdx > 0 && forest[rowIdx][colIdx] < tree);
    rowIdx = rowCoord;
    //east
    do {
      colIdx++;
      if (forest[rowIdx][colIdx]) {
        score[2]++;
      }
    } while (colIdx < colLimit && forest[rowIdx][colIdx] < tree);
    colIdx = colCoord;
    //west
    do {
      colIdx--;
      if (forest[rowIdx][colIdx]) {
        score[3]++;
      }
    } while (colIdx > 0 && forest[rowIdx][colIdx] < tree);
    const total = score.reduce((p, c) => p * c, 1);
    if (total > maxScore) {
      maxScore = total;
    }
  });
});
console.log(maxScore);
// const rows = input.split("\n").map((r) => r.split("").map((t) => parseInt(t)));
// const columns = rows.reduce(
//   (col, row) => {
//     row.forEach((tree, idx) => col[idx].push(tree));
//     return col;
//   },
//   Array.from({ length: rows[0].length }, (): number[] => []),
// );

// const visible = new Set<string>();
// rows.forEach((row, rowIdx) => {
//   row.reduce((tallest, tree, colIdx) => {
//     if (tree > tallest) {
//       tallest = tree;
//       visible.add([rowIdx, colIdx].join());
//     }
//     return tallest;
//   }, -1);
//   row.reverse().reduce((tallest, tree, colIdx) => {
//     if (tree > tallest) {
//       tallest = tree;
//       visible.add([rowIdx, row.length - colIdx - 1].join());
//     }
//     return tallest;
//   }, -1);
// });
// columns.forEach((column, colIdx) => {
//   column.reduce((tallest, tree, rowIdx) => {
//     if (tree > tallest) {
//       tallest = tree;
//       visible.add([rowIdx, colIdx].join());
//     }
//     return tallest;
//   }, -1);
//   column.reverse().reduce((tallest, tree, rowIdx) => {
//     if (tree > tallest) {
//       tallest = tree;
//       visible.add([column.length - 1 - rowIdx, colIdx].join());
//     }
//     return tallest;
//   }, -1);
// });

// console.log(visible.size);
