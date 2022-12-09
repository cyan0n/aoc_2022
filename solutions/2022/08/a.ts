// @deno-types="/types/types.d.ts"

const input = await Deno.readTextFile("./input.txt");

const rows = input.split("\n").map((r) => r.split("").map((t) => parseInt(t)));
const columns = rows.reduce(
  (col, row) => {
    row.forEach((tree, idx) => col[idx].push(tree));
    return col;
  },
  Array.from({ length: rows[0].length }, (): number[] => []),
);

const visible = new Set<string>();
rows.forEach((row, rowIdx) => {
  row.reduce((tallest, tree, colIdx) => {
    if (tree > tallest) {
      tallest = tree;
      visible.add([rowIdx, colIdx].join());
    }
    return tallest;
  }, -1);
  row.reverse().reduce((tallest, tree, colIdx) => {
    if (tree > tallest) {
      tallest = tree;
      visible.add([rowIdx, row.length - colIdx - 1].join());
    }
    return tallest;
  }, -1);
});
columns.forEach((column, colIdx) => {
  column.reduce((tallest, tree, rowIdx) => {
    if (tree > tallest) {
      tallest = tree;
      visible.add([rowIdx, colIdx].join());
    }
    return tallest;
  }, -1);
  column.reverse().reduce((tallest, tree, rowIdx) => {
    if (tree > tallest) {
      tallest = tree;
      visible.add([column.length - 1 - rowIdx, colIdx].join());
    }
    return tallest;
  }, -1);
});

console.log(visible.size);
