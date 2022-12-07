// @deno-types="/types/types.d.ts"

const input = (await Deno.readTextFile("./input.txt")).split("\n");
const curr_path: string[] = ["/"];
const dir_list = new Map<string, number>([["/", 0]]);

input.forEach((cmd) => {
  if (cmd.includes("$ cd")) {
    const mv = cmd.split(" ")[2]!;
    if (mv === "/") {
      curr_path.splice(0);
      curr_path.push("/");
    } else if (mv === "..") {
      curr_path.pop();
    } else {
      curr_path.push(mv);
    }
  } else if (!cmd.includes("$ ls")) {
    if (cmd.startsWith("dir")) {
      const dir_name = cmd.split(" ")[1]!;
      dir_list.set(curr_path.join("") + dir_name, 0);
    } else {
      const size = parseInt(cmd.split(" ")[0]!);
      const pPath = [...curr_path];
      while (pPath.length) {
        dir_list.set(pPath.join(""), dir_list.get(pPath.join(""))! + size);
        pPath.pop();
      }
    }
  }
});

const values = [...dir_list.values()].sort((a, b) => b - a);
const max = 70000000;
const needed = 30000000;
const remove = needed - (max - values.shift()!);

const smallest = values.reverse().find((size) => size > remove);

console.log(smallest);
