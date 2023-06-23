import { Add } from 'Expr/Add';
import { Expression } from 'Expr/Expression';
import { Factor } from 'Expr/Factor';
import { Mul } from 'Expr/Mul';
import { Unary } from 'Expr/Unary';
import { Token, TokenType } from 'Token';

export class Parser {
  #tokens: Array<Token<unknown>>;
  #p: number;
  #ast: Expression;

  constructor(tokens: Array<Token<unknown>>) {
    this.#tokens = tokens;
    this.#p = 0;
  }

  private peak(step = 0) {
    return this.#tokens[this.#p + step];
  }

  private advance() {
    return this.#tokens[this.#p++];
  }

  public parse() {
    this.#ast = this.expression();
  }

  // expression -> add
  private expression() {
    return new Expression({ add: this.add() });
  }

  // add -> mul (("+" | "-") mul)*
  private add() {
    let left: Mul | Add = this.mul();
    let next = this.peak();

    while (next.value === '+' || next.value === '-') {
      this.advance();
      const right = this.mul();

      left = new Add({
        left,
        op: next.value,
        right,
      });

      next = this.peak();
    }

    return new Add({ left });
  }

  // mul -> unary (("*" | "/") unary)*
  private mul() {
    let left: Unary | Mul = this.unary();
    let next = this.peak();

    while (next.value === '*' || next.value === '/') {
      this.advance(); // consume op
      const right = this.unary();

      left = new Mul({
        left,
        op: next.value,
        right,
      });

      next = this.peak();
    }

    return new Mul({
      left,
    });
  }

  // unary -> "-" factor | factor
  private unary() {
    const next = this.peak();

    if (next.type === TokenType.OP) {
      this.advance();
      return new Unary({ prefix: '-', value: this.factor() });
    }

    return new Unary({ value: this.factor() });
  }

  // factor -> number | "(" expression ")"
  private factor() {
    const next = this.peak();

    if (next.type === TokenType.GROUP) {
      this.advance();
      const value = this.expression();
      this.advance();
      return new Factor({ value });
    }

    return new Factor({ value: this.advance().value as number | Expression });
  }

  public getAst() {
    return this.#ast;
  }

  public print() {
    console.log(JSON.stringify(this.#ast, null, 2));
  }
}
