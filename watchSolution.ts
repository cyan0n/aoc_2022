import { join } from "https://deno.land/std@0.167.0/path/mod.ts";
import { tty } from "https://deno.land/x/cliffy@v0.25.5/ansi/tty.ts";

const INPUT_FILE = "input.txt";

const watchSolution = async (day: number, part: "a" | "b") => {
  const dir_path = join(".", day.toString()).padStart(2, "0");
  const file_name = `${part}.ts`;
  const file_path = join(dir_path, file_name);
  const input_path = join(dir_path, INPUT_FILE);

  await createFilestructure(dir_path, file_path);

  const watcher = Deno.watchFs([file_path, input_path]);
  run(dir_path, file_name);
  for await (const event of watcher) {
    if (event.kind === "access") {
      run(dir_path, file_name);
    }
  }
};

const createFilestructure = async (dir_path: string, file_path: string) => {
  const input_path = join(dir_path, INPUT_FILE);
  // Create directories
  try {
    await Deno.mkdir(dir_path);
  } catch (error) {
    if (!(error instanceof Deno.errors.AlreadyExists)) {
      throw error;
    }
  }

  // Create file from template
  try {
    await Deno.readTextFile(file_path);
  } catch (error) {
    if (!(error instanceof Deno.errors.NotFound)) {
      throw error;
    }
    await Deno.copyFile("./template.ts", file_path);
  }

  try {
    await Deno.readTextFile(input_path);
  } catch (error) {
    if (!(error instanceof Deno.errors.NotFound)) {
      throw error;
    }
    await Deno.create(input_path);
  }

  // Open file in VSCode
  Deno.run({
    cmd: ["code", file_path, input_path, "-r"],
  });
};

const run = async (dir_path: string, file_name: string) => {
  tty.cursorSave.cursorTo(0, 0).eraseScreen();
  const p = Deno.run({
    cmd: ["deno", "run", "--allow-read", file_name],
    stdin: "piped",
    stdout: "piped",
    stderr: "piped",
    cwd: dir_path,
  });
  const { code } = await p.status();

  const rawOutput = await p.output();
  const rawError = await p.stderrOutput();
  if (code === 0) {
    await Deno.stdout.write(rawOutput);
  } else {
    const errorString = new TextDecoder().decode(rawError);
    console.log(errorString);
  }
};

export default watchSolution;
