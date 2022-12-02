const { readFile, writeFile } = Deno;
import { join as pathJoin } from "https://deno.land/std@0.167.0/path/mod.ts";

const session = (
  await Deno.readTextFile(pathJoin(Deno.env.get("HOME")!, ".advent_cookie"))
)
  .toString()
  .trim();

export const int = (x: string): number => parseInt(x, 10);
export const num = (x: string): number => parseFloat(x);
export const str = (x: any): string => x.toString();
export const bool = (x: any): boolean => !!x;

export const arr = <T extends unknown>(n: number, fn: (i: number) => T) =>
  Array.from(new Array(n), (_, i) => fn(i));

const headers = {
  cookie: `session=${session}`,
  "user-agent": "github.com/bluepichu",
};

export const print = console.log;

export interface InputOptions {
  day: number;
  year?: number;
  strip?: boolean;
}

export class Input {
  constructor(private content: string) {}

  public static async get(options: InputOptions): Promise<Input> {
    const day = options.day;
    const year = options.year ?? 2022;
    const useSample = Deno.env.get("ADVENT_SAMPLE") === "1";
    const file = useSample ? "sample.txt" : "input.txt";
    const strip = options.strip ?? true;

    const preprocess = (data: string) => (strip ? data.trimEnd() : data);

    try {
      const buffer = await readFile(file);
      print(`Using input from ${file}`);
      return new Input(preprocess(buffer.toString()));
    } catch (error) {
      if (
        error instanceof Error &&
        "code" in error &&
        (error as any).code === "ENOENT"
      ) {
        if (!useSample) {
          print("Downloading input...");
          const response = await fetch(
            `https://adventofcode.com/${year}/day/${day}/input`,
            { headers },
          );

          if (response.status !== 200) {
            print(await response.text());
            throw new Error(`Failed to fetch input: ${response.status}`);
          }

          const content = await response.text();
          await writeFile(file, content);
          return new Input(preprocess(content));
        } else {
          print("Downloading sample...");
          const response = await fetch(
            `https://adventofcode.com/${year}/day/${day}`,
            { headers },
          );

          if (response.status !== 200) {
            print(await response.text());
            throw new Error(`Failed to fetch input: ${response.status}`);
          }

          const content = await response.text();
          const sampleRegex = /<pre><code>([\s\S]*?)<\/code><\/pre>/g;

          for (const match of content.matchAll(sampleRegex)) {
            const sample = match[1];
            const formattedSample = ("\n" + sample).replace(
              /\n/g,
              "\n\x1b[90m│ \x1b[33m",
            );
            print("Found potential sample:" + formattedSample + "\x1b[0m");
            try {
              await new Promise<void>((resolve, reject) => {
                readlineInterface.question(
                  `Is this the sample?  \x1b[90m(Y to accept)\x1b[0m `,
                  (response) => {
                    if (response.toLowerCase() === "y") {
                      resolve();
                    } else {
                      reject();
                    }
                  },
                );
              });
              await writeFile(file, sample);
              return new Input(preprocess(sample));
            } catch (error) {}
          }

          print("Failed to find sample");
          process.exit(1);
        }
      }
      throw error;
    }
  }

  public all(): string {
    return this.content;
  }

  public lines(): string[] {
    return this.content.split("\n");
  }

  public forLines<T>(fn: (input: Input) => T): T[] {
    return this.lines().map((line) => fn(new Input(line)));
  }

  public tokens(separator: RegExp = /[\s\n]+/g): string[] {
    return this.content.split(separator);
  }

  public lineTokens(
    lineSeparator: RegExp = /\n/g,
    tokenSeparator: RegExp = /[\s]+/g,
  ): string[][] {
    return this.content
      .split(lineSeparator)
      .map((line) => line.split(tokenSeparator));
  }

  public ints(): number[] {
    return this.tokens().map(int);
  }

  public nums(): number[] {
    return this.tokens().map(num);
  }

  public digitGrid(): number[][] {
    return this.lines().map((line) => line.split("").map(int));
  }

  public charGrid(): string[][] {
    return this.lines().map((line) => line.split(""));
  }

  public parse<T>(parser: f.Parser<T>): T {
    return parser(this.content);
  }
}

// deno-lint-ignore no-namespace
export namespace f {
  export type Parser<T> = (input: string) => T;

  export const str = (): Parser<string> => (input: string) => input;
  export const int = (): Parser<number> => (input: string) =>
    parseInt(input, 10);
  export const num = (): Parser<number> => (input: string) => parseFloat(input);
  export const bool = (): Parser<boolean> => (input: string) => !!input;
  export const chrs = (): Parser<string[]> => (input: string) =>
    input.split("");
  export const split =
    <T>(delimiter: string, p: Parser<T>): Parser<T[]> =>
    (input: string) =>
      input.split(delimiter).map(p);
  export const cl = <T>(p: Parser<T>): Parser<T[]> => split(",", p);
  export const nl = <T>(p: Parser<T>): Parser<T[]> => split("\n", p);
  export const nlnl = <T>(p: Parser<T>): Parser<T[][]> =>
    split("\n\n", split("\n", p));
  export const tok =
    <T>(p: Parser<T>): Parser<T[]> =>
    (input: string) =>
      input.split(/\s+/g).map(p);
  export const dis =
    <L, R, T>(
      delimiter: string,
      left: Parser<L>,
      right: Parser<R>,
      fn: (left: L, right: R) => T,
    ): Parser<T> =>
    (input: string) => {
      const index = input.indexOf(delimiter);

      if (index === -1) {
        throw new Error(`Failed to find delimiter ${delimiter} in ${input}`);
      }

      return fn(
        left(input.slice(0, index)),
        right(input.slice(index + delimiter.length)),
      );
    };
  export const dGrid = (): Parser<number[][]> => nl(split("", int()));
  export const cGrid = (): Parser<string[][]> => nl(chrs());
}

