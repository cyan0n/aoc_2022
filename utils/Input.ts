class Input {
  private content: string;

  constructor(path: string) {
    this.content = Deno.readTextFileSync(path);
  }

  public all(): string {
    return this.content;
  }
}

export default Input;
