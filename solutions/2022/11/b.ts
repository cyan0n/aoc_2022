// @deno-types="/types/types.d.ts"

interface Monkey {
  items: number[];
  operation: {
    operator: "+" | "*";
    value: number | "old";
  };
  test: {
    divisible: number;
    true: string;
    false: string;
  };
  inspected: number;
}

const numRx = /\d+/g;
const input = await Deno.readTextFile("./input.txt");
const monkeys_str = input.split("\n\n").map((m) => m.split("\n"));

const monkeys = new Map<string, Monkey>(
  monkeys_str.map<[string, Monkey]>(([id, items, op, div, ifTrue, ifFalse]) => {
    return [
      id.match(numRx)![0],
      {
        items: [...items.matchAll(numRx)].map((m) => parseInt(m[0])),
        operation: {
          operator: op.match(/[\+\*]/)![0] as "+" | "*",
          value: op.match(numRx) ? parseInt(op.match(numRx)![0]) : "old",
        },
        test: {
          divisible: parseInt(div.match(numRx)![0]),
          true: ifTrue.match(numRx)![0],
          false: ifFalse.match(numRx)![0],
        },
        inspected: 0,
      },
    ];
  }),
);

const globalMod = [...monkeys.values()].reduce(
  (a, b) => a * b.test.divisible,
  1,
);
const inspect = (monkey: Monkey) => {
  monkey.items = monkey.items.map((item) => {
    monkey.inspected++;
    const value =
      monkey.operation.value === "old" ? item : monkey.operation.value;
    if (monkey.operation.operator === "*") {
      return item * value;
    }
    return item + value;
  });
};

for (let i = 0; i < 10000; i++) {
  monkeys.forEach((monkey) => {
    inspect(monkey);
    monkey.items.forEach((item) => {
      monkeys
        .get(
          item % monkey.test.divisible === 0
            ? monkey.test.true
            : monkey.test.false,
        )!
        .items.push(item % globalMod);
    });
    monkey.items = [];
  });
}

const business = [...monkeys.values()]
  .sort((a, b) => b.inspected - a.inspected)
  .splice(0, 2)
  .reduce((prod, m) => prod * m.inspected, 1);

// monkeys.forEach((m, id) => console.log(id, ":", m.inspected));
console.log(business);
