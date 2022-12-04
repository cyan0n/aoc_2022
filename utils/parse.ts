const input = (path = "input.txt") => new Input(Deno.readTextFileSync(path));

class Input<T> {
  constructor(private content: T) {}

  public nlnl(): Input<Input[]> {
    if (typeof this.content !== "string") {
      throw new Error(`Invalid input`);
    }
    return new Input(this.content.split("\n\n").map((l) => new Input(l)));
  }

  public lines(): Input<Input[]> {
    if (typeof this.content === "string") {
      return new Input(this.content.split(""));
    }
  }
}
const parse = (str: string) => {};

class Parser {
  public int() {}
}
export default parse;
