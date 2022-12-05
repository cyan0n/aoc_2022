const input = (path = "input.txt") => new Input(Deno.readTextFileSync(path));

const parse = (str: string) => new ParsingString(str);
class ParsingString {
  constructor(private content: string) {}

  public getValue() {
    return this.content;
  }

  public upper() {
    this.content = this.content.toUpperCase();
    return this;
  }

  public lower() {
    this.content = this.content.toLowerCase();
    return this;
  }

  public int() {
    return new ParsingInt(parseInt(this.content));
  }

  public nlnl() {
    const res = this.content.split("\n\n");
    return new ParsingArray(res.map((r) => new ParsingString(r)));
  }
}

class ParsingInt {
  constructor(private content: number) {}

  public getValue() {
    return this.content;
  }
}

parse("ahell").nlnl().getValue();

type Parsings = ParsingString;

class ParsingArray<T extends Parsings> {
  constructor(private content: T[]) {}

  public getValue() {
    return this.content.map((i) => i.getValue());
  }

  public each(callbackFn: (value: T, index: number) => void) {
    this.content.forEach(callbackFn);
  }
}

const arr = [];

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

class Parser {
  public int() {}
}
export default parse;

// parse('input').nlnl().int()