export type Point = [number, number];
export type Point3D = [number, number, number];

export const GridDirections = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export const GridDirectionsWithoutDiagonals = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];

export function* iterateGrid<T>(grid: T[][]) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      yield [i, j];
    }
  }
}

export function* neighbors(
  point: Point,
  includeDiagonal = true,
): Generator<Point> {
  const directions = includeDiagonal
    ? GridDirections
    : GridDirectionsWithoutDiagonals;
  for (const [di, dj] of directions) {
    yield [point[0] + di, point[1] + dj];
  }
}

export function mapGrid<S, T>(
  grid: S[][],
  fn: (value: S, point: Point) => T,
): T[][] {
  return grid.map((row, i) => row.map((value, j) => fn(value, [i, j])));
}

export function buildGrid(point: [number, number][]) {
  const maxRow = point.reduce((max, [i, _]) => Math.max(max, i), -Infinity);
  const maxCol = point.reduce((max, [_, j]) => Math.max(max, j), -Infinity);
  const grid = arr(maxRow + 1, () => arr(maxCol + 1, () => false));

  for (const [i, j] of point) {
    grid[i][j] = true;
  }

  return grid;
}

export function sum(arr: number[]): number {
  return arr.reduce((sum, n) => sum + n, 0);
}

export function prod(arr: number[]): number {
  return arr.reduce((product, n) => product * n, 1);
}

export function min(arr: number[]): number {
  return arr.reduce((min, n) => Math.min(min, n), Infinity);
}

export function max(arr: number[]): number {
  return arr.reduce((max, n) => Math.max(max, n), -Infinity);
}

export async function Advent(options: InputOptions) {
  const input = await Input.get(options);

  const submit = async (answer: number | string, level: 1 | 2 = 1) => {
    if (process.env.ADVENT_SAMPLE === "1") {
      print(
        `Would have submitted \x1b[36m${answer}\x1b[0m for \x1b[35mpart ${level}\x1b[0m.`,
      );
      Deno.exit(0);
    }

    // await new Promise<void>((resolve) => {
    //   readlineInterface.question(
    //     `Submit answer \x1b[36m${answer}\x1b[0m for \x1b[35mpart ${level}\x1b[0m?  \x1b[90m(Y to submit)\x1b[0m `,
    //     (response) => {
    //       if (response.toLowerCase() === "y") {
    //         resolve();
    //       } else {
    //         print("\x1b[31mRefusing to submit\x1b[0m");
    //         Deno.exit(1)
    //       }
    //     },
    //   );
    // });

    print("\x1b[34mSubmitting...\x1b[0m");

    const response = await fetch(
      `https://adventofcode.com/${options.year ?? 2022}/day/${
        options.day
      }/answer`,
      {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `level=${level}&answer=${encodeURIComponent(answer)}`,
      },
    );

    const text = await response.text();

    if (response.status !== 200) {
      print(await response.text());
      throw new Error(`Failed to submit answer: ${response.status}`);
    }

    if (text.includes("That's not the right answer")) {
      print(text);
      print("\x1b[31mAnswer incorrect!\x1b[0m");
      Deno.exit(1);
    } else if (text.includes("You gave an answer too recently")) {
      print(
        `\x1b[33mWait for the timeout (${
          /You have (.*) left to wait/.exec(text)![1]
        })\x1b[0m`,
      );
      Deno.exit(1);
    } else if (text.includes("That's the right answer!")) {
      print("\x1b[32mAnswer correct!\x1b[0m");
      Deno.exit(1);
    } else if (text.includes("You don't seem to be solving the right level.")) {
      print("\x1b[31mWrong level! (Already solved?)\x1b[0m");
      Deno.exit(1);
    } else {
      print(text);
      print(`\x1b[33mUnknown outcome!\x1b[0m`);
      Deno.exit(1);
    }
  };

  return {
    input,
    submit,
    compute: async (
      level: 1 | 2,
      fn: (input: Input) => Promise<number | string>,
    ) => {
      const answer = await fn(input);
      await submit(answer, level);
    },
    computeCheck: async (
      level: 1 | 2,
      fn: (input: Input) => AsyncGenerator<number | string>,
    ) => {
      let answer: number | string | undefined;
      let ok = true;

      for await (const a of fn(input)) {
        if (answer === undefined) {
          answer = a;
        } else {
          if (answer !== a) {
            print(`\x1b[31mGot mismatched answer: ${answer} ≠ ${a}\x1b[0m`);
            ok = false;
          }
        }
      }

      if (answer === undefined) {
        print("\x1b[31mDidn't get an answer\x1b[0m");
        Deno.exit(1);
      } else if (!ok) {
        print("\x1b[31mRefusing to submit due to mismatched answers\x1b[0m");
        Deno.exit(1);
      } else {
        await submit(answer, level);
      }
    },
  };
}
