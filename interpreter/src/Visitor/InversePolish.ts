import { Add } from 'Expr/Add';
import { Expression } from 'Expr/Expression';
import { Factor } from 'Expr/Factor';
import { Mul } from 'Expr/Mul';
import { Unary } from 'Expr/Unary';
import { Visitor } from 'Visitor/Visitor';

export class InversePolish implements Visitor {
  #ast: Expression;

  constructor(ast: Expression) {
    this.#ast = ast;
  }

  public visit() {
    return this.visitExpression(this.#ast);
  }

  public visitExpression(expression: Expression) {
    return this.visitAdd(expression.add);
  }

  public visitAdd(add: Add): string {
    const left =
      add.left instanceof Mul
        ? this.visitMul(add.left)
        : this.visitAdd(add.left);

    if (!add.op) {
      return left;
    }

    return `(${add.op} ${left} ${this.visitMul(add.right)})`;
  }

  public visitMul(mul: Mul): string {
    const left =
      mul.left instanceof Unary
        ? this.visitUnary(mul.left)
        : this.visitMul(mul.left);

    if (!mul.op) {
      return left;
    }

    return `(${mul.op} ${left} ${this.visitUnary(mul.right)})`;
  }

  public visitUnary(unary: Unary): string {
    return `${unary.prefix ? '-' : ''}${this.visitFactor(unary.value)}`;
  }

  public visitFactor(factor: Factor): string {
    return `${
      'number' === typeof factor.value
        ? factor.value
        : this.visitExpression(factor.value)
    }`;
  }
}
