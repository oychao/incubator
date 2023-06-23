import { Token, TokenType } from 'Token';

export class Scanner {
  #source: string;
  #tokens: Array<Token<unknown>>;

  #p: number;

  constructor(source: string) {
    this.#source = source;
    this.#tokens = [];
    this.#p = 0;
  }

  private peak(step = 0) {
    return this.#source[this.#p + step];
  }

  private advance() {
    return this.#source[this.#p++];
  }

  public scan() {
    while (true) {
      const c = this.peak();
      switch (c) {
        case ' ':
          this.advance();
          break;
        case '+':
        case '-':
        case '*':
        case '/':
          this.#tokens.push({ type: TokenType.OP, value: this.advance() });
          break;
        case '(':
        case ')':
          this.#tokens.push({ type: TokenType.GROUP, value: this.advance() });
          break;
        case undefined:
          this.#tokens.push({ type: TokenType.EOL });
          return;
        default:
          this.number();
          break;
      }
    }
  }

  private number() {
    const start = this.#p;

    let c = this.peak();

    while ('0' <= c && c <= '9') {
      c = this.advance();
    }

    this.#tokens.push({
      type: TokenType.NUMBER,
      value: +this.#source.slice(start, this.#p),
    });
  }

  public getTokens() {
    return this.#tokens;
  }

  public print() {
    console.log(JSON.stringify(this.#tokens, null, 2));
  }
}
