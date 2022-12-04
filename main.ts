import {
  Command,
  EnumType,
} from "https://deno.land/x/cliffy@v0.25.5/command/mod.ts";
import watchSolution from "./watchSolution.ts";

const partType = new EnumType(["a", "b"]);

const today = new Date();

await new Command()
  .name("Advent of Code")
  .version("2022")
  .description("Helper to solve today's Advent of Code")
  .type("part-type", partType)
  .option("-d, --day <day:number>", "Set which day to solve.", {
    default:
      today.getMonth() === 11 && today.getDate() < 26 ? today.getDate() : 1,
  })
  .option("-p, --part <part:part-type>", "Set which part to solve.", {
    default: "a" as const,
  })
  .action(({ day, part }) => {
    watchSolution(day, part);
  })
  .parse(Deno.args);
